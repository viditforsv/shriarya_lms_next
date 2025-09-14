import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(request: NextRequest) {
  try {
    // Use service role key for API routes to bypass RLS
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const subject = searchParams.get("subject") || "";
    const difficulty = searchParams.get("difficulty") || "";
    const question_type = searchParams.get("question_type") || "";
    const board = searchParams.get("board") || "";
    const grade = searchParams.get("grade") || "";
    const topic = searchParams.get("topic") || "";
    const is_pyq = searchParams.get("is_pyq") || "";
    const qa_status = searchParams.get("qa_status") || "";

    // Calculate offset
    const offset = (page - 1) * limit;

    // Build the query - only select necessary fields for listing
    let query = supabase
      .from("question_bank")
      .select(
        `
        id,
        question_text,
        difficulty,
        question_type,
        subject,
        board,
        grade,
        topic,
        tags,
        is_pyq,
        total_marks,
        pyq_year,
        month,
        paper_number,
        "Time Zone",
        created_at,
        updated_at,
        question_qa!left(
          qa_status,
          priority_level,
          is_flagged,
          overall_rating
        )
      `,
        { count: "exact" }
      )
      .eq("is_active", true);

    // Apply filters
    if (subject) {
      query = query.eq("subject", subject);
    }
    if (difficulty) {
      query = query.eq("difficulty", parseInt(difficulty));
    }
    if (question_type) {
      query = query.eq("question_type", question_type);
    }
    if (board) {
      query = query.eq("board", board);
    }
    if (grade) {
      query = query.eq("grade", grade);
    }
    if (topic) {
      query = query.ilike("topic", `%${topic}%`);
    }
    if (is_pyq) {
      query = query.eq("is_pyq", is_pyq === "true");
    }

    // Apply QA status filter
    if (qa_status) {
      if (qa_status === "pending") {
        // Questions without QA records or with pending status
        query = query.or(`question_qa.qa_status.eq.pending,question_qa.is.null`);
      } else {
        // Questions with specific QA status
        query = query.eq("question_qa.qa_status", qa_status);
      }
    }

    // Apply search
    if (search) {
      query = query.or(
        `question_text.ilike.%${search}%,tags.cs.{${search}},topic.ilike.%${search}%,subtopic.ilike.%${search}%`
      );
    }

    // Apply pagination and ordering
    query = query
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    const { data: questions, error, count } = await query;

    if (error) {
      console.error("Error fetching questions:", error);
      return NextResponse.json(
        { error: "Failed to fetch questions" },
        { status: 500 }
      );
    }

    const totalPages = Math.ceil((count || 0) / limit);

    return NextResponse.json({
      questions: questions || [],
      total: count || 0,
      page,
      limit,
      totalPages,
    });
  } catch (error) {
    console.error("Error in question bank API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Use service role key for API routes to bypass RLS
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const body = await request.json();

    // Remove fields that shouldn't be set on creation
    const {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      id: _id,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      created_at: _created_at,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      updated_at: _updated_at,
      ...questionData
    } = body;

    // Add timestamps
    questionData.created_at = new Date().toISOString();
    questionData.updated_at = new Date().toISOString();

    // Ensure is_active is true for new questions
    questionData.is_active = true;

    const { data: question, error } = await supabase
      .from("question_bank")
      .insert(questionData)
      .select()
      .single();

    if (error) {
      console.error("Error creating question:", error);
      return NextResponse.json(
        { error: "Failed to create question" },
        { status: 500 }
      );
    }

    return NextResponse.json(question, { status: 201 });
  } catch (error) {
    console.error("Error in question creation API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
