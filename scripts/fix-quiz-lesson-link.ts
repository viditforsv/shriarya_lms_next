#!/usr/bin/env tsx
/**
 * Script to fix quiz lesson_id linking
 * 
 * Usage:
 *   npx tsx scripts/fix-quiz-lesson-link.ts <quiz_identifier> <lesson_code>
 * 
 * Example:
 *   npx tsx scripts/fix-quiz-lesson-link.ts "quiz_gre_lid_079" "gre_lid_079"
 */

import { config } from "dotenv";
import { resolve } from "path";
import { createClient } from "@supabase/supabase-js";
import { getSupabaseUrl, getSupabaseServiceRoleKey } from "../src/lib/supabase/env";

config({ path: resolve(process.cwd(), ".env.local") });

async function fixQuizLessonLink(quizIdentifier: string, lessonCode: string) {
  const supabaseUrl = getSupabaseUrl();
  const supabaseKey = getSupabaseServiceRoleKey();

  if (!supabaseUrl || !supabaseKey) {
    console.error("❌ Missing Supabase environment variables");
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  console.log(`🔍 Looking for quiz: "${quizIdentifier}"`);
  console.log(`🔍 Looking for lesson with code: "${lessonCode}"`);

  // Find the quiz - try by title first, then by ID
  let quiz = null;
  
  // Try to find by title (contains the identifier)
  const { data: quizzesByTitle, error: titleError } = await supabase
    .from("quizzes")
    .select("id, title, lesson_id")
    .ilike("title", `%${quizIdentifier}%`);

  if (titleError) {
    console.error("❌ Error searching by title:", titleError);
  } else if (quizzesByTitle && quizzesByTitle.length > 0) {
    quiz = quizzesByTitle[0];
    console.log(`✅ Found quiz by title: ${quiz.id} - "${quiz.title}"`);
  }

  // If not found by title, try by ID (if it's a UUID)
  if (!quiz && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(quizIdentifier)) {
    const { data: quizById, error: idError } = await supabase
      .from("quizzes")
      .select("id, title, lesson_id")
      .eq("id", quizIdentifier)
      .single();

    if (idError) {
      console.error("❌ Error searching by ID:", idError);
    } else if (quizById) {
      quiz = quizById;
      console.log(`✅ Found quiz by ID: ${quiz.id} - "${quiz.title}"`);
    }
  }

  if (!quiz) {
    console.error(`❌ Quiz not found with identifier: "${quizIdentifier}"`);
    console.log("\n💡 Try searching for quizzes:");
    const { data: allQuizzes } = await supabase
      .from("quizzes")
      .select("id, title, lesson_id")
      .limit(10);
    
    if (allQuizzes && allQuizzes.length > 0) {
      console.log("\nRecent quizzes:");
      allQuizzes.forEach((q) => {
        console.log(`  - ${q.id}: "${q.title}" (lesson_id: ${q.lesson_id || "null"})`);
      });
    }
    process.exit(1);
  }

  // Find the lesson by lesson_code
  const { data: lesson, error: lessonError } = await supabase
    .from("courses_lessons")
    .select("id, title, lesson_code, course_id")
    .eq("lesson_code", lessonCode)
    .maybeSingle();

  if (lessonError) {
    console.error("❌ Error finding lesson:", lessonError);
    process.exit(1);
  }

  if (!lesson) {
    console.error(`❌ Lesson not found with lesson_code: "${lessonCode}"`);
    console.log("\n💡 Try searching for lessons with similar codes:");
    const { data: similarLessons } = await supabase
      .from("courses_lessons")
      .select("id, title, lesson_code")
      .ilike("lesson_code", `%${lessonCode.split("_").pop()}%`)
      .limit(10);
    
    if (similarLessons && similarLessons.length > 0) {
      console.log("\nSimilar lessons:");
      similarLessons.forEach((l) => {
        console.log(`  - ${l.id}: "${l.title}" (code: ${l.lesson_code})`);
      });
    }
    process.exit(1);
  }

  console.log(`✅ Found lesson: ${lesson.id} - "${lesson.title}" (code: ${lesson.lesson_code})`);

  // Check current state
  console.log(`\n📊 Current state:`);
  console.log(`   Quiz ID: ${quiz.id}`);
  console.log(`   Quiz Title: "${quiz.title}"`);
  console.log(`   Current lesson_id: ${quiz.lesson_id || "null"}`);
  console.log(`   Target lesson_id: ${lesson.id}`);
  console.log(`   Target lesson_code: ${lesson.lesson_code}`);

  if (quiz.lesson_id === lesson.id) {
    console.log(`\n✅ Quiz is already linked to the correct lesson!`);
    return;
  }

  // Update the quiz
  console.log(`\n🔄 Updating quiz...`);
  const { error: updateError } = await supabase
    .from("quizzes")
    .update({ lesson_id: lesson.id })
    .eq("id", quiz.id);

  if (updateError) {
    console.error("❌ Error updating quiz:", updateError);
    process.exit(1);
  }

  console.log(`✅ Quiz updated successfully!`);

  // Also update the lesson's quiz_id if needed
  console.log(`\n🔄 Updating lesson's quiz_id...`);
  const { error: lessonUpdateError } = await supabase
    .from("courses_lessons")
    .update({ quiz_id: quiz.id })
    .eq("id", lesson.id);

  if (lessonUpdateError) {
    console.error("⚠️  Warning: Could not update lesson's quiz_id:", lessonUpdateError);
  } else {
    console.log(`✅ Lesson's quiz_id updated successfully!`);
  }

  console.log(`\n✅ Done! Quiz "${quiz.title}" is now linked to lesson "${lesson.title}" (${lesson.lesson_code})`);
}

// Main execution
const args = process.argv.slice(2);

if (args.length < 2) {
  console.error("❌ Usage: npx tsx scripts/fix-quiz-lesson-link.ts <quiz_identifier> <lesson_code>");
  console.error("   Example: npx tsx scripts/fix-quiz-lesson-link.ts 'quiz_gre_lid_079' 'gre_lid_079'");
  process.exit(1);
}

const [quizIdentifier, lessonCode] = args;

fixQuizLessonLink(quizIdentifier, lessonCode).catch((error) => {
  console.error("❌ Fatal error:", error);
  process.exit(1);
});

