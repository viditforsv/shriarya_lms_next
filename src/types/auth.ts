// Type definitions for authentication and roles

export type UserRole = 'student' | 'admin' | 'instructor';

export interface UserProfile {
  id: string;
  full_name: string | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface AuthUser {
  id: string;
  email: string;
  user_metadata: {
    full_name?: string;
    role?: UserRole;
  };
  profile?: UserProfile;
}

export interface RolePermissions {
  canViewAllUsers: boolean;
  canManageCourses: boolean;
  canManageUsers: boolean;
  canAccessAnalytics: boolean;
  canCreateContent: boolean;
}

// Role-based permission mapping
export const ROLE_PERMISSIONS: Record<UserRole, RolePermissions> = {
  student: {
    canViewAllUsers: false,
    canManageCourses: false,
    canManageUsers: false,
    canAccessAnalytics: false,
    canCreateContent: false,
  },
  admin: {
    canViewAllUsers: true,
    canManageCourses: true,
    canManageUsers: true,
    canAccessAnalytics: true,
    canCreateContent: true,
  },
  instructor: {
    canViewAllUsers: false,
    canManageCourses: true,
    canManageUsers: false,
    canAccessAnalytics: false,
    canCreateContent: true,
  },
};
