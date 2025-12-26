// Common template data structures and utilities
// This reduces duplication across template pages

export interface TemplateStats {
  totalUsers: number
  activeUsers: number
  totalCourses: number
  completedCourses: number
  totalRevenue: number
  averageRating: number
  monthlyGrowth: number
}

export interface TemplateUser {
  id: number
  name: string
  email: string
  role: 'student' | 'instructor' | 'admin'
  status: 'active' | 'inactive' | 'pending'
  joinDate: string
  lastActive: string
  coursesEnrolled: number
  coursesCompleted: number
  rating?: number
  avatar?: string
}

export interface TemplateCourse {
  id: number
  title: string
  description: string
  instructor: string
  price: number
  originalPrice?: number
  discount?: number
  duration: string
  level: 'beginner' | 'intermediate' | 'advanced'
  category: string
  rating: number
  students: number
  lessons: number
  status: 'published' | 'draft' | 'archived'
  thumbnail?: string
  tags: string[]
}

export interface TemplateLesson {
  id: number
  title: string
  description: string
  duration: string
  type: 'video' | 'text' | 'quiz' | 'assignment'
  isCompleted: boolean
  isLocked: boolean
  order: number
  resources?: TemplateResource[]
}

export interface TemplateResource {
  id: number
  title: string
  type: 'pdf' | 'video' | 'image' | 'link'
  url: string
  size?: string
  duration?: string
}

export interface TemplateNotification {
  id: number
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  timestamp: string
  isRead: boolean
  actionUrl?: string
}

// Common mock data generators
export const generateMockUsers = (count: number): TemplateUser[] => {
  const roles: TemplateUser['role'][] = ['student', 'instructor', 'admin']
  const statuses: TemplateUser['status'][] = ['active', 'inactive', 'pending']
  
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: roles[i % roles.length],
    status: statuses[i % statuses.length],
    joinDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
    lastActive: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    coursesEnrolled: Math.floor(Math.random() * 10),
    coursesCompleted: Math.floor(Math.random() * 5),
    rating: Math.random() * 2 + 3, // 3-5 rating
  }))
}

export const generateMockCourses = (count: number): TemplateCourse[] => {
  const levels: TemplateCourse['level'][] = ['beginner', 'intermediate', 'advanced']
  const categories = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science']
  const statuses: TemplateCourse['status'][] = ['published', 'draft', 'archived']
  
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: `Course ${i + 1}`,
    description: `This is a comprehensive course covering important topics.`,
    instructor: `Instructor ${i + 1}`,
    price: Math.floor(Math.random() * 2000) + 500,
    originalPrice: Math.floor(Math.random() * 500) + 2000,
    discount: Math.floor(Math.random() * 30) + 10,
    duration: `${Math.floor(Math.random() * 6) + 1} months`,
    level: levels[i % levels.length],
    category: categories[i % categories.length],
    rating: Math.random() * 2 + 3,
    students: Math.floor(Math.random() * 1000) + 100,
    lessons: Math.floor(Math.random() * 20) + 5,
    status: statuses[i % statuses.length],
    tags: ['popular', 'trending', 'new'],
  }))
}

export const generateMockNotifications = (count: number): TemplateNotification[] => {
  const types: TemplateNotification['type'][] = ['info', 'success', 'warning', 'error']
  
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: `Notification ${i + 1}`,
    message: `This is a sample notification message for testing purposes.`,
    type: types[i % types.length],
    timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
    isRead: Math.random() > 0.5,
  }))
}

// Common utility functions
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount)
}

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export const formatTimeAgo = (date: string): string => {
  const now = new Date()
  const past = new Date(date)
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000)
  
  if (diffInSeconds < 60) return 'Just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`
  
  return formatDate(date)
}

export const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'active':
    case 'published':
    case 'success':
      return 'text-green-600 bg-green-50'
    case 'inactive':
    case 'draft':
    case 'warning':
      return 'text-yellow-600 bg-yellow-50'
    case 'pending':
    case 'info':
      return 'text-blue-600 bg-blue-50'
    case 'archived':
    case 'error':
      return 'text-red-600 bg-red-50'
    default:
      return 'text-gray-600 bg-gray-50'
  }
}
