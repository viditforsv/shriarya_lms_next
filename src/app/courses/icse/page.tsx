"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, ArrowLeft, Calculator, Users, Award } from "lucide-react"

// Force dynamic rendering to prevent static generation issues
export const dynamic = 'force-dynamic'

export default function ICSECoursesPage() {
  const gradeLevels = [
    {
      id: "class-9",
      name: "Class 9",
      description: "Foundation mathematics with analytical thinking",
      topics: ["Algebra", "Geometry", "Mensuration", "Statistics", "Probability"],
      icon: <Calculator className="w-8 h-8" />,
      color: "bg-green-500",
      href: "/courses/icse/mathematics/class-9"
    },
    {
      id: "class-10",
      name: "Class 10",
      description: "Board exam preparation with advanced concepts",
      topics: ["Real Numbers", "Polynomials", "Quadratic Equations", "Trigonometry", "Coordinate Geometry"],
      icon: <Users className="w-8 h-8" />,
      color: "bg-blue-500",
      href: "/courses/icse/mathematics/class-10"
    },
    {
      id: "class-11",
      name: "Class 11",
      description: "Higher secondary with calculus and algebra",
      topics: ["Sets", "Relations", "Functions", "Trigonometry", "Complex Numbers"],
      icon: <Award className="w-8 h-8" />,
      color: "bg-purple-500",
      href: "/courses/icse/mathematics/class-11"
    },
    {
      id: "class-12",
      name: "Class 12",
      description: "Advanced mathematics with calculus and vectors",
      topics: ["Calculus", "Vectors", "3D Geometry", "Linear Programming", "Probability"],
      icon: <GraduationCap className="w-8 h-8" />,
      color: "bg-orange-500",
      href: "/courses/icse/mathematics/class-12"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/courses" 
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Courses
          </Link>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-green-500 text-white p-3 rounded-sm mr-4">
                <GraduationCap className="w-12 h-12" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-foreground">ICSE Mathematics</h1>
                <p className="text-lg text-muted-foreground">Indian Certificate of Secondary Education</p>
              </div>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Rigorous mathematics curriculum with emphasis on analytical thinking, problem-solving, 
              and comprehensive understanding of mathematical concepts.
            </p>
          </div>
        </div>

        {/* Grade Levels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {gradeLevels.map((grade) => (
            <Link key={grade.id} href={grade.href}>
              <Card className="hover:shadow-xl transition-all duration-500 cursor-pointer group">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4">
                    <div className={`${grade.color} text-white p-3 rounded-sm group-hover:scale-110 transition-transform duration-200`}>
                      {grade.icon}
                    </div>
                    <div>
                      <CardTitle className="text-xl">{grade.name}</CardTitle>
                      <CardDescription className="text-sm">{grade.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm text-foreground">Key Topics:</h4>
                    <div className="flex flex-wrap gap-2">
                      {grade.topics.map((topic, index) => (
                        <span 
                          key={index}
                          className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-sm"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* ICSE Features */}
        <div className="bg-card p-8 rounded-sm border">
          <h2 className="text-2xl font-bold text-foreground mb-6">ICSE Mathematics Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Curriculum Highlights</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• <strong>Analytical Thinking:</strong> Focus on logical reasoning</li>
                <li>• <strong>Comprehensive Coverage:</strong> Detailed topic exploration</li>
                <li>• <strong>Problem Solving:</strong> Extensive practice exercises</li>
                <li>• <strong>Concept Clarity:</strong> In-depth explanations</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Learning Approach</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• <strong>Interactive Lessons:</strong> Engaging learning experience</li>
                <li>• <strong>Regular Assessments:</strong> Progress monitoring</li>
                <li>• <strong>Expert Guidance:</strong> Qualified mathematics teachers</li>
                <li>• <strong>Board Preparation:</strong> Exam-focused learning</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
