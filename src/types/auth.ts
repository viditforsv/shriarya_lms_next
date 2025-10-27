// Type definitions for authentication and roles

export type UserRole = "student" | "admin" | "content_manager" | "teacher";

export interface UserProfile {
  id: string;
  full_name: string | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  role: UserRole;
  avatar_url: string | null;
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

  // Question bank permissions
  canCreateQuestions: boolean;
  canEditQuestions: boolean;
  canReviewQuestions: boolean;
  canPublishQuestions: boolean;
  canManageQuestionBank: boolean;
}

// Role-based permission mapping
export const ROLE_PERMISSIONS: Record<UserRole, RolePermissions> = {
  student: {
    canViewAllUsers: false,
    canManageCourses: false,
    canManageUsers: false,
    canAccessAnalytics: false,
    canCreateContent: false,
    canCreateQuestions: false,
    canEditQuestions: false,
    canReviewQuestions: false,
    canPublishQuestions: false,
    canManageQuestionBank: false,
  },
  admin: {
    canViewAllUsers: true,
    canManageCourses: true,
    canManageUsers: true,
    canAccessAnalytics: true,
    canCreateContent: true,
    canCreateQuestions: true,
    canEditQuestions: true,
    canReviewQuestions: true,
    canPublishQuestions: true,
    canManageQuestionBank: true,
  },
  content_manager: {
    canViewAllUsers: false,
    canManageCourses: true,
    canManageUsers: false,
    canAccessAnalytics: false,
    canCreateContent: true,
    canCreateQuestions: true,
    canEditQuestions: true,
    canReviewQuestions: true,
    canPublishQuestions: true,
    canManageQuestionBank: true,
  },
  teacher: {
    canViewAllUsers: false,
    canManageCourses: false,
    canManageUsers: false,
    canAccessAnalytics: false,
    canCreateContent: false,
    canCreateQuestions: false,
    canEditQuestions: false,
    canReviewQuestions: true,
    canPublishQuestions: false,
    canManageQuestionBank: false,
  },
};
