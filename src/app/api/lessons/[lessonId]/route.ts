import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ lessonId: string }> }
) {
  try {
    const resolvedParams = await params;
    const lessonId = resolvedParams.lessonId;

    if (!lessonId) {
      return NextResponse.json(
        { error: "Lesson ID is required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Fetch lesson with chapter and unit information
    const { data: lesson, error } = await supabase
      .from("courses_lessons")
      .select(
        `
        id,
        title,
        slug,
        lesson_order,
        is_preview,
        content,
        quiz_id,
        video_url,
        pdf_url,
        solution_url,
        video_thumbnail_url,
        topic_badge,
        topic_number,
        concept_title,
        concept_content,
        formula_title,
        formula_content,
        created_at,
        chapter_id,
        course_id,
        chapter:courses_chapters(
          id,
          chapter_name,
          chapter_order,
          unit:courses_units(
            id,
            unit_name,
            unit_order
          )
        )
      `
      )
      .eq("id", lessonId)
      .single();

    if (error) {
      console.error("Error fetching lesson:", error);
      return NextResponse.json(
        { error: "Failed to fetch lesson" },
        { status: 500 }
      );
    }

    if (!lesson) {
      return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
    }

    return NextResponse.json({
      lesson,
    });
  } catch (error) {
    console.error("Error in lesson API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ lessonId: string }> }
) {
  try {
    const resolvedParams = await params;
    const lessonId = resolvedParams.lessonId;
    const body = await request.json();

    if (!lessonId) {
      return NextResponse.json(
        { error: "Lesson ID is required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Update lesson
    const { data, error } = await supabase
      .from("courses_lessons")
      .update(body)
      .eq("id", lessonId)
      .select()
      .single();

    if (error) {
      console.error("Error updating lesson:", error);
      return NextResponse.json(
        { error: "Failed to update lesson" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      lesson: data,
      message: "Lesson updated successfully",
    });
  } catch (error) {
    console.error("Error in lesson PUT API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ lessonId: string }> }
) {
  try {
    const resolvedParams = await params;
    const lessonId = resolvedParams.lessonId;

    if (!lessonId) {
      return NextResponse.json(
        { error: "Lesson ID is required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Delete lesson
    const { error } = await supabase
      .from("courses_lessons")
      .delete()
      .eq("id", lessonId);

    if (error) {
      console.error("Error deleting lesson:", error);
      return NextResponse.json(
        { error: "Failed to delete lesson" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Lesson deleted successfully",
    });
  } catch (error) {
    console.error("Error in lesson DELETE API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
