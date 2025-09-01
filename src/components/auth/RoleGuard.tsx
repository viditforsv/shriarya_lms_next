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
  const { user, profile, loading } = useAuth()

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
    const { hasPermission } = useAuth()
    if (!hasPermission(requiredPermission)) {
      return <>{fallback}</>
    }
  }

  return <>{children}</>
}

// Convenience components for common use cases
export function AdminOnly({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <RoleGuard allowedRoles={['admin']} fallback={fallback}>
      {children}
    </RoleGuard>
  )
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
