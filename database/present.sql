-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.course_template_fields (
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
  CONSTRAINT course_template_fields_template_id_fkey FOREIGN KEY (template_id) REFERENCES public.course_templates(id)
);
CREATE TABLE public.course_templates (
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
  CONSTRAINT course_templates_pkey PRIMARY KEY (id),
  CONSTRAINT course_templates_created_by_fkey FOREIGN KEY (created_by) REFERENCES auth.users(id)
);
CREATE TABLE public.courses (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  instructor_id uuid,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  is_free boolean DEFAULT false,
  slug text UNIQUE,
  status text DEFAULT 'draft'::text CHECK (status = ANY (ARRAY['draft'::text, 'published'::text, 'archived'::text])),
  price numeric DEFAULT 0,
  template_id uuid,
  template_data jsonb DEFAULT '{}'::jsonb,
  CONSTRAINT courses_pkey PRIMARY KEY (id),
  CONSTRAINT courses_instructor_id_fkey FOREIGN KEY (instructor_id) REFERENCES public.profiles(id),
  CONSTRAINT courses_template_id_fkey FOREIGN KEY (template_id) REFERENCES public.course_templates(id)
);
CREATE TABLE public.enrollments (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  student_id uuid,
  course_id uuid,
  is_active boolean DEFAULT true,
  enrolled_at timestamp with time zone DEFAULT now(),
  CONSTRAINT enrollments_pkey PRIMARY KEY (id),
  CONSTRAINT enrollments_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.profiles(id),
  CONSTRAINT enrollments_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(id)
);
CREATE TABLE public.lesson_sections (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  lesson_id uuid,
  section_type text NOT NULL CHECK (section_type = ANY (ARRAY['text'::text, 'video'::text, 'quiz'::text, 'practice'::text, 'download'::text])),
  content jsonb,
  section_order integer NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT lesson_sections_pkey PRIMARY KEY (id),
  CONSTRAINT lesson_sections_lesson_id_fkey FOREIGN KEY (lesson_id) REFERENCES public.lessons(id)
);
CREATE TABLE public.lessons (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL,
  title text NOT NULL,
  content text,
  lesson_order integer NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  is_preview boolean DEFAULT false,
  slug text,
  content_html text,
  content_text text,
  content_type text DEFAULT 'text'::text,
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
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  lesson_id uuid NOT NULL,
  kind text CHECK (kind = ANY (ARRAY['video'::text, 'pdf'::text, 'image'::text, 'link'::text, 'audio'::text, 'zip'::text])),
  url text NOT NULL,
  mime text,
  duration_sec integer,
  created_at timestamp with time zone DEFAULT now(),
  title text,
  description text,
  file_size integer,
  cdn_url text,
  local_url text,
  upload_status text DEFAULT 'pending'::text,
  CONSTRAINT resources_pkey PRIMARY KEY (id),
  CONSTRAINT resources_lesson_id_fkey FOREIGN KEY (lesson_id) REFERENCES public.lessons(id)
);