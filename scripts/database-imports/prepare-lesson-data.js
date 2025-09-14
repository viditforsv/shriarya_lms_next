#!/usr/bin/env node

/**
 * Prepare Lesson Data Script
 *
 * This script processes the CBSE Mathematics CSV and adds:
 * - Lesson slugs (URL-friendly identifiers)
 * - Lesson numbers (sequential ordering)
 * - Additional required fields for database import
 */

const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

// Function to create URL-friendly slug from lesson name
function createSlug(lessonName) {
  return lessonName
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters except spaces and hyphens
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, ""); // Remove leading/trailing hyphens
}

// Function to create lesson ID (UUID-like format for consistency)
function createLessonId(lessonNumber) {
  const paddedNumber = lessonNumber.toString().padStart(3, "0");
  return `lesson-${paddedNumber}`;
}

// Function to determine if lesson is preview based on lesson number
function isPreviewLesson(lessonNumber) {
  // First 3 lessons of each unit are preview
  const unitStartLessons = [1, 7, 32, 38, 53, 72, 82];
  return unitStartLessons.includes(lessonNumber);
}

// Function to create content HTML placeholder
function createContentHTML(lessonName, unitName, chapterName) {
  return `
<div class="lesson-content">
  <h2>${lessonName}</h2>
  <div class="lesson-meta">
    <p><strong>Unit:</strong> ${unitName}</p>
    <p><strong>Chapter:</strong> ${chapterName}</p>
  </div>
  
  <div class="lesson-body">
    <h3>Learning Objectives</h3>
    <p>In this lesson, you will learn:</p>
    <ul>
      <li>Key concepts and principles</li>
      <li>Step-by-step problem solving</li>
      <li>Real-world applications</li>
    </ul>
    
    <h3>Key Concepts</h3>
    <p>Detailed explanation of the main concepts covered in this lesson.</p>
    
    <h3>Examples and Practice</h3>
    <p>Worked examples and practice problems to reinforce learning.</p>
    
    <div class="key-points">
      <h4>🔑 Key Points:</h4>
      <ul>
        <li>Important concept 1</li>
        <li>Important concept 2</li>
        <li>Important concept 3</li>
      </ul>
    </div>
    
    <div class="quiz-section">
      <h4>❓ Quick Quiz:</h4>
      <p>Test your understanding with these questions:</p>
      <ol>
        <li>Question 1</li>
        <li>Question 2</li>
        <li>Question 3</li>
      </ol>
    </div>
  </div>
</div>
  `.trim();
}

// Function to create key points JSON
function createKeyPoints(lessonName, unitName) {
  return [
    `Understanding ${lessonName}`,
    `Application in ${unitName}`,
    "Problem-solving techniques",
    "Real-world connections",
  ];
}

async function processLessons() {
  const inputFile = path.join(
    __dirname,
    "..",
    "database",
    "CBSE 10 Maths _ MQB Master - cbse_10_maths.csv"
  );
  const outputFile = path.join(
    __dirname,
    "..",
    "database",
    "cbse-lessons-enhanced.csv"
  );

  console.log("📚 Processing CBSE Mathematics lessons...");
  console.log(`📖 Reading from: ${inputFile}`);

  const lessons = [];
  let lessonCounter = 1;

  return new Promise((resolve, reject) => {
    fs.createReadStream(inputFile)
      .pipe(csv())
      .on("data", (row) => {
        const lessonName = row["Lesson Name"].trim();
        const unitName = row["Unit Name"].trim();
        const chapterName = row["Chapter Name"].trim();
        const unitNo = parseInt(row["Unit No."]);
        const chapterNo = parseInt(row["Chapter Number"]);

        // Create lesson data
        const lesson = {
          id: createLessonId(lessonCounter),
          slug: createSlug(lessonName),
          title: lessonName,
          unit_no: unitNo,
          unit_name: unitName,
          chapter_no: chapterNo,
          chapter_name: chapterName,
          lesson_number: lessonCounter,
          lesson_order: lessonCounter,
          is_preview: isPreviewLesson(lessonCounter),
          content_html: createContentHTML(lessonName, unitName, chapterName),
          content: `Lesson ${lessonCounter}: ${lessonName}\n\nUnit: ${unitName}\nChapter: ${chapterName}\n\nThis lesson covers important concepts and problem-solving techniques.`,
          key_points: JSON.stringify(createKeyPoints(lessonName, unitName)),
          video_url: null, // To be filled later
          video_thumbnail: null, // To be filled later
          pdf_url: null, // To be filled later
          quiz_id: null, // To be filled later
          course_id: "cbse-mathematics-class-10", // Will be updated with actual course ID
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        lessons.push(lesson);
        lessonCounter++;
      })
      .on("end", () => {
        console.log(`✅ Processed ${lessons.length} lessons`);

        // Convert to CSV
        const csvContent = convertToCSV(lessons);

        // Write to file
        fs.writeFileSync(outputFile, csvContent);
        console.log(`💾 Enhanced CSV saved to: ${outputFile}`);

        // Display summary
        console.log("\n📊 Summary:");
        console.log(`- Total lessons: ${lessons.length}`);
        console.log(
          `- Preview lessons: ${lessons.filter((l) => l.is_preview).length}`
        );
        console.log(
          `- Units covered: ${new Set(lessons.map((l) => l.unit_no)).size}`
        );
        console.log(
          `- Chapters covered: ${
            new Set(lessons.map((l) => l.chapter_no)).size
          }`
        );

        // Show sample lessons
        console.log("\n🔍 Sample lessons:");
        lessons.slice(0, 5).forEach((lesson) => {
          console.log(
            `  ${lesson.lesson_number}. ${lesson.title} (${lesson.slug})`
          );
        });

        resolve(lessons);
      })
      .on("error", reject);
  });
}

// Function to convert array of objects to CSV
function convertToCSV(data) {
  if (data.length === 0) return "";

  const headers = Object.keys(data[0]);
  const csvRows = [];

  // Add header row
  csvRows.push(headers.join(","));

  // Add data rows
  data.forEach((row) => {
    const values = headers.map((header) => {
      const value = row[header];
      // Escape commas and quotes in values
      if (
        typeof value === "string" &&
        (value.includes(",") || value.includes('"'))
      ) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value;
    });
    csvRows.push(values.join(","));
  });

  return csvRows.join("\n");
}

// Run the script
if (require.main === module) {
  processLessons()
    .then(() => {
      console.log("\n🎉 Lesson data preparation completed successfully!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("❌ Error processing lessons:", error);
      process.exit(1);
    });
}

module.exports = { processLessons, createSlug, createLessonId };
