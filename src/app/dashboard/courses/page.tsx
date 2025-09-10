"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Plus, Edit, Eye, BookOpen } from "lucide-react"
import { Button } from "@/app/components-demo/ui/ui-components/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components-demo/ui/ui-components/card"
import { Badge } from "@/app/components-demo/ui/ui-components/badge"
import { useAuth } from "@/contexts/AuthContext"
import { createClient } from "@/lib/supabase/client"

interface Course {
  id: string
  title: string
  description: string
  status: 'draft' | 'published' | 'archived'
  is_free: boolean
  price: number
  slug: string
  created_at: string
}

export default function CoursesDashboard() {
  const router = useRouter()
  const { user } = useAuth()
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true)
      
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        throw new Error('No active session')
      }

      const response = await fetch('/api/courses/my-courses', {
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch courses')
      }

      const data = await response.json()
      setCourses(data.courses || [])
    } catch (err) {
      console.error('Error fetching courses:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch courses')
    } finally {
      setLoading(false)
    }
  }, [supabase])

  useEffect(() => {
    fetchCourses()
  }, [fetchCourses])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800'
      case 'draft':
        return 'bg-yellow-100 text-yellow-800'
      case 'archived':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Please log in to view your courses</p>
          <Button onClick={() => router.push('/auth')}>
            Sign In
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-[#1e293b] mb-2">
                My Courses
              </h1>
              <p className="text-muted-foreground">
                Manage and edit your courses
              </p>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={() => router.push('/dashboard/courses/manage')}
                className="bg-[#e27447] hover:bg-[#d1653a]"
              >
                <Plus className="w-4 h-4 mr-2" />
                Manage Courses
              </Button>
            </div>
          </div>

          {/* Courses Grid */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#e27447] mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading your courses...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">{error}</p>
              <Button onClick={fetchCourses}>Try Again</Button>
            </div>
          ) : courses.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No courses yet</h3>
              <p className="text-muted-foreground mb-6">
                Create your first course to get started
              </p>
              <Button 
                onClick={() => router.push('/dashboard/courses/builder')}
                className="bg-[#e27447] hover:bg-[#d1653a]"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Course
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="border-[#feefea] hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
                      <Badge className={getStatusColor(course.status)}>
                        {course.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {course.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-muted-foreground">
                        {course.is_free ? 'Free' : `$${course.price}`}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => router.push(`/dashboard/courses/${course.id}/edit`)}
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => router.push(`/courses/${course.slug}`)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
