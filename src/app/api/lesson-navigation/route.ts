import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// GET - Get lightweight lesson navigation data only
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

    // First get course ID from slug
    const { data: course, error: courseError } = await supabase
      .from("courses")
      .select("id")
      .eq("slug", courseSlug)
      .single();

    if (courseError || !course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    // Fetch only navigation data (no heavy content)
    const { data: lessons, error } = await supabase
      .from("courses_lessons")
      .select(
        `
        id,
        title,
        slug,
        lesson_order,
        is_preview,
        video_thumbnail_url,
        unit_name,
        chapter_name
      `
      )
      .eq("course_id", course.id)
      .order("lesson_order", { ascending: true });

    if (error) {
      console.error("Error fetching lesson navigation:", error);
      return NextResponse.json(
        { error: "Failed to fetch lesson navigation" },
        { status: 500 }
      );
    }

    // Clean up corrupted slugs in the response
    const cleanedLessons = (lessons || []).map((lesson) => ({
      ...lesson,
      slug: lesson.slug.includes(
        "cbse-mathematics-class-9-cbse-mathematics-class-9"
      )
        ? lesson.slug.split("-").slice(-2).join("-") // Extract last 2 parts
        : lesson.slug,
    }));

    return NextResponse.json(
      {
        lessons: cleanedLessons,
      },
      {
        headers: {
          "Cache-Control": "public, max-age=180, stale-while-revalidate=360", // 3min cache, 6min stale
        },
      }
    );
  } catch (error) {
    console.error("Error in lesson navigation API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
