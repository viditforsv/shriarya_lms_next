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

    // Check if user is teacher or admin
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role !== "teacher" && profile?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Fetch all enrollments assigned to this teacher (where students are enrolled)
    const { data: enrollments, error: enrollmentsError } = await supabase
      .from("courses_enrollments")
      .select(
        `
        id,
        student_id,
        course_id,
        enrolled_at,
        is_active,
        user:student_id (id, email, first_name, last_name, role),
        course:course_id (id, title, slug, curriculum, subject, grade, level)
      `
      )
      .eq("assigned_teacher_id", user.id)
      .eq("enrollment_type", "student")
      .eq("is_active", true);

    if (enrollmentsError) {
      console.error("Error fetching enrollments:", enrollmentsError);
      return NextResponse.json(
        { error: "Failed to fetch students" },
        { status: 500 }
      );
    }

    interface EnrollmentWithRelations {
      student_id: string;
      course_id: string;
      user?: { id: string; email: string; first_name: string; last_name: string; role: string } | { id: string; email: string; first_name: string; last_name: string; role: string }[] | null;
      course?: { id: string; title: string; slug: string; curriculum: string; subject: string; grade: string; level: string } | { id: string; title: string; slug: string; curriculum: string; subject: string; grade: string; level: string }[] | null;
      [key: string]: unknown;
    }

    // Get submission counts for each student
    const enrollmentsWithSubmissions = await Promise.all(
      (enrollments || []).map(async (enrollment: EnrollmentWithRelations) => {
        // Count pending submissions for this student in this course
        const { count: pendingCount } = await supabase
          .from("assignment_submissions")
          .select("*", { count: "exact", head: true })
          .eq("user_id", enrollment.student_id)
          .eq("course_id", enrollment.course_id)
          .eq("grading_status", "pending");

        return {
          ...enrollment,
          user: Array.isArray(enrollment.user)
            ? enrollment.user[0]
            : enrollment.user,
          course: Array.isArray(enrollment.course)
            ? enrollment.course[0]
            : enrollment.course,
          pendingSubmissions: pendingCount || 0,
        };
      })
    );

    return NextResponse.json({
      students: enrollmentsWithSubmissions,
    });
  } catch (error) {
    console.error("Error in teacher students:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
