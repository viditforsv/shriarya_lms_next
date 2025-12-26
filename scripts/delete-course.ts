#!/usr/bin/env tsx
/**
 * Delete Course and All Related Data
 * 
 * Deletes a course and all its related units, chapters, topics, and lessons
 * 
 * Usage:
 *   npx tsx scripts/delete-course.ts <course-slug-or-id>
 */

import { config } from "dotenv";
import { resolve } from "path";
import { createClient } from "@supabase/supabase-js";
import {
  getSupabaseUrl,
  getSupabaseServiceRoleKey,
} from "../src/lib/supabase/env";

config({ path: resolve(process.cwd(), ".env.local") });

async function deleteCourse(courseSlugOrId: string) {
  const supabaseUrl = getSupabaseUrl();
  const serviceRoleKey = getSupabaseServiceRoleKey();

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Missing Supabase credentials");
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  // Find the course
  let courseId: string;
  let courseSlug: string;
  let courseTitle: string;

  // Check if it's a UUID
  if (courseSlugOrId.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
    const { data: course, error } = await supabase
      .from("courses")
      .select("id, title, slug")
      .eq("id", courseSlugOrId)
      .single();

    if (error || !course) {
      throw new Error(`Course with ID ${courseSlugOrId} not found`);
    }

    courseId = course.id;
    courseSlug = course.slug;
    courseTitle = course.title;
  } else {
    const { data: course, error } = await supabase
      .from("courses")
      .select("id, title, slug")
      .eq("slug", courseSlugOrId)
      .single();

    if (error || !course) {
      throw new Error(`Course with slug "${courseSlugOrId}" not found`);
    }

    courseId = course.id;
    courseSlug = course.slug;
    courseTitle = course.title;
  }

  console.log(`🗑️  Deleting course: ${courseTitle}`);
  console.log(`   ID: ${courseId}`);
  console.log(`   Slug: ${courseSlug}\n`);

  // Count related data before deletion
  console.log("📊 Counting related data...");
  
  const { count: unitsCount } = await supabase
    .from("courses_units")
    .select("*", { count: "exact", head: true })
    .eq("course_id", courseId);

  const { count: lessonsCount } = await supabase
    .from("courses_lessons")
    .select("*", { count: "exact", head: true })
    .eq("course_id", courseId);

  const { count: enrollmentsCount } = await supabase
    .from("courses_enrollments")
    .select("*", { count: "exact", head: true })
    .eq("course_id", courseId);

  console.log(`   Units: ${unitsCount || 0}`);
  console.log(`   Lessons: ${lessonsCount || 0}`);
  console.log(`   Enrollments: ${enrollmentsCount || 0}\n`);

  if (enrollmentsCount && enrollmentsCount > 0) {
    console.log("⚠️  Warning: Course has enrollments. These will be deleted.");
    const proceed = process.argv.includes("--force");
    if (!proceed) {
      console.log("   Use --force flag to proceed with deletion.");
      process.exit(1);
    }
  }

  // Delete lessons first (they have foreign keys to chapters and topics)
  console.log("🗑️  Deleting lessons...");
  const { error: lessonsError } = await supabase
    .from("courses_lessons")
    .delete()
    .eq("course_id", courseId);

  if (lessonsError) {
    console.error(`   ❌ Error deleting lessons: ${lessonsError.message}`);
  } else {
    console.log(`   ✅ Deleted ${lessonsCount || 0} lessons`);
  }

  // Delete units (this should cascade delete chapters and topics)
  console.log("🗑️  Deleting units (cascades to chapters and topics)...");
  const { error: unitsError } = await supabase
    .from("courses_units")
    .delete()
    .eq("course_id", courseId);

  if (unitsError) {
    console.error(`   ❌ Error deleting units: ${unitsError.message}`);
  } else {
    console.log(`   ✅ Deleted ${unitsCount || 0} units`);
  }

  // Delete enrollments
  if (enrollmentsCount && enrollmentsCount > 0) {
    console.log("🗑️  Deleting enrollments...");
    const { error: enrollmentsError } = await supabase
      .from("courses_enrollments")
      .delete()
      .eq("course_id", courseId);

    if (enrollmentsError) {
      console.error(`   ❌ Error deleting enrollments: ${enrollmentsError.message}`);
    } else {
      console.log(`   ✅ Deleted ${enrollmentsCount} enrollments`);
    }
  }

  // Finally, delete the course itself
  console.log("🗑️  Deleting course...");
  const { error: courseError } = await supabase
    .from("courses")
    .delete()
    .eq("id", courseId);

  if (courseError) {
    throw new Error(`Failed to delete course: ${courseError.message}`);
  }

  console.log(`\n✅ Successfully deleted course: ${courseTitle}`);
  
  // Verify deletion
  console.log("\n🔍 Verifying deletion...");
  const { data: verifyCourse } = await supabase
    .from("courses")
    .select("id")
    .eq("id", courseId)
    .single();

  if (verifyCourse) {
    console.log("   ⚠️  Warning: Course still exists in database");
  } else {
    console.log("   ✅ Course successfully removed from database");
  }

  // Check for orphaned data
  const { count: orphanedUnits } = await supabase
    .from("courses_units")
    .select("*", { count: "exact", head: true })
    .eq("course_id", courseId);

  const { count: orphanedLessons } = await supabase
    .from("courses_lessons")
    .select("*", { count: "exact", head: true })
    .eq("course_id", courseId);

  if (orphanedUnits && orphanedUnits > 0) {
    console.log(`   ⚠️  Warning: ${orphanedUnits} orphaned units found`);
  }
  if (orphanedLessons && orphanedLessons > 0) {
    console.log(`   ⚠️  Warning: ${orphanedLessons} orphaned lessons found`);
  }

  if ((!orphanedUnits || orphanedUnits === 0) && (!orphanedLessons || orphanedLessons === 0)) {
    console.log("   ✅ No orphaned data found");
  }
}

async function main() {
  const courseSlugOrId = process.argv[2];

  if (!courseSlugOrId || courseSlugOrId === "--help" || courseSlugOrId === "-h") {
    console.log(`
Delete Course Script

Usage:
  npx tsx scripts/delete-course.ts <course-slug-or-id> [--force]

Options:
  <course-slug-or-id>  Course slug or UUID
  --force              Force deletion even if course has enrollments

Examples:
  npx tsx scripts/delete-course.ts cbse-class-10-mathematics
  npx tsx scripts/delete-course.ts 4aab37dd-8928-4648-973f-6fa9d4a5e066 --force
`);
    process.exit(0);
  }

  try {
    await deleteCourse(courseSlugOrId);
  } catch (error) {
    console.error("\n❌ Error:", error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

