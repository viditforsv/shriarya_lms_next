#!/usr/bin/env tsx
/**
 * Bulk Edit Question Bank Script
 * 
 * Allows bulk editing of questions in the question_bank table with various filters
 * and update operations.
 * 
 * Usage:
 *   npx tsx scripts/bulk-edit-question-bank.ts --help
 * 
 * Examples:
 *   # Dry run: Update subject for all IBDP questions
 *   npx tsx scripts/bulk-edit-question-bank.ts --filter-subject "IBDP Mathematics AA HL" --update-subject "IBDP Mathematics AA HL Updated" --dry-run
 * 
 *   # Update difficulty for questions with specific tags
 *   npx tsx scripts/bulk-edit-question-bank.ts --filter-tags "algebra,geometry" --update-difficulty 5
 * 
 *   # Update multiple fields at once
 *   npx tsx scripts/bulk-edit-question-bank.ts --filter-grade "12" --update-subject "New Subject" --update-topic "New Topic" --update-difficulty 7
 */

import { config } from "dotenv";
import { resolve } from "path";
import { createClient } from "@supabase/supabase-js";
import { getSupabaseUrl, getSupabaseServiceRoleKey } from "../src/lib/supabase/env";

config({ path: resolve(process.cwd(), ".env.local") });

interface FilterOptions {
  subject?: string;
  grade?: string;
  topic?: string;
  subtopic?: string;
  question_type?: string;
  difficulty?: number;
  is_pyq?: boolean;
  tags?: string[];
  boards?: string[];
  course_types?: string[];
  levels?: string[];
  pyq_year?: number;
  month?: string;
  paper_number?: number;
  is_active?: boolean;
  search?: string;
  ids?: string[];
}

interface UpdateOptions {
  subject?: string;
  grade?: string;
  topic?: string;
  subtopic?: string;
  question_type?: string;
  difficulty?: number;
  is_pyq?: boolean;
  tags?: string[];
  boards?: string[];
  course_types?: string[];
  levels?: string[];
  relevance?: string[];
  total_marks?: number;
  pyq_year?: number;
  month?: string;
  paper_number?: number;
  is_active?: boolean;
  calculator?: string;
  source?: string;
  paper_type?: string;
  year?: number;
}

// Helper function to apply filters to a query
function applyFilters(query: any, filters: FilterOptions) {
  if (filters.ids && filters.ids.length > 0) {
    query = query.in("id", filters.ids);
  }
  if (filters.subject) {
    query = query.eq("subject", filters.subject);
  }
  if (filters.grade) {
    query = query.eq("grade", filters.grade);
  }
  if (filters.topic) {
    query = query.ilike("topic", `%${filters.topic}%`);
  }
  if (filters.subtopic) {
    query = query.ilike("subtopic", `%${filters.subtopic}%`);
  }
  if (filters.question_type) {
    query = query.eq("question_type", filters.question_type);
  }
  if (filters.difficulty !== undefined) {
    query = query.eq("difficulty", filters.difficulty);
  }
  if (filters.is_pyq !== undefined) {
    query = query.eq("is_pyq", filters.is_pyq);
  }
  if (filters.tags && filters.tags.length > 0) {
    query = query.overlaps("tags", filters.tags);
  }
  if (filters.boards && filters.boards.length > 0) {
    query = query.overlaps("boards", filters.boards);
  }
  if (filters.course_types && filters.course_types.length > 0) {
    query = query.overlaps("course_types", filters.course_types);
  }
  if (filters.levels && filters.levels.length > 0) {
    query = query.overlaps("levels", filters.levels);
  }
  if (filters.pyq_year !== undefined) {
    query = query.eq("pyq_year", filters.pyq_year);
  }
  if (filters.month) {
    query = query.eq("month", filters.month);
  }
  if (filters.paper_number !== undefined) {
    query = query.eq("paper_number", filters.paper_number);
  }
  if (filters.is_active !== undefined) {
    query = query.eq("is_active", filters.is_active);
  }
  if (filters.search) {
    query = query.or(
      `question_text.ilike.%${filters.search}%,topic.ilike.%${filters.search}%,subtopic.ilike.%${filters.search}%`
    );
  }
  return query;
}

async function bulkEditQuestionBank(
  filters: FilterOptions,
  updates: UpdateOptions,
  options: { dryRun: boolean; batchSize: number; limit?: number }
) {
  const supabaseUrl = getSupabaseUrl();
  const serviceRoleKey = getSupabaseServiceRoleKey();

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "Missing Supabase credentials. Set NEXT_PUBLIC_SUPABASE_URL_DEV/PROD and SUPABASE_SERVICE_ROLE_KEY_DEV/PROD"
    );
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);
  const env = process.env.NEXT_PUBLIC_ENVIRONMENT || "dev";
  
  console.log(`\n🔧 Bulk Edit Question Bank (${env.toUpperCase()} environment)\n`);
  console.log("Filters:", JSON.stringify(filters, null, 2));
  console.log("Updates:", JSON.stringify(updates, null, 2));
  console.log(`Options: dry-run=${options.dryRun}, batch-size=${options.batchSize}\n`);

  // Build query with filters
  let query = supabase.from("question_bank").select("id", { count: "exact" });
  query = applyFilters(query, filters);

  // Get count first
  const { count, error: countError } = await query;

  if (countError) {
    throw new Error(`Failed to count questions: ${countError.message}`);
  }

  console.log(`📊 Found ${count || 0} questions matching filters\n`);

  if (!count || count === 0) {
    console.log("✅ No questions to update.");
    return;
  }

  // Apply limit if specified
  const totalToUpdate = options.limit ? Math.min(count, options.limit) : count;
  console.log(`📝 Will update ${totalToUpdate} questions (${options.dryRun ? "DRY RUN" : "LIVE UPDATE"})\n`);

  if (options.dryRun) {
    console.log("🔍 DRY RUN MODE - No changes will be made\n");
    
    // Fetch a sample of questions to show what would be updated
    let sampleQuery = supabase
      .from("question_bank")
      .select("id, question_text, subject, grade, topic, difficulty, tags")
      .limit(5);
    
    // Apply same filters
    sampleQuery = applyFilters(sampleQuery, filters);
    
    const { data: sample } = await sampleQuery;
    
    if (sample && sample.length > 0) {
      console.log("Sample questions that would be updated:");
      sample.forEach((q, i) => {
        console.log(`\n${i + 1}. ID: ${q.id}`);
        console.log(`   Text: ${q.question_text?.substring(0, 100)}...`);
        console.log(`   Current: subject=${q.subject}, grade=${q.grade}, topic=${q.topic}, difficulty=${q.difficulty}`);
      });
      console.log(`\n... and ${totalToUpdate - sample.length} more questions\n`);
    }
    
    console.log("✅ Dry run completed. Use without --dry-run to apply changes.");
    return;
  }

  // Prepare update data
  const updateData: Record<string, any> = {
    updated_at: new Date().toISOString(),
  };

  if (updates.subject !== undefined) updateData.subject = updates.subject;
  if (updates.grade !== undefined) updateData.grade = updates.grade;
  if (updates.topic !== undefined) updateData.topic = updates.topic;
  if (updates.subtopic !== undefined) updateData.subtopic = updates.subtopic;
  if (updates.question_type !== undefined) updateData.question_type = updates.question_type;
  if (updates.difficulty !== undefined) updateData.difficulty = updates.difficulty;
  if (updates.is_pyq !== undefined) updateData.is_pyq = updates.is_pyq;
  if (updates.tags !== undefined) updateData.tags = updates.tags;
  if (updates.boards !== undefined) updateData.boards = updates.boards;
  if (updates.course_types !== undefined) updateData.course_types = updates.course_types;
  if (updates.levels !== undefined) updateData.levels = updates.levels;
  if (updates.relevance !== undefined) updateData.relevance = updates.relevance;
  if (updates.total_marks !== undefined) updateData.total_marks = updates.total_marks;
  if (updates.pyq_year !== undefined) updateData.pyq_year = updates.pyq_year;
  if (updates.month !== undefined) updateData.month = updates.month;
  if (updates.paper_number !== undefined) updateData.paper_number = updates.paper_number;
  if (updates.is_active !== undefined) updateData.is_active = updates.is_active;
  if (updates.calculator !== undefined) updateData.calculator = updates.calculator;
  if (updates.source !== undefined) updateData.source = updates.source;
  if (updates.paper_type !== undefined) updateData.paper_type = updates.paper_type;
  if (updates.year !== undefined) updateData.year = updates.year;

  // Process in batches
  let updated = 0;
  let failed = 0;
  const batchSize = options.batchSize;
  let offset = 0;

  while (offset < totalToUpdate) {
    const batchLimit = Math.min(batchSize, totalToUpdate - offset);
    
    // Fetch batch of IDs
    let batchQuery = supabase
      .from("question_bank")
      .select("id")
      .range(offset, offset + batchLimit - 1);

    // Apply same filters
    batchQuery = applyFilters(batchQuery, filters);

    const { data: batch, error: batchError } = await batchQuery;

    if (batchError) {
      console.error(`❌ Error fetching batch: ${batchError.message}`);
      failed += batchLimit;
      offset += batchLimit;
      continue;
    }

    if (!batch || batch.length === 0) {
      break;
    }

    const batchIds = batch.map((q) => q.id);

    // Update batch
    const { error: updateError } = await supabase
      .from("question_bank")
      .update(updateData)
      .in("id", batchIds);

    if (updateError) {
      console.error(`❌ Error updating batch: ${updateError.message}`);
      failed += batch.length;
    } else {
      updated += batch.length;
      console.log(`✅ Updated batch: ${updated}/${totalToUpdate} questions`);
    }

    offset += batchLimit;
  }

  console.log(`\n✨ Bulk edit completed!`);
  console.log(`   Updated: ${updated}`);
  console.log(`   Failed: ${failed}`);
  console.log(`   Total: ${updated + failed}/${totalToUpdate}`);
}

function parseArgs(): {
  filters: FilterOptions;
  updates: UpdateOptions;
  options: { dryRun: boolean; batchSize: number; limit?: number };
} {
  const args = process.argv.slice(2);
  const filters: FilterOptions = {};
  const updates: UpdateOptions = {};
  const options: { dryRun: boolean; batchSize: number; limit?: number } = {
    dryRun: false,
    batchSize: 100,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    const nextArg = args[i + 1];

    // Options
    if (arg === "--dry-run") {
      options.dryRun = true;
      continue;
    }
    if (arg === "--batch-size" && nextArg) {
      options.batchSize = parseInt(nextArg);
      i++;
      continue;
    }
    if (arg === "--limit" && nextArg) {
      options.limit = parseInt(nextArg);
      i++;
      continue;
    }

    // Filters
    if (arg === "--filter-subject" && nextArg) {
      filters.subject = nextArg;
      i++;
      continue;
    }
    if (arg === "--filter-grade" && nextArg) {
      filters.grade = nextArg;
      i++;
      continue;
    }
    if (arg === "--filter-topic" && nextArg) {
      filters.topic = nextArg;
      i++;
      continue;
    }
    if (arg === "--filter-subtopic" && nextArg) {
      filters.subtopic = nextArg;
      i++;
      continue;
    }
    if (arg === "--filter-question-type" && nextArg) {
      filters.question_type = nextArg;
      i++;
      continue;
    }
    if (arg === "--filter-difficulty" && nextArg) {
      filters.difficulty = parseInt(nextArg);
      i++;
      continue;
    }
    if (arg === "--filter-is-pyq" && nextArg) {
      filters.is_pyq = nextArg === "true";
      i++;
      continue;
    }
    if (arg === "--filter-tags" && nextArg) {
      filters.tags = nextArg.split(",").map((t) => t.trim());
      i++;
      continue;
    }
    if (arg === "--filter-boards" && nextArg) {
      filters.boards = nextArg.split(",").map((b) => b.trim());
      i++;
      continue;
    }
    if (arg === "--filter-course-types" && nextArg) {
      filters.course_types = nextArg.split(",").map((c) => c.trim());
      i++;
      continue;
    }
    if (arg === "--filter-levels" && nextArg) {
      filters.levels = nextArg.split(",").map((l) => l.trim());
      i++;
      continue;
    }
    if (arg === "--filter-pyq-year" && nextArg) {
      filters.pyq_year = parseInt(nextArg);
      i++;
      continue;
    }
    if (arg === "--filter-month" && nextArg) {
      filters.month = nextArg;
      i++;
      continue;
    }
    if (arg === "--filter-paper-number" && nextArg) {
      filters.paper_number = parseInt(nextArg);
      i++;
      continue;
    }
    if (arg === "--filter-is-active" && nextArg) {
      filters.is_active = nextArg === "true";
      i++;
      continue;
    }
    if (arg === "--filter-search" && nextArg) {
      filters.search = nextArg;
      i++;
      continue;
    }
    if (arg === "--filter-ids" && nextArg) {
      filters.ids = nextArg.split(",").map((id) => id.trim());
      i++;
      continue;
    }

    // Updates
    if (arg === "--update-subject" && nextArg) {
      updates.subject = nextArg;
      i++;
      continue;
    }
    if (arg === "--update-grade" && nextArg) {
      updates.grade = nextArg;
      i++;
      continue;
    }
    if (arg === "--update-topic" && nextArg) {
      updates.topic = nextArg;
      i++;
      continue;
    }
    if (arg === "--update-subtopic" && nextArg) {
      updates.subtopic = nextArg;
      i++;
      continue;
    }
    if (arg === "--update-question-type" && nextArg) {
      updates.question_type = nextArg;
      i++;
      continue;
    }
    if (arg === "--update-difficulty" && nextArg) {
      updates.difficulty = parseInt(nextArg);
      i++;
      continue;
    }
    if (arg === "--update-is-pyq" && nextArg) {
      updates.is_pyq = nextArg === "true";
      i++;
      continue;
    }
    if (arg === "--update-tags" && nextArg) {
      updates.tags = nextArg.split(",").map((t) => t.trim());
      i++;
      continue;
    }
    if (arg === "--update-boards" && nextArg) {
      updates.boards = nextArg.split(",").map((b) => b.trim());
      i++;
      continue;
    }
    if (arg === "--update-course-types" && nextArg) {
      updates.course_types = nextArg.split(",").map((c) => c.trim());
      i++;
      continue;
    }
    if (arg === "--update-levels" && nextArg) {
      updates.levels = nextArg.split(",").map((l) => l.trim());
      i++;
      continue;
    }
    if (arg === "--update-relevance" && nextArg) {
      updates.relevance = nextArg.split(",").map((r) => r.trim());
      i++;
      continue;
    }
    if (arg === "--update-total-marks" && nextArg) {
      updates.total_marks = parseInt(nextArg);
      i++;
      continue;
    }
    if (arg === "--update-pyq-year" && nextArg) {
      updates.pyq_year = parseInt(nextArg);
      i++;
      continue;
    }
    if (arg === "--update-month" && nextArg) {
      updates.month = nextArg;
      i++;
      continue;
    }
    if (arg === "--update-paper-number" && nextArg) {
      updates.paper_number = parseInt(nextArg);
      i++;
      continue;
    }
    if (arg === "--update-is-active" && nextArg) {
      updates.is_active = nextArg === "true";
      i++;
      continue;
    }
    if (arg === "--update-calculator" && nextArg) {
      updates.calculator = nextArg;
      i++;
      continue;
    }
    if (arg === "--update-source" && nextArg) {
      updates.source = nextArg;
      i++;
      continue;
    }
    if (arg === "--update-paper-type" && nextArg) {
      updates.paper_type = nextArg;
      i++;
      continue;
    }
    if (arg === "--update-year" && nextArg) {
      updates.year = parseInt(nextArg);
      i++;
      continue;
    }
  }

  return { filters, updates, options };
}

// Main execution
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args[0] === "--help" || args[0] === "-h") {
    console.log(`
Bulk Edit Question Bank Script

Usage:
  npx tsx scripts/bulk-edit-question-bank.ts [options] [filters] [updates]

Options:
  --dry-run              Show what would be updated without making changes
  --batch-size <n>      Number of questions to update per batch (default: 100)
  --limit <n>           Maximum number of questions to update
  --help, -h             Show this help message

Filter Options (select which questions to update):
  --filter-subject <text>
  --filter-grade <text>
  --filter-topic <text>
  --filter-subtopic <text>
  --filter-question-type <mcq|subjective|true_false|fill_blank>
  --filter-difficulty <1-10>
  --filter-is-pyq <true|false>
  --filter-tags <tag1,tag2,...>
  --filter-boards <board1,board2,...>
  --filter-course-types <type1,type2,...>
  --filter-levels <level1,level2,...>
  --filter-pyq-year <year>
  --filter-month <month>
  --filter-paper-number <number>
  --filter-is-active <true|false>
  --filter-search <text>              Search in question text, topic, subtopic
  --filter-ids <id1,id2,...>          Filter by specific question IDs

Update Options (what to change):
  --update-subject <text>
  --update-grade <text>
  --update-topic <text>
  --update-subtopic <text>
  --update-question-type <mcq|subjective|true_false|fill_blank>
  --update-difficulty <1-10>
  --update-is-pyq <true|false>
  --update-tags <tag1,tag2,...>
  --update-boards <board1,board2,...>
  --update-course-types <type1,type2,...>
  --update-levels <level1,level2,...>
  --update-relevance <rel1,rel2,...>
  --update-total-marks <number>
  --update-pyq-year <year>
  --update-month <month>
  --update-paper-number <number>
  --update-is-active <true|false>
  --update-calculator <text>
  --update-source <text>
  --update-paper-type <text>
  --update-year <year>

Examples:
  # Dry run: See what would be updated
  npx tsx scripts/bulk-edit-question-bank.ts \\
    --filter-subject "IBDP Mathematics AA HL" \\
    --update-subject "IBDP Mathematics AA HL Updated" \\
    --dry-run

  # Update difficulty for questions with specific tags
  npx tsx scripts/bulk-edit-question-bank.ts \\
    --filter-tags "algebra,geometry" \\
    --update-difficulty 5

  # Update multiple fields for grade 12 questions
  npx tsx scripts/bulk-edit-question-bank.ts \\
    --filter-grade "12" \\
    --update-subject "New Subject" \\
    --update-topic "New Topic" \\
    --update-difficulty 7

  # Update tags for specific question IDs
  npx tsx scripts/bulk-edit-question-bank.ts \\
    --filter-ids "uuid1,uuid2,uuid3" \\
    --update-tags "new-tag1,new-tag2"

  # Update first 50 questions matching criteria
  npx tsx scripts/bulk-edit-question-bank.ts \\
    --filter-topic "Calculus" \\
    --update-difficulty 8 \\
    --limit 50
`);
    process.exit(0);
  }

  try {
    const { filters, updates, options } = parseArgs();

    // Validate that we have at least one filter and one update
    if (Object.keys(filters).length === 0) {
      console.error("❌ Error: At least one filter is required to prevent accidental updates to all questions.");
      console.error("   Use --filter-ids to target specific questions, or add other filters.");
      process.exit(1);
    }

    if (Object.keys(updates).length === 0) {
      console.error("❌ Error: At least one update field is required.");
      process.exit(1);
    }

    await bulkEditQuestionBank(filters, updates, options);
  } catch (error) {
    console.error("\n❌ Error:", error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

main();

