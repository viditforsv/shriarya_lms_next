#!/usr/bin/env tsx
/**
 * Google Sheets Reader Script
 * 
 * Reads data from Google Sheets using service account authentication
 * 
 * Usage:
 *   npx tsx scripts/read-google-sheets.ts [SHEETS_URL]
 * 
 * Environment Variables:
 *   GOOGLE_SERVICE_ACCOUNT_KEY - Path to service account JSON key file
 *   GOOGLE_SERVICE_ACCOUNT_JSON - Service account JSON key content (alternative to file path)
 *   GOOGLE_APPLICATION_CREDENTIALS - Path to service account JSON key file (standard Google env var)
 *   GOOGLE_SHEETS_URL - Full Google Sheets URL (or pass as argument)
 *   GOOGLE_SHEETS_NAME - Specific sheet name to read from (overrides gid from URL)
 */

import { config } from "dotenv";
import { resolve } from "path";
import { readFileSync, existsSync, writeFileSync } from "fs";
import { google } from "googleapis";
import { stringify } from "csv-stringify/sync";

// Load environment variables from .env.local
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
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  return google.sheets({ version: "v4", auth });
}

async function getSheetName(sheets: any, spreadsheetId: string, gid: number | null, specifiedName?: string): Promise<{ name: string; sheetId: number }> {
  // If sheet name is explicitly specified, use it
  if (specifiedName) {
    // Still need to get the sheetId
    try {
      const response = await sheets.spreadsheets.get({
        spreadsheetId,
      });
      const sheet = response.data.sheets?.find((s: any) => s.properties?.title === specifiedName);
      return {
        name: specifiedName,
        sheetId: sheet?.properties?.sheetId || gid || 0
      };
    } catch (error) {
      return { name: specifiedName, sheetId: gid || 0 };
    }
  }

  if (!gid && gid !== 0) {
    // Try to get first sheet
    try {
      const response = await sheets.spreadsheets.get({
        spreadsheetId,
      });
      const firstSheet = response.data.sheets?.[0];
      return {
        name: firstSheet?.properties?.title || "Sheet1",
        sheetId: firstSheet?.properties?.sheetId || 0
      };
    } catch (error) {
      return { name: "Sheet1", sheetId: 0 };
    }
  }

  try {
    const response = await sheets.spreadsheets.get({
      spreadsheetId,
    });

    const sheet = response.data.sheets?.find((s: any) => s.properties?.sheetId === gid);
    return {
      name: sheet?.properties?.title || "Sheet1",
      sheetId: sheet?.properties?.sheetId || gid || 0
    };
  } catch (error) {
    console.warn("Could not determine sheet name, using 'Sheet1'");
    return { name: "Sheet1", sheetId: gid || 0 };
  }
}

async function readFromGoogleSheets(
  sheets: any,
  spreadsheetId: string,
  sheetName: string,
  sheetId: number
) {
  console.log(`📊 Reading data from Google Sheets...`);
  console.log(`   Spreadsheet ID: ${spreadsheetId}`);
  console.log(`   Sheet Name: ${sheetName}`);
  console.log(`   Sheet ID: ${sheetId}`);

  try {
    // Try different range formats
    let response;
    
    // Method 1: Try with quoted sheet name (for names with spaces/special chars)
    const quotedSheetName = `'${sheetName.replace(/'/g, "''")}'`; // Escape single quotes in sheet name
    try {
      response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: `${quotedSheetName}!A:Z`,
      });
      console.log(`   ✅ Used range: ${quotedSheetName}!A:Z`);
    } catch (error: any) {
      // Method 2: Try without quotes
      try {
        response = await sheets.spreadsheets.values.get({
          spreadsheetId,
          range: `${sheetName}!A:Z`,
        });
        console.log(`   ✅ Used range: ${sheetName}!A:Z`);
      } catch (error2: any) {
        // Method 3: Try with A1 notation without column limit
        try {
          response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: `${quotedSheetName}!A1:Z1000`,
          });
          console.log(`   ✅ Used range: ${quotedSheetName}!A1:Z1000`);
        } catch (error3: any) {
          // Method 4: Try getting all sheets and finding the right one by ID, then use its exact name
          const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId });
          const targetSheet = spreadsheet.data.sheets?.find((s: any) => s.properties?.sheetId === sheetId);
          const exactName = targetSheet?.properties?.title || sheetName;
          const exactQuotedName = `'${exactName.replace(/'/g, "''")}'`;
          
          response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: `${exactQuotedName}!A:Z`,
          });
          console.log(`   ✅ Used exact sheet name: ${exactQuotedName}!A:Z`);
        }
      }
    }

    const values = response.data.values || [];
    
    if (values.length === 0) {
      console.log("⚠️  Sheet is empty");
      return [];
    }

    // First row is headers
    const headers = values[0] || [];
    const rows = values.slice(1);

    console.log(`✅ Successfully read ${rows.length} rows (plus ${headers.length} headers)`);
    
    // Convert to objects
    const data = rows.map((row: any[]) => {
      const obj: any = {};
      headers.forEach((header: string, index: number) => {
        obj[header] = row[index] || "";
      });
      return obj;
    });

    return { headers, data, raw: values };
  } catch (error: any) {
    console.error("❌ Error reading from Google Sheets:", error.message);
    if (error.response?.data) {
      console.error("   Details:", JSON.stringify(error.response.data, null, 2));
    }
    throw error;
  }
}

async function main() {
  const sheetsUrl = process.argv[2] || process.env.GOOGLE_SHEETS_URL || 
    "https://docs.google.com/spreadsheets/d/1lyw4lfV9PqiXppW73nCgqzrTlET5OOB2-E6Q0ADzmTw/edit?gid=0#gid=0";
  const outputFileName = process.argv[3] || process.env.OUTPUT_FILE_NAME || null;

  console.log("📖 Starting Google Sheets read...\n");

  try {
    // Extract spreadsheet ID and sheet ID from URL
    const spreadsheetId = extractSpreadsheetId(sheetsUrl);
    const gid = extractSheetId(sheetsUrl);

    console.log(`🔐 Authenticating with Google Sheets...`);
    const sheets = await authenticateGoogleSheets();
    console.log("   ✅ Authenticated successfully\n");

    // Get the sheet name (use environment variable if specified, otherwise use gid)
    const specifiedSheetName = process.env.GOOGLE_SHEETS_NAME;
    const sheetInfo = await getSheetName(sheets, spreadsheetId, gid, specifiedSheetName);
    console.log(`📋 Using sheet: ${sheetInfo.name} (ID: ${sheetInfo.sheetId})\n`);

    // Read data
    const result = await readFromGoogleSheets(sheets, spreadsheetId, sheetInfo.name, sheetInfo.sheetId);

    console.log("\n📄 Sheet Data:");
    console.log("=".repeat(80));
    
    // Check if result is an array (empty) or an object with data
    if (Array.isArray(result)) {
      console.log("\n⚠️  No data found in sheet");
    } else if (result.data && result.data.length > 0) {
      // Display first few rows as preview
      const previewRows = Math.min(5, result.data.length);
      console.log("\nHeaders:", result.headers.join(" | "));
      console.log("-".repeat(80));
      
      for (let i = 0; i < previewRows; i++) {
        const row = result.data[i];
        const rowValues = result.headers.map((h: string) => row[h] || "").join(" | ");
        console.log(`Row ${i + 1}:`, rowValues);
      }
      
      if (result.data.length > previewRows) {
        console.log(`\n... and ${result.data.length - previewRows} more rows`);
      }
      
      // Save to CSV file if output filename is provided
      if (outputFileName) {
        const csvData = stringify(result.raw, {
          header: false, // result.raw already includes headers
        });
        const csvPath = resolve(process.cwd(), "Docs for me/master_map sheets", `${outputFileName}.csv`);
        writeFileSync(csvPath, csvData, "utf-8");
        console.log(`\n💾 CSV data saved to: ${csvPath}`);
      }
      
      // Also save to JSON file for reference
      const jsonPath = resolve(process.cwd(), "scripts/google-sheets-output.json");
      writeFileSync(jsonPath, JSON.stringify(result, null, 2), "utf-8");
      console.log(`💾 JSON data saved to: ${jsonPath}`);
    } else {
      console.log("Sheet is empty");
    }

    console.log("\n✨ Read completed successfully!");
    return result;
  } catch (error: any) {
    console.error("\n❌ Read failed:", error.message);
    if (error.message.includes("permission")) {
      console.error("\n💡 Tip: Make sure the Google Sheet is shared with your service account email.");
    }
    process.exit(1);
  }
}

main();

