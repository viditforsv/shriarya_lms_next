import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// GET - Get user progress for lessons/courses
export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get("courseId");
    const lessonId = searchParams.get("lessonId");
    const userId = searchParams.get("userId");

    // Get current user (optional for free courses)
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    // For free courses, allow access without authentication
    if (authError || !user) {
      // Return empty progress for unauthenticated users (free course access)
      return NextResponse.json({ progress: [] });
    }

    // Users can only view their own progress unless they're admin
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    const targetUserId = profile?.role === "admin" && userId ? userId : user.id;

    let query = supabase
      .from("user_progress")
      .select(
        `
        id,
        completion_percentage,
        time_spent_minutes,
        last_accessed_at,
        completed_at,
        is_completed,
        created_at,
        updated_at,
        lessons!user_progress_lesson_id_fkey (
          id,
          title,
          slug,
          lesson_order,
          duration_minutes,
          courses!lessons_course_id_fkey (
            id,
            title,
            slug
          )
        )
      `
      )
      .eq("user_id", targetUserId)
      .order("last_accessed_at", { ascending: false });

    if (courseId) {
      query = query.eq("course_id", courseId);
    }

    if (lessonId) {
      query = query.eq("lesson_id", lessonId);
    }

    const { data: progress, error } = await query;

    if (error) {
      console.error("Error fetching user progress:", error);
      return NextResponse.json(
        { error: "Failed to fetch user progress" },
        { status: 500 }
      );
    }

    return NextResponse.json({ progress });
  } catch (error) {
    console.error("Error in user progress API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST - Create or update user progress
export async function POST(request: Request) {
  try {
    console.log("=== USER PROGRESS API CALLED ===");
    console.log("Request method:", request.method);
    console.log("Request URL:", request.url);

    const supabase = await createClient();
    const body = await request.json();

    console.log("Request body received:", body);

    const {
      lesson_id,
      course_id,
      completion_percentage = 0,
      time_spent_minutes = 0,
      is_completed = false,
    } = body;

    console.log("Extracted fields:", {
      lesson_id,
      course_id,
      completion_percentage,
      time_spent_minutes,
      is_completed,
    });

    // Validate required fields
    if (!lesson_id || !course_id) {
      console.error("Missing required fields:", { lesson_id, course_id });
      return NextResponse.json(
        { error: "Lesson ID and Course ID are required" },
        { status: 400 }
      );
    }

    // Get current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    console.log("Auth check result:", {
      hasUser: !!user,
      userId: user?.id,
      userEmail: user?.email,
      authError: authError?.message,
    });

    if (authError || !user) {
      console.error("Authentication failed:", authError);
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is enrolled in the course or if course is free
    console.log("Checking course access for course_id:", course_id);
    const { data: course } = await supabase
      .from("courses")
      .select("price")
      .eq("id", course_id)
      .single();

    console.log("Course data:", course);
    if (!course) {
      console.error("Course not found for course_id:", course_id);
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    // For paid courses, verify enrollment before allowing progress tracking
    if ((course.price || 0) > 0) {
      const { data: enrollment } = await supabase
        .from("courses_enrollments")
        .select("id")
        .eq("student_id", user.id)
        .eq("course_id", course_id)
        .eq("is_active", true)
        .single();

      if (!enrollment) {
        return NextResponse.json(
          { error: "User is not enrolled in this course" },
          { status: 403 }
        );
      }
    }

    // Check if progress already exists
    const { data: existingProgress } = await supabase
      .from("user_progress")
      .select("id, completed_at")
      .eq("user_id", user.id)
      .eq("lesson_id", lesson_id)
      .single();

    let progressData;

    if (existingProgress) {
      // Update existing progress
      const updateData: Record<string, unknown> = {
        completion_percentage,
        time_spent_minutes,
        last_accessed_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      if (is_completed && !existingProgress.completed_at) {
        updateData.completed_at = new Date().toISOString();
      }

      updateData.is_completed = is_completed;

      const { data: updatedProgress, error } = await supabase
        .from("user_progress")
        .update(updateData)
        .eq("id", existingProgress.id)
        .select()
        .single();

      if (error) {
        console.error("Error updating user progress:", error);
        return NextResponse.json(
          { error: "Failed to update progress" },
          { status: 500 }
        );
      }

      progressData = updatedProgress;
    } else {
      // Create new progress
      const { data: newProgress, error } = await supabase
        .from("user_progress")
        .insert({
          user_id: user.id,
          lesson_id,
          course_id,
          completion_percentage,
          time_spent_minutes,
          is_completed,
          completed_at: is_completed ? new Date().toISOString() : null,
        })
        .select()
        .single();

      if (error) {
        console.error("Error creating user progress:", error);
        return NextResponse.json(
          { error: "Failed to create progress" },
          { status: 500 }
        );
      }

      progressData = newProgress;
    }

    return NextResponse.json({ progress: progressData });
  } catch (error) {
    console.error("Error in user progress POST API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT - Update user progress
export async function PUT(request: Request) {
  try {
    const supabase = await createClient();
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Progress ID is required" },
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

    // Check if user owns this progress
    const { data: progress } = await supabase
      .from("user_progress")
      .select("user_id")
      .eq("id", id)
      .single();

    if (!progress) {
      return NextResponse.json(
        { error: "Progress not found" },
        { status: 404 }
      );
    }

    if (progress.user_id !== user.id) {
      return NextResponse.json(
        { error: "Unauthorized to update this progress" },
        { status: 403 }
      );
    }

    // Update progress
    const { data: updatedProgress, error } = await supabase
      .from("user_progress")
      .update({
        ...updateData,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating user progress:", error);
      return NextResponse.json(
        { error: "Failed to update progress" },
        { status: 500 }
      );
    }

    return NextResponse.json({ progress: updatedProgress });
  } catch (error) {
    console.error("Error in user progress PUT API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
