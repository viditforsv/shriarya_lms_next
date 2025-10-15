-- Populate Units and Chapters for CBSE Mathematics Class 9
-- Run this script in Supabase SQL Editor

-- Step 1: Insert Units
INSERT INTO courses_units (course_id, unit_name, unit_order, description)
SELECT 
  c.id,
  unit_data.unit_name,
  unit_data.unit_order,
  NULL
FROM courses c
CROSS JOIN (
  VALUES 
    ('Number systems', 1),
    ('Algebra', 2),
    ('Coordinate Geometry', 3),
    ('Geometry', 4),
    ('Mensuration', 5),
    ('Statistics', 6)
) AS unit_data(unit_name, unit_order)
WHERE c.slug = 'cbse-mathematics-class-9';

-- Step 2: Insert Chapters (linked to units)
INSERT INTO courses_chapters (unit_id, chapter_name, chapter_order, description)
SELECT 
  u.id,
  chapter_data.chapter_name,
  chapter_data.chapter_order,
  NULL
FROM courses c
JOIN courses_units u ON u.course_id = c.id
CROSS JOIN LATERAL (
  VALUES 
    -- Number systems unit chapters
    (1, 'Real Numbers', 1),
    -- Algebra unit chapters
    (2, 'Polynomials', 1),
    (2, 'Linear Equations in Two Variables', 2),
    -- Coordinate Geometry unit chapters
    (3, 'Coordinate Geometry', 1),
    -- Geometry unit chapters
    (4, 'Introduction to Euclid Geometry', 1),
    (4, 'Lines and Angles', 2),
    (4, 'Triangles', 3),
    (4, 'Quadrilaterals', 4),
    (4, 'Circles', 5),
    -- Mensuration unit chapters
    (5, 'Areas of a triangle using Heron''s Formula', 1),
    (5, 'Surface Areas and Volumes', 2),
    -- Statistics unit chapters
    (6, 'Statistics', 1)
) AS chapter_data(unit_order_ref, chapter_name, chapter_order)
WHERE c.slug = 'cbse-mathematics-class-9'
  AND u.unit_order = chapter_data.unit_order_ref;

-- Step 3: Verify the structure
SELECT 
  c.title as course,
  u.unit_order,
  u.unit_name,
  ch.chapter_order,
  ch.chapter_name
FROM courses c
JOIN courses_units u ON u.course_id = c.id
JOIN courses_chapters ch ON ch.unit_id = u.id
WHERE c.slug = 'cbse-mathematics-class-9'
ORDER BY u.unit_order, ch.chapter_order;

-- Summary count
SELECT 
  c.title,
  COUNT(DISTINCT u.id) as total_units,
  COUNT(DISTINCT ch.id) as total_chapters
FROM courses c
JOIN courses_units u ON u.course_id = c.id
JOIN courses_chapters ch ON ch.unit_id = u.id
WHERE c.slug = 'cbse-mathematics-class-9'
GROUP BY c.title;

