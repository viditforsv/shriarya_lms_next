-- Create question_assignments table for assigning specific questions to users
-- Run this SQL in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS question_assignments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question_id UUID NOT NULL REFERENCES question_bank(id) ON DELETE CASCADE,
  assigned_to UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  assigned_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  assignment_type TEXT NOT NULL DEFAULT 'edit' CHECK (assignment_type IN ('edit', 'review', 'approve')),
  status TEXT NOT NULL DEFAULT 'assigned' CHECK (status IN ('assigned', 'in_progress', 'completed', 'rejected')),
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  due_date TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(question_id, assigned_to, assignment_type)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_question_assignments_question_id ON question_assignments(question_id);
CREATE INDEX IF NOT EXISTS idx_question_assignments_assigned_to ON question_assignments(assigned_to);
CREATE INDEX IF NOT EXISTS idx_question_assignments_status ON question_assignments(status);
CREATE INDEX IF NOT EXISTS idx_question_assignments_assignment_type ON question_assignments(assignment_type);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_question_assignments_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER IF NOT EXISTS trigger_update_question_assignments_updated_at
  BEFORE UPDATE ON question_assignments
  FOR EACH ROW
  EXECUTE FUNCTION update_question_assignments_updated_at();

-- Enable RLS
ALTER TABLE question_assignments ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own assignments
CREATE POLICY IF NOT EXISTS "Users can view their own assignments" ON question_assignments
  FOR SELECT USING (auth.uid() = assigned_to);

-- Policy: Admins can view all assignments
CREATE POLICY IF NOT EXISTS "Admins can view all assignments" ON question_assignments
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- Policy: Content managers can view assignments for questions they can edit
CREATE POLICY IF NOT EXISTS "Content managers can view relevant assignments" ON question_assignments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'content_manager'
    )
  );

-- Policy: Users can update their own assignment status
CREATE POLICY IF NOT EXISTS "Users can update their assignment status" ON question_assignments
  FOR UPDATE USING (auth.uid() = assigned_to)
  WITH CHECK (auth.uid() = assigned_to);

-- Policy: Admins and content managers can create assignments
CREATE POLICY IF NOT EXISTS "Admins and content managers can create assignments" ON question_assignments
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role IN ('admin', 'content_manager')
    )
  );

-- Policy: Admins and content managers can delete assignments
CREATE POLICY IF NOT EXISTS "Admins and content managers can delete assignments" ON question_assignments
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role IN ('admin', 'content_manager')
    )
  );
