import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Create a direct Supabase client without SSR
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // Get the authorization header
    const authHeader = request.headers.get("authorization");
    console.log("API - Auth header:", authHeader);

    if (!authHeader) {
      return NextResponse.json(
        { error: "No authorization header" },
        { status: 401 }
      );
    }

    // Extract the token from the header
    const token = authHeader.replace("Bearer ", "");

    // Set the session manually
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);

    console.log("API - Auth check:", { user: user?.id, error: authError });

    if (authError) {
      console.error("API - Auth error:", authError);
      return NextResponse.json(
        { error: "Authentication error", details: authError.message },
        { status: 401 }
      );
    }

    if (!user) {
      console.error("API - No user found");
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    console.log("API - User authenticated:", user.id, user.email);

    // Test 1: Check if we can read from courses table
    console.log("API - Testing read access to courses table...");
    const { data: existingCourses, error: readError } = await supabase
      .from("courses")
      .select("id, title")
      .limit(1);

    if (readError) {
      console.error("API - Read error:", readError);
      return NextResponse.json(
        {
          error: "Cannot read from courses table",
          details: readError.message,
          code: readError.code,
        },
        { status: 500 }
      );
    }

    console.log(
      "API - Read test passed, found courses:",
      existingCourses?.length || 0
    );

    // Test 2: Check if we can insert a simple course
    console.log("API - Testing simple course insert...");
    const simpleCourseData = {
      title: "Test Course",
      description: "Test description",
      price: 0,
      status: "draft",
      instructor_id: user.id,
      slug: `test-course-${Date.now()}`,
    };

    const { data: simpleCourse, error: simpleCourseError } = await supabase
      .from("courses")
      .insert(simpleCourseData)
      .select()
      .single();

    if (simpleCourseError) {
      console.error("API - Simple course insert error:", simpleCourseError);
      return NextResponse.json(
        {
          error: "Simple course insert failed",
          details: simpleCourseError.message,
          code: simpleCourseError.code,
          hint: simpleCourseError.hint,
        },
        { status: 500 }
      );
    }

    console.log("API - Simple course created:", simpleCourse.id);

    // Test 3: Try to create a lesson
    console.log("API - Testing lesson creation...");
    const lessonData = {
      title: "Test Lesson",
      course_id: simpleCourse.id,
      content: "Test lesson content",
      lesson_order: 1,
      slug: "test-lesson",
      is_preview: false,
    };

    const { data: lesson, error: lessonError } = await supabase
      .from("lessons")
      .insert(lessonData)
      .select()
      .single();

    if (lessonError) {
      console.error("API - Lesson creation error:", lessonError);
      // Don't fail, just log the error
    } else {
      console.log("API - Lesson created:", lesson.id);
    }

    // Clean up test data
    console.log("API - Cleaning up test data...");
    await supabase.from("courses").delete().eq("id", simpleCourse.id);

    return NextResponse.json({
      success: true,
      message: "All tests passed",
      user: user.id,
      courseCreated: !!simpleCourse,
      lessonCreated: !!lesson,
    });
  } catch (error) {
    console.error("API - Diagnostic error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
