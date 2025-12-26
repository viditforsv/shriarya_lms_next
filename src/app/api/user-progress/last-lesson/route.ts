import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

interface LessonData {
  id: string;
  title: string;
  slug: string;
  lesson_order: number;
}

interface UserProgressWithLesson {
  id: string;
  last_accessed_at: string;
  lesson_id: string;
  courses_lessons: LessonData | LessonData[] | null;
}

// GET - Get the last accessed lesson for a user in a specific course
export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const courseSlug = searchParams.get("course_slug");

    if (!courseSlug) {
      return NextResponse.json(
        { error: "course_slug is required" },
        { status: 400 }
      );
    }

    // Get current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      // For unauthenticated users, return null (will use first lesson)
      return NextResponse.json({ lastLesson: null });
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

    // Get the last accessed lesson for this user in this course
    const { data: lastProgress, error: progressError } = await supabase
      .from("user_progress")
      .select(
        `
        id,
        last_accessed_at,
        lesson_id,
        courses_lessons!user_progress_lesson_id_fkey (
          id,
          title,
          slug,
          lesson_order
        )
      `
      )
      .eq("user_id", user.id)
      .eq("course_id", course.id)
      .not("last_accessed_at", "is", null)
      .order("last_accessed_at", { ascending: false })
      .limit(1)
      .single();

    if (progressError && progressError.code !== "PGRST116") {
      // PGRST116 is "not found" error, which is fine
      console.error("Error fetching last lesson progress:", progressError);
      return NextResponse.json(
        { error: "Failed to fetch last lesson" },
        { status: 500 }
      );
    }

    if (!lastProgress || !lastProgress.courses_lessons) {
      // No progress found, return null (will use first lesson)
      return NextResponse.json({ lastLesson: null });
    }

    // Handle the case where courses_lessons might be an array or single object
    const progressData = lastProgress as unknown as UserProgressWithLesson;
    const lesson = Array.isArray(progressData.courses_lessons)
      ? progressData.courses_lessons[0]
      : progressData.courses_lessons;

    if (!lesson) {
      return NextResponse.json({ lastLesson: null });
    }

    return NextResponse.json({
      lastLesson: {
        id: lesson.id,
        title: lesson.title,
        slug: lesson.slug,
        lesson_order: lesson.lesson_order,
        last_accessed_at: progressData.last_accessed_at,
      },
    });
  } catch (error) {
    console.error("Error in last lesson API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
