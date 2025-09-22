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
    const pyq_year = searchParams.get("pyq_year") || "";
    const month = searchParams.get("month") || "";
    const paper_number = searchParams.get("paper_number") || "";

    // Calculate offset
    const offset = (page - 1) * limit;

    // Build the base query with select
    const baseSelect = `
      id,
      question_text,
      difficulty,
      question_type,
      subject,
      boards,
      course_types,
      levels,
      relevance,
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
      human_readable_id,
      question_display_number,
      qa_questions!left(qa_status, priority_level, is_flagged)
    `;

    let query = supabase
      .from("question_bank")
      .select(baseSelect, { count: "exact" });

    // Apply basic filters
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
      query = query.contains("boards", [board]);
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

    // Apply QA status filter - use efficient approach
    if (qa_status && qa_status !== "any") {
      console.log("Applying QA status filter:", qa_status);

      if (qa_status === "pending") {
        // For pending, get questions that either have pending status OR no QA record
        // Use a more efficient approach by limiting the dataset first
        const { data: pendingQA } = await supabase
          .from("qa_questions")
          .select("question_id")
          .eq("qa_status", "pending")
          .limit(500); // Limit to prevent URL overflow

        const pendingIds = pendingQA?.map((qa) => qa.question_id) || [];

        // Get questions without QA records (limit to prevent overflow)
        const { data: questionsWithoutQA } = await supabase
          .from("question_bank")
          .select("id")
          .eq("is_active", true)
          .limit(500);

        const { data: allQA } = await supabase
          .from("qa_questions")
          .select("question_id")
          .limit(1000);

        const allQAIds = new Set(allQA?.map((qa) => qa.question_id) || []);
        const questionsWithoutQAIds =
          questionsWithoutQA
            ?.filter((q) => !allQAIds.has(q.id))
            .map((q) => q.id) || [];

        const qaFilteredQuestionIds = [...pendingIds, ...questionsWithoutQAIds];
        console.log(
          `Found ${qaFilteredQuestionIds.length} pending questions (${pendingIds.length} with pending status, ${questionsWithoutQAIds.length} without QA records)`
        );

        // If no questions match, return empty results
        if (qaFilteredQuestionIds.length === 0) {
          return NextResponse.json({
            questions: [],
            total: 0,
            totalQuestions: 0,
            page,
            limit,
            totalPages: 0,
          });
        }

        // Apply the QA filter to the main query
        query = query.in("id", qaFilteredQuestionIds);
      } else {
        // For other QA statuses, get the question IDs first (with limit)
        const { data: qaData } = await supabase
          .from("qa_questions")
          .select("question_id")
          .eq("qa_status", qa_status)
          .limit(500); // Limit to prevent URL overflow

        const qaFilteredQuestionIds = qaData?.map((qa) => qa.question_id) || [];
        console.log(
          `Found ${qaFilteredQuestionIds.length} questions with status: ${qa_status}`
        );

        // If no questions match, return empty results
        if (qaFilteredQuestionIds.length === 0) {
          return NextResponse.json({
            questions: [],
            total: 0,
            totalQuestions: 0,
            page,
            limit,
            totalPages: 0,
          });
        }

        // Apply the QA filter to the main query
        query = query.in("id", qaFilteredQuestionIds);
      }
    }

    // Apply paper information filters
    if (pyq_year) {
      query = query.eq("pyq_year", pyq_year);
    }
    if (month) {
      query = query.eq("month", month);
    }
    if (paper_number) {
      query = query.eq("paper_number", paper_number);
    }

    // Apply search
    if (search) {
      // Check if search term looks like a UUID (8-4-4-4-12 pattern)
      const isUUID =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
          search
        );

      // Check if search term looks like a human-readable ID pattern
      const isHumanReadableId = /^[A-Z]+_[a-z]+_[a-z]+_\d+$/i.test(search);

      if (isUUID) {
        // Search by UUID
        query = query.eq("id", search);
      } else if (isHumanReadableId) {
        // Search by human-readable ID
        query = query.eq("human_readable_id", search);
      } else {
        // Regular search in question text, tags, topic, subtopic, and human-readable ID
        query = query.or(
          `question_text.ilike.%${search}%,tags.cs.{${search}},topic.ilike.%${search}%,subtopic.ilike.%${search}%,human_readable_id.ilike.%${search}%`
        );
      }
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

    // Get total count of all questions (without filters) for comparison
    const { count: totalCount } = await supabase
      .from("question_bank")
      .select("*", { count: "exact", head: true });

    const totalPages = Math.ceil((count || 0) / limit);

    return NextResponse.json({
      questions: questions || [],
      total: count || 0,
      totalQuestions: totalCount || 0,
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
