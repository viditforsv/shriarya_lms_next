-- Populate Units and Chapters for CBSE Mathematics Class 10
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
    ('Number Systems', 1),
    ('Algebra', 2),
    ('Coordinate Geometry', 3),
    ('Geometry', 4),
    ('Trigonometry', 5),
    ('Mensuration', 6),
    ('Statistics & Probability', 7)
) AS unit_data(unit_name, unit_order)
WHERE c.slug = 'cbse-mathematics-class-10';

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
    -- Number Systems unit
    (1, 'Real Numbers', 1),
    -- Algebra unit
    (2, 'Polynomials', 1),
    (2, 'Pair of Linear Equations in Two Variables', 2),
    (2, 'Quadratic Equations', 3),
    (2, 'Arithmetic Progressions', 4),
    -- Coordinate Geometry unit
    (3, 'Coordinate Geometry', 1),
    -- Geometry unit
    (4, 'Triangles', 1),
    (4, 'Circles', 2),
    -- Trigonometry unit
    (5, 'Introduction to Trigonometry', 1),
    (5, 'Some Applications of Trigonometry', 2),
    -- Mensuration unit
    (6, 'Areas related to Circles', 1),
    (6, 'Surface Areas and Volumes', 2),
    -- Statistics & Probability unit
    (7, 'Statistics', 1),
    (7, 'Probability', 2)
) AS chapter_data(unit_order_ref, chapter_name, chapter_order)
WHERE c.slug = 'cbse-mathematics-class-10'
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
WHERE c.slug = 'cbse-mathematics-class-10'
ORDER BY u.unit_order, ch.chapter_order;

-- Summary count
SELECT 
  c.title,
  COUNT(DISTINCT u.id) as total_units,
  COUNT(DISTINCT ch.id) as total_chapters
FROM courses c
JOIN courses_units u ON u.course_id = c.id
JOIN courses_chapters ch ON ch.unit_id = u.id
WHERE c.slug = 'cbse-mathematics-class-10'
GROUP BY c.title;

