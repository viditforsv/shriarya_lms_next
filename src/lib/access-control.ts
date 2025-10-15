import { UserRole } from "@/types/auth";

// Define access levels
export type AccessLevel = "public" | "authenticated" | "student" | "admin";

// Course access types
export type CourseAccess = "free" | "paid" | "enrolled";

// Route access configuration
export interface RouteAccess {
  path: string;
  accessLevel: AccessLevel;
  requiredRole?: UserRole;
  requiredPermission?: string;
  redirectTo?: string;
}

// Course access configuration
export interface CourseAccessConfig {
  courseId: string;
  accessType: CourseAccess;
  requiredRole?: UserRole;
  previewAvailable: boolean;
}

// Define all route access rules
export const ROUTE_ACCESS: RouteAccess[] = [
  // Public routes (accessible to everyone)
  { path: "/", accessLevel: "public" },
  { path: "/courses", accessLevel: "public" },
  { path: "/courses/free", accessLevel: "public" },
  { path: "/courses/cbse-mathematics-class-10", accessLevel: "public" },
  { path: "/courses/cbse", accessLevel: "public" },
  { path: "/courses/ibdp", accessLevel: "public" },
  { path: "/courses/icse", accessLevel: "public" },
  { path: "/courses/igcse", accessLevel: "public" },
  { path: "/courses/isc", accessLevel: "public" },
  { path: "/about", accessLevel: "public" },
  { path: "/contact", accessLevel: "public" },
  { path: "/pricing", accessLevel: "public" },
  { path: "/auth", accessLevel: "public" },
  { path: "/auth/callback", accessLevel: "public" },
  { path: "/login", accessLevel: "public" },
  { path: "/signup", accessLevel: "public" },
  { path: "/password-reset", accessLevel: "public" },
  { path: "/auth/forgot-password", accessLevel: "public" },
  { path: "/auth/reset-password", accessLevel: "public" },
  { path: "/terms", accessLevel: "public" },
  { path: "/privacy", accessLevel: "public" },
  { path: "/faq", accessLevel: "public" },
  { path: "/faq-support", accessLevel: "public" },
  { path: "/refund", accessLevel: "public" },
  { path: "/landing", accessLevel: "public" },
  { path: "/team", accessLevel: "public" },
  { path: "/testimonials", accessLevel: "public" },
  { path: "/services", accessLevel: "public" },
  { path: "/portfolio", accessLevel: "public" },
  { path: "/blog", accessLevel: "public" },
  { path: "/blog-post", accessLevel: "public" },

  // Authenticated routes (require login)
  { path: "/dashboard", accessLevel: "authenticated" },
  { path: "/profile", accessLevel: "authenticated" },
  { path: "/user-profile", accessLevel: "authenticated" },
  { path: "/courses/enrolled", accessLevel: "authenticated" },
  { path: "/progress", accessLevel: "authenticated" },
  { path: "/assignments", accessLevel: "authenticated" },
  { path: "/checkout", accessLevel: "authenticated" },
  { path: "/subscription-management", accessLevel: "authenticated" },
  { path: "/onboarding", accessLevel: "authenticated" },

  // Admin-only routes
  { path: "/admin", accessLevel: "admin", requiredRole: "admin" },
  {
    path: "/admin/site-administration",
    accessLevel: "admin",
    requiredRole: "admin",
  },
  { path: "/admin/users", accessLevel: "admin", requiredRole: "admin" },
  { path: "/admin/courses", accessLevel: "admin", requiredRole: "admin" },
  {
    path: "/admin/course-templates",
    accessLevel: "admin",
    requiredRole: "admin",
  },
  { path: "/admin/analytics", accessLevel: "admin", requiredRole: "admin" },
  { path: "/courses/manage", accessLevel: "admin", requiredRole: "admin" },
  { path: "/admin-panel", accessLevel: "admin", requiredRole: "admin" },
  {
    path: "/instructor-dashboard",
    accessLevel: "admin",
    requiredRole: "admin",
  },
  {
    path: "/institution-dashboard",
    accessLevel: "admin",
    requiredRole: "admin",
  },
  { path: "/teacher-signup", accessLevel: "admin", requiredRole: "admin" },
  { path: "/analytics", accessLevel: "admin", requiredRole: "admin" },
  { path: "/helpdesk", accessLevel: "admin", requiredRole: "admin" },

  // Question Bank Routes (Content Manager + Admin)
  {
    path: "/question-bank",
    accessLevel: "authenticated",
    requiredRole: "content_manager",
  },
  {
    path: "/question-bank/new",
    accessLevel: "authenticated",
    requiredRole: "content_manager",
  },
  {
    path: "/question-bank/[id]",
    accessLevel: "authenticated",
    requiredRole: "content_manager",
  },
  {
    path: "/question-bank/[id]/edit",
    accessLevel: "authenticated",
    requiredRole: "content_manager",
  },

  // Question Assignment Routes (Content Manager + Admin)
  {
    path: "/admin/question-assignments",
    accessLevel: "authenticated",
    requiredRole: "content_manager",
  },

  // Admin-only Question Bank Routes
  { path: "/question-bank/admin", accessLevel: "admin", requiredRole: "admin" },
  {
    path: "/question-bank/analytics",
    accessLevel: "admin",
    requiredRole: "admin",
  },
  {
    path: "/question-bank/settings",
    accessLevel: "admin",
    requiredRole: "admin",
  },

  // Development/Test routes (admin only)
  { path: "/components-demo", accessLevel: "admin", requiredRole: "admin" },
  { path: "/components-test", accessLevel: "admin", requiredRole: "admin" },
  { path: "/test-auth", accessLevel: "admin", requiredRole: "admin" },
  { path: "/debug-auth", accessLevel: "admin", requiredRole: "admin" },
  { path: "/templates", accessLevel: "admin", requiredRole: "admin" },
];

// Define course access rules
export const COURSE_ACCESS: Record<string, CourseAccessConfig> = {
  // CBSE Courses
  "cbse-math-9": {
    courseId: "cbse-math-9",
    accessType: "free",
    previewAvailable: true,
  },
  "cbse-mathematics-class-9": {
    courseId: "cbse-mathematics-class-9",
    accessType: "free",
    previewAvailable: true,
  },
  "cbse-math-10": {
    courseId: "cbse-math-10",
    accessType: "free",
    previewAvailable: true,
  },
  "cbse-mathematics-class-10": {
    courseId: "cbse-mathematics-class-10",
    accessType: "free",
    previewAvailable: true,
  },
  "cbse-math-11": {
    courseId: "cbse-math-11",
    accessType: "paid",
    previewAvailable: true,
  },
  "cbse-math-12": {
    courseId: "cbse-math-12",
    accessType: "paid",
    previewAvailable: true,
  },

  // IBDP Courses
  "ibdp-math-hl": {
    courseId: "ibdp-math-hl",
    accessType: "paid",
    previewAvailable: true,
  },
  "ibdp-math-sl": {
    courseId: "ibdp-math-sl",
    accessType: "paid",
    previewAvailable: true,
  },

  // ICSE Courses
  "icse-math-9": {
    courseId: "icse-math-9",
    accessType: "free",
    previewAvailable: true,
  },
  "icse-math-10": {
    courseId: "icse-math-10",
    accessType: "paid",
    previewAvailable: true,
  },
};

// Helper functions to check access
export function canAccessRoute(
  pathname: string,
  userRole?: UserRole,
  isAuthenticated?: boolean
): boolean {
  const route = ROUTE_ACCESS.find((r) => pathname.startsWith(r.path));

  if (!route) {
    // If no specific rule, allow access (you might want to default to restricted)
    return true;
  }

  switch (route.accessLevel) {
    case "public":
      return true;
    case "authenticated":
      return isAuthenticated === true;
    case "student":
      return isAuthenticated === true && userRole === "student";
    case "admin":
      return isAuthenticated === true && userRole === "admin";
    default:
      return false;
  }
}

export function canAccessCourse(
  courseId: string,
  userRole?: UserRole,
  isEnrolled?: boolean,
  price?: number
): boolean {
  // Admins can access everything
  if (userRole === "admin") {
    return true;
  }

  // Check if course is free (price = 0)
  const isFree = price === 0;

  // For free courses, users must be enrolled (even though it's free)
  // This ensures proper access tracking
  if (isFree) {
    return isEnrolled === true;
  }

  // Paid courses require enrollment
  return isEnrolled === true;
}

export function getCourseAccessType(
  courseId: string
): CourseAccessConfig | null {
  return COURSE_ACCESS[courseId] || null;
}

export function getRedirectPath(
  pathname: string,
  userRole?: UserRole,
  isAuthenticated?: boolean
): string | null {
  const route = ROUTE_ACCESS.find((r) => pathname.startsWith(r.path));

  if (!route) return null;

  // If route has specific redirect, use it
  if (route.redirectTo) {
    return route.redirectTo;
  }

  // Default redirects based on access level
  switch (route.accessLevel) {
    case "authenticated":
      return isAuthenticated ? null : "/auth";
    case "admin":
      if (!isAuthenticated) return "/auth";
      if (userRole !== "admin") return "/dashboard"; // Better default for authenticated non-admin users
      return null;
    default:
      return null;
  }
}

// Navigation menu configuration
export const NAVIGATION_MENU = {
  public: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Pricing", href: "/pricing" },
    { label: "FAQ", href: "/faq" },
    { label: "Blog", href: "/blog" },
  ],
  student: [
    { label: "My Courses", href: "/courses/enrolled" },
    { label: "Progress", href: "/progress" },
    { label: "Assignments", href: "/assignments" },
    { label: "Profile", href: "/profile" },
    { label: "Subscription", href: "/subscription-management" },
  ],
  admin: [
    { label: "My Courses", href: "/courses/enrolled" },
    { label: "Site Administration", href: "/admin/site-administration" },
    { label: "Question Bank", href: "/question-bank" },
    { label: "Users", href: "/admin/users" },
    { label: "Courses", href: "/admin/courses" },
    { label: "Analytics", href: "/admin/analytics" },
    { label: "Templates", href: "/templates" },
    { label: "Helpdesk", href: "/helpdesk" },
    { label: "Profile", href: "/profile" },
  ],
  content_manager: [
    { label: "My Courses", href: "/courses/enrolled" },
    { label: "Question Bank", href: "/question-bank" },
    { label: "Profile", href: "/profile" },
  ],
};
