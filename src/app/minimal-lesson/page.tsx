'use client'

import { useState, useEffect } from 'react'

interface Lesson {
  id: string
  title: string
  slug: string
  content: string
  course_id: string
}

export default function MinimalLessonPage({ params }: { params: Promise<{ slug: string; lessonSlug: string }> }) {
  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [resolvedParams, setResolvedParams] = useState<{ slug: string; lessonSlug: string } | null>(null)

  // Resolve params
  useEffect(() => {
    params.then(setResolvedParams)
  }, [params])

  useEffect(() => {
    if (!resolvedParams) return

    console.log('Minimal lesson page - loading lesson with params:', resolvedParams)
    setIsLoading(true)
    setError(null)

    // Use fetch with .then() instead of async/await
    fetch(`/api/lessons?course_slug=${resolvedParams.slug}`)
      .then(response => {
        console.log('Lessons API response status:', response.status)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return response.json()
      })
      .then(lessonsData => {
        console.log('Lessons data received:', lessonsData)
        
        const mappedLessons: Lesson[] = lessonsData.lessons.map((lesson: Record<string, unknown>) => ({
          id: lesson.id,
          title: lesson.title,
          slug: lesson.slug,
          content: lesson.content_html || lesson.content || '',
          course_id: lesson.course_id
        }))
        
        const currentLesson = mappedLessons.find(l => l.slug === resolvedParams.lessonSlug)
        
        if (!currentLesson) {
          throw new Error(`Lesson "${resolvedParams.lessonSlug}" not found`)
        }
        
        setLesson(currentLesson)
        setIsLoading(false)
      })
      .catch(err => {
        console.error('Error loading lesson:', err)
        setError(err instanceof Error ? err.message : 'Lesson not found')
        setIsLoading(false)
      })
  }, [resolvedParams])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e27447] mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading lesson...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Error</h1>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    )
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No lesson data</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">{lesson.title}</h1>
        <p className="text-lg mb-4">Course: {resolvedParams?.slug}</p>
        <p className="text-lg mb-4">Lesson: {resolvedParams?.lessonSlug}</p>
        <div className="bg-white p-6 rounded-sm border">
          <h2 className="text-xl font-semibold mb-4">Lesson Content</h2>
          <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
        </div>
      </div>
    </div>
  )
}