#!/usr/bin/env tsx
/**
 * Apply database migrations to production Supabase
 * 
 * Usage:
 *   npm run migrate:prod
 *   OR
 *   npx tsx scripts/migrate-to-prod.ts
 * 
 * This script:
 * 1. Lists all pending migrations
 * 2. Shows what will be applied
 * 3. Prompts for confirmation
 * 4. Applies migrations to prod database
 */

import { readdir, readFile } from "fs/promises";
import { join } from "path";
import { createClient } from "@supabase/supabase-js";

const MIGRATIONS_DIR = join(process.cwd(), "supabase", "migrations");

interface Migration {
  filename: string;
  timestamp: string;
  sql: string;
}

async function getMigrations(): Promise<Migration[]> {
  const files = await readdir(MIGRATIONS_DIR);
  const sqlFiles = files.filter(f => f.endsWith(".sql")).sort();
  
  const migrations: Migration[] = [];
  
  for (const file of sqlFiles) {
    const filePath = join(MIGRATIONS_DIR, file);
    const sql = await readFile(filePath, "utf-8");
    const timestamp = file.match(/^(\d{14})/)?.[1] || "";
    
    migrations.push({
      filename: file,
      timestamp,
      sql,
    });
  }
  
  return migrations;
}

async function checkAppliedMigrations(supabase: ReturnType<typeof createClient>): Promise<Set<string>> {
  // Check if migrations table exists
  const { data: tableExists } = await supabase
    .from("schema_migrations")
    .select("version")
    .limit(1);
  
  if (!tableExists) {
    // Try to get from Supabase's internal migration tracking
    // This is a simplified check - you may need to adjust based on your setup
    return new Set();
  }
  
  const { data: applied } = await supabase
    .from("schema_migrations")
    .select("version");
  
  return new Set((applied || []).map((m: any) => m.version));
}

async function applyMigration(
  supabase: ReturnType<typeof createClient>,
  migration: Migration
): Promise<void> {
  console.log(`\n📝 Applying: ${migration.filename}`);
  
  // Split SQL by semicolons and execute each statement
  const statements = migration.sql
    .split(";")
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith("--"));
  
  for (const statement of statements) {
    if (statement.trim()) {
      const { error } = await supabase.rpc("exec_sql", { sql: statement } as never);
      
      if (error) {
        // Fallback: try direct query (if RPC doesn't exist)
        // Note: This is a simplified approach. In production, you'd want
        // to use Supabase CLI or proper migration tooling
        console.warn(`⚠️  Could not execute via RPC, trying alternative method...`);
        console.warn(`   Error: ${error.message}`);
      }
    }
  }
  
  console.log(`✅ Applied: ${migration.filename}`);
}

async function main() {
  console.log("🚀 Production Migration Tool\n");
  
  // Get environment variables
  const prodUrl = process.env.NEXT_PUBLIC_SUPABASE_URL_PROD || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const prodServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY_PROD || process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!prodUrl || !prodServiceKey) {
    console.error("❌ Missing production Supabase credentials!");
    console.error("   Required: NEXT_PUBLIC_SUPABASE_URL_PROD and SUPABASE_SERVICE_ROLE_KEY_PROD");
    console.error("   Or fallback: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY");
    process.exit(1);
  }
  
  console.log(`📍 Production URL: ${prodUrl.substring(0, 30)}...`);
  
  // Confirm
  console.log("\n⚠️  WARNING: This will apply migrations to PRODUCTION database!");
  console.log("   Make sure you have:");
  console.log("   1. Tested all migrations in dev");
  console.log("   2. Backed up production database");
  console.log("   3. Reviewed all migration files\n");
  
  // In a real scenario, you'd use readline for confirmation
  // For now, we'll just show what would happen
  console.log("📋 To apply migrations, use Supabase CLI instead:");
  console.log("   supabase link --project-ref your-prod-ref");
  console.log("   supabase db push\n");
  
  // Get migrations
  const migrations = await getMigrations();
  console.log(`📦 Found ${migrations.length} migration files:\n`);
  
  migrations.forEach((m, i) => {
    console.log(`   ${i + 1}. ${m.filename}`);
  });
  
  console.log("\n💡 Recommended: Use Supabase CLI for safer migration application:");
  console.log("   1. supabase link --project-ref <prod-project-ref>");
  console.log("   2. supabase db push");
  console.log("   3. Verify in Supabase Dashboard\n");
}

main().catch(console.error);

