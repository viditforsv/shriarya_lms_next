import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// GET - Get full content for a specific lesson
export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const lessonSlug = searchParams.get("lesson_slug");
    const courseSlug = searchParams.get("course_slug");

    if (!lessonSlug || !courseSlug) {
      return NextResponse.json(
        { error: "lesson_slug and course_slug are required" },
        { status: 400 }
      );
    }

    // First get course ID from slug
    const { data: course, error: courseError } = await supabase
      .from("courses")
      .select("id")
      .eq("slug", courseSlug)
      .single();

    if (courseError || !course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    // Handle slug mismatch - clean up corrupted slugs
    let actualLessonSlug = lessonSlug;

    // Handle lesson- prefix
    if (lessonSlug.startsWith("lesson-")) {
      const parts = lessonSlug.split("-");
      if (parts.length >= 3) {
        actualLessonSlug = parts.slice(2).join("-");
      }
    }

    // Handle corrupted repeated slugs (e.g., cbse-mathematics-class-9-cbse-mathematics-class-9-...)
    if (
      actualLessonSlug.includes(
        "cbse-mathematics-class-9-cbse-mathematics-class-9"
      )
    ) {
      // Extract the clean slug after the repeated part
      const parts = actualLessonSlug.split("-");
      const cbseIndex = parts.indexOf("cbse9");
      if (cbseIndex !== -1) {
        actualLessonSlug = parts.slice(cbseIndex).join("-");
      }
    }

    // Fetch full lesson content
    const { data: lesson, error } = await supabase
      .from("courses_lessons")
      .select(
        `
        id,
        title,
        slug,
        lesson_order,
        is_preview,
        content_html,
        content,
        video_url,
        video_thumbnail,
        pdf_url,
        key_points,
        notes,
        course_id
      `
      )
      .eq("slug", actualLessonSlug)
      .eq("course_id", course.id)
      .single();

    if (error) {
      console.error("Error fetching lesson content:", error);
      return NextResponse.json(
        { error: "Failed to fetch lesson content" },
        { status: 500 }
      );
    }

    if (!lesson) {
      return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        lesson: {
          id: lesson.id,
          title: lesson.title,
          slug: lesson.slug,
          lesson_order: lesson.lesson_order,
          is_preview: lesson.is_preview,
          content_html: lesson.content_html,
          content: lesson.content,
          video_url: lesson.video_url,
          video_thumbnail: lesson.video_thumbnail,
          pdf_url: lesson.pdf_url,
          key_points: lesson.key_points,
          notes: lesson.notes,
          course_id: lesson.course_id,
        },
      },
      {
        headers: {
          "Cache-Control": "public, max-age=60, stale-while-revalidate=120", // 1min cache, 2min stale
        },
      }
    );
  } catch (error) {
    console.error("Error in lesson content API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
