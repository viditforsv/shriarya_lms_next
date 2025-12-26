#!/usr/bin/env tsx
/**
 * Database Structure Analysis Script
 * 
 * Analyzes the current database structure for courses, chapters, topics, lessons, and tags
 * Helps identify simplification opportunities
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load environment variables
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  console.error('Required: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface Stats {
  total: number;
  withRelations: number;
  orphaned: number;
}

interface AnalysisResult {
  courses: Stats;
  units: Stats;
  chapters: Stats;
  topics: Stats;
  lessons: Stats & {
    withCourseId: number;
    withChapterId: number;
    withTopicId: number;
    redundantKeys: number;
  };
  tags: Stats;
  relationships: {
    lessonsWithoutTopic: number;
    lessonsWithoutChapter: number;
    topicsWithoutLessons: number;
    chaptersWithoutTopics: number;
  };
}

async function analyzeDatabase(): Promise<AnalysisResult> {
  console.log('🔍 Analyzing database structure...\n');

  // 1. Courses
  const { data: courses, error: coursesError } = await supabase
    .from('courses')
    .select('id');
  
  if (coursesError) throw coursesError;
  const totalCourses = courses?.length || 0;

  // 2. Units
  const { data: units, error: unitsError } = await supabase
    .from('courses_units')
    .select('id, course_id');
  
  if (unitsError) throw unitsError;
  const totalUnits = units?.length || 0;
  const unitsWithCourse = new Set(units?.map(u => u.course_id)).size;

  // 3. Chapters
  const { data: chapters, error: chaptersError } = await supabase
    .from('courses_chapters')
    .select('id, unit_id');
  
  if (chaptersError) throw chaptersError;
  const totalChapters = chapters?.length || 0;
  
  // Get unit course_ids
  const unitToCourse = new Map(units?.map(u => [u.id, u.course_id]) || []);
  const chaptersWithCourse = chapters?.filter(c => unitToCourse.has(c.unit_id)).length || 0;

  // 4. Topics
  const { data: topics, error: topicsError } = await supabase
    .from('courses_topics')
    .select('id, chapter_id');
  
  if (topicsError) throw topicsError;
  const totalTopics = topics?.length || 0;
  const topicsWithChapter = topics?.filter(t => 
    chapters?.some(c => c.id === t.chapter_id)
  ).length || 0;

  // 5. Lessons (most complex)
  const { data: lessons, error: lessonsError } = await supabase
    .from('courses_lessons')
    .select('id, course_id, chapter_id, topic_id');
  
  if (lessonsError) throw lessonsError;
  const totalLessons = lessons?.length || 0;
  
  const lessonsWithCourseId = lessons?.filter(l => l.course_id).length || 0;
  const lessonsWithChapterId = lessons?.filter(l => l.chapter_id).length || 0;
  const lessonsWithTopicId = lessons?.filter(l => l.topic_id).length || 0;
  
  // Check for redundant keys (has both topic_id and chapter_id, or topic_id and course_id)
  const redundantKeys = lessons?.filter(l => 
    (l.topic_id && l.chapter_id) || (l.topic_id && l.course_id)
  ).length || 0;

  // 6. Tags
  const { data: tags, error: tagsError } = await supabase
    .from('lesson_tags')
    .select('lesson_id, tag_name');
  
  if (tagsError) throw tagsError;
  const totalTags = tags?.length || 0;
  const uniqueTags = new Set(tags?.map(t => t.tag_name)).size;
  const lessonsWithTags = new Set(tags?.map(t => t.lesson_id)).size;

  // 7. Relationship analysis
  const lessonIds = new Set(lessons?.map(l => l.id) || []);
  const topicIds = new Set(topics?.map(t => t.id) || []);
  const chapterIds = new Set(chapters?.map(c => c.id) || []);

  const lessonsWithoutTopic = lessons?.filter(l => !l.topic_id).length || 0;
  const lessonsWithoutChapter = lessons?.filter(l => !l.chapter_id).length || 0;
  
  const topicsWithoutLessons = topics?.filter(t => 
    !lessons?.some(l => l.topic_id === t.id)
  ).length || 0;
  
  const chaptersWithoutTopics = chapters?.filter(c =>
    !topics?.some(t => t.chapter_id === c.id)
  ).length || 0;

  return {
    courses: {
      total: totalCourses,
      withRelations: totalCourses, // All courses should have units
      orphaned: 0,
    },
    units: {
      total: totalUnits,
      withRelations: unitsWithCourse,
      orphaned: totalUnits - unitsWithCourse,
    },
    chapters: {
      total: totalChapters,
      withRelations: chaptersWithCourse,
      orphaned: totalChapters - chaptersWithCourse,
    },
    topics: {
      total: totalTopics,
      withRelations: topicsWithChapter,
      orphaned: totalTopics - topicsWithChapter,
    },
    lessons: {
      total: totalLessons,
      withRelations: totalLessons,
      orphaned: 0,
      withCourseId: lessonsWithCourseId,
      withChapterId: lessonsWithChapterId,
      withTopicId: lessonsWithTopicId,
      redundantKeys,
    },
    tags: {
      total: totalTags,
      withRelations: lessonsWithTags,
      orphaned: totalTags - lessonsWithTags,
    },
    relationships: {
      lessonsWithoutTopic,
      lessonsWithoutChapter,
      topicsWithoutLessons,
      chaptersWithoutTopics,
    },
  };
}

function printAnalysis(result: AnalysisResult) {
  console.log('📊 Database Structure Analysis Results\n');
  console.log('═'.repeat(60));
  
  console.log('\n📚 Table Counts:');
  console.log(`  Courses:     ${result.courses.total}`);
  console.log(`  Units:       ${result.units.total}`);
  console.log(`  Chapters:    ${result.chapters.total}`);
  console.log(`  Topics:      ${result.topics.total}`);
  console.log(`  Lessons:    ${result.lessons.total}`);
  console.log(`  Tags:       ${result.tags.total} (${new Set().size} unique)`);
  
  console.log('\n🔗 Foreign Key Usage in Lessons:');
  console.log(`  Lessons with course_id:  ${result.lessons.withCourseId} (${((result.lessons.withCourseId / result.lessons.total) * 100).toFixed(1)}%)`);
  console.log(`  Lessons with chapter_id:  ${result.lessons.withChapterId} (${((result.lessons.withChapterId / result.lessons.total) * 100).toFixed(1)}%)`);
  console.log(`  Lessons with topic_id:    ${result.lessons.withTopicId} (${((result.lessons.withTopicId / result.lessons.total) * 100).toFixed(1)}%)`);
  console.log(`  ⚠️  Redundant keys:        ${result.lessons.redundantKeys} (lessons with both topic_id and chapter_id/course_id)`);
  
  console.log('\n🔍 Relationship Analysis:');
  console.log(`  Lessons without topic_id:     ${result.relationships.lessonsWithoutTopic}`);
  console.log(`  Lessons without chapter_id:  ${result.relationships.lessonsWithoutChapter}`);
  console.log(`  Topics without lessons:       ${result.relationships.topicsWithoutLessons}`);
  console.log(`  Chapters without topics:      ${result.relationships.chaptersWithoutTopics}`);
  
  console.log('\n💡 Simplification Opportunities:');
  
  if (result.lessons.redundantKeys > 0) {
    console.log(`  ⚠️  ${result.lessons.redundantKeys} lessons have redundant foreign keys`);
    console.log('     → Consider removing course_id and chapter_id, keep only topic_id');
  }
  
  if (result.relationships.topicsWithoutLessons > result.topics.total * 0.5) {
    console.log(`  ⚠️  ${result.relationships.topicsWithoutLessons} topics have no lessons (${((result.relationships.topicsWithoutLessons / result.topics.total) * 100).toFixed(1)}%)`);
    console.log('     → Consider merging topics into chapters');
  }
  
  if (result.relationships.chaptersWithoutTopics > result.chapters.total * 0.3) {
    console.log(`  ⚠️  ${result.relationships.chaptersWithoutTopics} chapters have no topics (${((result.relationships.chaptersWithoutTopics / result.chapters.total) * 100).toFixed(1)}%)`);
    console.log('     → Topics might be optional - consider making them nullable or merging');
  }
  
  if (result.tags.total > 0 && result.tags.total < result.lessons.total * 2) {
    console.log(`  💡 Only ${result.tags.total} tags for ${result.lessons.total} lessons`);
    console.log('     → Consider converting tags table to array field on lessons');
  }
  
  console.log('\n' + '═'.repeat(60));
}

async function main() {
  try {
    const result = await analyzeDatabase();
    printAnalysis(result);
  } catch (error) {
    console.error('❌ Error analyzing database:', error);
    process.exit(1);
  }
}

main();

