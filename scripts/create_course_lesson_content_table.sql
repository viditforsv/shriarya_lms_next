-- Create course_lesson_content table for dynamic Concepts and Formulas content
CREATE TABLE IF NOT EXISTS public.course_lesson_content (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  lesson_id uuid NOT NULL,
  content_type text NOT NULL CHECK (content_type IN ('concepts', 'formulas')),
  title text NOT NULL,
  content text,
  content_html text,
  metadata jsonb DEFAULT '{}',
  order_index integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  
  CONSTRAINT course_lesson_content_pkey PRIMARY KEY (id),
  CONSTRAINT course_lesson_content_lesson_id_fkey FOREIGN KEY (lesson_id) REFERENCES public.courses_lessons(id) ON DELETE CASCADE,
  CONSTRAINT course_lesson_content_unique_lesson_type_order UNIQUE (lesson_id, content_type, order_index)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_course_lesson_content_lesson_id ON public.course_lesson_content(lesson_id);
CREATE INDEX IF NOT EXISTS idx_course_lesson_content_type ON public.course_lesson_content(content_type);
CREATE INDEX IF NOT EXISTS idx_course_lesson_content_active ON public.course_lesson_content(is_active);

-- Add RLS (Row Level Security) policies
ALTER TABLE public.course_lesson_content ENABLE ROW LEVEL SECURITY;

-- Policy: Allow authenticated users to read lesson content
CREATE POLICY "Allow authenticated users to read lesson content" ON public.course_lesson_content
  FOR SELECT USING (auth.role() = 'authenticated');

-- Policy: Allow admins to manage lesson content
CREATE POLICY "Allow admins to manage lesson content" ON public.course_lesson_content
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- Add trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_course_lesson_content_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_course_lesson_content_updated_at
  BEFORE UPDATE ON public.course_lesson_content
  FOR EACH ROW
  EXECUTE FUNCTION update_course_lesson_content_updated_at();

-- Add comments for documentation
COMMENT ON TABLE public.course_lesson_content IS 'Stores dynamic content for lesson Concepts and Formulas tabs';
COMMENT ON COLUMN public.course_lesson_content.content_type IS 'Type of content: concepts or formulas';
COMMENT ON COLUMN public.course_lesson_content.title IS 'Title/heading for the content section';
COMMENT ON COLUMN public.course_lesson_content.content IS 'Raw text content (can include LaTeX)';
COMMENT ON COLUMN public.course_lesson_content.content_html IS 'Rendered HTML content';
COMMENT ON COLUMN public.course_lesson_content.metadata IS 'Additional metadata (tags, difficulty, etc.)';
COMMENT ON COLUMN public.course_lesson_content.order_index IS 'Order of content within the same type for a lesson';
