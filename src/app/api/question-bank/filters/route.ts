import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  try {
    // Use service role key for API routes to bypass RLS
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Fetch all questions to extract unique values
    const { data: questions, error } = await supabase
      .from("question_bank")
      .select(
        "boards, course_types, levels, subject, topic, difficulty, question_type, is_pyq, grade"
      );

    if (error) {
      console.error("Error fetching filter values:", error);
      return NextResponse.json(
        { error: "Failed to fetch filter values" },
        { status: 500 }
      );
    }

    // Extract unique values from array fields
    const uniqueBoards = new Set<string>();
    const uniqueCourseTypes = new Set<string>();
    const uniqueLevels = new Set<string>();
    const uniqueSubjects = new Set<string>();
    const uniqueTopics = new Set<string>();
    const uniqueDifficulties = new Set<number>();
    const uniqueQuestionTypes = new Set<string>();
    const uniqueGrades = new Set<string>();
    let hasPYQ = false;
    let hasPractice = false;

    questions?.forEach((q) => {
      // Array fields
      if (q.boards && Array.isArray(q.boards)) {
        q.boards.forEach((b: string) => uniqueBoards.add(b));
      }
      if (q.course_types && Array.isArray(q.course_types)) {
        q.course_types.forEach((ct: string) => uniqueCourseTypes.add(ct));
      }
      if (q.levels && Array.isArray(q.levels)) {
        q.levels.forEach((l: string) => uniqueLevels.add(l));
      }

      // String fields
      if (q.subject) uniqueSubjects.add(q.subject);
      if (q.topic) uniqueTopics.add(q.topic);
      if (q.question_type) uniqueQuestionTypes.add(q.question_type);
      if (q.grade) uniqueGrades.add(q.grade);

      // Number fields
      if (q.difficulty) uniqueDifficulties.add(q.difficulty);

      // Boolean fields
      if (q.is_pyq === true) hasPYQ = true;
      if (q.is_pyq === false) hasPractice = true;
    });

    // Also get QA-related filter values
    const { data: qaQuestions } = await supabase
      .from("qa_questions")
      .select("qa_status, priority_level");

    const uniqueQAStatuses = new Set<string>();
    const uniquePriorityLevels = new Set<string>();

    qaQuestions?.forEach((qa) => {
      if (qa.qa_status) uniqueQAStatuses.add(qa.qa_status);
      if (qa.priority_level) uniquePriorityLevels.add(qa.priority_level);
    });

    return NextResponse.json({
      boards: Array.from(uniqueBoards).sort(),
      course_types: Array.from(uniqueCourseTypes).sort(),
      levels: Array.from(uniqueLevels).sort(),
      subjects: Array.from(uniqueSubjects).sort(),
      topics: Array.from(uniqueTopics).sort(),
      difficulties: Array.from(uniqueDifficulties).sort((a, b) => a - b),
      question_types: Array.from(uniqueQuestionTypes).sort(),
      grades: Array.from(uniqueGrades).sort(),
      has_pyq: hasPYQ,
      has_practice: hasPractice,
      qa_statuses: Array.from(uniqueQAStatuses).sort(),
      priority_levels: Array.from(uniquePriorityLevels).sort(),
    });
  } catch (error) {
    console.error("Error in question bank filters API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
