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
        video_thumbnail
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

    return NextResponse.json(
      {
        lessons: lessons || [],
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
