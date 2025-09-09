'use client'

import { useState, useEffect, useMemo } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components-demo/ui/card'
import { Button } from '@/app/components-demo/ui/button'
import { Badge } from '@/app/components-demo/ui/badge'
import { Progress } from '@/app/components-demo/ui/progress'
import { BookOpen, Clock, Calendar, ArrowRight, Play } from 'lucide-react'
import Link from 'next/link'

interface EnrolledCourse {
  id: string
  title: string
  description: string | null
  slug: string | null
  is_free: boolean
  created_at: string
  enrollment: {
    id: string
    enrolled_at: string
    is_active: boolean
  }
}

export default function EnrolledCoursesPage() {
  const { user } = useAuth()
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Memoize the supabase client to prevent recreation on every render
  const supabase = useMemo(() => createClient(), [])

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      if (!user?.id) {
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        setError(null)

        const { data, error } = await supabase
          .from('enrollments')
          .select(`
            *,
            courses (*)
          `)
          .eq('student_id', user.id)
          .eq('is_active', true)
          .order('enrolled_at', { ascending: false })

        if (error) {
          throw error
        }

        // Transform the data to match our interface
        const courses = data?.map(item => ({
          ...item.courses,
          enrollment: {
            id: item.id,
            enrolled_at: item.enrolled_at,
            is_active: item.is_active
          }
        })) || []

        setEnrolledCourses(courses)
      } catch (err) {
        console.error('Error fetching enrolled courses:', err)
        setError('Failed to load enrolled courses')
      } finally {
        setIsLoading(false)
      }
    }

    fetchEnrolledCourses()
  }, [user?.id, supabase])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please log in to view your courses</h1>
          <Link href="/auth">
            <Button>Sign In</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Enrolled Courses</h1>
        <p className="text-muted-foreground">
          Continue learning from where you left off
        </p>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e27447] mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your courses...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="text-center py-12">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      )}

      {!isLoading && !error && enrolledCourses.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold mb-2">No courses enrolled yet</h2>
          <p className="text-muted-foreground mb-6">
            Start your learning journey by enrolling in a course
          </p>
          <Link href="/courses">
            <Button>
              Browse Courses
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      )}

      {!isLoading && !error && enrolledCourses.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {enrolledCourses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{course.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {course.description || 'No description available'}
                    </CardDescription>
                  </div>
                  <Badge variant={course.is_free ? "secondary" : "default"}>
                    {course.is_free ? 'Free' : 'Paid'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Progress Section */}
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">25%</span>
                    </div>
                    <Progress value={25} className="h-2" />
                  </div>

                  {/* Course Stats */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>4 lessons</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Enrolled {formatDate(course.enrollment.enrolled_at)}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <Link href={`/courses/${course.slug || course.id}`} className="flex-1">
                      <Button className="w-full" size="sm">
                        <Play className="w-4 h-4 mr-2" />
                        Continue Learning
                      </Button>
                    </Link>
                    <Link href={`/courses/${course.slug || course.id}`}>
                      <Button variant="outline" size="sm">
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
