'use client'

import { useState } from 'react'
import { Button } from '@/app/components-demo/ui/ui-components/button'
import { Trash2, AlertTriangle } from 'lucide-react'
import { useCourseDeletion } from '@/hooks/useCourseDeletion'

interface Course {
  id: string
  title: string
  slug: string
  status: 'draft' | 'published' | 'archived'
}

interface CourseDeletionButtonProps {
  course: Course
  onCourseDeleted?: () => void
  variant?: 'primary' | 'secondary' | 'outline' | 'destructive'
  size?: 'sm' | 'default' | 'lg'
}

export function CourseDeletionButton({ 
  course, 
  onCourseDeleted,
  variant = 'destructive',
  size = 'default'
}: CourseDeletionButtonProps) {
  const { isDeleting, deleteCourse, error } = useCourseDeletion()
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  const handleDelete = async () => {
    const success = await deleteCourse(course.id, course.title)
    
    if (success) {
      setShowConfirmDialog(false)
      onCourseDeleted?.()
    }
  }

  if (showConfirmDialog) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-sm border max-w-md w-full mx-4">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="h-6 w-6 text-red-500" />
            <h3 className="text-lg font-semibold">Delete Course</h3>
          </div>
          
          <p className="text-muted-foreground mb-6">
            Are you sure you want to delete <strong>&quot;{course.title}&quot;</strong>?
          </p>
          
          <div className="bg-red-50 border border-red-200 rounded-sm p-4 mb-6">
            <h4 className="font-medium text-red-800 mb-2">This will permanently delete:</h4>
            <ul className="text-sm text-red-700 space-y-1">
              <li>• All lessons and content</li>
              <li>• All student enrollments</li>
              <li>• All student progress data</li>
              <li>• All uploaded resources</li>
            </ul>
            <p className="text-sm text-red-600 mt-2 font-medium">
              This action cannot be undone.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-sm p-3 mb-4">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <div className="flex gap-3 justify-end">
            <Button
              variant="outline"
              onClick={() => setShowConfirmDialog(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete Course'}
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={() => setShowConfirmDialog(true)}
      disabled={isDeleting}
      className="gap-2"
    >
      <Trash2 className="h-4 w-4" />
      {isDeleting ? 'Deleting...' : 'Delete Course'}
    </Button>
  )
}

// Example usage in a course management component
export function CourseManagementExample() {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: '1',
      title: 'CBSE Mathematics Class 10',
      slug: 'cbse-mathematics-class-10',
      status: 'published'
    },
    {
      id: '2', 
      title: 'IBDP Mathematics AA HL',
      slug: 'ibdp-mathematics-aa-hl',
      status: 'draft'
    }
  ])

  const handleCourseDeleted = (deletedCourseId: string) => {
    setCourses(courses.filter(course => course.id !== deletedCourseId))
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Course Management</h2>
      
      {courses.map(course => (
        <div key={course.id} className="flex items-center justify-between p-4 border rounded-sm">
          <div>
            <h3 className="font-medium">{course.title}</h3>
            <p className="text-sm text-muted-foreground">
              Status: {course.status} • Slug: {course.slug}
            </p>
          </div>
          
          <CourseDeletionButton
            course={course}
            onCourseDeleted={() => handleCourseDeleted(course.id)}
          />
        </div>
      ))}
    </div>
  )
}
