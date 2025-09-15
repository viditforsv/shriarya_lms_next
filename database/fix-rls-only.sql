-- Fix RLS circular dependency issue for existing RBAC tables
-- This script only fixes the RLS policies without recreating tables

-- Disable RLS temporarily to fix circular dependency
ALTER TABLE public.roles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.permissions DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.role_permissions DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.permission_categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.role_hierarchy DISABLE ROW LEVEL SECURITY;

-- Drop all existing problematic policies
DROP POLICY IF EXISTS "Users can view roles" ON public.roles;
DROP POLICY IF EXISTS "Users can view permissions" ON public.permissions;
DROP POLICY IF EXISTS "Users can view role permissions" ON public.role_permissions;
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can view permission categories" ON public.permission_categories;
DROP POLICY IF EXISTS "Admins can manage roles" ON public.roles;
DROP POLICY IF EXISTS "Admins can manage permissions" ON public.permissions;
DROP POLICY IF EXISTS "Admins can manage role permissions" ON public.role_permissions;
DROP POLICY IF EXISTS "Admins can manage user roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can manage permission categories" ON public.permission_categories;
DROP POLICY IF EXISTS "Admins can manage role hierarchy" ON public.role_hierarchy;
DROP POLICY IF EXISTS "Authenticated users can manage roles" ON public.roles;
DROP POLICY IF EXISTS "Authenticated users can manage permissions" ON public.permissions;
DROP POLICY IF EXISTS "Authenticated users can manage role permissions" ON public.role_permissions;
DROP POLICY IF EXISTS "Users can manage their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Authenticated users can manage permission categories" ON public.permission_categories;
DROP POLICY IF EXISTS "Authenticated users can manage role hierarchy" ON public.role_hierarchy;
