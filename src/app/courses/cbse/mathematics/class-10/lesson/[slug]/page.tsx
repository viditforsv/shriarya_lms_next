"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Play, FileText, Download, Clock, CheckCircle, BookOpen } from "lucide-react"
import { Button } from "@/app/components-demo/ui/button"
import { Badge } from "@/app/components-demo/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components-demo/ui/card"
import { useAuth } from "@/contexts/AuthContext"
import { createClient } from "@/lib/supabase/client"
import { useCourseAccess } from "@/hooks/useCourseAccess"

interface Lesson {
  id: string
  title: string
  content: string | null
  course_id: string
  lesson_order: number
  is_preview: boolean
  slug: string | null
}

interface Resource {
  id: string
  lesson_id: string
  kind: 'video' | 'pdf' | 'image' | 'link' | 'audio' | 'zip'
  url: string
  mime: string | null
  duration_sec: number | null
}

export default function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { user } = useAuth()
  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [resources, setResources] = useState<Resource[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isCompleted, setIsCompleted] = useState(false)
  const [activeTab, setActiveTab] = useState<'video' | 'notes' | 'practice'>('video')
  const [resolvedParams, setResolvedParams] = useState<{ slug: string } | null>(null)

  const supabase = createClient()

  const { canAccess } = useCourseAccess('cbse-math-10')

  // Resolve params
  useEffect(() => {
    params.then(setResolvedParams)
  }, [params])

  useEffect(() => {
    if (!resolvedParams) return

    const fetchLesson = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Fetch lesson by slug
        const { data: lessonData, error: lessonError } = await supabase
          .from('lessons')
          .select('*')
          .eq('slug', resolvedParams.slug)
          .single()

        if (lessonError) {
          throw lessonError
        }

        setLesson(lessonData)

        // Fetch resources for this lesson
        const { data: resourcesData, error: resourcesError } = await supabase
          .from('resources')
          .select('*')
          .eq('lesson_id', lessonData.id)

        if (resourcesError) {
          console.error('Error fetching resources:', resourcesError)
        } else {
          setResources(resourcesData || [])
        }

      } catch (err) {
        console.error('Error fetching lesson:', err)
        setError('Failed to load lesson')
      } finally {
        setIsLoading(false)
      }
    }

    fetchLesson()
  }, [resolvedParams, supabase])

  const handleMarkComplete = async () => {
    if (!user || !lesson) return

    try {
      // In a real app, you'd save progress to a progress table
      setIsCompleted(true)
      // You could also update the UI to show progress
    } catch (err) {
      console.error('Error marking lesson complete:', err)
    }
  }

  const getVideoResource = () => {
    return resources.find(r => r.kind === 'video')
  }

  const getPdfResources = () => {
    return resources.filter(r => r.kind === 'pdf')
  }

  const formatDuration = (seconds: number | null) => {
    if (!seconds) return '00:00'
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

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
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Lesson not found</p>
          <Link href="/courses/cbse/mathematics/class-10">
            <Button>Back to Course</Button>
          </Link>
        </div>
      </div>
    )
  }

  if (!canAccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-[#1e293b] mb-2">Course Access Required</h3>
          <p className="text-muted-foreground mb-4">
            You need to enroll in this course to access its content.
          </p>
          <Link href="/courses/cbse/mathematics/class-10">
            <Button className="bg-[#e27447] hover:bg-[#e27447]/90">
              Enroll Now
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="mb-8">
          <Link 
            href="/courses/cbse/mathematics/class-10" 
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Course
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Lesson Header */}
            <div className="bg-white rounded-sm border border-[#feefea] p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <Badge className="bg-[#e27447] text-white mb-2">
                    Lesson {lesson.lesson_order}
                  </Badge>
                  <h1 className="text-2xl font-bold text-[#1e293b] mb-2">
                    {lesson.title}
                  </h1>
                  <p className="text-muted-foreground">
                    {lesson.content}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">30 min</span>
                </div>
              </div>
            </div>

            {/* Content Tabs */}
            <div className="bg-white rounded-sm border border-[#feefea] mb-6">
              <div className="border-b border-[#feefea]">
                <div className="flex">
                  <button
                    onClick={() => setActiveTab('video')}
                    className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === 'video'
                        ? 'border-[#e27447] text-[#e27447]'
                        : 'border-transparent text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Play className="w-4 h-4 inline mr-2" />
                    Video
                  </button>
                  <button
                    onClick={() => setActiveTab('notes')}
                    className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === 'notes'
                        ? 'border-[#e27447] text-[#e27447]'
                        : 'border-transparent text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <FileText className="w-4 h-4 inline mr-2" />
                    Notes
                  </button>
                  <button
                    onClick={() => setActiveTab('practice')}
                    className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === 'practice'
                        ? 'border-[#e27447] text-[#e27447]'
                        : 'border-transparent text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <CheckCircle className="w-4 h-4 inline mr-2" />
                    Practice
                  </button>
                </div>
              </div>

              <div className="p-6">
                {activeTab === 'video' && (
                  <div>
                    {getVideoResource() ? (
                      <div className="aspect-video bg-black rounded-sm flex items-center justify-center">
                        <div className="text-center text-white">
                          <Play className="w-16 h-16 mx-auto mb-4" />
                          <p>Video content would be embedded here</p>
                          <p className="text-sm text-gray-400 mt-2">
                            Duration: {formatDuration(getVideoResource()?.duration_sec || null)}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Play className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">No video content available</p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'notes' && (
                  <div>
                    <div className="prose max-w-none">
                      <h3>Lesson Notes</h3>
                      <p>{lesson.content}</p>
                      
                      {/* Additional content based on lesson title */}
                      {lesson.title.toLowerCase().includes('real numbers') && (
                        <div>
                          <h4>Key Concepts:</h4>
                          <ul>
                            <li>Real numbers include all rational and irrational numbers</li>
                            <li>Every real number can be represented on the number line</li>
                            <li>Real numbers are closed under addition, subtraction, multiplication, and division</li>
                          </ul>
                          
                          <h4>Important Formulas:</h4>
                          <ul>
                            <li>For any two positive integers a and b, there exist unique integers q and r such that a = bq + r, where 0 &le; r &lt; b</li>
                          </ul>
                        </div>
                      )}

                      {lesson.title.toLowerCase().includes('polynomial') && (
                        <div>
                          <h4>Key Concepts:</h4>
                          <ul>
                            <li>A polynomial is an expression with variables and coefficients</li>
                            <li>The degree of a polynomial is the highest power of the variable</li>
                            <li>Zeroes of a polynomial are the values of x for which p(x) = 0</li>
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* PDF Resources */}
                    {getPdfResources().length > 0 && (
                      <div className="mt-6">
                        <h4 className="font-semibold mb-3">Additional Resources:</h4>
                        <div className="space-y-2">
                          {getPdfResources().map((resource) => (
                            <div key={resource.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-sm">
                              <div className="flex items-center">
                                <FileText className="w-4 h-4 text-[#e27447] mr-2" />
                                <span className="text-sm">Lesson Notes PDF</span>
                              </div>
                              <Button size="sm" variant="outline">
                                <Download className="w-4 h-4 mr-1" />
                                Download
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Test PDF File */}
                    {lesson.title.toLowerCase().includes('real numbers') && (
                      <div className="mt-6">
                        <h4 className="font-semibold mb-3">Previous Year Questions:</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-sm">
                            <div className="flex items-center">
                              <FileText className="w-4 h-4 text-[#e27447] mr-2" />
                              <span className="text-sm">IBDP Maths PYQs Marking Scheme - AAHL November 2023 Paper 1 TZ2</span>
                            </div>
                            <a 
                              href="https://shrividhyaclasses.b-cdn.net/ibdp_previous_year_questions/AAHL/2023/November/sv_ibdp_maths_pyqs_marking_scheme_aahl_november2023_paper1_tz2.pdf"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Button size="sm" variant="outline">
                                <Download className="w-4 h-4 mr-1" />
                                View PDF
                              </Button>
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'practice' && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Practice Problems</h3>
                    
                    {/* Sample practice problems based on lesson */}
                    {lesson.title.toLowerCase().includes('real numbers') && (
                      <div className="space-y-4">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Question 1</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="mb-3">Use Euclid&apos;s division algorithm to find the HCF of 135 and 225.</p>
                            <div className="bg-gray-50 p-3 rounded-sm">
                              <p className="text-sm text-muted-foreground">Solution:</p>
                              <p className="text-sm">225 = 135 × 1 + 90</p>
                              <p className="text-sm">135 = 90 × 1 + 45</p>
                              <p className="text-sm">90 = 45 × 2 + 0</p>
                              <p className="text-sm font-medium">Therefore, HCF(135, 225) = 45</p>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Question 2</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="mb-3">Show that any positive odd integer is of the form 6q + 1, or 6q + 3, or 6q + 5, where q is some integer.</p>
                            <Button variant="outline" size="sm">View Solution</Button>
                          </CardContent>
                        </Card>
                      </div>
                    )}

                    {lesson.title.toLowerCase().includes('polynomial') && (
                      <div className="space-y-4">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Question 1</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="mb-3">Find the zeroes of the polynomial p(x) = x² - 3x + 2.</p>
                            <div className="bg-gray-50 p-3 rounded-sm">
                              <p className="text-sm text-muted-foreground">Solution:</p>
                              <p className="text-sm">p(x) = x² - 3x + 2 = (x - 1)(x - 2)</p>
                              <p className="text-sm">Therefore, zeroes are x = 1 and x = 2</p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    )}

                    {!lesson.title.toLowerCase().includes('real numbers') && !lesson.title.toLowerCase().includes('polynomial') && (
                      <div className="text-center py-8">
                        <CheckCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">Practice problems will be available soon</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Mark Complete Button */}
            <div className="text-center">
              <Button 
                onClick={handleMarkComplete}
                disabled={isCompleted}
                className="bg-[#e27447] hover:bg-[#e27447]/90"
              >
                {isCompleted ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Completed
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark as Complete
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-[#feefea]">
              <CardHeader>
                <CardTitle className="text-lg">Course Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Overall Progress</span>
                      <span>25%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-[#e27447] h-2 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    <p>• 15 of 59 lessons completed</p>
                    <p>• Current chapter: Real Numbers</p>
                    <p>• Next lesson: Euclid&apos;s Division Lemma</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
