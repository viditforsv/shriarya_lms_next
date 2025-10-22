-- Insert sample lesson content for testing
-- This script adds sample Concepts and Formulas content for the first few lessons

DO $$
DECLARE
  v_lesson_id UUID;
BEGIN
  -- Get the first lesson ID from the IBDP AA HL course
  SELECT id INTO v_lesson_id 
  FROM courses_lessons 
  WHERE course_id = '492e363b-423c-4467-96fd-a89abafa5017'
  ORDER BY lesson_order 
  LIMIT 1;

  IF v_lesson_id IS NOT NULL THEN
    -- Insert sample concepts content
    INSERT INTO course_lesson_content (lesson_id, content_type, title, content, content_html, metadata, order_index)
    VALUES 
    (
      v_lesson_id,
      'concepts',
      'Understanding Powers of 10 and Place Value',
      'This lesson covers the fundamental concepts of powers of 10 and place value in our number system.',
      '<p>This lesson covers the fundamental concepts of <strong>powers of 10</strong> and <strong>place value</strong> in our number system.</p><p>Students will learn how repeated multiplication and division by 10 shifts decimal places and connects to exponent notation.</p>',
      '{"keyPoints": ["Understand how powers of 10 represent scale and position", "Apply concepts to express numbers in different forms", "Connect to real-world applications of scientific notation"], "difficulty": 2, "tags": ["powers", "place value", "scientific notation"]}',
      0
    ),
    (
      v_lesson_id,
      'formulas',
      'Powers of 10 Formula',
      'For any number a and integer n: a × 10^n = a followed by n zeros (if n > 0) or a divided by 10^n (if n < 0)',
      '<p>For any number <em>a</em> and integer <em>n</em>:</p><p><strong>a × 10<sup>n</sup> = a followed by n zeros</strong> (if n > 0)</p><p><strong>a × 10<sup>n</sup> = a divided by 10<sup>|n|</sup></strong> (if n < 0)</p>',
      '{"description": "Basic formula for understanding powers of 10", "difficulty": 1, "tags": ["formula", "powers", "exponents"]}',
      0
    ),
    (
      v_lesson_id,
      'formulas',
      'Scientific Notation Formula',
      'A number in scientific notation is written as a × 10^n where 1 ≤ |a| < 10 and n is an integer',
      '<p>A number in scientific notation is written as:</p><p><strong>a × 10<sup>n</sup></strong></p><p>where <strong>1 ≤ |a| < 10</strong> and <strong>n</strong> is an integer</p>',
      '{"description": "Standard form of scientific notation", "difficulty": 2, "tags": ["scientific notation", "standard form"]}',
      1
    );

    RAISE NOTICE 'Sample content inserted for lesson ID: %', v_lesson_id;
  ELSE
    RAISE NOTICE 'No lesson found for the IBDP AA HL course';
  END IF;
END $$;
