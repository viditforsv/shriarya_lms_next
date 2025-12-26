import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// GET - Get user enrollments
export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get("courseId");
    const userId = searchParams.get("userId");

    // Get current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Users can only view their own enrollments unless they're admin
    let targetUserId = user.id;

    try {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      targetUserId = profile?.role === "admin" && userId ? userId : user.id;
    } catch {
      console.log("Profile fetch failed, using user ID:", user.id);
      // If profile fetch fails, just use the user's own ID
      targetUserId = user.id;
    }

    let query = supabase
      .from("courses_enrollments")
      .select(
        `
        id,
        is_active,
        enrolled_at,
        courses!courses_enrollments_course_id_fkey (
          id,
          title,
          description,
          slug,
          curriculum,
          subject,
          grade,
          level,
          duration,
          thumbnail_url,
          status,
          price
        )
      `
      )
      .eq("student_id", targetUserId)
      .eq("is_active", true)
      .order("enrolled_at", { ascending: false });

    if (courseId) {
      query = query.eq("course_id", courseId);
    }

    const { data: enrollments, error } = await query;

    if (error) {
      console.error("Error fetching enrollments:", error);
      return NextResponse.json(
        { error: "Failed to fetch enrollments" },
        { status: 500 }
      );
    }

    // Check if user is enrolled in specific course
    const enrolled = enrollments && enrollments.length > 0;

    return NextResponse.json({ enrollments, enrolled });
  } catch (error) {
    console.error("Error in enrollments API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST - Enroll user in course
export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const body = await request.json();

    const { course_id } = body;

    // Validate required fields
    if (!course_id) {
      return NextResponse.json(
        { error: "Course ID is required" },
        { status: 400 }
      );
    }

    // Get current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if course exists (allow draft and published courses)
    const { data: course } = await supabase
      .from("courses")
      .select("id, status, price")
      .eq("id", course_id)
      .single();

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    // Allow enrollment in published and draft (upcoming) courses
    // Archived courses are not enrollable
    if (course.status === "archived") {
      return NextResponse.json(
        { error: "Course is archived and not available for enrollment" },
        { status: 403 }
      );
    }

    // Check if user is already enrolled
    const { data: existingEnrollment } = await supabase
      .from("courses_enrollments")
      .select("id")
      .eq("student_id", user.id)
      .eq("course_id", course_id)
      .single();

    if (existingEnrollment) {
      return NextResponse.json(
        { error: "User is already enrolled in this course" },
        { status: 400 }
      );
    }

    // For paid courses, you would add payment logic here
    // For now, we'll allow enrollment in free courses or if user has access

    // Create enrollment
    const { data: enrollment, error } = await supabase
      .from("courses_enrollments")
      .insert({
        student_id: user.id,
        course_id,
        is_active: true,
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating enrollment:", error);
      return NextResponse.json(
        { error: "Failed to enroll in course" },
        { status: 500 }
      );
    }

    return NextResponse.json({ enrollment }, { status: 201 });
  } catch (error) {
    console.error("Error in enrollments POST API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE - Unenroll user from course
export async function DELETE(request: Request) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get("courseId");

    if (!courseId) {
      return NextResponse.json(
        { error: "Course ID is required" },
        { status: 400 }
      );
    }

    // Get current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if enrollment exists
    const { data: enrollment } = await supabase
      .from("courses_enrollments")
      .select("id")
      .eq("student_id", user.id)
      .eq("course_id", courseId)
      .single();

    if (!enrollment) {
      return NextResponse.json(
        { error: "Enrollment not found" },
        { status: 404 }
      );
    }

    // Deactivate enrollment (soft delete)
    const { error } = await supabase
      .from("courses_enrollments")
      .update({ is_active: false })
      .eq("id", enrollment.id);

    if (error) {
      console.error("Error unenrolling from course:", error);
      return NextResponse.json(
        { error: "Failed to unenroll from course" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Successfully unenrolled from course",
    });
  } catch (error) {
    console.error("Error in enrollments DELETE API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
