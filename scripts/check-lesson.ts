#!/usr/bin/env tsx
/**
 * Check Lesson Details
 */

import { config } from "dotenv";
import { resolve } from "path";
import { createClient } from "@supabase/supabase-js";
import {
  getSupabaseUrl,
  getSupabaseServiceRoleKey,
} from "../src/lib/supabase/env";

config({ path: resolve(process.cwd(), ".env.local") });

async function checkLesson(slug: string) {
  const supabaseUrl = getSupabaseUrl();
  const serviceRoleKey = getSupabaseServiceRoleKey();

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Missing Supabase credentials");
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  console.log(`🔍 Checking lesson: ${slug}\n`);

  const { data: lesson, error } = await supabase
    .from("courses_lessons")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("❌ Error:", error.message);
    return;
  }

  if (!lesson) {
    console.log("❌ Lesson not found");
    return;
  }

  console.log("📚 Lesson Details:");
  console.log(`   ID: ${lesson.id}`);
  console.log(`   Title: ${lesson.title}`);
  console.log(`   Slug: ${lesson.slug}`);
  console.log(`   Course ID: ${lesson.course_id}`);
  console.log(`   Chapter ID: ${lesson.chapter_id}`);
  console.log(`   Topic ID: ${lesson.topic_id}`);
  console.log(`   Order: ${lesson.lesson_order}`);
  console.log(`   Preview: ${lesson.is_preview}`);
  console.log(`\n📄 URLs:`);
  console.log(`   PDF URL: ${lesson.pdf_url || "null"}`);
  console.log(`   Video URL: ${lesson.video_url || "null"}`);
  console.log(`   Solution URL: ${lesson.solution_url || "null"}`);
  console.log(`\n📝 Content:`);
  console.log(`   Content: ${lesson.content ? lesson.content.substring(0, 100) + "..." : "null"}`);
  console.log(`   Topic Badge: ${lesson.topic_badge || "null"}`);
  console.log(`   Topic Number: ${lesson.topic_number || "null"}`);
}

async function main() {
  const slug = process.argv[2] || "cbse_maths_10_001";
  await checkLesson(slug).catch(console.error);
}

if (require.main === module) {
  main();
}

