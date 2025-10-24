import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("Test payment endpoint received:", body);

    return NextResponse.json({
      success: true,
      message: "Test endpoint working",
      receivedData: body,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Test payment endpoint error:", error);
    return NextResponse.json(
      {
        error: "Test endpoint failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Test endpoint is working",
    timestamp: new Date().toISOString(),
  });
}
