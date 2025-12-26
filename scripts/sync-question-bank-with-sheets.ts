#!/usr/bin/env tsx
/**
 * Sync Question Bank with Google Sheets
 * 
 * Bidirectional sync: Import from Google Sheets to Supabase OR Export from Supabase to Google Sheets
 * 
 * Usage:
 *   # Import from Google Sheets to Supabase
 *   npx tsx scripts/sync-question-bank-with-sheets.ts --import --sheets-url <URL>
 *   
 *   # Export from Supabase to Google Sheets
 *   npx tsx scripts/sync-question-bank-with-sheets.ts --export --sheets-url <URL>
 * 
 * Environment Variables:
 *   NEXT_PUBLIC_ENVIRONMENT - dev or prod (default: dev)
 *   GOOGLE_SERVICE_ACCOUNT_KEY - Path to service account JSON key file
 *   GOOGLE_SERVICE_ACCOUNT_JSON - Service account JSON key content
 *   GOOGLE_SHEETS_URL - Full Google Sheets URL
 *   GOOGLE_SHEETS_NAME - Specific sheet name
 */

import { config } from "dotenv";
import { resolve } from "path";
import { readFileSync, existsSync } from "fs";
import { google } from "googleapis";
import { createClient } from "@supabase/supabase-js";
import { getSupabaseUrl, getSupabaseServiceRoleKey } from "../src/lib/supabase/env";

// Load environment variables
config({ path: resolve(process.cwd(), ".env.local") });

// Extract spreadsheet ID from URL
function extractSpreadsheetId(url: string): string {
  const match = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (!match) {
    throw new Error("Invalid Google Sheets URL. Expected format: https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/...");
  }
  return match[1];
}

// Extract sheet ID (gid) from URL
function extractSheetId(url: string): number | null {
  const match = url.match(/[#&]gid=(\d+)/);
  return match ? parseInt(match[1], 10) : null;
}

async function authenticateGoogleSheets() {
  let credentials: any;

  if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
    try {
      credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
      console.log("   Using credentials from GOOGLE_SERVICE_ACCOUNT_JSON");
    } catch (error) {
      throw new Error("Invalid JSON in GOOGLE_SERVICE_ACCOUNT_JSON environment variable");
    }
  } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    const keyPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
    if (!existsSync(keyPath)) {
      throw new Error(`Service account key file not found: ${keyPath}`);
    }
    credentials = JSON.parse(readFileSync(keyPath, "utf-8"));
    console.log(`   Using credentials from GOOGLE_APPLICATION_CREDENTIALS: ${keyPath}`);
  } else if (process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
    const keyPath = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
    if (!existsSync(keyPath)) {
      throw new Error(`Service account key file not found: ${keyPath}`);
    }
    credentials = JSON.parse(readFileSync(keyPath, "utf-8"));
    console.log(`   Using credentials from GOOGLE_SERVICE_ACCOUNT_KEY: ${keyPath}`);
  } else {
    const defaultPath = resolve(process.cwd(), "google-service-account-key.json");
    if (existsSync(defaultPath)) {
      credentials = JSON.parse(readFileSync(defaultPath, "utf-8"));
      console.log(`   Using credentials from default path: ${defaultPath}`);
    } else {
      throw new Error(
        "No service account credentials found. Set one of:\n" +
        "  - GOOGLE_SERVICE_ACCOUNT_JSON (JSON content)\n" +
        "  - GOOGLE_APPLICATION_CREDENTIALS (file path)\n" +
        "  - GOOGLE_SERVICE_ACCOUNT_KEY (file path)\n" +
        "  - Or place key file at: google-service-account-key.json"
      );
    }
  }

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return google.sheets({ version: "v4", auth });
}

async function getSheetName(sheets: any, spreadsheetId: string, gid: number | null, specifiedName?: string): Promise<{ name: string; sheetId: number }> {
  const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId });
  
  // List available sheets for debugging
  const availableSheets = spreadsheet.data.sheets?.map((s: any) => ({
    name: s.properties?.title,
    sheetId: s.properties?.sheetId,
    gid: s.properties?.sheetId,
  })) || [];
  console.log(`   Available sheets: ${availableSheets.map((s: any) => s.name).join(", ")}`);
  
  if (specifiedName) {
    const sheet = spreadsheet.data.sheets?.find((s: any) => s.properties?.title === specifiedName);
    if (sheet) {
      return { name: specifiedName, sheetId: sheet.properties?.sheetId || 0 };
    }
    // Sheet doesn't exist, create it
    console.log(`   Creating new sheet: ${specifiedName}`);
    const addSheetResponse = await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [{
          addSheet: {
            properties: {
              title: specifiedName,
            },
          },
        }],
      },
    });
    const newSheetId = addSheetResponse.data.replies[0].addSheet?.properties?.sheetId || 0;
    return { name: specifiedName, sheetId: newSheetId };
  }

  if (gid !== null && gid !== undefined) {
    const sheet = spreadsheet.data.sheets?.find((s: any) => s.properties?.sheetId === gid);
    if (sheet) {
      return { name: sheet.properties?.title || "Sheet1", sheetId: gid };
    }
  }

  // Default to first sheet if no gid specified
  const firstSheet = spreadsheet.data.sheets?.[0];
  if (firstSheet) {
    return { name: firstSheet.properties?.title || "Sheet1", sheetId: firstSheet.properties?.sheetId || 0 };
  }

  return { name: "Sheet1", sheetId: 0 };
}

async function importFromSheets(supabase: ReturnType<typeof createClient<any, "public">>, sheets: any, spreadsheetId: string, sheetName: string) {
  console.log(`\n📥 Importing questions from Google Sheets to Supabase...`);
  
  try {
    const quotedSheetName = `'${sheetName.replace(/'/g, "''")}'`;
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${quotedSheetName}!A:Z`,
    });

    const values = response.data.values || [];
    if (values.length < 2) {
      console.log("⚠️  No data found in sheet (need at least header + 1 row)");
      return;
    }

    const headers = values[0].map((h: string) => h.toLowerCase().trim());
    const rows = values.slice(1);

    console.log(`📊 Found ${rows.length} rows to import`);
    console.log(`   Headers: ${headers.join(", ")}\n`);

    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const questionData: Record<string, unknown> = {};
      let questionId: string | null = null;

      // Map headers to question fields
      headers.forEach((header: string, index: number) => {
        const rawValue = row[index];
        if (rawValue === undefined || rawValue === null) return;
        const value = rawValue.toString().trim();
        if (!value) return;

        switch (header) {
          case "id":
            questionId = value;
            break;
          case "question_text":
          case "question":
            questionData.question_text = value;
            break;
          case "question_type":
          case "type":
            questionData.question_type = value.toLowerCase();
            break;
          case "subject":
            questionData.subject = value;
            break;
          case "difficulty":
            questionData.difficulty = parseInt(value) || 5;
            break;
          case "correct_answer":
          case "answer":
            questionData.correct_answer = value;
            break;
          case "explanation":
            questionData.explanation = value;
            break;
          case "options":
            try {
              // Clean up the JSON string - remove trailing commas and extra whitespace
              let cleanedValue = value.trim();
              // Remove trailing commas before closing brackets/braces
              cleanedValue = cleanedValue.replace(/,(\s*[}\]])/g, '$1');
              // Try parsing as JSON
              const parsed = JSON.parse(cleanedValue);
              if (Array.isArray(parsed)) {
                questionData.options = parsed;
                console.log(`   ✅ Row ${i + 2}: Parsed ${parsed.length} options successfully`);
              } else {
                throw new Error("Options must be an array");
              }
            } catch (parseError: any) {
              // If JSON parsing fails, try splitting by comma or semicolon
              console.log(`   ⚠️  Row ${i + 2}: Options JSON parse failed: ${parseError.message}`);
              console.log(`   ⚠️  Raw value: ${value.substring(0, 100)}...`);
              const options = value.split(/[,;]/).map((opt: string) => ({
                value: opt.trim(),
                label: opt.trim(),
              })).filter((opt: { value: string; label: string }) => opt.value);
              questionData.options = options;
              console.log(`   ✅ Row ${i + 2}: Using comma-separated format, created ${options.length} options`);
            }
            break;
          case "tags":
            questionData.tags = value.split(/[,;]/).map((t: string) => t.trim()).filter(Boolean);
            break;
          case "topic":
            questionData.topic = value;
            break;
          case "subtopic":
            questionData.subtopic = value;
            break;
          case "grade":
            questionData.grade = value;
            break;
          case "total_marks":
          case "marks":
            questionData.total_marks = parseInt(value) || 1;
            break;
          case "is_pyq":
            questionData.is_pyq = value.toLowerCase() === "true" || value === "1";
            break;
          case "question_number":
            questionData.question_number = value;
            break;
          case "pyq_year":
            questionData.pyq_year = parseInt(value) || null;
            break;
          case "month":
            questionData.month = value;
            break;
          case "paper_number":
            questionData.paper_number = parseInt(value) || null;
            break;
          case "time zone":
          case "time_zone":
            questionData["Time Zone"] = value;
            break;
          case "section":
            questionData.section = value;
            break;
          case "calculator":
            questionData.calculator = value;
            break;
          case "image_url":
            questionData.image_url = value;
            break;
          case "solution_image":
            questionData.solution_image = value;
            break;
          case "source":
            questionData.source = value;
            break;
          case "paper_type":
            questionData.paper_type = value;
            break;
          case "year":
            questionData.year = parseInt(value) || null;
            break;
          case "human_readable_id":
            questionData.human_readable_id = value;
            break;
          case "question_display_number":
            questionData.question_display_number = parseInt(value) || null;
            break;
          case "boards":
            try {
              questionData.boards = JSON.parse(value);
            } catch {
              questionData.boards = value.split(/[,;]/).map((b: string) => b.trim()).filter(Boolean);
            }
            break;
          case "course_types":
            try {
              questionData.course_types = JSON.parse(value);
            } catch {
              questionData.course_types = value.split(/[,;]/).map((c: string) => c.trim()).filter(Boolean);
            }
            break;
          case "levels":
            try {
              questionData.levels = JSON.parse(value);
            } catch {
              questionData.levels = value.split(/[,;]/).map((l: string) => l.trim()).filter(Boolean);
            }
            break;
          case "relevance":
            try {
              questionData.relevance = JSON.parse(value);
            } catch {
              questionData.relevance = value.split(/[,;]/).map((r: string) => r.trim()).filter(Boolean);
            }
            break;
          case "created_by":
            questionData.created_by = value || null;
            break;
          case "is_active":
            questionData.is_active = value.toLowerCase() === "true" || value === "1" || value === "";
            break;
        }
      });

      // Validate required fields
      if (!questionData.question_text || !questionData.question_type) {
        console.log(`   ⚠️  Row ${i + 2}: Skipping - missing question_text or question_type`);
        errorCount++;
        continue;
      }

      // Set defaults
      questionData.subject = questionData.subject || "IBDP Mathematics AA HL";
      questionData.difficulty = questionData.difficulty || 5;
      questionData.grade = questionData.grade || "12";
      questionData.total_marks = questionData.total_marks || 1;
      questionData.options = questionData.options || [];
      questionData.tags = questionData.tags || [];
      questionData.boards = questionData.boards || [];
      questionData.course_types = questionData.course_types || [];
      questionData.levels = questionData.levels || [];
      questionData.relevance = questionData.relevance || [];
      questionData.source = questionData.source || "IBDP";
      questionData.is_pyq = questionData.is_pyq !== undefined ? questionData.is_pyq : true;
      questionData.is_active = questionData.is_active !== undefined ? questionData.is_active : true;

      // Log options before saving
      if (questionData.options) {
        console.log(`   📋 Row ${i + 2}: Options to save:`, JSON.stringify(questionData.options).substring(0, 200));
      }

      // Use upsert: update if ID exists, insert if not
      if (questionId) {
        questionData.id = questionId;
        const result = await supabase
          .from("question_bank")
          .upsert([questionData] as never, { onConflict: "id" })
          .select();
        const { error, data } = result as { error: { message: string } | null; data: Array<{ options?: unknown }> | null };
        
        if (error) {
          console.log(`   ❌ Row ${i + 2}: ${error.message}`);
          errorCount++;
        } else {
          successCount++;
          if (data && data[0]?.options) {
            console.log(`   ✅ Row ${i + 2}: Saved with ${Array.isArray(data[0].options) ? data[0].options.length : 0} options`);
          }
          if (successCount % 10 === 0) {
            process.stdout.write(`   ✅ Synced ${successCount}/${rows.length}...\r`);
          }
        }
      } else {
        // No ID provided, insert as new
        const result = await supabase
          .from("question_bank")
          .insert([questionData] as never);
        const { error } = result as { error: { message: string } | null };

        if (error) {
          console.log(`   ❌ Row ${i + 2}: ${error.message}`);
          errorCount++;
        } else {
          successCount++;
          if (successCount % 10 === 0) {
            process.stdout.write(`   ✅ Imported ${successCount}/${rows.length}...\r`);
          }
        }
      }
    }

    console.log(`\n📊 Sync Summary:`);
    console.log(`   ✅ Success: ${successCount} questions (updated or inserted)`);
    console.log(`   ❌ Errors: ${errorCount} questions`);
  } catch (error: any) {
    console.error(`❌ Error importing: ${error.message}`);
    throw error;
  }
}

async function exportToSheets(supabase: ReturnType<typeof createClient<any, "public">>, sheets: any, spreadsheetId: string, sheetName: string) {
  console.log(`\n📤 Exporting questions from Supabase to Google Sheets...`);
  
  try {
    // Fetch all questions with pagination (Supabase has 1000 row limit per query)
    let allQuestions: any[] = [];
    let page = 0;
    const pageSize = 1000;
    let hasMore = true;

    console.log(`📊 Fetching questions in batches of ${pageSize}...`);

    while (hasMore) {
      const from = page * pageSize;
      const to = from + pageSize - 1;

      const { data: questions, error, count } = await supabase
        .from("question_bank")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .range(from, to);

      if (error) {
        throw new Error(`Failed to fetch questions: ${error.message}`);
      }

      if (questions && questions.length > 0) {
        allQuestions = allQuestions.concat(questions);
        console.log(`   Fetched ${allQuestions.length}${count ? `/${count}` : ""} questions...`);
      }

      hasMore = questions && questions.length === pageSize;
      page++;
    }

    if (allQuestions.length === 0) {
      console.log("⚠️  No questions found in database");
      return;
    }

    console.log(`\n📊 Total: ${allQuestions.length} questions to export\n`);

    // Prepare headers - include ALL columns from question_bank table
    const headers = [
      "id",
      "question_text",
      "question_type",
      "subject",
      "difficulty",
      "correct_answer",
      "explanation",
      "options",
      "tags",
      "topic",
      "subtopic",
      "grade",
      "total_marks",
      "is_pyq",
      "question_number",
      "pyq_year",
      "month",
      "paper_number",
      "Time Zone",
      "section",
      "calculator",
      "image_url",
      "solution_image",
      "source",
      "paper_type",
      "year",
      "human_readable_id",
      "question_display_number",
      "boards",
      "course_types",
      "levels",
      "relevance",
      "created_by",
      "is_active",
      "created_at",
      "updated_at",
    ];

    // Prepare rows - map all columns
    const rows = allQuestions.map((q: any) => [
      q.id || "",
      q.question_text || "",
      q.question_type || "",
      q.subject || "",
      q.difficulty || "",
      q.correct_answer || "",
      q.explanation || "",
      Array.isArray(q.options) ? JSON.stringify(q.options) : (q.options ? JSON.stringify(q.options) : ""),
      Array.isArray(q.tags) ? q.tags.join(", ") : "",
      q.topic || "",
      q.subtopic || "",
      q.grade || "",
      q.total_marks || "",
      q.is_pyq !== undefined ? q.is_pyq : "",
      q.question_number || "",
      q.pyq_year || "",
      q.month || "",
      q.paper_number || "",
      q["Time Zone"] || "",
      q.section || "",
      q.calculator || "",
      q.image_url || "",
      q.solution_image || "",
      q.source || "",
      q.paper_type || "",
      q.year || "",
      q.human_readable_id || "",
      q.question_display_number || "",
      Array.isArray(q.boards) ? JSON.stringify(q.boards) : (q.boards ? JSON.stringify(q.boards) : ""),
      Array.isArray(q.course_types) ? JSON.stringify(q.course_types) : (q.course_types ? JSON.stringify(q.course_types) : ""),
      Array.isArray(q.levels) ? JSON.stringify(q.levels) : (q.levels ? JSON.stringify(q.levels) : ""),
      Array.isArray(q.relevance) ? JSON.stringify(q.relevance) : (q.relevance ? JSON.stringify(q.relevance) : ""),
      q.created_by || "",
      q.is_active !== undefined ? q.is_active : "",
      q.created_at || "",
      q.updated_at || "",
    ]);

    const values = [headers, ...rows];

    // Clear and update sheet
    const quotedSheetName = `'${sheetName.replace(/'/g, "''")}'`;
    await sheets.spreadsheets.values.clear({
      spreadsheetId,
      range: `${quotedSheetName}!A1:Z10000`,
    });

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${quotedSheetName}!A1`,
      valueInputOption: "RAW",
      requestBody: { values },
    });

    console.log(`✅ Exported ${allQuestions.length} questions to Google Sheets!`);
  } catch (error: any) {
    console.error(`❌ Error exporting: ${error.message}`);
    throw error;
  }
}

async function main() {
  const args = process.argv.slice(2);
  const isImport = args.includes("--import");
  const isExport = args.includes("--export");
  const sheetsUrlIndex = args.indexOf("--sheets-url");
  
  if (!isImport && !isExport) {
    console.error("❌ Usage: npx tsx scripts/sync-question-bank-with-sheets.ts --import|--export --sheets-url <URL>");
    console.error("   --import: Import from Google Sheets to Supabase");
    console.error("   --export: Export from Supabase to Google Sheets");
    process.exit(1);
  }

  if (sheetsUrlIndex === -1 || !args[sheetsUrlIndex + 1]) {
    const envUrl = process.env.GOOGLE_SHEETS_URL;
    if (!envUrl) {
      console.error("❌ Missing Google Sheets URL. Use --sheets-url <URL> or set GOOGLE_SHEETS_URL");
      process.exit(1);
    }
  }

  const sheetsUrl = sheetsUrlIndex !== -1 ? args[sheetsUrlIndex + 1] : process.env.GOOGLE_SHEETS_URL;
  if (!sheetsUrl) {
    console.error("❌ Missing Google Sheets URL");
    process.exit(1);
  }

  const env = process.env.NEXT_PUBLIC_ENVIRONMENT || "dev";
  console.log(`\n🔄 Question Bank Sync (${env.toUpperCase()} environment)\n`);

  // Get Supabase credentials
  const supabaseUrl = getSupabaseUrl();
  const serviceRoleKey = getSupabaseServiceRoleKey();

  if (!supabaseUrl || !serviceRoleKey) {
    console.error("❌ Missing Supabase credentials!");
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);
  console.log(`📍 Supabase URL: ${supabaseUrl.substring(0, 30)}...`);

  // Authenticate with Google Sheets
  console.log(`\n🔐 Authenticating with Google Sheets...`);
  const sheets = await authenticateGoogleSheets();
  console.log("   ✅ Authenticated successfully");

  const spreadsheetId = extractSpreadsheetId(sheetsUrl);
  const gid = extractSheetId(sheetsUrl);
  const specifiedSheetName = process.env.GOOGLE_SHEETS_NAME;
  const sheetInfo = await getSheetName(sheets, spreadsheetId, gid, specifiedSheetName);
  
  console.log(`📋 Using sheet: ${sheetInfo.name}\n`);

  if (isImport) {
    await importFromSheets(supabase, sheets, spreadsheetId, sheetInfo.name);
  } else {
    await exportToSheets(supabase, sheets, spreadsheetId, sheetInfo.name);
  }

  console.log("\n✨ Sync completed successfully!");
}

main().catch((error) => {
  console.error("\n❌ Fatal error:", error instanceof Error ? error.message : error);
  process.exit(1);
});

