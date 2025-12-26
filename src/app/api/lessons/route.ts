import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

// Validation schemas
const LessonSchema = z.object({
  title: z.string().min(1, "Title is required"),
  topic_badge: z.string().nullable().optional(),
  content: z.string().nullable().optional(),
  lesson_order: z.number().min(1, "Lesson order is required"),
  slug: z.string().min(1, "Slug is required"),
  is_preview: z.boolean().default(false),
  video_url: z.string().nullable().optional(),
  video_thumbnail_url: z.string().nullable().optional(),
  pdf_url: z.string().nullable().optional(),
  chapter_id: z.string().uuid().nullable().optional(),
  quiz_id: z.string().nullable().optional(),
  course_id: z.string().min(1, "Course ID is required"),
  topic_number: z.string().nullable().optional(),
  lesson_code: z.string().nullable().optional(),
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
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const search = searchParams.get("search") || "";

    const supabase = await createClient();

    // Get course ID
    let courseIdToUse = courseId;
    if (courseSlug) {
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
      courseIdToUse = course.id;
    }

    if (!courseIdToUse) {
      return NextResponse.json(
        { error: "course_id or course_slug is required" },
        { status: 400 }
      );
    }

    // Build base query
    let query = supabase
      .from("courses_lessons")
      .select(
        `
        *,
        topic_badge,
        video_thumbnail_url,
        chapter:courses_chapters (
          id,
          chapter_name,
          chapter_order,
          unit:courses_units (
            id,
            unit_name,
            unit_order
          )
        ),
        topic:courses_topics (
          id,
          topic_name,
          topic_order,
          topic_number,
          chapter_id
        )
      `,
        { count: "exact" }
      )
      .eq("course_id", courseIdToUse)
      .order("lesson_order", { ascending: true });

    // Add search filter if provided
    if (search.trim()) {
      query = query.or(
        `title.ilike.%${search}%,topic_number.ilike.%${search}%,lesson_code.ilike.%${search}%`
      );
    }

    // Add pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data: lessons, error, count } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const totalPages = Math.ceil((count || 0) / limit);

    return NextResponse.json({
      lessons: lessons || [],
      pagination: {
        currentPage: page,
        totalPages,
        total: count || 0,
        limit,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    });
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
      .from("courses_lessons")
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
      .from("courses_lessons")
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
      .from("courses_lessons")
      .select("course_id")
      .eq("id", id)
      .single();

    // Delete the lesson
    const { error } = await supabase
      .from("courses_lessons")
      .delete()
      .eq("id", id);

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
