-- Migration: Create Student Progress Tracking Tables
-- Purpose: Track student attempts and calculate tag-level mastery
-- Date: 2024

-- ============================================
-- 1. STUDENT QUESTION ATTEMPTS (Raw Data)
-- ============================================

CREATE TABLE IF NOT EXISTS student_question_attempts (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    question_id uuid NOT NULL REFERENCES question_bank(id) ON DELETE CASCADE,
    lesson_id uuid REFERENCES courses_lessons(id) ON DELETE SET NULL,
    
    -- Answer capture (flexible for all question types)
    selected_answer jsonb NOT NULL,
    is_correct boolean NOT NULL,
    score decimal(5,2) NOT NULL CHECK (score >= 0 AND score <= 1),
    
    -- Performance metrics
    time_taken_seconds integer NOT NULL,
    attempts_count integer DEFAULT 1,
    hints_used integer DEFAULT 0,
    first_attempt_correct boolean,
    
    -- Session context
    session_id text,
    created_at timestamptz DEFAULT now(),
    
    -- Tags for fast aggregation
    tags text[] NOT NULL
);

-- Indexes for fast queries
CREATE INDEX idx_attempts_student ON student_question_attempts(student_id);
CREATE INDEX idx_attempts_question ON student_question_attempts(question_id);
CREATE INDEX idx_attempts_session ON student_question_attempts(session_id);
CREATE INDEX idx_attempts_tags ON student_question_attempts USING GIN(tags);
CREATE INDEX idx_attempts_created ON student_question_attempts(created_at);

-- ============================================
-- 2. STUDENT TAG MASTERY (Aggregated View)
-- ============================================

CREATE TABLE IF NOT EXISTS student_tag_mastery (
    student_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    tag_name text NOT NULL,
    
    -- Core metrics
    total_attempts integer DEFAULT 0,
    correct_attempts integer DEFAULT 0,
    mastery_score decimal(5,2) DEFAULT 0 CHECK (mastery_score >= 0 AND mastery_score <= 1),
    avg_time_seconds integer DEFAULT 0,
    last_attempted_at timestamptz,
    
    -- Advanced metrics
    retention_score decimal(5,2) DEFAULT 0 CHECK (retention_score >= 0 AND retention_score <= 1),
    stamina_indicator decimal(5,2) DEFAULT 0,
    adaptability_score decimal(5,2) DEFAULT 0 CHECK (adaptability_score >= 0 AND adaptability_score <= 1),
    
    updated_at timestamptz DEFAULT now(),
    
    PRIMARY KEY (student_id, tag_name)
);

CREATE INDEX idx_mastery_student ON student_tag_mastery(student_id);
CREATE INDEX idx_mastery_score ON student_tag_mastery(mastery_score);

-- ============================================
-- 3. ATTEMPT METADATA (Detailed Analytics)
-- ============================================

CREATE TABLE IF NOT EXISTS question_attempt_metadata (
    attempt_id uuid NOT NULL REFERENCES student_question_attempts(id) ON DELETE CASCADE,
    tag text NOT NULL,
    
    -- Per-tag metrics
    time_on_question integer,
    intermediate_steps jsonb,
    confidence_level integer CHECK (confidence_level >= 1 AND confidence_level <= 5),
    review_later boolean DEFAULT false,
    
    PRIMARY KEY (attempt_id, tag)
);

-- ============================================
-- 4. FUNCTIONS: Update Tag Mastery
-- ============================================

CREATE OR REPLACE FUNCTION update_tag_mastery(
    p_student_id uuid,
    p_tags text[],
    p_is_correct boolean,
    p_score decimal,
    p_time_taken integer
) RETURNS void AS $$
DECLARE
    tag text;
BEGIN
    -- Loop through each tag and update mastery
    FOREACH tag IN ARRAY p_tags LOOP
        INSERT INTO student_tag_mastery (
            student_id,
            tag_name,
            total_attempts,
            correct_attempts,
            mastery_score,
            avg_time_seconds,
            last_attempted_at
        ) VALUES (
            p_student_id,
            tag,
            1,
            CASE WHEN p_is_correct THEN 1 ELSE 0 END,
            p_score,
            p_time_taken,
            NOW()
        )
        ON CONFLICT (student_id, tag_name) DO UPDATE SET
            total_attempts = student_tag_mastery.total_attempts + 1,
            correct_attempts = student_tag_mastery.correct_attempts + 
                             CASE WHEN p_is_correct THEN 1 ELSE 0 END,
            mastery_score = (student_tag_mastery.correct_attempts + 
                            CASE WHEN p_is_correct THEN 1 ELSE 0 END)::decimal / 
                           (student_tag_mastery.total_attempts + 1),
            avg_time_seconds = (student_tag_mastery.avg_time_seconds * student_tag_mastery.total_attempts + p_time_taken) / (student_tag_mastery.total_attempts + 1),
            last_attempted_at = NOW(),
            updated_at = NOW();
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 5. FUNCTION: Get Weakest Tags
-- ============================================

CREATE OR REPLACE FUNCTION get_weakest_tags(
    p_student_id uuid,
    limit_count integer DEFAULT 10
) RETURNS TABLE (
    tag_name text,
    mastery_score decimal,
    total_attempts integer,
    last_attempted_at timestamptz,
    recommendation text
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        stm.tag_name,
        stm.mastery_score,
        stm.total_attempts,
        stm.last_attempted_at,
        CASE 
            WHEN stm.mastery_score < 0.5 THEN 'Re-teach concept'
            WHEN stm.mastery_score < 0.7 THEN 'Practice more'
            WHEN stm.mastery_score < 0.8 THEN 'Review and reinforce'
            ELSE 'Mastered'
        END as recommendation
    FROM student_tag_mastery stm
    WHERE stm.student_id = p_student_id
        AND stm.total_attempts > 0
        AND stm.mastery_score < 0.8
    ORDER BY stm.mastery_score ASC, stm.last_attempted_at ASC
    LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 6. TRIGGER: Auto-update mastery on insert
-- ============================================

CREATE OR REPLACE FUNCTION trigger_update_tag_mastery()
RETURNS TRIGGER AS $$
BEGIN
    -- Call the update function when a new attempt is recorded
    PERFORM update_tag_mastery(
        NEW.student_id,
        NEW.tags,
        NEW.is_correct,
        NEW.score,
        NEW.time_taken_seconds
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_auto_update_mastery
AFTER INSERT ON student_question_attempts
FOR EACH ROW EXECUTE FUNCTION trigger_update_tag_mastery();

-- ============================================
-- 7. RLS Policies (Row Level Security)
-- ============================================

ALTER TABLE student_question_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_tag_mastery ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_attempt_metadata ENABLE ROW LEVEL SECURITY;

-- Students can only see their own data
CREATE POLICY "Students can view own attempts" ON student_question_attempts
    FOR SELECT USING (auth.uid() = student_id);

CREATE POLICY "Students can insert own attempts" ON student_question_attempts
    FOR INSERT WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Students can view own mastery" ON student_tag_mastery
    FOR SELECT USING (auth.uid() = student_id);

-- Admins can see all data
CREATE POLICY "Admins can view all attempts" ON student_question_attempts
    FOR SELECT USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND role = 'admin'
    ));

CREATE POLICY "Admins can view all mastery" ON student_tag_mastery
    FOR SELECT USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND role = 'admin'
    ));

-- ============================================
-- 8. COMMENTS (Documentation)
-- ============================================

COMMENT ON TABLE student_question_attempts IS 'Raw student attempt data - captures every question answered';
COMMENT ON TABLE student_tag_mastery IS 'Aggregated mastery scores per tag - updated automatically';
COMMENT ON TABLE question_attempt_metadata IS 'Detailed analytics per attempt per tag';

COMMENT ON FUNCTION update_tag_mastery IS 'Updates mastery scores for multiple tags in a single transaction';
COMMENT ON FUNCTION get_weakest_tags IS 'Returns tags where student needs practice (for recommendations)';

-- ============================================
-- SUCCESS
-- ============================================

-- Run this migration with: psql or Supabase SQL Editor
-- Then test with:
SELECT update_tag_mastery('student-uuid', ARRAY['chain_rule', 'differentiation'], true, 1.0, 45);

