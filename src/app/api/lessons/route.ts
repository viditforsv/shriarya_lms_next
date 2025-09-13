import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

// Validation schemas
const LessonSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  content: z.string().optional(),
  lesson_order: z.number().min(1, "Lesson order is required"),
  slug: z.string().min(1, "Slug is required"),
  is_preview: z.boolean().default(false),
  duration: z.string().optional(),
  type: z
    .enum(["video", "document", "quiz", "assignment", "practice"])
    .default("video"),
  course_id: z.string().min(1, "Course ID is required"),
});

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

// GET /api/lessons - Get lessons for a course
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get("course_id");
    const courseSlug = searchParams.get("course_slug");

    const supabase = await createClient();

    let query = supabase
      .from("lessons")
      .select("*")
      .order("lesson_order", { ascending: true });

    if (courseId) {
      query = query.eq("course_id", courseId);
    } else if (courseSlug) {
      // First get course by slug
      const { data: course } = await supabase
        .from("courses")
        .select("id")
        .eq("slug", courseSlug)
        .single();

      if (!course) {
        return NextResponse.json(
          { error: "Course not found" },
          { status: 404 }
        );
      }

      query = query.eq("course_id", course.id);
    } else {
      return NextResponse.json(
        { error: "course_id or course_slug is required" },
        { status: 400 }
      );
    }

    const { data: lessons, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ lessons });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to fetch lessons",
      },
      { status: 500 }
    );
  }
}

// POST /api/lessons - Create new lesson
export async function POST(request: Request) {
  try {
    await checkAdminAccess();

    const body = await request.json();
    const validatedData = LessonSchema.parse(body);

    const supabase = await createClient();

    // Check if course exists
    const { data: course, error: courseError } = await supabase
      .from("courses")
      .select("id")
      .eq("id", validatedData.course_id)
      .single();

    if (courseError || !course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    const { data: lesson, error } = await supabase
      .from("lessons")
      .insert(validatedData)
      .select("*")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Update course lessons count
    const { data: courseData } = await supabase
      .from("courses")
      .select("lessons")
      .eq("id", validatedData.course_id)
      .single();

    if (courseData) {
      await supabase
        .from("courses")
        .update({
          lessons: (courseData.lessons || 0) + 1,
          updated_at: new Date().toISOString(),
        })
        .eq("id", validatedData.course_id);
    }

    return NextResponse.json({ lesson }, { status: 201 });
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
          error instanceof Error ? error.message : "Failed to create lesson",
      },
      { status: 500 }
    );
  }
}

// PUT /api/lessons - Update lesson
export async function PUT(request: Request) {
  try {
    await checkAdminAccess();

    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Lesson ID is required" },
        { status: 400 }
      );
    }

    const validatedData = LessonSchema.partial().parse(updateData);

    const supabase = await createClient();

    const { data: lesson, error } = await supabase
      .from("lessons")
      .update(validatedData)
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ lesson });
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
          error instanceof Error ? error.message : "Failed to update lesson",
      },
      { status: 500 }
    );
  }
}

// DELETE /api/lessons - Delete lesson
export async function DELETE(request: Request) {
  try {
    await checkAdminAccess();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Lesson ID is required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Get lesson to find course_id
    const { data: lesson } = await supabase
      .from("lessons")
      .select("course_id")
      .eq("id", id)
      .single();

    // Delete the lesson
    const { error } = await supabase.from("lessons").delete().eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Update course lessons count
    if (lesson) {
      const { data: courseData } = await supabase
        .from("courses")
        .select("lessons")
        .eq("id", lesson.course_id)
        .single();

      if (courseData) {
        await supabase
          .from("courses")
          .update({
            lessons: Math.max(0, (courseData.lessons || 0) - 1),
            updated_at: new Date().toISOString(),
          })
          .eq("id", lesson.course_id);
      }
    }

    return NextResponse.json({ message: "Lesson deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to delete lesson",
      },
      { status: 500 }
    );
  }
}
