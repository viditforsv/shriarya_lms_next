'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components-demo/ui/card'
import { Button } from '@/app/components-demo/ui/button'
import { Progress } from '@/app/components-demo/ui/progress'
import { Badge } from '@/app/components-demo/ui/badge'
import { 
  ChevronDown, 
  ChevronRight, 
  ChevronLeft,
  ChevronUp,
  BookOpen, 
  FileText, 
  MessageCircle,
  CheckCircle,
  Clock,
  Eye,
  Lock,
  Play
} from 'lucide-react'
import { 
  Section, 
  Chapter, 
  Subsection, 
  CBSE_CLASS_10_MATHEMATICS_SYLLABUS,
  getSyllabusProgress 
} from '@/lib/cbse-syllabus'

interface CollapsibleSidebarProps {
  currentLessonSlug?: string
  courseSlug: string
}

export function CollapsibleSidebar({ currentLessonSlug, courseSlug }: CollapsibleSidebarProps) {
  const [syllabus, setSyllabus] = useState(CBSE_CLASS_10_MATHEMATICS_SYLLABUS)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['number-systems', 'algebra']))
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set(['real-numbers', 'quadratic-equations']))

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
      <div className="lg:col-span-1 order-2 lg:order-1">
        <div className="sticky top-8">
          <Card className="rounded-sm">
            <CardContent className="p-4">
              <div className="flex flex-col items-center space-y-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsSidebarCollapsed(false)}
                  className="rounded-sm"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <div className="text-center">
                  <div className="text-sm font-medium text-[#1e293b]">{progress.completed}</div>
                  <div className="text-xs text-muted-foreground">of {progress.total}</div>
                </div>
                <Progress value={progress.percentage} className="h-2 w-16" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="lg:col-span-1 order-2 lg:order-1">
      <div className="sticky top-8 space-y-6">
        {/* Combined Sidebar Header & Course Content */}
        <Card className="rounded-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">CBSE Class 10 Mathematics</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsSidebarCollapsed(true)}
                className="rounded-sm"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Overall Progress</span>
                  <span className="text-[#1e293b] font-medium">{progress.percentage}%</span>
                </div>
                <Progress value={progress.percentage} className="h-2" />
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="text-[#1e293b] font-medium">{progress.completed}</span> of {progress.total} lessons completed
              </div>
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
          </CardContent>
          
          {/* Course Content Section */}
          <div className="border-t border-[#feefea]">
            <div className="p-4 pb-0">
              <h3 className="text-lg font-semibold text-[#1e293b] mb-3">Course Content</h3>
            </div>
            <div className="max-h-96 overflow-y-auto">
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
                      <span className="font-medium text-[#1e293b]">{section.title}</span>
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
                              <span className="text-sm font-medium text-[#1e293b]">{chapter.title}</span>
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
                                        <h4 className={`text-xs font-medium ${
                                          isCurrent ? 'text-[#1e293b]' : 'text-muted-foreground'
                                        }`}>
                                          {subsection.title}
                                        </h4>
                                        {subsection.duration && (
                                          <p className="text-xs text-muted-foreground flex items-center space-x-1">
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
        </Card>

        {/* Quick Actions */}
        <Card className="rounded-sm">
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
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
            <Button variant="outline" className="w-full justify-start rounded-sm">
              <MessageCircle className="w-4 h-4 mr-2" />
              Discussion Forum
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
