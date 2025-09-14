-- Add human-readable question ID to question_bank table
-- This script adds a new column for display-friendly question IDs

-- Add the new column
ALTER TABLE public.question_bank 
ADD COLUMN IF NOT EXISTS question_display_id VARCHAR(20) UNIQUE;

-- Create an index for faster lookups
CREATE INDEX IF NOT EXISTS idx_question_bank_display_id 
ON public.question_bank(question_display_id);

-- Generate display IDs for existing questions
-- Format: Q001, Q002, Q003, etc.
WITH numbered_questions AS (
  SELECT 
    id,
    ROW_NUMBER() OVER (ORDER BY created_at) as row_num
  FROM public.question_bank 
  WHERE is_active = true
)
UPDATE public.question_bank 
SET question_display_id = 'Q' || LPAD(row_num::text, 3, '0')
FROM numbered_questions 
WHERE question_bank.id = numbered_questions.id;

-- Alternative: Board-specific numbering
-- Uncomment this section if you prefer board-specific IDs
/*
WITH board_questions AS (
  SELECT 
    id,
    subject,
    ROW_NUMBER() OVER (PARTITION BY subject ORDER BY created_at) as row_num
  FROM public.question_bank 
  WHERE is_active = true
)
UPDATE public.question_bank 
SET question_display_id = 
  CASE 
    WHEN subject LIKE '%IBDP%' THEN 'IBDP-' || LPAD(row_num::text, 3, '0')
    WHEN subject LIKE '%CBSE%' THEN 'CBSE-' || LPAD(row_num::text, 3, '0')
    WHEN subject LIKE '%ICSE%' THEN 'ICSE-' || LPAD(row_num::text, 3, '0')
    ELSE 'Q' || LPAD(row_num::text, 3, '0')
  END
FROM board_questions 
WHERE question_bank.id = board_questions.id;
*/

-- Verify the results
SELECT id, question_display_id, subject, created_at 
FROM public.question_bank 
WHERE is_active = true 
ORDER BY question_display_id 
LIMIT 10;
