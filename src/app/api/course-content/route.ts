import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// GET - Get complete course content using RPC function
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

    // Call the RPC function to get complete course content
    const { data, error } = await supabase.rpc("get_cbse_course_content", {
      course_slug: courseSlug,
    });

    if (error) {
      console.error("Error fetching course content:", error);
      return NextResponse.json(
        { error: "Failed to fetch course content" },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    return NextResponse.json({
      course: data.course,
      lessons: data.lessons || [],
    });
  } catch (error) {
    console.error("Error in course content API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
