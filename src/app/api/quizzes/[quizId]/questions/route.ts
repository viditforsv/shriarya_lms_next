import { NextRequest, NextResponse } from "next/server";
import { createSupabaseApiClient } from "@/lib/supabase/api-client";

// GET /api/quizzes/[quizId]/questions - Get all questions for a quiz
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ quizId: string }> }
) {
  try {
    const resolvedParams = await params;
    const quizId = resolvedParams.quizId;

    const supabase = createSupabaseApiClient();

    const { data, error } = await supabase
      .from("quiz_questions")
      .select(
        `
        id,
        question_order,
        question_bank (
          id,
          question_text,
          difficulty,
          question_type,
          total_marks,
          tags,
          topic,
          subtopic,
          options,
          correct_answer,
          explanation
        )
      `
      )
      .eq("quiz_id", quizId)
      .order("question_order", { ascending: true });

    if (error) {
      console.error("Error fetching quiz questions:", error);
      return NextResponse.json(
        { error: "Failed to fetch quiz questions" },
        { status: 500 }
      );
    }

    return NextResponse.json({ questions: data });
  } catch (error) {
    console.error("Error in GET /api/quizzes/[quizId]/questions:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/quizzes/[quizId]/questions - Add questions to a quiz
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ quizId: string }> }
) {
  try {
    const resolvedParams = await params;
    const quizId = resolvedParams.quizId;
    const body = await request.json();
    const { question_ids } = body;

    if (!Array.isArray(question_ids) || question_ids.length === 0) {
      return NextResponse.json(
        { error: "question_ids must be a non-empty array" },
        { status: 400 }
      );
    }

    const supabase = createSupabaseApiClient();

    // Get current max order
    const { data: existingQuestions } = await supabase
      .from("quiz_questions")
      .select("question_order")
      .eq("quiz_id", quizId)
      .order("question_order", { ascending: false })
      .limit(1);

    const startOrder = existingQuestions && existingQuestions.length > 0
      ? existingQuestions[0].question_order + 1
      : 1;

    // Create quiz questions
    const quizQuestions = question_ids.map((questionId: string, index: number) => ({
      quiz_id: quizId,
      question_id: questionId,
      question_order: startOrder + index,
    }));

    const { data, error } = await supabase
      .from("quiz_questions")
      .insert(quizQuestions)
      .select();

    if (error) {
      console.error("Error adding questions to quiz:", error);
      return NextResponse.json(
        { error: "Failed to add questions to quiz" },
        { status: 500 }
      );
    }

    return NextResponse.json({ added: data.length, questions: data }, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/quizzes/[quizId]/questions:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/quizzes/[quizId]/questions - Remove a question from quiz
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ quizId: string }> }
) {
  try {
    const resolvedParams = await params;
    const quizId = resolvedParams.quizId;
    const { searchParams } = new URL(request.url);
    const questionId = searchParams.get("question_id");

    if (!questionId) {
      return NextResponse.json(
        { error: "question_id is required" },
        { status: 400 }
      );
    }

    const supabase = createSupabaseApiClient();

    const { error } = await supabase
      .from("quiz_questions")
      .delete()
      .eq("quiz_id", quizId)
      .eq("question_id", questionId);

    if (error) {
      console.error("Error removing question from quiz:", error);
      return NextResponse.json(
        { error: "Failed to remove question from quiz" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Question removed from quiz" });
  } catch (error) {
    console.error("Error in DELETE /api/quizzes/[quizId]/questions:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT /api/quizzes/[quizId]/questions - Reorder questions in quiz
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ quizId: string }> }
) {
  try {
    const resolvedParams = await params;
    const quizId = resolvedParams.quizId;
    const body = await request.json();
    const { question_orders } = body; // Array of {question_id, question_order}

    if (!Array.isArray(question_orders)) {
      return NextResponse.json(
        { error: "question_orders must be an array" },
        { status: 400 }
      );
    }

    const supabase = createSupabaseApiClient();

    // Update each question's order
    const updates = question_orders.map(({ question_id, question_order }) =>
      supabase
        .from("quiz_questions")
        .update({ question_order })
        .eq("quiz_id", quizId)
        .eq("question_id", question_id)
    );

    await Promise.all(updates);

    return NextResponse.json({ message: "Question order updated" });
  } catch (error) {
    console.error("Error in PUT /api/quizzes/[quizId]/questions:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

