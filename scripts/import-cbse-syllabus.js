#!/usr/bin/env node

/**
 * CBSE Syllabus Import Script
 * 
 * This script imports the CBSE Class 10 Mathematics syllabus from CSV
 * into the database, creating:
 * 1. A course template for CBSE Class 10 Mathematics
 * 2. A course instance with all units, chapters, and lessons
 * 3. Proper lesson ordering and structure
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
  console.error('Please ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// CSV file path
const CSV_FILE_PATH = path.join(__dirname, '..', 'docs', 'CBSE-10-Maths-Complete-Syllabus.csv');

// Course configuration
const COURSE_CONFIG = {
  title: 'CBSE Class 10 Mathematics',
  slug: 'cbse-class-10-mathematics',
  description: 'Complete CBSE Class 10 Mathematics curriculum covering all units, chapters, and lessons as per the official syllabus.',
  curriculum: 'CBSE',
  subject: 'Mathematics',
  grade: '10',
  level: 'Secondary',
  is_free: true,
  price: 0,
  status: 'published'
};

// Template configuration
const TEMPLATE_CONFIG = {
  name: 'CBSE Mathematics Template',
  slug: 'cbse-mathematics-template',
  description: 'Template for CBSE Mathematics courses with unit/chapter/lesson structure',
  curriculum: 'CBSE',
  subject: 'Mathematics',
  grade: '10',
  level: 'Secondary',
  structure: {
    sections: [
      {
        id: 'overview',
        title: 'Course Overview',
        type: 'overview',
        fields: ['description', 'curriculum', 'grade', 'level'],
        order: 1,
        visible: true
      },
      {
        id: 'syllabus',
        title: 'Syllabus Structure',
        type: 'syllabus',
        fields: ['units', 'chapters', 'lessons'],
        order: 2,
        visible: true
      },
      {
        id: 'lessons',
        title: 'Lessons',
        type: 'lessons',
        fields: ['lessonList'],
        order: 3,
        visible: true
      }
    ],
    layout: {
      sidebar: true,
      tabs: ['overview', 'syllabus', 'lessons'],
      gridColumns: 1
    }
  },
  fields: [
    {
      key: 'description',
      type: 'textarea',
      label: 'Course Description',
      description: 'Detailed description of the course',
      required: true,
      default_value: COURSE_CONFIG.description
    },
    {
      key: 'curriculum',
      type: 'select',
      label: 'Curriculum',
      description: 'Educational board/curriculum',
      required: true,
      options: ['CBSE', 'ICSE', 'IBDP', 'IGCSE'],
      default_value: 'CBSE'
    },
    {
      key: 'grade',
      type: 'text',
      label: 'Grade',
      description: 'Grade level',
      required: true,
      default_value: '10'
    },
    {
      key: 'level',
      type: 'select',
      label: 'Level',
      description: 'Education level',
      required: true,
      options: ['Primary', 'Secondary', 'Higher Secondary'],
      default_value: 'Secondary'
    },
    {
      key: 'units',
      type: 'array',
      label: 'Units',
      description: 'Course units',
      required: true,
      itemType: 'object',
      default_value: []
    },
    {
      key: 'chapters',
      type: 'array',
      label: 'Chapters',
      description: 'Course chapters',
      required: true,
      itemType: 'object',
      default_value: []
    },
    {
      key: 'lessons',
      type: 'array',
      label: 'Lessons',
      description: 'Course lessons',
      required: true,
      itemType: 'object',
      default_value: []
    }
  ],
  settings: {
    defaultValues: {
      instructor: 'Shri Arya Education',
      duration: '120 hours',
      lessons: 94,
      thumbnail: '/images/cbse_logo_new.png',
      features: [
        'Complete CBSE Syllabus Coverage',
        'Unit-wise Organization',
        'Chapter-wise Breakdown',
        '94 Structured Lessons',
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
      tags: ['CBSE', 'Mathematics', 'Class 10', 'Board Exam', 'Complete Syllabus']
    },
    ui: {
      showProgress: true,
      showEnrollment: true,
      showFacts: true,
      showSyllabus: true,
      showTags: true
    },
    behavior: {
      autoEnroll: true,
      requirePayment: false,
      showPreview: true
    }
  }
};

/**
 * Parse CSV file and return structured data
 */
async function parseCSV() {
  return new Promise((resolve, reject) => {
    const results = [];
    
    fs.createReadStream(CSV_FILE_PATH)
      .pipe(csv())
      .on('data', (data) => {
        // Skip empty rows
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
 * Create or update course template
 */
async function createCourseTemplate() {
  console.log('🏗️  Creating/updating course template...');
  
  // Check if template already exists
  const { data: existingTemplate } = await supabase
    .from('course_templates')
    .select('*')
    .eq('slug', TEMPLATE_CONFIG.slug)
    .single();
  
  if (existingTemplate) {
    console.log('📝 Template already exists, updating...');
    
    const { data, error } = await supabase
      .from('course_templates')
      .update(TEMPLATE_CONFIG)
      .eq('id', existingTemplate.id)
      .select()
      .single();
    
    if (error) {
      console.error('❌ Error updating template:', error);
      throw error;
    }
    
    console.log('✅ Course template updated:', data.id);
    return data;
  } else {
    const { data, error } = await supabase
      .from('course_templates')
      .insert([TEMPLATE_CONFIG])
      .select()
      .single();
    
    if (error) {
      console.error('❌ Error creating template:', error);
      throw error;
    }
    
    console.log('✅ Course template created:', data.id);
    return data;
  }
}

/**
 * Create or update course instance
 */
async function createCourse(templateId) {
  console.log('📚 Creating/updating course instance...');
  
  // Check if course already exists
  const { data: existingCourse } = await supabase
    .from('courses')
    .select('*')
    .eq('slug', COURSE_CONFIG.slug)
    .single();
  
  const courseData = {
    title: COURSE_CONFIG.title,
    description: COURSE_CONFIG.description,
    slug: COURSE_CONFIG.slug,
    is_free: COURSE_CONFIG.is_free,
    price: COURSE_CONFIG.price,
    status: COURSE_CONFIG.status,
    template_id: templateId,
    template_data: {
      ...TEMPLATE_CONFIG.settings.defaultValues,
      curriculum: COURSE_CONFIG.curriculum,
      subject: COURSE_CONFIG.subject,
      grade: COURSE_CONFIG.grade,
      level: COURSE_CONFIG.level,
      units: [],
      chapters: [],
      lessons: []
    }
  };
  
  if (existingCourse) {
    console.log('📝 Course already exists, updating...');
    
    const { data, error } = await supabase
      .from('courses')
      .update(courseData)
      .eq('id', existingCourse.id)
      .select()
      .single();
    
    if (error) {
      console.error('❌ Error updating course:', error);
      throw error;
    }
    
    console.log('✅ Course updated:', data.id);
    return data;
  } else {
    const { data, error } = await supabase
      .from('courses')
      .insert([courseData])
      .select()
      .single();
    
    if (error) {
      console.error('❌ Error creating course:', error);
      throw error;
    }
    
    console.log('✅ Course created:', data.id);
    return data;
  }
}

/**
 * Process lessons and create database entries
 */
async function processLessons(courseId, syllabusData) {
  console.log('📝 Processing lessons...');
  
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
  
  // Create lessons in database
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
  
  // Update course with structured data
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
        ...TEMPLATE_CONFIG.settings.defaultValues,
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
 * Main import function
 */
async function importCBSEsyllabus() {
  try {
    console.log('🚀 Starting CBSE Syllabus Import...');
    console.log('📁 CSV File:', CSV_FILE_PATH);
    
    // Check if CSV file exists
    if (!fs.existsSync(CSV_FILE_PATH)) {
      throw new Error(`CSV file not found: ${CSV_FILE_PATH}`);
    }
    
    // Parse CSV data
    const syllabusData = await parseCSV();
    
    if (syllabusData.length === 0) {
      throw new Error('No data found in CSV file');
    }
    
    // Create course template
    const template = await createCourseTemplate();
    
    // Create course instance
    const course = await createCourse(template.id);
    
    // Process lessons
    const result = await processLessons(course.id, syllabusData);
    
    console.log('\n🎉 CBSE Syllabus Import Completed Successfully!');
    console.log('📊 Summary:');
    console.log(`   • Course Template ID: ${template.id}`);
    console.log(`   • Course ID: ${result.courseId}`);
    console.log(`   • Course Slug: ${course.slug}`);
    console.log(`   • Units: ${result.units.length}`);
    console.log(`   • Chapters: ${result.chapters.length}`);
    console.log(`   • Lessons: ${result.lessons.length}`);
    console.log(`   • Preview Lessons: ${result.lessons.filter(l => l.isPreview).length}`);
    
    console.log('\n🌐 Access your course at:');
    console.log(`   https://your-domain.com/courses/${course.slug}`);
    
  } catch (error) {
    console.error('❌ Import failed:', error.message);
    process.exit(1);
  }
}

// Run the import
if (require.main === module) {
  importCBSEsyllabus();
}

module.exports = { importCBSEsyllabus };
