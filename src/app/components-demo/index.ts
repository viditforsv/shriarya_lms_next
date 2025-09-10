// Main Components Export File
// This file provides a centralized way to import all components

// Export all UI components
export * from './ui'

// Export specific components
export { CourseSidebar, CourseSidebarExample } from './ui/layout-components/course-sidebar'

// Export context providers
export { AuthProvider, useAuth } from '../../contexts/AuthContext'

// Export utility functions
export * from '../../lib/utils'

// Re-export commonly used types
export type { User, Session } from '@supabase/supabase-js'
