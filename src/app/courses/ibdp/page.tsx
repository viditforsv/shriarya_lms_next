"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, ArrowLeft, Calculator, Brain, BarChart3, TrendingUp, BookOpen } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Force dynamic rendering to prevent static generation issues
export const dynamic = 'force-dynamic'

export default function IBDPCoursesPage() {
  const mathematicsStreams = [
    {
      id: "analysis-approaches-hl",
      name: "Analysis & Approaches HL",
      description: "Higher Level mathematics focusing on analytical thinking and rigorous mathematical analysis",
      topics: ["Functions", "Calculus", "Statistics", "Probability", "Complex Numbers", "Vectors"],
      icon: <Brain className="w-8 h-8" />,
      color: "bg-amber-600",
      href: "/courses/ibdp/mathematics/analysis-approaches-hl",
      level: "Higher Level",
      duration: "2 Years",
      difficulty: "Advanced",
      features: ["Rigorous Analysis", "Proof-Based Learning", "Advanced Calculus", "Mathematical Reasoning"]
    },
    {
      id: "analysis-approaches-sl",
      name: "Analysis & Approaches SL",
      description: "Standard Level mathematics with focus on analytical thinking and mathematical concepts",
      topics: ["Functions", "Calculus", "Statistics", "Probability", "Vectors"],
      icon: <Calculator className="w-8 h-8" />,
      color: "bg-amber-500",
      href: "/courses/ibdp/mathematics/analysis-approaches-sl",
      level: "Standard Level",
      duration: "2 Years",
      difficulty: "Intermediate",
      features: ["Analytical Thinking", "Core Calculus", "Statistical Analysis", "Problem Solving"]
    },
    {
      id: "applications-interpretation-hl",
      name: "Applications & Interpretation HL",
      description: "Higher Level mathematics emphasizing real-world applications and data interpretation",
      topics: ["Statistics", "Probability", "Functions", "Calculus", "Modelling", "Data Analysis"],
      icon: <BarChart3 className="w-8 h-8" />,
      color: "bg-emerald-600",
      href: "/courses/ibdp/mathematics/applications-interpretation-hl",
      level: "Higher Level",
      duration: "2 Years",
      difficulty: "Advanced",
      features: ["Real-World Applications", "Data Modelling", "Statistical Analysis", "Technology Integration"]
    },
    {
      id: "applications-interpretation-sl",
      name: "Applications & Interpretation SL",
      description: "Standard Level mathematics with focus on practical applications and data interpretation",
      topics: ["Statistics", "Probability", "Functions", "Modelling", "Data Analysis"],
      icon: <TrendingUp className="w-8 h-8" />,
      color: "bg-emerald-500",
      href: "/courses/ibdp/mathematics/applications-interpretation-sl",
      level: "Standard Level",
      duration: "2 Years",
      difficulty: "Intermediate",
      features: ["Practical Applications", "Data Analysis", "Statistical Thinking", "Real-World Problems"]
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
              <div className="bg-amber-600 text-white p-3 rounded-sm mr-4">
                <Award className="w-12 h-12" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-foreground">IBDP Mathematics</h1>
                <p className="text-lg text-muted-foreground">International Baccalaureate Diploma Programme</p>
              </div>
            </div>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Choose from four specialized mathematics streams designed to develop analytical thinking, 
              problem-solving skills, and mathematical understanding. Each stream offers unique approaches 
              to mathematics with different levels of depth and focus areas.
            </p>
          </div>
        </div>

        {/* Mathematics Streams Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {mathematicsStreams.map((stream) => (
            <Link key={stream.id} href={stream.href}>
              <Card className="hover:shadow-xl transition-all duration-500 cursor-pointer group">
                <CardHeader className="pb-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`${stream.color} text-white p-4 rounded-sm group-hover:scale-110 transition-transform duration-200`}>
                      {stream.icon}
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant={stream.level === "Higher Level" ? "default" : "secondary"}
                        className="mb-2"
                      >
                        {stream.level}
                      </Badge>
                      <div className="text-sm text-muted-foreground">{stream.difficulty}</div>
                    </div>
                  </div>
                  <div>
                    <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
                      {stream.name}
                    </CardTitle>
                    <CardDescription className="text-sm mb-3">
                      {stream.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Features */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-foreground">Key Features:</h4>
                    <div className="flex flex-wrap gap-2">
                      {stream.features.map((feature, index) => (
                        <span 
                          key={index}
                          className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-sm"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Topics */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-foreground">Core Topics:</h4>
                    <div className="flex flex-wrap gap-2">
                      {stream.topics.map((topic, index) => (
                        <span 
                          key={index}
                          className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-sm font-medium"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="flex items-center justify-between pt-3 border-t border-border/50">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <BookOpen className="w-4 h-4" />
                      <span>{stream.duration}</span>
                    </div>
                    <div className="text-sm font-medium text-primary">
                      Explore Stream →
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* IBDP Features */}
        <div className="bg-card p-8 rounded-sm border mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">IBDP Mathematics Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Programme Highlights</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• <strong>Global Recognition:</strong> Internationally accepted qualification</li>
                <li>• <strong>University Preparation:</strong> Prepares for higher education worldwide</li>
                <li>• <strong>Critical Thinking:</strong> Develops analytical and reasoning skills</li>
                <li>• <strong>Research Skills:</strong> Internal Assessment and Extended Essay</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Learning Approach</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• <strong>Inquiry-Based:</strong> Student-centered learning approach</li>
                <li>• <strong>Technology Integration:</strong> Use of graphing calculators and software</li>
                <li>• <strong>Real-World Applications:</strong> Practical problem-solving scenarios</li>
                <li>• <strong>Assessment Variety:</strong> Multiple assessment methods</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Stream Comparison */}
        <div className="bg-gradient-to-r from-card to-card/80 p-8 rounded-sm border">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Mathematics Stream Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 font-semibold">Stream</th>
                  <th className="text-left p-3 font-semibold">Focus</th>
                  <th className="text-left p-3 font-semibold">Difficulty</th>
                  <th className="text-left p-3 font-semibold">Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/50">
                  <td className="p-3 font-medium">Analysis & Approaches HL</td>
                  <td className="p-3">Pure mathematics, proofs, rigorous analysis</td>
                  <td className="p-3">Most challenging</td>
                  <td className="p-3">Mathematics, engineering, physics</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="p-3 font-medium">Analysis & Approaches SL</td>
                  <td className="p-3">Core mathematical concepts and analysis</td>
                  <td className="p-3">Moderate</td>
                  <td className="p-3">Business, economics, sciences</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="p-3 font-medium">Applications & Interpretation HL</td>
                  <td className="p-3">Real-world applications, data analysis</td>
                  <td className="p-3">Challenging</td>
                  <td className="p-3">Statistics, social sciences, research</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Applications & Interpretation SL</td>
                  <td className="p-3">Practical applications, data interpretation</td>
                  <td className="p-3">Moderate</td>
                  <td className="p-3">Humanities, arts, general studies</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
