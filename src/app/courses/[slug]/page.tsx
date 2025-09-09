'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components-demo/ui/ui-components/card'
import { Button } from '@/app/components-demo/ui/ui-components/button'
import { Badge } from '@/app/components-demo/ui/ui-components/badge'
import { Progress } from '@/app/components-demo/ui/ui-components/progress'
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

  const handleChapterClick = (chapterSlug: string) => {
    // Map chapter slugs to their first lesson
    const chapterToLessonMap: Record<string, string> = {
      'number-systems': 'real-numbers-intro',
      'algebra': 'polynomials-intro', 
      'coordinate-geometry': 'coordinate-intro',
      'geometry': 'triangles-intro',
      'trigonometry': 'trigonometry-intro',
      'mensuration': 'circle-areas-intro',
      'statistics-probability': 'statistics-intro'
    }
    
    const firstLessonSlug = chapterToLessonMap[chapterSlug]
    
    if (firstLessonSlug) {
      // Find the lesson by slug
      const firstLesson = lessons.find(lesson => lesson.slug === firstLessonSlug)
      
      if (firstLesson && firstLesson.slug) {
        window.location.href = `/courses/${resolvedParams?.slug}/lesson/${firstLesson.slug}`
        return
      }
    }
    
    // Fallback: redirect to first available lesson
    if (lessons.length > 0 && lessons[0].slug) {
      window.location.href = `/courses/${resolvedParams?.slug}/lesson/${lessons[0].slug}`
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
              <TabsList className="grid w-full grid-cols-2 rounded-sm bg-[#feefea] p-1">
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
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6">
                      {course.description || 'This course provides comprehensive learning materials and practical exercises.'}
                    </p>
                    
                    {/* Complete CBSE Syllabus */}
                    <div className="mb-6">
                      <h4 className="font-semibold mb-4 text-[#1e293b]">Complete CBSE Class 10 Mathematics Syllabus</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="space-y-3">
                          <div className="border-l-4 border-[#e27447] pl-3">
                            <h5 className="font-medium text-[#1e293b]">Unit I: Number Systems</h5>
                            <p className="text-muted-foreground">Real Numbers (Fundamental Theorem of Arithmetic, proofs of irrationality for √2, √3, √5)</p>
                          </div>
                          <div className="border-l-4 border-[#e27447] pl-3">
                            <h5 className="font-medium text-[#1e293b]">Unit II: Algebra</h5>
                            <p className="text-muted-foreground">Polynomials, Pair of Linear Equations, Quadratic Equations, Arithmetic Progressions</p>
                          </div>
                          <div className="border-l-4 border-[#e27447] pl-3">
                            <h5 className="font-medium text-[#1e293b]">Unit III: Coordinate Geometry</h5>
                            <p className="text-muted-foreground">Distance Formula and Section (Internal Division) Formula</p>
                          </div>
                          <div className="border-l-4 border-[#e27447] pl-3">
                            <h5 className="font-medium text-[#1e293b]">Unit IV: Geometry</h5>
                            <p className="text-muted-foreground">Triangles (similarity), Circles (tangent properties)</p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="border-l-4 border-[#e27447] pl-3">
                            <h5 className="font-medium text-[#1e293b]">Unit V: Trigonometry</h5>
                            <p className="text-muted-foreground">Trigonometric ratios, Identities, Heights and Distances</p>
                          </div>
                          <div className="border-l-4 border-[#e27447] pl-3">
                            <h5 className="font-medium text-[#1e293b]">Unit VI: Mensuration</h5>
                            <p className="text-muted-foreground">Areas Related to Circles, Surface Areas and Volumes</p>
                          </div>
                          <div className="border-l-4 border-[#e27447] pl-3">
                            <h5 className="font-medium text-[#1e293b]">Unit VII: Statistics & Probability</h5>
                            <p className="text-muted-foreground">Mean, Median, Mode of grouped data, Probability</p>
                          </div>
                        </div>
                      </div>
                    </div>

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
                    <div className="space-y-4">
                      {/* Unit I: Number Systems */}
                      <div className="p-4 rounded-sm border hover:bg-gray-50 cursor-pointer">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-8 h-8 bg-[#e27447] text-white rounded-sm flex items-center justify-center text-sm font-medium">
                            I
                          </div>
                          <div>
                            <h4 className="font-medium">Unit I: Number Systems</h4>
                            <p className="text-sm text-muted-foreground">Real Numbers, Fundamental Theorem, Irrationality proofs</p>
                          </div>
                        </div>
                        
                        {/* Chapters under Unit I */}
                        <div className="ml-11 space-y-2">
                          <div 
                            className="flex items-center space-x-2 p-2 rounded-sm bg-gray-50 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleChapterClick('number-systems')}
                          >
                            <div className="w-6 h-6 bg-gray-400 text-white rounded-sm flex items-center justify-center text-xs font-medium">
                              1
                            </div>
                            <span className="text-sm font-medium">Chapter 1: Real Numbers</span>
                          </div>
                        </div>
                      </div>

                      {/* Unit II: Algebra */}
                      <div className="p-4 rounded-sm border hover:bg-gray-50 cursor-pointer">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-8 h-8 bg-[#e27447] text-white rounded-sm flex items-center justify-center text-sm font-medium">
                            II
                          </div>
                          <div>
                            <h4 className="font-medium">Unit II: Algebra</h4>
                            <p className="text-sm text-muted-foreground">Polynomials, Pair of Linear Equations, Quadratic Equations, Arithmetic Progressions</p>
                          </div>
                        </div>
                        
                        {/* Chapters under Unit II */}
                        <div className="ml-11 space-y-2">
                          <div 
                            className="flex items-center space-x-2 p-2 rounded-sm bg-gray-50 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleChapterClick('algebra')}
                          >
                            <div className="w-6 h-6 bg-gray-400 text-white rounded-sm flex items-center justify-center text-xs font-medium">
                              2
                            </div>
                            <span className="text-sm font-medium">Chapter 2: Polynomials</span>
                          </div>
                          <div 
                            className="flex items-center space-x-2 p-2 rounded-sm bg-gray-50 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleChapterClick('algebra')}
                          >
                            <div className="w-6 h-6 bg-gray-400 text-white rounded-sm flex items-center justify-center text-xs font-medium">
                              3
                            </div>
                            <span className="text-sm font-medium">Chapter 3: Pair of Linear Equations</span>
                          </div>
                          <div 
                            className="flex items-center space-x-2 p-2 rounded-sm bg-gray-50 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleChapterClick('algebra')}
                          >
                            <div className="w-6 h-6 bg-gray-400 text-white rounded-sm flex items-center justify-center text-xs font-medium">
                              4
                            </div>
                            <span className="text-sm font-medium">Chapter 4: Quadratic Equations</span>
                          </div>
                          <div 
                            className="flex items-center space-x-2 p-2 rounded-sm bg-gray-50 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleChapterClick('algebra')}
                          >
                            <div className="w-6 h-6 bg-gray-400 text-white rounded-sm flex items-center justify-center text-xs font-medium">
                              5
                            </div>
                            <span className="text-sm font-medium">Chapter 5: Arithmetic Progressions</span>
                          </div>
                        </div>
                      </div>

                      {/* Unit III: Coordinate Geometry */}
                      <div className="p-4 rounded-sm border hover:bg-gray-50 cursor-pointer">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-8 h-8 bg-[#e27447] text-white rounded-sm flex items-center justify-center text-sm font-medium">
                            III
                          </div>
                          <div>
                            <h4 className="font-medium">Unit III: Coordinate Geometry</h4>
                            <p className="text-sm text-muted-foreground">Distance Formula, Section Formula</p>
                          </div>
                        </div>
                        
                        {/* Chapters under Unit III */}
                        <div className="ml-11 space-y-2">
                          <div 
                            className="flex items-center space-x-2 p-2 rounded-sm bg-gray-50 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleChapterClick('coordinate-geometry')}
                          >
                            <div className="w-6 h-6 bg-gray-400 text-white rounded-sm flex items-center justify-center text-xs font-medium">
                              6
                            </div>
                            <span className="text-sm font-medium">Chapter 6: Coordinate Geometry</span>
                          </div>
                        </div>
                      </div>

                      {/* Unit IV: Geometry */}
                      <div className="p-4 rounded-sm border hover:bg-gray-50 cursor-pointer">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-8 h-8 bg-[#e27447] text-white rounded-sm flex items-center justify-center text-sm font-medium">
                            IV
                          </div>
                          <div>
                            <h4 className="font-medium">Unit IV: Geometry</h4>
                            <p className="text-sm text-muted-foreground">Triangles (Similarity criteria), Circles (Tangents, Theorems)</p>
                          </div>
                        </div>
                        
                        {/* Chapters under Unit IV */}
                        <div className="ml-11 space-y-2">
                          <div 
                            className="flex items-center space-x-2 p-2 rounded-sm bg-gray-50 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleChapterClick('geometry')}
                          >
                            <div className="w-6 h-6 bg-gray-400 text-white rounded-sm flex items-center justify-center text-xs font-medium">
                              7
                            </div>
                            <span className="text-sm font-medium">Chapter 7: Triangles</span>
                          </div>
                          <div 
                            className="flex items-center space-x-2 p-2 rounded-sm bg-gray-50 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleChapterClick('geometry')}
                          >
                            <div className="w-6 h-6 bg-gray-400 text-white rounded-sm flex items-center justify-center text-xs font-medium">
                              8
                            </div>
                            <span className="text-sm font-medium">Chapter 8: Circles</span>
                          </div>
                        </div>
                      </div>

                      {/* Unit V: Trigonometry */}
                      <div className="p-4 rounded-sm border hover:bg-gray-50 cursor-pointer">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-8 h-8 bg-[#e27447] text-white rounded-sm flex items-center justify-center text-sm font-medium">
                            V
                          </div>
                          <div>
                            <h4 className="font-medium">Unit V: Trigonometry</h4>
                            <p className="text-sm text-muted-foreground">Trig Ratios, Identities, Heights & Distances</p>
                          </div>
                        </div>
                        
                        {/* Chapters under Unit V */}
                        <div className="ml-11 space-y-2">
                          <div 
                            className="flex items-center space-x-2 p-2 rounded-sm bg-gray-50 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleChapterClick('trigonometry')}
                          >
                            <div className="w-6 h-6 bg-gray-400 text-white rounded-sm flex items-center justify-center text-xs font-medium">
                              9
                            </div>
                            <span className="text-sm font-medium">Chapter 9: Introduction to Trigonometry</span>
                          </div>
                          <div 
                            className="flex items-center space-x-2 p-2 rounded-sm bg-gray-50 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleChapterClick('trigonometry')}
                          >
                            <div className="w-6 h-6 bg-gray-400 text-white rounded-sm flex items-center justify-center text-xs font-medium">
                              10
                            </div>
                            <span className="text-sm font-medium">Chapter 10: Heights and Distances</span>
                          </div>
                        </div>
                      </div>

                      {/* Unit VI: Mensuration */}
                      <div className="p-4 rounded-sm border hover:bg-gray-50 cursor-pointer">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-8 h-8 bg-[#e27447] text-white rounded-sm flex items-center justify-center text-sm font-medium">
                            VI
                          </div>
                          <div>
                            <h4 className="font-medium">Unit VI: Mensuration</h4>
                            <p className="text-sm text-muted-foreground">Areas (Sectors, Segments), Surface Areas & Volumes</p>
                          </div>
                        </div>
                        
                        {/* Chapters under Unit VI */}
                        <div className="ml-11 space-y-2">
                          <div 
                            className="flex items-center space-x-2 p-2 rounded-sm bg-gray-50 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleChapterClick('mensuration')}
                          >
                            <div className="w-6 h-6 bg-gray-400 text-white rounded-sm flex items-center justify-center text-xs font-medium">
                              11
                            </div>
                            <span className="text-sm font-medium">Chapter 11: Areas Related to Circles</span>
                          </div>
                          <div 
                            className="flex items-center space-x-2 p-2 rounded-sm bg-gray-50 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleChapterClick('mensuration')}
                          >
                            <div className="w-6 h-6 bg-gray-400 text-white rounded-sm flex items-center justify-center text-xs font-medium">
                              12
                            </div>
                            <span className="text-sm font-medium">Chapter 12: Surface Areas and Volumes</span>
                          </div>
                        </div>
                      </div>

                      {/* Unit VII: Statistics and Probability */}
                      <div className="p-4 rounded-sm border hover:bg-gray-50 cursor-pointer">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-8 h-8 bg-[#e27447] text-white rounded-sm flex items-center justify-center text-sm font-medium">
                            VII
                          </div>
                          <div>
                            <h4 className="font-medium">Unit VII: Statistics and Probability</h4>
                            <p className="text-sm text-muted-foreground">Mean, Median, Mode (Grouped Data), Probability</p>
                          </div>
                        </div>
                        
                        {/* Chapters under Unit VII */}
                        <div className="ml-11 space-y-2">
                          <div 
                            className="flex items-center space-x-2 p-2 rounded-sm bg-gray-50 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleChapterClick('statistics-probability')}
                          >
                            <div className="w-6 h-6 bg-gray-400 text-white rounded-sm flex items-center justify-center text-xs font-medium">
                              13
                            </div>
                            <span className="text-sm font-medium">Chapter 13: Statistics</span>
                          </div>
                          <div 
                            className="flex items-center space-x-2 p-2 rounded-sm bg-gray-50 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleChapterClick('statistics-probability')}
                          >
                            <div className="w-6 h-6 bg-gray-400 text-white rounded-sm flex items-center justify-center text-xs font-medium">
                              14
                            </div>
                            <span className="text-sm font-medium">Chapter 14: Probability</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Facts */}
            <Card>
              <CardHeader>
                <CardTitle>Course Facts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Chapters</span>
                  <span className="font-medium">7</span>
                </div>
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
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Exam Board</span>
                  <span className="font-medium">CBSE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Academic Year</span>
                  <span className="font-medium">2025-26</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Textbook</span>
                  <span className="font-medium">NCERT</span>
                </div>
              </CardContent>
            </Card>

            {/* Chapter Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Chapter Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">1. Number Systems</span>
                    <span className="font-medium">Real Numbers</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">2. Algebra</span>
                    <span className="font-medium">Polynomials, Linear & Quadratic</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">3. Coordinate Geometry</span>
                    <span className="font-medium">Distance & Section Formula</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">4. Geometry</span>
                    <span className="font-medium">Triangles & Circles</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">5. Trigonometry</span>
                    <span className="font-medium">Ratios & Identities</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">6. Mensuration</span>
                    <span className="font-medium">Areas & Volumes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">7. Statistics & Probability</span>
                    <span className="font-medium">Data Analysis</span>
                  </div>
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
