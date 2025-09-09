'use client'

import { useState, useEffect } from 'react'
import { Trash2, Edit, FileText, Video, HelpCircle, Download, ChevronUp, ChevronDown } from '@/app/components-demo/ui/icons'
import { Button } from '@/app/components-demo/ui/ui-components/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components-demo/ui/ui-components/card'
import { Badge } from '@/app/components-demo/ui/ui-components/badge'
import { FileUpload } from '@/app/components-demo/ui/file-upload'
import { createClient } from '@/lib/supabase/client'

interface Section {
  id: string
  lesson_id: string
  section_type: 'text' | 'video' | 'quiz' | 'practice' | 'download'
  content: SectionContent
  section_order: number
  created_at: string
  updated_at: string
}

interface SectionContent {
  title?: string
  html?: string
  url?: string
  fileType?: string
  [key: string]: unknown
}

interface SectionEditorProps {
  lessonId: string
  onSectionsChange?: (sections: Section[]) => void
}

export function SectionEditor({ lessonId, onSectionsChange }: SectionEditorProps) {
  const [sections, setSections] = useState<Section[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingSection, setEditingSection] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    fetchSections()
  }, [lessonId])

  const fetchSections = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        throw new Error('No active session')
      }

      const response = await fetch(`/api/lesson-sections?lessonId=${lessonId}`, {
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch sections')
      }

      const data = await response.json()
      setSections(data.sections || [])
      onSectionsChange?.(data.sections || [])

    } catch (err) {
      console.error('Error fetching sections:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch sections')
    } finally {
      setLoading(false)
    }
  }

  const addSection = async (type: Section['section_type']) => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        throw new Error('No active session')
      }

      const response = await fetch('/api/lesson-sections', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          lessonId,
          sectionType: type
        })
      })

      if (!response.ok) {
        throw new Error('Failed to create section')
      }

      const data = await response.json()
      setSections(prev => [...prev, data.section])
      onSectionsChange?.([...sections, data.section])

    } catch (err) {
      console.error('Error adding section:', err)
      setError(err instanceof Error ? err.message : 'Failed to add section')
    }
  }

  const updateSection = async (sectionId: string, content: SectionContent) => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        throw new Error('No active session')
      }

      const response = await fetch('/api/lesson-sections', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sectionId,
          content
        })
      })

      if (!response.ok) {
        throw new Error('Failed to update section')
      }

      const data = await response.json()
      setSections(prev => prev.map(s => s.id === sectionId ? data.section : s))
      onSectionsChange?.(sections.map(s => s.id === sectionId ? data.section : s))
      setEditingSection(null)

    } catch (err) {
      console.error('Error updating section:', err)
      setError(err instanceof Error ? err.message : 'Failed to update section')
    }
  }

  const deleteSection = async (sectionId: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        throw new Error('No active session')
      }

      const response = await fetch(`/api/lesson-sections?sectionId=${sectionId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to delete section')
      }

      setSections(prev => prev.filter(s => s.id !== sectionId))
      onSectionsChange?.(sections.filter(s => s.id !== sectionId))

    } catch (err) {
      console.error('Error deleting section:', err)
      setError(err instanceof Error ? err.message : 'Failed to delete section')
    }
  }

  const moveSection = async (sectionId: string, direction: 'up' | 'down') => {
    const currentIndex = sections.findIndex(s => s.id === sectionId)
    if (currentIndex === -1) return

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1
    if (newIndex < 0 || newIndex >= sections.length) return

    const newSections = [...sections]
    const [movedSection] = newSections.splice(currentIndex, 1)
    newSections.splice(newIndex, 0, movedSection)

    // Update the order in the database
    const updatedSections = newSections.map((section, index) => ({ ...section, section_order: index + 1 }))
    setSections(updatedSections)
    onSectionsChange?.(updatedSections)

    // Update each section's order in the database
    for (const section of updatedSections) {
      await updateSection(section.id, section.content)
    }
  }

  const getSectionIcon = (type: string) => {
    switch (type) {
      case 'text':
        return <FileText className="w-4 h-4" />
      case 'video':
        return <Video className="w-4 h-4" />
      case 'quiz':
        return <HelpCircle className="w-4 h-4" />
      case 'practice':
        return <HelpCircle className="w-4 h-4" />
      case 'download':
        return <Download className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  const getSectionTitle = (section: Section) => {
    switch (section.section_type) {
      case 'text':
        return section.content?.title || 'Text Content'
      case 'video':
        return section.content?.title || 'Video'
      case 'quiz':
        return section.content?.title || 'Quiz'
      case 'practice':
        return section.content?.title || 'Practice Exercise'
      case 'download':
        return section.content?.title || 'Download'
      default:
        return 'Section'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#e27447]"></div>
        <span className="ml-2">Loading sections...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Add Section Buttons */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Add Content Sections</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <Button 
              variant="outline" 
              onClick={() => addSection('text')}
              className="flex flex-col items-center space-y-2 h-auto py-4"
            >
              <FileText className="w-5 h-5" />
              <span className="text-sm">Text</span>
            </Button>
            <Button 
              variant="outline" 
              onClick={() => addSection('video')}
              className="flex flex-col items-center space-y-2 h-auto py-4"
            >
              <Video className="w-5 h-5" />
              <span className="text-sm">Video</span>
            </Button>
            <Button 
              variant="outline" 
              onClick={() => addSection('quiz')}
              className="flex flex-col items-center space-y-2 h-auto py-4"
            >
              <HelpCircle className="w-5 h-5" />
              <span className="text-sm">Quiz</span>
            </Button>
            <Button 
              variant="outline" 
              onClick={() => addSection('practice')}
              className="flex flex-col items-center space-y-2 h-auto py-4"
            >
              <HelpCircle className="w-5 h-5" />
              <span className="text-sm">Practice</span>
            </Button>
            <Button 
              variant="outline" 
              onClick={() => addSection('download')}
              className="flex flex-col items-center space-y-2 h-auto py-4"
            >
              <Download className="w-5 h-5" />
              <span className="text-sm">Download</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Error Display */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <p className="text-red-600">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Sections List */}
      {sections.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Content Sections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sections.map((section, index) => (
                <div key={section.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      {getSectionIcon(section.section_type)}
                      <span className="font-medium">{getSectionTitle(section)}</span>
                      <Badge variant="outline">{section.section_type}</Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingSection(section.id)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteSection(section.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => moveSection(section.id, 'up')}
                        disabled={index === 0}
                      >
                        <ChevronUp className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => moveSection(section.id, 'down')}
                        disabled={index === sections.length - 1}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {editingSection === section.id ? (
                    <SectionContentEditor
                      section={section}
                      onSave={(content) => updateSection(section.id, content)}
                      onCancel={() => setEditingSection(null)}
                    />
                  ) : (
                    <div className="text-sm text-muted-foreground">
                      {section.content?.title || 'No content yet'}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

// Section Content Editor Component
function SectionContentEditor({ section, onSave, onCancel }: {
  section: Section
  onSave: (content: SectionContent) => void
  onCancel: () => void
}) {
  const [content, setContent] = useState<SectionContent>(section.content || {})

  const handleSave = () => {
    onSave(content)
  }

  switch (section.section_type) {
    case 'text':
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Content</label>
            <textarea
              value={content?.html || ''}
              onChange={(e) => setContent({ ...content, html: e.target.value })}
              className="w-full h-32 p-3 border rounded-lg resize-none"
              placeholder="Enter your lesson content..."
            />
          </div>
          <div className="flex space-x-2">
            <Button onClick={handleSave}>Save</Button>
            <Button variant="outline" onClick={onCancel}>Cancel</Button>
          </div>
        </div>
      )

    case 'video':
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Video URL</label>
            <input
              type="url"
              value={content?.url || ''}
              onChange={(e) => setContent({ ...content, url: e.target.value })}
              className="w-full p-2 border rounded-lg"
              placeholder="https://example.com/video.mp4"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={content?.title || ''}
              onChange={(e) => setContent({ ...content, title: e.target.value })}
              className="w-full p-2 border rounded-lg"
              placeholder="Video title"
            />
          </div>
          <div className="flex space-x-2">
            <Button onClick={handleSave}>Save</Button>
            <Button variant="outline" onClick={onCancel}>Cancel</Button>
          </div>
        </div>
      )

    case 'download':
      return (
        <div className="space-y-4">
          <FileUpload
            lessonId={section.lesson_id}
            onUploadComplete={(resource) => {
              setContent({
                ...content,
                url: resource.url,
                title: resource.title,
                fileType: resource.kind
              })
            }}
            acceptedTypes={['application/pdf', 'image/*', 'video/*', 'audio/*']}
          />
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={content?.title || ''}
              onChange={(e) => setContent({ ...content, title: e.target.value })}
              className="w-full p-2 border rounded-lg"
              placeholder="Download title"
            />
          </div>
          <div className="flex space-x-2">
            <Button onClick={handleSave}>Save</Button>
            <Button variant="outline" onClick={onCancel}>Cancel</Button>
          </div>
        </div>
      )

    default:
      return (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Content editor for {section.section_type} sections coming soon...
          </p>
          <div className="flex space-x-2">
            <Button onClick={handleSave}>Save</Button>
            <Button variant="outline" onClick={onCancel}>Cancel</Button>
          </div>
        </div>
      )
  }
}
