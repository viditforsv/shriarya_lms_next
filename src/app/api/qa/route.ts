import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// QA Status Types
export type QAStatus =
  | "pending"
  | "in_review"
  | "needs_revision"
  | "approved"
  | "rejected"
  | "archived";
export type PriorityLevel = "low" | "medium" | "high" | "urgent";
export type CommentType =
  | "general"
  | "content"
  | "solution"
  | "formatting"
  | "difficulty"
  | "other";

// QA Record Interface
export interface QARecord {
  id: string;
  question_id: string;
  qa_status: QAStatus;
  reviewer_id?: string;
  review_date?: string;
  review_notes?: string;
  content_accuracy?: number;
  difficulty_appropriateness?: number;
  clarity_rating?: number;
  solution_quality?: number;
  overall_rating?: number;
  revision_count: number;
  last_revision_date?: string;
  revision_notes?: string;
  is_flagged: boolean;
  flag_reason?: string;
  priority_level: PriorityLevel;
  qa_tags: string[];
  created_at: string;
  updated_at: string;
}

// QA Comment Interface
export interface QAComment {
  id: string;
  qa_id: string;
  commenter_id: string;
  comment_text: string;
  comment_type: CommentType;
  is_resolved: boolean;
  created_at: string;
  updated_at: string;
}

// Get QA records for questions
export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { searchParams } = new URL(request.url);
    const questionId = searchParams.get("question_id");
    const status = searchParams.get("status");
    const priority = searchParams.get("priority");
    const flagged = searchParams.get("flagged");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    let query = supabase.from("qa_questions").select(
      `
        *,
        question_bank!inner(
          id,
          question_text,
          difficulty,
          subject,
          topic
        )
      `,
      { count: "exact" }
    );

    // Apply filters
    if (questionId) {
      query = query.eq("question_id", questionId);
      // When fetching for a specific question, always get the latest record only
      query = query.order("updated_at", { ascending: false }).limit(1);
    } else {
      // For general queries, apply other filters and pagination
      if (status) {
        query = query.eq("qa_status", status);
      }
      if (priority) {
        query = query.eq("priority_level", priority);
      }
      if (flagged === "true") {
        query = query.eq("is_flagged", true);
      }

      // Apply pagination only when not fetching a specific question
      const offset = (page - 1) * limit;
      query = query.range(offset, offset + limit - 1);
      // Order by updated_at DESC for list views
      query = query.order("updated_at", { ascending: false });
    }

    const { data: qaRecords, error, count } = await query;

    console.log("🔍 GET QA API - Query params:", {
      questionId,
      status,
      priority,
      flagged,
      fetchingLatestOnly: !!questionId,
    });
    console.log("📥 GET QA API - Raw query result:", {
      qaRecords,
      error,
      count,
      recordsReturned: qaRecords?.length || 0,
    });

    if (error) {
      console.error("❌ Error fetching QA records:", error);
      return NextResponse.json(
        { error: "Failed to fetch QA records" },
        { status: 500 }
      );
    }

    const response = {
      qa_records: qaRecords || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    };

    console.log("📤 GET QA API - Response:", response);
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error in GET /api/qa:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Create or update QA record
export async function POST(request: NextRequest) {
  console.log("🚀 QA API POST ENDPOINT CALLED!");
  console.log("🚀 Request URL:", request.url);
  console.log("🚀 Request method:", request.method);

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const body = await request.json();
    console.log("QA API POST request body:", JSON.stringify(body, null, 2));

    // Get current user from auth header if not provided in body
    const authHeader = request.headers.get("authorization");
    let currentUserId = body.reviewer_id;

    console.log("🔍 User ID resolution:", {
      providedInBody: body.reviewer_id,
      authHeaderExists: !!authHeader,
      authHeaderPreview: authHeader
        ? authHeader.substring(0, 20) + "..."
        : null,
    });

    if (!currentUserId && authHeader) {
      // Try to extract user from token
      const supabaseAuth = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      );
      const token = authHeader.replace("Bearer ", "");
      const {
        data: { user },
        error: userError,
      } = await supabaseAuth.auth.getUser(token);
      if (user) {
        currentUserId = user.id;
        console.log("✅ Extracted user ID from auth token:", currentUserId);
      } else {
        console.error("❌ Failed to extract user from token:", userError);
      }
    }

    console.log("🔍 Final currentUserId:", currentUserId);

    const {
      question_id,
      qa_status,
      reviewer_id,
      review_notes,
      ratings,
      priority_level,
      qa_tags,
      is_flagged,
      flag_reason,
      revision_count,
      last_revision_date,
      revision_notes,
      review_date,
    } = body;

    // Check if QA record already exists
    console.log(
      "Checking for existing QA record for question_id:",
      question_id
    );
    const { data: existingQA, error: checkError } = await supabase
      .from("qa_questions")
      .select("id, revision_count")
      .eq("question_id", question_id)
      .single();

    console.log("Existing QA record:", existingQA);
    console.log("Check error:", checkError);

    if (checkError && checkError.code !== "PGRST116") {
      console.error("Error checking existing QA record:", checkError);
      return NextResponse.json(
        { error: "Failed to check QA record" },
        { status: 500 }
      );
    }

    // Debug guard: Ensure we have a valid existingQA for updates
    if (existingQA && !existingQA.id) {
      console.error("❌ Existing QA record found but missing ID:", existingQA);
      return NextResponse.json(
        { error: "Invalid QA record data" },
        { status: 500 }
      );
    }

    // Determine final reviewer_id
    const finalReviewerId = reviewer_id || currentUserId;

    console.log("🔍 Reviewer ID resolution:", {
      providedReviewerId: reviewer_id,
      currentUserId,
      finalReviewerId,
      qa_status,
      requiresReviewer: qa_status === "approved" || qa_status === "in_review",
    });

    // Validate that reviewer_id exists when approving or reviewing
    if (
      (qa_status === "approved" || qa_status === "in_review") &&
      !finalReviewerId
    ) {
      console.error("❌ Cannot approve/review without a reviewer_id");
      return NextResponse.json(
        {
          error: "Reviewer ID is required for approval/review",
          details: "You must be logged in to approve or review questions",
        },
        { status: 400 }
      );
    }

    const qaData = {
      question_id,
      qa_status: qa_status || "pending",
      reviewer_id: finalReviewerId,
      review_notes,
      priority_level: priority_level || "medium",
      qa_tags: qa_tags || [],
      is_flagged: is_flagged || false,
      flag_reason,
      updated_at: new Date().toISOString(),
      ...(ratings && {
        content_accuracy: ratings.content_accuracy,
        difficulty_appropriateness: ratings.difficulty_appropriateness,
        clarity_rating: ratings.clarity_rating,
        solution_quality: ratings.solution_quality,
      }),
      ...(review_date
        ? { review_date }
        : (qa_status === "in_review" || qa_status === "approved") && {
            review_date: new Date().toISOString(),
          }),
      ...(revision_count !== undefined && { revision_count }),
      ...(last_revision_date && { last_revision_date }),
      ...(revision_notes && { revision_notes }),
    };

    console.log("QA data to save:", JSON.stringify(qaData, null, 2));

    let result;
    if (existingQA) {
      // First, clean up any duplicate records (keep only the latest one we're updating)
      console.log(
        "🧹 Checking for duplicate QA records for question_id:",
        question_id
      );
      const { data: allRecords, error: fetchError } = await supabase
        .from("qa_questions")
        .select("id, created_at, updated_at")
        .eq("question_id", question_id)
        .order("updated_at", { ascending: false });

      if (!fetchError && allRecords && allRecords.length > 1) {
        console.log(
          `⚠️ Found ${allRecords.length} QA records for this question`
        );
        // Keep the most recent one (first in the sorted list), delete the rest
        const recordsToDelete = allRecords.slice(1).map((r) => r.id);
        console.log("🗑️ Deleting old duplicate records:", recordsToDelete);

        const { error: deleteError } = await supabase
          .from("qa_questions")
          .delete()
          .in("id", recordsToDelete);

        if (deleteError) {
          console.error("❌ Error deleting duplicate records:", deleteError);
        } else {
          console.log("✅ Successfully cleaned up duplicate records");
        }
      }

      // Update existing record
      console.log("✅ Updating existing QA record with ID:", existingQA.id);
      console.log("✅ Using question_id for update:", question_id);

      // Remove question_id from update payload since it's immutable
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { question_id: _questionId, ...updatePayload } = qaData;

      // Log detailed info about the update
      console.log(
        "📤 Update payload (without question_id):",
        JSON.stringify(updatePayload, null, 2)
      );
      console.log("📋 Key fields:", {
        qa_status: updatePayload.qa_status,
        reviewer_id: updatePayload.reviewer_id,
        review_date: updatePayload.review_date,
      });

      const { data, error } = await supabase
        .from("qa_questions")
        .update(updatePayload)
        .eq("question_id", question_id)
        .select()
        .single();

      console.log("📥 Update result:", JSON.stringify(data, null, 2));
      console.log("❌ Update error:", error);

      if (error) {
        console.error("❌ Error updating QA record:", error);
        console.error(
          "❌ Failed payload:",
          JSON.stringify(updatePayload, null, 2)
        );
        console.error("❌ Error details:", {
          message: error.message,
          code: error.code,
          hint: error.hint,
          details: error.details,
        });
        return NextResponse.json(
          {
            error: "Failed to update QA record",
            details: error.message,
            code: error.code,
            hint: error.hint,
            dbDetails: error.details,
          },
          { status: 500 }
        );
      }
      result = data;
    } else {
      // Create new record
      console.log("Creating new QA record");
      const { data, error } = await supabase
        .from("qa_questions")
        .insert(qaData)
        .select()
        .single();

      console.log("Create result:", data);
      console.log("Create error:", error);

      if (error) {
        console.error("Error creating QA record:", error);
        return NextResponse.json(
          { error: "Failed to create QA record" },
          { status: 500 }
        );
      }
      result = data;
    }

    return NextResponse.json({ qa_record: result });
  } catch (error) {
    console.error("Error in POST /api/qa:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
