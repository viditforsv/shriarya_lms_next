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
  CONSTRAINT enrollments_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(id),
  CONSTRAINT enrollments_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.profiles(id)
);
CREATE TABLE public.lessons (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  title text NOT NULL,
  notes text,
  created_at timestamp without time zone DEFAULT now(),
  course_id uuid,
  slug text UNIQUE,
  lesson_order integer,
  is_preview boolean DEFAULT false,
  content_html text,
  content text,
  quiz_id uuid,
  video_url text,
  video_thumbnail text,
  pdf_url text,
  key_points jsonb,
  unit_name text,
  chapter_name text,
  CONSTRAINT lessons_pkey PRIMARY KEY (id),
  CONSTRAINT lessons_quiz_id_fkey FOREIGN KEY (quiz_id) REFERENCES public.quizzes(id),
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
CREATE TABLE public.question_bank (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  is_pyq boolean NOT NULL DEFAULT true,
  question_number text,
  total_marks integer,
  pyq_year integer,
  month text,
  paper_number integer,
  Time Zone text,
  question_text text NOT NULL,
  tags ARRAY DEFAULT '{}'::text[],
  section text,
  subject text NOT NULL DEFAULT 'IBDP Mathematics AA HL'::text,
  explanation text,
  calculator text,
  correct_answer text,
  difficulty integer CHECK (difficulty >= 1 AND difficulty <= 10),
  created_at timestamp with time zone DEFAULT now(),
  image_url text,
  solution_steps jsonb DEFAULT '[]'::jsonb,
  solution_image text,
  question_type text NOT NULL DEFAULT 'subjective'::text CHECK (question_type = ANY (ARRAY['mcq'::text, 'subjective'::text, 'true_false'::text, 'fill_blank'::text])),
  mark_allocation jsonb,
  board text NOT NULL DEFAULT 'IBDP'::text,
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
  CONSTRAINT question_bank_pkey PRIMARY KEY (id)
);
CREATE TABLE public.quiz_questions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  quiz_id uuid NOT NULL,
  question_id uuid NOT NULL,
  question_order integer NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT quiz_questions_pkey PRIMARY KEY (id),
  CONSTRAINT quiz_questions_question_id_fkey FOREIGN KEY (question_id) REFERENCES public.question_bank(id),
  CONSTRAINT quiz_questions_quiz_id_fkey FOREIGN KEY (quiz_id) REFERENCES public.quizzes(id)
);
CREATE TABLE public.quizzes (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  lesson_id uuid,
  title text NOT NULL,
  difficulty text,
  time_limit integer,
  created_at timestamp without time zone DEFAULT now(),
  CONSTRAINT quizzes_pkey PRIMARY KEY (id),
  CONSTRAINT quizzes_lesson_id_fkey FOREIGN KEY (lesson_id) REFERENCES public.lessons(id)
);