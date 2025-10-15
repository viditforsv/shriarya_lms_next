-- Add Tests Unit and Chapters for CBSE Mathematics Class 9
-- Run this after populate_cbse_class9_structure.sql

-- Insert Tests Unit (order 7, after Statistics)
INSERT INTO courses_units (course_id, unit_name, unit_order, description)
SELECT 
  c.id,
  'Tests',
  7,
  'Chapter tests and full syllabus assessments'
FROM courses c
WHERE c.slug = 'cbse-mathematics-class-9';

-- Insert Test Chapters
INSERT INTO courses_chapters (unit_id, chapter_name, chapter_order, description)
SELECT 
  u.id,
  chapter_data.chapter_name,
  chapter_data.chapter_order,
  chapter_data.description
FROM courses c
JOIN courses_units u ON u.course_id = c.id
CROSS JOIN LATERAL (
  VALUES 
    ('Full Syllabus', 1, 'Complete syllabus test'),
    ('Half Syllabus', 2, 'Half syllabus test'),
    ('Chapter Tests', 3, 'Individual chapter tests')
) AS chapter_data(chapter_name, chapter_order, description)
WHERE c.slug = 'cbse-mathematics-class-9'
  AND u.unit_name = 'Tests';

-- Verify the structure
SELECT 
  c.title as course,
  u.unit_order,
  u.unit_name,
  ch.chapter_order,
  ch.chapter_name,
  ch.description
FROM courses c
JOIN courses_units u ON u.course_id = c.id
JOIN courses_chapters ch ON ch.unit_id = u.id
WHERE c.slug = 'cbse-mathematics-class-9'
  AND u.unit_name = 'Tests'
ORDER BY u.unit_order, ch.chapter_order;

