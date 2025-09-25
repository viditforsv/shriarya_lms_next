import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Get current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const assignmentId = formData.get("assignmentId") as string;
    const courseSlug = formData.get("courseSlug") as string;

    if (!file || !assignmentId || !courseSlug) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate file type
    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Only PDF files are allowed" },
        { status: 400 }
      );
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File size must be less than 10MB" },
        { status: 400 }
      );
    }

    // Get course ID from slug
    const { data: course, error: courseError } = await supabase
      .from("courses")
      .select("id")
      .eq("slug", courseSlug)
      .single();

    if (courseError || !course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    // Create unique filename
    const timestamp = Date.now();
    const fileName = `${assignmentId}_${user.id}_${timestamp}.pdf`;
    const filePath = `assignments/${courseSlug}/${fileName}`;

    // Upload file to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("course-assignments")
      .upload(filePath, file, {
        contentType: "application/pdf",
        upsert: false,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return NextResponse.json(
        { error: "Failed to upload file" },
        { status: 500 }
      );
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("course-assignments")
      .getPublicUrl(filePath);

    // Save submission record to database
    const { data: submission, error: submissionError } = await supabase
      .from("assignment_submissions")
      .insert({
        assignment_id: assignmentId,
        course_id: course.id,
        user_id: user.id,
        file_name: fileName,
        file_path: filePath,
        file_url: urlData.publicUrl,
        file_size: file.size,
        submitted_at: new Date().toISOString(),
        status: "submitted",
      })
      .select()
      .single();

    if (submissionError) {
      console.error("Submission error:", submissionError);
      // Try to clean up uploaded file
      await supabase.storage.from("course-assignments").remove([filePath]);

      return NextResponse.json(
        { error: "Failed to save submission record" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      submission: {
        id: submission.id,
        fileName: fileName,
        fileUrl: urlData.publicUrl,
        fileSize: file.size,
        submittedAt: submission.submitted_at,
      },
    });
  } catch (error) {
    console.error("Assignment upload error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
