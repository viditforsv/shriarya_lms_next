import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    console.log("🔍 Querying QA statistics...");

    // Get total QA records
    const { count: totalQARecords, error: totalError } = await supabase
      .from("qa_questions")
      .select("*", { count: "exact", head: true });

    if (totalError) {
      console.error("Error getting total QA records:", totalError);
      return NextResponse.json(
        { error: "Failed to get total QA records" },
        { status: 500 }
      );
    }

    // Get QA records grouped by status
    const { data: statusData, error: statusError } = await supabase
      .from("qa_questions")
      .select("qa_status")
      .order("updated_at", { ascending: false });

    if (statusError) {
      console.error("Error getting QA status data:", statusError);
      return NextResponse.json(
        { error: "Failed to get QA status data" },
        { status: 500 }
      );
    }

    // Group by status and get latest record per question
    const latestByQuestion = new Map<string, string>();
    statusData?.forEach((record) => {
      if (!latestByQuestion.has(record.qa_status)) {
        latestByQuestion.set(record.qa_status, record.qa_status);
      }
    });

    // Count unique questions by status (latest record only)
    const statusCounts = new Map<string, number>();
    const questionLatestStatus = new Map<string, string>();

    statusData?.forEach((record) => {
      // We need to get question_id to properly deduplicate
      // Let me refetch with question_id
    });

    // Refetch with question_id for proper deduplication
    const { data: fullData, error: fullError } = await supabase
      .from("qa_questions")
      .select("question_id, qa_status, updated_at")
      .order("updated_at", { ascending: false });

    if (fullError) {
      console.error("Error getting full QA data:", fullError);
      return NextResponse.json(
        { error: "Failed to get full QA data" },
        { status: 500 }
      );
    }

    // Keep only the latest record per question
    const latestRecordsByQuestion = new Map<string, any>();
    fullData?.forEach((record) => {
      if (!latestRecordsByQuestion.has(record.question_id)) {
        latestRecordsByQuestion.set(record.question_id, record);
      }
    });

    // Count by status from latest records only
    const latestStatusCounts = new Map<string, number>();
    latestRecordsByQuestion.forEach((record) => {
      const status = record.qa_status;
      latestStatusCounts.set(status, (latestStatusCounts.get(status) || 0) + 1);
    });

    // Get pending count specifically
    const pendingCount = latestStatusCounts.get("pending") || 0;

    // Get some sample pending question IDs
    const pendingQuestions = Array.from(latestRecordsByQuestion.values())
      .filter((record) => record.qa_status === "pending")
      .slice(0, 5)
      .map((record) => record.question_id);

    const result = {
      totalQARecords: totalQARecords || 0,
      uniqueQuestionsWithQA: latestRecordsByQuestion.size,
      statusBreakdown: Object.fromEntries(latestStatusCounts),
      pendingQuestionsCount: pendingCount,
      samplePendingQuestionIds: pendingQuestions,
      timestamp: new Date().toISOString(),
    };

    console.log("📊 QA Statistics:", result);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in QA stats API:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
