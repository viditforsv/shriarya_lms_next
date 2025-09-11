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
  ChevronRight, 
  Lock,
  BookOpen,
  Users,
  Clock,
  Award
} from 'lucide-react'
import Link from 'next/link'
import { 
  getCourseBySlug, 
  getLessonsByCourseSlugSync, 
  LessonConfig 
} from '@/lib/course-config'
import { RenderedCourse, CourseTemplate } from '@/types/course-templates'
import { DynamicCourseRenderer } from '@/components/DynamicCourseRenderer'
import { CBSESyllabusView, CBSEUnitView } from '@/components/CBSESyllabusView'

interface SyllabusData {
  units: any[];
  chapters: any[];
  lessons: any[];
}

interface ProgressData {
  completedLessons: number;
  totalLessons: number;
  percentage: number;
}

export default function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { user } = useAuth()
  const [course, setCourse] = useState<RenderedCourse | null>(null)
  const [template, setTemplate] = useState<CourseTemplate | null>(null)
  const [lessons, setLessons] = useState<LessonConfig[]>([])
  const [syllabus, setSyllabus] = useState<SyllabusData | null>(null)
  const [progress, setProgress] = useState<ProgressData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [resolvedParams, setResolvedParams] = useState<{ slug: string } | null>(null)
  const [activeTab, setActiveTab] = useState('overview')

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

        // Try to fetch course with template first
        const response = await fetch(`/api/courses/${resolvedParams.slug}/with-template`)
        
        if (response.ok) {
          const data = await response.json()
          setCourse(data.rendered)
          setTemplate(data.template)
          
          // Fetch syllabus data
          try {
            const syllabusResponse = await fetch(`/api/syllabus/${resolvedParams.slug}`)
            if (syllabusResponse.ok) {
              const syllabusData = await syllabusResponse.json()
              setSyllabus(syllabusData.syllabus)
              setProgress(syllabusData.progress)
            }
          } catch (error) {
            console.error('Error fetching syllabus:', error)
          }
          
          // Fetch lessons for this course from database
          try {
            const lessonsResponse = await fetch(`/api/lessons?course_slug=${resolvedParams.slug}`)
            if (lessonsResponse.ok) {
              const lessonsData = await lessonsResponse.json()
              // Convert database lessons to LessonConfig format
              const convertedLessons = lessonsData.lessons.map((lesson: Record<string, unknown>) => ({
                id: lesson.id,
                slug: lesson.slug,
                title: lesson.title,
                description: lesson.content_html || lesson.content || '',
                duration: '45 minutes', // Default duration
                type: 'video',
                isPreview: lesson.is_preview || false,
                order: lesson.lesson_order,
                resources: lesson.resources || []
              }))
              setLessons(convertedLessons)
            } else {
              // Fallback to old system if API fails
              const lessonsData = getLessonsByCourseSlugSync(resolvedParams.slug)
              setLessons(lessonsData)
            }
          } catch (error) {
            console.error('Error fetching lessons:', error)
            // Fallback to old system
            const lessonsData = getLessonsByCourseSlugSync(resolvedParams.slug)
            setLessons(lessonsData)
          }
          
          // For free courses, user is automatically "enrolled"
          setIsEnrolled(data.rendered.isFree || false)
        } else {
          // Fallback to old system
          const courseData = getCourseBySlug(resolvedParams.slug)
          if (courseData) {
            setCourse(courseData)
            const lessonsData = getLessonsByCourseSlugSync(resolvedParams.slug)
            setLessons(lessonsData)
            setIsEnrolled(courseData.isFree || false)
          } else {
            setError('Course not found')
          }
        }
      } catch (error) {
        console.error('Error loading course:', error)
        setError('Failed to load course')
      } finally {
        setIsLoading(false)
      }
    }

    loadCourse()
  }, [resolvedParams])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (error || !course) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              {error || 'Course not found'}
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Check if this is a CBSE course with syllabus data
  const isCBSECourse = course.curriculum === 'CBSE' && syllabus

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Course Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline">{course.curriculum}</Badge>
          <Badge variant="secondary">{course.subject}</Badge>
          {course.grade && <Badge variant="secondary">Grade {course.grade}</Badge>}
        </div>
        <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
        <p className="text-muted-foreground text-lg">{course.description}</p>
      </div>

      {/* Course Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-2xl font-bold">{progress?.totalLessons || lessons.length}</div>
                <div className="text-sm text-muted-foreground">Lessons</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-2xl font-bold">{course.duration}</div>
                <div className="text-sm text-muted-foreground">Duration</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-2xl font-bold">{course.instructor}</div>
                <div className="text-sm text-muted-foreground">Instructor</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-2xl font-bold">{course.level}</div>
                <div className="text-sm text-muted-foreground">Level</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Bar */}
      {progress && (
        <Card className="mb-8">
          <CardContent className="pt-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Course Progress</span>
                <span className="text-sm text-muted-foreground">
                  {progress.completedLessons} / {progress.totalLessons} lessons completed
                </span>
              </div>
              <Progress value={progress.percentage} className="h-2" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Course Content */}
      {isCBSECourse ? (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="syllabus">Syllabus</TabsTrigger>
            <TabsTrigger value="lessons">Lessons</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <DynamicCourseRenderer 
              course={course} 
              template={template} 
              lessons={lessons}
              isEnrolled={isEnrolled}
            />
          </TabsContent>
          
          <TabsContent value="syllabus" className="space-y-6">
            <CBSESyllabusView
              units={syllabus.units}
              chapters={syllabus.chapters}
              lessons={syllabus.lessons}
              completedLessons={progress?.completedLessons || 0}
              totalLessons={progress?.totalLessons || 0}
            />
          </TabsContent>
          
          <TabsContent value="lessons" className="space-y-6">
            <div className="space-y-4">
              {syllabus.units.map((unit) => (
                <CBSEUnitView
                  key={unit.unitNo}
                  unit={unit}
                  chapters={syllabus.chapters}
                  lessons={syllabus.lessons}
                  onLessonClick={(lesson) => {
                    // Navigate to lesson
                    window.location.href = `/courses/${course.slug}/lesson/${lesson.slug}`
                  }}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      ) : (
        <DynamicCourseRenderer 
          course={course} 
          template={template} 
          lessons={lessons}
          isEnrolled={isEnrolled}
        />
      )}

      {/* Enrollment Section */}
      {!isEnrolled && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Enroll in this Course</CardTitle>
            <CardDescription>
              {course.isFree ? 'This course is free to enroll' : `Price: ₹${course.price}`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" size="lg">
              {course.isFree ? 'Enroll for Free' : `Enroll for ₹${course.price}`}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
