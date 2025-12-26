#!/usr/bin/env tsx
/**
 * Check for invalid subjects in question_bank table
 * Run this before applying the subject constraint migration
 */

import { config } from "dotenv";
import { resolve } from "path";
import { createClient } from "@supabase/supabase-js";
import { getSupabaseUrl, getSupabaseServiceRoleKey } from "../src/lib/supabase/env";
import { SUBJECTS } from "../src/lib/constants/subjects";

config({ path: resolve(process.cwd(), ".env.local") });

async function checkInvalidSubjects() {
  const supabaseUrl = getSupabaseUrl();
  const serviceRoleKey = getSupabaseServiceRoleKey();

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "Missing Supabase credentials. Set NEXT_PUBLIC_SUPABASE_URL_DEV/PROD and SUPABASE_SERVICE_ROLE_KEY_DEV/PROD"
    );
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);
  const env = process.env.NEXT_PUBLIC_ENVIRONMENT || "dev";
  
  console.log(`\n🔍 Checking for invalid subjects (${env.toUpperCase()} environment)\n`);

  // Fetch all unique subjects
  const { data: questions, error } = await supabase
    .from("question_bank")
    .select("subject, id");

  if (error) {
    throw new Error(`Failed to fetch questions: ${error.message}`);
  }

  // Get unique subjects
  const uniqueSubjects = new Set<string>();
  const subjectCounts = new Map<string, number>();
  
  questions?.forEach((q) => {
    if (q.subject) {
      uniqueSubjects.add(q.subject);
      subjectCounts.set(q.subject, (subjectCounts.get(q.subject) || 0) + 1);
    }
  });

  // Check which subjects are valid
  const validSubjects = new Set<string>(SUBJECTS);
  const invalidSubjects: Array<{ subject: string; count: number }> = [];
  const validSubjectsFound: Array<{ subject: string; count: number }> = [];

  uniqueSubjects.forEach((subject) => {
    const count = subjectCounts.get(subject) || 0;
    if (validSubjects.has(subject as string)) {
      validSubjectsFound.push({ subject, count });
    } else {
      invalidSubjects.push({ subject, count });
    }
  });

  console.log(`📊 Total unique subjects found: ${uniqueSubjects.size}\n`);

  if (invalidSubjects.length > 0) {
    console.log(`❌ Invalid subjects found (${invalidSubjects.length}):\n`);
    invalidSubjects
      .sort((a, b) => b.count - a.count)
      .forEach(({ subject, count }) => {
        console.log(`   "${subject}" - ${count} question(s)`);
      });
    
    console.log(`\n⚠️  Total questions with invalid subjects: ${invalidSubjects.reduce((sum, item) => sum + item.count, 0)}`);
    console.log(`\n💡 Action required:`);
    console.log(`   1. Use the bulk-edit script to update invalid subjects`);
    console.log(`   2. Example: npx tsx scripts/bulk-edit-question-bank.ts \\`);
    console.log(`      --filter-subject "Old Subject Name" \\`);
    console.log(`      --update-subject "Valid Subject Name"`);
    console.log(`\n✅ Valid subjects you can use:`);
    SUBJECTS.forEach((subject) => {
      console.log(`   - ${subject}`);
    });
    process.exit(1);
  } else {
    console.log(`✅ All subjects are valid!\n`);
    console.log(`📋 Valid subjects found in database (${validSubjectsFound.length}):\n`);
    validSubjectsFound
      .sort((a, b) => b.count - a.count)
      .forEach(({ subject, count }) => {
        console.log(`   ${subject} - ${count} question(s)`);
      });
    console.log(`\n✨ Safe to apply the subject constraint migration!`);
    process.exit(0);
  }
}

checkInvalidSubjects().catch((error) => {
  console.error("\n❌ Error:", error instanceof Error ? error.message : error);
  process.exit(1);
});

