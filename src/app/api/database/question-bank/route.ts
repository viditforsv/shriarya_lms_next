import { NextRequest, NextResponse } from "next/server";
import { questionBankDB, QuestionBankRow } from "@/lib/database/questionBank";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get("action") || "list";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    let result;

    switch (action) {
      case "list": {
        // Get paginated questions
        const filters: Partial<QuestionBankRow> = {};

        // Add any filter parameters
        const subject = searchParams.get("subject");
        const difficulty = searchParams.get("difficulty");
        const board = searchParams.get("board");
        const question_type = searchParams.get("question_type");
        const grade = searchParams.get("grade");
        const is_pyq = searchParams.get("is_pyq");

        if (subject) filters.subject = subject;
        if (difficulty) filters.difficulty = parseInt(difficulty);
        if (board) filters.board = board;
        if (question_type) filters.question_type = question_type;
        if (grade) filters.grade = grade;
        if (is_pyq) filters.is_pyq = is_pyq === "true";

        result = await questionBankDB.getQuestionsPaginated(
          page,
          limit,
          filters
        );
        break;
      }

      case "stats": {
        result = await questionBankDB.getQuestionStats();
        break;
      }

      case "search": {
        const searchTerm = searchParams.get("q");
        if (!searchTerm) {
          return NextResponse.json(
            { error: "Search term required" },
            { status: 400 }
          );
        }
        result = await questionBankDB.searchQuestions(searchTerm);
        break;
      }

      case "pyq": {
        const year = searchParams.get("year");
        if (!year) {
          return NextResponse.json(
            { error: "Year required for PYQ search" },
            { status: 400 }
          );
        }
        result = await questionBankDB.getPYQQuestions(year);
        break;
      }

      case "difficulty": {
        const min = parseInt(searchParams.get("min") || "1");
        const max = parseInt(searchParams.get("max") || "10");
        result = await questionBankDB.getQuestionsByDifficultyRange(min, max);
        break;
      }

      case "board-subject": {
        const boardParam = searchParams.get("board");
        const subjectParam = searchParams.get("subject");
        if (!boardParam || !subjectParam) {
          return NextResponse.json(
            { error: "Board and subject required" },
            { status: 400 }
          );
        }
        result = await questionBankDB.getQuestionsByBoardSubject(
          boardParam,
          subjectParam
        );
        break;
      }

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Database access error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
        success: false,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Insert a new question
    const result = await questionBankDB.insertQuestion(body);

    return NextResponse.json({
      success: true,
      data: result,
      message: "Question created successfully",
    });
  } catch (error) {
    console.error("Database insert error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
        success: false,
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Question ID required" },
        { status: 400 }
      );
    }

    const body = await request.json();

    // Update the question
    const result = await questionBankDB.updateQuestion(id, body);

    return NextResponse.json({
      success: true,
      data: result,
      message: "Question updated successfully",
    });
  } catch (error) {
    console.error("Database update error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
        success: false,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Question ID required" },
        { status: 400 }
      );
    }

    // Soft delete the question
    const result = await questionBankDB.deleteQuestion(id);

    return NextResponse.json({
      success: true,
      data: result,
      message: "Question deleted successfully",
    });
  } catch (error) {
    console.error("Database delete error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
        success: false,
      },
      { status: 500 }
    );
  }
}
