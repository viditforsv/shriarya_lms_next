import { useState } from 'react'
import { deleteCourse } from '@/lib/course-deletion'

interface UseCourseDeletionReturn {
  isDeleting: boolean
  deleteCourse: (courseId: string, courseTitle: string) => Promise<boolean>
  error: string | null
}

/**
 * React hook for course deletion with loading state and error handling
 */
export function useCourseDeletion(): UseCourseDeletionReturn {
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDeleteCourse = async (courseId: string, courseTitle: string): Promise<boolean> => {
    try {
      setIsDeleting(true)
      setError(null)

      const success = await deleteCourse(courseId, courseTitle)
      
      if (!success) {
        setError('Course deletion was cancelled or failed')
        return false
      }

      return true
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete course'
      setError(errorMessage)
      return false
    } finally {
      setIsDeleting(false)
    }
  }

  return {
    isDeleting,
    deleteCourse: handleDeleteCourse,
    error,
  }
}
