import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

// Validation schemas
const ChapterSchema = z.object({
  unit_id: z.string().uuid("Unit ID is required"),
  chapter_name: z.string().min(1, "Chapter name is required"),
  chapter_order: z
    .number()
    .int()
    .min(1, "Chapter order must be a positive integer"),
  description: z.string().optional(),
  is_locked: z.boolean().default(false),
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

// GET /api/courses/chapters - Get chapters for a unit or course
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const unitId = searchParams.get("unit_id");
    const courseId = searchParams.get("course_id");
    const courseSlug = searchParams.get("course_slug");

    const supabase = await createClient();

    let query = supabase
      .from("courses_chapters")
      .select(
        `
        *,
        unit:courses_units!inner(
          id,
          unit_name,
          unit_order,
          course_id
        )
      `
      )
      .order("chapter_order", { ascending: true });

    if (unitId) {
      query = query.eq("unit_id", unitId);
    } else if (courseId) {
      query = query.eq("unit.course_id", courseId);
    } else if (courseSlug) {
      // Get course ID from slug
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
      query = query.eq("unit.course_id", course.id);
    } else {
      return NextResponse.json(
        { error: "unit_id, course_id, or course_slug is required" },
        { status: 400 }
      );
    }

    const { data: chapters, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ chapters });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to fetch chapters",
      },
      { status: 500 }
    );
  }
}

// POST /api/courses/chapters - Create new chapter
export async function POST(request: Request) {
  try {
    await checkAdminAccess();

    const body = await request.json();
    const validatedData = ChapterSchema.parse(body);

    const supabase = await createClient();

    // Check if unit exists
    const { data: unit, error: unitError } = await supabase
      .from("courses_units")
      .select("id")
      .eq("id", validatedData.unit_id)
      .single();

    if (unitError || !unit) {
      return NextResponse.json({ error: "Unit not found" }, { status: 404 });
    }

    // Check if chapter order already exists for this unit
    const { data: existingChapter } = await supabase
      .from("courses_chapters")
      .select("id")
      .eq("unit_id", validatedData.unit_id)
      .eq("chapter_order", validatedData.chapter_order)
      .single();

    if (existingChapter) {
      return NextResponse.json(
        { error: "Chapter order already exists for this unit" },
        { status: 400 }
      );
    }

    const { data: chapter, error } = await supabase
      .from("courses_chapters")
      .insert(validatedData)
      .select(
        `
        *,
        unit:courses_units(
          id,
          unit_name,
          unit_order,
          course_id
        )
      `
      )
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ chapter }, { status: 201 });
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
          error instanceof Error ? error.message : "Failed to create chapter",
      },
      { status: 500 }
    );
  }
}

// PUT /api/courses/chapters - Update chapter
export async function PUT(request: Request) {
  try {
    await checkAdminAccess();

    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Chapter ID is required" },
        { status: 400 }
      );
    }

    const validatedData = ChapterSchema.partial().parse(updateData);

    const supabase = await createClient();

    const { data: chapter, error } = await supabase
      .from("courses_chapters")
      .update(validatedData)
      .eq("id", id)
      .select(
        `
        *,
        unit:courses_units(
          id,
          unit_name,
          unit_order,
          course_id
        )
      `
      )
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!chapter) {
      return NextResponse.json({ error: "Chapter not found" }, { status: 404 });
    }

    return NextResponse.json({ chapter });
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
          error instanceof Error ? error.message : "Failed to update chapter",
      },
      { status: 500 }
    );
  }
}

// DELETE /api/courses/chapters - Delete chapter
export async function DELETE(request: Request) {
  try {
    await checkAdminAccess();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Chapter ID is required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Check if chapter has lessons
    const { data: lessons } = await supabase
      .from("courses_lessons")
      .select("id")
      .eq("chapter_id", id);

    if (lessons && lessons.length > 0) {
      return NextResponse.json(
        { error: "Cannot delete chapter with existing lessons" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("courses_chapters")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Chapter deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to delete chapter",
      },
      { status: 500 }
    );
  }
}
