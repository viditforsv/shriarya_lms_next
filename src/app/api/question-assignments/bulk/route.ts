import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// POST /api/question-assignments/bulk - Bulk assign questions based on filters
export async function POST(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const body = await request.json();
    const {
      assigned_to,
      assignment_type = "edit",
      priority = "medium",
      due_date,
      notes,
      filters, // Filter criteria for selecting questions
      max_questions = 100, // Limit to prevent overwhelming
    } = body;

    if (!assigned_to) {
      return NextResponse.json(
        { error: "assigned_to is required" },
        { status: 400 }
      );
    }

    // Build question selection query based on filters
    let questionQuery = supabase
      .from("question_bank")
      .select("id")
      .eq("is_active", true);

    // Apply filters
    if (filters.subject) {
      questionQuery = questionQuery.eq("subject", filters.subject);
    }
    if (filters.difficulty) {
      questionQuery = questionQuery.eq(
        "difficulty",
        parseInt(filters.difficulty)
      );
    }
    if (filters.question_type) {
      questionQuery = questionQuery.eq("question_type", filters.question_type);
    }
    if (filters.board) {
      questionQuery = questionQuery.eq("board", filters.board);
    }
    if (filters.grade) {
      questionQuery = questionQuery.eq("grade", filters.grade);
    }
    if (filters.topic) {
      questionQuery = questionQuery.ilike("topic", `%${filters.topic}%`);
    }
    if (filters.is_pyq !== undefined) {
      questionQuery = questionQuery.eq("is_pyq", filters.is_pyq);
    }
    if (filters.pyq_year) {
      questionQuery = questionQuery.eq("pyq_year", filters.pyq_year);
    }
    if (filters.month) {
      questionQuery = questionQuery.eq("month", filters.month);
    }
    if (filters.paper_number) {
      questionQuery = questionQuery.eq("paper_number", filters.paper_number);
    }
    if (filters.qa_status) {
      if (filters.qa_status === "pending") {
        questionQuery = questionQuery.or(
          `question_qa.qa_status.eq.pending,question_qa.is.null`
        );
      } else {
        questionQuery = questionQuery.eq(
          "question_qa.qa_status",
          filters.qa_status
        );
      }
    }

    // Exclude already assigned questions
    const { data: existingAssignments } = await supabase
      .from("question_assignments")
      .select("question_id")
      .eq("assigned_to", assigned_to)
      .eq("status", "assigned");

    if (existingAssignments && existingAssignments.length > 0) {
      const assignedQuestionIds = existingAssignments.map((a) => a.question_id);
      questionQuery = questionQuery.not(
        "id",
        "in",
        `(${assignedQuestionIds.join(",")})`
      );
    }

    // Apply limit and get questions
    const {
      data: questions,
      error: questionsError,
      count,
    } = await questionQuery.limit(max_questions);

    if (questionsError) {
      console.error("Error fetching questions:", questionsError);
      return NextResponse.json(
        { error: "Failed to fetch questions" },
        { status: 500 }
      );
    }

    // If this is a preview request, just return the count
    if (body.preview) {
      return NextResponse.json({
        count: count || 0,
        message: `Found ${count || 0} questions matching the criteria`,
      });
    }

    if (!questions || questions.length === 0) {
      return NextResponse.json({
        message: "No questions found matching the criteria",
        assigned_count: 0,
      });
    }

    // Create bulk assignments
    const assignments = questions.map((question) => ({
      question_id: question.id,
      assigned_to,
      assigned_by: "system", // You might want to get this from auth
      assignment_type,
      priority,
      due_date: due_date || null,
      notes: notes || `Bulk assignment - ${filters.subject || "All subjects"}`,
      status: "assigned",
    }));

    const { data: createdAssignments, error: createError } = await supabase
      .from("question_assignments")
      .insert(assignments)
      .select();

    if (createError) {
      console.error("Error creating bulk assignments:", createError);
      return NextResponse.json(
        { error: "Failed to create assignments" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: `Successfully assigned ${createdAssignments.length} questions`,
      assigned_count: createdAssignments.length,
      assignments: createdAssignments,
    });
  } catch (error) {
    console.error("Error in bulk assignment API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
