-- Migration: Add CHECK constraint to subject column in question_bank table
-- This ensures only predefined subjects can be used, preventing spelling variations

-- Step 1: Drop the constraint if it already exists (for idempotency)
DO $$ 
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'question_bank_subject_check'
  ) THEN
    ALTER TABLE public.question_bank DROP CONSTRAINT question_bank_subject_check;
  END IF;
END $$;

-- Step 2: Add CHECK constraint to subject column
-- This matches the pattern used for question_type
-- Note: If there are existing rows with invalid subjects, this will fail
-- Run the bulk-edit script first to standardize existing data
ALTER TABLE public.question_bank
ADD CONSTRAINT question_bank_subject_check CHECK (
  subject = ANY (ARRAY[
    'Mathematics'::text,
    'IBDP Mathematics AA HL'::text,
    'IBDP Mathematics AA SL'::text,
    'IBDP Mathematics AI HL'::text,
    'IBDP Mathematics AI SL'::text,
    'CBSE Mathematics'::text,
    'ICSE Mathematics'::text,
    'IGCSE Mathematics'::text,
    'Physics'::text,
    'IBDP Physics HL'::text,
    'IBDP Physics SL'::text,
    'CBSE Physics'::text,
    'ICSE Physics'::text,
    'IGCSE Physics'::text,
    'Chemistry'::text,
    'IBDP Chemistry HL'::text,
    'IBDP Chemistry SL'::text,
    'CBSE Chemistry'::text,
    'ICSE Chemistry'::text,
    'IGCSE Chemistry'::text,
    'Biology'::text,
    'IBDP Biology HL'::text,
    'IBDP Biology SL'::text,
    'CBSE Biology'::text,
    'ICSE Biology'::text,
    'IGCSE Biology'::text,
    'English'::text,
    'IBDP English A'::text,
    'IBDP English B'::text,
    'CBSE English'::text,
    'ICSE English'::text,
    'IGCSE English'::text,
    'Computer Science'::text,
    'IBDP Computer Science HL'::text,
    'IBDP Computer Science SL'::text,
    'CBSE Computer Science'::text,
    'ICSE Computer Science'::text,
    'IGCSE Computer Science'::text
  ])
);

-- Step 3: Add a comment to document the constraint
COMMENT ON CONSTRAINT question_bank_subject_check ON public.question_bank IS 
  'Ensures subject field only accepts predefined values to prevent spelling variations. Valid subjects are defined in src/lib/constants/subjects.ts';

