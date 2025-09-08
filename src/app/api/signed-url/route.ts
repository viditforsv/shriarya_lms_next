import { NextResponse } from "next/server";
import { signBunnyUrl } from "@/lib/bunnySigner";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const filePath = searchParams.get("file"); // e.g., /pdfs/chapter1.pdf
    const expiresIn = searchParams.get("expires"); // optional, defaults to 1 hour

    if (!filePath) {
      return NextResponse.json({ error: "Missing file path" }, { status: 400 });
    }

    const tokenKey = process.env.BUNNY_TOKEN_KEY;
    if (!tokenKey) {
      return NextResponse.json({ error: "Token key not configured" }, { status: 500 });
    }

    // Parse expiry time (default: 1 hour)
    const expiresInSeconds = expiresIn ? parseInt(expiresIn) : 3600;
    
    // Ensure minimum expiry time for security
    const minExpiry = 300; // 5 minutes minimum
    const maxExpiry = 86400; // 24 hours maximum
    const finalExpiry = Math.max(minExpiry, Math.min(maxExpiry, expiresInSeconds));

    const signedUrl = signBunnyUrl(
      filePath,
      "https://shrividhyaclasses.b-cdn.net", // your CDN hostname
      tokenKey,
      finalExpiry
    );

    return NextResponse.json({ 
      url: signedUrl,
      expires: finalExpiry,
      filePath 
    });

  } catch (error) {
    console.error("Error generating signed URL:", error);
    return NextResponse.json(
      { error: "Failed to generate signed URL" }, 
      { status: 500 }
    );
  }
}

// Optional: POST endpoint for batch URL generation
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { files, expires } = body;

    if (!files || !Array.isArray(files)) {
      return NextResponse.json({ error: "Missing files array" }, { status: 400 });
    }

    const tokenKey = process.env.BUNNY_TOKEN_KEY;
    if (!tokenKey) {
      return NextResponse.json({ error: "Token key not configured" }, { status: 500 });
    }

    const expiresInSeconds = expires ? parseInt(expires) : 3600;
    const finalExpiry = Math.max(300, Math.min(86400, expiresInSeconds));

    const signedUrls = files.map((filePath: string) => ({
      filePath,
      url: signBunnyUrl(
        filePath,
        "https://shrividhyaclasses.b-cdn.net",
        tokenKey,
        finalExpiry
      )
    }));

    return NextResponse.json({ 
      urls: signedUrls,
      expires: finalExpiry 
    });

  } catch (error) {
    console.error("Error generating batch signed URLs:", error);
    return NextResponse.json(
      { error: "Failed to generate signed URLs" }, 
      { status: 500 }
    );
  }
}
