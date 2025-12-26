import { NextResponse } from "next/server";
import { createSupabaseApiClient } from "@/lib/supabase/api-client";

export async function GET() {
  try {
    // Use service role key for API routes to bypass RLS
    const supabase = createSupabaseApiClient();

    // Fetch all questions to extract unique values
    const { data: questions, error } = await supabase
      .from("question_bank")
      .select(
        "boards, course_types, levels, subject, topic, difficulty, question_type, is_pyq, grade, section"
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
    // Map of board -> sections
    const sectionsByBoard = new Map<string, Set<string>>();
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
      
      // Section by board mapping
      // Handle section as either string, array, or comma-separated string
      if (q.section && q.boards && Array.isArray(q.boards)) {
        // Extract sections - handle multiple formats
        let sections: string[] = [];
        
        if (Array.isArray(q.section)) {
          // If section is already an array
          sections = q.section.filter((s): s is string => typeof s === "string" && s.trim().length > 0);
        } else if (typeof q.section === "string") {
          // If section is a string, check if it's comma-separated
          sections = q.section
            .split(/[,;|]/) // Split by comma, semicolon, or pipe
            .map((s) => s.trim())
            .filter((s) => s.length > 0);
        }
        
        // Add each unique section to each board
        if (sections.length > 0) {
          q.boards.forEach((board: string) => {
            if (!sectionsByBoard.has(board)) {
              sectionsByBoard.set(board, new Set<string>());
            }
            // Add all sections for this question to each board
            sections.forEach((section) => {
              sectionsByBoard.get(board)!.add(section);
            });
          });
        }
      }

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

    // Convert sectionsByBoard map to object
    const sectionsByBoardObj: Record<string, string[]> = {};
    sectionsByBoard.forEach((sections, board) => {
      sectionsByBoardObj[board] = Array.from(sections).sort();
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
      sections_by_board: sectionsByBoardObj,
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
