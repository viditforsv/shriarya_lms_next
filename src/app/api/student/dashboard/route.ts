import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();

    // Get current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is a student
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role !== "student" && profile?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Get student enrollments
    const { data: enrollments } = await supabase
      .from("courses_enrollments")
      .select(
        `
        id,
        enrolled_at,
        is_active,
        courses!courses_enrollments_course_id_fkey (
          id,
          title,
          slug,
          thumbnail_url,
          curriculum,
          subject,
          grade,
          status
        )
      `
      )
      .eq("student_id", user.id)
      .eq("is_active", true)
      .order("enrolled_at", { ascending: false });

    // Get assignment submissions (pending graded)
    const { data: assignments } = await supabase
      .from("assignments")
      .select(
        `
        id,
        title,
        description,
        due_date,
        status,
        graded_at,
        grade,
        courses!assignments_course_id_fkey (
          id,
          title,
          slug
        )
      `
      )
      .eq("student_id", user.id)
      .is("graded_at", null)
      .order("due_date", { ascending: true });

    // Get recent progress
    const { data: recentProgress } = await supabase
      .from("student_performance_log")
      .select(
        `
        id,
        created_at,
        is_correct,
        time_taken_seconds,
        question_bank!student_performance_log_question_id_fkey (
          question_text,
          total_marks
        )
      `
      )
      .eq("student_id", user.id)
      .order("created_at", { ascending: false })
      .limit(5);

    // Get tag mastery summary
    const { data: tagMastery } = await supabase
      .from("student_tag_mastery")
      .select("mastery_level")
      .eq("student_id", user.id);

    const masteryCounts = {
      red: tagMastery?.filter((m) => m.mastery_level === "red").length || 0,
      yellow:
        tagMastery?.filter((m) => m.mastery_level === "yellow").length || 0,
      green: tagMastery?.filter((m) => m.mastery_level === "green").length || 0,
    };

    // Calculate stats
    const stats = {
      totalCourses: enrollments?.length || 0,
      pendingAssignments: assignments?.length || 0,
      recentActivity: recentProgress?.length || 0,
      masteryCounts,
      enrollments: enrollments || [],
      assignments: assignments || [],
      recentProgress: recentProgress || [],
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error fetching student dashboard data:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}
