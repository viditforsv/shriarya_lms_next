'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '../ui-components/card'
import { Button } from '../ui-components/button'
import { Badge } from '../ui-components/badge'
import { Progress } from '../ui-components/progress'
import { 
  ChevronLeft, 
  ChevronRight, 
  FileText, 
  Download, 
  MessageCircle,
  Clock,
  CheckCircle,
  Star,
  Lightbulb,
  Target,
  BookOpen
} from 'lucide-react'

interface LessonNote {
  id: string
  title: string
  content: string
  timestamp?: string
  isImportant?: boolean
}

interface Resource {
  id: string
  title: string
  type: 'pdf' | 'video' | 'link' | 'quiz'
  url: string
  size?: string
}

interface LessonRightSidebarProps {
  courseSlug: string
  notes?: LessonNote[]
  resources?: Resource[]
  keyPoints?: string[]
  className?: string
}

export function LessonRightSidebar({ 
  courseSlug,
  notes = [], 
  resources = [], 
  keyPoints = [],
  className = '' 
}: LessonRightSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['notes', 'resources']))

  // Keyboard shortcut support
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Cmd/Ctrl + Shift + \ to toggle right sidebar
      if ((event.metaKey || event.ctrlKey) && event.shiftKey && event.key === '\\') {
        event.preventDefault()
        setIsCollapsed(!isCollapsed)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isCollapsed])

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(section)) {
      newExpanded.delete(section)
    } else {
      newExpanded.add(section)
    }
    setExpandedSections(newExpanded)
  }

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="w-4 h-4" />
      case 'video': return <BookOpen className="w-4 h-4" />
      case 'quiz': return <Target className="w-4 h-4" />
      default: return <Download className="w-4 h-4" />
    }
  }

  if (isCollapsed) {
    return (
      <div className={`w-16 bg-white border-l border-gray-200 min-h-screen transition-all duration-300 ${className}`}>
        <div className="p-4">
          <div className="mb-8">
            <div className="flex justify-center mb-4">
              <Badge variant="secondary" className="text-xs">📝</Badge>
            </div>
            <div className="flex justify-center mb-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsCollapsed(false)}
                className="rounded-sm p-2"
                title="Expand sidebar (⌘⇧\)"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-center">
              <Button
                variant="outline"
                size="sm"
                className="rounded-sm p-2"
                title="Notes"
              >
                <FileText className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex justify-center">
              <Button
                variant="outline"
                size="sm"
                className="rounded-sm p-2"
                title="Resources"
              >
                <Download className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex justify-center">
              <Button
                variant="outline"
                size="sm"
                className="rounded-sm p-2"
                title="Key Points"
              >
                <Lightbulb className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`w-80 bg-white border-l border-gray-200 min-h-screen transition-all duration-300 ${className}`}>
      <div className="p-4">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-semibold text-[#1e293b]">Lesson Tools</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsCollapsed(true)}
              className="rounded-sm"
              title="Close sidebar (⌘⇧\)"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Quick Stats */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-base">
              <span className="text-gray-600">Progress</span>
              <span className="font-medium text-[#1e293b]">75%</span>
            </div>
            <Progress value={75} className="h-2" />
            <div className="text-sm text-gray-500">
              <Clock className="w-3 h-3 inline mr-1" />
              15 min remaining
            </div>
          </div>
        </div>

        {/* Notes Section */}
        <Card className="rounded-sm mb-4">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium flex items-center">
                <FileText className="w-4 h-4 mr-2" />
                Notes ({notes.length})
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleSection('notes')}
                className="rounded-sm p-1"
              >
                {expandedSections.has('notes') ? (
                  <ChevronLeft className="w-3 h-3" />
                ) : (
                  <ChevronRight className="w-3 h-3" />
                )}
              </Button>
            </div>
          </CardHeader>
          {expandedSections.has('notes') && (
            <CardContent className="pt-0">
              <div className="space-y-4">
                {notes.length > 0 ? (
                  notes.map((note) => (
                    <div key={note.id} className="p-4 bg-gray-50 rounded-sm">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="text-base font-medium text-[#1e293b] leading-relaxed">{note.title}</h4>
                        {note.isImportant && (
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-3 leading-relaxed">{note.content}</p>
                      {note.timestamp && (
                        <div className="text-sm text-gray-400 leading-relaxed">
                          <Clock className="w-4 h-4 inline mr-1" />
                          {note.timestamp}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-base">No notes yet</p>
                    <Button variant="outline" size="sm" className="mt-2 rounded-sm">
                      Add Note
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          )}
        </Card>

        {/* Resources Section */}
        <Card className="rounded-sm mb-4">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium flex items-center">
                <Download className="w-4 h-4 mr-2" />
                Resources ({resources.length})
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleSection('resources')}
                className="rounded-sm p-1"
              >
                {expandedSections.has('resources') ? (
                  <ChevronLeft className="w-3 h-3" />
                ) : (
                  <ChevronRight className="w-3 h-3" />
                )}
              </Button>
            </div>
          </CardHeader>
          {expandedSections.has('resources') && (
            <CardContent className="pt-0">
              <div className="space-y-2">
                {resources.length > 0 ? (
                  resources.map((resource) => (
                    <div key={resource.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-sm">
                      <div className="flex items-center space-x-2">
                        {getResourceIcon(resource.type)}
                        <div>
                          <p className="text-base font-medium text-[#1e293b]">{resource.title}</p>
                          {resource.size && (
                            <p className="text-sm text-gray-500">{resource.size}</p>
                          )}
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="rounded-sm p-1">
                        <Download className="w-3 h-3" />
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    <Download className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-base">No resources</p>
                  </div>
                )}
              </div>
            </CardContent>
          )}
        </Card>

        {/* Key Points Section */}
        {keyPoints.length > 0 && (
          <Card className="rounded-sm mb-4">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-medium flex items-center">
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Key Points ({keyPoints.length})
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleSection('keypoints')}
                  className="rounded-sm p-1"
                >
                  {expandedSections.has('keypoints') ? (
                    <ChevronLeft className="w-3 h-3" />
                  ) : (
                    <ChevronRight className="w-3 h-3" />
                  )}
                </Button>
              </div>
            </CardHeader>
            {expandedSections.has('keypoints') && (
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {keyPoints.map((point, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-sm">
                      <CheckCircle className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                      <p className="text-base text-gray-700 leading-relaxed">{point}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
        )}

        {/* Quick Actions */}
        <Card className="rounded-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium flex items-center">
                <Target className="w-4 h-4 mr-2" />
                Quick Actions
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleSection('quickactions')}
                className="rounded-sm p-1"
              >
                {expandedSections.has('quickactions') ? (
                  <ChevronLeft className="w-3 h-3" />
                ) : (
                  <ChevronRight className="w-3 h-3" />
                )}
              </Button>
            </div>
          </CardHeader>
          {expandedSections.has('quickactions') && (
            <CardContent className="pt-0">
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
                <Button variant="outline" className="w-full justify-start rounded-sm">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Discussion Forum
                </Button>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  )
}

// Example usage component
export function LessonRightSidebarExample() {
  const sampleNotes: LessonNote[] = [
    {
      id: '1',
      title: 'Important Formula',
      content: 'Remember: a² + b² = c² for right triangles',
      timestamp: '12:30',
      isImportant: true
    },
    {
      id: '2',
      title: 'Practice Tip',
      content: 'Always check your work by substituting values back',
      timestamp: '15:45'
    }
  ]

  const sampleResources: Resource[] = [
    {
      id: '1',
      title: 'Practice Problems PDF',
      type: 'pdf',
      url: '#',
      size: '2.3 MB'
    },
    {
      id: '2',
      title: 'Additional Video',
      type: 'video',
      url: '#'
    }
  ]

  const sampleKeyPoints = [
    'Understand the Pythagorean theorem',
    'Practice with different triangle types',
    'Apply to real-world problems'
  ]

  return (
    <div className="h-screen flex">
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4">Lesson Content</h1>
        <p className="text-gray-600">This is the main lesson content area.</p>
      </div>
      <LessonRightSidebar 
        courseSlug="sample-course"
        notes={sampleNotes}
        resources={sampleResources}
        keyPoints={sampleKeyPoints}
      />
    </div>
  )
}
