#!/usr/bin/env tsx
/**
 * Import data to production database
 * 
 * Usage:
 *   npm run import:prod -- --file data/question_bank.json --table question_bank
 *   npm run import:prod -- --file data/question_bank.json --table question_bank --mode upsert
 */

import { createClient } from "@supabase/supabase-js";
import { readFile } from "fs/promises";
import { resolve } from "path";
import { config } from "dotenv";

// Load environment variables
config({ path: resolve(process.cwd(), ".env.local") });

async function main() {
  const args = process.argv.slice(2);
  const fileIndex = args.indexOf("--file");
  const tableIndex = args.indexOf("--table");
  const modeIndex = args.indexOf("--mode");
  
  if (fileIndex === -1 || !args[fileIndex + 1]) {
    console.error("❌ Usage: npm run import:prod -- --file <json_file> --table <table_name> [--mode insert|upsert|update]");
    console.error("   --mode: insert (default, fails on duplicates), upsert (insert or update), update (only update existing)");
    process.exit(1);
  }
  
  if (tableIndex === -1 || !args[tableIndex + 1]) {
    console.error("❌ Usage: npm run import:prod -- --file <json_file> --table <table_name>");
    process.exit(1);
  }
  
  const filePath = args[fileIndex + 1];
  const tableName = args[tableIndex + 1];
  const mode = (modeIndex !== -1 && args[modeIndex + 1]) ? args[modeIndex + 1] : "insert";
  
  if (!["insert", "upsert", "update"].includes(mode)) {
    console.error("❌ Invalid mode. Use: insert, upsert, or update");
    process.exit(1);
  }
  
  // Get prod credentials
  const prodUrl = process.env.NEXT_PUBLIC_SUPABASE_URL_PROD;
  const prodServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY_PROD;
  
  if (!prodUrl || !prodServiceKey) {
    console.error("❌ Missing production Supabase credentials!");
    console.error("   Required: NEXT_PUBLIC_SUPABASE_URL_PROD and SUPABASE_SERVICE_ROLE_KEY_PROD");
    process.exit(1);
  }
  
  console.log(`\n📥 Importing data to PRODUCTION database...`);
  console.log(`   Table: ${tableName}`);
  console.log(`   File: ${filePath}`);
  console.log(`   Mode: ${mode}`);
  console.log(`   URL: ${prodUrl.substring(0, 30)}...\n`);
  
  // Confirm before proceeding
  console.log("⚠️  WARNING: This will modify the PRODUCTION database!");
  console.log("   Press Ctrl+C to cancel, or wait 5 seconds to continue...\n");
  await new Promise(resolve => setTimeout(resolve, 5000));
  
  // Read JSON file
  let data: any[];
  try {
    const fileContent = await readFile(resolve(process.cwd(), filePath), "utf-8");
    data = JSON.parse(fileContent);
  } catch (error) {
    console.error(`❌ Error reading file: ${error instanceof Error ? error.message : error}`);
    process.exit(1);
  }
  
  if (!Array.isArray(data) || data.length === 0) {
    console.error("❌ Invalid data: Expected a non-empty array");
    process.exit(1);
  }
  
  console.log(`📊 Found ${data.length} records to import\n`);
  
  const supabase = createClient(prodUrl, prodServiceKey);
  
  // Process in batches
  const batchSize = 100;
  let successCount = 0;
  let errorCount = 0;
  const errors: string[] = [];
  
  for (let i = 0; i < data.length; i += batchSize) {
    const batch = data.slice(i, i + batchSize);
    const batchNum = Math.floor(i / batchSize) + 1;
    const totalBatches = Math.ceil(data.length / batchSize);
    
    console.log(`📦 Processing batch ${batchNum}/${totalBatches} (${batch.length} records)...`);
    
    try {
      let result: { error: { message: string } | null; data: unknown };
      
      if (mode === "upsert") {
        // Upsert: insert or update based on primary key
        const upsertResult = await supabase
          .from(tableName)
          .upsert(batch, { onConflict: "id", ignoreDuplicates: false });
        result = { error: upsertResult.error, data: upsertResult.data };
      } else if (mode === "update") {
        // Update: only update existing records
        const updates = await Promise.all(
          batch.map(record => 
            supabase
              .from(tableName)
              .update(record)
              .eq("id", record.id)
          )
        );
        result = { error: null, data: updates.map(r => r.data).flat() };
        // Check for errors
        const hasErrors = updates.some(r => r.error);
        if (hasErrors) {
          result.error = { message: "Some updates failed" };
        }
      } else {
        // Insert: fails on duplicates
        const insertResult = await supabase
          .from(tableName)
          .insert(batch);
        result = { error: insertResult.error, data: insertResult.data };
      }
      
      if (result.error) {
        console.error(`   ❌ Batch ${batchNum} failed: ${result.error.message}`);
        errorCount += batch.length;
        errors.push(`Batch ${batchNum}: ${result.error.message}`);
      } else {
        const dataLength = Array.isArray(result.data) ? result.data.length : batch.length;
        successCount += dataLength;
        console.log(`   ✅ Batch ${batchNum} completed: ${dataLength} records`);
      }
    } catch (error) {
      console.error(`   ❌ Batch ${batchNum} error: ${error instanceof Error ? error.message : error}`);
      errorCount += batch.length;
      errors.push(`Batch ${batchNum}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  
  console.log(`\n📊 Import Summary:`);
  console.log(`   ✅ Success: ${successCount} records`);
  console.log(`   ❌ Errors: ${errorCount} records`);
  console.log(`   📁 Total: ${data.length} records`);
  
  if (errors.length > 0) {
    console.log(`\n⚠️  Errors encountered:`);
    errors.slice(0, 10).forEach(err => console.log(`   - ${err}`));
    if (errors.length > 10) {
      console.log(`   ... and ${errors.length - 10} more errors`);
    }
  }
  
  if (errorCount > 0) {
    process.exit(1);
  }
  
  console.log(`\n✅ Import completed successfully!`);
}

main().catch((error) => {
  console.error("\n❌ Fatal error:", error instanceof Error ? error.message : error);
  process.exit(1);
});

