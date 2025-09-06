'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components-demo/ui/card'
import { Button } from '@/app/components-demo/ui/button'
import { Badge } from '@/app/components-demo/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components-demo/ui/tabs'
import { 
  BookOpen, 
  Play, 
  FileText, 
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Clock,
  Lock,
  Unlock,
  Download
} from 'lucide-react'
import Link from 'next/link'
import { 
  getCourseBySlug, 
  getLessonBySlug, 
  getLessonsByCourseSlug,
  CourseConfig, 
  LessonConfig 
} from '@/lib/course-config'

export default function LessonPage({ params }: { params: Promise<{ slug: string; lessonSlug: string }> }) {
  const { user } = useAuth()
  const [lesson, setLesson] = useState<LessonConfig | null>(null)
  const [course, setCourse] = useState<CourseConfig | null>(null)
  const [allLessons, setAllLessons] = useState<LessonConfig[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [activeTab, setActiveTab] = useState<'video' | 'notes' | 'practice'>('video')
  const [resolvedParams, setResolvedParams] = useState<{ slug: string; lessonSlug: string } | null>(null)

  // Resolve params
  useEffect(() => {
    params.then(setResolvedParams)
  }, [params])

  useEffect(() => {
    if (!resolvedParams) return

    const loadLesson = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Get course from configuration
        const courseData = getCourseBySlug(resolvedParams.slug)
        if (!courseData) {
          throw new Error('Course not found')
        }

        setCourse(courseData)

        // Get lesson from configuration
        const lessonData = getLessonBySlug(resolvedParams.slug, resolvedParams.lessonSlug)
        if (!lessonData) {
          throw new Error('Lesson not found')
        }

        setLesson(lessonData)

        // Get all lessons for navigation
        const lessonsData = getLessonsByCourseSlug(resolvedParams.slug)
        setAllLessons(lessonsData)

        // For now, simulate enrollment status
        setIsEnrolled(false)

      } catch (err) {
        console.error('Error loading lesson:', err)
        setError('Lesson not found')
      } finally {
        setIsLoading(false)
      }
    }

    loadLesson()
  }, [resolvedParams])

  const hasAccess = () => {
    return lesson?.isPreview || isEnrolled || course?.isFree
  }

  const getNextLesson = () => {
    if (!lesson || !allLessons.length) return

    const currentIndex = allLessons.findIndex(l => l.slug === lesson.slug)
    const nextLesson = allLessons[currentIndex + 1]

    if (nextLesson) {
      window.location.href = `/courses/${resolvedParams?.slug}/lesson/${nextLesson.slug}`
    }
  }

  const getPreviousLesson = () => {
    if (!lesson || !allLessons.length) return

    const currentIndex = allLessons.findIndex(l => l.slug === lesson.slug)
    const prevLesson = allLessons[currentIndex - 1]

    if (prevLesson) {
      window.location.href = `/courses/${resolvedParams?.slug}/lesson/${prevLesson.slug}`
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
          <Link href={`/courses/${resolvedParams?.slug}`}>
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
          <Link href={`/courses/${resolvedParams?.slug}`}>
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
            <Link href={`/courses/${resolvedParams?.slug}`}>
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
            {lesson.isPreview && (
              <Badge variant="secondary">Preview</Badge>
            )}
            <Badge variant="outline">
              Lesson {lesson.order}
            </Badge>
            <Badge variant="outline">
              {lesson.duration}
            </Badge>
          </div>
        </div>

        {/* Lesson Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "video" | "practice" | "notes")} className="w-full">
              <TabsList className="grid w-full grid-cols-3 rounded-sm bg-[#feefea] p-1">
                <TabsTrigger 
                  value="video" 
                  className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white data-[state=active]:shadow-sm font-medium transition-all duration-200"
                >
                  Video
                </TabsTrigger>
                <TabsTrigger 
                  value="notes" 
                  className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white data-[state=active]:shadow-sm font-medium transition-all duration-200"
                >
                  Notes
                </TabsTrigger>
                <TabsTrigger 
                  value="practice" 
                  className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white data-[state=active]:shadow-sm font-medium transition-all duration-200"
                >
                  Practice
                </TabsTrigger>
              </TabsList>

              <TabsContent value="video" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Video Lesson</CardTitle>
                    <CardDescription>{lesson.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-gray-100 rounded-sm flex items-center justify-center mb-4">
                      <div className="text-center">
                        <Play className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">Video content will be displayed here</p>
                        <p className="text-sm text-muted-foreground mt-2">
                          {lesson.title} - {lesson.duration}
                        </p>
                      </div>
                    </div>
                    
                    {/* Resources */}
                    {lesson.resources && lesson.resources.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-semibold">Resources:</h4>
                        {lesson.resources.map((resource) => (
                          <div key={resource.id} className="flex items-center justify-between p-2 border rounded-sm">
                            <div className="flex items-center space-x-2">
                              <FileText className="w-4 h-4" />
                              <span className="text-sm">{resource.title}</span>
                            </div>
                            <Button size="sm" variant="outline">
                              <Download className="w-4 h-4 mr-1" />
                              Download
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
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
                      <div className="space-y-4">
                        <h3>{lesson.title}</h3>
                        <p className="text-muted-foreground">{lesson.description}</p>
                        
                        <h4>Key Concepts:</h4>
                        <ul className="space-y-2">
                          <li>• Important concept 1</li>
                          <li>• Important concept 2</li>
                          <li>• Important concept 3</li>
                        </ul>
                        
                        <h4>Summary:</h4>
                        <p>
                          This lesson covers the fundamental concepts that will help you 
                          understand the topic better. Make sure to review these notes 
                          before moving to the next lesson.
                        </p>
                        
                        <div className="bg-blue-50 p-4 rounded-sm">
                          <h4 className="font-semibold text-blue-900 mb-2">💡 Pro Tip</h4>
                          <p className="text-blue-800 text-sm">
                            Take notes as you watch the video and practice the problems to reinforce your learning.
                          </p>
                        </div>
                      </div>
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
                    <span className="font-medium">{lesson.order}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-medium">{lesson.duration}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Type</span>
                    <span className="font-medium capitalize">{lesson.type}</span>
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
