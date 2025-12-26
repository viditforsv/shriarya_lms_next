#!/usr/bin/env tsx
/**
 * Google Sheets Sync Script
 * 
 * Syncs local CSV file with Google Sheets using service account authentication
 * 
 * Usage:
 *   npx tsx scripts/sync-google-sheets.ts
 * 
 * Environment Variables:
 *   GOOGLE_SERVICE_ACCOUNT_KEY - Path to service account JSON key file
 *   GOOGLE_SERVICE_ACCOUNT_JSON - Service account JSON key content (alternative to file path)
 *   GOOGLE_APPLICATION_CREDENTIALS - Path to service account JSON key file (standard Google env var)
 *   GOOGLE_SHEETS_URL - Full Google Sheets URL
 *   GOOGLE_SHEETS_NAME - Specific sheet name to sync to (overrides gid from URL)
 */

import { config } from "dotenv";
import { resolve } from "path";
import { readFileSync, existsSync } from "fs";
import { google } from "googleapis";
import { parse } from "csv-parse/sync";

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), ".env.local") });

interface CSVRow {
  slug: string;
  pdf_url: string;
  solution_url: string;
}

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

  // Method 1: Check for JSON content in environment variable
  if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
    try {
      credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
      console.log("   Using credentials from GOOGLE_SERVICE_ACCOUNT_JSON");
    } catch (error) {
      throw new Error("Invalid JSON in GOOGLE_SERVICE_ACCOUNT_JSON environment variable");
    }
  }
  // Method 2: Check for GOOGLE_APPLICATION_CREDENTIALS (standard Google env var)
  else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    const keyPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
    if (!existsSync(keyPath)) {
      throw new Error(`Service account key file not found: ${keyPath}`);
    }
    credentials = JSON.parse(readFileSync(keyPath, "utf-8"));
    console.log(`   Using credentials from GOOGLE_APPLICATION_CREDENTIALS: ${keyPath}`);
  }
  // Method 3: Check for GOOGLE_SERVICE_ACCOUNT_KEY (custom env var)
  else if (process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
    const keyPath = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
    if (!existsSync(keyPath)) {
      throw new Error(`Service account key file not found: ${keyPath}`);
    }
    credentials = JSON.parse(readFileSync(keyPath, "utf-8"));
    console.log(`   Using credentials from GOOGLE_SERVICE_ACCOUNT_KEY: ${keyPath}`);
  }
  // Method 4: Default file path
  else {
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

function readCSV(filePath: string): CSVRow[] {
  if (!existsSync(filePath)) {
    throw new Error(`CSV file not found: ${filePath}`);
  }

  const csvContent = readFileSync(filePath, "utf-8");
  const records = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  }) as CSVRow[];

  return records;
}

async function getSheetName(sheets: any, spreadsheetId: string, gid: number | null, specifiedName?: string): Promise<string> {
  // If sheet name is explicitly specified, use it
  if (specifiedName) {
    return specifiedName;
  }

  if (!gid) {
    return "Sheet1"; // Default sheet name
  }

  try {
    const response = await sheets.spreadsheets.get({
      spreadsheetId,
    });

    const sheet = response.data.sheets?.find((s: any) => s.properties?.sheetId === gid);
    return sheet?.properties?.title || "Sheet1";
  } catch (error) {
    console.warn("Could not determine sheet name, using 'Sheet1'");
    return "Sheet1";
  }
}

async function syncToGoogleSheets(
  csvData: CSVRow[],
  sheets: any,
  spreadsheetId: string,
  sheetName: string
) {
  // Prepare headers
  const headers = ["slug", "pdf_url", "solution_url"];
  
  // Prepare data rows
  const rows = csvData.map((row) => [row.slug, row.pdf_url, row.solution_url]);

  // Combine headers and data
  const values = [headers, ...rows];

  console.log(`📊 Syncing ${csvData.length} rows to Google Sheets...`);
  console.log(`   Spreadsheet ID: ${spreadsheetId}`);
  console.log(`   Sheet Name: ${sheetName}`);

  try {
    // Clear existing data (optional - comment out if you want to append)
    const range = `${sheetName}!A1:Z1000`;
    await sheets.spreadsheets.values.clear({
      spreadsheetId,
      range,
    });

    // Update with new data
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${sheetName}!A1`,
      valueInputOption: "RAW",
      requestBody: {
        values,
      },
    });

    console.log("✅ Successfully synced CSV to Google Sheets!");
    console.log(`   Updated ${rows.length} data rows (plus header row)`);
  } catch (error: any) {
    console.error("❌ Error syncing to Google Sheets:", error.message);
    if (error.response?.data) {
      console.error("   Details:", JSON.stringify(error.response.data, null, 2));
    }
    throw error;
  }
}

async function main() {
  const csvFilePath = resolve(process.cwd(), "Docs for me/master_map sheets/gre_quant.csv");
  const sheetsUrl = process.env.GOOGLE_SHEETS_URL || 
    "https://docs.google.com/spreadsheets/d/1Xezvw0_BXHTzZxw6lh4_4A1ybktAiZTwBFkgwx6bk8k/edit?gid=1220980196#gid=1220980196";

  console.log("🔄 Starting Google Sheets sync...\n");

  try {
    // Extract spreadsheet ID and sheet ID from URL
    const spreadsheetId = extractSpreadsheetId(sheetsUrl);
    const gid = extractSheetId(sheetsUrl);

    console.log(`📄 Reading CSV from: ${csvFilePath}`);
    const csvData = readCSV(csvFilePath);
    console.log(`   Found ${csvData.length} rows\n`);

    console.log(`🔐 Authenticating with Google Sheets...`);
    const sheets = await authenticateGoogleSheets();
    console.log("   ✅ Authenticated successfully\n");

    // Get the sheet name (use environment variable if specified, otherwise use gid)
    const specifiedSheetName = process.env.GOOGLE_SHEETS_NAME;
    const sheetName = await getSheetName(sheets, spreadsheetId, gid, specifiedSheetName);
    console.log(`📋 Using sheet: ${sheetName}\n`);

    // Sync data
    await syncToGoogleSheets(csvData, sheets, spreadsheetId, sheetName);

    console.log("\n✨ Sync completed successfully!");
  } catch (error: any) {
    console.error("\n❌ Sync failed:", error.message);
    process.exit(1);
  }
}

main();

