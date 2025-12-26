-- Initial Production Schema Migration
-- This migration creates all tables for the production database
-- Run this in Supabase Dashboard SQL Editor or via CLI: supabase db push

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- BASE TABLES (No dependencies on other custom tables)
-- ============================================================================

-- Profiles table (depends only on auth.users which exists in Supabase)
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid NOT NULL,
  first_name text,
  last_name text,
  role text DEFAULT 'student'::text CHECK (role = ANY (ARRAY['student'::text, 'admin'::text, 'content_manager'::text, 'teacher'::text])),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  avatar_url text,
  email text NOT NULL,
  CONSTRAINT profiles_pkey PRIMARY KEY (id),
  CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Permission Categories (no dependencies)
CREATE TABLE IF NOT EXISTS public.permission_categories (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name character varying NOT NULL UNIQUE,
  display_name character varying NOT NULL,
  description text,
  icon character varying,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT permission_categories_pkey PRIMARY KEY (id)
);

-- Roles (depends on auth.users)
CREATE TABLE IF NOT EXISTS public.roles (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name character varying NOT NULL UNIQUE,
  display_name character varying NOT NULL,
  description text,
  is_active boolean DEFAULT true,
  is_system_role boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  created_by uuid,
  permissions jsonb DEFAULT '[]'::jsonb,
  CONSTRAINT roles_pkey PRIMARY KEY (id),
  CONSTRAINT roles_created_by_fkey FOREIGN KEY (created_by) REFERENCES auth.users(id)
);

-- Permissions (depends on permission_categories and auth.users)
CREATE TABLE IF NOT EXISTS public.permissions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name character varying NOT NULL UNIQUE,
  display_name character varying NOT NULL,
  description text,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  created_by uuid,
  category character varying,
  CONSTRAINT permissions_pkey PRIMARY KEY (id),
  CONSTRAINT permissions_category_fkey FOREIGN KEY (category) REFERENCES public.permission_categories(name),
  CONSTRAINT permissions_created_by_fkey FOREIGN KEY (created_by) REFERENCES auth.users(id)
);

-- Question Bank (no dependencies)
CREATE TABLE IF NOT EXISTS public.question_bank (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  is_pyq boolean NOT NULL DEFAULT true,
  question_number text,
  total_marks integer,
  pyq_year integer,
  month text,
  paper_number integer,
  "Time Zone" text,
  question_text text NOT NULL,
  tags text[] DEFAULT '{}'::text[],
  section text,
  subject text NOT NULL DEFAULT 'IBDP Mathematics AA HL'::text,
  explanation text,
  calculator text,
  correct_answer text,
  difficulty integer CHECK (difficulty >= 1 AND difficulty <= 10),
  created_at timestamp with time zone DEFAULT now(),
  image_url text,
  solution_image text,
  question_type text NOT NULL DEFAULT 'subjective'::text CHECK (question_type = ANY (ARRAY['mcq'::text, 'subjective'::text, 'true_false'::text, 'fill_blank'::text])),
  grade text NOT NULL DEFAULT '12'::text,
  topic text,
  subtopic text,
  source text NOT NULL DEFAULT 'IBDP'::text,
  paper_type text,
  updated_at timestamp with time zone DEFAULT now(),
  created_by uuid,
  is_active boolean NOT NULL DEFAULT true,
  year integer,
  options jsonb DEFAULT '[]'::jsonb,
  human_readable_id character varying UNIQUE,
  question_display_number integer,
  boards jsonb DEFAULT '[]'::jsonb,
  course_types jsonb DEFAULT '[]'::jsonb,
  levels jsonb DEFAULT '[]'::jsonb,
  relevance jsonb DEFAULT '[]'::jsonb,
  CONSTRAINT question_bank_pkey PRIMARY KEY (id)
);

-- User Profiles (depends on auth.users)
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE,
  first_name text,
  last_name text,
  date_of_birth date,
  country text,
  city text,
  bio text,
  phone_number text,
  avatar_url text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT user_profiles_pkey PRIMARY KEY (id),
  CONSTRAINT user_profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- User Onboarding Progress (depends on auth.users)
CREATE TABLE IF NOT EXISTS public.user_onboarding_progress (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE,
  current_step integer DEFAULT 0,
  is_completed boolean DEFAULT false,
  preferences jsonb DEFAULT '{}'::jsonb,
  skipped_steps text[] DEFAULT '{}'::text[],
  completed_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  profile_data jsonb DEFAULT '{}'::jsonb,
  educational_background jsonb DEFAULT '{}'::jsonb,
  selected_courses text[] DEFAULT '{}'::text[],
  CONSTRAINT user_onboarding_progress_pkey PRIMARY KEY (id),
  CONSTRAINT user_onboarding_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- ============================================================================
-- COURSE TEMPLATES (depends on auth.users)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.courses_templates (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name character varying NOT NULL,
  slug character varying NOT NULL UNIQUE,
  description text,
  curriculum character varying NOT NULL,
  subject character varying NOT NULL,
  grade character varying,
  level character varying,
  structure jsonb NOT NULL DEFAULT '{}'::jsonb,
  fields jsonb NOT NULL DEFAULT '[]'::jsonb,
  settings jsonb NOT NULL DEFAULT '{}'::jsonb,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  created_by uuid,
  CONSTRAINT courses_templates_pkey PRIMARY KEY (id),
  CONSTRAINT course_templates_created_by_fkey FOREIGN KEY (created_by) REFERENCES auth.users(id)
);

-- Course Template Fields (depends on courses_templates)
CREATE TABLE IF NOT EXISTS public.course_template_fields (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  template_id uuid NOT NULL,
  field_key character varying NOT NULL,
  field_type character varying NOT NULL,
  field_label character varying NOT NULL,
  field_description text,
  is_required boolean DEFAULT false,
  default_value jsonb,
  validation_rules jsonb DEFAULT '{}'::jsonb,
  display_order integer DEFAULT 0,
  CONSTRAINT course_template_fields_pkey PRIMARY KEY (id),
  CONSTRAINT course_template_fields_template_id_fkey FOREIGN KEY (template_id) REFERENCES public.courses_templates(id) ON DELETE CASCADE
);

-- ============================================================================
-- COURSES (depends on profiles and courses_templates)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.courses (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  instructor_id uuid,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  slug text UNIQUE,
  status text DEFAULT 'draft'::text CHECK (status = ANY (ARRAY['draft'::text, 'published'::text, 'archived'::text])),
  price numeric DEFAULT 0,
  template_id uuid,
  template_data jsonb DEFAULT '{}'::jsonb,
  curriculum text,
  subject text,
  grade text,
  level text,
  duration text,
  validity_days integer DEFAULT 365,
  thumbnail_url text,
  CONSTRAINT courses_pkey PRIMARY KEY (id),
  CONSTRAINT courses_instructor_id_fkey FOREIGN KEY (instructor_id) REFERENCES public.profiles(id),
  CONSTRAINT courses_template_id_fkey FOREIGN KEY (template_id) REFERENCES public.courses_templates(id)
);

-- Courses Units (depends on courses)
CREATE TABLE IF NOT EXISTS public.courses_units (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL,
  unit_name text NOT NULL,
  unit_order integer NOT NULL,
  description text,
  is_locked boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT courses_units_pkey PRIMARY KEY (id),
  CONSTRAINT courses_units_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(id) ON DELETE CASCADE
);

-- Courses Chapters (depends on courses_units)
CREATE TABLE IF NOT EXISTS public.courses_chapters (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  unit_id uuid NOT NULL,
  chapter_name text NOT NULL,
  chapter_order integer NOT NULL,
  description text,
  is_locked boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT courses_chapters_pkey PRIMARY KEY (id),
  CONSTRAINT courses_chapters_unit_id_fkey FOREIGN KEY (unit_id) REFERENCES public.courses_units(id) ON DELETE CASCADE
);

-- Courses Topics (depends on courses_chapters)
CREATE TABLE IF NOT EXISTS public.courses_topics (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  chapter_id uuid NOT NULL,
  topic_name text NOT NULL,
  topic_number text NOT NULL,
  topic_order integer NOT NULL DEFAULT 0,
  description text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT courses_topics_pkey PRIMARY KEY (id),
  CONSTRAINT courses_topics_chapter_id_fkey FOREIGN KEY (chapter_id) REFERENCES public.courses_chapters(id) ON DELETE CASCADE
);

-- Quizzes (created before courses_lessons to avoid circular dependency)
CREATE TABLE IF NOT EXISTS public.quizzes (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  lesson_id uuid,
  title text NOT NULL,
  difficulty text,
  time_limit integer,
  created_at timestamp without time zone DEFAULT now(),
  CONSTRAINT quizzes_pkey PRIMARY KEY (id)
);

-- Courses Lessons (depends on courses, courses_chapters, courses_topics, quizzes)
CREATE TABLE IF NOT EXISTS public.courses_lessons (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  title text NOT NULL,
  topic_badge text,
  created_at timestamp without time zone DEFAULT now(),
  course_id uuid,
  slug text UNIQUE,
  lesson_order integer,
  is_preview boolean DEFAULT false,
  content text,
  quiz_id uuid,
  video_url text,
  video_thumbnail_url text,
  pdf_url text,
  chapter_id uuid,
  solution_url text,
  topic_number text,
  lesson_code text,
  topic_id uuid,
  concept_title text,
  concept_content text,
  formula_title text,
  formula_content text,
  CONSTRAINT courses_lessons_pkey PRIMARY KEY (id),
  CONSTRAINT lessons_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(id) ON DELETE CASCADE,
  CONSTRAINT lessons_quiz_id_fkey FOREIGN KEY (quiz_id) REFERENCES public.quizzes(id),
  CONSTRAINT courses_lessons_chapter_id_fkey FOREIGN KEY (chapter_id) REFERENCES public.courses_chapters(id),
  CONSTRAINT courses_lessons_topic_id_fkey FOREIGN KEY (topic_id) REFERENCES public.courses_topics(id)
);

-- Add foreign key constraint to quizzes.lesson_id after courses_lessons is created
ALTER TABLE public.quizzes 
  ADD CONSTRAINT quizzes_lesson_id_fkey FOREIGN KEY (lesson_id) REFERENCES public.courses_lessons(id);

-- ============================================================================
-- COURSE ENROLLMENTS AND RELATED
-- ============================================================================

-- Courses Enrollments (depends on profiles and courses)
CREATE TABLE IF NOT EXISTS public.courses_enrollments (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  student_id uuid,
  course_id uuid,
  is_active boolean DEFAULT true,
  enrolled_at timestamp with time zone DEFAULT now(),
  assigned_teacher_id uuid,
  enrollment_type text DEFAULT 'student'::text CHECK (enrollment_type = ANY (ARRAY['student'::text, 'teacher'::text])),
  CONSTRAINT courses_enrollments_pkey PRIMARY KEY (id),
  CONSTRAINT enrollments_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.profiles(id) ON DELETE CASCADE,
  CONSTRAINT enrollments_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(id) ON DELETE CASCADE,
  CONSTRAINT courses_enrollments_assigned_teacher_id_fkey FOREIGN KEY (assigned_teacher_id) REFERENCES public.profiles(id)
);

-- User Progress (depends on auth.users, courses, courses_lessons)
CREATE TABLE IF NOT EXISTS public.user_progress (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  course_id uuid NOT NULL,
  lesson_id uuid NOT NULL,
  lesson_slug text NOT NULL,
  lesson_order integer NOT NULL,
  completion_percentage integer DEFAULT 0 CHECK (completion_percentage >= 0 AND completion_percentage <= 100),
  time_spent_minutes integer DEFAULT 0,
  last_accessed_at timestamp with time zone DEFAULT now(),
  completed_at timestamp with time zone,
  is_completed boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT user_progress_pkey PRIMARY KEY (id),
  CONSTRAINT user_progress_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE,
  CONSTRAINT user_progress_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(id) ON DELETE CASCADE,
  CONSTRAINT user_progress_lesson_id_fkey FOREIGN KEY (lesson_id) REFERENCES public.courses_lessons(id) ON DELETE CASCADE
);

-- ============================================================================
-- QUIZ AND QUESTION RELATED
-- ============================================================================

-- Quiz Questions (depends on quizzes and question_bank)
CREATE TABLE IF NOT EXISTS public.quiz_questions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  quiz_id uuid NOT NULL,
  question_id uuid NOT NULL,
  question_order integer NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT quiz_questions_pkey PRIMARY KEY (id),
  CONSTRAINT quiz_questions_quiz_id_fkey FOREIGN KEY (quiz_id) REFERENCES public.quizzes(id) ON DELETE CASCADE,
  CONSTRAINT quiz_questions_question_id_fkey FOREIGN KEY (question_id) REFERENCES public.question_bank(id) ON DELETE CASCADE
);

-- Lesson Tags (depends on courses_lessons)
CREATE TABLE IF NOT EXISTS public.lesson_tags (
  lesson_id uuid NOT NULL,
  tag_name text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT lesson_tags_pkey PRIMARY KEY (lesson_id, tag_name),
  CONSTRAINT lesson_tags_lesson_id_fkey FOREIGN KEY (lesson_id) REFERENCES public.courses_lessons(id) ON DELETE CASCADE
);

-- ============================================================================
-- QA AND ASSIGNMENT RELATED
-- ============================================================================

-- QA Questions (depends on question_bank and auth.users)
CREATE TABLE IF NOT EXISTS public.qa_questions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  question_id uuid NOT NULL,
  qa_status text NOT NULL DEFAULT 'pending'::text CHECK (qa_status = ANY (ARRAY['pending'::text, 'in_review'::text, 'needs_revision'::text, 'approved'::text, 'rejected'::text, 'archived'::text])),
  reviewer_id uuid,
  review_date timestamp with time zone,
  review_notes text,
  content_accuracy integer CHECK (content_accuracy >= 1 AND content_accuracy <= 5),
  difficulty_appropriateness integer CHECK (difficulty_appropriateness >= 1 AND difficulty_appropriateness <= 5),
  clarity_rating integer CHECK (clarity_rating >= 1 AND clarity_rating <= 5),
  solution_quality integer CHECK (solution_quality >= 1 AND solution_quality <= 5),
  overall_rating numeric,
  revision_count integer DEFAULT 0,
  last_revision_date timestamp with time zone,
  revision_notes text,
  is_flagged boolean DEFAULT false,
  flag_reason text,
  priority_level text DEFAULT 'medium'::text CHECK (priority_level = ANY (ARRAY['low'::text, 'medium'::text, 'high'::text, 'urgent'::text])),
  qa_tags text[] DEFAULT '{}'::text[],
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT qa_questions_pkey PRIMARY KEY (id),
  CONSTRAINT question_qa_question_id_fkey FOREIGN KEY (question_id) REFERENCES public.question_bank(id) ON DELETE CASCADE,
  CONSTRAINT question_qa_reviewer_id_fkey FOREIGN KEY (reviewer_id) REFERENCES auth.users(id)
);

-- QA History (depends on qa_questions and auth.users)
CREATE TABLE IF NOT EXISTS public.qa_history (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  qa_id uuid NOT NULL,
  action text NOT NULL CHECK (action = ANY (ARRAY['created'::text, 'status_changed'::text, 'reviewed'::text, 'rated'::text, 'commented'::text, 'flagged'::text, 'unflagged'::text, 'revised'::text, 'archived'::text])),
  old_value text,
  new_value text,
  action_by uuid,
  action_reason text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT qa_history_pkey PRIMARY KEY (id),
  CONSTRAINT qa_history_action_by_fkey FOREIGN KEY (action_by) REFERENCES auth.users(id),
  CONSTRAINT qa_history_qa_id_fkey FOREIGN KEY (qa_id) REFERENCES public.qa_questions(id) ON DELETE CASCADE
);

-- Question Assignments (depends on question_bank and auth.users)
CREATE TABLE IF NOT EXISTS public.question_assignments (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  question_id uuid NOT NULL,
  assigned_to uuid NOT NULL,
  assigned_by uuid NOT NULL,
  assignment_type text NOT NULL DEFAULT 'edit'::text CHECK (assignment_type = ANY (ARRAY['edit'::text, 'review'::text, 'approve'::text])),
  status text NOT NULL DEFAULT 'assigned'::text CHECK (status = ANY (ARRAY['assigned'::text, 'in_progress'::text, 'completed'::text, 'rejected'::text])),
  priority text NOT NULL DEFAULT 'medium'::text CHECK (priority = ANY (ARRAY['low'::text, 'medium'::text, 'high'::text, 'urgent'::text])),
  due_date timestamp with time zone,
  notes text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT question_assignments_pkey PRIMARY KEY (id),
  CONSTRAINT question_assignments_question_id_fkey FOREIGN KEY (question_id) REFERENCES public.question_bank(id) ON DELETE CASCADE,
  CONSTRAINT question_assignments_assigned_to_fkey FOREIGN KEY (assigned_to) REFERENCES auth.users(id),
  CONSTRAINT question_assignments_assigned_by_fkey FOREIGN KEY (assigned_by) REFERENCES auth.users(id)
);

-- ============================================================================
-- PAYMENTS AND ASSIGNMENTS
-- ============================================================================

-- Payments (depends on auth.users and courses)
CREATE TABLE IF NOT EXISTS public.payments (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  course_id uuid NOT NULL,
  amount numeric NOT NULL,
  currency character varying NOT NULL DEFAULT 'INR'::character varying,
  provider character varying NOT NULL CHECK (provider::text = ANY (ARRAY['razorpay'::character varying, 'stripe'::character varying]::text[])),
  payment_id character varying NOT NULL,
  order_id character varying,
  status character varying NOT NULL DEFAULT 'pending'::character varying CHECK (status::text = ANY (ARRAY['pending'::character varying, 'completed'::character varying, 'failed'::character varying, 'refunded'::character varying]::text[])),
  metadata jsonb DEFAULT '{}'::jsonb,
  refund_amount numeric DEFAULT 0,
  refund_reason text,
  refunded_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT payments_pkey PRIMARY KEY (id),
  CONSTRAINT payments_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE,
  CONSTRAINT payments_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(id) ON DELETE CASCADE
);

-- Assignment Submissions (depends on courses and auth.users)
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
  status text DEFAULT 'submitted'::text CHECK (status = ANY (ARRAY['submitted'::text, 'under_review'::text, 'graded'::text, 'returned'::text])),
  graded_file_path text,
  graded_file_url text,
  marks_obtained numeric,
  max_marks numeric,
  graded_at timestamp with time zone,
  graded_by uuid,
  teacher_comments text,
  grading_status text DEFAULT 'pending'::text CHECK (grading_status = ANY (ARRAY['pending'::text, 'graded'::text, 'returned'::text])),
  CONSTRAINT assignment_submissions_pkey PRIMARY KEY (id),
  CONSTRAINT assignment_submissions_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(id) ON DELETE CASCADE,
  CONSTRAINT assignment_submissions_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE,
  CONSTRAINT assignment_submissions_graded_by_fkey FOREIGN KEY (graded_by) REFERENCES auth.users(id)
);

-- Lesson Feedback (depends on courses_lessons and auth.users)
CREATE TABLE IF NOT EXISTS public.lesson_feedback (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  lesson_id uuid NOT NULL,
  lesson_slug text NOT NULL,
  course_slug text NOT NULL,
  user_id uuid,
  feedback_type text NOT NULL CHECK (feedback_type = ANY (ARRAY['mistake'::text, 'suggestion'::text])),
  message text NOT NULL,
  image_url text,
  status text DEFAULT 'pending'::text CHECK (status = ANY (ARRAY['pending'::text, 'reviewed'::text, 'resolved'::text, 'dismissed'::text])),
  admin_notes text,
  reviewed_by uuid,
  reviewed_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT lesson_feedback_pkey PRIMARY KEY (id),
  CONSTRAINT lesson_feedback_lesson_id_fkey FOREIGN KEY (lesson_id) REFERENCES public.courses_lessons(id) ON DELETE CASCADE,
  CONSTRAINT lesson_feedback_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE,
  CONSTRAINT lesson_feedback_reviewed_by_fkey FOREIGN KEY (reviewed_by) REFERENCES auth.users(id)
);

-- ============================================================================
-- USER ROLE ASSIGNMENTS
-- ============================================================================

-- User Role Assignments (depends on auth.users and roles)
CREATE TABLE IF NOT EXISTS public.user_role_assignments (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  assigned_at timestamp with time zone DEFAULT now(),
  is_active boolean DEFAULT true,
  role_name character varying,
  CONSTRAINT user_role_assignments_pkey PRIMARY KEY (id),
  CONSTRAINT user_roles_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE,
  CONSTRAINT user_roles_role_name_fkey FOREIGN KEY (role_name) REFERENCES public.roles(name)
);

-- ============================================================================
-- TRIGGERS FOR COMPUTED VALUES
-- ============================================================================

-- Function to calculate overall_rating for qa_questions
CREATE OR REPLACE FUNCTION public.calculate_qa_overall_rating()
RETURNS TRIGGER AS $$
BEGIN
  -- Calculate overall_rating as average of the four rating columns
  IF NEW.content_accuracy IS NOT NULL OR 
     NEW.difficulty_appropriateness IS NOT NULL OR 
     NEW.clarity_rating IS NOT NULL OR 
     NEW.solution_quality IS NOT NULL THEN
    NEW.overall_rating := (
      (COALESCE(NEW.content_accuracy, 0) + 
       COALESCE(NEW.difficulty_appropriateness, 0) + 
       COALESCE(NEW.clarity_rating, 0) + 
       COALESCE(NEW.solution_quality, 0)
      )::numeric / 4.0
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically calculate overall_rating
CREATE TRIGGER trigger_calculate_qa_overall_rating
  BEFORE INSERT OR UPDATE ON public.qa_questions
  FOR EACH ROW
  EXECUTE FUNCTION public.calculate_qa_overall_rating();

-- ============================================================================
-- CREATE INDEXES FOR PERFORMANCE
-- ============================================================================

-- Indexes for frequently queried columns
CREATE INDEX IF NOT EXISTS idx_courses_slug ON public.courses(slug);
CREATE INDEX IF NOT EXISTS idx_courses_status ON public.courses(status);
CREATE INDEX IF NOT EXISTS idx_courses_lessons_slug ON public.courses_lessons(slug);
CREATE INDEX IF NOT EXISTS idx_courses_lessons_course_id ON public.courses_lessons(course_id);
CREATE INDEX IF NOT EXISTS idx_courses_enrollments_student_id ON public.courses_enrollments(student_id);
CREATE INDEX IF NOT EXISTS idx_courses_enrollments_course_id ON public.courses_enrollments(course_id);
CREATE INDEX IF NOT EXISTS idx_question_bank_subject ON public.question_bank(subject);
CREATE INDEX IF NOT EXISTS idx_question_bank_difficulty ON public.question_bank(difficulty);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON public.user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_course_id ON public.user_progress(course_id);
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON public.payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON public.payments(status);

-- ============================================================================
-- MIGRATION COMPLETE
-- ============================================================================

-- Verify all tables were created
DO $$
DECLARE
  table_count integer;
BEGIN
  SELECT COUNT(*) INTO table_count
  FROM information_schema.tables
  WHERE table_schema = 'public'
    AND table_type = 'BASE TABLE';
  
  RAISE NOTICE 'Migration complete! Created % tables in public schema.', table_count;
END $$;

