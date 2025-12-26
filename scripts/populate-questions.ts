#!/usr/bin/env tsx
/**
 * Populate Questions Script
 * 
 * Manually populate questions into Supabase question_bank table
 * 
 * Usage:
 *   # From JSON file
 *   npx tsx scripts/populate-questions.ts --file data/questions.json
 *   
 *   # From inline JSON
 *   npx tsx scripts/populate-questions.ts --json '[{"question_text":"...","question_type":"mcq"}]'
 * 
 * Environment Variables:
 *   NEXT_PUBLIC_ENVIRONMENT - dev or prod (default: dev)
 */

import { config } from "dotenv";
import { resolve } from "path";
import { readFile } from "fs/promises";
import { createClient } from "@supabase/supabase-js";
import { getSupabaseUrl, getSupabaseServiceRoleKey } from "../src/lib/supabase/env";

// Load environment variables
config({ path: resolve(process.cwd(), ".env.local") });

interface Question {
  question_text: string;
  question_type: "mcq" | "subjective" | "true_false" | "fill_blank";
  subject?: string;
  difficulty?: number;
  correct_answer?: string;
  explanation?: string;
  options?: Array<{ value: string; label: string }>;
  tags?: string[];
  topic?: string;
  subtopic?: string;
  grade?: string;
  total_marks?: number;
  [key: string]: unknown;
}

async function main() {
  const args = process.argv.slice(2);
  const fileIndex = args.indexOf("--file");
  const jsonIndex = args.indexOf("--json");
  
  let questions: Question[] = [];

  if (fileIndex !== -1 && args[fileIndex + 1]) {
    // Read from file
    const filePath = resolve(process.cwd(), args[fileIndex + 1]);
    try {
      const content = await readFile(filePath, "utf-8");
      questions = JSON.parse(content);
    } catch (error) {
      console.error(`❌ Error reading file: ${error instanceof Error ? error.message : error}`);
      process.exit(1);
    }
  } else if (jsonIndex !== -1 && args[jsonIndex + 1]) {
    // Parse inline JSON
    try {
      questions = JSON.parse(args[jsonIndex + 1]);
    } catch (error) {
      console.error(`❌ Invalid JSON: ${error instanceof Error ? error.message : error}`);
      process.exit(1);
    }
  } else {
    console.error("❌ Usage: npx tsx scripts/populate-questions.ts --file <json_file> OR --json '<json_string>'");
    process.exit(1);
  }

  if (!Array.isArray(questions) || questions.length === 0) {
    console.error("❌ Invalid data: Expected a non-empty array of questions");
    process.exit(1);
  }

  const env = process.env.NEXT_PUBLIC_ENVIRONMENT || "dev";
  console.log(`\n📝 Populating Questions (${env.toUpperCase()} environment)\n`);
  console.log(`📊 Found ${questions.length} question(s) to add\n`);

  // Get Supabase credentials
  const supabaseUrl = getSupabaseUrl();
  const serviceRoleKey = getSupabaseServiceRoleKey();

  if (!supabaseUrl || !serviceRoleKey) {
    console.error("❌ Missing Supabase credentials!");
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);
  console.log(`📍 Supabase URL: ${supabaseUrl.substring(0, 30)}...\n`);

  // Process questions
  let successCount = 0;
  let errorCount = 0;
  const errors: string[] = [];

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    
    // Validate required fields
    if (!q.question_text || !q.question_type) {
      console.log(`   ⚠️  Question ${i + 1}: Skipping - missing question_text or question_type`);
      errorCount++;
      continue;
    }

    // Prepare question data
    const questionData: Record<string, unknown> = {
      question_text: q.question_text,
      question_type: q.question_type,
      subject: q.subject || "IBDP Mathematics AA HL",
      difficulty: q.difficulty || 5,
      total_marks: q.total_marks || 1,
      grade: q.grade || "12",
      topic: q.topic || null,
      subtopic: q.subtopic || null,
      tags: q.tags || [],
      boards: q.boards || [],
      course_types: q.course_types || [],
      levels: q.levels || [],
      explanation: q.explanation || null,
      correct_answer: q.correct_answer || null,
      options: Array.isArray(q.options) ? q.options : [],
    };

    // Validate MCQ questions
    if (q.question_type === "mcq") {
      if (!Array.isArray(q.options) || q.options.length === 0) {
        console.log(`   ⚠️  Question ${i + 1}: Skipping - MCQ requires options`);
        errorCount++;
        continue;
      }
      if (!q.correct_answer) {
        console.log(`   ⚠️  Question ${i + 1}: Skipping - MCQ requires correct_answer`);
        errorCount++;
        continue;
      }
    }

    // Insert question
    const { data, error } = await supabase
      .from("question_bank")
      .insert([questionData])
      .select()
      .single();

    if (error) {
      console.log(`   ❌ Question ${i + 1}: ${error.message}`);
      errorCount++;
      errors.push(`Question ${i + 1}: ${error.message}`);
    } else {
      successCount++;
      process.stdout.write(`   ✅ Added ${successCount}/${questions.length}...\r`);
    }
  }

  console.log(`\n\n📊 Summary:`);
  console.log(`   ✅ Success: ${successCount} questions`);
  console.log(`   ❌ Errors: ${errorCount} questions`);

  if (errors.length > 0) {
    console.log(`\n⚠️  Errors:`);
    errors.slice(0, 10).forEach(err => console.log(`   - ${err}`));
    if (errors.length > 10) {
      console.log(`   ... and ${errors.length - 10} more`);
    }
  }

  if (errorCount > 0) {
    process.exit(1);
  }

  console.log(`\n✅ All questions added successfully!`);
}

main().catch((error) => {
  console.error("\n❌ Fatal error:", error instanceof Error ? error.message : error);
  process.exit(1);
});

