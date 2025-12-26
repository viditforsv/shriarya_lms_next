#!/usr/bin/env tsx
/**
 * Course Creation CLI Tool
 * 
 * Creates courses via Supabase API using service role key
 * Supports creating courses with full 5-tier hierarchy
 * 
 * Usage:
 *   npx tsx scripts/create-course.ts <course-data.json>
 *   npx tsx scripts/create-course.ts --interactive
 */

import { config } from "dotenv";
import { resolve } from "path";

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), ".env.local") });

import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import {
  getSupabaseUrl,
  getSupabaseServiceRoleKey,
} from "../src/lib/supabase/env";

interface CourseData {
  title: string;
  slug: string;
  description?: string;
  curriculum?: string;
  subject?: string;
  grade?: string;
  level?: string;
  price?: number;
  validity_days?: number;
  status?: "draft" | "published" | "archived";
  thumbnail_url?: string;
  template_data?: {
    units?: Array<{
      unit_name: string;
      unit_order: number;
      description?: string;
      chapters?: Array<{
        chapter_name: string;
        chapter_order: number;
        description?: string;
        topics?: Array<{
          topic_name: string;
          topic_order: number;
          lessons?: Array<{
            title: string;
            slug: string;
            lesson_order: number;
            description?: string;
            content?: string;
            type?: "video" | "document" | "quiz" | "assignment";
          }>;
        }>;
      }>;
    }>;
    tags?: string[];
    learningOutcomes?: string[];
    prerequisites?: string[];
  };
}

async function createCourse(courseData: CourseData, instructorId?: string, updateIfExists: boolean = false) {
  const supabaseUrl = getSupabaseUrl();
  const serviceRoleKey = getSupabaseServiceRoleKey();

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "Missing Supabase credentials. Set NEXT_PUBLIC_SUPABASE_URL_DEV/PROD and SUPABASE_SERVICE_ROLE_KEY_DEV/PROD"
    );
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  // Validate instructor_id if provided
  let validInstructorId: string | null = null;
  if (instructorId) {
    const { data: instructor, error: instructorError } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", instructorId)
      .single();

    if (instructorError || !instructor) {
      console.warn(`⚠️  Instructor ID ${instructorId} not found. Creating course without instructor.`);
      validInstructorId = null;
    } else {
      validInstructorId = instructorId;
      console.log(`✅ Instructor verified: ${instructorId}`);
    }
  }

  // Check if course already exists
  const { data: existingCourse } = await supabase
    .from("courses")
    .select("id, title, slug")
    .eq("slug", courseData.slug)
    .single();

  let course;

  if (existingCourse) {
    if (!updateIfExists) {
      throw new Error(
        `Course with slug "${courseData.slug}" already exists (ID: ${existingCourse.id}). Use --update flag to update it.`
      );
    }

    console.log("🔄 Course already exists, updating...");
    console.log(`   Title: ${courseData.title}`);
    console.log(`   Slug: ${courseData.slug}`);
    console.log(`   Status: ${courseData.status || "draft"}`);

    // Update the course
    const { data: updatedCourse, error: updateError } = await supabase
      .from("courses")
      .update({
        title: courseData.title,
        description: courseData.description || null,
        curriculum: courseData.curriculum || null,
        subject: courseData.subject || null,
        grade: courseData.grade || null,
        level: courseData.level || null,
        price: courseData.price || 0,
        validity_days: courseData.validity_days || 365,
        status: courseData.status || "draft",
        thumbnail_url: courseData.thumbnail_url || null,
        template_data: courseData.template_data || {},
        instructor_id: validInstructorId,
        updated_at: new Date().toISOString(),
      })
      .eq("id", existingCourse.id)
      .select()
      .single();

    if (updateError) {
      throw new Error(`Failed to update course: ${updateError.message}`);
    }

    course = updatedCourse;
    console.log(`✅ Course updated with ID: ${course.id}`);
  } else {
    console.log("🔧 Creating course...");
    console.log(`   Title: ${courseData.title}`);
    console.log(`   Slug: ${courseData.slug}`);
    console.log(`   Status: ${courseData.status || "draft"}`);

    // Create the course
    const { data: newCourse, error: courseError } = await supabase
      .from("courses")
      .insert({
        title: courseData.title,
        slug: courseData.slug,
        description: courseData.description || null,
        curriculum: courseData.curriculum || null,
        subject: courseData.subject || null,
        grade: courseData.grade || null,
        level: courseData.level || null,
        price: courseData.price || 0,
        validity_days: courseData.validity_days || 365,
        status: courseData.status || "draft",
        thumbnail_url: courseData.thumbnail_url || null,
        template_data: courseData.template_data || {},
        instructor_id: validInstructorId,
      })
      .select()
      .single();

    if (courseError) {
      throw new Error(`Failed to create course: ${courseError.message}`);
    }

    course = newCourse;
    console.log(`✅ Course created with ID: ${course.id}`);
  }

  // Create units, chapters, topics, and lessons if provided
  if (courseData.template_data?.units && courseData.template_data.units.length > 0) {
    console.log("\n📚 Creating course structure...");
    await createCourseStructure(supabase, course.id, courseData.template_data.units);
  }

  return course;
}

async function createCourseStructure(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabase: SupabaseClient<any>,
  courseId: string,
  units: NonNullable<CourseData["template_data"]>["units"]
) {
  if (!units) return;

  for (const unit of units) {
    console.log(`\n   Creating unit: ${unit.unit_name}`);

    // Check if unit already exists
    const { data: existingUnit } = await supabase
      .from("courses_units")
      .select("id")
      .eq("course_id", courseId)
      .eq("unit_name", unit.unit_name)
      .eq("unit_order", unit.unit_order)
      .single();

    let createdUnit;
    if (existingUnit) {
      console.log(`   ⚠️  Unit already exists, using: ${existingUnit.id}`);
      createdUnit = existingUnit;
    } else {
      // Create unit
      const { data: newUnit, error: unitError } = await supabase
        .from("courses_units")
        .insert({
          course_id: courseId,
          unit_name: unit.unit_name,
          unit_order: unit.unit_order,
          description: unit.description || null,
          is_locked: false,
        })
        .select()
        .single();

      if (unitError) {
        console.error(`   ❌ Failed to create unit: ${unitError.message}`);
        continue;
      }

      createdUnit = newUnit;
      console.log(`   ✅ Unit created: ${createdUnit.id}`);
    }

    // Create chapters
    if (unit.chapters && unit.chapters.length > 0) {
      for (const chapter of unit.chapters) {
        console.log(`      Creating chapter: ${chapter.chapter_name}`);

        // Check if chapter already exists
        const { data: existingChapter } = await supabase
          .from("courses_chapters")
          .select("id")
          .eq("unit_id", createdUnit.id)
          .eq("chapter_name", chapter.chapter_name)
          .eq("chapter_order", chapter.chapter_order)
          .single();

        let createdChapter;
        if (existingChapter) {
          console.log(`      ⚠️  Chapter already exists, using: ${existingChapter.id}`);
          createdChapter = existingChapter;
        } else {
          const { data: newChapter, error: chapterError } = await supabase
            .from("courses_chapters")
            .insert({
              unit_id: createdUnit.id,
              chapter_name: chapter.chapter_name,
              chapter_order: chapter.chapter_order,
              description: chapter.description || null,
              is_locked: false,
            })
            .select()
            .single();

          if (chapterError) {
            console.error(`      ❌ Failed to create chapter: ${chapterError.message}`);
            continue;
          }

          createdChapter = newChapter;
          console.log(`      ✅ Chapter created: ${createdChapter.id}`);
        }

        // Create topics
        if (chapter.topics && chapter.topics.length > 0) {
          for (const topic of chapter.topics) {
            console.log(`         Creating topic: ${topic.topic_name}`);

            // Check if topic already exists
            const { data: existingTopic } = await supabase
              .from("courses_topics")
              .select("id")
              .eq("chapter_id", createdChapter.id)
              .eq("topic_name", topic.topic_name)
              .eq("topic_order", topic.topic_order)
              .single();

            let createdTopic;
            if (existingTopic) {
              console.log(`         ⚠️  Topic already exists, using: ${existingTopic.id}`);
              createdTopic = existingTopic;
            } else {
              const { data: newTopic, error: topicError } = await supabase
                .from("courses_topics")
                .insert({
                  chapter_id: createdChapter.id,
                  topic_name: topic.topic_name,
                  topic_order: topic.topic_order,
                  topic_number: String(topic.topic_order),
                })
                .select()
                .single();

              if (topicError) {
                console.error(`         ❌ Failed to create topic: ${topicError.message}`);
                continue;
              }

              createdTopic = newTopic;
              console.log(`         ✅ Topic created: ${createdTopic.id}`);
            }

            // Create lessons
            if (topic.lessons && topic.lessons.length > 0) {
              for (const lesson of topic.lessons) {
                console.log(`            Creating lesson: ${lesson.title}`);

                // Check if lesson already exists (by slug)
                const { data: existingLesson } = await supabase
                  .from("courses_lessons")
                  .select("id")
                  .eq("course_id", courseId)
                  .eq("slug", lesson.slug)
                  .single();

                if (existingLesson) {
                  console.log(`            ⚠️  Lesson already exists, skipping: ${existingLesson.id}`);
                  continue;
                }

                const { data: createdLesson, error: lessonError } = await supabase
                  .from("courses_lessons")
                  .insert({
                    course_id: courseId,
                    chapter_id: createdChapter.id,
                    topic_id: createdTopic.id,
                    title: lesson.title,
                    slug: lesson.slug,
                    content: lesson.content || null,
                    lesson_order: lesson.lesson_order,
                    is_preview: false,
                  })
                  .select()
                  .single();

                if (lessonError) {
                  console.error(`            ❌ Failed to create lesson: ${lessonError.message}`);
                  continue;
                }

                console.log(`            ✅ Lesson created: ${createdLesson.id}`);
              }
            }
          }
        }
      }
    }
  }
}

// Main execution
async function main() {
  const args = process.argv.slice(2);

  // Check for --update flag
  const updateIfExists = args.includes("--update");
  const filteredArgs = args.filter((arg) => arg !== "--update");

  if (filteredArgs.length === 0 || filteredArgs[0] === "--help" || filteredArgs[0] === "-h") {
    console.log(`
Course Creation CLI Tool

Usage:
  npx tsx scripts/create-course.ts <course-data.json> [instructor-id] [--update]
  npx tsx scripts/create-course.ts --interactive

Options:
  <course-data.json>    Path to JSON file with course data
  [instructor-id]       Optional instructor UUID
  --update              Update existing course if slug already exists
  --interactive          Interactive mode (coming soon)
  --help, -h            Show this help message

Example JSON structure:
{
  "title": "Mathematics Grade 9",
  "slug": "mathematics-grade-9",
  "description": "Complete Grade 9 Mathematics course",
  "curriculum": "CBSE",
  "subject": "Mathematics",
  "grade": "9",
  "level": "intermediate",
  "price": 0,
  "status": "draft",
  "template_data": {
    "units": [
      {
        "unit_name": "Algebra",
        "unit_order": 1,
        "chapters": [
          {
            "chapter_name": "Linear Equations",
            "chapter_order": 1,
            "topics": [
              {
                "topic_name": "Solving Linear Equations",
                "topic_order": 1,
                "lessons": [
                  {
                    "title": "Introduction to Linear Equations",
                    "slug": "intro-linear-equations",
                    "lesson_order": 1
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
}
`);
    process.exit(0);
  }

  try {
    let courseData: CourseData;

    if (filteredArgs[0] === "--interactive") {
      console.log("Interactive mode coming soon!");
      console.log("For now, please use a JSON file.");
      process.exit(1);
    } else {
      // Read from JSON file
      const filePath = resolve(process.cwd(), filteredArgs[0]);
      console.log(`📖 Reading course data from: ${filePath}`);
      
      const fileContent = readFileSync(filePath, "utf-8");
      courseData = JSON.parse(fileContent);
    }

    // Validate required fields
    if (!courseData.title || !courseData.slug) {
      throw new Error("Course data must include 'title' and 'slug'");
    }

    // Get instructor ID if provided
    const instructorId = filteredArgs[1] || process.env.INSTRUCTOR_ID || undefined;

    if (updateIfExists) {
      console.log("🔄 Update mode: Will update existing course if found");
    }

    // Create the course
    const course = await createCourse(courseData, instructorId, updateIfExists);

    console.log("\n✅ Course creation completed!");
    console.log(`\n📋 Course Details:`);
    console.log(`   ID: ${course.id}`);
    console.log(`   Title: ${course.title}`);
    console.log(`   Slug: ${course.slug}`);
    console.log(`   Status: ${course.status}`);
    console.log(`\n🔗 View course: ${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/courses/${course.slug}`);

  } catch (error) {
    console.error("\n❌ Error:", error instanceof Error ? error.message : String(error));
    if (error instanceof Error && error.stack) {
      console.error("\nStack trace:", error.stack);
    }
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}

