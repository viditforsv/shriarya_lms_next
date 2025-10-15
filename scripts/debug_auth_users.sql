-- Debug auth.users table structure and policies
-- Run this in Supabase SQL Editor

-- Check if auth.users table exists and its structure
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default,
    character_maximum_length
FROM information_schema.columns 
WHERE table_name = 'users' 
  AND table_schema = 'auth' 
ORDER BY ordinal_position;

-- Check RLS policies on auth.users
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE schemaname = 'auth' 
  AND tablename = 'users';

-- Check if RLS is enabled on auth.users
SELECT 
    schemaname,
    tablename,
    rowsecurity
FROM pg_tables 
WHERE schemaname = 'auth' 
  AND tablename = 'users';

-- Check for any triggers on auth.users
SELECT 
    trigger_name,
    event_manipulation,
    action_statement,
    action_timing
FROM information_schema.triggers 
WHERE event_object_schema = 'auth' 
  AND event_object_table = 'users';

-- Check current auth.users count
SELECT COUNT(*) as total_users FROM auth.users;

-- Check recent auth.users entries (if any)
SELECT 
    id,
    email,
    created_at,
    email_confirmed_at,
    last_sign_in_at
FROM auth.users 
ORDER BY created_at DESC 
LIMIT 5;
