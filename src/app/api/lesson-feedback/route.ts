import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const body = await request.json();

    const {
      lesson_id,
      lesson_slug,
      course_slug,
      feedback_type,
      message,
      image_url,
    } = body;

    if (!lesson_id || !feedback_type || !message) {
      return NextResponse.json(
        { error: "lesson_id, feedback_type, and message are required" },
        { status: 400 }
      );
    }

    // Get current user if logged in
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Store feedback in database
    const { data: feedback, error } = await supabase
      .from("lesson_feedback")
      .insert({
        lesson_id,
        lesson_slug,
        course_slug,
        feedback_type,
        message,
        image_url: image_url || null,
        user_id: user?.id || null,
        status: "pending",
      })
      .select()
      .single();

    if (error) {
      console.error("Error storing feedback:", error);
      return NextResponse.json(
        {
          error: `Failed to store feedback: ${error.message}`,
        },
        { status: 500 }
      );
    }

    console.log("Lesson Feedback Stored:", {
      id: feedback.id,
      lesson_id,
      lesson_slug,
      course_slug,
      feedback_type,
      user_id: user?.id || "anonymous",
      has_image: !!image_url,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Feedback submitted successfully",
      feedback_id: feedback.id,
    });
  } catch (error) {
    console.error("Error submitting lesson feedback:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to submit feedback",
      },
      { status: 500 }
    );
  }
}
