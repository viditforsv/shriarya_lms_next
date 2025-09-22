import { createClient } from "@supabase/supabase-js";

// Types for question bank data
export interface QuestionBankRow {
  id: string;
  question_text: string;
  difficulty: number;
  question_type: string;
  subject: string;
  board: string;
  grade: string;
  topic: string;
  tags: string[];
  is_pyq: boolean;
  total_marks: number;
  pyq_year?: string;
  month?: string;
  paper_number?: string;
  "Time Zone"?: string;
  created_at: string;
  updated_at: string;
  human_readable_id?: string;
  question_display_number?: string;
  is_active: boolean;
  question_qa?: {
    qa_status: string;
    priority_level: string;
    is_flagged: boolean;
    overall_rating: number;
  };
}

// Database client for direct access
function getSupabaseClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

// Direct database access functions
export class QuestionBankDatabase {
  private supabase = getSupabaseClient();

  // Get all questions with optional filters
  async getAllQuestions(filters: Partial<QuestionBankRow> = {}) {
    let query = this.supabase
      .from("question_bank")
      .select("*")
      .eq("is_active", true);

    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        query = query.eq(key, value);
      }
    });

    const { data, error } = await query;

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }

    return data as QuestionBankRow[];
  }

  // Get a single question by ID
  async getQuestionById(id: string) {
    const { data, error } = await this.supabase
      .from("question_bank")
      .select("*")
      .eq("id", id)
      .eq("is_active", true)
      .single();

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }

    return data as QuestionBankRow;
  }

  // Get questions with pagination
  async getQuestionsPaginated(
    page: number = 1,
    limit: number = 10,
    filters: Partial<QuestionBankRow> = {}
  ) {
    const offset = (page - 1) * limit;

    let query = this.supabase
      .from("question_bank")
      .select("*", { count: "exact" })
      .eq("is_active", true)
      .range(offset, offset + limit - 1)
      .order("created_at", { ascending: false });

    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        query = query.eq(key, value);
      }
    });

    const { data, error, count } = await query;

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }

    return {
      data: data as QuestionBankRow[],
      total: count || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit),
    };
  }

  // Search questions by text
  async searchQuestions(searchTerm: string, limit: number = 20) {
    const { data, error } = await this.supabase
      .from("question_bank")
      .select("*")
      .eq("is_active", true)
      .or(
        `question_text.ilike.%${searchTerm}%,human_readable_id.ilike.%${searchTerm}%,id.ilike.%${searchTerm}%`
      )
      .limit(limit);

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }

    return data as QuestionBankRow[];
  }

  // Get questions by difficulty range
  async getQuestionsByDifficultyRange(min: number, max: number) {
    const { data, error } = await this.supabase
      .from("question_bank")
      .select("*")
      .eq("is_active", true)
      .gte("difficulty", min)
      .lte("difficulty", max);

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }

    return data as QuestionBankRow[];
  }

  // Get PYQ questions for a specific year
  async getPYQQuestions(year: string) {
    const { data, error } = await this.supabase
      .from("question_bank")
      .select("*")
      .eq("is_active", true)
      .eq("is_pyq", true)
      .eq("pyq_year", year);

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }

    return data as QuestionBankRow[];
  }

  // Get questions by board and subject
  async getQuestionsByBoardSubject(board: string, subject: string) {
    const { data, error } = await this.supabase
      .from("question_bank")
      .select("*")
      .eq("is_active", true)
      .eq("board", board)
      .eq("subject", subject);

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }

    return data as QuestionBankRow[];
  }

  // Get question statistics
  async getQuestionStats() {
    const { data, error } = await this.supabase
      .from("question_bank")
      .select("difficulty, question_type, board, subject, is_pyq")
      .eq("is_active", true);

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }

    const stats = {
      total: data.length,
      byDifficulty: {} as Record<number, number>,
      byType: {} as Record<string, number>,
      byBoard: {} as Record<string, number>,
      bySubject: {} as Record<string, number>,
      pyqCount: 0,
      practiceCount: 0,
    };

    data.forEach((question) => {
      // Difficulty stats
      stats.byDifficulty[question.difficulty] =
        (stats.byDifficulty[question.difficulty] || 0) + 1;

      // Type stats
      stats.byType[question.question_type] =
        (stats.byType[question.question_type] || 0) + 1;

      // Board stats
      stats.byBoard[question.board] = (stats.byBoard[question.board] || 0) + 1;

      // Subject stats
      stats.bySubject[question.subject] =
        (stats.bySubject[question.subject] || 0) + 1;

      // PYQ vs Practice
      if (question.is_pyq) {
        stats.pyqCount++;
      } else {
        stats.practiceCount++;
      }
    });

    return stats;
  }

  // Insert a new question
  async insertQuestion(question: Partial<QuestionBankRow>) {
    const { data, error } = await this.supabase
      .from("question_bank")
      .insert([{ ...question, is_active: true }])
      .select()
      .single();

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }

    return data as QuestionBankRow;
  }

  // Update a question
  async updateQuestion(id: string, updates: Partial<QuestionBankRow>) {
    const { data, error } = await this.supabase
      .from("question_bank")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }

    return data as QuestionBankRow;
  }

  // Soft delete a question (set is_active to false)
  async deleteQuestion(id: string) {
    const { data, error } = await this.supabase
      .from("question_bank")
      .update({ is_active: false })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }

    return data as QuestionBankRow;
  }
}

// Export a singleton instance
export const questionBankDB = new QuestionBankDatabase();

// Helper function for quick access
export async function getQuestionBankData() {
  return await questionBankDB.getAllQuestions();
}
