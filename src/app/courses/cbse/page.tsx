"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, BookOpen, Calculator, Users, Award, Clock, Users2 } from "lucide-react"

// Force dynamic rendering to prevent static generation issues
export const dynamic = 'force-dynamic'

export default function CBSECoursesPage() {
  const gradeLevels = [
    {
      id: "class-9",
      name: "Class 9",
      description: "Foundation mathematics with algebra, geometry, and basic trigonometry",
      topics: ["Algebra", "Geometry", "Mensuration", "Statistics", "Probability"],
      icon: <BookOpen className="w-8 h-8" />,
      color: "bg-[#1e293b]",
      href: "/courses/cbse/mathematics/class-9",
      features: ["Foundation Concepts", "Basic Problem Solving", "Visual Learning"],
      duration: "1 Year",
      lessons: "120+"
    },
    {
      id: "class-10",
      name: "Class 10",
      description: "Board exam preparation with advanced concepts and problem-solving",
      topics: ["Real Numbers", "Polynomials", "Quadratic Equations", "Trigonometry", "Coordinate Geometry"],
      icon: <Calculator className="w-8 h-8" />,
      color: "bg-[#1e293b]",
      href: "/courses/cbse/mathematics/class-10",
      features: ["Board Exam Prep", "Advanced Concepts", "Practice Tests"],
      duration: "1 Year",
      lessons: "150+"
    },
    {
      id: "class-11",
      name: "Class 11",
      description: "Higher secondary mathematics with calculus and advanced algebra",
      topics: ["Sets", "Relations", "Functions", "Trigonometry", "Complex Numbers"],
      icon: <Users className="w-8 h-8" />,
      color: "bg-[#1e293b]",
      href: "/courses/cbse/mathematics/class-11",
      features: ["Higher Secondary", "Advanced Algebra", "Concept Building"],
      duration: "1 Year",
      lessons: "180+"
    },
    {
      id: "class-12",
      name: "Class 12",
      description: "Advanced mathematics with calculus, vectors, and 3D geometry",
      topics: ["Calculus", "Vectors", "3D Geometry", "Linear Programming", "Probability"],
      icon: <Award className="w-8 h-8" />,
      color: "bg-[#e27447]",
      href: "/courses/cbse/mathematics/class-12",
      features: ["Advanced Calculus", "University Prep", "Competitive Exams"],
      duration: "1 Year",
      lessons: "200+"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#feefea] via-[#fffefd] to-[#feefea] border-b border-[#feefea]">
        <div className="max-w-6xl mx-auto px-8 py-16">
          <div className="mb-8">
            <Link 
              href="/courses" 
              className="inline-flex items-center text-[#1e293b] hover:text-[#e27447] transition-colors mb-6 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Courses
            </Link>
          </div>
          
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <div className="mr-6">
                <Image 
                  src="/images/CBSE Logo.svg" 
                  alt="CBSE Logo" 
                  width={60}
                  height={60}
                  className="object-contain"
                />
              </div>
              <div>
                <h1 className="text-5xl font-bold text-[#1e293b] mb-2">CBSE Mathematics</h1>
                <p className="text-xl text-[#1e293b] opacity-80">Central Board of Secondary Education</p>
              </div>
            </div>
            <p className="text-lg text-[#1e293b] leading-relaxed">
              Comprehensive mathematics curriculum following CBSE guidelines with practical applications, 
              problem-solving strategies, and board exam preparation for Classes 9-12.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-[#1e293b]">
              <div className="flex items-center gap-2">
                <Users2 className="w-4 h-4" />
                <span>50K+ Students</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>4 Year Program</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>650+ Lessons</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-16">
        {/* Grade Levels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {gradeLevels.map((grade) => (
            <Card key={grade.id} className="group hover:shadow-xl transition-all duration-500 cursor-pointer border border-[#feefea] hover:border-[#e27447]">
              <Link href={grade.href} className="block">
                <CardHeader className="pb-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`${grade.color} text-white p-4 rounded-sm group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      {grade.icon}
                    </div>
                  </div>
                  <div>
                    <CardTitle className="text-2xl mb-2 group-hover:text-[#e27447] transition-colors">
                      {grade.name}
                    </CardTitle>
                    <CardDescription className="text-base text-[#1e293b] mb-3">
                      {grade.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Features */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm text-[#1e293b]">Key Features:</h4>
                    <div className="flex flex-wrap gap-2">
                      {grade.features.map((feature, index) => (
                        <Badge 
                          key={index}
                          variant="outline" 
                          className="text-xs px-2 py-1 bg-[#fffefd] border-[#feefea] text-[#1e293b]"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Topics */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm text-[#1e293b]">Key Topics:</h4>
                    <div className="flex flex-wrap gap-2">
                      {grade.topics.slice(0, 3).map((topic, index) => (
                        <span 
                          key={index}
                          className="text-xs bg-[#e27447]/10 text-[#e27447] px-3 py-1 rounded-sm font-medium"
                        >
                          {topic}
                        </span>
                      ))}
                      {grade.topics.length > 3 && (
                        <span className="text-xs bg-[#e27447]/10 text-[#e27447] px-3 py-1 rounded-sm font-medium">
                          +{grade.topics.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between pt-4 border-t border-[#feefea]">
                    <div className="flex items-center gap-4 text-sm text-[#1e293b]">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{grade.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        <span>{grade.lessons}</span>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="group-hover:bg-[#e27447] group-hover:text-white group-hover:border-[#e27447] transition-all duration-300"
                    >
                      Explore
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-[#e27447]/10 to-[#e27447]/5 p-12 rounded-sm border border-[#feefea]">
            <h2 className="text-3xl font-bold text-[#1e293b] mb-4">
              Ready to Start Your CBSE Mathematics Journey?
            </h2>
            <p className="text-lg text-[#1e293b] mb-8 max-w-2xl mx-auto">
              Choose your class level and begin building strong mathematical foundations 
              with our comprehensive CBSE curriculum.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/courses/cbse/mathematics/class-9">
                <Button size="lg" className="px-8 py-3 text-lg bg-[#e27447] hover:bg-[#e27447]/90">
                  Start with Class 9
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/courses">
                <Button size="lg" variant="outline" className="px-8 py-3 text-lg border-[#feefea] hover:bg-[#fffefd]">
                  View Other Boards
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
