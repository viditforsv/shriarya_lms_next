import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createClient as createServerClient } from "@/lib/supabase/server";

// GET /api/courses/[slug]/stats - Get course enrollment statistics (admin only)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const supabase = await createServerClient();

    // Check if user is authenticated and is admin
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user profile to check role
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profileError || !profile || profile.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Use service role key to bypass RLS and get reliable counts
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // First, get the course ID from slug
    const { data: course, error: courseError } = await supabaseAdmin
      .from("courses")
      .select("id")
      .eq("slug", slug)
      .single();

    if (courseError || !course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    // Get enrollment statistics
    const { count: totalEnrollments, error: totalError } = await supabaseAdmin
      .from("courses_enrollments")
      .select("*", { count: "exact", head: true })
      .eq("course_id", course.id);

    const { count: activeEnrollments, error: activeError } = await supabaseAdmin
      .from("courses_enrollments")
      .select("*", { count: "exact", head: true })
      .eq("course_id", course.id)
      .eq("is_active", true);

    // Get recent enrollments (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { count: recentEnrollments, error: recentError } = await supabaseAdmin
      .from("courses_enrollments")
      .select("*", { count: "exact", head: true })
      .eq("course_id", course.id)
      .eq("is_active", true)
      .gte("enrolled_at", thirtyDaysAgo.toISOString());

    // Get list of enrolled participants with profile information
    const { data: participantsData, error: participantsError } =
      await supabaseAdmin
        .from("courses_enrollments")
        .select(
          `
          id,
          enrolled_at,
          is_active,
          student:student_id (
            id,
            email,
            first_name,
            last_name,
            role,
            created_at
          )
        `
        )
        .eq("course_id", course.id)
        .eq("is_active", true)
        .order("enrolled_at", { ascending: false });

    if (totalError || activeError || recentError) {
      console.error("Error fetching enrollment stats:", {
        totalError,
        activeError,
        recentError,
      });
      return NextResponse.json(
        { error: "Failed to fetch enrollment statistics" },
        { status: 500 }
      );
    }

    if (participantsError) {
      console.error("Error fetching participants:", participantsError);
      return NextResponse.json(
        { error: "Failed to fetch participants" },
        { status: 500 }
      );
    }

    // Transform participants data
    const participants = (participantsData || []).map((enrollment: any) => ({
      enrollmentId: enrollment.id,
      enrolledAt: enrollment.enrolled_at,
      isActive: enrollment.is_active,
      student: Array.isArray(enrollment.student)
        ? enrollment.student[0]
        : enrollment.student,
    }));

    return NextResponse.json({
      totalStudents: totalEnrollments || 0,
      activeStudents: activeEnrollments || 0,
      recentEnrollments: recentEnrollments || 0,
      participants: participants || [],
    });
  } catch (error) {
    console.error("Error in course stats API:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch course stats",
      },
      { status: 500 }
    );
  }
}
