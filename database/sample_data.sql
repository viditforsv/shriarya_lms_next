-- Sample data for testing the free courses ecosystem
-- Run this after creating the tables and policies

-- Insert sample free courses
INSERT INTO public.courses (title, description, is_free, price) VALUES
(
  'Mathematics Class 10 CBSE',
  'Complete mathematics course covering all CBSE Class 10 topics with practice questions and mock tests.',
  true,
  0.00
),
(
  'Mathematics Class 12 CBSE',
  'Comprehensive CBSE Mathematics curriculum for Class 12 students. Advanced topics from Relations and Functions to Probability.',
  true,
  0.00
),
(
  'Physics Class 10 ICSE',
  'Complete physics course for ICSE Class 10 with practical experiments and numerical problems.',
  true,
  0.00
),
(
  'Chemistry Class 11 CBSE',
  'Comprehensive chemistry course for CBSE Class 11 with lab work and theory.',
  true,
  0.00
),
(
  'Biology Class 10 CBSE',
  'Complete biology syllabus for CBSE Class 10 with diagrams and practical knowledge.',
  true,
  0.00
),
(
  'English Literature Class 12 CBSE',
  'CBSE English Literature course with critical analysis and essay writing.',
  true,
  0.00
);

-- Insert sample paid courses for comparison
INSERT INTO public.courses (title, description, is_free, price) VALUES
(
  'Advanced Mathematics IBDP',
  'International Baccalaureate Higher Level Mathematics with calculus and statistics.',
  false,
  2999.00
),
(
  'Physics Lab Experiments',
  'Hands-on physics experiments with real equipment and virtual simulations.',
  false,
  1999.00
);

-- Verify the data
SELECT 
  id,
  title,
  is_free,
  price,
  created_at
FROM public.courses 
ORDER BY created_at DESC;
