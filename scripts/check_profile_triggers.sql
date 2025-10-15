-- Check for triggers on auth.users that create profiles
-- Run this in Supabase SQL Editor

-- Check for triggers on auth.users
SELECT 
    trigger_name,
    event_manipulation,
    action_statement,
    action_timing,
    action_orientation
FROM information_schema.triggers 
WHERE event_object_schema = 'auth' 
  AND event_object_table = 'users'
ORDER BY trigger_name;

-- Check for functions that might be called by triggers
SELECT 
    routine_name,
    routine_type,
    routine_definition
FROM information_schema.routines 
WHERE routine_schema = 'public'
  AND routine_name LIKE '%profile%'
ORDER BY routine_name;

-- Check profiles table constraints
SELECT 
    column_name,
    is_nullable,
    column_default,
    data_type
FROM information_schema.columns 
WHERE table_name = 'profiles' 
  AND table_schema = 'public'
ORDER BY ordinal_position;

-- Check if there's a trigger function for profile creation
SELECT 
    proname as function_name,
    prosrc as function_source
FROM pg_proc 
WHERE proname LIKE '%profile%' 
  OR prosrc LIKE '%profiles%'
ORDER BY proname;
