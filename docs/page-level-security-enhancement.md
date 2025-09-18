# Page-Level Security Enhancement Plan

## Overview

This document outlines the necessary enhancements to the existing page-level security system before implementing the question bank access control strategy. The current system has basic RBAC but needs expansion to support granular question bank operations.

## 🔍 Current Security Analysis

### ✅ Existing Security Features

- **Middleware Protection**: Basic route-level access control
- **Authentication Context**: User session and profile management
- **Role-Based Access**: student, admin, instructor roles
- **Route Configuration**: Public, authenticated, and admin-only routes
- **Permission System**: Basic permission checking in AuthContext

### ❌ Missing Security Features

- **Question Bank Routes**: No specific routes for question management
- **Content Manager Role**: Missing content manager role implementation
- **Granular Permissions**: No question-specific permissions
- **API Security**: No endpoint-level protection
- **Audit Logging**: No security event tracking

## 🛠️ Required Enhancements

### Phase 1: Role Simplification (Week 1)

#### 1.1 Update User Role Types

```typescript
// Update src/types/auth.ts
export type UserRole = "student" | "content_manager" | "admin";
```

#### 1.2 Simplified Permission Matrix

```typescript
interface RolePermissions {
  // Basic permissions
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

// Role permission mapping
const ROLE_PERMISSIONS: Record<UserRole, RolePermissions> = {
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
};
```

### Phase 2: Route Security Enhancement (Week 1-2)

#### 2.1 Question Bank Routes

```typescript
// Add to src/lib/access-control.ts
const QUESTION_BANK_ROUTES: RouteAccess[] = [
  // Question Management Routes (Content Manager + Admin)
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

  // Admin-only Routes
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
];
```

#### 2.2 API Route Protection

```typescript
// Add API route security
const API_ROUTES: RouteAccess[] = [
  {
    path: "/api/question-bank",
    accessLevel: "authenticated",
    requiredRole: "content_manager",
  },
  {
    path: "/api/question-bank/admin",
    accessLevel: "admin",
    requiredRole: "admin",
  },
];
```

### Phase 3: Middleware Enhancement (Week 2)

#### 3.1 Enhanced Middleware Logic

```typescript
// Update src/middleware.ts
export async function middleware(req: NextRequest) {
  // ... existing code ...

  // Enhanced role checking with fallback
  let userRole: UserRole | undefined = user?.user_metadata?.role;

  if (!userRole && user) {
    try {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();
      userRole = profile?.role as UserRole;
    } catch (error) {
      console.error("Error fetching user role:", error);
      // Default to student role for security
      userRole = "student";
    }
  }

  // Enhanced access checking
  const canAccess = canAccessRoute(pathname, userRole, isAuthenticated);

  if (!canAccess) {
    // Log security event
    await logSecurityEvent({
      userId: user?.id,
      pathname,
      userRole,
      action: "ACCESS_DENIED",
      timestamp: new Date().toISOString(),
    });

    const redirectPath = getRedirectPath(pathname, userRole, isAuthenticated);
    // ... redirect logic ...
  }

  return res;
}
```

### Phase 4: API Security Implementation (Week 2-3)

#### 4.1 API Middleware Function

```typescript
// Create src/lib/api-security.ts
export async function validateApiAccess(
  request: NextRequest,
  requiredRole: UserRole,
  requiredPermission?: string
): Promise<{ allowed: boolean; user?: User; profile?: UserProfile }> {
  const supabase = createServerClient(/* ... */);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { allowed: false };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile) {
    return { allowed: false };
  }

  // Check role
  if (profile.role !== requiredRole && profile.role !== "admin") {
    return { allowed: false };
  }

  // Check specific permission if required
  if (requiredPermission && !hasPermission(profile.role, requiredPermission)) {
    return { allowed: false };
  }

  return { allowed: true, user, profile };
}
```

#### 4.2 API Route Protection

```typescript
// Example: src/app/api/question-bank/route.ts
export async function GET(request: NextRequest) {
  const { allowed, user, profile } = await validateApiAccess(
    request,
    "content_manager",
    "canCreateQuestions"
  );

  if (!allowed) {
    return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }

  // ... API logic ...
}
```

### Phase 5: Audit Logging (Week 3)

#### 5.1 Security Event Logging

```typescript
// Create src/lib/audit-logger.ts
export interface SecurityEvent {
  userId?: string;
  action: string;
  resource: string;
  pathname: string;
  userRole?: UserRole;
  ipAddress?: string;
  userAgent?: string;
  timestamp: string;
  success: boolean;
  details?: Record<string, any>;
}

export async function logSecurityEvent(event: SecurityEvent) {
  const supabase = createServerClient(/* ... */);

  await supabase.from("security_events").insert({
    user_id: event.userId,
    action: event.action,
    resource: event.resource,
    pathname: event.pathname,
    user_role: event.userRole,
    ip_address: event.ipAddress,
    user_agent: event.userAgent,
    timestamp: event.timestamp,
    success: event.success,
    details: event.details,
  });
}
```

#### 5.2 Database Schema for Audit Logs

```sql
-- Security events table
CREATE TABLE security_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  action VARCHAR(100) NOT NULL,
  resource VARCHAR(100) NOT NULL,
  pathname VARCHAR(500) NOT NULL,
  user_role VARCHAR(50),
  ip_address INET,
  user_agent TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  success BOOLEAN NOT NULL,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for performance
CREATE INDEX idx_security_events_user_id ON security_events(user_id);
CREATE INDEX idx_security_events_action ON security_events(action);
CREATE INDEX idx_security_events_timestamp ON security_events(timestamp);
```

## 🔒 Security Best Practices

### 1. Defense in Depth

- **Client-side**: UI permission checks
- **Middleware**: Route-level protection
- **API**: Endpoint-level validation
- **Database**: Row-level security (RLS)

### 2. Principle of Least Privilege

- Users get minimum required permissions
- Role inheritance with explicit overrides
- Temporary permission grants with expiration

### 3. Security Monitoring

- Real-time security event logging
- Failed access attempt tracking
- Suspicious activity detection
- Regular security audit reviews

## 📊 Implementation Timeline

### Week 1: Foundation

- [ ] Update user role types
- [ ] Enhance permission matrix
- [ ] Add question bank routes
- [ ] Update middleware logic

### Week 2: API Security

- [ ] Implement API access validation
- [ ] Add endpoint-level protection
- [ ] Create security middleware
- [ ] Test route protection

### Week 3: Audit & Monitoring

- [ ] Implement audit logging
- [ ] Create security events table
- [ ] Add monitoring dashboard
- [ ] Security testing

### Week 4: Testing & Validation

- [ ] Comprehensive security testing
- [ ] Penetration testing
- [ ] Performance impact assessment
- [ ] Documentation updates

## 🎯 Success Criteria

### Security Success

- All routes properly protected
- API endpoints secured
- Audit trail complete
- Zero unauthorized access

### Performance Success

- < 50ms middleware overhead
- Efficient permission checking
- Scalable audit logging
- Minimal database impact

## 🔗 Next Steps

1. **Implement Phase 1**: Role expansion and permission matrix
2. **Add Question Bank Routes**: Define all required routes
3. **Enhance Middleware**: Update access control logic
4. **Implement API Security**: Protect all endpoints
5. **Add Audit Logging**: Track security events
6. **Test Thoroughly**: Validate all security measures

## 📋 Related Documents

- [Question Bank Access Control Strategy](./question-bank-access-control.md)
- [Engineer Collaboration Strategy](./engineer-collaboration-strategy.md)
- [Current Access Control Implementation](../src/lib/access-control.ts)
