"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { 
  BookOpen, 
  Play, 
  FileText, 
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Clock,
  Lock,
  Unlock,
  Download,
  Share2,
  Bookmark,
  MessageCircle
} from 'lucide-react'
import { CompletionDot } from '@/components/ui/template-status'

export default function LessonTemplate() {
  const [activeTab, setActiveTab] = useState<'video' | 'notes' | 'practice'>('video')
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [completedLessons, setCompletedLessons] = useState([1, 2, 3])

  // Mock data for the template
  const lesson = {
    id: '1',
    title: 'Introduction to Quadratic Equations',
    content: 'Learn the fundamentals of quadratic equations, their properties, and how to solve them using various methods including factoring, completing the square, and the quadratic formula.',
    lesson_order: 4,
    duration: '45 min',
    is_preview: false,
    course_title: 'CBSE Mathematics Class 10'
  }

  const lessons = [
    { id: '1', title: 'Introduction to Algebra', order: 1, completed: true, duration: '30 min' },
    { id: '2', title: 'Linear Equations', order: 2, completed: true, duration: '35 min' },
    { id: '3', title: 'Polynomials', order: 3, completed: true, duration: '40 min' },
    { id: '4', title: 'Introduction to Quadratic Equations', order: 4, completed: false, duration: '45 min', current: true },
    { id: '5', title: 'Factoring Quadratic Equations', order: 5, completed: false, duration: '50 min' },
    { id: '6', title: 'Quadratic Formula', order: 6, completed: false, duration: '55 min' },
    { id: '7', title: 'Applications of Quadratic Equations', order: 7, completed: false, duration: '60 min' }
  ]

  const practiceQuestions = [
    {
      id: 1,
      question: "Solve the quadratic equation: x² - 5x + 6 = 0",
      type: "multiple_choice",
      options: ["x = 2, x = 3", "x = 1, x = 6", "x = -2, x = -3", "x = 0, x = 5"],
      correct: 0
    },
    {
      id: 2,
      question: "What is the discriminant of the equation 2x² - 4x + 1 = 0?",
      type: "multiple_choice",
      options: ["8", "0", "-8", "16"],
      correct: 0
    },
    {
      id: 3,
      question: "Explain the difference between a quadratic equation and a linear equation.",
      type: "text",
      placeholder: "Type your answer here..."
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header with completion indicator */}
      <div className="bg-gradient-to-br from-[#feefea] to-[#fffefd] border-b border-[#e27447] py-6 relative">
        <CompletionDot isCompleted={true} />
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                href="/templates/course-templates" 
                className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Course Templates
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsBookmarked(!isBookmarked)}
                className="rounded-sm"
              >
                <Bookmark className={`w-4 h-4 mr-2 ${isBookmarked ? 'fill-current' : ''}`} />
                {isBookmarked ? 'Bookmarked' : 'Bookmark'}
              </Button>
              <Button variant="outline" size="sm" className="rounded-sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Course Breadcrumb */}
        <div className="mb-6">
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link href="/templates/course-templates" className="hover:text-foreground">Course Templates</Link>
            <span>/</span>
            <span className="text-foreground">{lesson.course_title}</span>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Lesson Header */}
            <div className="bg-white rounded-sm border border-[#feefea] p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <Badge className="bg-[#e27447] text-white mb-2 rounded-sm">
                    Lesson {lesson.lesson_order}
                  </Badge>
                  <h1 className="text-3xl font-bold text-[#1e293b] mb-2">
                    {lesson.title}
                  </h1>
                  <p className="text-muted-foreground text-lg">
                    {lesson.content}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Unlock className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-600">Unlocked</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Tabs */}
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "video" | "practice" | "notes")} className="w-full">
              <TabsList className="grid w-full grid-cols-3 rounded-sm bg-[#feefea] p-1">
                <TabsTrigger 
                  value="video" 
                  className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white data-[state=active]:shadow-sm font-medium transition-all duration-200"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Video
                </TabsTrigger>
                <TabsTrigger 
                  value="notes" 
                  className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white data-[state=active]:shadow-sm font-medium transition-all duration-200"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Notes
                </TabsTrigger>
                <TabsTrigger 
                  value="practice" 
                  className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white data-[state=active]:shadow-sm font-medium transition-all duration-200"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Practice
                </TabsTrigger>
              </TabsList>

              {/* Video Tab */}
              <TabsContent value="video" className="mt-6">
                <Card className="rounded-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Play className="w-5 h-5 text-[#e27447]" />
                      <span>Video Lesson</span>
                    </CardTitle>
                    <CardDescription>
                      Watch the complete lesson video with explanations and examples
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-sm flex items-center justify-center relative overflow-hidden">
                      <div className="text-center">
                        <div className="w-20 h-20 bg-[#e27447] rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-[#e27447]/90 transition-colors cursor-pointer">
                          <Play className="w-8 h-8 text-white ml-1" />
                        </div>
                        <h3 className="text-lg font-semibold text-[#1e293b] mb-2">
                          {lesson.title}
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          Click to start the video lesson
                        </p>
                        <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                          <span className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{lesson.duration}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <FileText className="w-4 h-4" />
                            <span>HD Quality</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Video Controls */}
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Button variant="outline" size="sm" className="rounded-sm">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-sm">
                          <Share2 className="w-4 h-4 mr-2" />
                          Share Video
                        </Button>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button className="bg-[#e27447] hover:bg-[#e27447]/90 rounded-sm">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Mark as Complete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Notes Tab */}
              <TabsContent value="notes" className="mt-6">
                <Card className="rounded-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="w-5 h-5 text-[#e27447]" />
                      <span>Lesson Notes</span>
                    </CardTitle>
                    <CardDescription>
                      Comprehensive notes and key concepts from this lesson
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Key Concepts */}
                    <div>
                      <h3 className="text-lg font-semibold text-[#1e293b] mb-3">Key Concepts</h3>
                      <div className="bg-[#feefea] p-4 rounded-sm">
                        <ul className="space-y-2 text-[#1e293b]">
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-[#e27447] mt-0.5 flex-shrink-0" />
                            <span>Understanding quadratic equations and their standard form</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-[#e27447] mt-0.5 flex-shrink-0" />
                            <span>Methods for solving quadratic equations</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-[#e27447] mt-0.5 flex-shrink-0" />
                            <span>Discriminant and its role in determining solutions</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-[#e27447] mt-0.5 flex-shrink-0" />
                            <span>Real-world applications of quadratic equations</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Detailed Notes */}
                    <div>
                      <h3 className="text-lg font-semibold text-[#1e293b] mb-3">Detailed Notes</h3>
                      <div className="prose prose-sm max-w-none">
                        <h4 className="text-[#1e293b] font-semibold mb-2">What are Quadratic Equations?</h4>
                        <p className="text-muted-foreground mb-4">
                          A quadratic equation is a polynomial equation of degree 2. The general form is:
                        </p>
                        <div className="bg-gray-50 p-4 rounded-sm mb-4">
                          <code className="text-[#1e293b] font-mono">ax² + bx + c = 0</code>
                        </div>
                        <p className="text-muted-foreground mb-4">
                          Where a, b, and c are constants, and a ≠ 0.
                        </p>

                        <h4 className="text-[#1e293b] font-semibold mb-2">Methods to Solve Quadratic Equations</h4>
                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                          <li><strong>Factoring:</strong> Express the equation as a product of two binomials</li>
                          <li><strong>Completing the Square:</strong> Transform the equation into perfect square form</li>
                          <li><strong>Quadratic Formula:</strong> Use the formula x = (-b ± √(b²-4ac)) / 2a</li>
                        </ol>

                        <h4 className="text-[#1e293b] font-semibold mb-2">Example Problem</h4>
                        <div className="bg-[#feefea] p-4 rounded-sm">
                          <p className="text-[#1e293b] font-medium mb-2">Solve: x² - 5x + 6 = 0</p>
                          <p className="text-muted-foreground mb-2">By factoring: (x - 2)(x - 3) = 0</p>
                          <p className="text-muted-foreground">Therefore: x = 2 or x = 3</p>
                        </div>
                      </div>
                    </div>

                    {/* Additional Resources */}
                    <div>
                      <h3 className="text-lg font-semibold text-[#1e293b] mb-3">Additional Resources</h3>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full justify-start rounded-sm">
                          <FileText className="w-4 h-4 mr-2" />
                          Download PDF Notes
                        </Button>
                        <Button variant="outline" className="w-full justify-start rounded-sm">
                          <BookOpen className="w-4 h-4 mr-2" />
                          Reference Materials
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Practice Tab */}
              <TabsContent value="practice" className="mt-6">
                <Card className="rounded-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BookOpen className="w-5 h-5 text-[#e27447]" />
                      <span>Practice Exercises</span>
                    </CardTitle>
                    <CardDescription>
                      Test your understanding with these practice questions
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {practiceQuestions.map((question, index) => (
                      <div key={question.id} className="border border-[#feefea] rounded-sm p-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-[#e27447] text-white rounded-sm flex items-center justify-center text-sm font-medium flex-shrink-0">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-[#1e293b] mb-3">
                              {question.question}
                            </h4>
                            
                            {question.type === 'multiple_choice' ? (
                              <div className="space-y-2">
                                {question.options?.map((option, optionIndex) => (
                                  <label key={optionIndex} className="flex items-center space-x-2 cursor-pointer">
                                    <input 
                                      type="radio" 
                                      name={`question-${question.id}`}
                                      className="text-[#e27447] focus:ring-[#e27447]"
                                    />
                                    <span className="text-muted-foreground">{option}</span>
                                  </label>
                                ))}
                              </div>
                            ) : (
                              <textarea
                                placeholder={question.placeholder}
                                className="w-full p-3 border border-[#feefea] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#e27447] focus:border-[#e27447] resize-none"
                                rows={4}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="flex items-center justify-between pt-4 border-t border-[#feefea]">
                      <Button variant="outline" className="rounded-sm">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Ask a Question
                      </Button>
                      <Button className="bg-[#e27447] hover:bg-[#e27447]/90 rounded-sm">
                        Submit Answers
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <Button variant="outline" className="rounded-sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous Lesson
              </Button>
              <Button className="bg-[#e27447] hover:bg-[#e27447]/90 rounded-sm">
                Next Lesson
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Course Progress */}
              <Card className="rounded-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Course Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Overall Progress</span>
                        <span className="text-[#1e293b] font-medium">57%</span>
                      </div>
                      <Progress value={57} className="h-2" />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span className="text-[#1e293b] font-medium">4</span> of 7 lessons completed
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Lesson List */}
              <Card className="rounded-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Course Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {lessons.map((lessonItem) => (
                      <div
                        key={lessonItem.id}
                        className={`flex items-center justify-between p-3 rounded-sm border transition-colors cursor-pointer ${
                          lessonItem.current 
                            ? 'border-[#e27447] bg-[#feefea]' 
                            : 'border-[#feefea] hover:border-[#e27447] hover:bg-[#feefea]/50'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-sm flex items-center justify-center text-sm font-medium ${
                            lessonItem.completed 
                              ? 'bg-green-500 text-white' 
                              : lessonItem.current 
                                ? 'bg-[#e27447] text-white' 
                                : 'bg-gray-200 text-gray-600'
                          }`}>
                            {lessonItem.completed ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : (
                              lessonItem.order
                            )}
                          </div>
                          <div>
                            <h4 className={`text-sm font-medium ${
                              lessonItem.current ? 'text-[#1e293b]' : 'text-muted-foreground'
                            }`}>
                              {lessonItem.title}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              {lessonItem.duration}
                            </p>
                          </div>
                        </div>
                        {lessonItem.completed && (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="rounded-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start rounded-sm">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Course Overview
                  </Button>
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
        </div>
      </div>
    </div>
  )
}
