#!/usr/bin/env node

/**
 * Add CBSE Lessons to Existing Course Script
 * 
 * This script adds the CBSE Class 10 Mathematics lessons to your existing course
 * instead of creating a new course.
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
const csv = require('csv-parser');

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase configuration');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// CSV file path
const CSV_FILE_PATH = path.join(__dirname, '..', 'docs', 'CBSE-10-Maths-Complete-Syllabus.csv');

// Target course slug (your existing course)
const TARGET_COURSE_SLUG = 'cbse-mathematics-class-10';

/**
 * Parse CSV file and return structured data
 */
async function parseCSV() {
  return new Promise((resolve, reject) => {
    const results = [];
    
    fs.createReadStream(CSV_FILE_PATH)
      .pipe(csv())
      .on('data', (data) => {
        if (data['Unit No.'] && data['Lesson Name']) {
          results.push({
            unitNo: parseInt(data['Unit No.']),
            unitName: data['Unit Name'],
            chapterNo: parseInt(data['Chapter Number']),
            chapterName: data['Chapter Name'],
            lessonNo: parseInt(data['Lesson Number']),
            lessonName: data['Lesson Name']
          });
        }
      })
      .on('end', () => {
        console.log(`📊 Parsed ${results.length} lessons from CSV`);
        resolve(results);
      })
      .on('error', reject);
  });
}

/**
 * Find existing course
 */
async function findExistingCourse() {
  console.log(`🔍 Looking for existing course: ${TARGET_COURSE_SLUG}`);
  
  const { data: course, error } = await supabase
    .from('courses')
    .select('*')
    .eq('slug', TARGET_COURSE_SLUG)
    .single();
  
  if (error) {
    console.error('❌ Error finding course:', error);
    throw error;
  }
  
  if (!course) {
    throw new Error(`Course with slug '${TARGET_COURSE_SLUG}' not found`);
  }
  
  console.log('✅ Found existing course:', course.title);
  return course;
}

/**
 * Add lessons to existing course
 */
async function addLessonsToCourse(courseId, syllabusData) {
  console.log('📝 Adding lessons to existing course...');
  
  // Group data by units and chapters
  const units = new Map();
  const chapters = new Map();
  
  for (const item of syllabusData) {
    // Process units
    if (!units.has(item.unitNo)) {
      units.set(item.unitNo, {
        unitNo: item.unitNo,
        unitName: item.unitName,
        chapters: new Map()
      });
    }
    
    // Process chapters
    if (!chapters.has(item.chapterNo)) {
      chapters.set(item.chapterNo, {
        chapterNo: item.chapterNo,
        chapterName: item.chapterName,
        unitNo: item.unitNo,
        lessons: []
      });
    }
    
    // Add lesson to chapter
    chapters.get(item.chapterNo).lessons.push({
      lessonNo: item.lessonNo,
      lessonName: item.lessonName,
      unitNo: item.unitNo,
      chapterNo: item.chapterNo
    });
  }
  
  // Create lessons for database
  const lessons = [];
  for (const [chapterNo, chapter] of chapters) {
    for (const lesson of chapter.lessons) {
      const lessonData = {
        course_id: courseId,
        title: lesson.lessonName,
        content: `This lesson covers: ${lesson.lessonName}`,
        lesson_order: lesson.lessonNo,
        slug: `lesson-${lesson.lessonNo}-${lesson.lessonName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
        content_type: 'text',
        is_preview: lesson.lessonNo <= 5 // First 5 lessons are preview
      };
      
      lessons.push(lessonData);
    }
  }
  
  // Clear existing lessons for this course first
  console.log('🗑️  Clearing existing lessons...');
  const { error: deleteError } = await supabase
    .from('lessons')
    .delete()
    .eq('course_id', courseId);
  
  if (deleteError) {
    console.error('❌ Error clearing existing lessons:', deleteError);
    throw deleteError;
  }
  
  // Insert lessons in batches
  const batchSize = 20;
  for (let i = 0; i < lessons.length; i += batchSize) {
    const batch = lessons.slice(i, i + batchSize);
    
    const { error } = await supabase
      .from('lessons')
      .insert(batch);
    
    if (error) {
      console.error(`❌ Error inserting lessons batch ${Math.floor(i/batchSize) + 1}:`, error);
      throw error;
    }
    
    console.log(`✅ Inserted lessons ${i + 1}-${Math.min(i + batchSize, lessons.length)}`);
  }
  
  // Update course with structured syllabus data
  const structuredData = {
    units: Array.from(units.values()).map(unit => ({
      unitNo: unit.unitNo,
      unitName: unit.unitName,
      chapters: Array.from(chapters.values())
        .filter(chapter => chapter.unitNo === unit.unitNo)
        .map(chapter => ({
          chapterNo: chapter.chapterNo,
          chapterName: chapter.chapterName,
          lessonCount: chapter.lessons.length
        }))
    })),
    chapters: Array.from(chapters.values()).map(chapter => ({
      chapterNo: chapter.chapterNo,
      chapterName: chapter.chapterName,
      unitNo: chapter.unitNo,
      lessonCount: chapter.lessons.length
    })),
    lessons: lessons.map(lesson => ({
      lessonNo: lesson.lesson_order,
      lessonName: lesson.title,
      slug: lesson.slug,
      isPreview: lesson.is_preview
    }))
  };
  
  const { error: updateError } = await supabase
    .from('courses')
    .update({
      template_data: {
        curriculum: 'CBSE',
        subject: 'Mathematics',
        grade: 'Class 10',
        level: 'Secondary',
        instructor: 'Shri Arya Education',
        duration: '120 hours',
        lessons: lessons.length,
        thumbnail: '/images/cbse_logo_new.png',
        features: [
          'Complete CBSE Syllabus Coverage',
          'Unit-wise Organization',
          'Chapter-wise Breakdown',
          `${lessons.length} Structured Lessons`,
          'Practice Problems Included',
          'Real-life Applications'
        ],
        prerequisites: [
          'Basic understanding of Class 9 Mathematics',
          'Knowledge of fundamental mathematical concepts'
        ],
        learningOutcomes: [
          'Master all CBSE Class 10 Mathematics concepts',
          'Solve complex mathematical problems',
          'Apply mathematical concepts to real-life situations',
          'Prepare effectively for CBSE board examinations'
        ],
        tags: ['CBSE', 'Mathematics', 'Class 10', 'Board Exam', 'Complete Syllabus'],
        ...structuredData
      }
    })
    .eq('id', courseId);
  
  if (updateError) {
    console.error('❌ Error updating course with structured data:', updateError);
    throw updateError;
  }
  
  console.log('✅ Course updated with structured syllabus data');
  
  return {
    courseId,
    units: structuredData.units,
    chapters: structuredData.chapters,
    lessons: structuredData.lessons
  };
}

/**
 * Main function
 */
async function addLessonsToExistingCourse() {
  try {
    console.log('🚀 Adding CBSE Lessons to Existing Course...');
    console.log('📁 CSV File:', CSV_FILE_PATH);
    console.log('🎯 Target Course:', TARGET_COURSE_SLUG);
    
    // Check if CSV file exists
    if (!fs.existsSync(CSV_FILE_PATH)) {
      throw new Error(`CSV file not found: ${CSV_FILE_PATH}`);
    }
    
    // Parse CSV data
    const syllabusData = await parseCSV();
    
    if (syllabusData.length === 0) {
      throw new Error('No data found in CSV file');
    }
    
    // Find existing course
    const course = await findExistingCourse();
    
    // Add lessons to existing course
    const result = await addLessonsToCourse(course.id, syllabusData);
    
    console.log('\n🎉 CBSE Lessons Added Successfully!');
    console.log('📊 Summary:');
    console.log(`   • Course: ${course.title}`);
    console.log(`   • Course Slug: ${course.slug}`);
    console.log(`   • Units: ${result.units.length}`);
    console.log(`   • Chapters: ${result.chapters.length}`);
    console.log(`   • Lessons: ${result.lessons.length}`);
    console.log(`   • Preview Lessons: ${result.lessons.filter(l => l.isPreview).length}`);
    
    console.log('\n🌐 Access your updated course at:');
    console.log(`   https://your-domain.com/courses/${course.slug}`);
    
  } catch (error) {
    console.error('❌ Operation failed:', error.message);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  addLessonsToExistingCourse();
}

module.exports = { addLessonsToExistingCourse };
