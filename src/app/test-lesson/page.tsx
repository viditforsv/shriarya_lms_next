'use client'

import { useState, useEffect } from 'react'

export default function TestLessonPage() {
  const [lesson, setLesson] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        console.log('Fetching lesson data...')
        
        // Test the lessons API
        const response = await fetch('/api/lessons?course_slug=cbse-mathematics-class-10')
        console.log('API response status:', response.status)
        
        if (response.ok) {
          const data = await response.json()
          console.log('Lessons data:', data)
          
          // Find the ap-formulas lesson
          const apLesson = data.lessons.find((l: any) => l.slug === 'ap-formulas')
          console.log('Found AP lesson:', apLesson)
          
          if (apLesson) {
            setLesson(apLesson)
          } else {
            setError('Lesson ap-formulas not found')
          }
        } else {
          const errorText = await response.text()
          console.error('API error:', errorText)
          setError(`API error: ${response.status}`)
        }
      } catch (err) {
        console.error('Fetch error:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchLesson()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e27447] mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading lesson data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-red-600">Error</h1>
          <p className="text-muted-foreground mb-6">{error}</p>
        </div>
      </div>
    )
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold mb-4">No Lesson Data</h1>
          <p className="text-muted-foreground mb-6">Lesson data was not loaded</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Test Lesson Page</h1>
        
        <div className="bg-white rounded-sm border p-6">
          <h2 className="text-2xl font-bold mb-4">{lesson.title}</h2>
          <p className="text-muted-foreground mb-4">Slug: {lesson.slug}</p>
          <p className="text-muted-foreground mb-4">Order: {lesson.lesson_order}</p>
          <p className="text-muted-foreground mb-4">Preview: {lesson.is_preview ? 'Yes' : 'No'}</p>
          
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Content:</h3>
            <div 
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: lesson.content_html }}
            />
          </div>
          
          {lesson.resources && lesson.resources.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Resources:</h3>
              <ul className="space-y-2">
                {lesson.resources.map((resource: any) => (
                  <li key={resource.id} className="flex items-center space-x-2">
                    <span className="text-sm font-medium">{resource.kind}:</span>
                    <span className="text-sm text-muted-foreground">{resource.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
