'use client'

import { useState, useCallback, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { enrollInCourse, cancelEnrollment, isUserEnrolled, Enrollment } from '@/lib/courses'

export function useCourseEnrollment() {
  const { user } = useAuth()
  const [loading, setLoading] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Enroll in a course
  const enroll = useCallback(async (courseId: string): Promise<Enrollment | null> => {
    if (!user) {
      setError('Please log in to enroll in courses')
      return null
    }

    setLoading(courseId)
    setError(null)

    try {
      const enrollment = await enrollInCourse(courseId)
      return enrollment
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to enroll in course'
      setError(message)
      return null
    } finally {
      setLoading(null)
    }
  }, [user])

  // Cancel enrollment
  const cancel = useCallback(async (courseId: string): Promise<void> => {
    if (!user) {
      setError('Please log in to manage enrollments')
      return
    }

    setLoading(courseId)
    setError(null)

    try {
      await cancelEnrollment(courseId)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to cancel enrollment'
      setError(message)
    } finally {
      setLoading(null)
    }
  }, [user])

  // Check if user is enrolled
  const checkEnrollment = useCallback(async (courseId: string): Promise<boolean> => {
    if (!user) return false

    try {
      return await isUserEnrolled(courseId)
    } catch (err) {
      console.error('Error checking enrollment:', err)
      return false
    }
  }, [user])

  return {
    enroll,
    cancel,
    checkEnrollment,
    loading,
    error,
    clearError: () => setError(null)
  }
}

export function useCourseAccess(courseId: string) {
  const { user } = useAuth()
  const [hasAccess, setHasAccess] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

  const checkAccess = useCallback(async () => {
    if (!user) {
      setHasAccess(false)
      setLoading(false)
      return
    }

    try {
      const enrolled = await isUserEnrolled(courseId)
      setHasAccess(enrolled)
    } catch (err) {
      console.error('Error checking course access:', err)
      setHasAccess(false)
    } finally {
      setLoading(false)
    }
  }, [user, courseId])

  // Check access on mount and when dependencies change
  useEffect(() => {
    checkAccess()
  }, [checkAccess])

  return {
    hasAccess,
    loading,
    checkAccess
  }
}
