-- Enable Row Level Security (RLS) on public tables
-- This fixes the security lint errors for quiz_questions and question_bank tables

-- Enable RLS on quiz_questions table
ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;

-- Enable RLS on question_bank table  
ALTER TABLE public.question_bank ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for quiz_questions table
-- Allow authenticated users to read quiz questions
CREATE POLICY "Allow authenticated users to read quiz questions" ON public.quiz_questions
    FOR SELECT USING (auth.role() = 'authenticated');

-- Allow authenticated users to insert quiz questions (for instructors/admins)
CREATE POLICY "Allow authenticated users to insert quiz questions" ON public.quiz_questions
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to update quiz questions (for instructors/admins)
CREATE POLICY "Allow authenticated users to update quiz questions" ON public.quiz_questions
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Allow authenticated users to delete quiz questions (for instructors/admins)
CREATE POLICY "Allow authenticated users to delete quiz questions" ON public.quiz_questions
    FOR DELETE USING (auth.role() = 'authenticated');

-- Create RLS policies for question_bank table
-- Allow authenticated users to read question bank
CREATE POLICY "Allow authenticated users to read question bank" ON public.question_bank
    FOR SELECT USING (auth.role() = 'authenticated');

-- Allow authenticated users to insert questions (for instructors/admins)
CREATE POLICY "Allow authenticated users to insert questions" ON public.question_bank
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to update questions (for instructors/admins)
CREATE POLICY "Allow authenticated users to update questions" ON public.question_bank
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Allow authenticated users to delete questions (for instructors/admins)
CREATE POLICY "Allow authenticated users to delete questions" ON public.question_bank
    FOR DELETE USING (auth.role() = 'authenticated');

-- Optional: Create more restrictive policies based on user roles
-- Uncomment these if you want role-based access control

-- For quiz_questions - only allow instructors/admins to modify
-- CREATE POLICY "Only instructors can modify quiz questions" ON public.quiz_questions
--     FOR ALL USING (
--         EXISTS (
--             SELECT 1 FROM public.profiles 
--             WHERE profiles.id = auth.uid() 
--             AND profiles.role IN ('admin', 'instructor')
--         )
--     );

-- For question_bank - only allow instructors/admins to modify
-- CREATE POLICY "Only instructors can modify question bank" ON public.question_bank
--     FOR ALL USING (
--         EXISTS (
--             SELECT 1 FROM public.profiles 
--             WHERE profiles.id = auth.uid() 
--             AND profiles.role IN ('admin', 'instructor')
--         )
--     );
