drop extension if exists "pg_net";

create type "public"."board_enum" as enum ('CBSE', 'IBDP', 'IGCSE', 'ISC', 'ICSE');

create type "public"."question_type_enum" as enum ('subjective', 'mcq', 'true_false', 'fill_blank');

drop trigger if exists "trigger_calculate_qa_overall_rating" on "public"."qa_questions";

alter table "public"."courses" drop constraint "courses_slug_key";

alter table "public"."courses_lessons" drop constraint "courses_lessons_slug_key";

alter table "public"."courses_templates" drop constraint "courses_templates_slug_key";

alter table "public"."qa_questions" drop constraint "qa_questions_clarity_rating_check";

alter table "public"."qa_questions" drop constraint "qa_questions_content_accuracy_check";

alter table "public"."qa_questions" drop constraint "qa_questions_difficulty_appropriateness_check";

alter table "public"."qa_questions" drop constraint "qa_questions_priority_level_check";

alter table "public"."qa_questions" drop constraint "qa_questions_qa_status_check";

alter table "public"."qa_questions" drop constraint "qa_questions_solution_quality_check";

alter table "public"."user_onboarding_progress" drop constraint "user_onboarding_progress_user_id_key";

alter table "public"."user_profiles" drop constraint "user_profiles_user_id_key";

alter table "public"."assignment_submissions" drop constraint "assignment_submissions_course_id_fkey";

alter table "public"."assignment_submissions" drop constraint "assignment_submissions_user_id_fkey";

alter table "public"."courses_chapters" drop constraint "courses_chapters_unit_id_fkey";

alter table "public"."courses_lessons" drop constraint "courses_lessons_topic_id_fkey";

alter table "public"."courses_units" drop constraint "courses_units_course_id_fkey";

alter table "public"."lesson_feedback" drop constraint "lesson_feedback_reviewed_by_fkey";

alter table "public"."lesson_feedback" drop constraint "lesson_feedback_user_id_fkey";

alter table "public"."payments" drop constraint "payments_provider_check";

alter table "public"."payments" drop constraint "payments_status_check";

alter table "public"."question_assignments" drop constraint "question_assignments_assigned_by_fkey";

alter table "public"."question_assignments" drop constraint "question_assignments_assigned_to_fkey";

alter table "public"."quizzes" drop constraint "quizzes_lesson_id_fkey";

drop function if exists "public"."calculate_qa_overall_rating"();

-- Drop foreign keys that depend on primary keys first (must be done before dropping PKs)
alter table "public"."user_progress" drop constraint if exists "user_progress_lesson_id_fkey";
alter table "public"."lesson_tags" drop constraint if exists "lesson_tags_lesson_id_fkey";
alter table "public"."lesson_feedback" drop constraint if exists "lesson_feedback_lesson_id_fkey";
alter table "public"."course_template_fields" drop constraint if exists "course_template_fields_template_id_fkey";
alter table "public"."courses" drop constraint if exists "courses_template_id_fkey";
alter table "public"."qa_history" drop constraint if exists "qa_history_qa_id_fkey";

alter table "public"."courses_enrollments" drop constraint "courses_enrollments_pkey";

alter table "public"."courses_lessons" drop constraint "courses_lessons_pkey";

alter table "public"."courses_templates" drop constraint "courses_templates_pkey";

alter table "public"."qa_questions" drop constraint "qa_questions_pkey";

alter table "public"."user_onboarding_progress" drop constraint "user_onboarding_progress_pkey";

alter table "public"."user_role_assignments" drop constraint "user_role_assignments_pkey";

drop index if exists "public"."courses_enrollments_pkey";

drop index if exists "public"."courses_lessons_pkey";

drop index if exists "public"."courses_lessons_slug_key";

drop index if exists "public"."courses_slug_key";

drop index if exists "public"."courses_templates_pkey";

drop index if exists "public"."courses_templates_slug_key";

drop index if exists "public"."idx_courses_enrollments_course_id";

drop index if exists "public"."idx_courses_enrollments_student_id";

drop index if exists "public"."idx_courses_lessons_course_id";

drop index if exists "public"."idx_courses_lessons_slug";

drop index if exists "public"."qa_questions_pkey";

drop index if exists "public"."user_onboarding_progress_pkey";

drop index if exists "public"."user_onboarding_progress_user_id_key";

drop index if exists "public"."user_profiles_user_id_key";

drop index if exists "public"."user_role_assignments_pkey";

alter table "public"."assignment_submissions" enable row level security;

alter table "public"."course_template_fields" alter column "field_key" set data type character varying(100) using "field_key"::character varying(100);

alter table "public"."course_template_fields" alter column "field_label" set data type character varying(255) using "field_label"::character varying(255);

alter table "public"."course_template_fields" alter column "field_type" set data type character varying(50) using "field_type"::character varying(50);

alter table "public"."course_template_fields" enable row level security;

alter table "public"."courses" enable row level security;

alter table "public"."courses_templates" alter column "curriculum" set data type character varying(50) using "curriculum"::character varying(50);

alter table "public"."courses_templates" alter column "grade" set data type character varying(50) using "grade"::character varying(50);

alter table "public"."courses_templates" alter column "level" set data type character varying(50) using "level"::character varying(50);

alter table "public"."courses_templates" alter column "name" set data type character varying(255) using "name"::character varying(255);

alter table "public"."courses_templates" alter column "slug" set data type character varying(255) using "slug"::character varying(255);

alter table "public"."courses_templates" alter column "subject" set data type character varying(100) using "subject"::character varying(100);

alter table "public"."lesson_feedback" enable row level security;

alter table "public"."payments" alter column "currency" set data type character varying(3) using "currency"::character varying(3);

alter table "public"."payments" alter column "provider" set data type character varying(20) using "provider"::character varying(20);

alter table "public"."payments" alter column "status" set data type character varying(20) using "status"::character varying(20);

alter table "public"."payments" enable row level security;

alter table "public"."permission_categories" enable row level security;

alter table "public"."qa_history" enable row level security;

alter table "public"."qa_questions" drop column "overall_rating";

alter table "public"."qa_questions" add column "overall_rating" numeric(3,2) generated always as ((((((COALESCE(content_accuracy, 0) + COALESCE(difficulty_appropriateness, 0)) + COALESCE(clarity_rating, 0)) + COALESCE(solution_quality, 0)))::numeric / 4.0)) stored;

alter table "public"."qa_questions" enable row level security;

alter table "public"."question_assignments" enable row level security;

alter table "public"."question_bank" alter column "human_readable_id" set data type character varying(50) using "human_readable_id"::character varying(50);

alter table "public"."question_bank" enable row level security;

alter table "public"."quiz_questions" enable row level security;

alter table "public"."quizzes" enable row level security;

alter table "public"."user_onboarding_progress" enable row level security;

alter table "public"."user_profiles" enable row level security;

alter table "public"."user_progress" enable row level security;

alter table "public"."user_role_assignments" enable row level security;

CREATE UNIQUE INDEX course_template_fields_template_id_field_key_key ON public.course_template_fields USING btree (template_id, field_key);

CREATE UNIQUE INDEX course_templates_pkey ON public.courses_templates USING btree (id);

CREATE UNIQUE INDEX course_templates_slug_key ON public.courses_templates USING btree (slug);

CREATE UNIQUE INDEX courses_slug_unique ON public.courses USING btree (slug);

CREATE UNIQUE INDEX enrollments_pkey ON public.courses_enrollments USING btree (id);

CREATE UNIQUE INDEX enrollments_student_id_course_id_key ON public.courses_enrollments USING btree (student_id, course_id);

CREATE UNIQUE INDEX enrollments_unique_student_course ON public.courses_enrollments USING btree (student_id, course_id);

CREATE INDEX idx_course_templates_active ON public.courses_templates USING btree (is_active);

CREATE INDEX idx_course_templates_curriculum ON public.courses_templates USING btree (curriculum);

CREATE INDEX idx_course_templates_subject ON public.courses_templates USING btree (subject);

CREATE INDEX idx_courses_curriculum ON public.courses USING btree (curriculum);

CREATE INDEX idx_courses_grade ON public.courses USING btree (grade);

CREATE INDEX idx_courses_subject ON public.courses USING btree (subject);

CREATE INDEX idx_courses_template_id ON public.courses USING btree (template_id);

CREATE INDEX idx_enrollments_teacher_id ON public.courses_enrollments USING btree (assigned_teacher_id);

CREATE INDEX idx_lesson_feedback_course_slug ON public.lesson_feedback USING btree (course_slug);

CREATE INDEX idx_lesson_feedback_created_at ON public.lesson_feedback USING btree (created_at DESC);

CREATE INDEX idx_lesson_feedback_lesson_id ON public.lesson_feedback USING btree (lesson_id);

CREATE INDEX idx_lesson_feedback_status ON public.lesson_feedback USING btree (status);

CREATE INDEX idx_lesson_feedback_user_id ON public.lesson_feedback USING btree (user_id);

CREATE INDEX idx_lesson_tags_lesson ON public.lesson_tags USING btree (lesson_id);

CREATE INDEX idx_lesson_tags_name ON public.lesson_tags USING btree (tag_name);

CREATE INDEX idx_lessons_course_id ON public.courses_lessons USING btree (course_id);

CREATE INDEX idx_lessons_is_preview ON public.courses_lessons USING btree (is_preview);

CREATE INDEX idx_lessons_lesson_order ON public.courses_lessons USING btree (lesson_order);

CREATE INDEX idx_lessons_slug ON public.courses_lessons USING btree (slug);

CREATE INDEX idx_lessons_topic ON public.courses_lessons USING btree (topic_id);

CREATE INDEX idx_payments_course_id ON public.payments USING btree (course_id);

CREATE INDEX idx_payments_created_at ON public.payments USING btree (created_at);

CREATE INDEX idx_payments_provider ON public.payments USING btree (provider);

CREATE INDEX idx_permissions_name_active ON public.permissions USING btree (name, is_active);

CREATE INDEX idx_profiles_email ON public.profiles USING btree (email);

CREATE INDEX idx_qa_history_action ON public.qa_history USING btree (action);

CREATE INDEX idx_qa_history_date ON public.qa_history USING btree (created_at);

CREATE INDEX idx_qa_history_qa_id ON public.qa_history USING btree (qa_id);

CREATE INDEX idx_question_assignments_assigned_to ON public.question_assignments USING btree (assigned_to);

CREATE INDEX idx_question_assignments_assignment_type ON public.question_assignments USING btree (assignment_type);

CREATE INDEX idx_question_assignments_question_id ON public.question_assignments USING btree (question_id);

CREATE INDEX idx_question_assignments_status ON public.question_assignments USING btree (status);

CREATE INDEX idx_question_bank_boards ON public.question_bank USING gin (boards);

CREATE INDEX idx_question_bank_course_types ON public.question_bank USING gin (course_types);

CREATE INDEX idx_question_bank_display_number ON public.question_bank USING btree (question_display_number);

CREATE INDEX idx_question_bank_grade ON public.question_bank USING btree (grade);

CREATE INDEX idx_question_bank_human_readable_id ON public.question_bank USING btree (human_readable_id);

CREATE INDEX idx_question_bank_is_active ON public.question_bank USING btree (is_active);

CREATE INDEX idx_question_bank_levels ON public.question_bank USING gin (levels);

CREATE INDEX idx_question_bank_paper_number ON public.question_bank USING btree (paper_number);

CREATE INDEX idx_question_bank_pyq_year ON public.question_bank USING btree (pyq_year);

CREATE INDEX idx_question_bank_question_type ON public.question_bank USING btree (question_type);

CREATE INDEX idx_question_bank_relevance ON public.question_bank USING gin (relevance);

CREATE INDEX idx_question_bank_topic ON public.question_bank USING btree (topic);

CREATE INDEX idx_question_qa_flagged ON public.qa_questions USING btree (is_flagged) WHERE (is_flagged = true);

CREATE INDEX idx_question_qa_priority ON public.qa_questions USING btree (priority_level);

CREATE INDEX idx_question_qa_question_id ON public.qa_questions USING btree (question_id);

CREATE INDEX idx_question_qa_rating ON public.qa_questions USING btree (overall_rating);

CREATE INDEX idx_question_qa_reviewer ON public.qa_questions USING btree (reviewer_id);

CREATE INDEX idx_question_qa_status ON public.qa_questions USING btree (qa_status);

CREATE INDEX idx_quiz_questions_order ON public.quiz_questions USING btree (quiz_id, question_order);

CREATE INDEX idx_quiz_questions_question_id ON public.quiz_questions USING btree (question_id);

CREATE INDEX idx_quiz_questions_quiz_id ON public.quiz_questions USING btree (quiz_id);

CREATE INDEX idx_roles_permissions ON public.roles USING gin (permissions);

CREATE INDEX idx_submissions_graded_by ON public.assignment_submissions USING btree (graded_by);

CREATE INDEX idx_submissions_grading_status ON public.assignment_submissions USING btree (grading_status);

CREATE INDEX idx_submissions_user_course ON public.assignment_submissions USING btree (user_id, course_id);

CREATE INDEX idx_topics_chapter ON public.courses_topics USING btree (chapter_id);

CREATE INDEX idx_topics_order ON public.courses_topics USING btree (chapter_id, topic_order);

CREATE INDEX idx_user_onboarding_user_id ON public.user_onboarding_progress USING btree (user_id);

CREATE INDEX idx_user_profiles_user_id ON public.user_profiles USING btree (user_id);

CREATE INDEX idx_user_progress_last_accessed ON public.user_progress USING btree (last_accessed_at DESC);

CREATE INDEX idx_user_progress_lesson_id ON public.user_progress USING btree (lesson_id);

CREATE INDEX idx_user_roles_active ON public.user_role_assignments USING btree (is_active) WHERE (is_active = true);

CREATE INDEX idx_user_roles_role_name ON public.user_role_assignments USING btree (role_name);

CREATE INDEX idx_user_roles_user_active ON public.user_role_assignments USING btree (user_id, is_active);

CREATE INDEX idx_user_roles_user_id ON public.user_role_assignments USING btree (user_id);

CREATE UNIQUE INDEX lessons_pkey ON public.courses_lessons USING btree (id);

CREATE UNIQUE INDEX lessons_slug_unique ON public.courses_lessons USING btree (slug);

CREATE UNIQUE INDEX payments_user_course_unique ON public.payments USING btree (user_id, course_id);

CREATE UNIQUE INDEX question_assignments_question_id_assigned_to_assignment_typ_key ON public.question_assignments USING btree (question_id, assigned_to, assignment_type);

CREATE UNIQUE INDEX question_qa_pkey ON public.qa_questions USING btree (id);

CREATE UNIQUE INDEX quiz_questions_quiz_question_unique ON public.quiz_questions USING btree (quiz_id, question_id);

CREATE UNIQUE INDEX unique_topic_per_chapter ON public.courses_topics USING btree (chapter_id, topic_number);

CREATE UNIQUE INDEX user_onboarding_pkey ON public.user_onboarding_progress USING btree (id);

CREATE UNIQUE INDEX user_onboarding_user_id_unique ON public.user_onboarding_progress USING btree (user_id);

CREATE UNIQUE INDEX user_profiles_user_id_unique ON public.user_profiles USING btree (user_id);

CREATE UNIQUE INDEX user_progress_unique_user_lesson ON public.user_progress USING btree (user_id, lesson_id);

CREATE UNIQUE INDEX user_progress_user_lesson_unique ON public.user_progress USING btree (user_id, lesson_id);

CREATE UNIQUE INDEX user_roles_pkey ON public.user_role_assignments USING btree (id);

alter table "public"."courses_enrollments" add constraint "enrollments_pkey" PRIMARY KEY using index "enrollments_pkey";

alter table "public"."courses_lessons" add constraint "lessons_pkey" PRIMARY KEY using index "lessons_pkey";

alter table "public"."courses_templates" add constraint "course_templates_pkey" PRIMARY KEY using index "course_templates_pkey";

alter table "public"."qa_questions" add constraint "question_qa_pkey" PRIMARY KEY using index "question_qa_pkey";

alter table "public"."user_onboarding_progress" add constraint "user_onboarding_pkey" PRIMARY KEY using index "user_onboarding_pkey";

alter table "public"."user_role_assignments" add constraint "user_roles_pkey" PRIMARY KEY using index "user_roles_pkey";

alter table "public"."course_template_fields" add constraint "course_template_fields_template_id_field_key_key" UNIQUE using index "course_template_fields_template_id_field_key_key";

alter table "public"."courses" add constraint "courses_slug_unique" UNIQUE using index "courses_slug_unique";

alter table "public"."courses_enrollments" add constraint "enrollments_student_id_course_id_key" UNIQUE using index "enrollments_student_id_course_id_key";

alter table "public"."courses_enrollments" add constraint "enrollments_unique_student_course" UNIQUE using index "enrollments_unique_student_course";

alter table "public"."courses_lessons" add constraint "lessons_slug_unique" UNIQUE using index "lessons_slug_unique";

alter table "public"."courses_templates" add constraint "course_templates_slug_key" UNIQUE using index "course_templates_slug_key";

alter table "public"."courses_topics" add constraint "unique_topic_per_chapter" UNIQUE using index "unique_topic_per_chapter";

alter table "public"."payments" add constraint "payments_user_course_unique" UNIQUE using index "payments_user_course_unique";

alter table "public"."qa_questions" add constraint "question_qa_clarity_rating_check" CHECK (((clarity_rating >= 1) AND (clarity_rating <= 5))) not valid;

alter table "public"."qa_questions" validate constraint "question_qa_clarity_rating_check";

alter table "public"."qa_questions" add constraint "question_qa_content_accuracy_check" CHECK (((content_accuracy >= 1) AND (content_accuracy <= 5))) not valid;

alter table "public"."qa_questions" validate constraint "question_qa_content_accuracy_check";

alter table "public"."qa_questions" add constraint "question_qa_difficulty_appropriateness_check" CHECK (((difficulty_appropriateness >= 1) AND (difficulty_appropriateness <= 5))) not valid;

alter table "public"."qa_questions" validate constraint "question_qa_difficulty_appropriateness_check";

alter table "public"."qa_questions" add constraint "question_qa_priority_level_check" CHECK ((priority_level = ANY (ARRAY['low'::text, 'medium'::text, 'high'::text, 'urgent'::text]))) not valid;

alter table "public"."qa_questions" validate constraint "question_qa_priority_level_check";

alter table "public"."qa_questions" add constraint "question_qa_qa_status_check" CHECK ((qa_status = ANY (ARRAY['pending'::text, 'in_review'::text, 'needs_revision'::text, 'approved'::text, 'rejected'::text, 'archived'::text]))) not valid;

alter table "public"."qa_questions" validate constraint "question_qa_qa_status_check";

alter table "public"."qa_questions" add constraint "question_qa_solution_quality_check" CHECK (((solution_quality >= 1) AND (solution_quality <= 5))) not valid;

alter table "public"."qa_questions" validate constraint "question_qa_solution_quality_check";

alter table "public"."qa_questions" add constraint "valid_reviewer" CHECK ((((qa_status = ANY (ARRAY['in_review'::text, 'needs_revision'::text, 'approved'::text, 'rejected'::text])) AND (reviewer_id IS NOT NULL)) OR ((qa_status = ANY (ARRAY['pending'::text, 'archived'::text])) AND (reviewer_id IS NULL)))) not valid;

alter table "public"."qa_questions" validate constraint "valid_reviewer";

alter table "public"."question_assignments" add constraint "question_assignments_question_id_assigned_to_assignment_typ_key" UNIQUE using index "question_assignments_question_id_assigned_to_assignment_typ_key";

alter table "public"."quiz_questions" add constraint "quiz_questions_quiz_question_unique" UNIQUE using index "quiz_questions_quiz_question_unique";

alter table "public"."user_onboarding_progress" add constraint "user_onboarding_user_id_unique" UNIQUE using index "user_onboarding_user_id_unique";

alter table "public"."user_profiles" add constraint "user_profiles_user_id_unique" UNIQUE using index "user_profiles_user_id_unique";

alter table "public"."user_progress" add constraint "user_progress_unique_user_lesson" UNIQUE using index "user_progress_unique_user_lesson";

alter table "public"."user_progress" add constraint "user_progress_user_lesson_unique" UNIQUE using index "user_progress_user_lesson_unique";

alter table "public"."assignment_submissions" add constraint "assignment_submissions_course_id_fkey" FOREIGN KEY (course_id) REFERENCES public.courses(id) not valid;

alter table "public"."assignment_submissions" validate constraint "assignment_submissions_course_id_fkey";

alter table "public"."assignment_submissions" add constraint "assignment_submissions_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."assignment_submissions" validate constraint "assignment_submissions_user_id_fkey";

alter table "public"."courses_chapters" add constraint "courses_chapters_unit_id_fkey" FOREIGN KEY (unit_id) REFERENCES public.courses_units(id) not valid;

alter table "public"."courses_chapters" validate constraint "courses_chapters_unit_id_fkey";

alter table "public"."courses_lessons" add constraint "courses_lessons_topic_id_fkey" FOREIGN KEY (topic_id) REFERENCES public.courses_topics(id) ON DELETE SET NULL not valid;

alter table "public"."courses_lessons" validate constraint "courses_lessons_topic_id_fkey";

alter table "public"."courses_units" add constraint "courses_units_course_id_fkey" FOREIGN KEY (course_id) REFERENCES public.courses(id) not valid;

alter table "public"."courses_units" validate constraint "courses_units_course_id_fkey";

alter table "public"."lesson_feedback" add constraint "lesson_feedback_reviewed_by_fkey" FOREIGN KEY (reviewed_by) REFERENCES auth.users(id) ON DELETE SET NULL not valid;

alter table "public"."lesson_feedback" validate constraint "lesson_feedback_reviewed_by_fkey";

alter table "public"."lesson_feedback" add constraint "lesson_feedback_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE SET NULL not valid;

alter table "public"."lesson_feedback" validate constraint "lesson_feedback_user_id_fkey";

alter table "public"."payments" add constraint "payments_provider_check" CHECK (((provider)::text = ANY ((ARRAY['razorpay'::character varying, 'stripe'::character varying])::text[]))) not valid;

alter table "public"."payments" validate constraint "payments_provider_check";

alter table "public"."payments" add constraint "payments_status_check" CHECK (((status)::text = ANY ((ARRAY['pending'::character varying, 'completed'::character varying, 'failed'::character varying, 'refunded'::character varying])::text[]))) not valid;

alter table "public"."payments" validate constraint "payments_status_check";

alter table "public"."question_assignments" add constraint "question_assignments_assigned_by_fkey" FOREIGN KEY (assigned_by) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."question_assignments" validate constraint "question_assignments_assigned_by_fkey";

alter table "public"."question_assignments" add constraint "question_assignments_assigned_to_fkey" FOREIGN KEY (assigned_to) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."question_assignments" validate constraint "question_assignments_assigned_to_fkey";

alter table "public"."quizzes" add constraint "quizzes_lesson_id_fkey" FOREIGN KEY (lesson_id) REFERENCES public.courses_lessons(id) ON DELETE CASCADE not valid;

alter table "public"."quizzes" validate constraint "quizzes_lesson_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.assign_default_student_role()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
BEGIN
  -- Function implementation here
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.auto_activate_free_enrollment()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  -- If course is free (price = 0), auto-activate enrollment
  IF EXISTS (
    SELECT 1 FROM public.courses c
    WHERE c.id = NEW.course_id AND c.price = 0
  ) THEN
    NEW.is_active := true;
  END IF;
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.course_is_free(c uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE
AS $function$
  select exists (
    select 1 from public.courses
    where id = c and price = 0
  );
$function$
;

CREATE OR REPLACE FUNCTION public.create_default_lessons()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO 'pg_catalog', 'public'
AS $function$
BEGIN
  -- Insert default lessons when a new course is created
  INSERT INTO public.lessons (title, course_id, content, lesson_order, slug, is_preview) VALUES
  (
    'Introduction',
    NEW.id,
    'Welcome to your new course! This is the introduction lesson. Edit this content to get started.',
    1,
    'introduction',
    true
  ),
  (
    'Getting Started',
    NEW.id,
    'This lesson will help you understand the basics of the course content.',
    2,
    'getting-started',
    false
  ),
  (
    'First Practice Session',
    NEW.id,
    'Complete this practice session to reinforce your learning.',
    3,
    'first-practice',
    false
  );
  
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.create_qa_for_question()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
BEGIN
  -- Function implementation here
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_cbse_course_content(course_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
BEGIN
  -- Function implementation here
  RETURN '{}'::jsonb;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_cbse_course_content(course_slug text)
 RETURNS jsonb
 LANGUAGE plpgsql
AS $function$
DECLARE
  result jsonb;
BEGIN
  SELECT jsonb_build_object(
    'course', row_to_json(c.*),
    'lessons', COALESCE((
      SELECT jsonb_agg(
        jsonb_build_object(
          'id', l.id,
          'title', l.title,
          'slug', l.slug,
          'lesson_order', l.lesson_order,
          'is_preview', l.is_preview,
          'content_html', l.content_html,
          'content', l.content,
          'key_points', l.key_points,
          'video_url', l.video_url,
          'video_thumbnail', l.video_thumbnail,
          'pdf_url', l.pdf_url,
          'quiz_id', l.quiz_id,
          'quiz', (
            SELECT jsonb_build_object(
              'id', q.id,
              'title', q.title,
              'difficulty', q.difficulty,
              'time_limit', q.time_limit
            )
            FROM public.quizzes q
            WHERE q.lesson_id = l.id
            LIMIT 1
          )
        ) ORDER BY l.lesson_order
      )
      FROM public.lessons l
      WHERE l.course_id = c.id
    ), '[]'::jsonb)
  )
  INTO result
  FROM public.courses c
  WHERE c.slug = course_slug;

  RETURN result;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_user_onboarding_status(user_uuid uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    result jsonb;
BEGIN
    SELECT jsonb_build_object(
        'has_profile', (p.id IS NOT NULL),
        'onboarding_completed', COALESCE(o.is_completed, false),
        'current_step', COALESCE(o.current_step, 0),
        'profile_data', COALESCE(p::jsonb, '{}'::jsonb),
        'onboarding_data', COALESCE(o::jsonb, '{}'::jsonb)
    )
    INTO result
    FROM auth.users u
    LEFT JOIN public.user_profiles p ON u.id = p.user_id
    LEFT JOIN public.user_onboarding o ON u.id = o.user_id
    WHERE u.id = user_uuid;
    
    RETURN COALESCE(result, '{}'::jsonb);
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_user_payment_history(user_uuid uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
    result jsonb;
BEGIN
    SELECT jsonb_build_object(
        'payments', COALESCE(
            jsonb_agg(
                jsonb_build_object(
                    'id', p.id,
                    'course_id', p.course_id,
                    'amount', p.amount,
                    'currency', p.currency,
                    'provider', p.provider,
                    'status', p.status,
                    'created_at', p.created_at,
                    'course_title', c.title
                )
            ), '[]'::jsonb
        ),
        'total_payments', COUNT(*),
        'total_amount', COALESCE(SUM(p.amount), 0)
    )
    INTO result
    FROM public.payments p
    LEFT JOIN public.courses c ON p.course_id = c.id
    WHERE p.user_id = user_uuid;
    
    RETURN COALESCE(result, '{"payments": [], "total_payments": 0, "total_amount": 0}'::jsonb);
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_user_permissions(user_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
BEGIN
  -- Function implementation here
  RETURN '[]'::jsonb;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_user_roles(user_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
BEGIN
  -- Function implementation here
  RETURN '[]'::jsonb;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name, email, role)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    COALESCE(NEW.email, ''), -- Add the email field
    COALESCE(NEW.raw_user_meta_data->>'role', 'student')
  );
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.is_admin()
 RETURNS boolean
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
AS $function$
BEGIN
  -- Use SECURITY DEFINER to bypass RLS when checking admin status
  -- This allows the function to read profiles even when RLS would normally block it
  RETURN EXISTS (
    SELECT 1
    FROM profiles
    WHERE id = auth.uid()
    AND role = 'admin'
  );
EXCEPTION
  WHEN OTHERS THEN
    -- If there's any error (including RLS issues), return false
    RETURN false;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.is_admin(uid uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
AS $function$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = uid
      AND role = 'admin'
  );
$function$
;

CREATE OR REPLACE FUNCTION public.is_admin_simple()
 RETURNS boolean
 LANGUAGE plpgsql
 STABLE
AS $function$
BEGIN
  -- For now, we'll use a hardcoded list of admin user IDs
  -- This avoids the circular dependency issue
  RETURN auth.uid() IN (
    '94726b85-7b1d-4d3f-9355-7c727ebd3bd6', -- shrividhyaclasses@gmail.com
    'a2b1d35e-453b-4bc6-b68a-d9e370410459'  -- vidit@shrividhya.in
  );
END;
$function$
;

CREATE OR REPLACE FUNCTION public.is_enrolled(c uuid)
 RETURNS boolean
 LANGUAGE sql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select exists (
    select 1 from public.enrollments
    where course_id = c and student_id = auth.uid() and is_active = true
  );
$function$
;

CREATE OR REPLACE FUNCTION public.log_qa_history()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
BEGIN
  -- Function implementation here
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.make_viditvia_admin()
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  UPDATE public.profiles 
  SET role = 'admin', updated_at = NOW()
  WHERE id IN (
    SELECT id FROM auth.users 
    WHERE email = 'viditvia@gmail.com'
  );
  
  -- Log the action
  RAISE NOTICE 'Updated viditvia@gmail.com to admin role';
END;
$function$
;

create or replace view "public"."payment_analytics" as  SELECT provider,
    currency,
    status,
    count(*) AS payment_count,
    sum(amount) AS total_amount,
    avg(amount) AS average_amount,
    date_trunc('day'::text, created_at) AS payment_date
   FROM public.payments p
  GROUP BY provider, currency, status, (date_trunc('day'::text, created_at))
  ORDER BY (date_trunc('day'::text, created_at)) DESC;


CREATE OR REPLACE FUNCTION public.set_enrollment_student_to_uid()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
begin
  if new.student_id is null then
    new.student_id := auth.uid();
  end if;
  return new;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.update_course_lesson_content_updated_at()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_lesson_feedback_updated_at()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_qa_timestamp()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_user_role(target_user_id uuid, new_role text)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  -- Check if current user is admin
  IF NOT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  ) THEN
    RETURN FALSE;
  END IF;
  
  -- Update the target user's role
  UPDATE public.profiles 
  SET role = new_role, updated_at = NOW()
  WHERE id = target_user_id;
  
  -- Also sync role to auth.users metadata
  UPDATE auth.users
  SET raw_user_meta_data = jsonb_set(
    COALESCE(raw_user_meta_data, '{}'::jsonb),
    '{role}',
    to_jsonb(new_role::text)
  )
  WHERE id = target_user_id;

  RETURN TRUE;
END;
$function$
;

create or replace view "public"."user_complete_data" as  SELECT u.id AS user_id,
    u.email,
    u.created_at AS user_created_at,
    p.first_name,
    p.last_name,
    p.date_of_birth,
    p.country,
    p.city,
    p.bio,
    p.phone_number,
    p.avatar_url,
    o.current_step,
    o.is_completed AS onboarding_completed,
    o.preferences,
    o.educational_background,
    o.selected_courses,
    o.skipped_steps,
    o.completed_at AS onboarding_completed_at,
    o.created_at AS onboarding_created_at,
    o.updated_at AS onboarding_updated_at
   FROM ((auth.users u
     LEFT JOIN public.user_profiles p ON ((u.id = p.user_id)))
     LEFT JOIN public.user_onboarding_progress o ON ((u.id = o.user_id)));


CREATE OR REPLACE FUNCTION public.user_has_permission(user_id uuid, permission_name text)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
BEGIN
  -- Function implementation here
  RETURN false;
END;
$function$
;

create or replace view "public"."question_bank_enhanced" as  SELECT qb.id,
    qb.is_pyq,
    qb.question_number,
    qb.total_marks,
    qb.pyq_year,
    qb.month,
    qb.paper_number,
    qb."Time Zone",
    qb.question_text,
    qb.tags,
    qb.section,
    qb.subject,
    qb.explanation,
    qb.calculator,
    qb.correct_answer,
    qb.difficulty,
    qb.created_at,
    qb.image_url,
    qb.solution_image,
    qb.question_type,
    qb.grade,
    qb.topic,
    qb.subtopic,
    qb.source,
    qb.paper_type,
    qb.updated_at,
    qb.created_by,
    qb.is_active,
    qb.year,
    qb.options,
    qb.human_readable_id,
    qb.question_display_number,
    qb.boards,
    qb.course_types,
    qb.levels,
    qb.relevance,
    COALESCE(qa.qa_status, 'new'::text) AS latest_qa_status,
    qa.priority_level AS latest_priority_level,
    qa.is_flagged AS latest_is_flagged,
    qa.overall_rating AS latest_overall_rating,
    qa.updated_at AS qa_updated_at
   FROM (public.question_bank qb
     LEFT JOIN LATERAL ( SELECT qa_questions.qa_status,
            qa_questions.priority_level,
            qa_questions.is_flagged,
            qa_questions.overall_rating,
            qa_questions.updated_at
           FROM public.qa_questions
          WHERE (qa_questions.question_id = qb.id)
          ORDER BY qa_questions.updated_at DESC
         LIMIT 1) qa ON (true));



  create policy "Public read access on course_template_fields"
  on "public"."course_template_fields"
  as permissive
  for select
  to public
using (true);



  create policy "Admins manage courses"
  on "public"."courses"
  as permissive
  for all
  to authenticated
using ((EXISTS ( SELECT 1
   FROM public.profiles p
  WHERE ((p.id = auth.uid()) AND (p.role = 'admin'::text)))))
with check ((EXISTS ( SELECT 1
   FROM public.profiles p
  WHERE ((p.id = auth.uid()) AND (p.role = 'admin'::text)))));



  create policy "Allow admin full access to courses"
  on "public"."courses"
  as permissive
  for all
  to public
using ((EXISTS ( SELECT 1
   FROM public.profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.role = 'admin'::text)))));



  create policy "Allow authenticated users to read all courses"
  on "public"."courses"
  as permissive
  for select
  to authenticated
using (true);



  create policy "Allow public read access to published courses"
  on "public"."courses"
  as permissive
  for select
  to public
using ((status = 'published'::text));



  create policy "Allow service role full access"
  on "public"."courses"
  as permissive
  for all
  to service_role
using (true)
with check (true);



  create policy "Anyone can view courses"
  on "public"."courses"
  as permissive
  for select
  to anon, authenticated
using (true);



  create policy "Instructors or Admins can manage courses"
  on "public"."courses"
  as permissive
  for all
  to authenticated
using ((public.is_admin_simple() OR (instructor_id = auth.uid())))
with check ((public.is_admin_simple() OR (instructor_id = auth.uid())));



  create policy "Paid courses visible to enrolled users"
  on "public"."courses"
  as permissive
  for select
  to public
using (((price > (0)::numeric) AND (status = 'published'::text) AND (id IN ( SELECT courses_enrollments.course_id
   FROM public.courses_enrollments
  WHERE ((courses_enrollments.student_id = auth.uid()) AND (courses_enrollments.is_active = true))))));



  create policy "Published courses visible to logged in users"
  on "public"."courses"
  as permissive
  for select
  to public
using (((status = 'published'::text) AND (auth.uid() IS NOT NULL)));



  create policy "Students can view published courses"
  on "public"."courses"
  as permissive
  for select
  to public
using ((status = 'published'::text));



  create policy "courses: admins can insert/update/delete"
  on "public"."courses"
  as permissive
  for all
  to authenticated
using (public.is_admin())
with check (public.is_admin());



  create policy "courses: anyone can read"
  on "public"."courses"
  as permissive
  for select
  to anon, authenticated
using (true);



  create policy "fix_authenticated_admins"
  on "public"."courses"
  as permissive
  for all
  to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));



  create policy "admin_full_access"
  on "public"."courses_enrollments"
  as permissive
  for all
  to authenticated
using ((EXISTS ( SELECT 1
   FROM public.profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.role = 'admin'::text)))))
with check ((EXISTS ( SELECT 1
   FROM public.profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.role = 'admin'::text)))));



  create policy "users_create_own"
  on "public"."courses_enrollments"
  as permissive
  for insert
  to authenticated
with check ((student_id = auth.uid()));



  create policy "users_update_own"
  on "public"."courses_enrollments"
  as permissive
  for update
  to authenticated
using ((student_id = auth.uid()))
with check ((student_id = auth.uid()));



  create policy "users_view_own"
  on "public"."courses_enrollments"
  as permissive
  for select
  to authenticated
using ((student_id = auth.uid()));



  create policy "Allow admin full access to lessons"
  on "public"."courses_lessons"
  as permissive
  for all
  to authenticated
using ((EXISTS ( SELECT 1
   FROM public.profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.role = 'admin'::text)))))
with check ((EXISTS ( SELECT 1
   FROM public.profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.role = 'admin'::text)))));



  create policy "Allow content managers to manage lessons"
  on "public"."courses_lessons"
  as permissive
  for all
  to authenticated
using ((EXISTS ( SELECT 1
   FROM public.profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.role = ANY (ARRAY['admin'::text, 'content_manager'::text]))))))
with check ((EXISTS ( SELECT 1
   FROM public.profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.role = ANY (ARRAY['admin'::text, 'content_manager'::text]))))));



  create policy "Allow enrolled students to read lessons"
  on "public"."courses_lessons"
  as permissive
  for select
  to authenticated
using ((EXISTS ( SELECT 1
   FROM public.courses_enrollments
  WHERE ((courses_enrollments.course_id = courses_lessons.course_id) AND (courses_enrollments.student_id = auth.uid()) AND (courses_enrollments.is_active = true)))));



  create policy "Public read access on lessons"
  on "public"."courses_lessons"
  as permissive
  for select
  to public
using (true);



  create policy "Public read access on course_templates"
  on "public"."courses_templates"
  as permissive
  for select
  to public
using (true);



  create policy "Admins can update feedback"
  on "public"."lesson_feedback"
  as permissive
  for update
  to authenticated
using ((EXISTS ( SELECT 1
   FROM public.profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.role = 'admin'::text)))));



  create policy "Admins can view all feedback"
  on "public"."lesson_feedback"
  as permissive
  for select
  to authenticated
using ((EXISTS ( SELECT 1
   FROM public.profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.role = 'admin'::text)))));



  create policy "Users can insert feedback"
  on "public"."lesson_feedback"
  as permissive
  for insert
  to authenticated
with check (((auth.uid() = user_id) OR (user_id IS NULL)));



  create policy "Users can view own feedback"
  on "public"."lesson_feedback"
  as permissive
  for select
  to authenticated
using ((auth.uid() = user_id));



  create policy "Admins can view all payments"
  on "public"."payments"
  as permissive
  for select
  to public
using ((EXISTS ( SELECT 1
   FROM public.profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.role = 'admin'::text)))));



  create policy "System can insert payments"
  on "public"."payments"
  as permissive
  for insert
  to public
with check (true);



  create policy "System can update payments"
  on "public"."payments"
  as permissive
  for update
  to public
using (true);



  create policy "Users or Admins can view payments"
  on "public"."payments"
  as permissive
  for select
  to authenticated
using ((public.is_admin_simple() OR (user_id = auth.uid())));



  create policy "Authenticated users can manage permission categories"
  on "public"."permission_categories"
  as permissive
  for all
  to public
using ((auth.uid() IS NOT NULL));



  create policy "Authenticated users can view permission categories"
  on "public"."permission_categories"
  as permissive
  for select
  to public
using ((auth.uid() IS NOT NULL));



  create policy "Authenticated users can manage permissions"
  on "public"."permissions"
  as permissive
  for all
  to public
using ((auth.uid() IS NOT NULL));



  create policy "Authenticated users can view permissions"
  on "public"."permissions"
  as permissive
  for select
  to public
using ((auth.uid() IS NOT NULL));



  create policy "Admins can update all profiles"
  on "public"."profiles"
  as permissive
  for update
  to authenticated
using ((EXISTS ( SELECT 1
   FROM public.profiles profiles_1
  WHERE ((profiles_1.id = auth.uid()) AND (profiles_1.role = 'admin'::text)))))
with check ((EXISTS ( SELECT 1
   FROM public.profiles profiles_1
  WHERE ((profiles_1.id = auth.uid()) AND (profiles_1.role = 'admin'::text)))));



  create policy "Admins can view all profiles"
  on "public"."profiles"
  as permissive
  for select
  to authenticated
using ((EXISTS ( SELECT 1
   FROM public.profiles profiles_1
  WHERE ((profiles_1.id = auth.uid()) AND (profiles_1.role = 'admin'::text)))));



  create policy "Users can insert own profile"
  on "public"."profiles"
  as permissive
  for insert
  to authenticated
with check ((auth.uid() = id));



  create policy "Users can update own profile"
  on "public"."profiles"
  as permissive
  for update
  to authenticated
using ((auth.uid() = id))
with check ((auth.uid() = id));



  create policy "Users can view own profile"
  on "public"."profiles"
  as permissive
  for select
  to authenticated
using ((auth.uid() = id));



  create policy "Enable ALL for authenticated users"
  on "public"."qa_history"
  as permissive
  for all
  to authenticated
using (true)
with check (true);



  create policy "Enable ALL for authenticated users"
  on "public"."qa_questions"
  as permissive
  for all
  to authenticated
using (true)
with check (true);



  create policy "Admins and content managers can create assignments"
  on "public"."question_assignments"
  as permissive
  for insert
  to public
with check ((EXISTS ( SELECT 1
   FROM public.profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.role = ANY (ARRAY['admin'::text, 'content_manager'::text]))))));



  create policy "Admins and content managers can delete assignments"
  on "public"."question_assignments"
  as permissive
  for delete
  to public
using ((EXISTS ( SELECT 1
   FROM public.profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.role = ANY (ARRAY['admin'::text, 'content_manager'::text]))))));



  create policy "Admins can view all assignments"
  on "public"."question_assignments"
  as permissive
  for all
  to public
using ((EXISTS ( SELECT 1
   FROM public.profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.role = 'admin'::text)))));



  create policy "Content managers can view relevant assignments"
  on "public"."question_assignments"
  as permissive
  for select
  to public
using ((EXISTS ( SELECT 1
   FROM public.profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.role = 'content_manager'::text)))));



  create policy "Users can update their assignment status"
  on "public"."question_assignments"
  as permissive
  for update
  to public
using ((auth.uid() = assigned_to))
with check ((auth.uid() = assigned_to));



  create policy "Users can view their own assignments"
  on "public"."question_assignments"
  as permissive
  for select
  to public
using ((auth.uid() = assigned_to));



  create policy "Allow authenticated users to delete questions"
  on "public"."question_bank"
  as permissive
  for delete
  to public
using ((auth.role() = 'authenticated'::text));



  create policy "Allow authenticated users to insert questions"
  on "public"."question_bank"
  as permissive
  for insert
  to public
with check ((auth.role() = 'authenticated'::text));



  create policy "Allow authenticated users to read question bank"
  on "public"."question_bank"
  as permissive
  for select
  to public
using ((auth.role() = 'authenticated'::text));



  create policy "Allow authenticated users to update questions"
  on "public"."question_bank"
  as permissive
  for update
  to public
using ((auth.role() = 'authenticated'::text));



  create policy "Allow authenticated users to delete quiz questions"
  on "public"."quiz_questions"
  as permissive
  for delete
  to public
using ((auth.role() = 'authenticated'::text));



  create policy "Allow authenticated users to insert quiz questions"
  on "public"."quiz_questions"
  as permissive
  for insert
  to public
with check ((auth.role() = 'authenticated'::text));



  create policy "Allow authenticated users to read quiz questions"
  on "public"."quiz_questions"
  as permissive
  for select
  to public
using ((auth.role() = 'authenticated'::text));



  create policy "Allow authenticated users to update quiz questions"
  on "public"."quiz_questions"
  as permissive
  for update
  to public
using ((auth.role() = 'authenticated'::text));



  create policy "Public read access on quizzes"
  on "public"."quizzes"
  as permissive
  for select
  to public
using (true);



  create policy "Authenticated users can manage roles"
  on "public"."roles"
  as permissive
  for all
  to public
using ((auth.uid() IS NOT NULL));



  create policy "Authenticated users can view roles"
  on "public"."roles"
  as permissive
  for select
  to public
using ((auth.uid() IS NOT NULL));



  create policy "Users can delete own onboarding data"
  on "public"."user_onboarding_progress"
  as permissive
  for delete
  to public
using ((auth.uid() = user_id));



  create policy "Users can insert own onboarding data"
  on "public"."user_onboarding_progress"
  as permissive
  for insert
  to public
with check ((auth.uid() = user_id));



  create policy "Users can update own onboarding data"
  on "public"."user_onboarding_progress"
  as permissive
  for update
  to public
using ((auth.uid() = user_id));



  create policy "Users can view own onboarding data"
  on "public"."user_onboarding_progress"
  as permissive
  for select
  to public
using ((auth.uid() = user_id));



  create policy "Users can delete own profile"
  on "public"."user_profiles"
  as permissive
  for delete
  to public
using ((auth.uid() = user_id));



  create policy "Users can insert own profile"
  on "public"."user_profiles"
  as permissive
  for insert
  to public
with check ((auth.uid() = user_id));



  create policy "Users or Admins can update profile"
  on "public"."user_profiles"
  as permissive
  for update
  to authenticated
using ((public.is_admin_simple() OR (user_id = auth.uid())))
with check ((public.is_admin_simple() OR (user_id = auth.uid())));



  create policy "Users or Admins can view profile"
  on "public"."user_profiles"
  as permissive
  for select
  to authenticated
using ((public.is_admin_simple() OR (user_id = auth.uid())));



  create policy "Admins have full access to user progress"
  on "public"."user_progress"
  as permissive
  for all
  to authenticated
using ((EXISTS ( SELECT 1
   FROM public.profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.role = 'admin'::text)))))
with check ((EXISTS ( SELECT 1
   FROM public.profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.role = 'admin'::text)))));



  create policy "Users can create their own progress"
  on "public"."user_progress"
  as permissive
  for insert
  to authenticated
with check ((user_id = auth.uid()));



  create policy "Users can update their own progress"
  on "public"."user_progress"
  as permissive
  for update
  to authenticated
using ((user_id = auth.uid()))
with check ((user_id = auth.uid()));



  create policy "Users can view their own progress"
  on "public"."user_progress"
  as permissive
  for select
  to authenticated
using ((user_id = auth.uid()));



  create policy "Authenticated users can manage user roles"
  on "public"."user_role_assignments"
  as permissive
  for all
  to public
using ((auth.uid() IS NOT NULL));



  create policy "Users can view all user roles"
  on "public"."user_role_assignments"
  as permissive
  for select
  to public
using ((auth.uid() IS NOT NULL));



  create policy "Users can view their own roles"
  on "public"."user_role_assignments"
  as permissive
  for select
  to public
using ((auth.uid() = user_id));


CREATE TRIGGER update_course_template_fields_updated_at BEFORE UPDATE ON public.course_template_fields FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER t_set_enrollment_student_to_uid BEFORE INSERT ON public.courses_enrollments FOR EACH ROW EXECUTE FUNCTION public.set_enrollment_student_to_uid();

CREATE TRIGGER trg_auto_activate_free_enrollment BEFORE INSERT ON public.courses_enrollments FOR EACH ROW EXECUTE FUNCTION public.auto_activate_free_enrollment();

CREATE TRIGGER update_course_templates_updated_at BEFORE UPDATE ON public.courses_templates FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER trigger_update_lesson_feedback_updated_at BEFORE UPDATE ON public.lesson_feedback FOR EACH ROW EXECUTE FUNCTION public.update_lesson_feedback_updated_at();

CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON public.payments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER assign_default_role_trigger AFTER INSERT ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.assign_default_student_role();

CREATE TRIGGER log_qa_history_trigger AFTER UPDATE ON public.qa_questions FOR EACH ROW EXECUTE FUNCTION public.log_qa_history();

CREATE TRIGGER update_question_qa_timestamp BEFORE UPDATE ON public.qa_questions FOR EACH ROW EXECUTE FUNCTION public.update_qa_timestamp();

CREATE TRIGGER create_qa_for_new_question AFTER INSERT ON public.question_bank FOR EACH ROW EXECUTE FUNCTION public.create_qa_for_question();

CREATE TRIGGER update_user_onboarding_updated_at BEFORE UPDATE ON public.user_onboarding_progress FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON public.user_profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


  create policy "Anyone can view avatars"
  on "storage"."objects"
  as permissive
  for select
  to public
using ((bucket_id = 'avatars'::text));



  create policy "Students can upload assignments"
  on "storage"."objects"
  as permissive
  for insert
  to authenticated
with check ((bucket_id = 'course-assignments'::text));



  create policy "Teachers and admins can update files"
  on "storage"."objects"
  as permissive
  for update
  to authenticated
using (((bucket_id = 'course-assignments'::text) AND (EXISTS ( SELECT 1
   FROM public.profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.role = ANY (ARRAY['teacher'::text, 'admin'::text])))))))
with check (((bucket_id = 'course-assignments'::text) AND (EXISTS ( SELECT 1
   FROM public.profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.role = ANY (ARRAY['teacher'::text, 'admin'::text])))))));



  create policy "Teachers and admins can upload graded files"
  on "storage"."objects"
  as permissive
  for insert
  to authenticated
with check (((bucket_id = 'course-assignments'::text) AND (EXISTS ( SELECT 1
   FROM public.profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.role = ANY (ARRAY['teacher'::text, 'admin'::text])))))));



  create policy "Teachers and admins can view all submissions"
  on "storage"."objects"
  as permissive
  for select
  to authenticated
using (((bucket_id = 'course-assignments'::text) AND (EXISTS ( SELECT 1
   FROM public.profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.role = ANY (ARRAY['teacher'::text, 'admin'::text])))))));



  create policy "Users can delete avatars"
  on "storage"."objects"
  as permissive
  for delete
  to authenticated
using ((bucket_id = 'avatars'::text));



  create policy "Users can delete own avatars"
  on "storage"."objects"
  as permissive
  for delete
  to authenticated
using (((bucket_id = 'avatars'::text) AND ((storage.foldername(name))[1] = (auth.uid())::text)));



  create policy "Users can delete own files"
  on "storage"."objects"
  as permissive
  for delete
  to authenticated
using ((bucket_id = 'course-assignments'::text));



  create policy "Users can update avatars"
  on "storage"."objects"
  as permissive
  for update
  to authenticated
using ((bucket_id = 'avatars'::text))
with check ((bucket_id = 'avatars'::text));



  create policy "Users can update own avatars"
  on "storage"."objects"
  as permissive
  for update
  to authenticated
using (((bucket_id = 'avatars'::text) AND ((storage.foldername(name))[1] = (auth.uid())::text)))
with check (((bucket_id = 'avatars'::text) AND ((storage.foldername(name))[1] = (auth.uid())::text)));



  create policy "Users can update own files"
  on "storage"."objects"
  as permissive
  for update
  to authenticated
using ((bucket_id = 'course-assignments'::text))
with check ((bucket_id = 'course-assignments'::text));



  create policy "Users can upload avatars"
  on "storage"."objects"
  as permissive
  for insert
  to authenticated
with check ((bucket_id = 'avatars'::text));



  create policy "Users can upload own avatars"
  on "storage"."objects"
  as permissive
  for insert
  to authenticated
with check (((bucket_id = 'avatars'::text) AND ((storage.foldername(name))[1] = (auth.uid())::text)));



  create policy "Users can view own uploads"
  on "storage"."objects"
  as permissive
  for select
  to authenticated
using ((bucket_id = 'course-assignments'::text));



