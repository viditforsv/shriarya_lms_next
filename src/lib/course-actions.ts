"use server";

import { createClient } from "@/lib/supabase/server";

export async function checkCourseAccessServer(
  courseId: string,
  userId: string
): Promise<boolean> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("courses_enrollments")
    .select("id")
    .eq("user_id", userId)
    .eq("course_id", courseId)
    .eq("status", "active")
    .single();

  if (error && error.code !== "PGRST116") {
    console.error("Error checking course access:", error);
  }

  return !!data;
}

export async function getCourseByIdServer(courseId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("id", courseId)
    .single();

  if (error) {
    console.error("Error fetching course:", error);
    return null;
  }

  return data;
}

export async function getFreeCoursesServer() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("price", 0)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching free courses:", error);
    throw error;
  }

  return data || [];
}
