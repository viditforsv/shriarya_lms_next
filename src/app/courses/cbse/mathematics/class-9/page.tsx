"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, ArrowLeft, Play, FileText, CheckCircle, Clock } from "lucide-react"

// Force dynamic rendering to prevent static generation issues
export const dynamic = 'force-dynamic'

export default function Class9MathematicsPage() {
  const topics = [
    {
      id: "algebra",
      name: "Algebra",
      description: "Fundamental algebraic concepts and operations",
      lessons: 12,
      duration: "8 hours",
      completed: 0,
      icon: <BookOpen className="w-6 h-6" />,
      color: "bg-blue-500",
      href: "/courses/cbse/mathematics/class-9/algebra"
    },
    {
      id: "geometry",
      name: "Geometry",
      description: "Euclidean geometry, lines, angles, and triangles",
      lessons: 15,
      duration: "10 hours",
      completed: 0,
      icon: <BookOpen className="w-6 h-6" />,
      color: "bg-green-500",
      href: "/courses/cbse/mathematics/class-9/geometry"
    },
    {
      id: "mensuration",
      name: "Mensuration",
      description: "Area, perimeter, and volume calculations",
      lessons: 8,
      duration: "6 hours",
      completed: 0,
      icon: <BookOpen className="w-6 h-6" />,
      color: "bg-purple-500",
      href: "/courses/cbse/mathematics/class-9/mensuration"
    },
    {
      id: "statistics",
      name: "Statistics",
      description: "Data collection, representation, and analysis",
      lessons: 6,
      duration: "4 hours",
      completed: 0,
      icon: <BookOpen className="w-6 h-6" />,
      color: "bg-orange-500",
      href: "/courses/cbse/mathematics/class-9/statistics"
    },
    {
      id: "probability",
      name: "Probability",
      description: "Basic probability concepts and calculations",
      lessons: 4,
      duration: "3 hours",
      completed: 0,
      icon: <BookOpen className="w-6 h-6" />,
      color: "bg-red-500",
      href: "/courses/cbse/mathematics/class-9/probability"
    }
  ]

  const recentLessons = [
    {
      id: 1,
      title: "Introduction to Algebraic Expressions",
      duration: "45 min",
      type: "video",
      completed: false
    },
    {
      id: 2,
      title: "Solving Linear Equations",
      duration: "60 min",
      type: "interactive",
      completed: false
    },
    {
      id: 3,
      title: "Algebra Practice Problems",
      duration: "30 min",
      type: "quiz",
      completed: false
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/courses/cbse/mathematics" 
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to CBSE Mathematics
          </Link>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-blue-500 text-white p-3 rounded-sm mr-4">
                <BookOpen className="w-12 h-12" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-foreground">Class 9 Mathematics</h1>
                <p className="text-lg text-muted-foreground">CBSE Foundation Course</p>
              </div>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Build a strong foundation in mathematics with comprehensive coverage of algebra, geometry, 
              mensuration, statistics, and probability. Perfect for CBSE Class 9 students.
            </p>
          </div>
        </div>

        {/* Course Progress */}
        <div className="bg-card p-6 rounded-sm border mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">Course Progress</h2>
            <span className="text-sm text-muted-foreground">0% Complete</span>
          </div>
          <div className="w-full bg-muted rounded-sm h-2">
            <div className="bg-blue-500 h-2 rounded-sm" style={{width: '0%'}}></div>
          </div>
          <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
            <span>0 of 45 lessons completed</span>
            <span>0 of 31 hours completed</span>
          </div>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {topics.map((topic) => (
            <Link key={topic.id} href={topic.href}>
              <Card className="hover:shadow-xl transition-all duration-500 cursor-pointer group">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4">
                    <div className={`${topic.color} text-white p-3 rounded-sm group-hover:scale-110 transition-transform duration-200`}>
                      {topic.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{topic.name}</CardTitle>
                      <CardDescription className="text-sm">{topic.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Lessons:</span>
                      <span className="font-medium">{topic.lessons}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="font-medium">{topic.duration}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress:</span>
                      <span className="font-medium">{topic.completed}/{topic.lessons}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Recent Lessons */}
        <div className="bg-card p-6 rounded-sm border mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">Recent Lessons</h2>
          <div className="space-y-3">
            {recentLessons.map((lesson) => (
              <div key={lesson.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-sm">
                <div className="flex items-center space-x-3">
                  <div className="text-muted-foreground">
                    {lesson.type === 'video' && <Play className="w-4 h-4" />}
                    {lesson.type === 'interactive' && <FileText className="w-4 h-4" />}
                    {lesson.type === 'quiz' && <CheckCircle className="w-4 h-4" />}
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{lesson.title}</h3>
                    <p className="text-sm text-muted-foreground">{lesson.type}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{lesson.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Course Features */}
        <div className="bg-card p-8 rounded-sm border">
          <h2 className="text-2xl font-bold text-foreground mb-6">Class 9 Mathematics Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Learning Resources</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• <strong>Video Lessons:</strong> Clear explanations with examples</li>
                <li>• <strong>Practice Problems:</strong> Extensive question bank</li>
                <li>• <strong>Interactive Quizzes:</strong> Test your understanding</li>
                <li>• <strong>Study Notes:</strong> Comprehensive summaries</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Assessment & Progress</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• <strong>Chapter Tests:</strong> Regular assessments</li>
                <li>• <strong>Progress Tracking:</strong> Monitor your learning</li>
                <li>• <strong>Performance Analytics:</strong> Detailed insights</li>
                <li>• <strong>Certificate:</strong> Course completion certificate</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
