import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// GET /api/lessons/[lessonId]/content - Get lesson content (concepts, formulas)
export async function GET(
  request: Request,
  { params }: { params: Promise<{ lessonId: string }> }
) {
  try {
    const { lessonId } = await params;
    const supabase = await createClient();

    // Fetch lesson content from course_lesson_content table
    const { data: content, error } = await supabase
      .from("course_lesson_content")
      .select("*")
      .eq("lesson_id", lessonId)
      .eq("is_active", true)
      .order("order_index", { ascending: true });

    if (error) {
      console.error("Error fetching lesson content:", error);
      return NextResponse.json(
        { error: "Failed to fetch lesson content" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      content: content || [],
    });
  } catch (error) {
    console.error("Error in lesson content API:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch lesson content",
      },
      { status: 500 }
    );
  }
}
