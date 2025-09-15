-- Add human-readable ID columns to question_bank table
-- This script adds the necessary columns for human-readable question IDs

-- Add human_readable_id column
ALTER TABLE public.question_bank 
ADD COLUMN IF NOT EXISTS human_readable_id VARCHAR(50) UNIQUE;

-- Add question_display_number column for sequential numbering within groups
ALTER TABLE public.question_bank 
ADD COLUMN IF NOT EXISTS question_display_number INTEGER;

-- Create index for faster searching by human-readable ID
CREATE INDEX IF NOT EXISTS idx_question_bank_human_readable_id 
ON public.question_bank(human_readable_id);

-- Create index for faster searching by display number
CREATE INDEX IF NOT EXISTS idx_question_bank_display_number 
ON public.question_bank(question_display_number);

-- Add comment explaining the ID system
COMMENT ON COLUMN public.question_bank.human_readable_id IS 'Human-readable question ID format: BOARD_SUBJECT_TYPE_NUMBER (e.g., IBDP_aahl_pyq_0001)';
COMMENT ON COLUMN public.question_bank.question_display_number IS 'Sequential number within question group for display purposes';

-- Example of the ID format:
-- IBDP_aahl_pyq_0001 - IBDP Mathematics AA HL Past Year Question #1
-- CBSE_maths_pyq_0001 - CBSE Mathematics Past Year Question #1
-- IBDP_aahl_prac_0001 - IBDP Mathematics AA HL Practice Question #1