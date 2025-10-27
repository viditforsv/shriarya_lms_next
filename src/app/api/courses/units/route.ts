import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

// Validation schemas
const UnitSchema = z.object({
  course_id: z.string().uuid("Course ID is required"),
  unit_name: z.string().min(1, "Unit name is required"),
  unit_order: z.number().int().min(1, "Unit order must be a positive integer"),
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

// GET /api/courses/units - Get units for a course
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get("course_id");
    const courseSlug = searchParams.get("course_slug");

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

    // Fetch units with chapters
    const { data: units, error } = await supabase
      .from("courses_units")
      .select(
        `
        *,
        chapters:courses_chapters(
          id,
          chapter_name,
          chapter_order,
          description,
          is_locked
        )
      `
      )
      .eq("course_id", courseIdToUse)
      .order("unit_order", { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ units });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to fetch units",
      },
      { status: 500 }
    );
  }
}

// POST /api/courses/units - Create new unit
export async function POST(request: Request) {
  try {
    await checkAdminAccess();

    const body = await request.json();
    const validatedData = UnitSchema.parse(body);

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

    // Check if unit order already exists
    const { data: existingUnit } = await supabase
      .from("courses_units")
      .select("id")
      .eq("course_id", validatedData.course_id)
      .eq("unit_order", validatedData.unit_order)
      .single();

    if (existingUnit) {
      return NextResponse.json(
        { error: "Unit order already exists for this course" },
        { status: 400 }
      );
    }

    const { data: unit, error } = await supabase
      .from("courses_units")
      .insert(validatedData)
      .select("*")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ unit }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to create unit",
      },
      { status: 500 }
    );
  }
}

// PUT /api/courses/units - Update unit
export async function PUT(request: Request) {
  try {
    await checkAdminAccess();

    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Unit ID is required" },
        { status: 400 }
      );
    }

    const validatedData = UnitSchema.partial().parse(updateData);

    const supabase = await createClient();

    const { data: unit, error } = await supabase
      .from("courses_units")
      .update(validatedData)
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!unit) {
      return NextResponse.json({ error: "Unit not found" }, { status: 404 });
    }

    return NextResponse.json({ unit });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to update unit",
      },
      { status: 500 }
    );
  }
}

// DELETE /api/courses/units - Delete unit
export async function DELETE(request: Request) {
  try {
    await checkAdminAccess();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Unit ID is required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Check if unit has chapters
    const { data: chapters } = await supabase
      .from("courses_chapters")
      .select("id")
      .eq("unit_id", id);

    if (chapters && chapters.length > 0) {
      return NextResponse.json(
        { error: "Cannot delete unit with existing chapters" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("courses_units")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Unit deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to delete unit",
      },
      { status: 500 }
    );
  }
}
