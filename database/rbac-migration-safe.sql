-- Safe migration script for RBAC system
-- This script safely migrates existing users to the new RBAC system

-- 1. Create backup table only if it doesn't exist, otherwise update it
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'profiles_role_backup') THEN
        CREATE TABLE public.profiles_role_backup AS 
        SELECT id, role, created_at 
        FROM public.profiles 
        WHERE role IS NOT NULL;
        RAISE NOTICE 'Created profiles_role_backup table';
    ELSE
        -- Update existing backup with current data
        DELETE FROM public.profiles_role_backup;
        INSERT INTO public.profiles_role_backup 
        SELECT id, role, created_at 
        FROM public.profiles 
        WHERE role IS NOT NULL;
        RAISE NOTICE 'Updated existing profiles_role_backup table';
    END IF;
END $$;

-- 2. Add default role assignment for existing users (only if not already assigned)
INSERT INTO public.user_roles (user_id, role_id, assigned_at)
SELECT 
  p.id as user_id,
  r.id as role_id,
  p.created_at as assigned_at
FROM public.profiles p
CROSS JOIN public.roles r
WHERE r.name = 'student'
AND NOT EXISTS (
  SELECT 1 FROM public.user_roles ur 
  WHERE ur.user_id = p.id AND ur.role_id = r.id
);

-- 3. For existing admin users, also assign admin role (only if not already assigned)
INSERT INTO public.user_roles (user_id, role_id, assigned_at)
SELECT 
  p.id as user_id,
  r.id as role_id,
  p.created_at as assigned_at
FROM public.profiles p
CROSS JOIN public.roles r
WHERE r.name = 'admin'
AND p.role = 'admin'
AND NOT EXISTS (
  SELECT 1 FROM public.user_roles ur 
  WHERE ur.user_id = p.id AND ur.role_id = r.id
);

-- 4. Create a computed column for backward compatibility
CREATE OR REPLACE VIEW public.user_primary_roles AS
SELECT 
  p.id,
  p.first_name,
  p.last_name,
  p.email,
  r.name as primary_role,
  r.display_name as primary_role_display,
  ur.assigned_at as role_assigned_at
FROM public.profiles p
LEFT JOIN public.user_roles ur ON p.id = ur.user_id AND ur.is_active = true
LEFT JOIN public.roles r ON ur.role_id = r.id
WHERE ur.id IS NOT NULL;

-- 5. Create a function to get user permissions
CREATE OR REPLACE FUNCTION public.get_user_permissions(user_uuid uuid)
RETURNS TABLE(permission_name text, permission_display_name text, category text)
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT DISTINCT 
    p.name as permission_name,
    p.display_name as permission_display_name,
    p.category
  FROM public.user_roles ur
  JOIN public.roles r ON ur.role_id = r.id
  JOIN public.role_permissions rp ON r.id = rp.role_id
  JOIN public.permissions p ON rp.permission_id = p.id
  WHERE ur.user_id = user_uuid 
    AND ur.is_active = true 
    AND r.is_active = true 
    AND p.is_active = true;
$$;

-- 6. Create a function to check if user has specific permission
CREATE OR REPLACE FUNCTION public.user_has_permission(user_uuid uuid, permission_name text)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles ur
    JOIN public.roles r ON ur.role_id = r.id
    JOIN public.role_permissions rp ON r.id = rp.role_id
    JOIN public.permissions p ON rp.permission_id = p.id
    WHERE ur.user_id = user_uuid 
      AND ur.is_active = true 
      AND r.is_active = true 
      AND p.is_active = true
      AND p.name = permission_name
  );
$$;

-- 7. Create a function to get user roles
CREATE OR REPLACE FUNCTION public.get_user_roles(user_uuid uuid)
RETURNS TABLE(role_name text, role_display_name text, assigned_at timestamp with time zone)
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT 
    r.name as role_name,
    r.display_name as role_display_name,
    ur.assigned_at
  FROM public.user_roles ur
  JOIN public.roles r ON ur.role_id = r.id
  WHERE ur.user_id = user_uuid 
    AND ur.is_active = true 
    AND r.is_active = true
  ORDER BY ur.assigned_at DESC;
$$;

-- 8. Add helpful indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_roles_user_active ON public.user_roles(user_id, is_active);
CREATE INDEX IF NOT EXISTS idx_role_permissions_role_permission ON public.role_permissions(role_id, permission_id);
CREATE INDEX IF NOT EXISTS idx_permissions_name_active ON public.permissions(name, is_active);

-- 9. Create a trigger to automatically assign student role to new users
CREATE OR REPLACE FUNCTION public.assign_default_student_role()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  student_role_id uuid;
BEGIN
  -- Get the student role ID
  SELECT id INTO student_role_id 
  FROM public.roles 
  WHERE name = 'student' AND is_active = true;
  
  -- Assign student role to new user
  IF student_role_id IS NOT NULL THEN
    INSERT INTO public.user_roles (user_id, role_id, assigned_at)
    VALUES (NEW.id, student_role_id, NOW());
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger for new profile creation (drop existing if it exists)
DROP TRIGGER IF EXISTS assign_default_role_trigger ON public.profiles;
CREATE TRIGGER assign_default_role_trigger
  AFTER INSERT ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.assign_default_student_role();

-- 10. Migration verification queries
-- Use these to verify the migration worked correctly:

-- Check that all users have at least one role
-- SELECT COUNT(*) as users_without_roles
-- FROM public.profiles p
-- LEFT JOIN public.user_roles ur ON p.id = ur.user_id AND ur.is_active = true
-- WHERE ur.id IS NULL;

-- Check role distribution
-- SELECT r.name, COUNT(ur.user_id) as user_count
-- FROM public.roles r
-- LEFT JOIN public.user_roles ur ON r.id = ur.role_id AND ur.is_active = true
-- GROUP BY r.name, r.display_name
-- ORDER BY user_count DESC;

-- Check that old admin users have admin role
-- SELECT p.id, p.email, r.name as current_role
-- FROM public.profiles_role_backup prb
-- JOIN public.profiles p ON prb.id = p.id
-- JOIN public.user_roles ur ON p.id = ur.user_id AND ur.is_active = true
-- JOIN public.roles r ON ur.role_id = r.id
-- WHERE prb.role = 'admin' AND r.name = 'admin';
