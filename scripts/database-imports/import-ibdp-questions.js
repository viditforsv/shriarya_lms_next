const fs = require("fs");
const csv = require("csv-parser");
const { createClient } = require("@supabase/supabase-js");

// Load environment variables
require("dotenv").config({ path: "../../.env.local" });

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

async function importIBDPQuestions() {
  console.log("🚀 Starting IBDP Maths AAHL questions import...");

  const questions = [];
  let questionCount = 0;

  return new Promise((resolve, reject) => {
    fs.createReadStream("../../database/IBDP Maths AAHL.csv")
      .pipe(csv())
      .on("data", (row) => {
        // Skip header row or empty rows
        if (!row.question_text || row.question_text.trim() === "") {
          return;
        }

        // Parse JSON fields
        let solutionSteps = [];
        let options = [];
        let markAllocation = null;

        try {
          if (row.solution_steps && row.solution_steps !== "") {
            solutionSteps = JSON.parse(row.solution_steps);
          }
        } catch (e) {
          console.warn(
            `⚠️  Could not parse solution_steps for question ${row.question_number}:`,
            e.message
          );
        }

        try {
          if (row.options && row.options !== "") {
            options = JSON.parse(row.options);
          }
        } catch (e) {
          console.warn(
            `⚠️  Could not parse options for question ${row.question_number}:`,
            e.message
          );
        }

        try {
          if (row.mark_allocation && row.mark_allocation !== "") {
            markAllocation = JSON.parse(row.mark_allocation);
          }
        } catch (e) {
          console.warn(
            `⚠️  Could not parse mark_allocation for question ${row.question_number}:`,
            e.message
          );
        }

        // Parse tags array
        let tags = [];
        if (row.tags && row.tags !== "") {
          try {
            tags = JSON.parse(row.tags);
          } catch (e) {
            // If not JSON, try splitting by comma
            tags = row.tags
              .split(",")
              .map((tag) => tag.trim())
              .filter((tag) => tag);
          }
        }

        const question = {
          is_pyq: row.is_pyq === "TRUE",
          question_number: row.question_number || null,
          total_marks: row.total_marks ? parseInt(row.total_marks) : null,
          pyq_year: row.pyq_year ? parseInt(row.pyq_year) : null,
          month: row.month || null,
          paper_number: row.paper_number
            ? parseInt(row.paper_number.replace(/\D/g, "")) || null
            : null,
          "Time Zone": row["Time Zone"] || null,
          question_text: row.question_text,
          tags: tags,
          section: row.section || null,
          subject: row.subject || "IBDP Mathematics AA HL",
          explanation: row.explanation || null,
          calculator: row.calculator || null,
          correct_answer: row.correct_answer || null,
          difficulty: row.difficulty ? parseInt(row.difficulty) : null,
          image_url: row.image_url || null,
          solution_steps: solutionSteps,
          solution_image: row.solution_image || null,
          question_type: row.question_type || "subjective",
          mark_allocation: markAllocation,
          board: row.board || "IBDP",
          grade: row.grade || "12",
          topic: row.topic || null,
          subtopic: row.subtopic || null,
          source: row.source || "IBDP",
          paper_type: row.paper_type || null,
          year: row.year ? parseInt(row.year) : null,
          options: options,
          is_active: row.is_active === "TRUE",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        questions.push(question);
        questionCount++;

        if (questionCount % 50 === 0) {
          console.log(`📝 Processed ${questionCount} questions...`);
        }
      })
      .on("end", async () => {
        console.log(
          `✅ Finished reading CSV. Total questions: ${questionCount}`
        );

        if (questions.length === 0) {
          console.error("❌ No questions found in CSV file");
          reject(new Error("No questions found"));
          return;
        }

        try {
          console.log("🔄 Starting database import...");

          // Clear existing questions (optional - comment out if you want to keep existing data)
          console.log("🗑️  Clearing existing IBDP questions...");
          const { error: deleteError } = await supabase
            .from("question_bank")
            .delete()
            .eq("subject", "IBDP Mathematics AA HL");

          if (deleteError) {
            console.warn(
              "⚠️  Warning: Could not clear existing questions:",
              deleteError.message
            );
          } else {
            console.log("✅ Cleared existing IBDP questions");
          }

          // Insert questions in batches
          const batchSize = 50;
          let insertedCount = 0;

          for (let i = 0; i < questions.length; i += batchSize) {
            const batch = questions.slice(i, i + batchSize);

            console.log(
              `📤 Inserting batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(
                questions.length / batchSize
              )}...`
            );

            const { data, error } = await supabase
              .from("question_bank")
              .insert(batch);

            if (error) {
              console.error(
                `❌ Error inserting batch ${Math.floor(i / batchSize) + 1}:`,
                error
              );
              reject(error);
              return;
            }

            insertedCount += batch.length;
            console.log(
              `✅ Inserted ${insertedCount}/${questions.length} questions`
            );
          }

          console.log(
            `🎉 Successfully imported ${insertedCount} IBDP Maths AAHL questions!`
          );
          resolve(insertedCount);
        } catch (error) {
          console.error("❌ Import failed:", error);
          reject(error);
        }
      })
      .on("error", (error) => {
        console.error("❌ Error reading CSV file:", error);
        reject(error);
      });
  });
}

// Run the import
importIBDPQuestions()
  .then((count) => {
    console.log(`\n🎯 Import completed successfully!`);
    console.log(`📊 Total questions imported: ${count}`);
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n💥 Import failed:", error);
    process.exit(1);
  });
