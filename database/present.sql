-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.courses (
  title text NOT NULL,
  description text,
  instructor_id uuid,
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  is_free boolean DEFAULT false,
  slug text UNIQUE,
  CONSTRAINT courses_pkey PRIMARY KEY (id),
  CONSTRAINT courses_instructor_id_fkey FOREIGN KEY (instructor_id) REFERENCES public.profiles(id)
);
CREATE TABLE public.enrollments (
  student_id uuid,
  course_id uuid,
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  is_active boolean DEFAULT true,
  enrolled_at timestamp with time zone DEFAULT now(),
  CONSTRAINT enrollments_pkey PRIMARY KEY (id),
  CONSTRAINT enrollments_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(id),
  CONSTRAINT enrollments_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.profiles(id)
);
CREATE TABLE public.lessons (
  title text NOT NULL,
  course_id uuid NOT NULL,
  content text,
  lesson_order integer NOT NULL,
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone DEFAULT now(),
  is_preview boolean DEFAULT false,
  slug text,
  CONSTRAINT lessons_pkey PRIMARY KEY (id),
  CONSTRAINT lessons_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(id)
);
CREATE TABLE public.profiles (
  id uuid NOT NULL,
  first_name text,
  last_name text,
  role text DEFAULT 'student'::text CHECK (role = ANY (ARRAY['student'::text, 'admin'::text])),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  avatar_url text,
  email text NOT NULL,
  CONSTRAINT profiles_pkey PRIMARY KEY (id),
  CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id)
);
CREATE TABLE public.resources (
  lesson_id uuid NOT NULL,
  kind text CHECK (kind = ANY (ARRAY['video'::text, 'pdf'::text, 'image'::text, 'link'::text, 'audio'::text, 'zip'::text])),
  url text NOT NULL,
  mime text,
  duration_sec integer,
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT resources_pkey PRIMARY KEY (id),
  CONSTRAINT resources_lesson_id_fkey FOREIGN KEY (lesson_id) REFERENCES public.lessons(id)
);