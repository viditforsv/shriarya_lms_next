#!/usr/bin/env node

/**
 * Generate Human-Readable Question IDs
 * Format: {BOARD}_{SUBJECT}_{TYPE}_{NUMBER}
 * Example: IBDP_aahl_pyq_0001, CBSE_maths_pyq_0001, etc.
 */

require("dotenv").config({ path: ".env.local" });
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Mapping for human-readable formats
const BOARD_MAPPING = {
  IBDP: "IBDP",
  CBSE: "CBSE",
  ICSE: "ICSE",
  IGCSE: "IGCSE",
  "A-Levels": "ALEVEL",
  SAT: "SAT",
  ACT: "ACT",
};

const SUBJECT_MAPPING = {
  HL: "aahl", // IBDP Mathematics AA HL
  SL: "aasl", // IBDP Mathematics AA SL
  Mathematics: "maths", // CBSE/ICSE Mathematics
  Physics: "physics",
  Chemistry: "chemistry",
  Biology: "biology",
};

const TYPE_MAPPING = {
  pyq: "pyq", // Past Year Question
  practice: "prac", // Practice Question
  mock: "mock", // Mock Test Question
};

async function generateHumanReadableIds() {
  try {
    console.log("🆔 Generating Human-Readable Question IDs...\n");

    // Get all active questions ordered by creation date
    const { data: questions, error } = await supabase
      .from("question_bank")
      .select("id, board, subject, is_pyq, created_at")
      .eq("is_active", true)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("❌ Error fetching questions:", error);
      return;
    }

    console.log(`📊 Found ${questions.length} questions to process\n`);

    // Group questions by board and subject for numbering
    const groupedQuestions = {};

    questions.forEach((question) => {
      const board =
        BOARD_MAPPING[question.board] || question.board.toLowerCase();
      const subject =
        SUBJECT_MAPPING[question.subject] || question.subject.toLowerCase();
      const type = question.is_pyq ? "pyq" : "prac";

      const key = `${board}_${subject}_${type}`;

      if (!groupedQuestions[key]) {
        groupedQuestions[key] = [];
      }

      groupedQuestions[key].push(question);
    });

    console.log("📋 Question Groups:");
    Object.entries(groupedQuestions).forEach(([key, questions]) => {
      console.log(`  ${key}: ${questions.length} questions`);
    });
    console.log("");

    // Generate IDs for each group
    const updates = [];

    Object.entries(groupedQuestions).forEach(([groupKey, groupQuestions]) => {
      groupQuestions.forEach((question, index) => {
        const number = String(index + 1).padStart(4, "0");
        const humanReadableId = `${groupKey}_${number}`;

        updates.push({
          id: question.id,
          human_readable_id: humanReadableId,
          question_display_number: index + 1,
        });
      });
    });

    console.log("🔄 Updating questions with human-readable IDs...\n");

    // Update questions in batches
    const batchSize = 50;
    let updated = 0;

    for (let i = 0; i < updates.length; i += batchSize) {
      const batch = updates.slice(i, i + batchSize);

      const updatePromises = batch.map((update) =>
        supabase
          .from("question_bank")
          .update({
            human_readable_id: update.human_readable_id,
            question_display_number: update.question_display_number,
          })
          .eq("id", update.id)
      );

      const results = await Promise.all(updatePromises);

      // Check for errors
      const errors = results.filter((result) => result.error);
      if (errors.length > 0) {
        console.error("❌ Errors in batch:", errors);
      } else {
        updated += batch.length;
        console.log(`✅ Updated ${updated}/${updates.length} questions`);
      }
    }

    console.log(
      `\n🎉 Successfully generated human-readable IDs for ${updated} questions!`
    );

    // Show sample results
    console.log("\n📝 Sample Generated IDs:");
    const sampleUpdates = updates.slice(0, 10);
    sampleUpdates.forEach((update) => {
      console.log(
        `  ${update.human_readable_id} (UUID: ${update.id.slice(0, 8)}...)`
      );
    });
  } catch (error) {
    console.error("❌ Script error:", error);
  }
}

// Run the script
generateHumanReadableIds();
