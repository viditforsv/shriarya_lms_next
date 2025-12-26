-- Create enhanced view for question bank with latest QA status
-- This view eliminates the need for application-side QA filtering
-- and allows efficient database-side filtering on QA status
-- 
-- Note: This view includes all columns from question_bank table,
-- including the "Time Zone" column (with space) which is preserved via qb.*

-- Drop the view if it exists (to handle column name changes)
DROP VIEW IF EXISTS question_bank_enhanced;

CREATE VIEW question_bank_enhanced AS
SELECT 
  qb.*,
  -- QA fields from the latest QA record
  COALESCE(qa.qa_status, 'new') AS latest_qa_status,
  qa.priority_level AS latest_priority_level,
  qa.is_flagged AS latest_is_flagged,
  qa.overall_rating AS latest_overall_rating,
  qa.updated_at AS qa_updated_at
FROM question_bank qb
LEFT JOIN LATERAL (
  -- This subquery grabs ONLY the most recent QA record for this question
  -- Ordered by updated_at DESC to get the latest status
  SELECT 
    qa_status, 
    priority_level, 
    is_flagged, 
    overall_rating, 
    updated_at
  FROM qa_questions
  WHERE question_id = qb.id
  ORDER BY updated_at DESC
  LIMIT 1
) qa ON true;

-- Create indexes to optimize the lateral join performance
CREATE INDEX IF NOT EXISTS idx_qa_questions_question_updated 
ON qa_questions(question_id, updated_at DESC);

-- Additional indexes for commonly filtered columns
CREATE INDEX IF NOT EXISTS idx_question_bank_subject ON question_bank(subject);
CREATE INDEX IF NOT EXISTS idx_question_bank_difficulty ON question_bank(difficulty);
CREATE INDEX IF NOT EXISTS idx_question_bank_created_at ON question_bank(created_at DESC);

-- Grant necessary permissions (adjust as needed for your RLS policies)
-- The view inherits permissions from the underlying tables

