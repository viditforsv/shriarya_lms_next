import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// GET - Get lightweight course metadata only
export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const courseSlug = searchParams.get("slug");

    if (!courseSlug) {
      return NextResponse.json(
        { error: "course slug is required" },
        { status: 400 }
      );
    }

    // Fetch only essential course metadata
    const { data: course, error } = await supabase
      .from("courses")
      .select(
        `
        id,
        title,
        description,
        slug,
        price,
        status,
        template_data,
        template_id
      `
      )
      .eq("slug", courseSlug)
      .single();

    if (error) {
      console.error("Error fetching course metadata:", error);
      return NextResponse.json(
        { error: "Failed to fetch course metadata" },
        { status: 500 }
      );
    }

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        course: {
          id: course.id,
          title: course.title,
          description: course.description,
          slug: course.slug,
          price: course.price,
          status: course.status,
          template_data: course.template_data || {},
          template_id: course.template_id,
        },
      },
      {
        headers: {
          "Cache-Control": "public, max-age=300, stale-while-revalidate=600", // 5min cache, 10min stale
        },
      }
    );
  } catch (error) {
    console.error("Error in course metadata API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
