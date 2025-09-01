### Phase 5: Course Management System

**Status**: Planned

**Tasks**:

- [ ] Build course creation interface (admin)
- [ ] Implement course enrollment system
- [ ] Create course access validation
- [ ] Build progress tracking

**Key Features**:

- Course creation with paid/free options
- Enrollment management
- Progress tracking
- Certificate generation

### Phase 6: Subscription & Payment Integration

**Status**: Future

**Tasks**:

- [ ] Integrate payment gateway
- [ ] Implement subscription management
- [ ] Create billing interface
- [ ] Set up automatic renewals

### Phase 7: Admin Dashboard

**Status**: Future

**Tasks**:

- [ ] User management interface
- [ ] Course management tools
- [ ] Analytics dashboard
- [ ] Subscription management

## Role Permissions

### Public User Permissions

- ✅ View public pages
- ✅ Browse free courses
- ✅ Contact support
- ❌ Access student features
- ❌ View paid content

### Student Permissions

- ✅ All public user permissions
- ✅ Access student dashboard
- ✅ Enroll in free courses
- ✅ Track learning progress
- ✅ Update profile
- ❌ Access paid courses
- ❌ Admin features

### Student Paid Permissions

- ✅ All student permissions
- ✅ Enroll in paid courses
- ✅ Access enrolled course content
- ✅ Download certificates
- ✅ Priority support
- ❌ Admin features

### Admin Permissions

- ✅ All user permissions
- ✅ Manage all users
- ✅ Create/edit courses
- ✅ Manage subscriptions
- ✅ Access analytics
- ✅ Platform settings

## Security Implementation

### Row Level Security (RLS) Policies

```sql
-- Public users can view free courses
CREATE POLICY "Public users can view free courses" ON public.courses
  FOR SELECT USING (is_paid = false);

-- Authenticated users can view all courses
CREATE POLICY "Authenticated users can view all courses" ON public.courses
  FOR SELECT USING (auth.uid() IS NOT NULL);

-- Enrolled users can access course content
CREATE POLICY "Enrolled users can view course lessons" ON public.lessons
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.course_enrollments ce
      WHERE ce.user_id = auth.uid() AND ce.course_id = lessons.course_id
    )
  );
```

### Access Control Functions

```sql
-- Check if user can access a course
CREATE OR REPLACE FUNCTION public.can_access_course(
  course_id UUID,
  user_id UUID DEFAULT auth.uid()
)
RETURNS BOOLEAN AS $$
-- Implementation details in database setup
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

## Testing Strategy

### User Journey Testing

1. **Public User Journey**:

   - Visit landing page
   - Browse free courses
   - Attempt to access restricted content (should redirect)

2. **Student Journey**:

   - Sign up/login
   - Access student dashboard
   - Enroll in free courses
   - Attempt to access paid content (should show upgrade prompt)

3. **Paid Student Journey**:

   - Purchase subscription
   - Enroll in paid courses
   - Access course content
   - Track progress

4. **Admin Journey**:
   - Access admin dashboard
   - Manage users
   - Create/edit courses
   - View analytics

### Permission Testing

```typescript
// Test permission checks
const { hasPermission, canAccessCourse } = useAuth();

// Test role-based access
console.log("Can manage courses:", hasPermission("canManageCourses"));
console.log("Can access course:", await canAccessCourse(courseId));
```

## Migration Guide

### From Current System

1. **Database Migration**:

   ```sql
   -- Run complete_user_roles_setup.sql
   -- This will update existing users to new schema
   ```

2. **Code Updates**:

   - Update type definitions
   - Enhance AuthContext
   - Update components for new roles

3. **Testing**:
   - Test all user journeys
   - Verify permissions work correctly
   - Check Google Auth integration

## Next Steps

### Immediate Actions (This Week)

1. **Run Database Setup**:

   ```bash
   # Execute complete_user_roles_setup.sql in Supabase
   ```

2. **Update Type Definitions**:

   - Update `src/types/auth.ts` with new roles
   - Update `src/contexts/AuthContext.tsx`

3. **Test Google Auth**:
   - Verify profile creation works
   - Check name parsing

### Short Term (Next 2 Weeks)

1. **Implement Role Guards**:

   - Create enhanced RoleGuard component
   - Build subscription guards
   - Update middleware

2. **Create Basic Admin Interface**:
   - User management
   - Course creation
   - Role assignment

### Medium Term (Next Month)

1. **Course Management**:

   - Course creation interface
   - Enrollment system
   - Progress tracking

2. **Subscription System**:
   - Payment integration
   - Subscription management
   - Billing interface

## Success Metrics

- [ ] All 4 user types can access appropriate content
- [ ] Google Auth creates profiles correctly
- [ ] Course access is properly restricted
- [ ] Admin can manage users and courses
- [ ] Subscription system works end-to-end
- [ ] No security vulnerabilities in role system

## Important: Role Assignment Policy

**All new users are automatically registered as students.** Paid subscriptions and admin roles can only be assigned by existing administrators or through the payment system. This ensures proper security and prevents unauthorized access.

## Security Considerations

### 1. Server-Side Validation

Always validate permissions on the server side:

```typescript
// In API routes
export async function POST(request: Request) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    return new Response("Forbidden", { status: 403 });
  }

  // Proceed with admin action
}
```

### 2. Client-Side Protection

Use RoleGuard components for UI protection:

```tsx
<RoleGuard allowedRoles={["admin"]}>
  <AdminPanel />
</RoleGuard>
```

### 3. Middleware Protection

Admin routes are protected at the middleware level:

```typescript
// Routes starting with /admin require admin role
const adminRoutes = ["/admin", "/analytics", "/manage-users"];
```

## Troubleshooting

### Common Issues

1. **Profile Not Loading**: Check RLS policies and database connection
2. **Permission Denied**: Verify user role in database
3. **Route Access Issues**: Check middleware configuration

### Debug Commands

```sql
-- Check user roles
SELECT id, first_name, last_name, role, subscription_status FROM profiles;

-- Check RLS policies
SELECT * FROM pg_policies WHERE tablename = 'profiles';
```
