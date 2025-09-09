'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
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
  Bookmark,
  MessageCircle,
  Eye
} from 'lucide-react'
import { VideoResource } from '@/app/components-demo/ui/youtube-video'
import { CompletionDot } from '@/app/components-demo/ui/template-status'
import { CollapsibleSidebar } from '@/app/components-demo/ui/collapsible-sidebar'
import { useAuth } from '@/contexts/AuthContext'
import { 
  getCourseBySlug, 
  getLessonsByCourseSlug, 
  CourseConfig, 
  LessonConfig,
  ResourceConfig
} from '@/lib/course-config'

interface Course {
  id: string
  title: string
  description: string
  slug: string
  is_free: boolean
  created_at: string
  profiles?: {
    first_name: string
    last_name: string
  }
}

interface Resource {
  id: string
  url: string
  kind: string
  mime: string
  duration_sec: number
}

interface Lesson {
  id: string
  title: string
  slug: string
  content: string
  lesson_order: number
  is_preview: boolean
  created_at: string
  course_id: string
  resources: Resource[]
}

interface UserProgress {
  id: string
  completion_percentage: number
  time_spent_minutes: number
  last_accessed_at: string
  completed_at: string | null
  is_completed: boolean
}

export default function DynamicLessonPage({ params }: { params: Promise<{ slug: string; lessonSlug: string }> }) {
  const { user } = useAuth()
  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [course, setCourse] = useState<Course | null>(null)
  const [allLessons, setAllLessons] = useState<Lesson[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [activeTab, setActiveTab] = useState<'video' | 'notes' | 'practice'>('video')
  const [resolvedParams, setResolvedParams] = useState<{ slug: string; lessonSlug: string } | null>(null)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null)
  const [practiceAnswers, setPracticeAnswers] = useState<Record<string, string>>({})

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

        // Get course from configuration (same as course page)
        const courseInfo = getCourseBySlug(resolvedParams.slug)
        
        if (!courseInfo) {
          throw new Error('Course not found')
        }

        // Convert CourseConfig to Course interface
        const courseData: Course = {
          id: courseInfo.slug, // Use slug as ID for static courses
          title: courseInfo.title,
          description: courseInfo.description,
          slug: courseInfo.slug,
          is_free: courseInfo.isFree,
          created_at: new Date().toISOString(), // Use current date for static courses
          profiles: {
            first_name: 'System',
            last_name: 'Admin'
          }
        }

        setCourse(courseData)

        // Get lessons from configuration and convert to Lesson interface
        const lessonsData = getLessonsByCourseSlug(resolvedParams.slug)
        const mappedLessons: Lesson[] = lessonsData.map((lesson: LessonConfig, index: number) => ({
          id: lesson.slug, // Use slug as ID for static lessons
          title: lesson.title,
          slug: lesson.slug,
          content: lesson.description || '', // Use description as content
          lesson_order: lesson.order || index + 1, // Use order from config or index
          is_preview: lesson.isPreview || false,
          created_at: new Date().toISOString(), // Use current date for static lessons
          course_id: courseData.id,
          resources: (lesson.resources || []).map((resource: ResourceConfig) => ({
            id: resource.url, // Use URL as ID for static resources
            url: resource.url,
            kind: resource.type || 'file', // Default to 'file' type
            mime: 'application/octet-stream', // Default MIME type
            duration_sec: 0 // Default duration for static resources
          }))
        }))
        setAllLessons(mappedLessons)

        // Find the specific lesson and map it to Lesson interface
        const lessonInfo = lessonsData.find((l: LessonConfig) => l.slug === resolvedParams.lessonSlug)
        if (!lessonInfo) {
          throw new Error('Lesson not found')
        }

        // Map LessonConfig to Lesson interface
        const mappedLesson: Lesson = {
          id: lessonInfo.slug,
          title: lessonInfo.title,
          slug: lessonInfo.slug,
          content: lessonInfo.description || '',
          lesson_order: lessonInfo.order || 1,
          is_preview: lessonInfo.isPreview || false,
          created_at: new Date().toISOString(),
          course_id: courseData.id,
          resources: (lessonInfo.resources || []).map((resource: ResourceConfig) => ({
            id: resource.url,
            url: resource.url,
            kind: resource.type || 'file',
            mime: 'application/octet-stream',
            duration_sec: 0
          }))
        }

        setLesson(mappedLesson)

        // Check enrollment - for free courses, user is automatically enrolled
        setIsEnrolled(courseInfo.isFree || false)

        // Get user progress for this lesson
        const progressResponse = await fetch(`/api/user-progress?lessonId=${lessonInfo.id}`)
        const progressData = await progressResponse.json()
        if (progressData.progress && progressData.progress.length > 0) {
          setUserProgress(progressData.progress[0])
        }

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
    return lesson?.is_preview || isEnrolled || course?.is_free
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

  const handleMarkComplete = async () => {
    if (!lesson || !user) return

    try {
      const response = await fetch('/api/user-progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lesson_id: lesson.id,
          course_id: lesson.course_id,
          completion_percentage: 100,
          is_completed: true
        })
      })

      if (response.ok) {
        const data = await response.json()
        setUserProgress(data.progress)
        alert('🎉 Lesson marked as complete!')
      }
    } catch (error) {
      console.error('Error marking lesson complete:', error)
    }
  }

  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked)
    alert(isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks')
  }

  const handlePracticeAnswerChange = (questionId: string, answer: string) => {
    setPracticeAnswers(prev => ({ ...prev, [questionId]: answer }))
  }

  const handleSubmitPractice = () => {
    const answeredQuestions = Object.keys(practiceAnswers).length
    alert(`📝 Submitted ${answeredQuestions} practice answers!`)
  }

  // Removed unused calculateProgress function

  // Mock practice questions
  const practiceQuestions = [
    {
      id: '1',
      question: "What is the main topic covered in this lesson?",
      type: "multiple_choice",
      options: ["Algebra", "Geometry", "Trigonometry", "Statistics"],
      correct: 0
    },
    {
      id: '2',
      question: "Explain the key concept you learned in this lesson.",
      type: "text",
      placeholder: "Type your explanation here..."
    },
    {
      id: '3',
      question: "What was the most challenging part of this lesson?",
      type: "text",
      placeholder: "Describe the challenging aspects..."
    }
  ]

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
      {/* Header with completion indicator */}
      <div className="bg-gradient-to-br from-[#feefea] to-[#fffefd] border-b border-[#e27447] py-6 relative">
        <CompletionDot isCompleted={userProgress?.is_completed || false} />
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                href={`/courses/${resolvedParams?.slug}`}
                className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Course
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleBookmarkToggle}
                className="rounded-sm"
              >
                <Bookmark className={`w-4 h-4 mr-2 ${isBookmarked ? 'fill-current' : ''}`} />
                {isBookmarked ? 'Bookmarked' : 'Bookmark'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Course Breadcrumb */}
        <div className="mb-6">
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link href="/courses" className="hover:text-foreground">Courses</Link>
            <span>/</span>
            <Link href={`/courses/${resolvedParams?.slug}`} className="hover:text-foreground">{course.title}</Link>
            <span>/</span>
            <span className="text-foreground">{lesson.title}</span>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Enhanced Collapsible Sidebar */}
          <CollapsibleSidebar 
            currentLessonSlug={lesson.slug}
            courseSlug={resolvedParams?.slug || ''}
          />

          {/* Main Content */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            {/* Lesson Header */}
            <div className="bg-white rounded-sm border border-[#feefea] p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <Badge className="bg-[#e27447] text-white mb-2 rounded-sm">
                    Lesson {lesson.lesson_order}
                  </Badge>
                  <h1 className="text-3xl font-bold text-[#1e293b] mb-2">
                    {lesson.title}
                  </h1>
                  <p className="text-muted-foreground text-lg">
                    Learn important concepts and practice problems
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">30 min</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {lesson.is_preview ? (
                      <>
                        <Eye className="w-4 h-4 text-blue-600" />
                        <span className="text-sm text-blue-600">Preview</span>
                      </>
                    ) : (
                      <>
                        <Unlock className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-green-600">Unlocked</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Content Tabs */}
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "video" | "practice" | "notes")} className="w-full">
              <TabsList className="grid w-full grid-cols-3 rounded-sm bg-[#feefea] p-1">
                <TabsTrigger 
                  value="video" 
                  className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white data-[state=active]:shadow-sm font-medium transition-all duration-200"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Video
                </TabsTrigger>
                <TabsTrigger 
                  value="notes" 
                  className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white data-[state=active]:shadow-sm font-medium transition-all duration-200"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Notes
                </TabsTrigger>
                <TabsTrigger 
                  value="practice" 
                  className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white data-[state=active]:shadow-sm font-medium transition-all duration-200"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Practice
                </TabsTrigger>
              </TabsList>

              {/* Video Tab */}
              <TabsContent value="video" className="mt-6">
                <Card className="rounded-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Play className="w-5 h-5 text-[#e27447]" />
                      <span>Video Lesson</span>
                    </CardTitle>
                    <CardDescription>
                      Watch the complete lesson video with explanations and examples
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Main Video */}
                    {lesson.resources && lesson.resources.length > 0 ? (
                      <div className="mb-6">
                        {lesson.resources
                          .filter(resource => resource.kind === 'video')
                          .map((resource) => (
                            <VideoResource 
                              key={resource.id} 
                              resource={{
                                id: resource.id,
                                type: resource.kind,
                                url: resource.url,
                                title: lesson.title,
                                description: '',
                                duration: resource.duration_sec,
                                isYouTube: resource.url.includes('youtube.com') || resource.url.includes('youtu.be')
                              }} 
                              className="mb-4"
                            />
                          ))}
                      </div>
                    ) : (
                      <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-sm flex items-center justify-center relative overflow-hidden">
                        <div className="text-center">
                          <div className="w-20 h-20 bg-[#e27447] rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-[#e27447]/90 transition-colors cursor-pointer">
                            <Play className="w-8 h-8 text-white ml-1" />
                          </div>
                          <h3 className="text-lg font-semibold text-[#1e293b] mb-2">
                            {lesson.title}
                          </h3>
                          <p className="text-muted-foreground mb-4">
                            Video content will be available soon
                          </p>
                          <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                            <span className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>30 min</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <FileText className="w-4 h-4" />
                              <span>HD Quality</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Video Controls */}
                    <div className="mt-4 flex items-center justify-end">
                      <Button 
                        className="bg-[#e27447] hover:bg-[#e27447]/90 rounded-sm"
                        onClick={handleMarkComplete}
                        disabled={userProgress?.is_completed}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        {userProgress?.is_completed ? 'Completed' : 'Mark as Complete'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Notes Tab */}
              <TabsContent value="notes" className="mt-6">
                <Card className="rounded-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="w-5 h-5 text-[#e27447]" />
                      <span>Lesson Notes</span>
                    </CardTitle>
                    <CardDescription>
                      Comprehensive notes and key concepts from this lesson
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Lesson Content */}
                    {lesson.content && (
                      <div className="prose prose-sm max-w-none">
                        <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
                      </div>
                    )}

                    {/* Additional Resources */}
                    {lesson.resources && lesson.resources.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-[#1e293b] mb-3">Additional Resources</h3>
                        <div className="space-y-2">
                          {lesson.resources
                            .filter(resource => resource.kind !== 'video')
                            .map((resource) => (
                              <Button key={resource.id} variant="outline" className="w-full justify-start rounded-sm">
                                <FileText className="w-4 h-4 mr-2" />
                                {resource.kind.toUpperCase()}
                              </Button>
                            ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Practice Tab */}
              <TabsContent value="practice" className="mt-6">
                <Card className="rounded-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BookOpen className="w-5 h-5 text-[#e27447]" />
                      <span>Practice Exercises</span>
                    </CardTitle>
                    <CardDescription>
                      Test your understanding with these practice questions
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {practiceQuestions.map((question, index) => (
                      <div key={question.id} className="border border-[#feefea] rounded-sm p-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-[#e27447] text-white rounded-sm flex items-center justify-center text-sm font-medium flex-shrink-0">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-[#1e293b] mb-3">
                              {question.question}
                            </h4>
                            
                            {question.type === 'multiple_choice' ? (
                              <div className="space-y-2">
                                {question.options?.map((option, optionIndex) => (
                                  <label key={optionIndex} className="flex items-center space-x-2 cursor-pointer">
                                    <input 
                                      type="radio" 
                                      name={`question-${question.id}`}
                                      className="text-[#e27447] focus:ring-[#e27447]"
                                      onChange={() => handlePracticeAnswerChange(question.id, option)}
                                    />
                                    <span className="text-muted-foreground">{option}</span>
                                  </label>
                                ))}
                              </div>
                            ) : (
                              <textarea
                                placeholder={question.placeholder}
                                className="w-full p-3 border border-[#feefea] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#e27447] focus:border-[#e27447] resize-none"
                                rows={4}
                                onChange={(e) => handlePracticeAnswerChange(question.id, e.target.value)}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="flex items-center justify-between pt-4 border-t border-[#feefea]">
                      <Button variant="outline" className="rounded-sm">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Ask a Question
                      </Button>
                      <Button 
                        className="bg-[#e27447] hover:bg-[#e27447]/90 rounded-sm"
                        onClick={handleSubmitPractice}
                      >
                        Submit Answers
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <Button 
                variant="outline" 
                className="rounded-sm"
                onClick={getPreviousLesson}
                disabled={!allLessons.find(l => l.lesson_order === lesson.lesson_order - 1)}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous Lesson
              </Button>
              <Button 
                className="bg-[#e27447] hover:bg-[#e27447]/90 rounded-sm"
                onClick={getNextLesson}
                disabled={!allLessons.find(l => l.lesson_order === lesson.lesson_order + 1)}
              >
                Next Lesson
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}