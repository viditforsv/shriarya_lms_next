'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components-demo/ui/card'
import { Button } from '@/app/components-demo/ui/button'
import { Badge } from '@/app/components-demo/ui/badge'
import { Progress } from '@/app/components-demo/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components-demo/ui/tabs'
import { 
  Play, 
  Users, 
  ChevronRight, 
  Lock
} from 'lucide-react'
import Link from 'next/link'
import { 
  getCourseBySlug, 
  getLessonsByCourseSlug, 
  CourseConfig, 
  LessonConfig 
} from '@/lib/course-config'

export default function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { user } = useAuth()
  const [course, setCourse] = useState<CourseConfig | null>(null)
  const [lessons, setLessons] = useState<LessonConfig[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [resolvedParams, setResolvedParams] = useState<{ slug: string } | null>(null)

  // Resolve params
  useEffect(() => {
    params.then(setResolvedParams)
  }, [params])

  useEffect(() => {
    if (!resolvedParams) return

    const loadCourse = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Fetch course from configuration
        const courseData = getCourseBySlug(resolvedParams.slug)
        if (!courseData) {
          throw new Error('Course not found')
        }

        setCourse(courseData)

        // Fetch lessons for this course
        const lessonsData = getLessonsByCourseSlug(resolvedParams.slug)
        setLessons(lessonsData)

        // For free courses, user is automatically "enrolled"
        // For paid courses, this would check actual enrollment status
        setIsEnrolled(courseData.isFree || false)

      } catch (err) {
        console.error('Error loading course:', err)
        setError('Course not found')
      } finally {
        setIsLoading(false)
      }
    }

    loadCourse()
  }, [resolvedParams])

  const handleLessonClick = (lesson: LessonConfig) => {
    if (lesson.isPreview || isEnrolled || course?.isFree) {
      if (lesson.slug) {
        window.location.href = `/courses/${resolvedParams?.slug}/lesson/${lesson.slug}`
      } else {
        console.log('Lesson slug not available:', lesson.title)
      }
    } else {
      alert('Please enroll in the course to access this lesson.')
    }
  }


  const handleEnroll = async () => {
    if (!user) {
      alert('Please log in to enroll in this course.')
      return
    }

    try {
      // For now, simulate enrollment
      // In a real app, this would call the enrollment API
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
                <Badge variant={course.isFree ? "secondary" : "default"}>
                  {course.isFree ? 'Free' : `$${course.price || 0}`}
                </Badge>
                <Badge variant="outline">
                  {course.curriculum}
                </Badge>
                <Badge variant="outline">
                  {course.grade || course.level}
                </Badge>
                {isEnrolled && (
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    Enrolled
                  </Badge>
                )}
              </div>
            </div>
            <div className="ml-6">
              {!isEnrolled && !course.isFree ? (
                <Button onClick={handleEnroll} className="bg-[#e27447] hover:bg-[#d1653a]">
                  Enroll Now
                </Button>
              ) : (
                <Link href={`/courses/${resolvedParams?.slug}/lesson/${lessons[0]?.slug || 'introduction'}`}>
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
              <TabsList className="grid w-full grid-cols-3 rounded-sm bg-[#feefea] p-1">
                <TabsTrigger 
                  value="overview" 
                  className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white data-[state=active]:shadow-sm font-medium transition-all duration-200"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger 
                  value="content" 
                  className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white data-[state=active]:shadow-sm font-medium transition-all duration-200"
                >
                  Content
                </TabsTrigger>
                <TabsTrigger 
                  value="instructor" 
                  className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white data-[state=active]:shadow-sm font-medium transition-all duration-200"
                >
                  Instructor
                </TabsTrigger>
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
                          {course.learningOutcomes.map((outcome, index) => (
                            <li key={index}>• {outcome}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Course includes</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• {course.lessons} lessons</li>
                          <li>• {course.duration} of content</li>
                          <li>• Practice problems and assessments</li>
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
                      {course.lessons} lessons • {course.isFree ? 'Free' : `$${course.price || 0}`}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Chapter 1: Real Numbers */}
                      <div>
                        <h3 className="text-lg font-semibold mb-3 text-[#1e293b]">Chapter 1: Real Numbers</h3>
                        <div className="space-y-2">
                          {lessons.filter(lesson => 
                            lesson.id.includes('real-numbers') || 
                            lesson.id.includes('euclid') || 
                            lesson.id.includes('fundamental-theorem')
                          ).map((lesson, index) => (
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
                                    {lesson.duration} • {lesson.type}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                {lesson.isPreview && (
                                  <Badge variant="secondary" className="text-xs">
                                    Preview
                                  </Badge>
                                )}
                                {!lesson.isPreview && !isEnrolled && !course.isFree && (
                                  <Lock className="w-4 h-4 text-muted-foreground" />
                                )}
                                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Chapter 2: Polynomials */}
                      <div>
                        <h3 className="text-lg font-semibold mb-3 text-[#1e293b]">Chapter 2: Polynomials</h3>
                        <div className="space-y-2">
                          {lessons.filter(lesson => lesson.id.includes('polynomial')).map((lesson, index) => (
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
                                    {lesson.duration} • {lesson.type}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                {lesson.isPreview && (
                                  <Badge variant="secondary" className="text-xs">
                                    Preview
                                  </Badge>
                                )}
                                {!lesson.isPreview && !isEnrolled && !course.isFree && (
                                  <Lock className="w-4 h-4 text-muted-foreground" />
                                )}
                                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Chapter 3: Pair of Linear Equations */}
                      <div>
                        <h3 className="text-lg font-semibold mb-3 text-[#1e293b]">Chapter 3: Pair of Linear Equations in Two Variables</h3>
                        <div className="space-y-2">
                          {lessons.filter(lesson => lesson.id.includes('linear')).map((lesson, index) => (
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
                                    {lesson.duration} • {lesson.type}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                {lesson.isPreview && (
                                  <Badge variant="secondary" className="text-xs">
                                    Preview
                                  </Badge>
                                )}
                                {!lesson.isPreview && !isEnrolled && !course.isFree && (
                                  <Lock className="w-4 h-4 text-muted-foreground" />
                                )}
                                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Chapter 4: Quadratic Equations */}
                      <div>
                        <h3 className="text-lg font-semibold mb-3 text-[#1e293b]">Chapter 4: Quadratic Equations</h3>
                        <div className="space-y-2">
                          {lessons.filter(lesson => lesson.id.includes('quadratic')).map((lesson, index) => (
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
                                    {lesson.duration} • {lesson.type}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                {lesson.isPreview && (
                                  <Badge variant="secondary" className="text-xs">
                                    Preview
                                  </Badge>
                                )}
                                {!lesson.isPreview && !isEnrolled && !course.isFree && (
                                  <Lock className="w-4 h-4 text-muted-foreground" />
                                )}
                                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Chapter 5: Arithmetic Progressions */}
                      <div>
                        <h3 className="text-lg font-semibold mb-3 text-[#1e293b]">Chapter 5: Arithmetic Progressions</h3>
                        <div className="space-y-2">
                          {lessons.filter(lesson => lesson.id.includes('ap-')).map((lesson, index) => (
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
                                    {lesson.duration} • {lesson.type}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                {lesson.isPreview && (
                                  <Badge variant="secondary" className="text-xs">
                                    Preview
                                  </Badge>
                                )}
                                {!lesson.isPreview && !isEnrolled && !course.isFree && (
                                  <Lock className="w-4 h-4 text-muted-foreground" />
                                )}
                                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Show more chapters button */}
                      <div className="text-center pt-4">
                        <Button variant="outline" className="text-[#e27447] border-[#e27447] hover:bg-[#e27447] hover:text-white">
                          View All Chapters ({Math.ceil(lessons.length / 5)} chapters)
                        </Button>
                      </div>
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
                        <h4 className="font-semibold">{course.instructor}</h4>
                        <p className="text-muted-foreground">Expert educator with years of experience in {course.curriculum} curriculum</p>
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
                  <span className="font-medium">{course.lessons}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-medium">{course.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Level</span>
                  <span className="font-medium">{course.grade || course.level}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Curriculum</span>
                  <span className="font-medium">{course.curriculum}</span>
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
                      {Math.ceil(course.lessons * 0.25)} of {course.lessons} lessons completed
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
