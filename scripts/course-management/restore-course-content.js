#!/usr/bin/env node

/**
 * Restore Course Content from Backup Script
 * 
 * This script extracts the good content from the backup and integrates it
 * into the existing course structure with the complete 93 lessons.
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase configuration');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Backup file path
const BACKUP_FILE_PATH = path.join(__dirname, '..', 'shriarya-lms-backup-2025-09-11-1757569174592.json');

// Target course slug
const TARGET_COURSE_SLUG = 'cbse-mathematics-class-10';

/**
 * Load backup data
 */
function loadBackupData() {
  if (!fs.existsSync(BACKUP_FILE_PATH)) {
    throw new Error(`Backup file not found: ${BACKUP_FILE_PATH}`);
  }
  
  const backupContent = fs.readFileSync(BACKUP_FILE_PATH, 'utf8');
  return JSON.parse(backupContent);
}

/**
 * Extract course data from backup
 */
function extractCourseData(backupData) {
  const courses = backupData.tables.courses.data;
  const lessons = backupData.tables.lessons.data;
  const resources = backupData.tables.resources.data;
  
  // Find the CBSE course from backup
  const cbseCourse = courses.find(course => course.slug === 'cbse-mathematics-class-10');
  
  if (!cbseCourse) {
    throw new Error('CBSE course not found in backup');
  }
  
  // Get lessons for this course
  const courseLessons = lessons.filter(lesson => lesson.course_id === cbseCourse.id);
  
  // Get resources for these lessons
  const lessonIds = courseLessons.map(lesson => lesson.id);
  const courseResources = resources.filter(resource => lessonIds.includes(resource.lesson_id));
  
  return {
    course: cbseCourse,
    lessons: courseLessons,
    resources: courseResources
  };
}

/**
 * Find existing course in database
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
 * Restore course content
 */
async function restoreCourseContent(existingCourse, backupData) {
  console.log('🔄 Restoring course content from backup...');
  
  // Extract enhanced course data
  const enhancedTemplateData = {
    ...existingCourse.template_data,
    
    // Enhanced course overview from backup
    description: backupData.course.description,
    features: backupData.course.template_data.features,
    prerequisites: backupData.course.template_data.prerequisites,
    learningOutcomes: backupData.course.template_data.learningOutcomes,
    tags: backupData.course.template_data.tags,
    thumbnail: backupData.course.template_data.thumbnail,
    
    // Enhanced syllabus content structure
    syllabusContent: backupData.course.template_data.syllabusContent,
    
    // Keep the complete lesson structure we added
    units: existingCourse.template_data.units,
    chapters: existingCourse.template_data.chapters,
    lessons: existingCourse.template_data.lessons
  };
  
  // Update course with enhanced content
  const { error: updateError } = await supabase
    .from('courses')
    .update({
      description: backupData.course.description,
      template_data: enhancedTemplateData
    })
    .eq('id', existingCourse.id);
  
  if (updateError) {
    console.error('❌ Error updating course:', updateError);
    throw updateError;
  }
  
  console.log('✅ Course overview and features restored');
  
  return enhancedTemplateData;
}

/**
 * Restore lesson content
 */
async function restoreLessonContent(existingCourse, backupData) {
  console.log('📝 Restoring detailed lesson content...');
  
  const backupLessons = backupData.lessons;
  
  // Get current lessons
  const { data: currentLessons, error: lessonsError } = await supabase
    .from('lessons')
    .select('*')
    .eq('course_id', existingCourse.id)
    .order('lesson_order');
  
  if (lessonsError) {
    console.error('❌ Error fetching current lessons:', lessonsError);
    throw lessonsError;
  }
  
  // Create a mapping of lesson titles to restore content
  const lessonContentMap = new Map();
  backupLessons.forEach(lesson => {
    lessonContentMap.set(lesson.title, {
      content: lesson.content,
      content_html: lesson.content_html,
      content_text: lesson.content_text,
      content_type: lesson.content_type
    });
  });
  
  // Update lessons with restored content
  let updatedCount = 0;
  for (const currentLesson of currentLessons) {
    const backupContent = lessonContentMap.get(currentLesson.title);
    
    if (backupContent && (backupContent.content_html || backupContent.content)) {
      const { error: updateError } = await supabase
        .from('lessons')
        .update({
          content: backupContent.content,
          content_html: backupContent.content_html,
          content_text: backupContent.content_text,
          content_type: backupContent.content_type
        })
        .eq('id', currentLesson.id);
      
      if (updateError) {
        console.error(`❌ Error updating lesson ${currentLesson.title}:`, updateError);
        continue;
      }
      
      updatedCount++;
      console.log(`✅ Restored content for: ${currentLesson.title}`);
    }
  }
  
  console.log(`📊 Updated ${updatedCount} lessons with detailed content`);
  
  // Restore resources
  await restoreResources(existingCourse, backupData, currentLessons);
}

/**
 * Restore resources
 */
async function restoreResources(existingCourse, backupData, currentLessons) {
  const backupResources = backupData.resources;
  console.log('📎 Restoring lesson resources...');
  
  // Create mapping of lesson titles to IDs
  const lessonTitleToId = new Map();
  currentLessons.forEach(lesson => {
    lessonTitleToId.set(lesson.title, lesson.id);
  });
  
  // Get existing resources for this course
  const lessonIds = currentLessons.map(lesson => lesson.id);
  const { data: existingResources, error: existingError } = await supabase
    .from('resources')
    .select('*')
    .in('lesson_id', lessonIds);
  
  if (existingError) {
    console.error('❌ Error fetching existing resources:', existingError);
    return;
  }
  
  // Clear existing resources
  if (existingResources && existingResources.length > 0) {
    const { error: deleteError } = await supabase
      .from('resources')
      .delete()
      .in('lesson_id', lessonIds);
    
    if (deleteError) {
      console.error('❌ Error clearing existing resources:', deleteError);
      return;
    }
    
    console.log(`🗑️  Cleared ${existingResources.length} existing resources`);
  }
  
  // Create a mapping of backup lesson IDs to current lesson titles
  const backupLessonIdToTitle = new Map();
  backupData.lessons.forEach(lesson => {
    backupLessonIdToTitle.set(lesson.id, lesson.title);
  });
  
  // Restore resources from backup
  let restoredCount = 0;
  for (const backupResource of backupResources) {
    // Find the lesson title from backup lesson ID
    const lessonTitle = backupLessonIdToTitle.get(backupResource.lesson_id);
    
    if (lessonTitle) {
      // Find the corresponding lesson in current course
      const currentLesson = currentLessons.find(lesson => lesson.title === lessonTitle);
      
      if (currentLesson) {
        const resourceData = {
          lesson_id: currentLesson.id,
          kind: backupResource.kind,
          url: backupResource.url,
          mime: backupResource.mime,
          duration_sec: backupResource.duration_sec,
          title: backupResource.title,
          description: backupResource.description,
          file_size: backupResource.file_size,
          cdn_url: backupResource.cdn_url,
          local_url: backupResource.local_url,
          upload_status: backupResource.upload_status
        };
        
        const { error: insertError } = await supabase
          .from('resources')
          .insert([resourceData]);
        
        if (insertError) {
          console.error(`❌ Error inserting resource for ${currentLesson.title}:`, insertError);
          continue;
        }
        
        restoredCount++;
        console.log(`✅ Restored resource: ${backupResource.title} for ${lessonTitle}`);
      }
    }
  }
  
  console.log(`📊 Restored ${restoredCount} resources`);
}

/**
 * Main function
 */
async function restoreCourseFromBackup() {
  try {
    console.log('🚀 Restoring Course Content from Backup...');
    console.log('📁 Backup File:', BACKUP_FILE_PATH);
    console.log('🎯 Target Course:', TARGET_COURSE_SLUG);
    
    // Load backup data
    const backupData = loadBackupData();
    console.log('✅ Backup data loaded');
    
    // Extract course data from backup
    const extractedData = extractCourseData(backupData);
    console.log(`📊 Found ${extractedData.lessons.length} lessons and ${extractedData.resources.length} resources in backup`);
    
    // Find existing course
    const existingCourse = await findExistingCourse();
    
    // Restore course content
    const enhancedTemplateData = await restoreCourseContent(existingCourse, extractedData);
    
    // Restore lesson content
    await restoreLessonContent(existingCourse, extractedData);
    
    console.log('\n🎉 Course Content Restored Successfully!');
    console.log('📊 Summary:');
    console.log(`   • Course: ${existingCourse.title}`);
    console.log(`   • Course Slug: ${existingCourse.slug}`);
    console.log(`   • Enhanced Description: ✅`);
    console.log(`   • Enhanced Features: ✅`);
    console.log(`   • Enhanced Prerequisites: ✅`);
    console.log(`   • Enhanced Learning Outcomes: ✅`);
    console.log(`   • Detailed Lesson Content: ✅`);
    console.log(`   • Lesson Resources: ✅`);
    console.log(`   • Complete Syllabus Structure: ✅`);
    
    console.log('\n🌐 Access your enhanced course at:');
    console.log(`   https://your-domain.com/courses/${existingCourse.slug}`);
    
  } catch (error) {
    console.error('❌ Operation failed:', error.message);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  restoreCourseFromBackup();
}

module.exports = { restoreCourseFromBackup };
