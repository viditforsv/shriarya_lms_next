import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(request: NextRequest) {
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

    // Apply QA filters - use efficient approach
    if (qa_status && qa_status !== "any") {
      console.log("Applying QA status filter:", qa_status);

      try {
        // Build QA query for fetching data
        let qaQueryBuilder = supabase.from("qa_questions");
        let qaCountQuery = supabase.from("qa_questions");

        // Apply filters to both queries
        qaQueryBuilder = qaQueryBuilder.select("question_id");
        qaCountQuery = qaCountQuery.select("*", { count: "exact", head: true });

        // Apply status filter
        qaQueryBuilder = qaQueryBuilder.eq("qa_status", qa_status);
        qaCountQuery = qaCountQuery.eq("qa_status", qa_status);

        // Add priority level filter if specified
        if (priority_level && priority_level !== "any") {
          qaQueryBuilder = qaQueryBuilder.eq("priority_level", priority_level);
          qaCountQuery = qaCountQuery.eq("priority_level", priority_level);
        }

        // Add flagged filter if specified
        if (is_flagged && is_flagged !== "any") {
          qaQueryBuilder = qaQueryBuilder.eq("is_flagged", is_flagged === "true");
          qaCountQuery = qaCountQuery.eq("is_flagged", is_flagged === "true");
        }

        // Get count first
        const { count: qaCount, error: countError } = await qaCountQuery;

        if (countError) {
          console.error("Error counting QA records:", countError);
          console.log("Skipping QA filter due to count error");
        } else {
          console.log(`Total QA records matching filter: ${qaCount}`);

          // If there are too many results (>1000), show warning and limit
          if (qaCount && qaCount > 1000) {
            console.warn(
              `Too many QA records (${qaCount}) - limiting to first 1000`
            );
          }

          // Fetch QA data with limit
          const { data: qaData, error: qaError } = await qaQueryBuilder.limit(1000);

          if (qaError) {
            console.error("Error fetching QA data:", qaError);
            console.error("QA Error details:", {
              message: qaError.message,
              details: qaError.details,
              hint: qaError.hint,
            });
          } else {
            const qaFilteredQuestionIds =
              qaData?.map((qa) => qa.question_id) || [];
            console.log(
              `Found ${qaFilteredQuestionIds.length} questions matching QA filters`
            );

            if (qaFilteredQuestionIds.length > 0) {
              // Apply the QA filter to the main query
              query = query.in("id", qaFilteredQuestionIds);
            } else {
              // Return empty results if no questions match
              return NextResponse.json({
                questions: [],
                total: 0,
                totalQuestions: 0,
                page,
                limit,
                totalPages: 0,
              });
            }
          }
        }
      } catch (qaFilterError) {
        console.error("Exception in QA filter:", qaFilterError);
        // Continue without QA filter
      }
    } else if (priority_level && priority_level !== "any") {
      // If only priority_level filter (without qa_status)
      try {
        const { data: qaData, error: qaError } = await supabase
          .from("qa_questions")
          .select("question_id")
          .eq("priority_level", priority_level)
          .limit(1000);

        if (!qaError && qaData) {
          const qaFilteredQuestionIds = qaData.map((qa) => qa.question_id);
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
        }
      } catch (err) {
        console.error("Error in priority_level filter:", err);
      }
    } else if (is_flagged && is_flagged !== "any") {
      // If only is_flagged filter (without qa_status)
      try {
        const { data: qaData, error: qaError } = await supabase
          .from("qa_questions")
          .select("question_id")
          .eq("is_flagged", is_flagged === "true")
          .limit(1000);

        if (!qaError && qaData) {
          const qaFilteredQuestionIds = qaData.map((qa) => qa.question_id);
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
        }
      } catch (err) {
        console.error("Error in is_flagged filter:", err);
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

    // Fetch QA data separately for the returned questions
    let questionsWithQA = questions || [];
    if (questions && questions.length > 0) {
      const questionIds = questions.map((q) => q.id);
      const { data: qaData } = await supabase
        .from("qa_questions")
        .select(
          "question_id, qa_status, priority_level, is_flagged, overall_rating"
        )
        .in("question_id", questionIds);

      // Attach QA data to questions
      questionsWithQA = questions.map((question) => {
        const qaRecords =
          qaData?.filter((qa) => qa.question_id === question.id) || [];
        return {
          ...question,
          qa_questions: qaRecords,
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
    return NextResponse.json(
      { error: "Internal server error" },
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
