/**
 * QUESTION BANK API ROUTE
 * =======================
 *
 * This API endpoint handles fetching questions from the question bank with comprehensive
 * filtering, pagination, and QA status support.
 *
 * ⚠️ **CRITICAL CONSTRAINT: Supabase 1000-Row Query Limit**
 * ==========================================================
 *
 * **The Problem**:
 * Supabase imposes a hard limit of 1000 rows per query. When filtering by QA status
 * (e.g., "pending"), we may have thousands of QA records across many questions, which
 * would exceed this limit and cause "Bad Request" errors.
 *
 * **Our Solution** (see lines 256-360):
 * 1. Fetch up to 1000 QA records using .range(0, 999) ordered by updated_at DESC
 * 2. Deduplicate in-memory to get the LATEST QA record per question
 * 3. Apply qa_status filter AFTER deduplication to ensure we get latest status
 * 4. Limit to (page_limit * 10) question IDs to prevent overwhelming .in() queries
 * 5. Use filtered question IDs to fetch actual question data
 *
 * **CRITICAL**: We fetch ALL records first, then filter because:
 * - Questions can have multiple QA records over time (pending → approved)
 * - We need the LATEST status per question, not just any matching status
 * - `.range(0, 999)` ensures we stay within Supabase's 1000-row scan limit
 * - Deduplication ensures we get the most recent QA status per question
 *
 * **Why This Works**:
 * - We fetch the most recent QA records first (ordered by updated_at DESC)
 * - Deduplication ensures we get only the LATEST QA status per question
 * - Filtering after deduplication ensures accurate status matching
 * - Limiting IDs prevents overwhelming the main query
 * - Final question fetch uses filtered IDs efficiently
 *
 * **Current Approach**:
 * - Fetches max 1000 QA records ordered by updated_at DESC
 * - Deduplicates to get LATEST QA status per question
 * - Filters by qa_status AFTER deduplication for accuracy
 * - Limits to (limit * 10) questions for .in() query
 * - This ensures we only get questions with the CURRENT status, not historical ones
 *
 * **Future Improvements** (if needed):
 * - Implement pagination for QA data fetching
 * - Create a materialized view with latest QA status per question
 * - Add a `latest_qa_status` column directly to `question_bank` table
 * - Use Supabase's RPC functions for server-side aggregation
 *
 * ENDPOINT: GET /api/question-bank
 *
 * QUERY PARAMETERS:
 * - page: Page number (default: 1)
 * - limit: Items per page (default: 10)
 * - search: Text search across question content, tags, topics, IDs
 * - subject: Filter by subject
 * - difficulty: Filter by difficulty level
 * - question_type: Filter by question type
 * - boards: Filter by educational board
 * - course_types: Filter by course type
 * - levels: Filter by academic level
 * - grade: Filter by grade
 * - topic: Filter by topic (text matching)
 * - tags: Filter by tags (comma-separated)
 * - is_pyq: Filter by Past Year Question status
 * - qa_status: Filter by QA status (⚠️ uses special handling due to 1000-row limit)
 * - priority_level: Filter by QA priority level
 * - is_flagged: Filter by flagged status
 * - pyq_year: Filter by PYQ year
 * - month: Filter by exam month
 * - paper_number: Filter by paper number
 */

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Type for QA record used in filtering
// All fields except question_id and updated_at are optional
// because different queries select different subsets of columns
interface QARecord {
  question_id: string;
  qa_status?: string;
  priority_level?: string;
  is_flagged?: boolean;
  updated_at: string;
}

export async function GET(request: NextRequest) {
  console.log("=== API Route Called ===");
  try {
    // Use service role key for API routes to bypass RLS
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const subject = searchParams.get("subject") || "";
    const difficulty = searchParams.get("difficulty") || "";
    const question_type = searchParams.get("question_type") || "";
    const boards = searchParams.get("boards") || "";
    const course_types = searchParams.get("course_types") || "";
    const levels = searchParams.get("levels") || "";
    const grade = searchParams.get("grade") || "";
    const topic = searchParams.get("topic") || "";
    const tags = searchParams.get("tags") || "";
    const is_pyq = searchParams.get("is_pyq") || "";
    const qa_status = searchParams.get("qa_status") || "";
    const priority_level = searchParams.get("priority_level") || "";
    const is_flagged = searchParams.get("is_flagged") || "";
    const pyq_year = searchParams.get("pyq_year") || "";
    const month = searchParams.get("month") || "";
    const paper_number = searchParams.get("paper_number") || "";

    // Debug logging
    console.log("API Request Parameters:", {
      page,
      limit,
      search,
      subject,
      difficulty,
      question_type,
      boards,
      course_types,
      levels,
      grade,
      topic,
      tags,
      is_pyq,
      qa_status,
      priority_level,
      is_flagged,
      pyq_year,
      month,
      paper_number,
    });

    // Validate parameters
    if (isNaN(page) || page < 1) {
      return NextResponse.json(
        { error: "Invalid page parameter" },
        { status: 400 }
      );
    }
    if (isNaN(limit) || limit < 1 || limit > 100) {
      return NextResponse.json(
        { error: "Invalid limit parameter" },
        { status: 400 }
      );
    }

    // Calculate offset
    const offset = (page - 1) * limit;

    // Build the base query with select
    const baseSelect = `
      id,
      question_number,
      question_text,
      difficulty,
      question_type,
      subject,
      boards,
      course_types,
      levels,
      relevance,
      grade,
      topic,
      subtopic,
      tags,
      is_pyq,
      total_marks,
      pyq_year,
      month,
      paper_number,
      created_at,
      updated_at,
      human_readable_id,
      question_display_number
    `;

    let query = supabase
      .from("question_bank")
      .select(baseSelect, { count: "exact" });

    // Apply basic filters
    if (subject && subject !== "any") {
      query = query.eq("subject", subject);
    }
    if (difficulty && difficulty !== "any") {
      query = query.eq("difficulty", parseInt(difficulty));
    }
    if (question_type && question_type !== "any") {
      query = query.eq("question_type", question_type);
    }
    if (boards && boards !== "any") {
      query = query.contains("boards", [boards]);
    }
    if (course_types && course_types !== "any") {
      query = query.contains("course_types", [course_types]);
    }
    if (levels && levels !== "any") {
      query = query.contains("levels", [levels]);
    }
    if (grade && grade !== "any") {
      query = query.eq("grade", grade);
    }
    if (topic) {
      query = query.ilike("topic", `%${topic}%`);
    }
    if (tags) {
      // Split tags by comma and search for any matching tag
      const tagArray = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag);
      if (tagArray.length > 0) {
        query = query.overlaps("tags", tagArray);
      }
    }
    if (is_pyq && is_pyq !== "any") {
      query = query.eq("is_pyq", is_pyq === "true");
    }

    // =====================================================================
    // QA FILTERS - OPTIMIZED FOR SUPABASE 1000-ROW LIMIT
    // =====================================================================
    //
    // ⚠️ CRITICAL: This section implements our optimized approach for Supabase's
    // 1000-row query limit. DO NOT modify this logic without understanding
    // the constraint and testing thoroughly.
    //
    // PROBLEM:
    // - QA table can have multiple records per question (revision history)
    // - If there are >1000 QA records with status="pending", query fails
    //
    // OPTIMIZED SOLUTION:
    // 1. Fetch up to 1000 QA records ordered by updated_at DESC (most recent first)
    // 2. Deduplicate to get LATEST record per question
    // 3. Apply qa_status filter AFTER deduplication to ensure we get current status
    // 4. Limit to (limit * 10) question IDs to prevent huge .in() queries
    // 5. Use filtered question IDs for main query
    //
    // WHY THIS APPROACH?
    // - Questions can have multiple QA records over time (pending → approved)
    // - We need the LATEST status per question, not historical statuses
    // - .range(0, 999) ensures we stay within Supabase's 1000-row limit
    // - Deduplication + filtering ensures accurate current status matching
    // =====================================================================

    if (qa_status && qa_status !== "any") {
      console.log("Applying QA status filter:", qa_status);

      try {
        // STEP 1: Fetch QA records with PAGINATION to avoid Supabase 1000-row limit
        // We use .range() instead of .limit() because .limit() still scans all rows
        // OPTIMIZATION: Fetch only what we need for current page (limit * 10 to account for filtering)
        const maxQuestionsNeeded = limit * 10; // Fetch extra to account for other filters
        const maxRecordsToFetch = 1000; // Stay well within Supabase's limits

        console.log(
          `Fetching up to ${maxRecordsToFetch} QA records (need ${limit} questions for current page)...`
        );

        // First, get ALL QA records (up to 1000) ordered by updated_at DESC
        // We'll filter by status AFTER deduplication to ensure we get the latest status per question
        const { data: qaPageData, error: qaError } = await supabase
          .from("qa_questions")
          .select(
            "question_id, qa_status, priority_level, is_flagged, updated_at"
          )
          .order("updated_at", { ascending: false })
          .range(0, maxRecordsToFetch - 1); // Fetch only first 1000 records max

        if (qaError) {
          console.error(`Error fetching QA data:`, qaError);
          return NextResponse.json(
            {
              error: "Failed to apply QA status filter",
              details: qaError.message,
            },
            { status: 500 }
          );
        }

        let allQAData = qaPageData || [];

        console.log(`Total QA records fetched: ${allQAData.length}`);

        if (!allQAData || allQAData.length === 0) {
          console.log("No QA records found");
          return NextResponse.json({
            questions: [],
            total: 0,
            totalQuestions: 0,
            page,
            limit,
            totalPages: 0,
          });
        }

        // STEP 2: Deduplicate to get LATEST QA record per question
        // Since data is ordered by updated_at DESC, the first occurrence
        // of each question_id is the most recent
        const latestQAByQuestion = new Map<string, QARecord>();
        allQAData.forEach((qa) => {
          if (!latestQAByQuestion.has(qa.question_id)) {
            // First time seeing this question_id = latest record
            latestQAByQuestion.set(qa.question_id, qa);
          }
          // Subsequent occurrences are older, ignore them
        });

        console.log(
          `Total unique questions with QA: ${latestQAByQuestion.size}`
        );

        // STEP 3: Apply filters on deduplicated data (now we have latest QA per question)
        const filteredQuestions = Array.from(
          latestQAByQuestion.values()
        ).filter((qa) => {
          // First check if the LATEST QA status matches our filter
          let matches = qa.qa_status === qa_status;

          // Add additional filters if specified
          if (priority_level && priority_level !== "any") {
            matches = matches && qa.priority_level === priority_level;
          }

          if (is_flagged && is_flagged !== "any") {
            matches = matches && qa.is_flagged === (is_flagged === "true");
          }

          return matches;
        });

        // STEP 4: Extract question IDs and limit to reasonable number
        // Limit to maxQuestionsNeeded to prevent overwhelming the .in() query
        const qaFilteredQuestionIds = filteredQuestions
          .map((qa) => qa.question_id)
          .slice(0, maxQuestionsNeeded);

        console.log(
          `Found ${qaFilteredQuestionIds.length} unique questions with QA status: ${qa_status}`
        );

        if (qaFilteredQuestionIds.length > 0) {
          // Apply the QA filter to the main question query
          // This will fetch only questions whose IDs match our filtered list
          query = query.in("id", qaFilteredQuestionIds);
        } else {
          // No questions match the QA filters - return empty result
          return NextResponse.json({
            questions: [],
            total: 0,
            totalQuestions: 0,
            page,
            limit,
            totalPages: 0,
          });
        }
      } catch (qaFilterError) {
        console.error("Exception in QA filter:", qaFilterError);
        return NextResponse.json(
          {
            error: "Exception occurred while filtering by QA status",
            details:
              qaFilterError instanceof Error
                ? qaFilterError.message
                : String(qaFilterError),
          },
          { status: 500 }
        );
      }
    } else if (priority_level && priority_level !== "any") {
      // If only priority_level filter (without qa_status)
      try {
        const maxQuestionsNeeded = limit * 10;
        const maxRecordsToFetch = 1000;

        const { data: qaData, error: qaError } = await supabase
          .from("qa_questions")
          .select("question_id, priority_level, updated_at")
          .eq("priority_level", priority_level)
          .order("updated_at", { ascending: false })
          .range(0, maxRecordsToFetch - 1);

        if (qaError) {
          console.error("Error fetching QA data:", qaError);
          return NextResponse.json(
            {
              error: "Failed to apply priority level filter",
              details: qaError.message,
            },
            { status: 500 }
          );
        }

        if (qaData && qaData.length > 0) {
          // Keep only latest record per question
          const latestQAByQuestion = new Map<string, QARecord>();
          qaData.forEach((qa) => {
            if (!latestQAByQuestion.has(qa.question_id)) {
              latestQAByQuestion.set(qa.question_id, qa);
            }
          });

          const qaFilteredQuestionIds = Array.from(latestQAByQuestion.keys())
            .slice(0, maxQuestionsNeeded);

          if (qaFilteredQuestionIds.length > 0) {
            query = query.in("id", qaFilteredQuestionIds);
          } else {
            return NextResponse.json({
              questions: [],
              total: 0,
              totalQuestions: 0,
              page,
              limit,
              totalPages: 0,
            });
          }
        } else {
          return NextResponse.json({
            questions: [],
            total: 0,
            totalQuestions: 0,
            page,
            limit,
            totalPages: 0,
          });
        }
      } catch (err) {
        console.error("Error in priority_level filter:", err);
        return NextResponse.json(
          { error: "Failed to apply priority level filter" },
          { status: 500 }
        );
      }
    } else if (is_flagged && is_flagged !== "any") {
      // If only is_flagged filter (without qa_status)
      try {
        const maxQuestionsNeeded = limit * 10;
        const maxRecordsToFetch = 1000;

        const { data: qaData, error: qaError } = await supabase
          .from("qa_questions")
          .select("question_id, is_flagged, updated_at")
          .eq("is_flagged", is_flagged === "true")
          .order("updated_at", { ascending: false })
          .range(0, maxRecordsToFetch - 1);

        if (qaError) {
          console.error("Error fetching QA data:", qaError);
          return NextResponse.json(
            {
              error: "Failed to apply flagged filter",
              details: qaError.message,
            },
            { status: 500 }
          );
        }

        if (qaData && qaData.length > 0) {
          // Keep only latest record per question
          const latestQAByQuestion = new Map<string, QARecord>();
          qaData.forEach((qa) => {
            if (!latestQAByQuestion.has(qa.question_id)) {
              latestQAByQuestion.set(qa.question_id, qa);
            }
          });

          const qaFilteredQuestionIds = Array.from(latestQAByQuestion.keys())
            .slice(0, maxQuestionsNeeded);

          if (qaFilteredQuestionIds.length > 0) {
            query = query.in("id", qaFilteredQuestionIds);
          } else {
            return NextResponse.json({
              questions: [],
              total: 0,
              totalQuestions: 0,
              page,
              limit,
              totalPages: 0,
            });
          }
        } else {
          return NextResponse.json({
            questions: [],
            total: 0,
            totalQuestions: 0,
            page,
            limit,
            totalPages: 0,
          });
        }
      } catch (err) {
        console.error("Error in is_flagged filter:", err);
        return NextResponse.json(
          { error: "Failed to apply flagged filter" },
          { status: 500 }
        );
      }
    }

    // Apply paper information filters
    if (pyq_year) {
      query = query.eq("pyq_year", pyq_year);
    }
    if (month) {
      query = query.eq("month", month);
    }
    if (paper_number) {
      query = query.eq("paper_number", paper_number);
    }

    // Apply search
    if (search) {
      // Check if search term looks like a UUID (8-4-4-4-12 pattern)
      const isUUID =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
          search
        );

      // Check if search term looks like a human-readable ID pattern
      const isHumanReadableId = /^[A-Z]+_[a-z]+_[a-z]+_\d+$/i.test(search);

      if (isUUID) {
        // Search by UUID
        query = query.eq("id", search);
      } else if (isHumanReadableId) {
        // Search by human-readable ID
        query = query.eq("human_readable_id", search);
      } else {
        // Regular search in question text, tags, topic, subtopic, and human-readable ID
        query = query.or(
          `question_text.ilike.%${search}%,tags.cs.{${search}},topic.ilike.%${search}%,subtopic.ilike.%${search}%,human_readable_id.ilike.%${search}%`
        );
      }
    }

    // Apply pagination and ordering
    query = query
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    console.log("Executing main query...");
    const { data: questions, error, count } = await query;

    if (error) {
      console.error("Error fetching questions:", error);
      console.error("Error details:", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });
      return NextResponse.json(
        {
          error: "Failed to fetch questions",
          details: error.message,
          hint: error.hint,
        },
        { status: 500 }
      );
    }

    console.log(
      `Main query successful: ${questions?.length || 0} questions found`
    );

    // Fetch QA data separately for the returned questions
    let questionsWithQA = questions || [];
    if (questions && questions.length > 0) {
      const questionIds = questions.map((q) => q.id);

      // Fetch QA data for the current questions only (no pagination needed since we're filtering by question IDs)
      const { data: qaData, error: qaError } = await supabase
        .from("qa_questions")
        .select(
          "question_id, qa_status, priority_level, is_flagged, overall_rating, updated_at"
        )
        .in("question_id", questionIds)
        .order("updated_at", { ascending: false });

      if (qaError) {
        console.error("Error fetching QA data for questions:", qaError);
        // Continue without QA data rather than failing completely
      }

      // Attach only the latest QA record for each question
      questionsWithQA = questions.map((question) => {
        // Get all QA records for this question
        const allQARecords =
          qaData?.filter((qa) => qa.question_id === question.id) || [];

        // Sort by updated_at DESC and take only the first (latest) one
        const latestQARecord = allQARecords.sort((a, b) => {
          const dateA = new Date(a.updated_at || 0).getTime();
          const dateB = new Date(b.updated_at || 0).getTime();
          return dateB - dateA; // DESC order
        })[0];

        return {
          ...question,
          qa_questions: latestQARecord ? [latestQARecord] : [],
        };
      });
    }

    // Get total count of all questions (without filters) for comparison
    const { count: totalCount } = await supabase
      .from("question_bank")
      .select("*", { count: "exact", head: true });

    const totalPages = Math.ceil((count || 0) / limit);

    return NextResponse.json({
      questions: questionsWithQA,
      total: count || 0,
      totalQuestions: totalCount || 0,
      page,
      limit,
      totalPages,
    });
  } catch (error) {
    console.error("Error in question bank API:", error);
    console.error(
      "Error stack:",
      error instanceof Error ? error.stack : "No stack trace"
    );
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Use service role key for API routes to bypass RLS
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const body = await request.json();

    // Remove fields that shouldn't be set on creation
    const {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      id: _id,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      created_at: _created_at,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      updated_at: _updated_at,
      ...questionData
    } = body;

    // Add timestamps
    questionData.created_at = new Date().toISOString();
    questionData.updated_at = new Date().toISOString();

    // Ensure is_active is true for new questions
    questionData.is_active = true;

    const { data: question, error } = await supabase
      .from("question_bank")
      .insert(questionData)
      .select()
      .single();

    if (error) {
      console.error("Error creating question:", error);
      return NextResponse.json(
        { error: "Failed to create question" },
        { status: 500 }
      );
    }

    return NextResponse.json(question, { status: 201 });
  } catch (error) {
    console.error("Error in question creation API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
