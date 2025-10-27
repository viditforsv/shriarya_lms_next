-- Teacher-Student Assignment Grading System Database Migrations

-- 1. Update profiles table to allow 'teacher' role
ALTER TABLE public.profiles
DROP CONSTRAINT IF EXISTS profiles_role_check;

ALTER TABLE public.profiles
ADD CONSTRAINT profiles_role_check 
CHECK (role = ANY (ARRAY['student'::text, 'admin'::text, 'content_manager'::text, 'teacher'::text]));

-- 2. Add assigned_teacher_id to courses_enrollments
ALTER TABLE public.courses_enrollments 
ADD COLUMN IF NOT EXISTS assigned_teacher_id uuid REFERENCES public.profiles(id);

-- 2b. Add enrollment_type to distinguish students from teachers
ALTER TABLE public.courses_enrollments
ADD COLUMN IF NOT EXISTS enrollment_type text DEFAULT 'student'::text;

-- Add constraint for enrollment type
ALTER TABLE public.courses_enrollments
DROP CONSTRAINT IF EXISTS courses_enrollments_enrollment_type_check;

ALTER TABLE public.courses_enrollments
ADD CONSTRAINT courses_enrollments_enrollment_type_check
CHECK (enrollment_type IN ('student', 'teacher'));

-- 2. Create assignment_submissions table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.assignment_submissions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  assignment_id text NOT NULL,
  course_id uuid NOT NULL,
  user_id uuid NOT NULL,
  file_name text NOT NULL,
  file_path text NOT NULL,
  file_url text NOT NULL,
  file_size numeric NOT NULL,
  submitted_at timestamp with time zone DEFAULT now(),
  status text DEFAULT 'submitted'::text,
  CONSTRAINT assignment_submissions_pkey PRIMARY KEY (id),
  CONSTRAINT assignment_submissions_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(id),
  CONSTRAINT assignment_submissions_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);

-- 3. Add grading columns to assignment_submissions table
ALTER TABLE public.assignment_submissions
ADD COLUMN IF NOT EXISTS graded_file_path text,
ADD COLUMN IF NOT EXISTS graded_file_url text,
ADD COLUMN IF NOT EXISTS marks_obtained numeric,
ADD COLUMN IF NOT EXISTS max_marks numeric,
ADD COLUMN IF NOT EXISTS graded_at timestamp with time zone,
ADD COLUMN IF NOT EXISTS graded_by uuid REFERENCES auth.users(id),
ADD COLUMN IF NOT EXISTS teacher_comments text,
ADD COLUMN IF NOT EXISTS grading_status text DEFAULT 'pending';

-- Update grading_status constraint (using DO block to avoid errors if constraint doesn't exist)
DO $$ 
BEGIN
    -- Drop constraint if it exists
    IF EXISTS (
        SELECT 1 
        FROM information_schema.constraint_column_usage 
        WHERE constraint_name = 'assignment_submissions_grading_status_check'
    ) THEN
        ALTER TABLE public.assignment_submissions
        DROP CONSTRAINT assignment_submissions_grading_status_check;
    END IF;
    
    -- Add the constraint
    ALTER TABLE public.assignment_submissions
    ADD CONSTRAINT assignment_submissions_grading_status_check 
    CHECK (grading_status IN ('pending', 'graded', 'returned'));
EXCEPTION WHEN duplicate_object THEN
    -- Constraint already exists, ignore
END $$;

-- Update existing status column constraint (using DO block to avoid errors if constraint doesn't exist)
DO $$ 
BEGIN
    -- Drop constraint if it exists
    IF EXISTS (
        SELECT 1 
        FROM information_schema.constraint_column_usage 
        WHERE constraint_name = 'assignment_submissions_status_check'
    ) THEN
        ALTER TABLE public.assignment_submissions
        DROP CONSTRAINT assignment_submissions_status_check;
    END IF;
    
    -- Add the constraint
    ALTER TABLE public.assignment_submissions
    ADD CONSTRAINT assignment_submissions_status_check 
    CHECK (status IN ('submitted', 'under_review', 'graded', 'returned'));
EXCEPTION WHEN duplicate_object THEN
    -- Constraint already exists, ignore
END $$;

-- Add indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_enrollments_teacher_id ON public.courses_enrollments(assigned_teacher_id);
CREATE INDEX IF NOT EXISTS idx_submissions_grading_status ON public.assignment_submissions(grading_status);
CREATE INDEX IF NOT EXISTS idx_submissions_graded_by ON public.assignment_submissions(graded_by);
CREATE INDEX IF NOT EXISTS idx_submissions_user_course ON public.assignment_submissions(user_id, course_id);

