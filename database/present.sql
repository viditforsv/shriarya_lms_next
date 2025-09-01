-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.courses (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  instructor_id uuid,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT courses_pkey PRIMARY KEY (id),
  CONSTRAINT courses_instructor_id_fkey FOREIGN KEY (instructor_id) REFERENCES public.profiles(id)
);
CREATE TABLE public.enrollments (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  student_id uuid,
  course_id uuid,
  is_active boolean DEFAULT true,
  enrolled_at timestamp with time zone DEFAULT now(),
  CONSTRAINT enrollments_pkey PRIMARY KEY (id),
  CONSTRAINT enrollments_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(id),
  CONSTRAINT enrollments_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.profiles(id)
);
CREATE TABLE public.lessons (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  course_id uuid,
  title text NOT NULL,
  content text,
  lesson_order integer NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
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
  CONSTRAINT profiles_pkey PRIMARY KEY (id),
  CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id)
);