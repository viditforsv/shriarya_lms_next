import { UserRole } from '@/types/auth'

// Define access levels
export type AccessLevel = 'public' | 'authenticated' | 'student' | 'admin'

// Course access types
export type CourseAccess = 'free' | 'paid' | 'enrolled'

// Route access configuration
export interface RouteAccess {
  path: string
  accessLevel: AccessLevel
  requiredRole?: UserRole
  requiredPermission?: string
  redirectTo?: string
}

// Course access configuration
export interface CourseAccessConfig {
  courseId: string
  accessType: CourseAccess
  requiredRole?: UserRole
  isFree: boolean
  previewAvailable: boolean
}

// Define all route access rules
export const ROUTE_ACCESS: RouteAccess[] = [
  // Public routes (accessible to everyone)
  { path: '/', accessLevel: 'public' },
  { path: '/courses', accessLevel: 'public' },
  { path: '/courses/cbse', accessLevel: 'public' },
  { path: '/courses/ibdp', accessLevel: 'public' },
  { path: '/courses/icse', accessLevel: 'public' },
  { path: '/courses/igcse', accessLevel: 'public' },
  { path: '/courses/isc', accessLevel: 'public' },
  { path: '/about', accessLevel: 'public' },
  { path: '/contact', accessLevel: 'public' },
  { path: '/pricing', accessLevel: 'public' },
  { path: '/auth', accessLevel: 'public' },
  { path: '/auth/callback', accessLevel: 'public' },
  { path: '/login', accessLevel: 'public' },
  { path: '/signup', accessLevel: 'public' },
  { path: '/password-reset', accessLevel: 'public' },
  { path: '/terms', accessLevel: 'public' },
  { path: '/privacy', accessLevel: 'public' },
  { path: '/faq', accessLevel: 'public' },
  { path: '/faq-support', accessLevel: 'public' },
  { path: '/refund', accessLevel: 'public' },
  { path: '/landing', accessLevel: 'public' },
  { path: '/team', accessLevel: 'public' },
  { path: '/testimonials', accessLevel: 'public' },
  { path: '/services', accessLevel: 'public' },
  { path: '/portfolio', accessLevel: 'public' },
  { path: '/blog', accessLevel: 'public' },
  { path: '/blog-post', accessLevel: 'public' },

  // Authenticated routes (require login)
  { path: '/dashboard', accessLevel: 'authenticated' },
  { path: '/profile', accessLevel: 'authenticated' },
  { path: '/user-profile', accessLevel: 'authenticated' },
  { path: '/courses/enrolled', accessLevel: 'authenticated' },
  { path: '/progress', accessLevel: 'authenticated' },
  { path: '/assignments', accessLevel: 'authenticated' },
  { path: '/checkout', accessLevel: 'authenticated' },
  { path: '/subscription-management', accessLevel: 'authenticated' },

  // Admin-only routes
  { path: '/admin', accessLevel: 'admin', requiredRole: 'admin' },
  { path: '/admin/users', accessLevel: 'admin', requiredRole: 'admin' },
  { path: '/admin/courses', accessLevel: 'admin', requiredRole: 'admin' },
  { path: '/admin/analytics', accessLevel: 'admin', requiredRole: 'admin' },
  { path: '/courses/manage', accessLevel: 'admin', requiredRole: 'admin' },
  { path: '/admin-panel', accessLevel: 'admin', requiredRole: 'admin' },
  { path: '/instructor-dashboard', accessLevel: 'admin', requiredRole: 'admin' },
  { path: '/institution-dashboard', accessLevel: 'admin', requiredRole: 'admin' },
  { path: '/teacher-signup', accessLevel: 'admin', requiredRole: 'admin' },
  { path: '/analytics', accessLevel: 'admin', requiredRole: 'admin' },
  { path: '/helpdesk', accessLevel: 'admin', requiredRole: 'admin' },

  // Development/Test routes (admin only)
  { path: '/components-demo', accessLevel: 'admin', requiredRole: 'admin' },
  { path: '/components-test', accessLevel: 'admin', requiredRole: 'admin' },
  { path: '/test-auth', accessLevel: 'admin', requiredRole: 'admin' },
  { path: '/templates', accessLevel: 'admin', requiredRole: 'admin' },
]

// Define course access rules
export const COURSE_ACCESS: Record<string, CourseAccessConfig> = {
  // CBSE Courses
  'cbse-math-9': {
    courseId: 'cbse-math-9',
    accessType: 'free',
    isFree: true,
    previewAvailable: true,
  },
  'cbse-math-10': {
    courseId: 'cbse-math-10',
    accessType: 'paid',
    isFree: false,
    previewAvailable: true,
  },
  'cbse-math-11': {
    courseId: 'cbse-math-11',
    accessType: 'paid',
    isFree: false,
    previewAvailable: true,
  },
  'cbse-math-12': {
    courseId: 'cbse-math-12',
    accessType: 'paid',
    isFree: false,
    previewAvailable: true,
  },

  // IBDP Courses
  'ibdp-math-hl': {
    courseId: 'ibdp-math-hl',
    accessType: 'paid',
    isFree: false,
    previewAvailable: true,
  },
  'ibdp-math-sl': {
    courseId: 'ibdp-math-sl',
    accessType: 'paid',
    isFree: false,
    previewAvailable: true,
  },

  // ICSE Courses
  'icse-math-9': {
    courseId: 'icse-math-9',
    accessType: 'free',
    isFree: true,
    previewAvailable: true,
  },
  'icse-math-10': {
    courseId: 'icse-math-10',
    accessType: 'paid',
    isFree: false,
    previewAvailable: true,
  },
}

// Helper functions to check access
export function canAccessRoute(pathname: string, userRole?: UserRole, isAuthenticated?: boolean): boolean {
  const route = ROUTE_ACCESS.find(r => pathname.startsWith(r.path))
  
  if (!route) {
    // If no specific rule, allow access (you might want to default to restricted)
    return true
  }

  switch (route.accessLevel) {
    case 'public':
      return true
    case 'authenticated':
      return isAuthenticated === true
    case 'student':
      return isAuthenticated === true && userRole === 'student'
    case 'admin':
      return isAuthenticated === true && userRole === 'admin'
    default:
      return false
  }
}

export function canAccessCourse(courseId: string, userRole?: UserRole, isEnrolled?: boolean): boolean {
  const course = COURSE_ACCESS[courseId]
  
  if (!course) {
    // If no specific rule, deny access
    return false
  }

  // Free courses are accessible to everyone
  if (course.isFree) {
    return true
  }

  // Paid courses require authentication
  if (!userRole) {
    return false
  }

  // Admins can access everything
  if (userRole === 'admin') {
    return true
  }

  // Students need to be enrolled for paid courses
  if (course.accessType === 'paid') {
    return isEnrolled === true
  }

  return false
}

export function getCourseAccessType(courseId: string): CourseAccessConfig | null {
  return COURSE_ACCESS[courseId] || null
}

export function getRedirectPath(pathname: string, userRole?: UserRole, isAuthenticated?: boolean): string | null {
  const route = ROUTE_ACCESS.find(r => pathname.startsWith(r.path))
  
  if (!route) return null

  // If route has specific redirect, use it
  if (route.redirectTo) {
    return route.redirectTo
  }

  // Default redirects based on access level
  switch (route.accessLevel) {
    case 'authenticated':
      return isAuthenticated ? null : '/auth'
    case 'admin':
      if (!isAuthenticated) return '/auth'
      if (userRole !== 'admin') return '/dashboard'
      return null
    default:
      return null
  }
}

// Navigation menu configuration
export const NAVIGATION_MENU = {
  public: [
    { label: 'Home', href: '/' },
    { label: 'Courses', href: '/courses' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Blog', href: '/blog' },
  ],
  student: [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'My Courses', href: '/courses/enrolled' },
    { label: 'Progress', href: '/progress' },
    { label: 'Assignments', href: '/assignments' },
    { label: 'Profile', href: '/profile' },
    { label: 'Subscription', href: '/subscription-management' },
  ],
  admin: [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Users', href: '/admin/users' },
    { label: 'Courses', href: '/admin/courses' },
    { label: 'Analytics', href: '/admin/analytics' },
    { label: 'Admin Panel', href: '/admin-panel' },
    { label: 'Helpdesk', href: '/helpdesk' },
    { label: 'Profile', href: '/profile' },
  ],
}
