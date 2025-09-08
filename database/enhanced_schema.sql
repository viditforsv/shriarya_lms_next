-- Enhanced Database Schema for Personalized Learning System
-- This extends the existing schema with personalized learning features

-- User Learning Preferences
CREATE TABLE public.user_preferences (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  learning_style text CHECK (learning_style = ANY (ARRAY['visual'::text, 'auditory'::text, 'kinesthetic'::text, 'reading'::text])),
  difficulty_preference text CHECK (difficulty_preference = ANY (ARRAY['beginner'::text, 'intermediate'::text, 'advanced'::text])),
  preferred_pace text CHECK (preferred_pace = ANY (ARRAY['slow'::text, 'moderate'::text, 'fast'::text])),
  notification_preferences jsonb DEFAULT '{"email": true, "push": true, "sms": false}'::jsonb,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT user_preferences_pkey PRIMARY KEY (id),
  CONSTRAINT user_preferences_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE,
  CONSTRAINT user_preferences_user_id_unique UNIQUE (user_id)
);

-- Enhanced Courses with more metadata
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS category text;
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS difficulty_level text CHECK (difficulty_level = ANY (ARRAY['beginner'::text, 'intermediate'::text, 'advanced'::text]));
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS estimated_duration_hours integer;
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS prerequisites text[];
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS learning_objectives text[];
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS tags text[];
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS thumbnail_url text;
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS is_published boolean DEFAULT false;
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS published_at timestamp with time zone;

-- Enhanced Lessons with more metadata
ALTER TABLE public.lessons ADD COLUMN IF NOT EXISTS description text;
ALTER TABLE public.lessons ADD COLUMN IF NOT EXISTS duration_minutes integer;
ALTER TABLE public.lessons ADD COLUMN IF NOT EXISTS difficulty_level text CHECK (difficulty_level = ANY (ARRAY['beginner'::text, 'intermediate'::text, 'advanced'::text]));
ALTER TABLE public.lessons ADD COLUMN IF NOT EXISTS learning_objectives text[];
ALTER TABLE public.lessons ADD COLUMN IF NOT EXISTS prerequisites text[];
ALTER TABLE public.lessons ADD COLUMN IF NOT EXISTS thumbnail_url text;
ALTER TABLE public.lessons ADD COLUMN IF NOT EXISTS is_published boolean DEFAULT false;

-- Enhanced Resources with more metadata
ALTER TABLE public.resources ADD COLUMN IF NOT EXISTS title text;
ALTER TABLE public.resources ADD COLUMN IF NOT EXISTS description text;
ALTER TABLE public.resources ADD COLUMN IF NOT EXISTS file_size_bytes bigint;
ALTER TABLE public.resources ADD COLUMN IF NOT EXISTS is_downloadable boolean DEFAULT true;
ALTER TABLE public.resources ADD COLUMN IF NOT EXISTS download_count integer DEFAULT 0;
ALTER TABLE public.resources ADD COLUMN IF NOT EXISTS is_preview boolean DEFAULT false;

-- User Progress Tracking
CREATE TABLE public.user_progress (
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

-- User Bookmarks/Favorites
CREATE TABLE public.user_bookmarks (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  lesson_id uuid NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT user_bookmarks_pkey PRIMARY KEY (id),
  CONSTRAINT user_bookmarks_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE,
  CONSTRAINT user_bookmarks_lesson_id_fkey FOREIGN KEY (lesson_id) REFERENCES public.lessons(id) ON DELETE CASCADE,
  CONSTRAINT user_bookmarks_user_lesson_unique UNIQUE (user_id, lesson_id)
);

-- User Notes
CREATE TABLE public.user_notes (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  lesson_id uuid NOT NULL,
  content text NOT NULL,
  timestamp_seconds integer, -- For video notes, timestamp where note was taken
  is_private boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT user_notes_pkey PRIMARY KEY (id),
  CONSTRAINT user_notes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE,
  CONSTRAINT user_notes_lesson_id_fkey FOREIGN KEY (lesson_id) REFERENCES public.lessons(id) ON DELETE CASCADE
);

-- Course Sections (for better organization)
CREATE TABLE public.course_sections (
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
ALTER TABLE public.lessons ADD CONSTRAINT lessons_section_id_fkey FOREIGN KEY (section_id) REFERENCES public.course_sections(id) ON DELETE SET NULL;

-- User Learning Paths (personalized course recommendations)
CREATE TABLE public.learning_paths (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  name text NOT NULL,
  description text,
  course_ids uuid[] NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT learning_paths_pkey PRIMARY KEY (id),
  CONSTRAINT learning_paths_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE
);

-- User Activity Log (for analytics and personalization)
CREATE TABLE public.user_activity (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  activity_type text NOT NULL CHECK (activity_type = ANY (ARRAY['lesson_started'::text, 'lesson_completed'::text, 'video_watched'::text, 'resource_downloaded'::text, 'note_created'::text, 'bookmark_added'::text])),
  lesson_id uuid,
  course_id uuid,
  resource_id uuid,
  metadata jsonb,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT user_activity_pkey PRIMARY KEY (id),
  CONSTRAINT user_activity_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE,
  CONSTRAINT user_activity_lesson_id_fkey FOREIGN KEY (lesson_id) REFERENCES public.lessons(id) ON DELETE SET NULL,
  CONSTRAINT user_activity_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(id) ON DELETE SET NULL,
  CONSTRAINT user_activity_resource_id_fkey FOREIGN KEY (resource_id) REFERENCES public.resources(id) ON DELETE SET NULL
);

-- Course Analytics
CREATE TABLE public.course_analytics (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL,
  total_enrollments integer DEFAULT 0,
  total_completions integer DEFAULT 0,
  average_rating numeric(3,2) DEFAULT 0,
  total_ratings integer DEFAULT 0,
  total_time_spent_minutes bigint DEFAULT 0,
  last_updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT course_analytics_pkey PRIMARY KEY (id),
  CONSTRAINT course_analytics_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(id) ON DELETE CASCADE,
  CONSTRAINT course_analytics_course_id_unique UNIQUE (course_id)
);

-- User Ratings and Reviews
CREATE TABLE public.course_reviews (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  course_id uuid NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text text,
  is_verified boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT course_reviews_pkey PRIMARY KEY (id),
  CONSTRAINT course_reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE,
  CONSTRAINT course_reviews_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(id) ON DELETE CASCADE,
  CONSTRAINT course_reviews_user_course_unique UNIQUE (user_id, course_id)
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON public.user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_course_id ON public.user_progress(course_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_lesson_id ON public.user_progress(lesson_id);
CREATE INDEX IF NOT EXISTS idx_user_activity_user_id ON public.user_activity(user_id);
CREATE INDEX IF NOT EXISTS idx_user_activity_created_at ON public.user_activity(created_at);
CREATE INDEX IF NOT EXISTS idx_lessons_course_id ON public.lessons(course_id);
CREATE INDEX IF NOT EXISTS idx_lessons_section_id ON public.lessons(section_id);
CREATE INDEX IF NOT EXISTS idx_resources_lesson_id ON public.resources(lesson_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_user_id ON public.enrollments(student_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_course_id ON public.enrollments(course_id);

-- Row Level Security Policies
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_reviews ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_preferences
CREATE POLICY "Users can view their own preferences" ON public.user_preferences
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own preferences" ON public.user_preferences
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own preferences" ON public.user_preferences
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for user_progress
CREATE POLICY "Users can view their own progress" ON public.user_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress" ON public.user_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress" ON public.user_progress
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for user_bookmarks
CREATE POLICY "Users can view their own bookmarks" ON public.user_bookmarks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own bookmarks" ON public.user_bookmarks
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own bookmarks" ON public.user_bookmarks
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for user_notes
CREATE POLICY "Users can view their own notes" ON public.user_notes
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own notes" ON public.user_notes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own notes" ON public.user_notes
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own notes" ON public.user_notes
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for learning_paths
CREATE POLICY "Users can view their own learning paths" ON public.learning_paths
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own learning paths" ON public.learning_paths
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own learning paths" ON public.learning_paths
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own learning paths" ON public.learning_paths
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for user_activity
CREATE POLICY "Users can view their own activity" ON public.user_activity
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own activity" ON public.user_activity
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for course_reviews
CREATE POLICY "Anyone can view published reviews" ON public.course_reviews
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own reviews" ON public.course_reviews
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reviews" ON public.course_reviews
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reviews" ON public.course_reviews
  FOR DELETE USING (auth.uid() = user_id);
