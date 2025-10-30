import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// GET /api/lessons/[lessonId]/questions - Get questions for a lesson
export async function GET(
  request: Request,
  { params }: { params: Promise<{ lessonId: string }> }
) {
  try {
    const resolvedParams = await params;
    const lessonId = resolvedParams.lessonId;

    if (!lessonId) {
      return NextResponse.json(
        { error: "Lesson ID is required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Get lesson details first
    const { data: lesson, error: lessonError } = await supabase
      .from("courses_lessons")
      .select("title, topic_number, lesson_code, course_id")
      .eq("id", lessonId)
      .single();

    if (lessonError || !lesson) {
      return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
    }

    // Get course slug
    const { data: course, error: courseError } = await supabase
      .from("courses")
      .select("slug")
      .eq("id", lesson.course_id)
      .single();

    const courseSlug = course?.slug || "";

    // For now, let's use a simple approach - return some sample questions
    // In production, you'd have a proper question-lesson linking table
    const sampleQuestions = [
      {
        id: "dc816261-de46-4274-b926-2554b5dadfa5",
        question_text:
          "Consider the sequence $u_n: \\quad -9,-7,-5,-3, \\ldots$\n\\begin{parts}\n\\part[2] Write down the values of $u_1$ and $u_2$.\n\\part[2] Write down the values of $s_1$ and $s_2$.\n\\part[2] Write a formula for the general term $u_n$ and $s_n$\n\\end{parts}",
        tags: ["arithmetic sequence", "general term", "sum"],
        marks: 6,
        solution:
          "This is an arithmetic sequence with first term $a = -9$ and common difference $d = 2$.\n\n(a) $u_1 = -9$, $u_2 = -7$\n\n(b) $s_1 = -9$, $s_2 = -16$\n\n(c) $u_n = -9 + (n-1) \\times 2 = 2n - 11$\n$s_n = \\frac{n}{2}[2(-9) + (n-1)(2)] = \\frac{n}{2}[-18 + 2n - 2] = n(n-10)$",
        difficulty: 3,
      },
      {
        id: "62660fbb-a7ad-449c-91e3-56435d986c8e",
        question_text:
          "Consider the sequence $u_n: \\quad 2+\\sqrt{3},\\;2+2\\sqrt{3},\\;2+3\\sqrt{3}, \\ldots$\n\\begin{parts}\n\\part[1] Write down the values of $u_2$.\n\\part[2] Write down the values of $s_4$.\n\\part[2] Write a formula for the general term $u_n$ and $s_n$\n\\part[2] Write down the values of $u_{15}$ and $s_{15}$.\n\\end{parts}",
        tags: ["arithmetic sequence", "irrational numbers", "sum"],
        marks: 7,
        solution:
          "This is an arithmetic sequence with first term $a = 2+\\sqrt{3}$ and common difference $d = \\sqrt{3}$.\n\n(a) $u_2 = 2+2\\sqrt{3}$\n\n(b) $s_4 = \\frac{4}{2}[2(2+\\sqrt{3}) + 3(\\sqrt{3})] = 2[4+2\\sqrt{3} + 3\\sqrt{3}] = 8 + 10\\sqrt{3}$\n\n(c) $u_n = 2+\\sqrt{3} + (n-1)\\sqrt{3} = 2 + n\\sqrt{3}$\n$s_n = \\frac{n}{2}[2(2+\\sqrt{3}) + (n-1)\\sqrt{3}] = \\frac{n}{2}[4 + (n+1)\\sqrt{3}]$\n\n(d) $u_{15} = 2 + 15\\sqrt{3}$, $s_{15} = \\frac{15}{2}[4 + 16\\sqrt{3}] = 30 + 120\\sqrt{3}$",
        difficulty: 4,
      },
    ];

    // Filter questions based on lesson content or course
    let questions = sampleQuestions;
    const isCBSE10Course = courseSlug === "cbse-mathematics-class-10";
    const isArithmeticLesson =
      lesson.title.toLowerCase().includes("arithmetic") ||
      lesson.title.toLowerCase().includes("sequence") ||
      lesson.title.toLowerCase().includes("progression") ||
      lesson.title.toLowerCase().includes("ap");

    if (isArithmeticLesson) {
      // Return questions for arithmetic-related lessons
      questions = sampleQuestions;
    } else if (isCBSE10Course) {
      // For CBSE Class 10, return questions for all lessons (for testing)
      questions = sampleQuestions;
    } else {
      // Return empty for other lessons
      questions = [];
    }

    return NextResponse.json({
      questions: questions,
      lesson: lesson,
    });
  } catch (error) {
    console.error("Error in questions API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/lessons/[lessonId]/questions - Link a question to a lesson
export async function POST(
  request: Request,
  { params }: { params: Promise<{ lessonId: string }> }
) {
  try {
    const resolvedParams = await params;
    const lessonId = resolvedParams.lessonId;
    const body = await request.json();
    const { questionId } = body;

    if (!lessonId || !questionId) {
      return NextResponse.json(
        { error: "Lesson ID and Question ID are required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Verify lesson exists
    const { data: lesson, error: lessonError } = await supabase
      .from("courses_lessons")
      .select("id")
      .eq("id", lessonId)
      .single();

    if (lessonError || !lesson) {
      return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
    }

    // Verify question exists
    const { data: question, error: questionError } = await supabase
      .from("question_bank")
      .select("id")
      .eq("id", questionId)
      .single();

    if (questionError || !question) {
      return NextResponse.json(
        { error: "Question not found" },
        { status: 404 }
      );
    }

    // TODO: Create a proper lesson_questions junction table
    // For now, we'll just return success
    // In production, you'd insert into a lesson_questions table

    return NextResponse.json({
      message: "Question linked to lesson successfully",
      lessonId,
      questionId,
    });
  } catch (error) {
    console.error("Error linking question:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
