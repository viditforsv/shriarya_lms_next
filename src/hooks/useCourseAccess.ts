import { useAuth } from '@/contexts/AuthContext'
import { canAccessCourse, getCourseAccessType, CourseAccessConfig } from '@/lib/access-control'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export function useCourseAccess(courseId: string) {
  const { user, profile } = useAuth()
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  // Check enrollment status
  useEffect(() => {
    const checkEnrollment = async () => {
      if (!user || !profile) {
        setIsEnrolled(false)
        setIsLoading(false)
        return
      }

      try {
        const { data, error } = await supabase
          .from('enrollments')
          .select('*')
          .eq('student_id', user.id)
          .eq('course_id', courseId)
          .eq('is_active', true)
          .single()

        if (error && error.code !== 'PGRST116') {
          console.error('Error checking enrollment:', error)
        }

        setIsEnrolled(!!data)
      } catch (error) {
        console.error('Error checking enrollment:', error)
        setIsEnrolled(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkEnrollment()
  }, [user, profile, courseId, supabase])

  // Get course access configuration
  const courseConfig = getCourseAccessType(courseId)

  // Check if user can access the course
  const canAccess = canAccessCourse(
    courseId, 
    profile?.role, 
    isEnrolled
  )

  // Check if user can preview the course
  const canPreview = courseConfig?.previewAvailable || false

  // Check if course is free
  const isFree = courseConfig?.isFree || false

  // Check if user needs to enroll
  const needsEnrollment = !isFree && !isEnrolled && profile?.role === 'student'

  // Check if user needs to upgrade (for paid courses)
  const needsUpgrade = !isFree && !user

  return {
    canAccess,
    canPreview,
    isEnrolled,
    isFree,
    needsEnrollment,
    needsUpgrade,
    isLoading,
    courseConfig,
  }
}

// Hook for checking multiple courses at once
export function useCoursesAccess(courseIds: string[]) {
  const { user, profile } = useAuth()
  const [enrollments, setEnrollments] = useState<Record<string, boolean>>({})
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const checkEnrollments = async () => {
      if (!user || !profile || courseIds.length === 0) {
        setEnrollments({})
        setIsLoading(false)
        return
      }

      try {
        const { data, error } = await supabase
          .from('enrollments')
          .select('course_id')
          .eq('student_id', user.id)
          .eq('is_active', true)
          .in('course_id', courseIds)

        if (error) {
          console.error('Error checking enrollments:', error)
          setEnrollments({})
        } else {
          const enrollmentMap: Record<string, boolean> = {}
          courseIds.forEach(id => {
            enrollmentMap[id] = data?.some(e => e.course_id === id) || false
          })
          setEnrollments(enrollmentMap)
        }
      } catch (error) {
        console.error('Error checking enrollments:', error)
        setEnrollments({})
      } finally {
        setIsLoading(false)
      }
    }

    checkEnrollments()
  }, [user, profile, courseIds, supabase])

  const getCourseAccess = (courseId: string) => {
    const isEnrolled = enrollments[courseId] || false
    const canAccess = canAccessCourse(courseId, profile?.role, isEnrolled)
    const courseConfig = getCourseAccessType(courseId)

    return {
      canAccess,
      isEnrolled,
      isFree: courseConfig?.isFree || false,
      canPreview: courseConfig?.previewAvailable || false,
    }
  }

  return {
    enrollments,
    isLoading,
    getCourseAccess,
  }
}
