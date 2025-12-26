import { NextRequest, NextResponse } from "next/server";
import { createSupabaseApiClient } from "@/lib/supabase/api-client";

export async function GET(request: NextRequest) {
  try {
    const supabase = createSupabaseApiClient();
    const { searchParams } = new URL(request.url);

    // --- 1. PARSE PARAMETERS ---
    const page = parseInt(searchParams.get("page") || "1");
    const limit = Math.min(parseInt(searchParams.get("limit") || "10"), 100); // Cap limit at 100
    const offset = (page - 1) * limit;
    const search = searchParams.get("search") || "";

    // Array Helpers
    const parseArray = (p: string | null) => (p && p !== "any" ? p.split(",").map(v => v.trim()) : []);
    
    // Standard Filters
    const subject = parseArray(searchParams.get("subject"));
    const boards = parseArray(searchParams.get("boards"));
    const course_types = parseArray(searchParams.get("course_types"));
    const levels = parseArray(searchParams.get("levels"));
    const section = parseArray(searchParams.get("section"));
    const tags = parseArray(searchParams.get("tags"));
    
    // Difficulty
    const difficulty = searchParams.get("difficulty");
    const diffMin = searchParams.get("difficulty_min");
    const diffMax = searchParams.get("difficulty_max");

    // QA & Status Filters (Mapped to New View Columns)
    const qa_status = searchParams.get("qa_status");
    const priority = searchParams.get("priority_level");
    const is_flagged = searchParams.get("is_flagged");

    // --- 2. BUILD QUERY ---
    // Query the VIEW, not the table
    let query = supabase
      .from("question_bank_enhanced")
      .select("*", { count: "exact" });

    // --- 3. APPLY FILTERS ---

    // Array/Overlap Filters
    if (subject.length) {
        // Handle single vs multiple for backward compatibility
        if (subject.length === 1) {
          query = query.eq("subject", subject[0]);
        } else {
          query = query.in("subject", subject);
        }
    }
    
    // JSONB columns (boards, course_types, levels) - use contains for array matching
    // These are stored as JSONB arrays, so we check if the JSONB contains any of the values
    // For JSONB arrays in Supabase, we use .contains() which checks if JSONB @> value
    if (boards.length) {
      if (boards.length === 1) {
        // For single value, check if JSONB array contains it
        query = query.contains("boards", JSON.stringify([boards[0]]));
      } else {
        // For multiple values, use OR condition - check if JSONB contains any of the values
        // PostgREST syntax: column.cs.{value} means JSONB contains the value (cs = contains)
        const boardConditions = boards.map(b => `boards.cs.${JSON.stringify([b])}`).join(",");
        query = query.or(boardConditions);
      }
    }
    
    if (course_types.length) {
      if (course_types.length === 1) {
        query = query.contains("course_types", JSON.stringify([course_types[0]]));
      } else {
        const courseTypeConditions = course_types.map(ct => `course_types.cs.${JSON.stringify([ct])}`).join(",");
        query = query.or(courseTypeConditions);
      }
    }
    
    if (levels.length) {
      if (levels.length === 1) {
        query = query.contains("levels", JSON.stringify([levels[0]]));
      } else {
        const levelConditions = levels.map(l => `levels.cs.${JSON.stringify([l])}`).join(",");
        query = query.or(levelConditions);
      }
    }
    
    // Tags is a text[] array, so overlaps works fine
    if (tags.length) query = query.overlaps("tags", tags);

    // Section Filter (Complex ILIKE logic preserved)
    if (section.length > 0) {
      if (section.length === 1) {
        const escapedSection = section[0].replace(/%/g, "\\%").replace(/_/g, "\\_");
        query = query.ilike("section", `%${escapedSection}%`);
      } else {
        const conditions = section
          .map(s => {
            const escaped = s.replace(/%/g, "\\%").replace(/_/g, "\\_");
            return `section.ilike.%${escaped}%`;
          })
          .join(",");
        query = query.or(conditions);
      }
    }

    // Difficulty Logic (Range vs Exact)
    if (diffMin || diffMax) {
      const min = diffMin ? parseInt(diffMin) : 1;
      const max = diffMax ? parseInt(diffMax) : 10;
      // Validate range
      if (isNaN(min) || isNaN(max) || min < 1 || max > 10 || min > max) {
        return NextResponse.json(
          { error: "Invalid difficulty range. Must be between 1 and 10, with min <= max" },
          { status: 400 }
        );
      }
      query = query.gte("difficulty", min).lte("difficulty", max);
    } else if (difficulty && difficulty !== "any") {
      const diffValue = parseInt(difficulty);
      if (isNaN(diffValue) || diffValue < 1 || diffValue > 10) {
        return NextResponse.json(
          { error: "Invalid difficulty value. Must be between 1 and 10" },
          { status: 400 }
        );
      }
      query = query.eq("difficulty", diffValue);
    }

    // Standard Fields
    const simpleFilters = [
      { key: "question_type", val: searchParams.get("question_type") },
      { key: "grade", val: searchParams.get("grade") },
      { key: "is_pyq", val: searchParams.get("is_pyq") === "any" ? null : searchParams.get("is_pyq") },
      { key: "pyq_year", val: searchParams.get("pyq_year") },
      { key: "month", val: searchParams.get("month") },
      { key: "paper_number", val: searchParams.get("paper_number") },
    ];

    simpleFilters.forEach(({ key, val }) => {
      if (val && val !== "any") {
        // boolean conversion for is_pyq
        if (key === 'is_pyq') query = query.eq(key, val === 'true');
        else query = query.eq(key, val);
      }
    });

    // --- 4. QA FILTERS (The Core Fix) ---
    // Now querying the view columns directly - efficient!
    if (qa_status && qa_status !== "any") {
      query = query.eq("latest_qa_status", qa_status);
    }
    if (priority && priority !== "any") {
      query = query.eq("latest_priority_level", priority);
    }
    if (is_flagged && is_flagged !== "any") {
      query = query.eq("latest_is_flagged", is_flagged === "true");
    }

    // --- 5. SEARCH LOGIC ---
    if (search) {
      const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(search);
      const isHumanID = /^[A-Z]+_[a-z]+_[a-z]+_\d+$/i.test(search);

      if (isUUID) {
        query = query.eq("id", search);
      } else if (isHumanID) {
        query = query.eq("human_readable_id", search);
      } else {
        // Escape special characters in search term
        const escapedSearch = search.replace(/%/g, "\\%").replace(/_/g, "\\_");
        // Topic (ilike) OR Tags (contains) OR Text (ilike) OR HumanID (ilike)
        // Note: tags.cs.{pattern} requires exact array match, so we use ilike for text search
        query = query.or(
          `question_text.ilike.%${escapedSearch}%,topic.ilike.%${escapedSearch}%,subtopic.ilike.%${escapedSearch}%,human_readable_id.ilike.%${escapedSearch}%`
        );
        // For tags, we'd need a different approach - array overlap doesn't support partial matching
        // This is a limitation - for exact tag matching, filter separately
      }
    }

    // --- 6. EXECUTE ---
    const { data, error, count } = await query
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error("Supabase Query Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // --- 7. RESPONSE ---
    // Note: The View already includes the QA fields. 
    // We map them to the structure your frontend expects (nested object) if necessary.
    // Preserving original structure for backward compatibility:
    const formattedQuestions = data?.map(q => {
      // Only include qa_questions if there's actual QA data (not just default 'new' status)
      const hasQAData = q.latest_qa_status && q.latest_qa_status !== 'new' 
        || q.latest_priority_level !== null 
        || q.latest_is_flagged !== null
        || q.latest_overall_rating !== null;
      
      return {
        ...q,
        // Reconstruct the nested object if your frontend relies on question.qa_questions[0]
        qa_questions: hasQAData ? [{
          qa_status: q.latest_qa_status || undefined,
          priority_level: q.latest_priority_level || undefined,
          is_flagged: q.latest_is_flagged ?? undefined,
          overall_rating: q.latest_overall_rating || undefined,
          updated_at: q.qa_updated_at || undefined
        }] : []
      };
    });

    // Get total count of all questions (without filters) for comparison
    const { count: totalCount } = await supabase
      .from("question_bank")
      .select("*", { count: "exact", head: true });

    return NextResponse.json({
      questions: formattedQuestions || [],
      total: count || 0,
      totalQuestions: totalCount || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit),
    });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createSupabaseApiClient();
    const body = await request.json();

    console.log("📝 POST /api/question-bank - Received data:", {
      question_type: body.question_type,
      has_question_text: !!body.question_text,
      options_count: Array.isArray(body.options) ? body.options.length : 0,
      has_correct_answer: !!body.correct_answer,
    });

    // Validate required fields
    if (!body.question_text || !body.question_type) {
      return NextResponse.json(
        { error: "question_text and question_type are required" },
        { status: 400 }
      );
    }

    // Prepare the question data
    const questionData: Record<string, unknown> = {
      question_text: body.question_text,
      question_type: body.question_type,
      subject: body.subject || "IBDP Mathematics AA HL",
      difficulty: body.difficulty || 5,
      total_marks: body.total_marks || 1,
      grade: body.grade || "12",
      topic: body.topic || null,
      subtopic: body.subtopic || null,
      tags: body.tags || [],
      boards: body.boards || [],
      course_types: body.course_types || [],
      levels: body.levels || [],
      is_pyq: body.is_pyq || false,
      pyq_year: body.pyq_year || null,
      month: body.month || null,
      paper_number: body.paper_number || null,
      "Time Zone": body["Time Zone"] || null,
      explanation: body.explanation || null,
      correct_answer: body.correct_answer || null,
      calculator: body.calculator || null,
      solution_image: body.solution_image || null,
      image_url: body.image_url || null,
      question_number: body.question_number || null,
      source: body.source || "IBDP",
      paper_type: body.paper_type || null,
      year: body.year || null,
      // Handle options - ensure it's properly formatted as JSONB array
      // Options should be an array of objects with 'value' and 'label' properties
      options: Array.isArray(body.options) ? body.options : [],
    };

    // For MCQ questions, validate that options are provided
    if (body.question_type === "mcq") {
      if (!Array.isArray(body.options) || body.options.length === 0) {
        return NextResponse.json(
          { error: "MCQ questions require at least one option" },
          { status: 400 }
        );
      }
      if (!body.correct_answer) {
        return NextResponse.json(
          { error: "MCQ questions require a correct_answer" },
          { status: 400 }
        );
      }
    }

    const options = Array.isArray(questionData.options) ? questionData.options : [];
    console.log("💾 Inserting question with options:", {
      options_count: options.length,
      options: options,
    });

    // Insert the question
    const { data, error } = await supabase
      .from("question_bank")
      .insert([questionData])
      .select()
      .single();

    if (error) {
      console.error("❌ Supabase Insert Error:", error);
      return NextResponse.json(
        { error: error.message || "Failed to create question", details: error },
        { status: 500 }
      );
    }

    console.log("✅ Question created successfully:", data.id);
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("❌ API Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}