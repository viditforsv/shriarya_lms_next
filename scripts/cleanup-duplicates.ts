#!/usr/bin/env tsx
/**
 * Cleanup duplicate units, chapters, topics, and lessons for a course
 * Keeps the first occurrence (by created_at) and deletes duplicates
 */

import { config } from "dotenv";
import { resolve } from "path";
import { createClient } from "@supabase/supabase-js";
import { getSupabaseUrl, getSupabaseServiceRoleKey } from "../src/lib/supabase/env";

config({ path: resolve(process.cwd(), ".env.local") });

async function cleanupDuplicates(courseSlug: string) {
  const supabaseUrl = getSupabaseUrl();
  const serviceRoleKey = getSupabaseServiceRoleKey();

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "Missing Supabase credentials. Set NEXT_PUBLIC_SUPABASE_URL_DEV/PROD and SUPABASE_SERVICE_ROLE_KEY_DEV/PROD"
    );
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  // Get course ID
  const { data: course, error: courseError } = await supabase
    .from("courses")
    .select("id, title, slug")
    .eq("slug", courseSlug)
    .single();

  if (courseError || !course) {
    throw new Error(`Course with slug "${courseSlug}" not found`);
  }

  console.log(`\n🧹 Cleaning up duplicates for course: ${course.title} (${course.id})\n`);

  // Delete in reverse order: lessons -> topics -> chapters -> units
  // to avoid foreign key constraint violations

  // 1. Find and delete duplicate lessons (by slug, keep the oldest)
  console.log("📖 Checking for duplicate lessons...");
  const { data: allLessons } = await supabase
    .from("courses_lessons")
    .select("id, slug, created_at")
    .eq("course_id", course.id)
    .order("created_at");

  if (allLessons) {
    const lessonGroups = new Map<string, typeof allLessons>();
    allLessons.forEach((lesson) => {
      if (!lesson.slug) return;
      const key = lesson.slug;
      if (!lessonGroups.has(key)) {
        lessonGroups.set(key, []);
      }
      lessonGroups.get(key)!.push(lesson);
    });

    let deletedLessons = 0;
    for (const [slug, group] of lessonGroups.entries()) {
      if (group.length > 1) {
        group.sort((a, b) => 
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
        const toDelete = group.slice(1);

        console.log(`   Found ${group.length} lessons with slug "${slug}" - deleting ${toDelete.length}`);
        
        for (const lesson of toDelete) {
          const { error } = await supabase
            .from("courses_lessons")
            .delete()
            .eq("id", lesson.id);
          
          if (error) {
            console.error(`   ❌ Failed to delete lesson ${lesson.id}: ${error.message}`);
          } else {
            deletedLessons++;
            console.log(`   ✅ Deleted duplicate lesson: ${lesson.id}`);
          }
        }
      }
    }
    console.log(`✅ Cleaned up ${deletedLessons} duplicate lessons\n`);
  }

  // 2. Get all units first
  console.log("📦 Checking for duplicate units...");
  const { data: units } = await supabase
    .from("courses_units")
    .select("id, unit_name, unit_order, created_at")
    .eq("course_id", course.id)
    .order("unit_order")
    .order("created_at");

  if (units) {
    const unitGroups = new Map<string, typeof units>();
    units.forEach((unit) => {
      const key = `${unit.unit_name}-${unit.unit_order}`;
      if (!unitGroups.has(key)) {
        unitGroups.set(key, []);
      }
      unitGroups.get(key)!.push(unit);
    });

    let deletedUnits = 0;
    for (const [key, group] of unitGroups.entries()) {
      if (group.length > 1) {
        // Sort by created_at, keep the first (oldest)
        group.sort((a, b) => 
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
        const toKeep = group[0];
        const toDelete = group.slice(1);

        console.log(`   Found ${group.length} units for "${key}" - keeping oldest, deleting ${toDelete.length}`);
        
        for (const unit of toDelete) {
          // Get all chapters for this unit
          const { data: unitChapters } = await supabase
            .from("courses_chapters")
            .select("id")
            .eq("unit_id", unit.id);
          
          if (unitChapters && unitChapters.length > 0) {
            // Delete all lessons for these chapters first
            const { data: unitLessons } = await supabase
              .from("courses_lessons")
              .select("id")
              .in("chapter_id", unitChapters.map(c => c.id));
            
            if (unitLessons && unitLessons.length > 0) {
              await supabase
                .from("courses_lessons")
                .delete()
                .in("id", unitLessons.map(l => l.id));
            }
            
            // Delete all topics for these chapters
            const { data: unitTopics } = await supabase
              .from("courses_topics")
              .select("id")
              .in("chapter_id", unitChapters.map(c => c.id));
            
            if (unitTopics && unitTopics.length > 0) {
              await supabase
                .from("courses_topics")
                .delete()
                .in("id", unitTopics.map(t => t.id));
            }
            
            // Delete chapters
            await supabase
              .from("courses_chapters")
              .delete()
              .in("id", unitChapters.map(c => c.id));
          }
          
          // Now delete the unit
          const { error } = await supabase
            .from("courses_units")
            .delete()
            .eq("id", unit.id);
          
          if (error) {
            console.error(`   ❌ Failed to delete unit ${unit.id}: ${error.message}`);
          } else {
            deletedUnits++;
            console.log(`   ✅ Deleted duplicate unit: ${unit.id}`);
          }
        }
      }
    }
    console.log(`✅ Cleaned up ${deletedUnits} duplicate units\n`);
  }

  // 3. Find and delete duplicate topics (keep the oldest)
  console.log("📝 Checking for duplicate topics...");
  const { data: allChapters } = await supabase
    .from("courses_chapters")
    .select("id, unit_id, chapter_name, chapter_order, created_at")
    .in("unit_id", units?.map(u => u.id) || [])
    .order("chapter_order")
    .order("created_at");

  const { data: topics } = await supabase
    .from("courses_topics")
    .select("id, chapter_id, topic_name, topic_order, created_at")
    .in("chapter_id", allChapters?.map(c => c.id) || [])
    .order("topic_order")
    .order("created_at");

  if (topics) {
    const topicGroups = new Map<string, typeof topics>();
    topics.forEach((topic) => {
      const key = `${topic.chapter_id}-${topic.topic_name}-${topic.topic_order}`;
      if (!topicGroups.has(key)) {
        topicGroups.set(key, []);
      }
      topicGroups.get(key)!.push(topic);
    });

    let deletedTopics = 0;
    for (const [key, group] of topicGroups.entries()) {
      if (group.length > 1) {
        group.sort((a, b) => 
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
        const toDelete = group.slice(1);

        console.log(`   Found ${group.length} topics for "${key}" - deleting ${toDelete.length}`);
        
        // Delete lessons for duplicate topics first
        for (const topic of toDelete) {
          const { data: topicLessons } = await supabase
            .from("courses_lessons")
            .select("id")
            .eq("topic_id", topic.id);
          
          if (topicLessons && topicLessons.length > 0) {
            await supabase
              .from("courses_lessons")
              .delete()
              .in("id", topicLessons.map(l => l.id));
          }
        }
        
        for (const topic of toDelete) {
          const { error } = await supabase
            .from("courses_topics")
            .delete()
            .eq("id", topic.id);
          
          if (error) {
            console.error(`   ❌ Failed to delete topic ${topic.id}: ${error.message}`);
          } else {
            deletedTopics++;
            console.log(`   ✅ Deleted duplicate topic: ${topic.id}`);
          }
        }
      }
    }
    console.log(`✅ Cleaned up ${deletedTopics} duplicate topics\n`);
  }

  // 4. Find and delete duplicate chapters (keep the oldest)
  console.log("📚 Checking for duplicate chapters...");
  if (allChapters) {
    const chapterGroups = new Map<string, typeof allChapters>();
    allChapters.forEach((chapter) => {
      const key = `${chapter.unit_id}-${chapter.chapter_name}-${chapter.chapter_order}`;
      if (!chapterGroups.has(key)) {
        chapterGroups.set(key, []);
      }
      chapterGroups.get(key)!.push(chapter);
    });

    let deletedChapters = 0;
    for (const [key, group] of chapterGroups.entries()) {
      if (group.length > 1) {
        group.sort((a, b) => 
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
        const toDelete = group.slice(1);

        console.log(`   Found ${group.length} chapters for "${key}" - deleting ${toDelete.length}`);
        
        // Delete lessons for duplicate chapters first
        for (const chapter of toDelete) {
          const { data: chapterLessons } = await supabase
            .from("courses_lessons")
            .select("id")
            .eq("chapter_id", chapter.id);
          
          if (chapterLessons && chapterLessons.length > 0) {
            await supabase
              .from("courses_lessons")
              .delete()
              .in("id", chapterLessons.map(l => l.id));
          }
        }
        
        for (const chapter of toDelete) {
          const { error } = await supabase
            .from("courses_chapters")
            .delete()
            .eq("id", chapter.id);
          
          if (error) {
            console.error(`   ❌ Failed to delete chapter ${chapter.id}: ${error.message}`);
          } else {
            deletedChapters++;
            console.log(`   ✅ Deleted duplicate chapter: ${chapter.id}`);
          }
        }
      }
    }
    console.log(`✅ Cleaned up ${deletedChapters} duplicate chapters\n`);
  }

  console.log("✨ Cleanup completed!");
}

// Main execution
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args[0] === "--help" || args[0] === "-h") {
    console.log(`
Cleanup Duplicates Script

Usage:
  npx tsx scripts/cleanup-duplicates.ts <course-slug>

Options:
  <course-slug>    Course slug to clean up (e.g., "gre-quant")
  --help, -h       Show this help message

Example:
  npx tsx scripts/cleanup-duplicates.ts gre-quant
`);
    process.exit(0);
  }

  try {
    const courseSlug = args[0];
    await cleanupDuplicates(courseSlug);
  } catch (error) {
    console.error("\n❌ Error:", error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

main();

