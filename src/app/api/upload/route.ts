import { NextRequest, NextResponse } from "next/server";
import { signBunnyUploadUrl } from "@/lib/bunnySigner";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    // Check if this is a test connection request
    const contentType = request.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      const body = await request.json();
      if (body.action === "test-connection") {
        return await handleTestConnection();
      }
    }

    // For actual file uploads, require authentication
    const authHeader = request.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json(
        { error: "No authorization header" },
        { status: 401 }
      );
    }

    // 1. Get authenticated user
    const supabase = await createClient();

    const token = authHeader.replace("Bearer ", "");
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Get form data
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const lessonId = formData.get("lessonId") as string;
    const title = (formData.get("title") as string) || file?.name;
    const type = (formData.get("type") as string) || "lesson-resource";

    // For question images and avatars, lessonId is optional
    if (!file) {
      return NextResponse.json({ error: "Missing file" }, { status: 400 });
    }

    if (type !== "question-image" && type !== "avatar" && !lessonId) {
      return NextResponse.json(
        { error: "Missing lessonId for non-question uploads" },
        { status: 400 }
      );
    }

    // 3. Validate file size (max 100MB)
    const maxSize = 100 * 1024 * 1024; // 100MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 100MB" },
        { status: 400 }
      );
    }

    // 4. Generate unique filename
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 15);
    const fileExtension = file.name.split(".").pop();

    // Different naming based on type
    let fileName: string;
    if (type === "question-image") {
      fileName = `question-images/${timestamp}-${randomId}.${fileExtension}`;
    } else if (type === "avatar") {
      fileName = `avatars/${timestamp}-${randomId}.${fileExtension}`;
    } else {
      fileName = `${timestamp}-${randomId}.${fileExtension}`;
    }

    // 5. Upload to Bunny CDN using token authentication
    const tokenKey = process.env.BUNNY_TOKEN_KEY;
    const storageZone = process.env.BUNNY_CDN_STORAGE_ZONE;

    if (!tokenKey || !storageZone) {
      return NextResponse.json(
        { error: "CDN configuration missing" },
        { status: 500 }
      );
    }

    // Generate signed URL for upload (1 hour expiry)
    const signedUpload = signBunnyUploadUrl(fileName, tokenKey, 3600);
    const uploadUrl = `https://storage.bunnycdn.com/${storageZone}/${fileName}`;

    console.log("Uploading to Bunny CDN with token:", uploadUrl);
    console.log(
      "Token expires at:",
      new Date(signedUpload.expires * 1000).toISOString()
    );

    // Use Storage API Key for uploads (not affected by token authentication)
    const storageApiKey = process.env.BUNNY_CDN_API_KEY;
    if (!storageApiKey) {
      return NextResponse.json(
        { error: "Storage API Key missing for uploads" },
        { status: 500 }
      );
    }

    console.log(
      "Using Storage API Key for upload (bypasses token authentication)"
    );

    const uploadResponse = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        AccessKey: storageApiKey,
        "Content-Type": file.type,
      },
      body: file,
    });

    if (!uploadResponse.ok) {
      console.error(
        "Bunny CDN upload failed:",
        uploadResponse.status,
        uploadResponse.statusText
      );
      throw new Error(
        `Failed to upload to Bunny CDN: ${uploadResponse.status}`
      );
    }

    // 6. Generate CDN URL
    const cdnBaseUrl =
      process.env.BUNNY_CDN_URL || `https://${storageZone}.b-cdn.net`;
    const cdnUrl = `${cdnBaseUrl}/${fileName}`;

    console.log("File uploaded successfully:", cdnUrl);

    // 7. Store metadata in database (only for lesson resources)
    let resource = null;
    if (type !== "question-image" && lessonId) {
      const { data: resourceData, error: dbError } = await supabase
        .from("resources")
        .insert({
          lesson_id: lessonId,
          kind: getFileKind(file.type),
          url: cdnUrl,
          cdn_url: cdnUrl,
          title: title,
          description: `Uploaded file: ${file.name}`,
          file_size: file.size,
          mime: file.type,
          upload_status: "completed",
        })
        .select()
        .single();

      if (dbError) {
        console.error("Database error:", dbError);
        throw dbError;
      }
      resource = resourceData;
    }

    // Generate signed URL for accessing the file
    const signedAccessUrl = signBunnyUploadUrl(fileName, tokenKey, 3600);

    return NextResponse.json({
      success: true,
      resource,
      url: cdnUrl,
      signedUrl: signedAccessUrl.url,
      expires: signedAccessUrl.expires,
      message: "File uploaded successfully",
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Upload failed",
        details: "Please try again or contact support",
      },
      { status: 500 }
    );
  }
}

function getFileKind(mimeType: string): string {
  if (mimeType.startsWith("video/")) return "video";
  if (mimeType === "application/pdf") return "pdf";
  if (mimeType.startsWith("image/")) return "image";
  if (mimeType.startsWith("audio/")) return "audio";
  if (
    mimeType.includes("document") ||
    mimeType.includes("word") ||
    mimeType.includes("excel")
  )
    return "document";
  return "document";
}

// GET endpoint to list resources for a lesson
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const lessonId = searchParams.get("lessonId");

    if (!lessonId) {
      return NextResponse.json(
        { error: "Lesson ID required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { data: resources, error } = await supabase
      .from("resources")
      .select("*")
      .eq("lesson_id", lessonId)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json({
      success: true,
      resources: resources || [],
    });
  } catch (error) {
    console.error("Error fetching resources:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch resources",
      },
      { status: 500 }
    );
  }
}

// Test connection function
async function handleTestConnection() {
  try {
    const storageZone = process.env.BUNNY_CDN_STORAGE_ZONE;
    const storageApiKey = process.env.BUNNY_CDN_API_KEY;

    if (!storageZone || !storageApiKey) {
      return NextResponse.json(
        {
          error: "CDN configuration missing",
          storageZone: !!storageZone,
          storageApiKey: !!storageApiKey,
        },
        { status: 500 }
      );
    }

    // Test Bunny CDN connection by listing files using Storage API Key
    const listUrl = `https://storage.bunnycdn.com/${storageZone}/`;

    const response = await fetch(listUrl, {
      method: "GET",
      headers: {
        AccessKey: storageApiKey,
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          error: `Bunny CDN connection failed: ${response.status}`,
          status: response.status,
          statusText: response.statusText,
          note: "Using Storage API Key - should work even with Token Authentication enabled",
        },
        { status: 500 }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      message: "Bunny CDN connection successful with Storage API Key",
      storageZone,
      fileCount: Array.isArray(data) ? data.length : "Unknown",
      note: "Storage API Key bypasses Token Authentication for uploads",
    });
  } catch (error) {
    console.error("Test connection error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Test connection failed",
      },
      { status: 500 }
    );
  }
}
