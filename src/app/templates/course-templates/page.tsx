'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export default function CourseTemplatesIndex() {
  const courseTemplates = [
    // Phase 1 (MVP - Launch) - Core Course Components
    {
      name: "Course Overview",
      href: "/templates/course-templates/course-overview",
      phase: "Phase 1 - MVP",
      ready: true
    },
    {
      name: "Course Page",
      href: "/templates/course-templates/course-page",
      phase: "Phase 1 - MVP",
      ready: true
    },
    {
      name: "Lesson Template",
      href: "/templates/course-templates/lesson",
      phase: "Phase 1 - MVP",
      ready: false
    },
    
    // Phase 2 (Growth) - Learning Enhancements
    {
      name: "Quiz Template",
      href: "/templates/course-templates/quiz",
      phase: "Phase 2 - Growth",
      ready: false
    },
    {
      name: "Assignments Template",
      href: "/templates/course-templates/assignments",
      phase: "Phase 2 - Growth",
      ready: false
    },
    {
      name: "Question Bank",
      href: "/templates/course-templates/question-bank",
      phase: "Phase 2 - Growth",
      ready: false
    },
    {
      name: "Certificate Template",
      href: "/templates/course-templates/certificate",
      phase: "Phase 2 - Growth",
      ready: false
    },
    
    // Phase 3 (Scale) - Advanced Features
    {
      name: "Performance Analytics",
      href: "/templates/course-templates/performance-analytics",
      phase: "Phase 3 - Scale",
      ready: false
    }
  ]

  // Group templates by phase
  const groupedTemplates = {
    "Phase 1 - MVP": courseTemplates.filter(t => t.phase === "Phase 1 - MVP"),
    "Phase 2 - Growth": courseTemplates.filter(t => t.phase === "Phase 2 - Growth"),
    "Phase 3 - Scale": courseTemplates.filter(t => t.phase === "Phase 3 - Scale")
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="mb-8">
          <Link 
            href="/templates" 
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Templates
          </Link>
        </div>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-[#1e293b] mb-2">Course Templates</h1>
          <p className="text-muted-foreground">
            Educational course templates organized by development phases for learning management systems
          </p>
        </div>

        {/* Templates by Phase */}
        {Object.entries(groupedTemplates).map(([phase, templates]) => (
          <div key={phase} className="mb-12">
            <h2 className="text-xl font-semibold text-[#1e293b] mb-4 border-b border-[#feefea] pb-2">
              {phase}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {templates.map((template, index) => (
                <Card key={index} className="hover:shadow-md transition-all duration-200 border-[#feefea] hover:border-[#e27447]">
                  <CardHeader className="pb-3">
                    <div className="relative">
                      <CardTitle className="text-base text-[#1e293b] text-center">{template.name}</CardTitle>
                      {template.ready && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-white"></div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 pb-4">
                    <Link href={template.href}>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="w-full border-[#1e293b] hover:bg-[#1e293b] hover:text-white transition-colors text-xs"
                      >
                        View
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}

        {/* Quick Stats */}
        <div className="mt-12 text-center text-sm text-muted-foreground">
          {courseTemplates.filter(t => t.ready).length} of {courseTemplates.length} course templates ready
        </div>
      </div>
    </div>
  )
}
