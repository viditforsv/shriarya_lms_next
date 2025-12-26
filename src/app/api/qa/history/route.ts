import { NextRequest, NextResponse } from "next/server";
import { createSupabaseApiClient } from "@/lib/supabase/api-client";

// Get QA history
export async function GET(request: NextRequest) {
  try {
    const supabase = createSupabaseApiClient();

    const { searchParams } = new URL(request.url);
    const qaId = searchParams.get("qa_id");
    const action = searchParams.get("action");

    let query = supabase
      .from("qa_history")
      .select("*")
      .order("created_at", { ascending: false });

    // Apply filters
    if (qaId) {
      query = query.eq("qa_id", qaId);
    }
    if (action) {
      query = query.eq("action", action);
    }

    const { data: history, error } = await query;

    if (error) {
      console.error("Error fetching QA history:", error);
      return NextResponse.json(
        { error: "Failed to fetch QA history" },
        { status: 500 }
      );
    }

    return NextResponse.json({ history: history || [] });
  } catch (error) {
    console.error("Error in GET /api/qa/history:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Create QA history entry
export async function POST(request: NextRequest) {
  try {
    const supabase = createSupabaseApiClient();

    const body = await request.json();
    const { qa_id, action, old_value, new_value, action_by, action_reason } =
      body;

    if (!qa_id || !action) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { data: historyEntry, error } = await supabase
      .from("qa_history")
      .insert({
        qa_id,
        action,
        old_value,
        new_value,
        action_by,
        action_reason,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating QA history entry:", error);
      return NextResponse.json(
        { error: "Failed to create QA history entry" },
        { status: 500 }
      );
    }

    return NextResponse.json({ history_entry: historyEntry });
  } catch (error) {
    console.error("Error in POST /api/qa/history:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
