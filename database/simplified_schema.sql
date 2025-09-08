-- Simplified Database Schema for Dynamic Course System
-- Focus on core functionality: courses, lessons, resources, enrollments, basic progress

-- Enhanced Courses table
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS category text;
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS difficulty_level text CHECK (difficulty_level = ANY (ARRAY['beginner'::text, 'intermediate'::text, 'advanced'::text]));
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS estimated_duration_hours integer;
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS thumbnail_url text;
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS is_published boolean DEFAULT false;
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS published_at timestamp with time zone;

-- Enhanced Lessons table
ALTER TABLE public.lessons ADD COLUMN IF NOT EXISTS description text;
ALTER TABLE public.lessons ADD COLUMN IF NOT EXISTS duration_minutes integer;
ALTER TABLE public.lessons ADD COLUMN IF NOT EXISTS thumbnail_url text;
ALTER TABLE public.lessons ADD COLUMN IF NOT EXISTS is_published boolean DEFAULT false;

-- Enhanced Resources table
ALTER TABLE public.resources ADD COLUMN IF NOT EXISTS title text;
ALTER TABLE public.resources ADD COLUMN IF NOT EXISTS description text;
ALTER TABLE public.resources ADD COLUMN IF NOT EXISTS file_size_bytes bigint;
ALTER TABLE public.resources ADD COLUMN IF NOT EXISTS is_downloadable boolean DEFAULT true;
ALTER TABLE public.resources ADD COLUMN IF NOT EXISTS is_preview boolean DEFAULT false;

-- Basic User Progress Tracking
CREATE TABLE IF NOT EXISTS public.user_progress (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  lesson_id uuid NOT NULL,
  course_id uuid NOT NULL,
  completion_percentage integer DEFAULT 0 CHECK (completion_percentage >= 0 AND completion_percentage <= 100),
  time_spent_minutes integer DEFAULT 0,
  last_accessed_at timestamp with time zone DEFAULT now(),
  completed_at timestamp with time zone,
  is_completed boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT user_progress_pkey PRIMARY KEY (id),
  CONSTRAINT user_progress_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE,
  CONSTRAINT user_progress_lesson_id_fkey FOREIGN KEY (lesson_id) REFERENCES public.lessons(id) ON DELETE CASCADE,
  CONSTRAINT user_progress_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(id) ON DELETE CASCADE,
  CONSTRAINT user_progress_user_lesson_unique UNIQUE (user_id, lesson_id)
);

-- Course Sections for better organization
CREATE TABLE IF NOT EXISTS public.course_sections (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL,
  title text NOT NULL,
  description text,
  section_order integer NOT NULL,
  is_published boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT course_sections_pkey PRIMARY KEY (id),
  CONSTRAINT course_sections_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(id) ON DELETE CASCADE
);

-- Update lessons to reference sections
ALTER TABLE public.lessons ADD COLUMN IF NOT EXISTS section_id uuid;
ALTER TABLE public.lessons ADD CONSTRAINT IF NOT EXISTS lessons_section_id_fkey FOREIGN KEY (section_id) REFERENCES public.course_sections(id) ON DELETE SET NULL;

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON public.user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_course_id ON public.user_progress(course_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_lesson_id ON public.user_progress(lesson_id);
CREATE INDEX IF NOT EXISTS idx_lessons_course_id ON public.lessons(course_id);
CREATE INDEX IF NOT EXISTS idx_lessons_section_id ON public.lessons(section_id);
CREATE INDEX IF NOT EXISTS idx_resources_lesson_id ON public.resources(lesson_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_user_id ON public.enrollments(student_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_course_id ON public.enrollments(course_id);

-- Row Level Security Policies
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_progress
CREATE POLICY "Users can view their own progress" ON public.user_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress" ON public.user_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress" ON public.user_progress
  FOR UPDATE USING (auth.uid() = user_id);
