import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
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

    // Check if user is admin
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const { enrollmentId, teacherId } = body;

    if (!enrollmentId || !teacherId) {
      return NextResponse.json(
        { error: "Missing enrollmentId or teacherId" },
        { status: 400 }
      );
    }

    // Get the course_id for this enrollment
    const { data: enrollment, error: enrollmentError } = await supabase
      .from("courses_enrollments")
      .select("course_id")
      .eq("id", enrollmentId)
      .single();

    if (enrollmentError || !enrollment) {
      return NextResponse.json(
        { error: "Enrollment not found" },
        { status: 404 }
      );
    }

    // Update enrollment with assigned teacher
    const { error: updateError } = await supabase
      .from("courses_enrollments")
      .update({ assigned_teacher_id: teacherId })
      .eq("id", enrollmentId);

    if (updateError) {
      console.error("Error assigning teacher:", updateError);
      return NextResponse.json(
        { error: "Failed to assign teacher" },
        { status: 500 }
      );
    }

    // Ensure teacher is "enrolled" (has access) to the course
    // Check if teacher already has enrollment for this course
    const { data: teacherEnrollment, error: teacherEnrollError } = await supabase
      .from("courses_enrollments")
      .select("id")
      .eq("student_id", teacherId)
      .eq("course_id", enrollment.course_id)
      .eq("enrollment_type", "teacher")
      .maybeSingle();

    // If teacher doesn't have access, create enrollment
    if (!teacherEnrollment && !teacherEnrollError) {
      const { error: createTeacherEnrollError } = await supabase
        .from("courses_enrollments")
        .insert({
          student_id: teacherId,
          course_id: enrollment.course_id,
          enrollment_type: "teacher",
          is_active: true,
        });

      if (createTeacherEnrollError) {
        console.error("Error creating teacher enrollment:", createTeacherEnrollError);
        // Don't fail the whole operation, just log the error
      }
    }

    return NextResponse.json({
      success: true,
      message: "Teacher assigned successfully",
    });
  } catch (error) {
    console.error("Error in assign-teacher:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
