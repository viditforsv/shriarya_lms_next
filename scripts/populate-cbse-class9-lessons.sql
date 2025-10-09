-- SQL Script to populate CBSE Class 9 Mathematics lessons
-- Course ID: a7b20541-acbf-4406-a1fc-9a030378b608

-- Insert lessons for CBSE Class 9 Mathematics
INSERT INTO courses_lessons (
  course_id,
  title,
  slug,
  lesson_order,
  is_preview,
  content,
  content_html,
  key_points,
  video_url,
  video_thumbnail,
  unit_name,
  chapter_name,
  created_at
) VALUES 
-- Lesson 1: Real Numbers
(
  'a7b20541-acbf-4406-a1fc-9a030378b608',
  'Real Numbers',
  'real-numbers',
  1,
  true,
  'Understanding real numbers, irrational numbers, and their properties. Real numbers form the foundation of mathematics.',
  '<h2>Understanding Real Numbers</h2><p>Real numbers form the foundation of mathematics. In this lesson, we''ll explore rational and irrational numbers.</p>',
  '["Real numbers include both rational and irrational numbers", "Every real number can be represented on the number line"]',
  '/videos/real-numbers.mp4',
  '/images/thumbnails/real-numbers.jpg',
  'Number Systems',
  'Real Numbers',
  NOW()
),

-- Lesson 2: Polynomials
(
  'a7b20541-acbf-4406-a1fc-9a030378b608',
  'Polynomials in One Variable',
  'polynomials-intro',
  2,
  false,
  'Introduction to polynomials, their types, and basic operations. Polynomials are algebraic expressions with one or more terms.',
  '<h2>Introduction to Polynomials</h2><p>Polynomials are algebraic expressions with one or more terms. We''ll learn about degrees and types.</p>',
  '["A polynomial is an algebraic expression with one or more terms", "The degree is the highest power of the variable"]',
  '/videos/polynomials.mp4',
  '/images/thumbnails/polynomials.jpg',
  'Polynomials',
  'Polynomials in One Variable',
  NOW()
),

-- Lesson 3: Coordinate Geometry
(
  'a7b20541-acbf-4406-a1fc-9a030378b608',
  'Cartesian System',
  'cartesian-system',
  3,
  false,
  'Understanding coordinate plane, axes, and plotting points. The Cartesian coordinate system is a fundamental tool in mathematics.',
  '<h2>Understanding the Coordinate Plane</h2><p>The Cartesian coordinate system helps us locate points using coordinates.</p>',
  '["The coordinate plane has two perpendicular axes", "Points are represented by ordered pairs (x,y)"]',
  '/videos/cartesian-system.mp4',
  '/images/thumbnails/cartesian-system.jpg',
  'Coordinate Geometry',
  'Cartesian System',
  NOW()
),

-- Lesson 4: Linear Equations
(
  'a7b20541-acbf-4406-a1fc-9a030378b608',
  'Linear Equations in Two Variables',
  'linear-equations-intro',
  4,
  false,
  'Understanding linear equations and their graphical representation. Linear equations in two variables are fundamental in algebra.',
  '<h2>Understanding Linear Equations</h2><p>Linear equations in two variables have infinitely many solutions and form straight lines when graphed.</p>',
  '["Linear equations have the form ax + by + c = 0", "They have infinitely many solutions"]',
  '/videos/linear-equations.mp4',
  '/images/thumbnails/linear-equations.jpg',
  'Linear Equations in Two Variables',
  'Linear Equations in Two Variables',
  NOW()
),

-- Lesson 5: Euclid's Geometry
(
  'a7b20541-acbf-4406-a1fc-9a030378b608',
  'Euclid''s Definitions, Axioms and Postulates',
  'euclid-definitions',
  5,
  false,
  'Introduction to Euclidean geometry and its fundamental concepts. Euclid''s geometry forms the basis of modern mathematics.',
  '<h2>Foundations of Euclidean Geometry</h2><p>Euclid''s definitions, axioms, and postulates form the foundation of plane geometry.</p>',
  '["Euclid''s definitions establish basic geometric terms", "Axioms are self-evident truths"]',
  '/videos/euclid-geometry.mp4',
  '/images/thumbnails/euclid-geometry.jpg',
  'Introduction to Euclid''s Geometry',
  'Euclid''s Definitions, Axioms and Postulates',
  NOW()
),

-- Lesson 6: Lines and Angles
(
  'a7b20541-acbf-4406-a1fc-9a030378b608',
  'Basic Terms and Definitions',
  'lines-angles-basic',
  6,
  false,
  'Understanding types of angles and their properties. Lines and angles are fundamental geometric concepts.',
  '<h2>Understanding Lines and Angles</h2><p>Lines and angles are fundamental geometric concepts with various types and properties.</p>',
  '["Lines can be parallel, perpendicular, or intersecting", "Angles are classified by their measure"]',
  '/videos/lines-angles.mp4',
  '/images/thumbnails/lines-angles.jpg',
  'Lines and Angles',
  'Basic Terms and Definitions',
  NOW()
),

-- Lesson 7: Triangles
(
  'a7b20541-acbf-4406-a1fc-9a030378b608',
  'Congruence of Triangles',
  'triangles-congruence',
  7,
  false,
  'Understanding triangle congruence and its criteria. Triangle congruence is a fundamental concept in geometry.',
  '<h2>Understanding Triangle Congruence</h2><p>Two triangles are congruent if their corresponding sides and angles are equal.</p>',
  '["Congruent triangles have equal corresponding sides and angles", "Five criteria: SSS, SAS, ASA, AAS, RHS"]',
  '/videos/triangles.mp4',
  '/images/thumbnails/triangles.jpg',
  'Triangles',
  'Congruence of Triangles',
  NOW()
),

-- Lesson 8: Quadrilaterals
(
  'a7b20541-acbf-4406-a1fc-9a030378b608',
  'Properties of Quadrilaterals',
  'quadrilaterals-properties',
  8,
  false,
  'Understanding different types of quadrilaterals and their properties. Quadrilaterals are four-sided polygons with unique properties.',
  '<h2>Understanding Quadrilaterals</h2><p>Quadrilaterals are four-sided polygons with unique properties and characteristics.</p>',
  '["Quadrilaterals have four sides and four angles", "Sum of interior angles is always 360°"]',
  '/videos/quadrilaterals.mp4',
  '/images/thumbnails/quadrilaterals.jpg',
  'Quadrilaterals',
  'Properties of Quadrilaterals',
  NOW()
),

-- Lesson 9: Areas
(
  'a7b20541-acbf-4406-a1fc-9a030378b608',
  'Areas of Parallelograms and Triangles',
  'areas-basic',
  9,
  false,
  'Calculating areas of parallelograms and triangles. Understanding area calculations is essential in geometry.',
  '<h2>Calculating Areas</h2><p>Understanding area calculations for parallelograms and triangles is essential in geometry.</p>',
  '["Area of parallelogram = base × height", "Area of triangle = ½ × base × height"]',
  '/videos/areas.mp4',
  '/images/thumbnails/areas.jpg',
  'Areas of Parallelograms and Triangles',
  'Areas of Parallelograms and Triangles',
  NOW()
),

-- Lesson 10: Circles
(
  'a7b20541-acbf-4406-a1fc-9a030378b608',
  'Circles and its Related Terms',
  'circles-basic',
  10,
  false,
  'Understanding circles, chords, and related geometric properties. Circles are fundamental geometric shapes with unique properties.',
  '<h2>Understanding Circles</h2><p>Circles are fundamental geometric shapes with unique properties and terminology.</p>',
  '["Circle is the set of points equidistant from center", "All radii of a circle are equal"]',
  '/videos/circles.mp4',
  '/images/thumbnails/circles.jpg',
  'Circles',
  'Circles and its Related Terms',
  NOW()
),

-- Lesson 11: Constructions
(
  'a7b20541-acbf-4406-a1fc-9a030378b608',
  'Basic Constructions',
  'basic-constructions',
  11,
  false,
  'Learning geometric constructions using compass and ruler. Constructions are precise geometric drawings using only compass and ruler.',
  '<h2>Geometric Constructions</h2><p>Constructions are precise geometric drawings using only compass and ruler.</p>',
  '["Constructions use only compass and unmarked ruler", "Angle bisector divides angle into two equal parts"]',
  '/videos/constructions.mp4',
  '/images/thumbnails/constructions.jpg',
  'Constructions',
  'Basic Constructions',
  NOW()
),

-- Lesson 12: Heron's Formula
(
  'a7b20541-acbf-4406-a1fc-9a030378b608',
  'Area of Triangle using Heron''s Formula',
  'heron-formula-area',
  12,
  false,
  'Calculating triangle area using Heron''s formula. Heron''s formula allows us to calculate the area of a triangle when we know all three sides.',
  '<h2>Heron''s Formula</h2><p>Heron''s formula allows us to calculate the area of a triangle when we know all three sides.</p>',
  '["Heron''s formula: Area = √[s(s-a)(s-b)(s-c)]", "s = semi-perimeter = (a+b+c)/2"]',
  '/videos/heron-formula.mp4',
  '/images/thumbnails/heron-formula.jpg',
  'Heron''s Formula',
  'Area of Triangle using Heron''s Formula',
  NOW()
),

-- Lesson 13: Surface Areas and Volumes
(
  'a7b20541-acbf-4406-a1fc-9a030378b608',
  'Surface Areas and Volumes',
  'surface-areas-volumes-basic',
  13,
  false,
  'Calculating surface areas and volumes of 3D shapes. Surface areas and volumes are important concepts in 3D geometry.',
  '<h2>Understanding 3D Shapes</h2><p>Surface areas and volumes are important concepts in 3D geometry.</p>',
  '["Surface area is the total area of all faces", "Volume is the space occupied by the shape"]',
  '/videos/surface-areas-volumes.mp4',
  '/images/thumbnails/surface-areas-volumes.jpg',
  'Surface Areas and Volumes',
  'Surface Areas and Volumes',
  NOW()
),

-- Lesson 14: Statistics
(
  'a7b20541-acbf-4406-a1fc-9a030378b608',
  'Collection and Presentation of Data',
  'statistics-basic',
  14,
  false,
  'Understanding data collection, presentation, and analysis. Statistics is the science of collecting, organizing, and analyzing data.',
  '<h2>Understanding Statistics</h2><p>Statistics is the science of collecting, organizing, and analyzing data.</p>',
  '["Statistics involves collecting, organizing, and analyzing data", "Mean, median, and mode are measures of central tendency"]',
  '/videos/statistics.mp4',
  '/images/thumbnails/statistics.jpg',
  'Statistics',
  'Collection and Presentation of Data',
  NOW()
),

-- Lesson 15: Probability
(
  'a7b20541-acbf-4406-a1fc-9a030378b608',
  'Probability',
  'probability-basic',
  15,
  false,
  'Understanding probability concepts and applications. Probability is the measure of how likely an event is to occur.',
  '<h2>Understanding Probability</h2><p>Probability is the measure of how likely an event is to occur.</p>',
  '["Probability measures likelihood of events", "Range is from 0 (impossible) to 1 (certain)"]',
  '/videos/probability.mp4',
  '/images/thumbnails/probability.jpg',
  'Probability',
  'Probability',
  NOW()
);

-- Update the course lessons count
UPDATE courses 
SET lessons = 15, updated_at = NOW() 
WHERE id = 'a7b20541-acbf-4406-a1fc-9a030378b608';

-- Verify the lessons were created
SELECT 
  cl.title,
  cl.slug,
  cl.lesson_order,
  cl.is_preview,
  cl.unit_name,
  cl.chapter_name
FROM courses_lessons cl
WHERE cl.course_id = 'a7b20541-acbf-4406-a1fc-9a030378b608'
ORDER BY cl.lesson_order;
