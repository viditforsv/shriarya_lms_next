-- Create Test Student User
-- Email: contact@shrividhya.in
-- Password: TestStudent123! (change after first login)

-- Step 1: Create user in auth.users
-- Note: This requires admin/service role access
-- You may need to create this user through Supabase Dashboard > Authentication > Add User instead

-- Alternative: Use Supabase Dashboard
-- 1. Go to Authentication > Users
-- 2. Click "Add User"
-- 3. Email: contact@shrividhya.in
-- 4. Password: TestStudent123! (or auto-generate)
-- 5. Click "Create User"
-- 6. Copy the user ID

-- Step 2: After creating user in dashboard, run this to set up profile:
-- Replace 'USER_ID_HERE' with the actual user ID from step 1

INSERT INTO profiles (id, first_name, last_name, role, email, created_at, updated_at)
VALUES (
  'USER_ID_HERE'::uuid,  -- Replace with actual user ID from auth.users
  'Student',
  'Test',
  'student',
  'contact@shrividhya.in',
  now(),
  now()
)
ON CONFLICT (id) DO UPDATE
SET 
  first_name = 'Student',
  last_name = 'Test',
  role = 'student',
  email = 'contact@shrividhya.in';

-- Step 3: Verify the user
SELECT 
  p.id,
  p.first_name,
  p.last_name,
  p.email,
  p.role,
  p.created_at
FROM profiles p
WHERE p.email = 'contact@shrividhya.in';

