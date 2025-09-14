-- Fix question_bank and quiz_questions tables
-- Run this single script in Supabase SQL Editor

-- Step 1: Drop existing tables (in dependency order)
DROP TABLE IF EXISTS public.quiz_questions CASCADE;
DROP TABLE IF EXISTS public.question_bank CASCADE;

-- Step 2: Create improved question_bank table
CREATE TABLE public.question_bank (
  -- Primary key
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  
  -- Core question data (matching CSV order)
  is_pyq boolean NOT NULL DEFAULT true,
  question_number text,
  total_marks integer,
  pyq_year integer,
  Month text,
  paper_number integer,
  "Time Zone" text,
  question_text text NOT NULL,
  tags text[] DEFAULT '{}',
  Section text,
  subject text NOT NULL DEFAULT 'IBDP Mathematics AA HL',
  explanation text,
  calculator text,
  correct_answer text,
  difficulty integer CHECK (difficulty >= 1 AND difficulty <= 10),
  
  -- System fields
  created_at timestamp with time zone DEFAULT now(),
  image_url text,
  solution_steps jsonb DEFAULT '[]',
  solution_image text,
  question_type text NOT NULL DEFAULT 'subjective' CHECK (question_type IN ('mcq', 'subjective', 'true_false', 'fill_blank')),
  mark_allocation jsonb,
  
  -- Metadata
  board text NOT NULL DEFAULT 'IBDP',
  grade text NOT NULL DEFAULT '12',
  topic text,
  subtopic text,
  source text NOT NULL DEFAULT 'IBDP',
  paper_type text,
  updated_at timestamp with time zone DEFAULT now(),
  created_by uuid,
  is_active boolean NOT NULL DEFAULT true,
  year integer,
  options jsonb DEFAULT '[]',
  
  -- Primary key constraint
  CONSTRAINT question_bank_pkey PRIMARY KEY (id)
);

-- Step 3: Create fixed quiz_questions table with proper foreign keys
CREATE TABLE public.quiz_questions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  quiz_id uuid NOT NULL,
  question_id uuid NOT NULL,
  question_order integer NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  
  -- Primary key
  CONSTRAINT quiz_questions_pkey PRIMARY KEY (id),
  
  -- Foreign keys
  CONSTRAINT quiz_questions_quiz_id_fkey FOREIGN KEY (quiz_id) REFERENCES public.quizzes(id) ON DELETE CASCADE,
  CONSTRAINT quiz_questions_question_id_fkey FOREIGN KEY (question_id) REFERENCES public.question_bank(id) ON DELETE CASCADE,
  
  -- Unique constraint to prevent duplicate question-quiz pairs
  CONSTRAINT quiz_questions_quiz_question_unique UNIQUE (quiz_id, question_id)
);

-- Step 4: Create indexes for better performance
CREATE INDEX idx_question_bank_pyq_year ON public.question_bank(pyq_year);
CREATE INDEX idx_question_bank_paper_number ON public.question_bank(paper_number);
CREATE INDEX idx_question_bank_difficulty ON public.question_bank(difficulty);
CREATE INDEX idx_question_bank_subject ON public.question_bank(subject);
CREATE INDEX idx_question_bank_board ON public.question_bank(board);
CREATE INDEX idx_question_bank_grade ON public.question_bank(grade);
CREATE INDEX idx_question_bank_topic ON public.question_bank(topic);
CREATE INDEX idx_question_bank_is_active ON public.question_bank(is_active);
CREATE INDEX idx_question_bank_question_type ON public.question_bank(question_type);

-- Indexes for quiz_questions
CREATE INDEX idx_quiz_questions_quiz_id ON public.quiz_questions(quiz_id);
CREATE INDEX idx_quiz_questions_question_id ON public.quiz_questions(question_id);
CREATE INDEX idx_quiz_questions_order ON public.quiz_questions(quiz_id, question_order);

-- Step 5: Add comments for documentation
COMMENT ON TABLE public.question_bank IS 'IBDP Mathematics AA HL Question Bank';
COMMENT ON TABLE public.quiz_questions IS 'Links questions to quizzes with ordering';
COMMENT ON COLUMN public.question_bank.is_pyq IS 'Previous Year Question flag';
COMMENT ON COLUMN public.question_bank.pyq_year IS 'Year of the previous year question';
COMMENT ON COLUMN public.question_bank.paper_number IS 'Paper number (1, 2, or 3)';
COMMENT ON COLUMN public.question_bank.difficulty IS 'Difficulty level from 1-10';
COMMENT ON COLUMN public.question_bank.question_type IS 'Type of question: mcq, subjective, true_false, fill_blank';
COMMENT ON COLUMN public.question_bank.tags IS 'Array of topic tags';
COMMENT ON COLUMN public.question_bank.mark_allocation IS 'JSON object with mark breakdown';
COMMENT ON COLUMN public.question_bank.solution_steps IS 'JSON array of solution steps';
COMMENT ON COLUMN public.question_bank.options IS 'JSON array of MCQ options';
COMMENT ON COLUMN public.quiz_questions.question_order IS 'Order of question within the quiz';
