import { NextRequest, NextResponse } from "next/server";
import { createSupabaseApiClient } from "@/lib/supabase/api-client";

// GET /api/quizzes - Get all quizzes with optional filters
export async function GET(request: NextRequest) {
  try {
    const supabase = createSupabaseApiClient();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const lessonId = searchParams.get("lesson_id");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const offset = (page - 1) * limit;

    // If ID provided, fetch single quiz
    if (id) {
      const { data, error } = await supabase
        .from("quizzes")
        .select(
          `
          *,
          courses_lessons!quizzes_lesson_id_fkey (
            id,
            title,
            lesson_code,
            course_id
          )
        `
        )
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching quiz:", error);
        return NextResponse.json(
          { error: "Failed to fetch quiz" },
          { status: 500 }
        );
      }

      return NextResponse.json({
        quizzes: data ? [data] : [],
        total: data ? 1 : 0,
      });
    }

    let query = supabase
      .from("quizzes")
      .select(
        `
        *,
        courses_lessons!quizzes_lesson_id_fkey (
          id,
          title,
          lesson_code,
          course_id
        )
      `,
        { count: "exact" }
      )
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (lessonId) {
      query = query.eq("lesson_id", lessonId);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error("Error fetching quizzes:", error);
      return NextResponse.json(
        { error: "Failed to fetch quizzes" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      quizzes: data,
      total: count || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit),
    });
  } catch (error) {
    console.error("Error in GET /api/quizzes:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/quizzes - Create a new quiz
export async function POST(request: NextRequest) {
  try {
    const supabase = createSupabaseApiClient();

    const body = await request.json();
    const { lesson_id, title, difficulty, time_limit, question_ids } = body;

    // Validate required fields
    if (!title) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    // Create the quiz
    const { data: quiz, error: quizError } = await supabase
      .from("quizzes")
      .insert({
        lesson_id: lesson_id || null,
        title,
        difficulty: difficulty || null,
        time_limit: time_limit || null,
      })
      .select()
      .single();

    if (quizError) {
      console.error("Error creating quiz:", quizError);
      return NextResponse.json(
        { error: "Failed to create quiz" },
        { status: 500 }
      );
    }

    // Update lesson with quiz_id if lesson is specified
    if (lesson_id && quiz.id) {
      const { error: lessonUpdateError } = await supabase
        .from("courses_lessons")
        .update({ quiz_id: quiz.id })
        .eq("id", lesson_id);

      if (lessonUpdateError) {
        console.error("Error updating lesson with quiz_id:", lessonUpdateError);
        // Don't fail the quiz creation, but log the error
      }
    }

    // If question_ids provided, add questions to quiz
    if (question_ids && Array.isArray(question_ids) && question_ids.length > 0) {
      const quizQuestions = question_ids.map((questionId: string, index: number) => ({
        quiz_id: quiz.id,
        question_id: questionId,
        question_order: index + 1,
      }));

      const { error: questionsError } = await supabase
        .from("quiz_questions")
        .insert(quizQuestions);

      if (questionsError) {
        console.error("Error adding questions to quiz:", questionsError);
        // Don't fail the quiz creation, but log the error
      }
    }

    return NextResponse.json(quiz, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/quizzes:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT /api/quizzes - Update a quiz
export async function PUT(request: NextRequest) {
  try {
    const supabase = createSupabaseApiClient();

    const body = await request.json();
    const { id, lesson_id, title, difficulty, time_limit } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Quiz ID is required" },
        { status: 400 }
      );
    }

    interface QuizUpdates {
      lesson_id?: string | null;
      title?: string;
      difficulty?: string | null;
      time_limit?: number | null;
    }

    const updates: QuizUpdates = {};
    if (lesson_id !== undefined) updates.lesson_id = lesson_id;
    if (title !== undefined) updates.title = title;
    if (difficulty !== undefined) updates.difficulty = difficulty;
    if (time_limit !== undefined) updates.time_limit = time_limit;

    // Get old lesson_id before updating
    const { data: oldQuiz } = await supabase
      .from("quizzes")
      .select("lesson_id")
      .eq("id", id)
      .single();

    const { data, error } = await supabase
      .from("quizzes")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating quiz:", error);
      return NextResponse.json(
        { error: "Failed to update quiz" },
        { status: 500 }
      );
    }

    // Handle lesson_id changes
    if (lesson_id !== undefined) {
      // Clear old lesson's quiz_id if it changed
      if (oldQuiz?.lesson_id && oldQuiz.lesson_id !== lesson_id) {
        await supabase
          .from("courses_lessons")
          .update({ quiz_id: null })
          .eq("id", oldQuiz.lesson_id);
      }

      // Set new lesson's quiz_id
      if (lesson_id) {
        const { error: lessonUpdateError } = await supabase
          .from("courses_lessons")
          .update({ quiz_id: id })
          .eq("id", lesson_id);

        if (lessonUpdateError) {
          console.error("Error updating lesson with quiz_id:", lessonUpdateError);
        }
      }
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in PUT /api/quizzes:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/quizzes - Delete a quiz
export async function DELETE(request: NextRequest) {
  try {
    const supabase = createSupabaseApiClient();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Quiz ID is required" },
        { status: 400 }
      );
    }

    // Get quiz to find lesson_id before deleting
    const { data: quiz } = await supabase
      .from("quizzes")
      .select("lesson_id")
      .eq("id", id)
      .single();

    // Delete associated quiz questions first
    await supabase.from("quiz_questions").delete().eq("quiz_id", id);

    // Delete the quiz
    const { error } = await supabase.from("quizzes").delete().eq("id", id);

    if (error) {
      console.error("Error deleting quiz:", error);
      return NextResponse.json(
        { error: "Failed to delete quiz" },
        { status: 500 }
      );
    }

    // Clear quiz_id from lesson if it was linked
    if (quiz?.lesson_id) {
      await supabase
        .from("courses_lessons")
        .update({ quiz_id: null })
        .eq("id", quiz.lesson_id);
    }

    return NextResponse.json({ message: "Quiz deleted successfully" });
  } catch (error) {
    console.error("Error in DELETE /api/quizzes:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

