import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Get QA comments
export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { searchParams } = new URL(request.url);
    const qaId = searchParams.get("qa_id");
    const commentType = searchParams.get("type");
    const resolved = searchParams.get("resolved");

    let query = supabase
      .from("qa_comments")
      .select("*")
      .order("created_at", { ascending: false });

    // Apply filters
    if (qaId) {
      query = query.eq("qa_id", qaId);
    }
    if (commentType) {
      query = query.eq("comment_type", commentType);
    }
    if (resolved !== null) {
      query = query.eq("is_resolved", resolved === "true");
    }

    const { data: comments, error } = await query;

    if (error) {
      console.error("Error fetching QA comments:", error);
      return NextResponse.json(
        { error: "Failed to fetch QA comments" },
        { status: 500 }
      );
    }

    return NextResponse.json({ comments: comments || [] });
  } catch (error) {
    console.error("Error in GET /api/qa/comments:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Create QA comment
export async function POST(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const body = await request.json();
    const {
      qa_id,
      commenter_id,
      comment_text,
      comment_type = "general",
    } = body;

    if (!qa_id || !commenter_id || !comment_text) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { data: comment, error } = await supabase
      .from("qa_comments")
      .insert({
        qa_id,
        commenter_id,
        comment_text,
        comment_type,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating QA comment:", error);
      return NextResponse.json(
        { error: "Failed to create QA comment" },
        { status: 500 }
      );
    }

    return NextResponse.json({ comment });
  } catch (error) {
    console.error("Error in POST /api/qa/comments:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Update QA comment
export async function PUT(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const body = await request.json();
    const { id, comment_text, is_resolved } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Missing comment ID" },
        { status: 400 }
      );
    }

    const updateData: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };

    if (comment_text !== undefined) {
      updateData.comment_text = comment_text;
    }
    if (is_resolved !== undefined) {
      updateData.is_resolved = is_resolved;
    }

    const { data: comment, error } = await supabase
      .from("qa_comments")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating QA comment:", error);
      return NextResponse.json(
        { error: "Failed to update QA comment" },
        { status: 500 }
      );
    }

    return NextResponse.json({ comment });
  } catch (error) {
    console.error("Error in PUT /api/qa/comments:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
