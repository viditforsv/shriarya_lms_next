const fs = require("fs");
const csv = require("csv-parser");
const { createClient } = require("@supabase/supabase-js");
const { v4: uuidv4 } = require("uuid");

// Load environment variables
require("dotenv").config({ path: "../.env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("❌ Missing Supabase environment variables");
  console.error(
    "Required: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY"
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function importLessons() {
  console.log("🚀 Starting lesson import...");

  const lessons = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream("../database/cbse-lessons-enhanced.csv")
      .pipe(csv())
      .on("data", (row) => {
        // Parse key_points from JSON string to JSONB
        let keyPoints = null;
        if (row.key_points && row.key_points !== "null") {
          try {
            keyPoints = JSON.parse(row.key_points);
          } catch (e) {
            console.warn(
              `⚠️  Could not parse key_points for lesson ${row.slug}:`,
              e.message
            );
          }
        }

        // Skip rows with empty titles (these are likely CSV formatting issues)
        if (!row.title || row.title.trim() === "") {
          console.warn(
            `⚠️  Skipping row with empty title: ${row.slug || "unknown"}`
          );
          return;
        }

        lessons.push({
          id: uuidv4(), // Generate new UUID instead of using lesson-001
          title: row.title.trim(),
          slug: row.slug.trim(),
          lesson_order: parseInt(row.lesson_order),
          is_preview: row.is_preview === "true",
          content_html: row.content_html || null,
          content: row.content || null,
          key_points: keyPoints,
          video_url: row.video_url || null,
          video_thumbnail: row.video_thumbnail || null,
          pdf_url: row.pdf_url || null,
          quiz_id: row.quiz_id || null,
          course_id: "60070fd5-e847-46d2-8786-94c8022f8682", // Hardcoded CBSE course ID
          created_at: row.created_at || new Date().toISOString(),
        });
      })
      .on("end", async () => {
        console.log(`📊 Loaded ${lessons.length} lessons from CSV`);

        try {
          // Insert lessons in batches to avoid timeout
          const batchSize = 50;
          let successCount = 0;
          let errorCount = 0;

          for (let i = 0; i < lessons.length; i += batchSize) {
            const batch = lessons.slice(i, i + batchSize);
            console.log(
              `📤 Inserting batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(
                lessons.length / batchSize
              )} (${batch.length} lessons)...`
            );

            const { data, error } = await supabase
              .from("lessons")
              .upsert(batch, {
                onConflict: "id",
                ignoreDuplicates: false,
              });

            if (error) {
              console.error(`❌ Error inserting batch:`, error);
              errorCount += batch.length;
            } else {
              successCount += batch.length;
              console.log(`✅ Successfully inserted ${batch.length} lessons`);
            }
          }

          console.log("\n🎉 Import completed!");
          console.log(`✅ Successfully imported: ${successCount} lessons`);
          if (errorCount > 0) {
            console.log(`❌ Failed to import: ${errorCount} lessons`);
          }

          resolve();
        } catch (error) {
          console.error("❌ Import failed:", error);
          reject(error);
        }
      })
      .on("error", (error) => {
        console.error("❌ Error reading CSV:", error);
        reject(error);
      });
  });
}

// Run the import
importLessons()
  .then(() => {
    console.log("🏁 Import process completed");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 Import process failed:", error);
    process.exit(1);
  });
