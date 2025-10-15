import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

// Validation schemas
const CourseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  slug: z.string().min(1, "Slug is required"),
  template_id: z.string().optional(),
  template_data: z.any().optional(),
  price: z.number().optional(),
  status: z.enum(["published", "draft", "archived"]).default("draft"),
  curriculum: z.string().optional(),
  subject: z.string().optional(),
  grade: z.string().optional(),
  level: z.string().nullable().optional(),
  validity_days: z.number().optional(),
  thumbnail_url: z.string().optional(),
});

// Unused schemas removed to fix linting errors

// Helper function to get authenticated user
async function getAuthenticatedUser() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error("Authentication required");
  }

  return user;
}

// Helper function to check if user is admin
async function checkAdminAccess() {
  const user = await getAuthenticatedUser();
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "admin") {
    throw new Error("Admin access required");
  }

  return user;
}

// COURSE ENDPOINTS

// GET /api/courses - Get all courses or single course by ID
export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const status = searchParams.get("status");
    const curriculum = searchParams.get("curriculum");
    const isFreeParam = searchParams.get("is_free"); // Legacy param, now checks price

    // If ID is provided, fetch single course
    if (id) {
      const { data: course, error } = await supabase
        .from("courses")
        .select(
          `
          *,
          profiles:instructor_id (
            id,
            first_name,
            last_name,
            email
          )
        `
        )
        .eq("id", id)
        .single();

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      if (!course) {
        return NextResponse.json(
          { error: "Course not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({ course });
    }

    // Otherwise, fetch all courses
    let query = supabase
      .from("courses")
      .select(
        `
        *,
        profiles:instructor_id (
          id,
          first_name,
          last_name,
          email
        )
      `
      )
      .order("created_at", { ascending: false });

    if (status) {
      query = query.eq("status", status);
    }

    if (curriculum) {
      query = query.eq("curriculum", curriculum);
    }

    if (isFreeParam !== null) {
      if (isFreeParam === "true") {
        query = query.eq("price", 0);
      } else {
        query = query.gt("price", 0);
      }
    }

    const { data: courses, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ courses });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to fetch courses",
      },
      { status: 500 }
    );
  }
}

// POST /api/courses - Create new course
export async function POST(request: Request) {
  try {
    await checkAdminAccess();

    const body = await request.json();
    const validatedData = CourseSchema.parse(body);

    const supabase = await createClient();
    const user = await getAuthenticatedUser();

    const { data: course, error } = await supabase
      .from("courses")
      .insert({
        ...validatedData,
        instructor_id: user.id,
      })
      .select(
        `
        *,
        profiles:instructor_id (
          id,
          first_name,
          last_name,
          email
        )
      `
      )
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ course }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to create course",
      },
      { status: 500 }
    );
  }
}

// PUT /api/courses - Update course
export async function PUT(request: Request) {
  try {
    await checkAdminAccess();

    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Course ID is required" },
        { status: 400 }
      );
    }

    const validatedData = CourseSchema.partial().parse(updateData);

    const supabase = await createClient();

    const { data: course, error } = await supabase
      .from("courses")
      .update({
        ...validatedData,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select(
        `
        *,
        profiles:instructor_id (
          id,
          first_name,
          last_name,
          email
        )
      `
      )
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ course });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to update course",
      },
      { status: 500 }
    );
  }
}

// DELETE /api/courses - Delete course and all related data
export async function DELETE(request: Request) {
  try {
    await checkAdminAccess();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Course ID is required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    console.log(`Starting cascade deletion for course: ${id}`);

    // 1. Delete user progress data (if exists)
    try {
      const { error: progressError } = await supabase
        .from("user_progress")
        .delete()
        .eq("course_id", id);

      if (progressError) {
        console.warn("Error deleting user progress:", progressError.message);
        // Don't fail the entire operation for progress data
      } else {
        console.log("✅ Deleted user progress data");
      }
    } catch (error) {
      console.warn("User progress table might not exist:", error);
    }

    // 2. Delete enrollments
    const { error: enrollmentsError } = await supabase
      .from("courses_enrollments")
      .delete()
      .eq("course_id", id);

    if (enrollmentsError) {
      return NextResponse.json(
        { error: `Failed to delete enrollments: ${enrollmentsError.message}` },
        { status: 500 }
      );
    }
    console.log("✅ Deleted enrollments");

    // 3. Get all lessons for this course to delete them
    const { data: lessons, error: lessonsFetchError } = await supabase
      .from("courses_lessons")
      .select("id")
      .eq("course_id", id);

    if (lessonsFetchError) {
      return NextResponse.json(
        { error: `Failed to fetch lessons: ${lessonsFetchError.message}` },
        { status: 500 }
      );
    }

    // 4. Delete lessons
    const { error: lessonsError } = await supabase
      .from("courses_lessons")
      .delete()
      .eq("course_id", id);

    if (lessonsError) {
      return NextResponse.json(
        { error: `Failed to delete lessons: ${lessonsError.message}` },
        { status: 500 }
      );
    }
    console.log("✅ Deleted lessons");

    // 5. Finally delete the course
    const { error: courseError } = await supabase
      .from("courses")
      .delete()
      .eq("id", id);

    if (courseError) {
      return NextResponse.json(
        { error: `Failed to delete course: ${courseError.message}` },
        { status: 500 }
      );
    }
    console.log("✅ Deleted course");

    return NextResponse.json({
      message: "Course and all related data deleted successfully",
      deletedItems: {
        enrollments: true,
        lessons: lessons?.length || 0,
        course: true,
      },
    });
  } catch (error) {
    console.error("Error in course deletion:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to delete course",
      },
      { status: 500 }
    );
  }
}
