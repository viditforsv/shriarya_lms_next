import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// QA Status Types
export type QAStatus =
  | "pending"
  | "in_review"
  | "needs_revision"
  | "approved"
  | "rejected"
  | "archived";
export type PriorityLevel = "low" | "medium" | "high" | "urgent";
export type CommentType =
  | "general"
  | "content"
  | "solution"
  | "formatting"
  | "difficulty"
  | "other";

// QA Record Interface
export interface QARecord {
  id: string;
  question_id: string;
  qa_status: QAStatus;
  reviewer_id?: string;
  review_date?: string;
  review_notes?: string;
  content_accuracy?: number;
  difficulty_appropriateness?: number;
  clarity_rating?: number;
  solution_quality?: number;
  overall_rating?: number;
  revision_count: number;
  last_revision_date?: string;
  revision_notes?: string;
  is_flagged: boolean;
  flag_reason?: string;
  priority_level: PriorityLevel;
  qa_tags: string[];
  created_at: string;
  updated_at: string;
}

// QA Comment Interface
export interface QAComment {
  id: string;
  qa_id: string;
  commenter_id: string;
  comment_text: string;
  comment_type: CommentType;
  is_resolved: boolean;
  created_at: string;
  updated_at: string;
}

// Get QA records for questions
export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { searchParams } = new URL(request.url);
    const questionId = searchParams.get("question_id");
    const status = searchParams.get("status");
    const priority = searchParams.get("priority");
    const flagged = searchParams.get("flagged");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    let query = supabase.from("question_qa").select(
      `
        *,
        question_bank!inner(
          id,
          question_text,
          difficulty,
          subject,
          topic
        )
      `,
      { count: "exact" }
    );

    // Apply filters
    if (questionId) {
      query = query.eq("question_id", questionId);
    }
    if (status) {
      query = query.eq("qa_status", status);
    }
    if (priority) {
      query = query.eq("priority_level", priority);
    }
    if (flagged === "true") {
      query = query.eq("is_flagged", true);
    }

    // Apply pagination
    const offset = (page - 1) * limit;
    query = query.range(offset, offset + limit - 1);

    const { data: qaRecords, error, count } = await query;

    if (error) {
      console.error("Error fetching QA records:", error);
      return NextResponse.json(
        { error: "Failed to fetch QA records" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      qa_records: qaRecords || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    });
  } catch (error) {
    console.error("Error in GET /api/qa:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Create or update QA record
export async function POST(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const body = await request.json();
    const {
      question_id,
      qa_status,
      reviewer_id,
      review_notes,
      ratings,
      priority_level,
      qa_tags,
      is_flagged,
      flag_reason,
    } = body;

    // Check if QA record already exists
    const { data: existingQA, error: checkError } = await supabase
      .from("question_qa")
      .select("id")
      .eq("question_id", question_id)
      .single();

    if (checkError && checkError.code !== "PGRST116") {
      console.error("Error checking existing QA record:", checkError);
      return NextResponse.json(
        { error: "Failed to check QA record" },
        { status: 500 }
      );
    }

    const qaData = {
      question_id,
      qa_status: qa_status || "pending",
      reviewer_id,
      review_notes,
      priority_level: priority_level || "medium",
      qa_tags: qa_tags || [],
      is_flagged: is_flagged || false,
      flag_reason,
      updated_at: new Date().toISOString(),
      ...(ratings && {
        content_accuracy: ratings.content_accuracy,
        difficulty_appropriateness: ratings.difficulty_appropriateness,
        clarity_rating: ratings.clarity_rating,
        solution_quality: ratings.solution_quality,
      }),
      ...(qa_status === "in_review" && {
        review_date: new Date().toISOString(),
      }),
    };

    let result;
    if (existingQA) {
      // Update existing record
      const { data, error } = await supabase
        .from("question_qa")
        .update(qaData)
        .eq("id", existingQA.id)
        .select()
        .single();

      if (error) {
        console.error("Error updating QA record:", error);
        return NextResponse.json(
          { error: "Failed to update QA record" },
          { status: 500 }
        );
      }
      result = data;
    } else {
      // Create new record
      const { data, error } = await supabase
        .from("question_qa")
        .insert(qaData)
        .select()
        .single();

      if (error) {
        console.error("Error creating QA record:", error);
        return NextResponse.json(
          { error: "Failed to create QA record" },
          { status: 500 }
        );
      }
      result = data;
    }

    return NextResponse.json({ qa_record: result });
  } catch (error) {
    console.error("Error in POST /api/qa:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
