#!/usr/bin/env tsx
/**
 * Sync CBSE Class 10 Maths Course from CSV
 * 
 * Step-by-step synchronization:
 * 1. Check and sync units
 * 2. Check and sync chapters
 * 3. Check and sync topics (add missing, delete extra)
 * 4. Delete all lessons and recreate from CSV
 * 
 * Usage:
 *   npx tsx scripts/sync-cbse-course-from-csv.ts <course-uuid>
 */

import { config } from "dotenv";
import { resolve } from "path";
import { readFileSync } from "fs";
import { parse } from "csv-parse/sync";
import { createClient } from "@supabase/supabase-js";
import {
  getSupabaseUrl,
  getSupabaseServiceRoleKey,
} from "../src/lib/supabase/env";

config({ path: resolve(process.cwd(), ".env.local") });

interface CSVRow {
  "Sl. No."?: string;
  "Sl.No."?: string;
  unit_name: string;
  chapter_name: string;
  topic_name: string;
  lesson_id: string;
  lesson_name: string;
  tags: string;
}

const CSV_PATH = "Docs for me/master_map sheets/preppeo_cbse_class_10_maths_workbook - master_map.csv";

function parseCSV(): CSVRow[] {
  const csvContent = readFileSync(CSV_PATH, "utf-8");
  const records = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  }) as CSVRow[];

  return records;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

async function step1_CheckUnits(
  supabase: any,
  courseId: string,
  csvRows: CSVRow[]
): Promise<Map<string, string>> {
  console.log("\n" + "=".repeat(60));
  console.log("STEP 1: Checking Units");
  console.log("=".repeat(60));

  // Extract unique units from CSV
  const csvUnits = new Map<string, number>();
  let unitOrder = 1;
  for (const row of csvRows) {
    const unitName = row.unit_name.trim();
    if (!csvUnits.has(unitName)) {
      csvUnits.set(unitName, unitOrder++);
    }
  }

  console.log(`\n📋 CSV has ${csvUnits.size} unique units:`);
  csvUnits.forEach((order, name) => {
    console.log(`   ${order}. ${name}`);
  });

  // Get existing units from database
  const { data: dbUnits, error } = await supabase
    .from("courses_units")
    .select("*")
    .eq("course_id", courseId)
    .order("unit_order");

  if (error) {
    throw new Error(`Failed to fetch units: ${error.message}`);
  }

  console.log(`\n📦 Database has ${dbUnits?.length || 0} units:`);
  dbUnits?.forEach((u: any) => {
    console.log(`   ${u.unit_order}. ${u.unit_name} (ID: ${u.id})`);
  });

  // Create unit mapping: unitName -> unitId
  const unitMap = new Map<string, string>();

  // Check each CSV unit
  for (const [unitName, order] of csvUnits) {
    const existingUnit = dbUnits?.find((u: any) => u.unit_name === unitName);

    if (existingUnit) {
      // Unit exists, check if order matches
      if (existingUnit.unit_order !== order) {
        console.log(`\n⚠️  Updating unit order: ${unitName} (${existingUnit.unit_order} → ${order})`);
        const { error: updateError } = await supabase
          .from("courses_units")
          .update({ unit_order: order })
          .eq("id", existingUnit.id);

        if (updateError) {
          console.error(`   ❌ Failed to update: ${updateError.message}`);
        } else {
          console.log(`   ✅ Updated`);
        }
      } else {
        console.log(`\n✅ Unit exists: ${unitName}`);
      }
      unitMap.set(unitName, existingUnit.id);
    } else {
      // Unit doesn't exist, create it
      console.log(`\n➕ Creating unit: ${unitName}`);
      const { data: newUnit, error: createError } = await supabase
        .from("courses_units")
        .insert({
          course_id: courseId,
          unit_name: unitName,
          unit_order: order,
          is_locked: false,
        })
        .select()
        .single();

      if (createError) {
        throw new Error(`Failed to create unit: ${createError.message}`);
      }

      console.log(`   ✅ Created (ID: ${newUnit.id})`);
      unitMap.set(unitName, newUnit.id);
    }
  }

  // Check for extra units in database (not in CSV)
  const csvUnitNames = new Set(csvUnits.keys());
  const extraUnits = dbUnits?.filter((u: any) => !csvUnitNames.has(u.unit_name)) || [];

  if (extraUnits.length > 0) {
    console.log(`\n⚠️  Found ${extraUnits.length} extra unit(s) in database (not in CSV):`);
    for (const unit of extraUnits) {
      console.log(`   - ${unit.unit_name} (ID: ${unit.id})`);
    }
    console.log("   (Keeping them for now - you can delete manually if needed)");
  }

  console.log(`\n✅ Step 1 Complete: ${unitMap.size} units ready`);
  return unitMap;
}

async function step2_CheckChapters(
  supabase: any,
  unitMap: Map<string, string>,
  csvRows: CSVRow[]
): Promise<Map<string, string>> {
  console.log("\n" + "=".repeat(60));
  console.log("STEP 2: Checking Chapters");
  console.log("=".repeat(60));

  // Extract unique chapters from CSV
  const csvChapters = new Map<string, { unitName: string; order: number }>();
  const chapterOrderMap = new Map<string, number>();

  for (const row of csvRows) {
    const unitName = row.unit_name.trim();
    const chapterName = row.chapter_name.trim();
    const key = `${unitName}::${chapterName}`;

    if (!csvChapters.has(key)) {
      if (!chapterOrderMap.has(unitName)) {
        chapterOrderMap.set(unitName, 0);
      }
      const order = chapterOrderMap.get(unitName)! + 1;
      chapterOrderMap.set(unitName, order);
      csvChapters.set(key, { unitName, order });
    }
  }

  console.log(`\n📋 CSV has ${csvChapters.size} unique chapters:`);
  csvChapters.forEach((info, key) => {
    const [unitName, chapterName] = key.split("::");
    console.log(`   ${info.order}. ${chapterName} (Unit: ${unitName})`);
  });

  // Get all units for this course
  const unitIds = Array.from(unitMap.values());
  const { data: dbChapters, error } = await supabase
    .from("courses_chapters")
    .select("*")
    .in("unit_id", unitIds)
    .order("chapter_order");

  if (error) {
    throw new Error(`Failed to fetch chapters: ${error.message}`);
  }

  console.log(`\n📖 Database has ${dbChapters?.length || 0} chapters`);

  // Create chapter mapping: "unitName::chapterName" -> chapterId
  const chapterMap = new Map<string, string>();

  // Check each CSV chapter
  for (const [key, info] of csvChapters) {
    const [unitName, chapterName] = key.split("::");
    const unitId = unitMap.get(unitName);

    if (!unitId) {
      console.error(`\n❌ Unit not found: ${unitName}`);
      continue;
    }

    const existingChapter = dbChapters?.find(
      (c: any) => c.chapter_name === chapterName && c.unit_id === unitId
    );

    if (existingChapter) {
      // Chapter exists, check if order matches
      if (existingChapter.chapter_order !== info.order) {
        console.log(`\n⚠️  Updating chapter order: ${chapterName} (${existingChapter.chapter_order} → ${info.order})`);
        const { error: updateError } = await supabase
          .from("courses_chapters")
          .update({ chapter_order: info.order })
          .eq("id", existingChapter.id);

        if (updateError) {
          console.error(`   ❌ Failed to update: ${updateError.message}`);
        } else {
          console.log(`   ✅ Updated`);
        }
      } else {
        console.log(`\n✅ Chapter exists: ${chapterName} (Unit: ${unitName})`);
      }
      chapterMap.set(key, existingChapter.id);
    } else {
      // Chapter doesn't exist, create it
      console.log(`\n➕ Creating chapter: ${chapterName} (Unit: ${unitName})`);
      const { data: newChapter, error: createError } = await supabase
        .from("courses_chapters")
        .insert({
          unit_id: unitId,
          chapter_name: chapterName,
          chapter_order: info.order,
          is_locked: false,
        })
        .select()
        .single();

      if (createError) {
        throw new Error(`Failed to create chapter: ${createError.message}`);
      }

      console.log(`   ✅ Created (ID: ${newChapter.id})`);
      chapterMap.set(key, newChapter.id);
    }
  }

  // Check for extra chapters in database
  const csvChapterKeys = new Set(csvChapters.keys());
  const extraChapters = dbChapters?.filter((c: any) => {
    const unitName = Array.from(unitMap.entries()).find(([_, id]) => id === c.unit_id)?.[0];
    if (!unitName) return false;
    const key = `${unitName}::${c.chapter_name}`;
    return !csvChapterKeys.has(key);
  }) || [];

  if (extraChapters.length > 0) {
    console.log(`\n⚠️  Found ${extraChapters.length} extra chapter(s) in database (not in CSV):`);
    for (const chapter of extraChapters) {
      const unitName = Array.from(unitMap.entries()).find(([_, id]) => id === chapter.unit_id)?.[0];
      console.log(`   - ${chapter.chapter_name} (Unit: ${unitName}, ID: ${chapter.id})`);
    }
    console.log("   (Keeping them for now - you can delete manually if needed)");
  }

  console.log(`\n✅ Step 2 Complete: ${chapterMap.size} chapters ready`);
  return chapterMap;
}

async function step3_CheckTopics(
  supabase: any,
  chapterMap: Map<string, string>,
  csvRows: CSVRow[]
): Promise<Map<string, string>> {
  console.log("\n" + "=".repeat(60));
  console.log("STEP 3: Checking Topics");
  console.log("=".repeat(60));

  // Extract unique topics from CSV
  const csvTopics = new Map<string, { chapterKey: string; order: number }>();
  const topicOrderMap = new Map<string, number>();

  for (const row of csvRows) {
    const unitName = row.unit_name.trim();
    const chapterName = row.chapter_name.trim();
    const topicName = row.topic_name.trim();
    const chapterKey = `${unitName}::${chapterName}`;

    if (!chapterMap.has(chapterKey)) {
      continue; // Skip if chapter doesn't exist
    }

    const topicKey = `${chapterKey}::${topicName}`;
    if (!csvTopics.has(topicKey)) {
      if (!topicOrderMap.has(chapterKey)) {
        topicOrderMap.set(chapterKey, 0);
      }
      const order = topicOrderMap.get(chapterKey)! + 1;
      topicOrderMap.set(chapterKey, order);
      csvTopics.set(topicKey, { chapterKey, order });
    }
  }

  console.log(`\n📋 CSV has ${csvTopics.size} unique topics:`);
  csvTopics.forEach((info, key) => {
    const parts = key.split("::");
    const topicName = parts[parts.length - 1];
    console.log(`   ${info.order}. ${topicName} (Chapter: ${info.chapterKey})`);
  });

  // Get all chapters for this course
  const chapterIds = Array.from(chapterMap.values());
  const { data: dbTopics, error } = await supabase
    .from("courses_topics")
    .select("*")
    .in("chapter_id", chapterIds)
    .order("topic_order");

  if (error) {
    throw new Error(`Failed to fetch topics: ${error.message}`);
  }

  console.log(`\n🏷️  Database has ${dbTopics?.length || 0} topics`);

  // Create topic mapping: "unitName::chapterName::topicName" -> topicId
  const topicMap = new Map<string, string>();

  // Check each CSV topic
  for (const [topicKey, info] of csvTopics) {
    const parts = topicKey.split("::");
    const topicName = parts[parts.length - 1];
    const chapterId = chapterMap.get(info.chapterKey);

    if (!chapterId) {
      console.error(`\n❌ Chapter not found: ${info.chapterKey}`);
      continue;
    }

    const existingTopic = dbTopics?.find(
      (t: any) => t.topic_name === topicName && t.chapter_id === chapterId
    );

    if (existingTopic) {
      // Topic exists, check if order matches
      if (existingTopic.topic_order !== info.order) {
        console.log(`\n⚠️  Updating topic order: ${topicName} (${existingTopic.topic_order} → ${info.order})`);
        const { error: updateError } = await supabase
          .from("courses_topics")
          .update({ topic_order: info.order })
          .eq("id", existingTopic.id);

        if (updateError) {
          console.error(`   ❌ Failed to update: ${updateError.message}`);
        } else {
          console.log(`   ✅ Updated`);
        }
      } else {
        console.log(`\n✅ Topic exists: ${topicName}`);
      }
      topicMap.set(topicKey, existingTopic.id);
    } else {
      // Topic doesn't exist, create it
      console.log(`\n➕ Creating topic: ${topicName}`);
      const { data: newTopic, error: createError } = await supabase
        .from("courses_topics")
        .insert({
          chapter_id: chapterId,
          topic_name: topicName,
          topic_number: topicName, // Using topic name as topic_number for now
          topic_order: info.order,
        })
        .select()
        .single();

      if (createError) {
        throw new Error(`Failed to create topic: ${createError.message}`);
      }

      console.log(`   ✅ Created (ID: ${newTopic.id})`);
      topicMap.set(topicKey, newTopic.id);
    }
  }

  // Find and delete extra topics in database (not in CSV)
  const csvTopicKeys = new Set(csvTopics.keys());
  const extraTopics = dbTopics?.filter((t: any) => {
    // Find chapter key for this topic
    const chapterKey = Array.from(chapterMap.entries()).find(([_, id]) => id === t.chapter_id)?.[0];
    if (!chapterKey) return false;
    const topicKey = `${chapterKey}::${t.topic_name}`;
    return !csvTopicKeys.has(topicKey);
  }) || [];

  if (extraTopics.length > 0) {
    console.log(`\n🗑️  Found ${extraTopics.length} extra topic(s) in database (not in CSV):`);
    for (const topic of extraTopics) {
      console.log(`   - ${topic.topic_name} (ID: ${topic.id})`);
    }
    console.log("\n   Deleting extra topics...");
    
    const extraTopicIds = extraTopics.map((t: any) => t.id);
    const { error: deleteError } = await supabase
      .from("courses_topics")
      .delete()
      .in("id", extraTopicIds);

    if (deleteError) {
      console.error(`   ❌ Failed to delete: ${deleteError.message}`);
    } else {
      console.log(`   ✅ Deleted ${extraTopics.length} extra topic(s)`);
    }
  }

  console.log(`\n✅ Step 3 Complete: ${topicMap.size} topics ready`);
  return topicMap;
}

async function step4_DeleteAndRecreateLessons(
  supabase: any,
  courseId: string,
  chapterMap: Map<string, string>,
  topicMap: Map<string, string>,
  csvRows: CSVRow[]
) {
  console.log("\n" + "=".repeat(60));
  console.log("STEP 4: Delete and Recreate Lessons");
  console.log("=".repeat(60));

  // Delete all existing lessons
  console.log("\n🗑️  Deleting all existing lessons...");
  const { data: existingLessons, error: fetchError } = await supabase
    .from("courses_lessons")
    .select("id, title")
    .eq("course_id", courseId);

  if (fetchError) {
    throw new Error(`Failed to fetch lessons: ${fetchError.message}`);
  }

  const lessonCount = existingLessons?.length || 0;
  console.log(`   Found ${lessonCount} existing lesson(s)`);

  if (lessonCount > 0) {
    const { error: deleteError } = await supabase
      .from("courses_lessons")
      .delete()
      .eq("course_id", courseId);

    if (deleteError) {
      throw new Error(`Failed to delete lessons: ${deleteError.message}`);
    }

    console.log(`   ✅ Deleted ${lessonCount} lesson(s)`);
  }

  // Create lessons from CSV
  console.log(`\n➕ Creating ${csvRows.length} lesson(s) from CSV...`);

  let created = 0;
  let skipped = 0;

  for (let i = 0; i < csvRows.length; i++) {
    const row = csvRows[i];
    const unitName = row.unit_name.trim();
    const chapterName = row.chapter_name.trim();
    const topicName = row.topic_name.trim();
    const lessonName = row.lesson_name.trim();
    const lessonId = row.lesson_id.trim();
    const tags = row.tags.trim();
    const lessonOrder = parseInt(row["Sl. No."] || row["Sl.No."] || String(i + 1)) || i + 1;

    const chapterKey = `${unitName}::${chapterName}`;
    const topicKey = `${chapterKey}::${topicName}`;

    const chapterId = chapterMap.get(chapterKey);
    const topicId = topicMap.get(topicKey);

    if (!chapterId) {
      console.error(`\n❌ Chapter not found: ${chapterKey}`);
      skipped++;
      continue;
    }

    if (!topicId) {
      console.error(`\n❌ Topic not found: ${topicKey}`);
      skipped++;
      continue;
    }

    // Create slug from lesson_id (which is unique, e.g., cbse_maths_10_012)
    const slug = slugify(lessonId);

    // Determine if preview (first lesson of each chapter is preview)
    const isFirstInChapter = !csvRows
      .slice(0, i)
      .some(r => `${r.unit_name.trim()}::${r.chapter_name.trim()}` === chapterKey);

    const { error: createError } = await supabase
      .from("courses_lessons")
      .insert({
        course_id: courseId,
        chapter_id: chapterId,
        topic_id: topicId,
        title: lessonName,
        slug: slug,
        lesson_order: lessonOrder,
        is_preview: isFirstInChapter || i < 2, // First lesson of each chapter or first 2 overall
        content: null,
      });

    if (createError) {
      console.error(`\n❌ Failed to create lesson "${lessonName}": ${createError.message}`);
      skipped++;
      continue;
    }

    created++;
    if (created % 10 === 0) {
      process.stdout.write(`   Created ${created}/${csvRows.length}...\r`);
    }
  }

  console.log(`\n✅ Step 4 Complete:`);
  console.log(`   Created: ${created} lesson(s)`);
  console.log(`   Skipped: ${skipped} lesson(s)`);
}

async function main() {
  const courseId = process.argv[2];

  if (!courseId) {
    console.error("Usage: npx tsx scripts/sync-cbse-course-from-csv.ts <course-uuid>");
    process.exit(1);
  }

  const supabaseUrl = getSupabaseUrl();
  const serviceRoleKey = getSupabaseServiceRoleKey();

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Missing Supabase credentials");
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  // Verify course exists
  const { data: course, error: courseError } = await supabase
    .from("courses")
    .select("id, title")
    .eq("id", courseId)
    .single();

  if (courseError || !course) {
    throw new Error(`Course not found: ${courseId}`);
  }

  console.log(`\n📚 Course: ${course.title}`);
  console.log(`   ID: ${course.id}`);

  // Parse CSV
  console.log("\n📄 Parsing CSV...");
  const csvRows = parseCSV();
  console.log(`   Found ${csvRows.length} rows`);

  // Execute steps
  const unitMap = await step1_CheckUnits(supabase, courseId, csvRows);
  const chapterMap = await step2_CheckChapters(supabase, unitMap, csvRows);
  const topicMap = await step3_CheckTopics(supabase, chapterMap, csvRows);
  await step4_DeleteAndRecreateLessons(supabase, courseId, chapterMap, topicMap, csvRows);

  console.log("\n" + "=".repeat(60));
  console.log("✅ ALL STEPS COMPLETE!");
  console.log("=".repeat(60));
}

if (require.main === module) {
  main().catch((error) => {
    console.error("\n❌ Error:", error);
    process.exit(1);
  });
}

