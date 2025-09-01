# ShriArya LMS - Page Access Control

## 📋 Page Access Levels

### 🔓 **Public Only** (Everyone can access)

These pages are accessible to anyone, including non-logged-in users:

- `/` - Home/Landing page
- `/courses` - Course catalog overview
- `/courses/cbse` - CBSE courses listing
- `/courses/ibdp` - IBDP courses listing
- `/courses/icse` - ICSE courses listing
- `/courses/igcse` - IGCSE courses listing
- `/courses/isc` - ISC courses listing
- `/about` - About us page
- `/contact` - Contact page
- `/pricing` - Pricing plans
- `/auth` - Authentication page
- `/auth/callback` - OAuth callback
- `/login` - Login page
- `/signup` - Signup page
- `/password-reset` - Password reset
- `/terms` - Terms of service
- `/privacy` - Privacy policy
- `/faq` - Frequently asked questions
- `/faq-support` - FAQ and support
- `/refund` - Refund policy
- `/landing` - Landing page template
- `/team` - Team page
- `/testimonials` - Testimonials
- `/services` - Services page
- `/portfolio` - Portfolio
- `/blog` - Blog listing
- `/blog-post` - Individual blog posts

### 🔐 **Students + Public** (Authenticated users + Public)

These pages require login but are accessible to both students and admins:

- `/dashboard` - User dashboard (role-based content)
- `/profile` - User profile page
- `/user-profile` - Extended user profile
- `/courses/enrolled` - User's enrolled courses
- `/progress` - Learning progress tracking
- `/assignments` - Course assignments
- `/checkout` - Payment checkout
- `/subscription-management` - Subscription management

### 👑 **Admin Only** (Admin role required)

These pages are only accessible to users with admin role:

- `/admin` - Admin dashboard
- `/admin/users` - User management
- `/admin/courses` - Course management
- `/admin/analytics` - Analytics dashboard
- `/courses/manage` - Course management interface
- `/admin-panel` - Admin panel
- `/instructor-dashboard` - Instructor dashboard
- `/institution-dashboard` - Institution dashboard
- `/teacher-signup` - Teacher signup
- `/analytics` - Analytics page
- `/helpdesk` - Helpdesk management

### 🛠️ **Development/Admin Only**

These pages are for development and testing:

- `/components-demo` - Component demonstrations
- `/components-test` - Component testing
- `/test-auth` - Authentication testing
- `/templates` - Template pages

## 🎯 **Course Access Rules**

### **Free Courses** (Public + Students + Admins)

- `cbse-math-9` - CBSE Mathematics Class 9
- `icse-math-9` - ICSE Mathematics Class 9

### **Paid Courses** (Enrolled Students + Admins)

- `cbse-math-10` - CBSE Mathematics Class 10
- `cbse-math-11` - CBSE Mathematics Class 11
- `cbse-math-12` - CBSE Mathematics Class 12
- `ibdp-math-hl` - IBDP Mathematics HL
- `ibdp-math-sl` - IBDP Mathematics SL
- `icse-math-10` - ICSE Mathematics Class 10

## 🔒 **Access Control Implementation**

### **Frontend Protection**

- `RoleGuard` components for conditional rendering
- `useCourseAccess` hook for course access checking
- `CourseAccessBadge` for visual access indicators

### **Backend Protection**

- Middleware route protection
- Database-level enrollment tracking
- Row-level security policies

### **Navigation Control**

- Dynamic navigation menus based on user role
- Hidden admin links for non-admin users
- Role-based dashboard content

## 📊 **User Journey Examples**

### **Public User**

1. Can browse `/courses` and see course listings
2. Can access free course content
3. Cannot access paid courses (redirected to login)
4. Cannot see admin pages in navigation

### **Student User**

1. Can access all public pages
2. Can access student dashboard with course progress
3. Can enroll in paid courses
4. Cannot access admin pages

### **Admin User**

1. Can access all public and student pages
2. Can access all admin pages
3. Can manage users and courses
4. Can view analytics and system data
