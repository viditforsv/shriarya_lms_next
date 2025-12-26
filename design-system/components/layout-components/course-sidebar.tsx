'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/design-system/components/ui/button'
import { Progress } from '@/design-system/components/ui/progress'
import { Badge } from '@/design-system/components/ui/badge'
import { 
  ChevronDown, 
  ChevronRight,
  ChevronLeft,
  BookOpen, 
  FileText, 
  CheckCircle,
  Clock,
  Play,
  Lock,
  Eye
} from 'lucide-react'

interface Lesson {
  id: string
  title: string
  duration?: string
  completed: boolean
  isActive?: boolean
  isPreview?: boolean
  slug?: string
}

interface Chapter {
  id: string
  title: string
  lessons: Lesson[]
  isExpanded?: boolean
}

interface Unit {
  id: string
  title: string
  lessonsCompleted: number
  totalLessons: number
  chapters: Chapter[]
  isExpanded?: boolean
}

interface CourseSidebarData {
  courseTitle: string
  overallProgress: number
  units: Unit[]
}

interface CourseSidebarProps {
  data: CourseSidebarData
  currentLessonId?: string
  courseSlug: string
  className?: string
}

export function CourseSidebar({ 
  data, 
  currentLessonId, 
  courseSlug, 
  className = '' 
}: CourseSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [expandedUnits, setExpandedUnits] = useState<Set<string>>(new Set(['unit-1']))
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set())

  // Keyboard shortcut support
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Cmd/Ctrl + \ to toggle sidebar
      if ((event.metaKey || event.ctrlKey) && event.key === '\\') {
        event.preventDefault()
        setIsCollapsed(!isCollapsed)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isCollapsed])

  const toggleUnit = (unitId: string) => {
    const newExpanded = new Set(expandedUnits)
    if (newExpanded.has(unitId)) {
      newExpanded.delete(unitId)
    } else {
      newExpanded.add(unitId)
    }
    setExpandedUnits(newExpanded)
  }

  const toggleChapter = (chapterId: string) => {
    const newExpanded = new Set(expandedChapters)
    if (newExpanded.has(chapterId)) {
      newExpanded.delete(chapterId)
    } else {
      newExpanded.add(chapterId)
    }
    setExpandedChapters(newExpanded)
  }

  const toggleAllUnits = () => {
    if (expandedUnits.size === data.units.length) {
      setExpandedUnits(new Set())
      setExpandedChapters(new Set())
    } else {
      const allUnitIds = data.units.map(u => u.id)
      const allChapterIds = data.units.flatMap(u => u.chapters.map(c => c.id))
      setExpandedUnits(new Set(allUnitIds))
      setExpandedChapters(new Set(allChapterIds))
    }
  }

  const getLessonStatus = (lesson: Lesson) => {
    if (lesson.completed) return 'completed'
    if (lesson.isActive) return 'active'
    if (lesson.isPreview) return 'preview'
    return 'locked'
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-3 h-3 text-green-500" />
      case 'active':
        return <Play className="w-3 h-3 text-[#e27447]" />
      case 'preview':
        return <Eye className="w-3 h-3 text-blue-500" />
      default:
        return <Lock className="w-3 h-3 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500 text-white'
      case 'active':
        return 'bg-[#e27447] text-white'
      case 'preview':
        return 'bg-blue-500 text-white'
      default:
        return 'bg-gray-200 text-gray-600'
    }
  }

  // Collapsed version (mobile/small screens)
  if (isCollapsed) {
    return (
      <div className={`w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4 space-y-4 ${className}`}>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsCollapsed(false)}
          className="rounded-sm"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
        
        <div className="text-center">
          <div className="text-xs font-medium text-[#1e293b]">{data.overallProgress}%</div>
          <Progress value={data.overallProgress} className="h-1 w-8 mt-1" />
        </div>

        <div className="flex flex-col space-y-2">
          {data.units.map((unit, index) => (
            <div key={unit.id} className="relative group">
              <div className="w-8 h-8 bg-[#e27447] rounded-sm flex items-center justify-center text-white text-xs font-medium">
                {index + 1}
              </div>
              <div className="absolute left-10 top-0 bg-gray-900 text-white text-xs px-2 py-1 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                {unit.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={`w-80 bg-white border-r border-gray-200 flex flex-col h-full ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-[#1e293b] truncate">
            {data.courseTitle}
          </h2>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsCollapsed(true)}
              className="rounded-sm"
              title="Close sidebar (⌘\)"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleAllUnits}
              className="rounded-sm"
            >
              {expandedUnits.size === data.units.length ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Progress Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Overall Progress</span>
            <span className="font-medium text-[#1e293b]">{data.overallProgress}%</span>
          </div>
          <Progress value={data.overallProgress} className="h-2" />
          <div className="text-xs text-gray-500">
            {data.units.reduce((acc, unit) => acc + unit.lessonsCompleted, 0)} of{' '}
            {data.units.reduce((acc, unit) => acc + unit.totalLessons, 0)} lessons completed
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-2">
          {data.units.map((unit, unitIndex) => (
            <div key={unit.id} className="mb-2">
              {/* Unit Header */}
              <div
                className="flex items-center justify-between p-3 rounded-sm cursor-pointer hover:bg-gray-50 transition-colors group"
                onClick={() => toggleUnit(unit.id)}
              >
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className="w-6 h-6 bg-[#e27447] rounded-sm flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
                    {unitIndex + 1}
                  </div>
                  <div className="flex items-center space-x-2 flex-1 min-w-0">
                    <BookOpen className="w-4 h-4 text-[#e27447] flex-shrink-0" />
                    <span className="font-medium text-[#1e293b] truncate">{unit.title}</span>
                  </div>
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <Badge variant="outline" className="text-xs">
                      {unit.lessonsCompleted}/{unit.totalLessons}
                    </Badge>
                    <Progress 
                      value={(unit.lessonsCompleted / unit.totalLessons) * 100} 
                      className="h-1 w-12" 
                    />
                  </div>
                </div>
                <div className="ml-2 flex-shrink-0">
                  {expandedUnits.has(unit.id) ? (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  )}
                </div>
              </div>

              {/* Chapters */}
              {expandedUnits.has(unit.id) && (
                <div className="ml-6 mt-1 space-y-1">
                  {unit.chapters.map((chapter) => (
                    <div key={chapter.id}>
                      {/* Chapter Header */}
                      <div
                        className="flex items-center justify-between p-2 rounded-sm cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => toggleChapter(chapter.id)}
                      >
                        <div className="flex items-center space-x-2 flex-1 min-w-0">
                          <FileText className="w-3 h-3 text-gray-500 flex-shrink-0" />
                          <span className="text-sm font-medium text-gray-700 truncate">
                            {chapter.title}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 flex-shrink-0">
                          <Badge variant="secondary" className="text-xs">
                            {chapter.lessons.length}
                          </Badge>
                          {expandedChapters.has(chapter.id) ? (
                            <ChevronDown className="w-3 h-3 text-gray-400" />
                          ) : (
                            <ChevronRight className="w-3 h-3 text-gray-400" />
                          )}
                        </div>
                      </div>

                      {/* Lessons */}
                      {expandedChapters.has(chapter.id) && (
                        <div className="ml-4 mt-1 space-y-1">
                          {chapter.lessons.map((lesson) => {
                            const status = getLessonStatus(lesson)
                            const isCurrent = lesson.id === currentLessonId
                            
                            return (
                              <Link
                                key={lesson.id}
                                href={lesson.slug ? `/courses/${courseSlug}/lesson/${lesson.slug}` : '#'}
                                className={`flex items-center justify-between p-2 rounded-sm transition-colors group ${
                                  isCurrent 
                                    ? 'bg-[#feefea] border-r-2 border-[#e27447]' 
                                    : 'hover:bg-gray-50'
                                }`}
                              >
                                <div className="flex items-center space-x-2 flex-1 min-w-0">
                                  <div className={`w-5 h-5 rounded-sm flex items-center justify-center text-xs ${getStatusColor(status)}`}>
                                    {getStatusIcon(status)}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className={`text-xs font-medium truncate ${
                                      isCurrent ? 'text-[#1e293b]' : 'text-gray-600'
                                    }`}>
                                      {lesson.title}
                                    </div>
                                    {lesson.duration && (
                                      <div className="text-xs text-gray-500 flex items-center space-x-1">
                                        <Clock className="w-3 h-3" />
                                        <span>{lesson.duration}</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                                {lesson.isPreview && (
                                  <Badge variant="secondary" className="text-xs">
                                    Preview
                                  </Badge>
                                )}
                              </Link>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-gray-200">
        <div className="space-y-2">
          <Link href={`/courses/${courseSlug}`}>
            <Button variant="outline" className="w-full justify-start rounded-sm">
              <BookOpen className="w-4 h-4 mr-2" />
              Course Overview
            </Button>
          </Link>
          <Button variant="outline" className="w-full justify-start rounded-sm">
            <FileText className="w-4 h-4 mr-2" />
            All Notes
          </Button>
        </div>
      </div>
    </div>
  )
}

// Example usage component
export function CourseSidebarExample() {
  const sampleData: CourseSidebarData = {
    courseTitle: "CBSE Class 10 Mathematics",
    overallProgress: 35,
    units: [
      {
        id: "unit-1",
        title: "Number Systems",
        lessonsCompleted: 3,
        totalLessons: 5,
        chapters: [
          {
            id: "chapter-1",
            title: "Real Numbers",
            lessons: [
              { 
                id: "lesson-1", 
                title: "Fundamental Theorem of Arithmetic", 
                duration: "45 min", 
                completed: true,
                slug: "fundamental-theorem"
              },
              { 
                id: "lesson-2", 
                title: "Proofs of Irrationality", 
                duration: "50 min", 
                completed: true,
                slug: "proofs-irrationality"
              },
              { 
                id: "lesson-3", 
                title: "Properties and Applications of Real Numbers", 
                duration: "40 min", 
                completed: false,
                isActive: true,
                slug: "properties-applications"
              }
            ]
          }
        ]
      },
      {
        id: "unit-2",
        title: "Algebra",
        lessonsCompleted: 0,
        totalLessons: 8,
        chapters: [
          {
            id: "chapter-2",
            title: "Polynomials",
            lessons: [
              { 
                id: "lesson-4", 
                title: "Zeros of Polynomials", 
                completed: false,
                slug: "zeros-polynomials"
              },
              { 
                id: "lesson-5", 
                title: "Relationship between Zeros and Coefficients", 
                completed: false,
                isPreview: true,
                slug: "zeros-coefficients"
              }
            ]
          }
        ]
      }
    ]
  }

  return (
    <div className="h-screen flex">
      <CourseSidebar 
        data={sampleData}
        currentLessonId="lesson-3"
        courseSlug="cbse-mathematics-class-10"
      />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4">Course Content</h1>
        <p className="text-gray-600">This is the main content area. The sidebar is on the left.</p>
      </div>
    </div>
  )
}
