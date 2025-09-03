# Course Creation Debugging Guide

## Common Issues and Solutions

### 1. Database Schema Not Applied

**Problem**: The `status` and `price` columns don't exist in the courses table.

**Solution**: Run the database schema script:

```sql
-- Execute database/course_builder_schema.sql in Supabase SQL editor
```

### 2. User Not Authenticated

**Problem**: User is not logged in or session expired.

**Solution**:

- Check if user is logged in
- Try logging out and back in
- Check browser console for auth errors

### 3. User Profile Missing

**Problem**: User exists in auth but not in profiles table.

**Solution**: Create a profile for the user:

```sql
INSERT INTO public.profiles (id, email, role)
VALUES ('user-uuid', 'user@example.com', 'admin')
ON CONFLICT (id) DO UPDATE SET role = 'admin';
```

### 4. RLS Policies Blocking Access

**Problem**: Row Level Security policies are preventing course creation.

**Solution**: Check if RLS is enabled and policies are correct:

```sql
-- Check RLS status
SELECT schemaname, tablename, rowsecurity
FROM pg_tables
WHERE tablename = 'courses';

-- Check policies
SELECT * FROM pg_policies WHERE tablename = 'courses';
```

### 5. Unique Constraint Violation

**Problem**: Course slug already exists.

**Solution**: The API now generates unique slugs, but you can manually check:

```sql
SELECT slug FROM public.courses WHERE slug LIKE 'course-%';
```

## Debugging Steps

### Step 1: Check Database Schema

Run this in Supabase SQL editor:

```sql
-- Check courses table structure
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'courses'
AND table_schema = 'public'
ORDER BY ordinal_position;
```

Expected columns:

- `id` (uuid)
- `title` (text)
- `description` (text)
- `is_free` (boolean)
- `price` (numeric) ← **This should exist**
- `status` (text) ← **This should exist**
- `instructor_id` (uuid)
- `slug` (text)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### Step 2: Check User Authentication

1. Open browser console
2. Go to `/dashboard/courses/new`
3. Try to create a course
4. Look for console logs showing:
   - "User authenticated: [user-id]"
   - "Profile data: [profile]"
   - "Creating course with data: [course-data]"

### Step 3: Check API Response

If course creation fails, check the network tab in browser dev tools:

1. Go to Network tab
2. Try to create a course
3. Look for the `/api/courses` request
4. Check the response for detailed error information

### Step 4: Test Database Directly

Run this test in Supabase SQL editor (replace with your user ID):

```sql
-- Test course creation
DO $$
DECLARE
    test_user_id uuid := 'your-user-id-here';
    new_course_id uuid;
BEGIN
    INSERT INTO public.courses (title, description, is_free, price, status, instructor_id, slug)
    VALUES (
        'Test Course',
        'Test description',
        true,
        0,
        'draft',
        test_user_id,
        'test-course-' || extract(epoch from now())
    ) RETURNING id INTO new_course_id;

    RAISE NOTICE 'Course created: %', new_course_id;

    -- Check if lessons were created
    SELECT COUNT(*) FROM public.lessons WHERE course_id = new_course_id;

    -- Clean up
    DELETE FROM public.courses WHERE id = new_course_id;
END $$;
```

## Quick Fixes

### If Schema is Missing:

```sql
-- Add missing columns
ALTER TABLE public.courses
ADD COLUMN IF NOT EXISTS status text DEFAULT 'draft',
ADD COLUMN IF NOT EXISTS price numeric DEFAULT 0;
```

### If User Profile is Missing:

```sql
-- Create profile for current user
INSERT INTO public.profiles (id, email, role)
SELECT id, email, 'admin'::text
FROM auth.users
WHERE id = auth.uid()
ON CONFLICT (id) DO UPDATE SET role = 'admin';
```

### If RLS is Blocking:

```sql
-- Temporarily disable RLS for testing
ALTER TABLE public.courses DISABLE ROW LEVEL SECURITY;
```

## Still Having Issues?

1. **Check browser console** for detailed error messages
2. **Check Supabase logs** in the dashboard
3. **Run the test script** (`database/test_schema.sql`)
4. **Verify user permissions** in Supabase Auth settings

The most common issue is that the database schema hasn't been applied yet. Make sure to run `database/course_builder_schema.sql` first!
