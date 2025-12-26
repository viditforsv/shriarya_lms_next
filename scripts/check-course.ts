#!/usr/bin/env tsx
/**
 * Check Course Details
 * 
 * Queries a specific course by UUID and displays its complete structure
 */

import { config } from "dotenv";
import { resolve } from "path";
import { createClient } from "@supabase/supabase-js";
import {
  getSupabaseUrl,
  getSupabaseServiceRoleKey,
} from "../src/lib/supabase/env";

config({ path: resolve(process.cwd(), ".env.local") });

async function checkCourse(courseId: string) {
  const supabaseUrl = getSupabaseUrl();
  const serviceRoleKey = getSupabaseServiceRoleKey();

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Missing Supabase credentials");
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  console.log(`🔍 Checking course: ${courseId}\n`);

  // 1. Get course details
  const { data: course, error: courseError } = await supabase
    .from("courses")
    .select("*")
    .eq("id", courseId)
    .single();

  if (courseError) {
    console.error("❌ Error fetching course:", courseError.message);
    process.exit(1);
  }

  if (!course) {
    console.log("❌ Course not found");
    process.exit(1);
  }

  console.log("📚 Course Details:");
  console.log(`   ID: ${course.id}`);
  console.log(`   Title: ${course.title}`);
  console.log(`   Slug: ${course.slug}`);
  console.log(`   Curriculum: ${course.curriculum || "N/A"}`);
  console.log(`   Subject: ${course.subject || "N/A"}`);
  console.log(`   Grade: ${course.grade || "N/A"}`);
  console.log(`   Status: ${course.status}`);
  console.log(`   Price: ${course.price || 0}`);
  console.log(`   Created: ${course.created_at}`);
  console.log("");

  // 2. Get units
  const { data: units, error: unitsError } = await supabase
    .from("courses_units")
    .select("*")
    .eq("course_id", courseId)
    .order("unit_order");

  if (unitsError) {
    console.error("❌ Error fetching units:", unitsError.message);
  } else {
    console.log(`📦 Units: ${units?.length || 0}`);
    if (units && units.length > 0) {
      for (const unit of units) {
        console.log(`   - ${unit.unit_name} (Order: ${unit.unit_order})`);
      }
    }
    console.log("");
  }

  // 3. Get chapters (through units)
  let totalChapters = 0;
  if (units && units.length > 0) {
    const unitIds = units.map(u => u.id);
    const { data: chapters, error: chaptersError } = await supabase
      .from("courses_chapters")
      .select("*")
      .in("unit_id", unitIds)
      .order("chapter_order");

    if (chaptersError) {
      console.error("❌ Error fetching chapters:", chaptersError.message);
    } else {
      totalChapters = chapters?.length || 0;
      console.log(`📖 Chapters: ${totalChapters}`);
      if (chapters && chapters.length > 0) {
        for (const chapter of chapters) {
          const unit = units.find(u => u.id === chapter.unit_id);
          console.log(`   - ${chapter.chapter_name} (Unit: ${unit?.unit_name || "N/A"}, Order: ${chapter.chapter_order})`);
        }
      }
      console.log("");
    }
  }

  // 4. Get topics (through chapters)
  let totalTopics = 0;
  if (units && units.length > 0) {
    const unitIds = units.map(u => u.id);
    const { data: chapters } = await supabase
      .from("courses_chapters")
      .select("id")
      .in("unit_id", unitIds);

    if (chapters && chapters.length > 0) {
      const chapterIds = chapters.map(c => c.id);
      const { data: topics, error: topicsError } = await supabase
        .from("courses_topics")
        .select("*")
        .in("chapter_id", chapterIds)
        .order("topic_order");

      if (topicsError) {
        console.error("❌ Error fetching topics:", topicsError.message);
      } else {
        totalTopics = topics?.length || 0;
        console.log(`🏷️  Topics: ${totalTopics}`);
        if (topics && topics.length > 0) {
          for (const topic of topics.slice(0, 10)) { // Show first 10
            console.log(`   - ${topic.topic_name} (Order: ${topic.topic_order})`);
          }
          if (topics.length > 10) {
            console.log(`   ... and ${topics.length - 10} more`);
          }
        }
        console.log("");
      }
    }
  }

  // 5. Get lessons
  const { data: lessons, error: lessonsError } = await supabase
    .from("courses_lessons")
    .select(`
      *,
      chapter:courses_chapters(
        id,
        chapter_name,
        unit:courses_units(
          id,
          unit_name
        )
      ),
      topic:courses_topics(
        id,
        topic_name
      )
    `)
    .eq("course_id", courseId)
    .order("lesson_order");

  if (lessonsError) {
    console.error("❌ Error fetching lessons:", lessonsError.message);
  } else {
    console.log(`📝 Lessons: ${lessons?.length || 0}`);
    if (lessons && lessons.length > 0) {
      console.log("\n   First 10 lessons:");
      for (const lesson of lessons.slice(0, 10)) {
        const unitName = lesson.chapter?.unit?.unit_name || "N/A";
        const chapterName = lesson.chapter?.chapter_name || "N/A";
        const topicName = lesson.topic?.topic_name || "N/A";
        console.log(`   ${lesson.lesson_order}. ${lesson.title}`);
        console.log(`      Slug: ${lesson.slug}`);
        console.log(`      Unit: ${unitName} → Chapter: ${chapterName} → Topic: ${topicName}`);
        console.log(`      Preview: ${lesson.is_preview ? "Yes" : "No"}`);
      }
      if (lessons.length > 10) {
        console.log(`   ... and ${lessons.length - 10} more lessons`);
      }
    }
    console.log("");
  }

  // Summary
  console.log("\n📊 Summary:");
  console.log(`   Course: ${course.title}`);
  console.log(`   Units: ${units?.length || 0}`);
  console.log(`   Chapters: ${totalChapters}`);
  console.log(`   Topics: ${totalTopics}`);
  console.log(`   Lessons: ${lessons?.length || 0}`);
}

async function main() {
  const courseId = process.argv[2];

  if (!courseId) {
    console.error("Usage: tsx scripts/check-course.ts <course-uuid>");
    process.exit(1);
  }

  await checkCourse(courseId).catch(console.error);
}

if (require.main === module) {
  main();
}

