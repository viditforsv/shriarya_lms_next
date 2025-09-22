import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Get all questions (only active ones)
    const { data: allQuestions, error: questionsError } = await supabase
      .from("question_bank")
      .select("id")
      .eq("is_active", true);

    if (questionsError) {
      console.error("Error fetching questions:", questionsError);
      return NextResponse.json(
        { error: "Failed to fetch questions" },
        { status: 500 }
      );
    }

    // Get all QA records
    const { data: existingQA, error: qaError } = await supabase
      .from("qa_questions")
      .select("question_id");

    if (qaError) {
      console.error("Error fetching QA records:", qaError);
      return NextResponse.json(
        { error: "Failed to fetch QA records" },
        { status: 500 }
      );
    }

    console.log(`Total questions: ${allQuestions?.length || 0}`);
    console.log(`Total QA records: ${existingQA?.length || 0}`);

    // Find questions without QA records
    const existingQAIds = new Set(
      existingQA?.map((qa) => qa.question_id) || []
    );
    const questionsWithoutQA =
      allQuestions?.filter((q) => !existingQAIds.has(q.id)) || [];

    console.log(`Questions without QA: ${questionsWithoutQA.length}`);

    if (!questionsWithoutQA || questionsWithoutQA.length === 0) {
      return NextResponse.json({
        message: "All questions already have QA records",
        created: 0,
      });
    }

    // Create QA records for questions that don't have them
    const qaRecords = questionsWithoutQA.map((question) => ({
      question_id: question.id,
      qa_status: "pending",
      priority_level: "medium",
      is_flagged: false,
      revision_count: 0,
      qa_tags: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }));

    const { error: insertError } = await supabase
      .from("qa_questions")
      .insert(qaRecords);

    if (insertError) {
      console.error("Error creating QA records:", insertError);
      return NextResponse.json(
        { error: "Failed to create QA records" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: `Successfully created ${qaRecords.length} QA records`,
      created: qaRecords.length,
    });
  } catch (error) {
    console.error("Error in QA migration:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
