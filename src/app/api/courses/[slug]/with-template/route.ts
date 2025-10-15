import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { renderCourseWithTemplate } from "@/lib/course-template-renderer";

// GET /api/courses/[slug]/with-template - Get course with template data
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const supabase = await createClient();

    // Get course data
    const { data: course, error: courseError } = await supabase
      .from("courses")
      .select(
        `
        *,
        profiles:instructor_id (
          id,
          first_name,
          last_name,
          email
        )
      `
      )
      .eq("slug", slug)
      .single();

    if (courseError) {
      console.error("Course fetch error:", courseError);
      // Handle specific Supabase errors
      if (courseError.code === "PGRST116") {
        return NextResponse.json(
          { error: "Course not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ error: courseError.message }, { status: 500 });
    }

    if (!course) {
      console.error("Course not found:", slug);
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    // Get template data if course has a template
    let template = null;
    if (course.template_id) {
      const { data: templateData, error: templateError } = await supabase
        .from("courses_templates")
        .select("*")
        .eq("id", course.template_id)
        .single();

      if (templateError) {
        console.error("Template error:", templateError);
        // Continue without template if there's an error
      } else {
        template = templateData;
      }
    }

    // Render course with template (if available)
    const renderedCourse = template
      ? renderCourseWithTemplate(course, template)
      : course;

    return NextResponse.json({
      course,
      template,
      rendered: renderedCourse,
      isFallback: !template,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to fetch course",
      },
      { status: 500 }
    );
  }
}
