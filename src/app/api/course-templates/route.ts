import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
// Types imported for reference but not used directly in this file
import { z } from "zod";

// Validation schemas
const TemplateFieldSchema = z.object({
  key: z.string().min(1),
  type: z.enum([
    "text",
    "textarea",
    "number",
    "boolean",
    "array",
    "object",
    "select",
  ]),
  label: z.string().min(1),
  description: z.string().optional(),
  required: z.boolean().default(false),
  placeholder: z.string().optional(),
  default_value: z.any().optional(),
  validation_rules: z
    .object({
      min: z.number().optional(),
      max: z.number().optional(),
      minLength: z.number().optional(),
      maxLength: z.number().optional(),
      pattern: z.string().optional(),
    })
    .optional(),
  options: z.array(z.string()).optional(),
  itemType: z.string().optional(),
  structure: z.any().optional(),
});

const TemplateStructureSchema = z.object({
  sections: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      type: z.enum(["overview", "syllabus", "lessons", "facts", "custom"]),
      fields: z.array(z.string()),
      order: z.number().optional(),
      visible: z.boolean().optional(),
    })
  ),
  layout: z
    .object({
      sidebar: z.boolean().optional(),
      tabs: z.array(z.string()).optional(),
      gridColumns: z.number().optional(),
    })
    .optional(),
});

const CourseTemplateSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().optional(),
  curriculum: z.enum(["CBSE", "ICSE", "IBDP", "IGCSE"]),
  subject: z.string().min(1),
  grade: z.string().optional(),
  level: z.string().optional(),
  structure: TemplateStructureSchema,
  fields: z.array(TemplateFieldSchema),
  settings: z
    .object({
      defaultValues: z.record(z.string(), z.any()).optional(),
      ui: z
        .object({
          showProgress: z.boolean().optional(),
          showEnrollment: z.boolean().optional(),
          showFacts: z.boolean().optional(),
          showSyllabus: z.boolean().optional(),
          showTags: z.boolean().optional(),
        })
        .optional(),
      layout: z
        .object({
          sidebar: z.boolean().optional(),
          tabs: z.array(z.string()).optional(),
          gridColumns: z.number().optional(),
        })
        .optional(),
      behavior: z
        .object({
          autoEnroll: z.boolean().optional(),
          requirePayment: z.boolean().optional(),
          showPreview: z.boolean().optional(),
        })
        .optional(),
    })
    .optional(),
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

// GET /api/course-templates - Get all course templates
export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const curriculum = searchParams.get("curriculum");
    const subject = searchParams.get("subject");
    const active = searchParams.get("active");

    let query = supabase
      .from("courses_templates")
      .select("*")
      .order("created_at", { ascending: false });

    if (curriculum) {
      query = query.eq("curriculum", curriculum);
    }

    if (subject) {
      query = query.eq("subject", subject);
    }

    if (active !== null) {
      query = query.eq("is_active", active === "true");
    }

    const { data: templates, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ templates });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to fetch templates",
      },
      { status: 500 }
    );
  }
}

// POST /api/course-templates - Create new course template
export async function POST(request: Request) {
  try {
    await checkAdminAccess();

    const body = await request.json();
    const validatedData = CourseTemplateSchema.parse(body);

    const supabase = await createClient();
    const user = await getAuthenticatedUser();

    const { data: template, error } = await supabase
      .from("courses_templates")
      .insert({
        ...validatedData,
        created_by: user.id,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ template }, { status: 201 });
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
          error instanceof Error ? error.message : "Failed to create template",
      },
      { status: 500 }
    );
  }
}

// PUT /api/course-templates - Update course template
export async function PUT(request: Request) {
  try {
    await checkAdminAccess();

    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Template ID is required" },
        { status: 400 }
      );
    }

    const validatedData = CourseTemplateSchema.partial().parse(updateData);

    const supabase = await createClient();

    const { data: template, error } = await supabase
      .from("courses_templates")
      .update({
        ...validatedData,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ template });
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
          error instanceof Error ? error.message : "Failed to update template",
      },
      { status: 500 }
    );
  }
}

// DELETE /api/course-templates - Delete course template
export async function DELETE(request: Request) {
  try {
    await checkAdminAccess();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Template ID is required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Check if template is being used by any courses
    const { data: courses } = await supabase
      .from("courses")
      .select("id")
      .eq("template_id", id)
      .limit(1);

    if (courses && courses.length > 0) {
      return NextResponse.json(
        {
          error: "Cannot delete template that is being used by courses",
        },
        { status: 400 }
      );
    }

    // Delete the template
    const { error } = await supabase
      .from("courses_templates")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Template deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to delete template",
      },
      { status: 500 }
    );
  }
}
