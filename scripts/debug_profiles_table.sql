-- Debug profiles table structure and constraints

-- Check all constraints on profiles table
SELECT 
  conname AS constraint_name,
  contype AS constraint_type,
  pg_get_constraintdef(oid) AS constraint_definition
FROM pg_constraint
WHERE conrelid = 'public.profiles'::regclass;

-- Check all indexes on profiles table
SELECT 
  indexname,
  indexdef
FROM pg_indexes
WHERE tablename = 'profiles' AND schemaname = 'public';

-- Check if email column has unique constraint
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'profiles'
ORDER BY ordinal_position;

-- Check for any existing profiles with the test email
SELECT id, email, first_name, last_name, role, created_at
FROM profiles
WHERE email = 'contact@shrividhya.in';

-- Check auth.users for the email
SELECT id, email, created_at, email_confirmed_at
FROM auth.users
WHERE email = 'contact@shrividhya.in';

