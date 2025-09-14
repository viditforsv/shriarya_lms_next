import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET() {
  try {
    // Fetch the sample question we just added
    const { data: questions, error } = await supabase
      .from("question_bank")
      .select("*")
      .eq("id", "6e801973-5373-4f1a-8646-a31157970240")
      .single();

    if (error) {
      console.error("Error fetching question:", error);
      return NextResponse.json(
        { error: "Failed to fetch question" },
        { status: 500 }
      );
    }

    if (!questions) {
      return NextResponse.json(
        { error: "Question not found" },
        { status: 404 }
      );
    }

    // Transform the database question to match our frontend interface
    const transformedQuestion = {
      id: questions.id,
      subject: questions.subject || "IBDP",
      grade: questions.grade || "HL",
      topic: questions.topic || "Functions",
      subtopic: questions.subtopic || "Trigonometric Functions",
      tags: questions.tags || ["trigonometry", "functions", "graph", "period"],
      question_text: questions.question_text,
      image_url: questions.image_url,
      question_type: questions.question_type || "subjective", // Default to subjective for our sample
      options:
        questions.options && questions.options.length > 0
          ? questions.options
          : [],
      correct_answers:
        questions.correct_answers && questions.correct_answers.length > 0
          ? questions.correct_answers
          : [],
      correct_answer: questions.correct_answer, // Keep original for compatibility
      explanation: questions.explanation,
      solution_steps: questions.solution_steps || [],
      solution_image: questions.solution_image,
      difficulty: parseInt(questions.difficulty) || 6,
      // Flexible content structure
      question_content: questions.question_content || {},
      media_attachments: questions.media_attachments || [],
      solution_content: questions.solution_content || {},
    };

    return NextResponse.json({ question: transformedQuestion });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
