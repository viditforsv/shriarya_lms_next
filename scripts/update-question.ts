#!/usr/bin/env tsx
/**
 * Update a specific question in Supabase
 * 
 * Usage:
 *   npx tsx scripts/update-question.ts --id <question_id> [--field value ...]
 */

import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { resolve } from "path";

// Load environment variables
config({ path: resolve(process.cwd(), ".env.local") });

async function main() {
  const args = process.argv.slice(2);
  const idIndex = args.indexOf("--id");
  
  if (idIndex === -1 || !args[idIndex + 1]) {
    console.error("❌ Usage: npx tsx scripts/update-question.ts --id <question_id> [--field value ...]");
    process.exit(1);
  }
  
  const questionId = args[idIndex + 1];
  
  // Determine environment
  const env = process.env.NEXT_PUBLIC_ENVIRONMENT || "dev";
  const isProd = env === "prod";
  
  const supabaseUrl = isProd 
    ? process.env.NEXT_PUBLIC_SUPABASE_URL_PROD
    : process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = isProd
    ? process.env.SUPABASE_SERVICE_ROLE_KEY_PROD
    : process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    console.error(`❌ Missing Supabase credentials for ${env} environment!`);
    process.exit(1);
  }
  
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  // First, fetch the current question
  console.log(`📋 Fetching question ${questionId}...`);
  const { data: question, error: fetchError } = await supabase
    .from("question_bank")
    .select("*")
    .eq("id", questionId)
    .single();
  
  if (fetchError || !question) {
    console.error(`❌ Error fetching question: ${fetchError?.message || "Question not found"}`);
    process.exit(1);
  }
  
  console.log("\n📄 Current question data:");
  console.log(JSON.stringify(question, null, 2));
  
  // Parse field updates from command line
  const updates: Record<string, unknown> = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith("--") && args[i] !== "--id") {
      const field = args[i].substring(2);
      const value = args[i + 1];
      if (value && !value.startsWith("--")) {
        // Try to parse as JSON, otherwise use as string
        try {
          updates[field] = JSON.parse(value);
        } catch {
          updates[field] = value;
        }
      }
    }
  }
  
  if (Object.keys(updates).length === 0) {
    console.log("\n💡 No updates specified. Use --field value to update fields.");
    console.log("   Example: --options '[{\"value\":\"A\",\"label\":\"Option A\"}]'");
    return;
  }
  
  console.log("\n🔄 Updating question with:");
  console.log(JSON.stringify(updates, null, 2));
  
  const { data: updated, error: updateError } = await supabase
    .from("question_bank")
    .update(updates)
    .eq("id", questionId)
    .select()
    .single();
  
  if (updateError) {
    console.error(`❌ Error updating question: ${updateError.message}`);
    process.exit(1);
  }
  
  console.log("\n✅ Question updated successfully!");
  console.log(JSON.stringify(updated, null, 2));
}

main().catch(console.error);

