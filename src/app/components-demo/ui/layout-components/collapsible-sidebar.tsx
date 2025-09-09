'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/app/components-demo/ui/ui-components/button'
import { Progress } from '@/app/components-demo/ui/ui-components/progress'
import { Badge } from '@/app/components-demo/ui/ui-components/badge'
import { 
  ChevronDown, 
  ChevronRight, 
  ChevronLeft,
  ChevronUp,
  BookOpen, 
  FileText, 
  CheckCircle,
  Clock,
  Eye,
  Lock,
  Play
} from 'lucide-react'
import { 
  Subsection, 
  CBSE_CLASS_10_MATHEMATICS_SYLLABUS,
  getSyllabusProgress 
} from '@/lib/cbse-syllabus'

interface CollapsibleSidebarProps {
  currentLessonSlug?: string
  courseSlug: string
}

export function CollapsibleSidebar({ currentLessonSlug, courseSlug }: CollapsibleSidebarProps) {
  const [syllabus] = useState(CBSE_CLASS_10_MATHEMATICS_SYLLABUS)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['number-systems', 'algebra']))
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set(['real-numbers', 'quadratic-equations']))

  // Keyboard shortcut support
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Cmd/Ctrl + \ to toggle left sidebar
      if ((event.metaKey || event.ctrlKey) && event.key === '\\' && !event.shiftKey) {
        event.preventDefault()
        setIsSidebarCollapsed(!isSidebarCollapsed)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isSidebarCollapsed])

  const progress = getSyllabusProgress(syllabus)

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId)
    } else {
      newExpanded.add(sectionId)
    }
    setExpandedSections(newExpanded)
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

  const toggleAllSections = () => {
    if (expandedSections.size === syllabus.length) {
      setExpandedSections(new Set())
      setExpandedChapters(new Set())
    } else {
      const allSectionIds = syllabus.map(s => s.id)
      const allChapterIds = syllabus.flatMap(s => s.chapters.map(c => c.id))
      setExpandedSections(new Set(allSectionIds))
      setExpandedChapters(new Set(allChapterIds))
    }
  }

  const getSubsectionStatus = (subsection: Subsection) => {
    if (subsection.isCompleted) return 'completed'
    if (subsection.isPreview) return 'preview'
    if (subsection.slug === currentLessonSlug) return 'current'
    return 'locked'
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'preview':
        return <Eye className="w-4 h-4 text-blue-500" />
      case 'current':
        return <Play className="w-4 h-4 text-[#e27447]" />
      default:
        return <Lock className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500 text-white'
      case 'preview':
        return 'bg-blue-500 text-white'
      case 'current':
        return 'bg-[#e27447] text-white'
      default:
        return 'bg-gray-200 text-gray-600'
    }
  }

  if (isSidebarCollapsed) {
    return (
      <div className="w-16 bg-white border-r border-gray-200 min-h-screen transition-all duration-300">
        <div className="p-4">
          <div className="mb-8">
            <div className="flex justify-center mb-4">
              <Badge variant="secondary" className="text-xs">📚</Badge>
            </div>
            <div className="flex justify-center mb-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsSidebarCollapsed(false)}
                className="rounded-sm p-2"
                title="Expand sidebar (⌘\)"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-center">
              <Button
                variant="outline"
                size="sm"
                className="rounded-sm p-2"
                title="Course Progress"
              >
                <div className="text-center">
                  <div className="text-sm font-medium text-[#1e293b]">{progress.completed}</div>
                  <div className="text-sm text-muted-foreground">of {progress.total}</div>
                </div>
              </Button>
            </div>
            <div className="flex justify-center">
              <Progress value={progress.percentage} className="h-2 w-12" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-80 bg-white border-r border-gray-200 min-h-screen transition-all duration-300 flex flex-col">
      <div className="p-4 flex flex-col h-full">
        {/* Header */}
        <div className="mb-6 flex-shrink-0">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-semibold text-[#1e293b]">CBSE Class 10 Mathematics</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsSidebarCollapsed(true)}
              className="rounded-sm"
              title="Close sidebar (⌘\)"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Progress Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-base">
              <span className="text-gray-600">Overall Progress</span>
              <span className="font-medium text-[#1e293b]">{progress.percentage}%</span>
            </div>
            <Progress value={progress.percentage} className="h-2" />
            <div className="text-sm text-gray-500">
              {progress.completed} of {progress.total} lessons completed
            </div>
          </div>
        </div>

        {/* Expand/Collapse All Button */}
        <div className="mb-4 flex-shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleAllSections}
            className="w-full rounded-sm"
          >
            {expandedSections.size === syllabus.length ? (
              <>
                <ChevronUp className="w-4 h-4 mr-2" />
                Collapse All
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 mr-2" />
                Expand All
              </>
            )}
          </Button>
        </div>

        {/* Course Content Section */}
        <div className="space-y-4 flex-1 overflow-y-auto">
              {syllabus.map((section) => (
                <div key={section.id} className="border-b border-[#feefea] last:border-b-0">
                  {/* Section Header */}
                  <div
                    className="flex items-center justify-between p-3 cursor-pointer hover:bg-[#feefea]/50 transition-colors"
                    onClick={() => toggleSection(section.id)}
                  >
                    <div className="flex items-center space-x-2">
                      {expandedSections.has(section.id) ? (
                        <ChevronDown className="w-4 h-4 text-[#e27447]" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-[#e27447]" />
                      )}
                      <BookOpen className="w-4 h-4 text-[#e27447]" />
                      <span className="font-semibold text-[#1e293b] text-base">{section.title}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {section.chapters.length}
                    </Badge>
                  </div>

                  {/* Chapters */}
                  {expandedSections.has(section.id) && (
                    <div className="bg-[#feefea]/20">
                      {section.chapters.map((chapter) => (
                        <div key={chapter.id}>
                          {/* Chapter Header */}
                          <div
                            className="flex items-center justify-between p-3 pl-8 cursor-pointer hover:bg-[#feefea]/30 transition-colors"
                            onClick={() => toggleChapter(chapter.id)}
                          >
                            <div className="flex items-center space-x-2">
                              {expandedChapters.has(chapter.id) ? (
                                <ChevronDown className="w-3 h-3 text-muted-foreground" />
                              ) : (
                                <ChevronRight className="w-3 h-3 text-muted-foreground" />
                              )}
                              <FileText className="w-3 h-3 text-muted-foreground" />
                              <span className="text-base font-medium text-[#1e293b]">{chapter.title}</span>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {chapter.subsections.length}
                            </Badge>
                          </div>

                          {/* Subsections */}
                          {expandedChapters.has(chapter.id) && (
                            <div className="bg-white/50">
                              {chapter.subsections.map((subsection) => {
                                const status = getSubsectionStatus(subsection)
                                const isCurrent = subsection.slug === currentLessonSlug
                                
                                return (
                                  <Link
                                    key={subsection.id}
                                    href={`/courses/${courseSlug}/lesson/${subsection.slug}`}
                                    className={`flex items-center justify-between p-3 pl-12 hover:bg-[#feefea]/40 transition-colors ${
                                      isCurrent ? 'bg-[#feefea] border-r-2 border-[#e27447]' : ''
                                    }`}
                                  >
                                    <div className="flex items-center space-x-3">
                                      <div className={`w-6 h-6 rounded-sm flex items-center justify-center text-xs font-medium ${getStatusColor(status)}`}>
                                        {getStatusIcon(status)}
                                      </div>
                                      <div>
                                        <h4 className={`text-sm font-medium ${
                                          isCurrent ? 'text-[#1e293b]' : 'text-muted-foreground'
                                        }`}>
                                          {subsection.title}
                                        </h4>
                                        {subsection.duration && (
                                          <p className="text-sm text-muted-foreground flex items-center space-x-1">
                                            <Clock className="w-3 h-3" />
                                            <span>{subsection.duration}</span>
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                    {subsection.isPreview && (
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
    </div>
  )
}
