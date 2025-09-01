'use client'

import { useCourseAccess } from '@/hooks/useCourseAccess'
import { CourseAccessBadge } from '@/components/ui/course-access-badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Lock, Unlock, BookOpen } from 'lucide-react'
import { RoleGuard } from '@/components/auth/RoleGuard'

export default function ExampleCoursePage() {
  // Example course ID - replace with actual course ID
  const courseId = 'cbse-math-10'
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
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded-sm mb-4 w-1/3"></div>
          <div className="h-4 bg-muted rounded-sm mb-8 w-1/2"></div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="h-64 bg-muted rounded-sm"></div>
            <div className="h-64 bg-muted rounded-sm"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Course Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">CBSE Mathematics Class 10</h1>
          <CourseAccessBadge courseId={courseId} />
        </div>
        <p className="text-muted-foreground">
          Master the fundamentals of mathematics for CBSE Class 10 board exams
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Course Content */}
        <Card>
          <CardHeader>
            <CardTitle>Course Content</CardTitle>
            <CardDescription>What you'll learn in this course</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <BookOpen className="w-4 h-4 text-green-600" />
                <span>Real Numbers</span>
                {canAccess ? (
                  <Unlock className="w-4 h-4 text-green-600 ml-auto" />
                ) : (
                  <Lock className="w-4 h-4 text-gray-400 ml-auto" />
                )}
              </div>
              <div className="flex items-center gap-3">
                <BookOpen className="w-4 h-4 text-green-600" />
                <span>Polynomials</span>
                {canAccess ? (
                  <Unlock className="w-4 h-4 text-green-600 ml-auto" />
                ) : (
                  <Lock className="w-4 h-4 text-gray-400 ml-auto" />
                )}
              </div>
              <div className="flex items-center gap-3">
                <BookOpen className="w-4 h-4 text-green-600" />
                <span>Linear Equations</span>
                {canAccess ? (
                  <Unlock className="w-4 h-4 text-green-600 ml-auto" />
                ) : (
                  <Lock className="w-4 h-4 text-gray-400 ml-auto" />
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Access Control Demo */}
        <Card>
          <CardHeader>
            <CardTitle>Access Status</CardTitle>
            <CardDescription>Current access information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Course Type:</span>
                <span className="font-medium">{isFree ? 'Free' : 'Paid'}</span>
              </div>
              <div className="flex justify-between">
                <span>Enrollment Status:</span>
                <span className="font-medium">{isEnrolled ? 'Enrolled' : 'Not Enrolled'}</span>
              </div>
              <div className="flex justify-between">
                <span>Can Access:</span>
                <span className="font-medium">{canAccess ? 'Yes' : 'No'}</span>
              </div>
              
              {/* Action Buttons */}
              <div className="pt-4 space-y-2">
                {needsUpgrade && (
                  <Button className="w-full" asChild>
                    <a href="/auth">Sign In to Access</a>
                  </Button>
                )}
                
                {needsEnrollment && (
                  <Button className="w-full">
                    Enroll in Course
                  </Button>
                )}
                
                {canAccess && (
                  <Button className="w-full">
                    Start Learning
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Role-based content */}
      <div className="mt-8">
        <RoleGuard allowedRoles={['admin']}>
          <Card>
            <CardHeader>
              <CardTitle>Admin Controls</CardTitle>
              <CardDescription>Course management options</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button variant="outline">Edit Course</Button>
                <Button variant="outline">View Analytics</Button>
                <Button variant="outline">Manage Students</Button>
              </div>
            </CardContent>
          </Card>
        </RoleGuard>

        <RoleGuard allowedRoles={['student']}>
          <Card>
            <CardHeader>
              <CardTitle>Student Progress</CardTitle>
              <CardDescription>Track your learning journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Progress:</span>
                  <span>0%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </RoleGuard>
      </div>
    </div>
  )
}
