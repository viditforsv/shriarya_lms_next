import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Helper function to check if user is admin
async function checkAdminAccess() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error("Authentication required");
  }

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

// DELETE /api/lessons/bulk - Delete all lessons for a course
export async function DELETE(request: Request) {
  try {
    await checkAdminAccess();

    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get("course_id");

    if (!courseId) {
      return NextResponse.json(
        { error: "course_id is required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // First, count how many lessons will be deleted
    const { count } = await supabase
      .from("courses_lessons")
      .select("*", { count: "exact", head: true })
      .eq("course_id", courseId);

    // Delete all lessons for the course
    const { error } = await supabase
      .from("courses_lessons")
      .delete()
      .eq("course_id", courseId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Update course lessons count to 0
    await supabase
      .from("courses")
      .update({
        lessons: 0,
        updated_at: new Date().toISOString(),
      })
      .eq("id", courseId);

    return NextResponse.json({
      message: `Deleted ${count || 0} lessons for course`,
      deletedCount: count || 0,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to delete lessons",
      },
      { status: 500 }
    );
  }
}
