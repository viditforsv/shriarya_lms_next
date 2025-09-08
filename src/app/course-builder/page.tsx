'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/app/components-demo/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components-demo/ui/card'
import { Input } from '@/app/components-demo/ui/input'
import { Label } from '@/app/components-demo/ui/label'
import { Textarea } from '@/app/components-demo/ui/textarea'
import { Badge } from '@/app/components-demo/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components-demo/ui/tabs'
import { 
  Plus, 
  Edit, 
  Trash2, 
  BookOpen, 
  Users, 
  Clock, 
  DollarSign,
  Eye,
  EyeOff,
  Save,
  Upload
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

interface Course {
  id: string
  title: string
  description: string
  slug: string
  curriculum?: string
  subject?: string
  grade?: string
  level?: string
  is_free: boolean
  price?: number
  status: 'published' | 'draft' | 'archived'
  duration?: string
  lessons: number
  thumbnail?: string
  features: string[]
  prerequisites: string[]
  learningOutcomes: string[]
  tags: string[]
  created_at: string
  updated_at: string
  profiles?: {
    id: string
    first_name: string
    last_name: string
    email: string
  }
}

interface Lesson {
  id: string
  title: string
  description?: string
  content?: string
  lesson_order: number
  slug: string
  is_preview: boolean
  duration?: string
  type: 'video' | 'document' | 'quiz' | 'assignment' | 'practice'
  course_id: string
  created_at: string
  resources?: Resource[]
}

interface Resource {
  id: string
  title: string
  kind: 'video' | 'pdf' | 'image' | 'link' | 'audio' | 'zip'
  url: string
  mime?: string
  duration_sec?: number
  description?: string
  lesson_id: string
  created_at: string
}

export default function CourseBuilder() {
  const { user, profile } = useAuth()
  const [courses, setCourses] = useState<Course[]>([])
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('courses')
  const [showCourseForm, setShowCourseForm] = useState(false)
  const [showLessonForm, setShowLessonForm] = useState(false)
  const [editingCourse, setEditingCourse] = useState<Course | null>(null)
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null)

  // Form states
  const [courseForm, setCourseForm] = useState({
    title: '',
    description: '',
    slug: '',
    curriculum: 'CBSE',
    subject: '',
    grade: '',
    level: '',
    is_free: true,
    price: 0,
    status: 'draft' as const,
    duration: '',
    thumbnail: '',
    features: [] as string[],
    prerequisites: [] as string[],
    learningOutcomes: [] as string[],
    tags: [] as string[]
  })

  const [lessonForm, setLessonForm] = useState({
    title: '',
    description: '',
    content: '',
    lesson_order: 1,
    slug: '',
    is_preview: false,
    duration: '',
    type: 'video' as const,
    course_id: ''
  })

  useEffect(() => {
    if (profile?.role === 'admin') {
      fetchCourses()
    }
  }, [profile])

  const fetchCourses = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/courses')
      const data = await response.json()
      
      if (response.ok) {
        setCourses(data.courses)
      } else {
        setError(data.error)
      }
    } catch (err) {
      setError('Failed to fetch courses')
    } finally {
      setLoading(false)
    }
  }

  const fetchLessons = async (courseId: string) => {
    try {
      const response = await fetch(`/api/lessons?course_id=${courseId}`)
      const data = await response.json()
      
      if (response.ok) {
        setLessons(data.lessons)
      } else {
        setError(data.error)
      }
    } catch (err) {
      setError('Failed to fetch lessons')
    }
  }

  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course)
    setLessonForm(prev => ({ ...prev, course_id: course.id }))
    fetchLessons(course.id)
    setActiveTab('lessons')
  }

  const handleCreateCourse = async () => {
    try {
      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(courseForm)
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setCourses(prev => [data.course, ...prev])
        setShowCourseForm(false)
        resetCourseForm()
      } else {
        setError(data.error)
      }
    } catch (err) {
      setError('Failed to create course')
    }
  }

  const handleUpdateCourse = async () => {
    if (!editingCourse) return
    
    try {
      const response = await fetch('/api/courses', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingCourse.id, ...courseForm })
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setCourses(prev => prev.map(c => c.id === editingCourse.id ? data.course : c))
        setEditingCourse(null)
        setShowCourseForm(false)
        resetCourseForm()
      } else {
        setError(data.error)
      }
    } catch (err) {
      setError('Failed to update course')
    }
  }

  const handleCreateLesson = async () => {
    try {
      const response = await fetch('/api/lessons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lessonForm)
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setLessons(prev => [...prev, data.lesson])
        setShowLessonForm(false)
        resetLessonForm()
      } else {
        setError(data.error)
      }
    } catch (err) {
      setError('Failed to create lesson')
    }
  }

  const resetCourseForm = () => {
    setCourseForm({
      title: '',
      description: '',
      slug: '',
      curriculum: 'CBSE',
      subject: '',
      grade: '',
      level: '',
      is_free: true,
      price: 0,
      status: 'draft',
      duration: '',
      thumbnail: '',
      features: [],
      prerequisites: [],
      learningOutcomes: [],
      tags: []
    })
  }

  const resetLessonForm = () => {
    setLessonForm({
      title: '',
      description: '',
      content: '',
      lesson_order: lessons.length + 1,
      slug: '',
      is_preview: false,
      duration: '',
      type: 'video',
      course_id: selectedCourse?.id || ''
    })
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  if (profile?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>
              You need admin privileges to access the course builder.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              🏗️ Course Builder
            </h1>
            <p className="text-gray-600">
              Create and manage courses using Supabase database
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">Admin: {user?.email}</Badge>
            <Badge variant="secondary">Database-Driven</Badge>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <Card className="mb-6 border-red-200 bg-red-50">
            <CardContent className="p-4">
              <p className="text-red-700">{error}</p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setError(null)}
                className="mt-2"
              >
                Dismiss
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 rounded-sm bg-[#feefea] p-1">
            <TabsTrigger 
              value="courses" 
              className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white data-[state=active]:shadow-sm font-medium transition-all duration-200"
            >
              📚 Courses
            </TabsTrigger>
            <TabsTrigger 
              value="lessons" 
              className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white data-[state=active]:shadow-sm font-medium transition-all duration-200"
              disabled={!selectedCourse}
            >
              📖 Lessons
            </TabsTrigger>
            <TabsTrigger 
              value="resources" 
              className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white data-[state=active]:shadow-sm font-medium transition-all duration-200"
              disabled={!selectedCourse}
            >
              📎 Resources
            </TabsTrigger>
          </TabsList>

          {/* Courses Tab */}
          <TabsContent value="courses" className="mt-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Course Management</h2>
              <Button onClick={() => setShowCourseForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create Course
              </Button>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <Card key={course.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader onClick={() => handleCourseSelect(course)}>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{course.title}</CardTitle>
                          <CardDescription className="mt-1">
                            {course.description?.substring(0, 100)}...
                          </CardDescription>
                        </div>
                        <Badge variant={course.status === 'published' ? 'default' : 'secondary'}>
                          {course.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4" />
                          <span>{course.lessons} lessons</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{course.duration || 'N/A'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4" />
                          <span>{course.is_free ? 'Free' : `₹${course.price}`}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={(e) => {
                            e.stopPropagation()
                            setEditingCourse(course)
                            setCourseForm({
                              title: course.title,
                              description: course.description || '',
                              slug: course.slug,
                              curriculum: course.curriculum || 'CBSE',
                              subject: course.subject || '',
                              grade: course.grade || '',
                              level: course.level || '',
                              is_free: course.is_free,
                              price: course.price || 0,
                              status: course.status,
                              duration: course.duration || '',
                              thumbnail: course.thumbnail || '',
                              features: course.features,
                              prerequisites: course.prerequisites,
                              learningOutcomes: course.learningOutcomes,
                              tags: course.tags
                            })
                            setShowCourseForm(true)
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            // Handle delete
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Lessons Tab */}
          <TabsContent value="lessons" className="mt-6">
            {selectedCourse && (
              <>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-semibold">Lessons for {selectedCourse.title}</h2>
                    <p className="text-gray-600">Manage course content and structure</p>
                  </div>
                  <Button onClick={() => setShowLessonForm(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Lesson
                  </Button>
                </div>

                <div className="space-y-4">
                  {lessons.map((lesson) => (
                    <Card key={lesson.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <Badge variant="outline">Lesson {lesson.lesson_order}</Badge>
                              <Badge variant={lesson.is_preview ? 'default' : 'secondary'}>
                                {lesson.is_preview ? 'Preview' : 'Premium'}
                              </Badge>
                              <Badge variant="outline">{lesson.type}</Badge>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">{lesson.title}</h3>
                            <p className="text-gray-600 mb-3">{lesson.description}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span>Duration: {lesson.duration || 'N/A'}</span>
                              <span>Resources: {lesson.resources?.length || 0}</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="mt-6">
            {selectedCourse && (
              <div>
                <h2 className="text-2xl font-semibold mb-6">Resources Management</h2>
                <p className="text-gray-600">Manage files, videos, and other course materials</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Course Form Modal */}
        {showCourseForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle>
                  {editingCourse ? 'Edit Course' : 'Create New Course'}
                </CardTitle>
                <CardDescription>
                  Fill in the course details below
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Course Title *</Label>
                    <Input
                      id="title"
                      value={courseForm.title}
                      onChange={(e) => {
                        setCourseForm(prev => ({
                          ...prev,
                          title: e.target.value,
                          slug: generateSlug(e.target.value)
                        }))
                      }}
                      placeholder="Enter course title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="slug">Slug *</Label>
                    <Input
                      id="slug"
                      value={courseForm.slug}
                      onChange={(e) => setCourseForm(prev => ({ ...prev, slug: e.target.value }))}
                      placeholder="course-slug"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={courseForm.description}
                    onChange={(e) => setCourseForm(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe what students will learn"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="curriculum">Curriculum</Label>
                    <select
                      id="curriculum"
                      value={courseForm.curriculum}
                      onChange={(e) => setCourseForm(prev => ({ ...prev, curriculum: e.target.value }))}
                      className="w-full p-2 border border-gray-300 rounded-sm"
                    >
                      <option value="CBSE">CBSE</option>
                      <option value="ICSE">ICSE</option>
                      <option value="IBDP">IBDP</option>
                      <option value="IGCSE">IGCSE</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={courseForm.subject}
                      onChange={(e) => setCourseForm(prev => ({ ...prev, subject: e.target.value }))}
                      placeholder="Mathematics"
                    />
                  </div>
                  <div>
                    <Label htmlFor="grade">Grade</Label>
                    <Input
                      id="grade"
                      value={courseForm.grade}
                      onChange={(e) => setCourseForm(prev => ({ ...prev, grade: e.target.value }))}
                      placeholder="Class 10"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      value={courseForm.duration}
                      onChange={(e) => setCourseForm(prev => ({ ...prev, duration: e.target.value }))}
                      placeholder="120 hours"
                    />
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <select
                      id="status"
                      value={courseForm.status}
                      onChange={(e) => setCourseForm(prev => ({ ...prev, status: e.target.value as 'draft' | 'published' | 'archived' }))}
                      className="w-full p-2 border border-gray-300 rounded-sm"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="is_free"
                      checked={courseForm.is_free}
                      onChange={(e) => setCourseForm(prev => ({ ...prev, is_free: e.target.checked }))}
                    />
                    <Label htmlFor="is_free">Free Course</Label>
                  </div>
                  {!courseForm.is_free && (
                    <div className="flex-1">
                      <Label htmlFor="price">Price (₹)</Label>
                      <Input
                        id="price"
                        type="number"
                        value={courseForm.price}
                        onChange={(e) => setCourseForm(prev => ({ ...prev, price: Number(e.target.value) }))}
                        placeholder="299"
                      />
                    </div>
                  )}
                </div>

                <div className="flex gap-4">
                  <Button 
                    onClick={editingCourse ? handleUpdateCourse : handleCreateCourse}
                    className="flex-1"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {editingCourse ? 'Update Course' : 'Create Course'}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setShowCourseForm(false)
                      setEditingCourse(null)
                      resetCourseForm()
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Lesson Form Modal */}
        {showLessonForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle>Add New Lesson</CardTitle>
                <CardDescription>
                  Create a new lesson for {selectedCourse?.title}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="lesson-title">Lesson Title *</Label>
                    <Input
                      id="lesson-title"
                      value={lessonForm.title}
                      onChange={(e) => {
                        setLessonForm(prev => ({
                          ...prev,
                          title: e.target.value,
                          slug: generateSlug(e.target.value)
                        }))
                      }}
                      placeholder="Enter lesson title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lesson-slug">Slug *</Label>
                    <Input
                      id="lesson-slug"
                      value={lessonForm.slug}
                      onChange={(e) => setLessonForm(prev => ({ ...prev, slug: e.target.value }))}
                      placeholder="lesson-slug"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="lesson-description">Description</Label>
                  <Textarea
                    id="lesson-description"
                    value={lessonForm.description}
                    onChange={(e) => setLessonForm(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe what this lesson covers"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="lesson-order">Order</Label>
                    <Input
                      id="lesson-order"
                      type="number"
                      value={lessonForm.lesson_order}
                      onChange={(e) => setLessonForm(prev => ({ ...prev, lesson_order: Number(e.target.value) }))}
                      min="1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lesson-duration">Duration</Label>
                    <Input
                      id="lesson-duration"
                      value={lessonForm.duration}
                      onChange={(e) => setLessonForm(prev => ({ ...prev, duration: e.target.value }))}
                      placeholder="45 minutes"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lesson-type">Type</Label>
                    <select
                      id="lesson-type"
                      value={lessonForm.type}
                      onChange={(e) => setLessonForm(prev => ({ ...prev, type: e.target.value as 'video' | 'text' | 'quiz' | 'assignment' }))}
                      className="w-full p-2 border border-gray-300 rounded-sm"
                    >
                      <option value="video">Video</option>
                      <option value="document">Document</option>
                      <option value="quiz">Quiz</option>
                      <option value="assignment">Assignment</option>
                      <option value="practice">Practice</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="is-preview"
                    checked={lessonForm.is_preview}
                    onChange={(e) => setLessonForm(prev => ({ ...prev, is_preview: e.target.checked }))}
                  />
                  <Label htmlFor="is-preview">Preview Lesson (Free Access)</Label>
                </div>

                <div className="flex gap-4">
                  <Button onClick={handleCreateLesson} className="flex-1">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Lesson
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setShowLessonForm(false)
                      resetLessonForm()
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
