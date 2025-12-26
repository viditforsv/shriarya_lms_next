#!/usr/bin/env tsx
/**
 * Verify that all lessons are correctly mapped to topics, chapters, and units
 */

import { config } from "dotenv";
import { resolve } from "path";
import { createClient } from "@supabase/supabase-js";
import { getSupabaseUrl, getSupabaseServiceRoleKey } from "../src/lib/supabase/env";

config({ path: resolve(process.cwd(), ".env.local") });

async function verifyLessonMappings(courseSlug: string) {
  const supabaseUrl = getSupabaseUrl();
  const serviceRoleKey = getSupabaseServiceRoleKey();

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "Missing Supabase credentials. Set NEXT_PUBLIC_SUPABASE_URL_DEV/PROD and SUPABASE_SERVICE_ROLE_KEY_DEV/PROD"
    );
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  // Get course
  const { data: course, error: courseError } = await supabase
    .from("courses")
    .select("id, title, slug")
    .eq("slug", courseSlug)
    .single();

  if (courseError || !course) {
    throw new Error(`Course with slug "${courseSlug}" not found`);
  }

  console.log(`\n🔍 Verifying lesson mappings for: ${course.title} (${course.id})\n`);

  // Fetch all lessons with their relationships
  const { data: lessons, error: lessonsError } = await supabase
    .from("courses_lessons")
    .select(`
      id,
      title,
      slug,
      lesson_order,
      chapter_id,
      topic_id,
      chapter:courses_chapters(
        id,
        chapter_name,
        chapter_order,
        unit_id,
        unit:courses_units(
          id,
          unit_name,
          unit_order
        )
      ),
      topic:courses_topics(
        id,
        topic_name,
        topic_order,
        chapter_id
      )
    `)
    .eq("course_id", course.id)
    .order("lesson_order");

  if (lessonsError) {
    throw new Error(`Failed to fetch lessons: ${lessonsError.message}`);
  }

  if (!lessons || lessons.length === 0) {
    console.log("❌ No lessons found for this course");
    return;
  }

  console.log(`📊 Total lessons: ${lessons.length}\n`);

  // Check for issues
  let issues = 0;
  const lessonsWithoutChapter: typeof lessons = [];
  const lessonsWithoutTopic: typeof lessons = [];
  const lessonsWithMismatchedTopic: typeof lessons = [];

  lessons.forEach((lesson: any) => {
    if (!lesson.chapter_id || !lesson.chapter) {
      lessonsWithoutChapter.push(lesson);
      issues++;
    }
    if (!lesson.topic_id || !lesson.topic) {
      lessonsWithoutTopic.push(lesson);
      issues++;
    }
    if (lesson.topic && lesson.chapter && lesson.topic.chapter_id !== lesson.chapter_id) {
      lessonsWithMismatchedTopic.push(lesson);
      issues++;
    }
  });

  // Report issues
  if (lessonsWithoutChapter.length > 0) {
    console.log(`❌ Lessons without chapter (${lessonsWithoutChapter.length}):`);
    lessonsWithoutChapter.forEach((lesson: any) => {
      console.log(`   - ${lesson.title} (${lesson.slug})`);
    });
    console.log();
  }

  if (lessonsWithoutTopic.length > 0) {
    console.log(`❌ Lessons without topic (${lessonsWithoutTopic.length}):`);
    lessonsWithoutTopic.forEach((lesson: any) => {
      console.log(`   - ${lesson.title} (${lesson.slug})`);
    });
    console.log();
  }

  if (lessonsWithMismatchedTopic.length > 0) {
    console.log(`❌ Lessons with topic-chapter mismatch (${lessonsWithMismatchedTopic.length}):`);
    lessonsWithMismatchedTopic.forEach((lesson: any) => {
      console.log(`   - ${lesson.title} (${lesson.slug})`);
      console.log(`     Topic chapter: ${lesson.topic?.chapter_id}`);
      console.log(`     Lesson chapter: ${lesson.chapter_id}`);
    });
    console.log();
  }

  // Summary by unit/chapter/topic
  const structure: Record<string, Record<string, Record<string, number>>> = {};

  lessons.forEach((lesson: any) => {
    if (lesson.chapter?.unit && lesson.chapter && lesson.topic) {
      const unitName = lesson.chapter.unit.unit_name;
      const chapterName = lesson.chapter.chapter_name;
      const topicName = lesson.topic.topic_name;

      if (!structure[unitName]) {
        structure[unitName] = {};
      }
      if (!structure[unitName][chapterName]) {
        structure[unitName][chapterName] = {};
      }
      if (!structure[unitName][chapterName][topicName]) {
        structure[unitName][chapterName][topicName] = 0;
      }
      structure[unitName][chapterName][topicName]++;
    }
  });

  console.log("📚 Course Structure Summary:\n");
  Object.entries(structure).forEach(([unitName, chapters]) => {
    console.log(`  ${unitName}:`);
    Object.entries(chapters).forEach(([chapterName, topics]) => {
      console.log(`    - ${chapterName}:`);
      Object.entries(topics).forEach(([topicName, count]) => {
        console.log(`      • ${topicName}: ${count} lesson(s)`);
      });
    });
  });

  if (issues === 0) {
    console.log("\n✅ All lessons are correctly mapped!");
  } else {
    console.log(`\n⚠️  Found ${issues} issue(s) that need to be fixed.`);
  }
}

// Main execution
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args[0] === "--help" || args[0] === "-h") {
    console.log(`
Verify Lesson Mappings Script

Usage:
  npx tsx scripts/verify-lesson-mappings.ts <course-slug>

Options:
  <course-slug>    Course slug to verify (e.g., "gre-quant")
  --help, -h       Show this help message

Example:
  npx tsx scripts/verify-lesson-mappings.ts gre-quant
`);
    process.exit(0);
  }

  try {
    const courseSlug = args[0];
    await verifyLessonMappings(courseSlug);
  } catch (error) {
    console.error("\n❌ Error:", error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

main();

