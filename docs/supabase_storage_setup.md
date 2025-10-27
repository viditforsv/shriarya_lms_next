# Supabase Storage Setup for Teacher-Student Assignments

## Create Storage Bucket

You need to create a storage bucket in Supabase for storing assignment PDFs.

### Steps:

1. Go to your Supabase project dashboard
2. Navigate to **Storage** in the left sidebar
3. Click **Create a new bucket**
4. Use these settings:
   - **Name:** `course-assignments`
   - **Public:** `Yes` (or `No` if you prefer signed URLs)
   - **File size limit:** 5MB
   - **Allowed MIME types:** `application/pdf`

### Storage Policies (RLS)

Create storage policies to control access:

#### For Student Submissions:

```sql
-- Students can upload their own assignments
CREATE POLICY "Students can upload assignments"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'course-assignments' AND
  (storage.foldername(name))[1] = current_setting('request.jwt.claims', true)::json->>'user_id'
);

-- Students can view their own uploaded files
CREATE POLICY "Students can view own assignments"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'course-assignments'
);
```

#### For Teachers:

```sql
-- Teachers can view all files in course-assignments
CREATE POLICY "Teachers can view all submissions"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'course-assignments'
);

-- Teachers can upload graded files
CREATE POLICY "Teachers can upload graded files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'course-assignments' AND
  (storage.foldername(name))[2] = 'graded'
);
```

#### For Admins:

```sql
-- Admins can do everything
CREATE POLICY "Admins have full access"
ON storage.objects FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  )
);
```

## File Organization

Files are organized as follows:

- Student submissions: `assignments/{courseSlug}/{assignmentId}_{studentName}_{timestamp}.pdf`
- Graded submissions: `assignments/{courseSlug}/graded/{assignmentId}_{studentName}_{timestamp}_graded.pdf`

Example structure:

```
course-assignments/
├── cbse-mathematics-class-9/
│   ├── lesson-1_John_Doe_1234567890.pdf
│   ├── lesson-1_Jane_Smith_1234567891.pdf
│   └── graded/
│       ├── lesson-1_John_Doe_1234567890_graded.pdf
│       └── lesson-1_Jane_Smith_1234567891_graded.pdf
```

## Testing

After setting up the bucket:

1. Run the database migration: `database_migrations/teacher_assignment_system.sql`
2. Test uploading a PDF from a student account
3. Check that the file appears in the Supabase Storage dashboard
4. Verify teachers can download the submissions

## Troubleshooting

**Error: "Failed to upload file"**

- Check that the `course-assignments` bucket exists
- Verify bucket policies allow uploads from authenticated users
- Check Supabase project settings for storage limits

**Error: "Storage error"**

- Verify your Supabase credentials in `.env.local`
- Check that the bucket name is exactly `course-assignments`
- Ensure file size is under 5MB
