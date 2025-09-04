'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2, Edit, Eye, FileText, Video, HelpCircle, Download, ChevronUp, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FileUpload } from '@/components/ui/file-upload'
import { createClient } from '@/lib/supabase/client'

interface Section {
  id: string
  lesson_id: string
  section_type: 'text' | 'video' | 'quiz' | 'practice' | 'download'
  content: any
  section_order: number
  created_at: string
  updated_at: string
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

  const updateSection = async (sectionId: string, content: any) => {
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

    // Update order numbers
    const updatedSections = newSections.map((section, index) => ({
      ...section,
      section_order: index + 1
    }))

    setSections(updatedSections)
    onSectionsChange?.(updatedSections)

    // Update in database
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

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Sections List */}
      {sections.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Content Sections</CardTitle>
            <p className="text-sm text-muted-foreground">
              Use the up/down arrows to reorder sections
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {sections.map((section, index) => (
                <div
                  key={section.id}
                  className="border rounded-lg p-4 bg-white hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex flex-col space-y-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => moveSection(section.id, 'up')}
                          disabled={index === 0}
                          className="h-6 w-6 p-0"
                        >
                          <ChevronUp className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => moveSection(section.id, 'down')}
                          disabled={index === sections.length - 1}
                          className="h-6 w-6 p-0"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getSectionIcon(section.section_type)}
                        <span className="font-medium">{getSectionTitle(section)}</span>
                        <Badge variant="secondary" className="text-xs">
                          {section.section_type}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          #{section.section_order}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingSection(editingSection === section.id ? null : section.id)}
                      >
                        {editingSection === section.id ? <Eye className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteSection(section.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Section Content Editor */}
                  {editingSection === section.id && (
                    <div className="mt-4 pt-4 border-t">
                      <SectionContentEditor
                        section={section}
                        onSave={(content) => updateSection(section.id, content)}
                        onCancel={() => setEditingSection(null)}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {sections.length === 0 && !loading && (
        <Card>
          <CardContent className="text-center py-8">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No content sections yet</h3>
            <p className="text-muted-foreground mb-4">
              Add your first content section to start building your lesson
            </p>
            <Button onClick={() => addSection('text')}>
              <Plus className="w-4 h-4 mr-2" />
              Add Text Section
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

interface Section {
  id: string
  lesson_id: string
  section_type: 'text' | 'video' | 'quiz' | 'practice' | 'download'
  content: any
  section_order: number
  created_at: string
  updated_at: string
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

  const updateSection = async (sectionId: string, content: any) => {
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

  const reorderSections = async (result: any) => {
    if (!result.destination) return

    const items = Array.from(sections)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    // Update the order in the database
    const updatedSections = items.map((item, index) => ({ ...item, section_order: index + 1 }))
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

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Sections List */}
      {sections.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Content Sections</CardTitle>
            <p className="text-sm text-muted-foreground">
              Drag and drop to reorder sections
            </p>
          </CardHeader>
          <CardContent>
            <DragDropContext onDragEnd={reorderSections}>
              <Droppable droppableId="sections">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
                    {sections.map((section, index) => (
                      <Draggable key={section.id} draggableId={section.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className="border rounded-lg p-4 bg-white hover:shadow-md transition-shadow"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div {...provided.dragHandleProps}>
                                  <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
                                </div>
                                <div className="flex items-center space-x-2">
                                  {getSectionIcon(section.section_type)}
                                  <span className="font-medium">{getSectionTitle(section)}</span>
                                  <Badge variant="secondary" className="text-xs">
                                    {section.section_type}
                                  </Badge>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setEditingSection(editingSection === section.id ? null : section.id)}
                                >
                                  {editingSection === section.id ? <Eye className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => deleteSection(section.id)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>

                            {/* Section Content Editor */}
                            {editingSection === section.id && (
                              <div className="mt-4 pt-4 border-t">
                                <SectionContentEditor
                                  section={section}
                                  onSave={(content) => updateSection(section.id, content)}
                                  onCancel={() => setEditingSection(null)}
                                />
                              </div>
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {sections.length === 0 && !loading && (
        <Card>
          <CardContent className="text-center py-8">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No content sections yet</h3>
            <p className="text-muted-foreground mb-4">
              Add your first content section to start building your lesson
            </p>
            <Button onClick={() => addSection('text')}>
              <Plus className="w-4 h-4 mr-2" />
              Add Text Section
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

// Section Content Editor Component
function SectionContentEditor({ 
  section, 
  onSave, 
  onCancel 
}: { 
  section: Section
  onSave: (content: any) => void
  onCancel: () => void
}) {
  const [content, setContent] = useState(section.content)

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
