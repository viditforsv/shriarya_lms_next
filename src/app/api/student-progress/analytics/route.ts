import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// GET - Get comprehensive progress analytics
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);

    const studentId = searchParams.get("studentId");
    const courseId = searchParams.get("courseId");

    // Get current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is admin or requesting own data
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    const targetUserId =
      profile?.role === "admin" && studentId ? studentId : user.id;

    // Get overall stats
    const { data: overallStats } = await supabase.rpc("get_student_analytics", {
      p_student_id: targetUserId,
      p_course_id: courseId,
    });

    // Get tag mastery breakdown
    const { data: tagMastery } = await supabase
      .from("student_tag_mastery")
      .select("*")
      .eq("student_id", targetUserId)
      .eq("course_id", courseId)
      .order("mastery_score", { ascending: false });

    // Get recent attempts
    const { data: recentAttempts } = await supabase
      .from("student_performance_log")
      .select(
        `
        *,
        question_bank!student_performance_log_question_id_fkey (
          question_text,
          total_marks
        )
      `
      )
      .eq("student_id", targetUserId)
      .eq("course_id", courseId)
      .order("created_at", { ascending: false })
      .limit(20);

    // Calculate summary metrics
    const totalAttempts = recentAttempts?.length || 0;
    const correctAttempts =
      recentAttempts?.filter((a) => a.is_correct).length || 0;
    const avgTime =
      recentAttempts?.reduce((sum, a) => sum + a.time_taken_seconds, 0) /
        totalAttempts || 0;

    const masteryDistribution = {
      red: tagMastery?.filter((t) => t.mastery_level === "red").length || 0,
      yellow:
        tagMastery?.filter((t) => t.mastery_level === "yellow").length || 0,
      green: tagMastery?.filter((t) => t.mastery_level === "green").length || 0,
    };

    const analytics = {
      overview: {
        totalAttempts,
        correctAttempts,
        accuracy:
          totalAttempts > 0 ? (correctAttempts / totalAttempts) * 100 : 0,
        avgTimeSeconds: Math.round(avgTime),
      },
      tagMastery,
      masteryDistribution,
      recentAttempts: recentAttempts?.slice(0, 10), // Top 10 recent
      overallStats,
    };

    return NextResponse.json({ analytics });
  } catch (error) {
    console.error("Error in analytics GET API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
