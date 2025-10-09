#!/usr/bin/env node

/**
 * Script to populate CBSE Class 9 Mathematics lessons using direct SQL
 * This bypasses the API authentication requirement
 */

const fs = require("fs");
const path = require("path");

// Read the SQL file
const sqlFile = path.join(__dirname, "populate-cbse-class9-lessons.sql");
const sqlContent = fs.readFileSync(sqlFile, "utf8");

// Split the SQL into individual statements
const statements = sqlContent
  .split(";")
  .map((stmt) => stmt.trim())
  .filter((stmt) => stmt.length > 0 && !stmt.startsWith("--"));

console.log("🎯 CBSE Class 9 Mathematics Lesson Population Script");
console.log("====================================================");
console.log(`📝 Found ${statements.length} SQL statements to execute`);

// Function to execute SQL via API (using a different endpoint if available)
async function executeSQL() {
  console.log("\n🚀 Executing SQL statements...");

  // For now, let's try to use the database API if available
  // This is a fallback approach since we can't directly execute SQL

  console.log("⚠️  Direct SQL execution not available via API");
  console.log(
    "📋 Please run the SQL script manually in your Supabase dashboard:"
  );
  console.log(`   File: ${sqlFile}`);
  console.log("\n📖 Instructions:");
  console.log("1. Open your Supabase dashboard");
  console.log("2. Go to SQL Editor");
  console.log(
    "3. Copy and paste the contents of populate-cbse-class9-lessons.sql"
  );
  console.log("4. Execute the script");
  console.log("\n🔗 After running the SQL, verify with:");
  console.log(
    '   curl "http://localhost:3000/api/lessons?course_slug=cbse-mathematics-class-9"'
  );
}

// Alternative: Create lessons one by one using a different approach
async function createLessonsAlternative() {
  console.log("\n🔄 Alternative: Creating lessons via database connection...");

  // This would require setting up a direct database connection
  // For now, let's provide the SQL script for manual execution

  console.log("📄 SQL Script created at:", sqlFile);
  console.log("\n📋 SQL Preview (first few statements):");

  statements.slice(0, 3).forEach((stmt, index) => {
    console.log(`\n${index + 1}. ${stmt.substring(0, 100)}...`);
  });

  console.log(`\n... and ${statements.length - 3} more statements`);
}

// Main execution
async function main() {
  try {
    await executeSQL();
    await createLessonsAlternative();

    console.log("\n✅ Script completed!");
    console.log("📚 Next steps:");
    console.log("1. Run the SQL script in Supabase dashboard");
    console.log("2. Verify lessons were created");
    console.log(
      "3. Visit: http://localhost:3000/courses/cbse-mathematics-class-9"
    );
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { executeSQL, createLessonsAlternative };
