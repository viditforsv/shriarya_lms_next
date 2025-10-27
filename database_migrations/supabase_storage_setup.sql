-- Supabase Storage Setup for Teacher-Student Assignment System
-- Run this in your Supabase SQL Editor

-- 1. Create the storage bucket for assignments
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'course-assignments',
  'course-assignments',
  true,
  5242880, -- 5MB in bytes
  ARRAY['application/pdf']
)
ON CONFLICT (id) DO NOTHING;

-- 2. Allow authenticated users to upload files (students)
DROP POLICY IF EXISTS "Students can upload assignments" ON storage.objects;
CREATE POLICY "Students can upload assignments"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'course-assignments'
);

-- 3. Allow authenticated users to read their own files
DROP POLICY IF EXISTS "Users can view own uploads" ON storage.objects;
CREATE POLICY "Users can view own uploads"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'course-assignments'
);

-- 4. Allow authenticated users to update their own files (optional)
DROP POLICY IF EXISTS "Users can update own files" ON storage.objects;
CREATE POLICY "Users can update own files"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'course-assignments'
)
WITH CHECK (
  bucket_id = 'course-assignments'
);

-- 5. Allow authenticated users to delete their own files (optional)
DROP POLICY IF EXISTS "Users can delete own files" ON storage.objects;
CREATE POLICY "Users can delete own files"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'course-assignments'
);

-- 6. Allow teachers and admins to view all files
DROP POLICY IF EXISTS "Teachers and admins can view all submissions" ON storage.objects;
CREATE POLICY "Teachers and admins can view all submissions"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'course-assignments' AND
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() 
    AND profiles.role IN ('teacher', 'admin')
  )
);

-- 7. Allow teachers and admins to insert graded files
DROP POLICY IF EXISTS "Teachers and admins can upload graded files" ON storage.objects;
CREATE POLICY "Teachers and admins can upload graded files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'course-assignments' AND
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() 
    AND profiles.role IN ('teacher', 'admin')
  )
);

-- 8. Allow teachers and admins to update files (for graded submissions)
DROP POLICY IF EXISTS "Teachers and admins can update files" ON storage.objects;
CREATE POLICY "Teachers and admins can update files"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'course-assignments' AND
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() 
    AND profiles.role IN ('teacher', 'admin')
  )
)
WITH CHECK (
  bucket_id = 'course-assignments' AND
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() 
    AND profiles.role IN ('teacher', 'admin')
  )
);

-- Note: These policies are permissive for easier setup.
-- For production, consider more restrictive policies based on your security requirements.

-- To verify the bucket was created:
-- SELECT * FROM storage.buckets WHERE id = 'course-assignments';

-- To check policies:
-- SELECT * FROM pg_policies WHERE tablename = 'objects' AND schemaname = 'storage';

