'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  BookOpen, 
  Clock, 
  Calendar, 
  ArrowRight, 
  Play, 
  FileText, 
  Users, 
  Star,
  ChevronDown,
  ChevronRight,
  Lock,
  Unlock
} from 'lucide-react'
import Link from 'next/link'

interface Course {
  id: string
  title: string
  description: string | null
  slug: string | null
  is_free: boolean
  price: number
  status: string
  instructor_id: string
  created_at: string
}

interface Lesson {
  id: string
  title: string
  content: string | null
  lesson_order: number
  slug: string | null
  is_preview: boolean
  course_id: string
}

export default function CoursePage({ params }: { params: { slug: string } }) {
  const { user } = useAuth()
  const [course, setCourse] = useState<Course | null>(null)
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set())
  const supabase = createClient()

  useEffect(() => {
    const loadCourse = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Fetch course by slug
        const { data: courseData, error: courseError } = await supabase
          .from('courses')
          .select('*')
          .eq('slug', params.slug)
          .single()

        if (courseError) {
          throw courseError
        }

        setCourse(courseData)

        // Fetch lessons for this course
        const { data: lessonsData, error: lessonsError } = await supabase
          .from('lessons')
          .select('*')
          .eq('course_id', courseData.id)
          .order('lesson_order')

        if (lessonsError) {
          throw lessonsError
        }

        setLessons(lessonsData || [])

        // Check if user is enrolled
        if (user) {
          const { data: enrollmentData } = await supabase
            .from('enrollments')
            .select('*')
            .eq('student_id', user.id)
            .eq('course_id', courseData.id)
            .eq('is_active', true)
            .single()

          setIsEnrolled(!!enrollmentData)
        }

      } catch (err) {
        console.error('Error loading course:', err)
        setError('Course not found')
      } finally {
        setIsLoading(false)
      }
    }

    if (params.slug) {
      loadCourse()
    }
  }, [params.slug, user, supabase])

  const handleLessonClick = (lesson: Lesson) => {
    if (lesson.is_preview || isEnrolled || course?.is_free) {
      if (lesson.slug) {
        window.location.href = `/courses/${params.slug}/lesson/${lesson.slug}`
      } else {
        console.log('Lesson slug not available:', lesson.title)
      }
    } else {
      alert('Please enroll in the course to access this lesson.')
    }
  }

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev)
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId)
      } else {
        newSet.add(sectionId)
      }
      return newSet
    })
  }

  const handleEnroll = async () => {
    if (!user) {
      alert('Please log in to enroll in this course.')
      return
    }

    try {
      const { error } = await supabase
        .from('enrollments')
        .insert({
          student_id: user.id,
          course_id: course!.id,
          is_active: true,
          enrolled_at: new Date().toISOString()
        })

      if (error) throw error

      setIsEnrolled(true)
      alert('Successfully enrolled! You can now access all lessons.')
    } catch (err) {
      console.error('Error enrolling:', err)
      alert('Failed to enroll. Please try again.')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e27447] mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading course...</p>
        </div>
      </div>
    )
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
          <p className="text-muted-foreground mb-6">{error || 'The course you are looking for does not exist.'}</p>
          <Link href="/courses">
            <Button>Browse Courses</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Course Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-[#1e293b] mb-4">{course.title}</h1>
              <p className="text-xl text-muted-foreground mb-4">
                {course.description || 'No description available'}
              </p>
              <div className="flex items-center space-x-4">
                <Badge variant={course.is_free ? "secondary" : "default"}>
                  {course.is_free ? 'Free' : `$${course.price}`}
                </Badge>
                <Badge variant="outline">
                  {course.status}
                </Badge>
                {isEnrolled && (
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    Enrolled
                  </Badge>
                )}
              </div>
            </div>
            <div className="ml-6">
              {!isEnrolled && !course.is_free ? (
                <Button onClick={handleEnroll} className="bg-[#e27447] hover:bg-[#d1653a]">
                  Enroll Now
                </Button>
              ) : (
                <Link href={`/courses/${params.slug}/lesson/${lessons[0]?.slug || 'introduction'}`}>
                  <Button className="bg-[#e27447] hover:bg-[#d1653a]">
                    <Play className="w-4 h-4 mr-2" />
                    {isEnrolled ? 'Continue Learning' : 'Start Learning'}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Course Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="instructor">Instructor</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      {course.description || 'This course provides comprehensive learning materials and practical exercises.'}
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">What you&apos;ll learn</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Comprehensive course materials</li>
                          <li>• Practical exercises and assignments</li>
                          <li>• Progress tracking and assessments</li>
                          <li>• Expert guidance and support</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Course includes</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• {lessons.length} lessons</li>
                          <li>• Video content and resources</li>
                          <li>• Practice problems</li>
                          <li>• Certificate of completion</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="content" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Content</CardTitle>
                    <CardDescription>
                      {lessons.length} lessons • {course.is_free ? 'Free' : `$${course.price}`}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {lessons.map((lesson, index) => (
                        <div
                          key={lesson.id}
                          className="flex items-center justify-between p-3 rounded-sm border hover:bg-gray-50 cursor-pointer"
                          onClick={() => handleLessonClick(lesson)}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-[#e27447] text-white rounded-sm flex items-center justify-center text-sm font-medium">
                              {index + 1}
                            </div>
                            <div>
                              <h4 className="font-medium">{lesson.title}</h4>
                              <p className="text-sm text-muted-foreground">
                                {lesson.is_preview ? 'Preview available' : 'Full lesson'}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {lesson.is_preview && (
                              <Badge variant="secondary" className="text-xs">
                                Preview
                              </Badge>
                            )}
                            {!lesson.is_preview && !isEnrolled && !course.is_free && (
                              <Lock className="w-4 h-4 text-muted-foreground" />
                            )}
                            <ChevronRight className="w-4 h-4 text-muted-foreground" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="instructor" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Instructor</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-[#e27447] rounded-full flex items-center justify-center">
                        <Users className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Course Instructor</h4>
                        <p className="text-muted-foreground">Expert educator with years of experience</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Course Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Lessons</span>
                  <span className="font-medium">{lessons.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-medium">~{lessons.length * 30} minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Level</span>
                  <span className="font-medium">Beginner</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Language</span>
                  <span className="font-medium">English</span>
                </div>
              </CardContent>
            </Card>

            {/* Progress (if enrolled) */}
            {isEnrolled && (
              <Card>
                <CardHeader>
                  <CardTitle>Your Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">25%</span>
                      </div>
                      <Progress value={25} className="h-2" />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {Math.ceil(lessons.length * 0.25)} of {lessons.length} lessons completed
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
