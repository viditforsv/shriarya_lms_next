import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const lessonId = searchParams.get("lesson_id");
    const contentType = searchParams.get("content_type"); // 'concepts' or 'formulas'

    if (!lessonId) {
      return NextResponse.json(
        { error: "Lesson ID is required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Build query based on content type
    let query = supabase
      .from("course_lesson_content")
      .select("*")
      .eq("lesson_id", lessonId)
      .eq("is_active", true)
      .order("order_index", { ascending: true });

    // Filter by content type if specified
    if (contentType && ["concepts", "formulas"].includes(contentType)) {
      query = query.eq("content_type", contentType);
    }

    const { data: content, error } = await query;

    if (error) {
      console.error("Error fetching lesson content:", error);
      return NextResponse.json(
        { error: "Failed to fetch lesson content" },
        { status: 500 }
      );
    }

    // Group content by type
    const groupedContent = {
      concepts:
        content?.filter((item) => item.content_type === "concepts") || [],
      formulas:
        content?.filter((item) => item.content_type === "formulas") || [],
    };

    return NextResponse.json({
      content: groupedContent,
      total: content?.length || 0,
    });
  } catch (error) {
    console.error("Error in lesson content API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      lesson_id,
      content_type,
      title,
      content,
      content_html,
      metadata,
      order_index,
    } = body;

    if (!lesson_id || !content_type || !title) {
      return NextResponse.json(
        { error: "lesson_id, content_type, and title are required" },
        { status: 400 }
      );
    }

    if (!["concepts", "formulas"].includes(content_type)) {
      return NextResponse.json(
        { error: "content_type must be 'concepts' or 'formulas'" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { data, error } = await supabase
      .from("course_lesson_content")
      .insert({
        lesson_id,
        content_type,
        title,
        content,
        content_html,
        metadata: metadata || {},
        order_index: order_index || 0,
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating lesson content:", error);
      return NextResponse.json(
        { error: "Failed to create lesson content" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      content: data,
      message: "Lesson content created successfully",
    });
  } catch (error) {
    console.error("Error in lesson content POST API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const {
      id,
      title,
      content,
      content_html,
      metadata,
      order_index,
      is_active,
    } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Content ID is required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    interface UpdateData {
      title?: string;
      content?: string;
      content_html?: string;
      metadata?: Record<string, unknown>;
      order_index?: number;
      is_active?: boolean;
    }

    const updateData: UpdateData = {};
    if (title !== undefined) updateData.title = title;
    if (content !== undefined) updateData.content = content;
    if (content_html !== undefined) updateData.content_html = content_html;
    if (metadata !== undefined) updateData.metadata = metadata;
    if (order_index !== undefined) updateData.order_index = order_index;
    if (is_active !== undefined) updateData.is_active = is_active;

    const { data, error } = await supabase
      .from("course_lesson_content")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating lesson content:", error);
      return NextResponse.json(
        { error: "Failed to update lesson content" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      content: data,
      message: "Lesson content updated successfully",
    });
  } catch (error) {
    console.error("Error in lesson content PUT API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Content ID is required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { error } = await supabase
      .from("course_lesson_content")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting lesson content:", error);
      return NextResponse.json(
        { error: "Failed to delete lesson content" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Lesson content deleted successfully",
    });
  } catch (error) {
    console.error("Error in lesson content DELETE API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
