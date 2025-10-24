import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// POST - Record a question attempt
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await request.json();

    const {
      question_id,
      lesson_id,
      course_id,
      time_taken_seconds,
      is_correct,
      hint_used = false,
      session_id,
      session_order,
    } = body;

    // Validate required fields
    if (
      !question_id ||
      time_taken_seconds === undefined ||
      is_correct === undefined
    ) {
      return NextResponse.json(
        {
          error: "question_id, time_taken_seconds, and is_correct are required",
        },
        { status: 400 }
      );
    }

    // Get current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get question details (tags, difficulty)
    const { data: question, error: questionError } = await supabase
      .from("question_bank")
      .select("tags, difficulty")
      .eq("id", question_id)
      .single();

    if (questionError || !question) {
      return NextResponse.json(
        { error: "Question not found" },
        { status: 404 }
      );
    }

    // Count attempt number for this question
    const { count: attemptCount } = await supabase
      .from("student_performance_log")
      .select("*", { count: "exact", head: true })
      .eq("student_id", user.id)
      .eq("question_id", question_id);

    // Insert performance log
    const { data: performanceLog, error: insertError } = await supabase
      .from("student_performance_log")
      .insert({
        student_id: user.id,
        question_id,
        lesson_id,
        course_id,
        attempt_number: (attemptCount || 0) + 1,
        time_taken_seconds,
        is_correct,
        difficulty_level: question.difficulty,
        hint_used,
        session_order,
        session_id,
        tags: question.tags || [],
      })
      .select()
      .single();

    if (insertError) {
      console.error("Error inserting performance log:", insertError);
      return NextResponse.json(
        { error: "Failed to record attempt" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      attempt: performanceLog,
    });
  } catch (error) {
    console.error("Error in attempts POST API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET - Get question attempts for a student
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);

    const studentId = searchParams.get("studentId");
    const questionId = searchParams.get("questionId");
    const courseId = searchParams.get("courseId");
    const lessonId = searchParams.get("lessonId");
    const sessionId = searchParams.get("sessionId");
    const limit = searchParams.get("limit");

    // Get current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is admin or requesting own data
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    const targetUserId =
      profile?.role === "admin" && studentId ? studentId : user.id;

    // Build query
    let query = supabase
      .from("student_performance_log")
      .select("*")
      .eq("student_id", targetUserId)
      .order("created_at", { ascending: false });

    if (questionId) {
      query = query.eq("question_id", questionId);
    }
    if (courseId) {
      query = query.eq("course_id", courseId);
    }
    if (lessonId) {
      query = query.eq("lesson_id", lessonId);
    }
    if (sessionId) {
      query = query.eq("session_id", sessionId);
    }
    if (limit) {
      query = query.limit(parseInt(limit));
    }

    const { data: attempts, error } = await query;

    if (error) {
      console.error("Error fetching attempts:", error);
      return NextResponse.json(
        { error: "Failed to fetch attempts" },
        { status: 500 }
      );
    }

    return NextResponse.json({ attempts });
  } catch (error) {
    console.error("Error in attempts GET API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
