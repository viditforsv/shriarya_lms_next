'use client'

import { ReactNode } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { UserRole } from '@/types/auth'

interface RoleGuardProps {
  children: ReactNode
  allowedRoles?: UserRole[]
  requiredPermission?: keyof import('@/types/auth').RolePermissions
  fallback?: ReactNode
  showForPublic?: boolean // Allow public users (not logged in) to see content
}

export function RoleGuard({ 
  children, 
  allowedRoles, 
  requiredPermission, 
  fallback = null,
  showForPublic = false 
}: RoleGuardProps) {
  const { user, profile, loading, hasPermission } = useAuth()

  // Show loading state
  if (loading) {
    return null
  }

  // Handle public access
  if (showForPublic && !user) {
    return <>{children}</>
  }

  // Require authentication
  if (!user || !profile) {
    return <>{fallback}</>
  }

  // Check role-based access
  if (allowedRoles && !allowedRoles.includes(profile.role)) {
    return <>{fallback}</>
  }

  // Check permission-based access
  if (requiredPermission) {
    if (!hasPermission(requiredPermission)) {
      return <>{fallback}</>
    }
  }

  return <>{children}</>
}

// Convenience components for common use cases
export function AdminOnly({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  const { loading, user, profile } = useAuth()
  
  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#e27447] mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading admin panel...</p>
        </div>
      </div>
    )
  }
  
  // Show fallback if not admin
  if (!user || !profile || profile.role !== 'admin') {
    return fallback || (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-4">You don&apos;t have admin privileges to access this page.</p>
          <a href="/dashboard" className="text-[#e27447] hover:underline">Return to Dashboard</a>
        </div>
      </div>
    )
  }
  
  return <>{children}</>
}

export function StudentOnly({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <RoleGuard allowedRoles={['student']} fallback={fallback}>
      {children}
    </RoleGuard>
  )
}

export function AuthenticatedOnly({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <RoleGuard fallback={fallback}>
      {children}
    </RoleGuard>
  )
}

export function PublicOrAuthenticated({ children }: { children: ReactNode }) {
  return (
    <RoleGuard showForPublic={true}>
      {children}
    </RoleGuard>
  )
}
