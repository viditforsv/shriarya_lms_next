import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const fileUrl = searchParams.get("url");

    if (!fileUrl) {
      return NextResponse.json(
        { error: "Missing file URL parameter" },
        { status: 400 }
      );
    }

    // Validate that it's a Bunny CDN URL for security
    if (!fileUrl.includes("shrividhyaclasses.b-cdn.net")) {
      return NextResponse.json({ error: "Invalid CDN URL" }, { status: 400 });
    }

    // Get the origin from the request to set proper Referer
    // For localhost development, use localhost:3000 or localhost:3001, otherwise use the request origin
    const requestOrigin =
      request.headers.get("origin") || request.headers.get("referer");
    const origin = requestOrigin?.includes("localhost:3000")
      ? "http://localhost:3000"
      : requestOrigin?.includes("localhost:3001")
      ? "http://localhost:3001"
      : requestOrigin || "https://courses.preppeo.com";

    const response = await fetch(fileUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        Referer: origin,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.status}`);
    }

    const fileBuffer = await response.arrayBuffer();
    const contentType =
      response.headers.get("content-type") || "application/octet-stream";

    // Special handling for PDFs to ensure proper iframe display
    const isPDF = contentType.includes("pdf") || fileUrl.includes(".pdf");

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": isPDF
          ? 'inline; filename="document.pdf"'
          : "inline",
        "Cache-Control": "public, max-age=3600", // Cache for 1 hour
        // Security headers - relaxed for PDFs to allow iframe embedding
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": isPDF ? "ALLOWALL" : "SAMEORIGIN",
        "X-XSS-Protection": "1; mode=block",
        "Content-Security-Policy": isPDF
          ? "frame-ancestors *"
          : "frame-ancestors 'self'",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
    });
  } catch (error) {
    console.error("CDN proxy error:", error);
    return NextResponse.json({ error: "Failed to load file" }, { status: 500 });
  }
}
