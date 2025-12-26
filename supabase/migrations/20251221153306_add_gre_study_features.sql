-- ============================================================================
-- GRE STUDY FEATURES MIGRATION
-- Adds explanation, hints, and topics to questions
-- Creates tables for user bookmarks, notes, and flashcards
-- ============================================================================

-- Add study features columns to gre_questions
ALTER TABLE public.gre_questions
ADD COLUMN IF NOT EXISTS explanation text,
ADD COLUMN IF NOT EXISTS hints jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS topics text[] DEFAULT '{}'::text[];

COMMENT ON COLUMN public.gre_questions.explanation IS 'Step-by-step solution in HTML + LaTeX format';
COMMENT ON COLUMN public.gre_questions.hints IS 'JSONB array of progressive hints: ["hint 1", "hint 2", ...]';
COMMENT ON COLUMN public.gre_questions.topics IS 'Array of topic tags for filtering and organization';

-- ============================================================================
-- GRE USER BOOKMARKS TABLE
-- Stores user bookmarks for questions
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.gre_user_bookmarks (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  question_id uuid NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT gre_user_bookmarks_pkey PRIMARY KEY (id),
  CONSTRAINT gre_user_bookmarks_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE,
  CONSTRAINT gre_user_bookmarks_question_id_fkey FOREIGN KEY (question_id) REFERENCES public.gre_questions(id) ON DELETE CASCADE,
  CONSTRAINT gre_user_bookmarks_unique UNIQUE (user_id, question_id)
);

COMMENT ON TABLE public.gre_user_bookmarks IS 'User bookmarks for GRE questions';

CREATE INDEX IF NOT EXISTS idx_gre_user_bookmarks_user_id ON public.gre_user_bookmarks(user_id);
CREATE INDEX IF NOT EXISTS idx_gre_user_bookmarks_question_id ON public.gre_user_bookmarks(question_id);

-- ============================================================================
-- GRE USER NOTES TABLE
-- Stores user notes for questions
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.gre_user_notes (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  question_id uuid NOT NULL,
  note_text text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT gre_user_notes_pkey PRIMARY KEY (id),
  CONSTRAINT gre_user_notes_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE,
  CONSTRAINT gre_user_notes_question_id_fkey FOREIGN KEY (question_id) REFERENCES public.gre_questions(id) ON DELETE CASCADE,
  CONSTRAINT gre_user_notes_unique UNIQUE (user_id, question_id)
);

COMMENT ON TABLE public.gre_user_notes IS 'User notes for GRE questions (supports HTML + LaTeX)';

CREATE INDEX IF NOT EXISTS idx_gre_user_notes_user_id ON public.gre_user_notes(user_id);
CREATE INDEX IF NOT EXISTS idx_gre_user_notes_question_id ON public.gre_user_notes(question_id);

-- ============================================================================
-- GRE USER FLASHCARDS TABLE
-- Stores flashcard progress and mastery data
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.gre_user_flashcards (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  question_id uuid NOT NULL,
  mastery_level integer NOT NULL DEFAULT 0 CHECK (mastery_level >= 0 AND mastery_level <= 5),
  last_reviewed timestamp with time zone DEFAULT now(),
  next_review timestamp with time zone DEFAULT now(),
  review_count integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT gre_user_flashcards_pkey PRIMARY KEY (id),
  CONSTRAINT gre_user_flashcards_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE,
  CONSTRAINT gre_user_flashcards_question_id_fkey FOREIGN KEY (question_id) REFERENCES public.gre_questions(id) ON DELETE CASCADE,
  CONSTRAINT gre_user_flashcards_unique UNIQUE (user_id, question_id)
);

COMMENT ON TABLE public.gre_user_flashcards IS 'User flashcard progress with spaced repetition data';
COMMENT ON COLUMN public.gre_user_flashcards.mastery_level IS '0-5 scale: 0=not started, 5=mastered';

CREATE INDEX IF NOT EXISTS idx_gre_user_flashcards_user_id ON public.gre_user_flashcards(user_id);
CREATE INDEX IF NOT EXISTS idx_gre_user_flashcards_question_id ON public.gre_user_flashcards(question_id);
CREATE INDEX IF NOT EXISTS idx_gre_user_flashcards_next_review ON public.gre_user_flashcards(next_review);

-- ============================================================================
-- UPDATED_AT TRIGGERS
-- ============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_gre_user_notes_updated_at
  BEFORE UPDATE ON public.gre_user_notes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_gre_user_flashcards_updated_at
  BEFORE UPDATE ON public.gre_user_flashcards
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================
ALTER TABLE public.gre_user_bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gre_user_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gre_user_flashcards ENABLE ROW LEVEL SECURITY;

-- Users can only see their own bookmarks, notes, and flashcards
CREATE POLICY "Users can view own bookmarks"
  ON public.gre_user_bookmarks FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own bookmarks"
  ON public.gre_user_bookmarks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own bookmarks"
  ON public.gre_user_bookmarks FOR DELETE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view own notes"
  ON public.gre_user_notes FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own notes"
  ON public.gre_user_notes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own notes"
  ON public.gre_user_notes FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own notes"
  ON public.gre_user_notes FOR DELETE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view own flashcards"
  ON public.gre_user_flashcards FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own flashcards"
  ON public.gre_user_flashcards FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own flashcards"
  ON public.gre_user_flashcards FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own flashcards"
  ON public.gre_user_flashcards FOR DELETE
  USING (auth.uid() = user_id);

