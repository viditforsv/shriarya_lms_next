'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { createClient } from '@supabase/supabase-js'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components-demo/ui/card'
import { Button } from '@/app/components-demo/ui/button'
import { Badge } from '@/app/components-demo/ui/badge'
import { Input } from '@/app/components-demo/ui/input'
import { 
  Plus, 
  Edit, 
  Eye, 
  BookOpen, 
  Clock, 
  DollarSign,
  Search,
  MoreHorizontal
} from 'lucide-react'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
import Link from 'next/link'
import { getAllCourseTemplates } from '@/lib/course-templates'

interface Course {
  id: string
  title: string
  description: string
  slug: string
  curriculum: string
  subject: string
  grade?: string
  level?: string
  is_free: boolean
  price: number
  status: 'draft' | 'published' | 'archived'
  estimated_duration: string
  lesson_count: number
  created_at: string
  updated_at: string
  lessons?: Record<string, unknown>[]
  assessments?: Record<string, unknown>[]
}

export default function CourseManagement() {
  const { user } = useAuth()
  const [courses, setCourses] = useState<Course[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [curriculumFilter, setCurriculumFilter] = useState<string>('all')

  const fetchCourses = useCallback(async () => {
    try {
      setIsLoading(true)
      
      if (!user) return

      const token = await supabase.auth.getSession()
      if (!token.data.session) return
      
      const response = await fetch('/api/courses/builder', {
        headers: {
          'Authorization': `Bearer ${token.data.session.access_token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const data = await response.json()
        setCourses(data.courses || [])
      } else {
        console.error('Failed to fetch courses')
      }
    } catch (error) {
      console.error('Error fetching courses:', error)
    } finally {
      setIsLoading(false)
    }
  }, [user])

  useEffect(() => {
    fetchCourses()
  }, [fetchCourses])

  const handleCreateFromTemplate = async (templateId: string) => {
    try {
      if (!user) return

      const token = await supabase.auth.getSession()
      if (!token.data.session) return
      
      const response = await fetch('/api/courses/builder', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token.data.session.access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          templateId,
          customizations: {
            // You can add customizations here
          }
        })
      })

      if (response.ok) {
        const data = await response.json()
        console.log('Course created:', data.course)
        // Refresh courses list
        fetchCourses()
        // Redirect to course builder
        window.location.href = `/dashboard/courses/builder?courseId=${data.course.id}`
      } else {
        const error = await response.json()
        console.error('Failed to create course:', error)
      }
    } catch (error) {
      console.error('Error creating course:', error)
    }
  }

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.subject.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || course.status === statusFilter
    const matchesCurriculum = curriculumFilter === 'all' || course.curriculum.toLowerCase() === curriculumFilter.toLowerCase()
    
    return matchesSearch && matchesStatus && matchesCurriculum
  })

  const templates = getAllCourseTemplates()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e27447] mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading courses...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Course Management</h1>
            <p className="text-muted-foreground">Create and manage your courses</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard/courses/template-converter">
              <Button variant="outline">
                <BookOpen className="w-4 h-4 mr-2" />
                From Template
              </Button>
            </Link>
            <Link href="/dashboard/courses/builder">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Course
              </Button>
            </Link>
          </div>
        </div>

        {/* Quick Templates */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Quick Start Templates</CardTitle>
            <CardDescription>
              Start with a standardized template for your curriculum
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {templates.map((template) => (
                <Card key={template.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{template.curriculum}</Badge>
                      <Badge variant="secondary">{template.grade || template.level}</Badge>
                    </div>
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <CardDescription className="text-sm">{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        <span>{template.lessonCount} lessons</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{template.estimatedDuration}</span>
                      </div>
                    </div>
                    <Button 
                      className="w-full" 
                      variant="outline"
                      onClick={() => handleCreateFromTemplate(template.id)}
                    >
                      Use Template
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border rounded-md bg-background"
          >
            <option value="all">All Status</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
          <select
            value={curriculumFilter}
            onChange={(e) => setCurriculumFilter(e.target.value)}
            className="px-3 py-2 border rounded-md bg-background"
          >
            <option value="all">All Curricula</option>
            <option value="CBSE">CBSE</option>
            <option value="ICSE">ICSE</option>
            <option value="IBDP">IBDP</option>
            <option value="IGCSE">IGCSE</option>
          </select>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">{course.curriculum}</Badge>
                  <Badge 
                    variant={
                      course.status === 'published' ? 'default' :
                      course.status === 'draft' ? 'secondary' : 'destructive'
                    }
                  >
                    {course.status}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{course.title}</CardTitle>
                <CardDescription className="line-clamp-2">{course.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      <span>{course.lesson_count} lessons</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{course.estimated_duration}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {course.is_free ? (
                        <Badge variant="secondary">Free</Badge>
                      ) : (
                        <div className="flex items-center gap-1 text-sm font-medium">
                          <DollarSign className="w-4 h-4" />
                          <span>{course.price}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/courses/${course.slug}`}>
                          <Eye className="w-4 h-4" />
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/dashboard/courses/builder?courseId=${course.id}`}>
                          <Edit className="w-4 h-4" />
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No courses found</h3>
              <p className="text-muted-foreground mb-6">
                {courses.length === 0 
                  ? "You haven't created any courses yet. Start with a template above."
                  : "No courses match your current filters."
                }
              </p>
              {courses.length === 0 && (
                <Link href="/dashboard/courses/builder">
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Your First Course
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
