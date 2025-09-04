'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  BookOpen, 
  Play, 
  FileText, 
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Clock,
  Lock,
  Unlock
} from 'lucide-react'
import Link from 'next/link'

interface Lesson {
  id: string
  title: string
  content: string | null
  lesson_order: number
  slug: string | null
  is_preview: boolean
  course_id: string
}

interface Course {
  id: string
  title: string
  slug: string | null
  is_free: boolean
}

export default function LessonPage({ params }: { params: { slug: string; lessonSlug: string } }) {
  const { user } = useAuth()
  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [course, setCourse] = useState<Course | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [activeTab, setActiveTab] = useState<'video' | 'notes' | 'practice'>('video')
  const supabase = createClient()

  useEffect(() => {
    const loadLesson = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // First, get the course by slug
        const { data: courseData, error: courseError } = await supabase
          .from('courses')
          .select('id, title, slug, is_free')
          .eq('slug', params.slug)
          .single()

        if (courseError) {
          throw courseError
        }

        setCourse(courseData)

        // Then get the lesson by slug
        const { data: lessonData, error: lessonError } = await supabase
          .from('lessons')
          .select('*')
          .eq('slug', params.lessonSlug)
          .eq('course_id', courseData.id)
          .single()

        if (lessonError) {
          throw lessonError
        }

        setLesson(lessonData)

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
        console.error('Error loading lesson:', err)
        setError('Lesson not found')
      } finally {
        setIsLoading(false)
      }
    }

    if (params.slug && params.lessonSlug) {
      loadLesson()
    }
  }, [params.slug, params.lessonSlug, user, supabase])

  const hasAccess = () => {
    return lesson?.is_preview || isEnrolled || course?.is_free
  }

  const getNextLesson = async () => {
    if (!lesson || !course) return

    const { data: nextLesson } = await supabase
      .from('lessons')
      .select('*')
      .eq('course_id', course.id)
      .gt('lesson_order', lesson.lesson_order)
      .order('lesson_order')
      .limit(1)
      .single()

    if (nextLesson) {
      window.location.href = `/courses/${params.slug}/lesson/${nextLesson.slug}`
    }
  }

  const getPreviousLesson = async () => {
    if (!lesson || !course) return

    const { data: prevLesson } = await supabase
      .from('lessons')
      .select('*')
      .eq('course_id', course.id)
      .lt('lesson_order', lesson.lesson_order)
      .order('lesson_order', { ascending: false })
      .limit(1)
      .single()

    if (prevLesson) {
      window.location.href = `/courses/${params.slug}/lesson/${prevLesson.slug}`
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e27447] mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading lesson...</p>
        </div>
      </div>
    )
  }

  if (error || !lesson || !course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Lesson Not Found</h1>
          <p className="text-muted-foreground mb-6">{error || 'The lesson you are looking for does not exist.'}</p>
          <Link href={`/courses/${params.slug}`}>
            <Button>Back to Course</Button>
          </Link>
        </div>
      </div>
    )
  }

  if (!hasAccess()) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Lock className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Lesson Locked</h1>
          <p className="text-muted-foreground mb-6">
            Please enroll in this course to access this lesson.
          </p>
          <Link href={`/courses/${params.slug}`}>
            <Button>Back to Course</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Navigation Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href={`/courses/${params.slug}`}>
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Course
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">{lesson.title}</h1>
              <p className="text-muted-foreground">{course.title}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {lesson.is_preview && (
              <Badge variant="secondary">Preview</Badge>
            )}
            <Badge variant="outline">
              Lesson {lesson.lesson_order}
            </Badge>
          </div>
        </div>

        {/* Lesson Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="video">Video</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
                <TabsTrigger value="practice">Practice</TabsTrigger>
              </TabsList>

              <TabsContent value="video" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Video Lesson</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-gray-100 rounded-sm flex items-center justify-center">
                      <div className="text-center">
                        <Play className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">Video content will be displayed here</p>
                        <p className="text-sm text-muted-foreground mt-2">
                          {lesson.title} - Lesson {lesson.lesson_order}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notes" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Lesson Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none">
                      {lesson.content ? (
                        <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
                      ) : (
                        <div className="space-y-4">
                          <h3>Lesson Content</h3>
                          <p>
                            This is the lesson content for <strong>{lesson.title}</strong>. 
                            Here you'll find comprehensive notes and explanations.
                          </p>
                          <h4>Key Points:</h4>
                          <ul>
                            <li>Important concept 1</li>
                            <li>Important concept 2</li>
                            <li>Important concept 3</li>
                          </ul>
                          <h4>Summary:</h4>
                          <p>
                            This lesson covers the fundamental concepts that will help you 
                            understand the topic better. Make sure to review these notes 
                            before moving to the next lesson.
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="practice" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Practice Problems</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="p-4 border rounded-sm">
                        <h4 className="font-semibold mb-2">Question 1</h4>
                        <p className="text-muted-foreground mb-4">
                          Practice question related to {lesson.title}
                        </p>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <input type="radio" id="q1a" name="q1" />
                            <label htmlFor="q1a">Option A</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="radio" id="q1b" name="q1" />
                            <label htmlFor="q1b">Option B</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="radio" id="q1c" name="q1" />
                            <label htmlFor="q1c">Option C</label>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 border rounded-sm">
                        <h4 className="font-semibold mb-2">Question 2</h4>
                        <p className="text-muted-foreground mb-4">
                          Another practice question to test your understanding
                        </p>
                        <textarea 
                          className="w-full p-2 border rounded-sm" 
                          rows={3}
                          placeholder="Your answer here..."
                        />
                      </div>

                      <Button className="w-full">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Submit Answers
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Lesson Navigation */}
            <Card>
              <CardHeader>
                <CardTitle>Lesson Navigation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start"
                    onClick={getPreviousLesson}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous Lesson
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start"
                    onClick={getNextLesson}
                  >
                    Next Lesson
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Your Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Current Lesson</span>
                    <span className="font-medium">{lesson.lesson_order}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Time Spent</span>
                    <span className="font-medium">~15 min</span>
                  </div>
                  <Button className="w-full">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark as Complete
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
