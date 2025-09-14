-- Quality Assurance System for Question Bank
-- This table manages QA workflows, reviews, and quality tracking

CREATE TABLE IF NOT EXISTS public.question_qa (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    question_id UUID NOT NULL REFERENCES public.question_bank(id) ON DELETE CASCADE,
    
    -- QA Status and Workflow
    qa_status TEXT NOT NULL DEFAULT 'pending' CHECK (qa_status IN (
        'pending',           -- Initial state, needs review
        'in_review',         -- Currently being reviewed
        'needs_revision',    -- Requires changes
        'approved',          -- Passed QA
        'rejected',          -- Failed QA
        'archived'           -- Archived/retired
    )),
    
    -- Review Details
    reviewer_id UUID REFERENCES auth.users(id),
    review_date TIMESTAMP WITH TIME ZONE,
    review_notes TEXT,
    
    -- Quality Metrics (1-5 scale)
    content_accuracy INTEGER CHECK (content_accuracy BETWEEN 1 AND 5),
    difficulty_appropriateness INTEGER CHECK (difficulty_appropriateness BETWEEN 1 AND 5),
    clarity_rating INTEGER CHECK (clarity_rating BETWEEN 1 AND 5),
    solution_quality INTEGER CHECK (solution_quality BETWEEN 1 AND 5),
    overall_rating DECIMAL(3,2) GENERATED ALWAYS AS (
        (COALESCE(content_accuracy, 0) + 
         COALESCE(difficulty_appropriateness, 0) + 
         COALESCE(clarity_rating, 0) + 
         COALESCE(solution_quality, 0)) / 4.0
    ) STORED,
    
    -- Revision Tracking
    revision_count INTEGER DEFAULT 0,
    last_revision_date TIMESTAMP WITH TIME ZONE,
    revision_notes TEXT,
    
    -- Flags and Categories
    is_flagged BOOLEAN DEFAULT FALSE,
    flag_reason TEXT,
    priority_level TEXT DEFAULT 'medium' CHECK (priority_level IN ('low', 'medium', 'high', 'urgent')),
    
    -- Tags for QA categorization
    qa_tags TEXT[] DEFAULT '{}',
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT valid_reviewer CHECK (
        (qa_status IN ('in_review', 'needs_revision', 'approved', 'rejected') AND reviewer_id IS NOT NULL) OR
        (qa_status IN ('pending', 'archived') AND reviewer_id IS NULL)
    )
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_question_qa_question_id ON public.question_qa(question_id);
CREATE INDEX IF NOT EXISTS idx_question_qa_status ON public.question_qa(qa_status);
CREATE INDEX IF NOT EXISTS idx_question_qa_reviewer ON public.question_qa(reviewer_id);
CREATE INDEX IF NOT EXISTS idx_question_qa_priority ON public.question_qa(priority_level);
CREATE INDEX IF NOT EXISTS idx_question_qa_rating ON public.question_qa(overall_rating);
CREATE INDEX IF NOT EXISTS idx_question_qa_flagged ON public.question_qa(is_flagged) WHERE is_flagged = TRUE;

-- QA Comments/Feedback Table
CREATE TABLE IF NOT EXISTS public.qa_comments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    qa_id UUID NOT NULL REFERENCES public.question_qa(id) ON DELETE CASCADE,
    commenter_id UUID NOT NULL REFERENCES auth.users(id),
    comment_text TEXT NOT NULL,
    comment_type TEXT DEFAULT 'general' CHECK (comment_type IN (
        'general', 'content', 'solution', 'formatting', 'difficulty', 'other'
    )),
    is_resolved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for QA comments
CREATE INDEX IF NOT EXISTS idx_qa_comments_qa_id ON public.qa_comments(qa_id);
CREATE INDEX IF NOT EXISTS idx_qa_comments_commenter ON public.qa_comments(commenter_id);
CREATE INDEX IF NOT EXISTS idx_qa_comments_type ON public.qa_comments(comment_type);

-- QA History/Audit Trail Table
CREATE TABLE IF NOT EXISTS public.qa_history (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    qa_id UUID NOT NULL REFERENCES public.question_qa(id) ON DELETE CASCADE,
    action TEXT NOT NULL CHECK (action IN (
        'created', 'status_changed', 'reviewed', 'rated', 'commented', 
        'flagged', 'unflagged', 'revised', 'archived'
    )),
    old_value TEXT,
    new_value TEXT,
    action_by UUID REFERENCES auth.users(id),
    action_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for QA history
CREATE INDEX IF NOT EXISTS idx_qa_history_qa_id ON public.qa_history(qa_id);
CREATE INDEX IF NOT EXISTS idx_qa_history_action ON public.qa_history(action);
CREATE INDEX IF NOT EXISTS idx_qa_history_date ON public.qa_history(created_at);

-- Enable RLS
ALTER TABLE public.question_qa ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.qa_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.qa_history ENABLE ROW LEVEL SECURITY;

-- RLS Policies for question_qa
CREATE POLICY "Enable ALL for authenticated users" ON public.question_qa 
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- RLS Policies for qa_comments
CREATE POLICY "Enable ALL for authenticated users" ON public.qa_comments 
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- RLS Policies for qa_history
CREATE POLICY "Enable ALL for authenticated users" ON public.qa_history 
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Functions for QA management
CREATE OR REPLACE FUNCTION update_qa_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_question_qa_timestamp
    BEFORE UPDATE ON public.question_qa
    FOR EACH ROW EXECUTE FUNCTION update_qa_timestamp();

CREATE TRIGGER update_qa_comments_timestamp
    BEFORE UPDATE ON public.qa_comments
    FOR EACH ROW EXECUTE FUNCTION update_qa_timestamp();

-- Function to create QA record for new questions
CREATE OR REPLACE FUNCTION create_qa_for_question()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.question_qa (question_id, qa_status)
    VALUES (NEW.id, 'pending');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-create QA record for new questions
CREATE TRIGGER create_qa_for_new_question
    AFTER INSERT ON public.question_bank
    FOR EACH ROW EXECUTE FUNCTION create_qa_for_question();

-- Function to log QA history
CREATE OR REPLACE FUNCTION log_qa_history()
RETURNS TRIGGER AS $$
BEGIN
    -- Log status changes
    IF OLD.qa_status IS DISTINCT FROM NEW.qa_status THEN
        INSERT INTO public.qa_history (qa_id, action, old_value, new_value, action_by)
        VALUES (NEW.id, 'status_changed', OLD.qa_status, NEW.qa_status, NEW.reviewer_id);
    END IF;
    
    -- Log rating changes
    IF OLD.overall_rating IS DISTINCT FROM NEW.overall_rating THEN
        INSERT INTO public.qa_history (qa_id, action, old_value, new_value, action_by)
        VALUES (NEW.id, 'rated', OLD.overall_rating::TEXT, NEW.overall_rating::TEXT, NEW.reviewer_id);
    END IF;
    
    -- Log flag changes
    IF OLD.is_flagged IS DISTINCT FROM NEW.is_flagged THEN
        INSERT INTO public.qa_history (qa_id, action, old_value, new_value, action_by)
        VALUES (NEW.id, CASE WHEN NEW.is_flagged THEN 'flagged' ELSE 'unflagged' END, 
                OLD.is_flagged::TEXT, NEW.is_flagged::TEXT, NEW.reviewer_id);
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to log QA history
CREATE TRIGGER log_qa_history_trigger
    AFTER UPDATE ON public.question_qa
    FOR EACH ROW EXECUTE FUNCTION log_qa_history();

-- Insert initial QA records for existing questions
INSERT INTO public.question_qa (question_id, qa_status)
SELECT id, 'pending' 
FROM public.question_bank 
WHERE id NOT IN (SELECT question_id FROM public.question_qa);

-- Comments
COMMENT ON TABLE public.question_qa IS 'Quality Assurance tracking for questions';
COMMENT ON COLUMN public.question_qa.qa_status IS 'Current QA workflow status';
COMMENT ON COLUMN public.question_qa.overall_rating IS 'Auto-calculated average of all quality metrics';
COMMENT ON COLUMN public.question_qa.priority_level IS 'Priority for QA review queue';
COMMENT ON COLUMN public.question_qa.qa_tags IS 'Tags for categorizing QA issues';

COMMENT ON TABLE public.qa_comments IS 'Comments and feedback on QA reviews';
COMMENT ON TABLE public.qa_history IS 'Audit trail of all QA actions and changes';
