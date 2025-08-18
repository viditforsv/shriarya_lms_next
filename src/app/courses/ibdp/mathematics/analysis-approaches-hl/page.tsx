"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Brain, ArrowLeft, BookOpen, Calculator, BarChart3, Target, Clock, Users2, Star } from "lucide-react"

// Force dynamic rendering to prevent static generation issues
export const dynamic = 'force-dynamic'

export default function AnalysisApproachesHLPage() {
  const topics = [
    {
      id: "functions",
      name: "Functions",
      description: "Advanced function theory, transformations, and modeling",
      lessons: 18,
      duration: "12 hours",
      completed: 0,
      icon: <Calculator className="w-6 h-6" />,
      color: "bg-blue-600",
      href: "/courses/ibdp/mathematics/analysis-approaches-hl/functions",
      subtopics: ["Domain & Range", "Transformations", "Inverse Functions", "Composite Functions", "Modeling"]
    },
    {
      id: "calculus",
      name: "Calculus",
      description: "Differential and integral calculus with applications",
      lessons: 24,
      duration: "16 hours",
      completed: 0,
      icon: <Brain className="w-6 h-6" />,
      color: "bg-purple-600",
      href: "/courses/ibdp/mathematics/analysis-approaches-hl/calculus",
      subtopics: ["Limits", "Differentiation", "Integration", "Applications", "Differential Equations"]
    },
    {
      id: "statistics",
      name: "Statistics",
      description: "Advanced statistical analysis and probability",
      lessons: 16,
      duration: "10 hours",
      completed: 0,
      icon: <BarChart3 className="w-6 h-6" />,
      color: "bg-green-600",
      href: "/courses/ibdp/mathematics/analysis-approaches-hl/statistics",
      subtopics: ["Probability Distributions", "Hypothesis Testing", "Confidence Intervals", "Regression", "Chi-Square Tests"]
    },
    {
      id: "complex-numbers",
      name: "Complex Numbers",
      description: "Complex number theory and applications",
      lessons: 12,
      duration: "8 hours",
      completed: 0,
      icon: <Target className="w-6 h-6" />,
      color: "bg-orange-600",
      href: "/courses/ibdp/mathematics/analysis-approaches-hl/complex-numbers",
      subtopics: ["Arithmetic", "Polar Form", "De Moivre's Theorem", "Roots", "Applications"]
    },
    {
      id: "vectors",
      name: "Vectors",
      description: "Vector algebra and geometric applications",
      lessons: 14,
      duration: "9 hours",
      completed: 0,
      icon: <BookOpen className="w-6 h-6" />,
      color: "bg-red-600",
      href: "/courses/ibdp/mathematics/analysis-approaches-hl/vectors",
      subtopics: ["Vector Operations", "Dot Product", "Cross Product", "Lines & Planes", "Applications"]
    }
  ]

  const recentLessons = [
    {
      id: 1,
      title: "Introduction to Function Transformations",
      duration: "60 min",
      type: "video",
      completed: false,
      difficulty: "Advanced"
    },
    {
      id: 2,
      title: "Limits and Continuity",
      duration: "75 min",
      type: "interactive",
      completed: false,
      difficulty: "Advanced"
    },
    {
      id: 3,
      title: "Probability Distribution Functions",
      duration: "45 min",
      type: "quiz",
      completed: false,
      difficulty: "Advanced"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/courses/ibdp/mathematics" 
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to IBDP Mathematics
          </Link>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-amber-600 text-white p-3 rounded-sm mr-4">
                <Brain className="w-12 h-12" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-foreground">Analysis & Approaches HL</h1>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <Badge variant="default" className="text-sm">Higher Level</Badge>
                  <Badge variant="secondary" className="text-sm">Advanced</Badge>
                </div>
              </div>
            </div>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              The most rigorous mathematics stream focusing on pure mathematics, analytical thinking, and proof-based learning. 
              Perfect for students pursuing mathematics, engineering, physics, or other quantitative fields at university.
            </p>
          </div>
        </div>

        {/* Course Overview */}
        <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-8 rounded-sm border border-amber-200 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-amber-800">84</div>
              <div className="text-sm text-amber-700">Total Lessons</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-800">55</div>
              <div className="text-sm text-amber-700">Hours of Content</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-800">2</div>
              <div className="text-sm text-amber-700">Years Duration</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-800">4.9</div>
              <div className="text-sm text-amber-700">Student Rating</div>
            </div>
          </div>
        </div>

        {/* Course Progress */}
        <div className="bg-card p-6 rounded-sm border mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">Course Progress</h2>
            <span className="text-sm text-muted-foreground">0% Complete</span>
          </div>
          <div className="w-full bg-muted rounded-sm h-2">
            <div className="bg-amber-600 h-2 rounded-sm" style={{width: '0%'}}></div>
          </div>
          <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
            <span>0 of 84 lessons completed</span>
            <span>0 of 55 hours completed</span>
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
                <CardContent className="space-y-4">
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
                  
                  {/* Subtopics */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-foreground">Key Subtopics:</h4>
                    <div className="flex flex-wrap gap-1">
                      {topic.subtopics.slice(0, 3).map((subtopic, index) => (
                        <span 
                          key={index}
                          className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-sm"
                        >
                          {subtopic}
                        </span>
                      ))}
                      {topic.subtopics.length > 3 && (
                        <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-sm">
                          +{topic.subtopics.length - 3} more
                        </span>
                      )}
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
                    {lesson.type === 'video' && <BookOpen className="w-4 h-4" />}
                    {lesson.type === 'interactive' && <Calculator className="w-4 h-4" />}
                    {lesson.type === 'quiz' && <Target className="w-4 h-4" />}
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{lesson.title}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{lesson.type}</span>
                      <Badge variant="outline" className="text-xs">{lesson.difficulty}</Badge>
                    </div>
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

        {/* HL Features */}
        <div className="bg-card p-8 rounded-sm border mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Analysis & Approaches HL Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Advanced Learning</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• <strong>Proof-Based Learning:</strong> Mathematical rigor and logical reasoning</li>
                <li>• <strong>Advanced Calculus:</strong> Deep understanding of limits and continuity</li>
                <li>• <strong>Complex Analysis:</strong> Complex number theory and applications</li>
                <li>• <strong>Vector Mathematics:</strong> Geometric and algebraic applications</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Assessment & Skills</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• <strong>Internal Assessment:</strong> Mathematical exploration project</li>
                <li>• <strong>Paper 1 & 2:</strong> No calculator and calculator papers</li>
                <li>• <strong>Paper 3:</strong> Problem-solving and proof-based questions</li>
                <li>• <strong>Technology Integration:</strong> Advanced calculator skills</li>
              </ul>
            </div>
          </div>
        </div>

        {/* University Preparation */}
        <div className="bg-gradient-to-r from-card to-card/80 p-8 rounded-sm border">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">University Preparation</h2>
          <div className="text-center mb-6">
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              This stream provides excellent preparation for university studies in mathematics, engineering, 
              physics, computer science, and other quantitative fields.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-muted/30 rounded-sm">
              <h3 className="font-semibold text-foreground mb-2">Mathematics</h3>
              <p className="text-sm text-muted-foreground">Pure mathematics, applied mathematics, statistics</p>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-sm">
              <h3 className="font-semibold text-foreground mb-2">Engineering</h3>
              <p className="text-sm text-muted-foreground">Mechanical, electrical, civil, aerospace</p>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-sm">
              <h3 className="font-semibold text-foreground mb-2">Physical Sciences</h3>
              <p className="text-sm text-muted-foreground">Physics, chemistry, astronomy, materials science</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
