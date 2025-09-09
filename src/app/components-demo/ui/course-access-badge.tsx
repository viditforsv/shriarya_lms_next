'use client'

import { Badge } from '@/app/components-demo/ui/ui-components/badge'
import { Button } from '@/app/components-demo/ui/ui-components/button'
import { Lock, Unlock, Crown, BookOpen } from 'lucide-react'
import { useCourseAccess } from '@/hooks/useCourseAccess'
import Link from 'next/link'

interface CourseAccessBadgeProps {
  courseId: string
  showAction?: boolean
  className?: string
}

export function CourseAccessBadge({ courseId, showAction = true, className = '' }: CourseAccessBadgeProps) {
  const { 
    canAccess, 
    isEnrolled, 
    isFree, 
    needsEnrollment, 
    needsUpgrade, 
    isLoading 
  } = useCourseAccess(courseId)

  if (isLoading) {
    return (
      <Badge variant="secondary" className={className}>
        Loading...
      </Badge>
    )
  }

  if (isFree) {
    return (
      <div className="flex items-center gap-2">
        <Badge variant="default" className={className}>
          <Unlock className="w-3 h-3 mr-1" />
          Free
        </Badge>
        {showAction && (
          <Link href={`/courses/${courseId}`}>
            <Button size="sm" variant="outline">
              <BookOpen className="w-3 h-3 mr-1" />
              Start Learning
            </Button>
          </Link>
        )}
      </div>
    )
  }

  if (canAccess && isEnrolled) {
    return (
      <div className="flex items-center gap-2">
        <Badge variant="default" className={className}>
          <BookOpen className="w-3 h-3 mr-1" />
          Enrolled
        </Badge>
        {showAction && (
          <Link href={`/courses/${courseId}`}>
            <Button size="sm">
              Continue Learning
            </Button>
          </Link>
        )}
      </div>
    )
  }

  if (needsEnrollment) {
    return (
      <div className="flex items-center gap-2">
        <Badge variant="secondary" className={className}>
          <Lock className="w-3 h-3 mr-1" />
          Paid Course
        </Badge>
        {showAction && (
          <Link href={`/courses/${courseId}`}>
            <Button size="sm" variant="outline">
              Enroll Now
            </Button>
          </Link>
        )}
      </div>
    )
  }

  if (needsUpgrade) {
    return (
      <div className="flex items-center gap-2">
        <Badge variant="secondary" className={className}>
          <Lock className="w-3 h-3 mr-1" />
          Sign In Required
        </Badge>
        {showAction && (
          <Link href="/auth">
            <Button size="sm" variant="outline">
              Sign In
            </Button>
          </Link>
        )}
      </div>
    )
  }

  // Admin access
  return (
    <div className="flex items-center gap-2">
      <Badge variant="default" className={className}>
        <Crown className="w-3 h-3 mr-1" />
        Admin Access
      </Badge>
      {showAction && (
        <Link href={`/courses/${courseId}`}>
          <Button size="sm" variant="outline">
            View Course
          </Button>
        </Link>
      )}
    </div>
  )
}

// Simple badge version without actions
export function CourseAccessBadgeSimple({ courseId, className = '' }: { courseId: string; className?: string }) {
  return <CourseAccessBadge courseId={courseId} showAction={false} className={className} />
}
