#!/usr/bin/env tsx
/**
 * Export data from dev database
 * 
 * Usage:
 *   npm run export:dev -- --table courses
 *   npm run export:dev -- --table courses --output data/courses.json
 */

import { createClient } from "@supabase/supabase-js";
import { writeFile } from "fs/promises";
import { join } from "path";

async function main() {
  const args = process.argv.slice(2);
  const tableIndex = args.indexOf("--table");
  const outputIndex = args.indexOf("--output");
  
  if (tableIndex === -1 || !args[tableIndex + 1]) {
    console.error("❌ Usage: npm run export:dev -- --table <table_name> [--output <file>]");
    process.exit(1);
  }
  
  const tableName = args[tableIndex + 1];
  const outputFile = outputIndex !== -1 && args[outputIndex + 1] 
    ? args[outputIndex + 1]
    : join(process.cwd(), "data", `${tableName}.json`);
  
  // Get dev credentials
  const devUrl = process.env.NEXT_PUBLIC_SUPABASE_URL_DEV || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const devServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY_DEV || process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!devUrl || !devServiceKey) {
    console.error("❌ Missing dev Supabase credentials!");
    console.error("   Set NEXT_PUBLIC_ENVIRONMENT=dev and ensure _DEV credentials are set");
    process.exit(1);
  }
  
  console.log(`📤 Exporting ${tableName} from dev database...`);
  console.log(`   URL: ${devUrl.substring(0, 30)}...`);
  
  const supabase = createClient(devUrl, devServiceKey);
  
  const { data, error } = await supabase
    .from(tableName)
    .select("*");
  
  if (error) {
    console.error(`❌ Error exporting: ${error.message}`);
    process.exit(1);
  }
  
  if (!data || data.length === 0) {
    console.warn("⚠️  No data found in table");
    process.exit(0);
  }
  
  // Ensure output directory exists
  const outputDir = join(outputFile, "..");
  await import("fs/promises").then(fs => 
    fs.mkdir(outputDir, { recursive: true }).catch(() => {})
  );
  
  await writeFile(outputFile, JSON.stringify(data, null, 2));
  
  console.log(`✅ Exported ${data.length} rows to: ${outputFile}`);
}

main().catch(console.error);

