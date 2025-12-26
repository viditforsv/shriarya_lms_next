#!/usr/bin/env tsx
/**
 * List all lesson slugs from the courses_lessons table
 */

import { config } from "dotenv";
import { resolve } from "path";
import { createClient } from "@supabase/supabase-js";
import { getSupabaseUrl, getSupabaseServiceRoleKey } from "../src/lib/supabase/env";

config({ path: resolve(process.cwd(), ".env.local") });

async function listLessonSlugs(courseSlug?: string) {
  const supabaseUrl = getSupabaseUrl();
  const serviceRoleKey = getSupabaseServiceRoleKey();

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "Missing Supabase credentials. Set NEXT_PUBLIC_SUPABASE_URL_DEV/PROD and SUPABASE_SERVICE_ROLE_KEY_DEV/PROD"
    );
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  let query = supabase
    .from("courses_lessons")
    .select("id, slug, title, lesson_code, course_id, course:courses(slug, title)")
    .order("slug");

  // Filter by course if provided
  if (courseSlug) {
    const { data: course, error: courseError } = await supabase
      .from("courses")
      .select("id")
      .eq("slug", courseSlug)
      .single();

    if (courseError || !course) {
      throw new Error(`Course with slug "${courseSlug}" not found`);
    }

    query = query.eq("course_id", course.id);
  }

  const { data: lessons, error } = await query;

  if (error) {
    throw new Error(`Failed to fetch lessons: ${error.message}`);
  }

  if (!lessons || lessons.length === 0) {
    console.log("❌ No lessons found");
    return;
  }

  console.log(`\n📚 Found ${lessons.length} lesson(s)\n`);
  console.log("ID                                    | Slug                          | Title");
  console.log("-".repeat(100));

  lessons.forEach((lesson: any) => {
    const courseInfo = lesson.course ? ` [${lesson.course.slug}]` : "";
    console.log(
      `${lesson.id} | ${(lesson.slug || "N/A").padEnd(28)} | ${(lesson.title || "N/A").substring(0, 40)}${courseInfo}`
    );
  });

  console.log("\n");
}

// Main execution
async function main() {
  const args = process.argv.slice(2);

  if (args[0] === "--help" || args[0] === "-h") {
    console.log(`
List Lesson Slugs Script

Usage:
  npx tsx scripts/list-lesson-slugs.ts [course-slug]

Options:
  [course-slug]    Optional: Filter by course slug (e.g., "gre-quant")
  --help, -h       Show this help message

Example:
  npx tsx scripts/list-lesson-slugs.ts
  npx tsx scripts/list-lesson-slugs.ts gre-quant
`);
    process.exit(0);
  }

  try {
    const courseSlug = args[0];
    await listLessonSlugs(courseSlug);
  } catch (error) {
    console.error("\n❌ Error:", error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

main();

