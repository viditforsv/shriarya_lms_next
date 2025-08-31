'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  FileText, 
  BookOpen, 
  BarChart3, 
  TrendingUp,
  ArrowRight
} from "lucide-react"
import Link from "next/link"

export default function TemplatesPage() {
  const templateCategories = [
    {
      title: "Page Templates",
      description: "Complete page layouts for different purposes including landing pages, about pages, contact forms, and more",
      icon: <FileText className="w-12 h-12 text-[#1e293b]" />,
      href: "/templates/page-templates",
      count: "26 templates",
      phase: "Phase 1-3"
    },
    {
      title: "Course Templates",
      description: "Educational templates designed for learning management systems, courses, lessons, and assessments",
      icon: <BookOpen className="w-12 h-12 text-[#e27447]" />,
      href: "/templates/course-templates",
      count: "9 templates",
      phase: "Phase 1-3"
    },
    {
      title: "Dashboard Templates",
      description: "Professional dashboard layouts for students, instructors, admins, and analytics",
      icon: <BarChart3 className="w-12 h-12 text-[#1e293b]" />,
      href: "/templates/dashboard-templates",
      count: "8 templates",
      phase: "Phase 1-3"
    },
    {
      title: "Scale up Templates",
      description: "Advanced templates for scaling your platform including institutional features and enterprise solutions",
      icon: <TrendingUp className="w-12 h-12 text-[#e27447]" />,
      href: "/templates/scale-up-templates",
      count: "7 templates",
      phase: "Phase 3"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-secondary to-muted">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-[#1e293b] mb-6">
            Template Library
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Discover our collection of professionally designed templates organized by development phases. 
            Each template is crafted with best practices and ready for customization.
          </p>
        </div>
      </section>

      {/* Template Categories */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {templateCategories.map((category, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-[#feefea] hover:border-[#e27447]">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4 mb-4">
                                      <div className="w-16 h-16 bg-[#feefea] rounded-sm flex items-center justify-center border border-[#feefea]">
                    {category.icon}
                  </div>
                    <div>
                      <div className="text-sm text-[#e27447] font-medium">{category.phase}</div>
                      <div className="text-xs text-muted-foreground">{category.count}</div>
                    </div>
                  </div>
                  <CardTitle className="text-2xl text-[#1e293b]">{category.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="mb-6 text-[#4a6f73] text-base">
                    {category.description}
                  </CardDescription>
                  <Link href={category.href}>
                    <Button 
                      size="lg" 
                      className="w-full bg-[#e27447] hover:bg-[#e27447]/90"
                    >
                      Browse Templates
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="text-3xl font-bold text-[#e27447] mb-2">43</h3>
              <p className="text-muted-foreground">Total Templates</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-green-600 mb-2">3</h3>
              <p className="text-muted-foreground">Development Phases</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-purple-600 mb-2">100%</h3>
              <p className="text-muted-foreground">Phase Coverage</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
