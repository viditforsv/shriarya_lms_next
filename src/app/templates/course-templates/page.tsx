'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, BookOpen, FileText, Users, ArrowRight } from 'lucide-react'

export default function CourseTemplatesIndex() {
  const courseTemplates = [
    {
      name: "Course Overview",
      href: "/templates/course-templates/course-overview",
      badge: "Featured",
      description: "Course introduction and syllabus overview template",
      icon: <BookOpen className="w-8 h-8 text-[#e27447]" />
    },
    {
      name: "Course Page",
      href: "/templates/course-templates/course-page",
      badge: "New",
      description: "Complete course page with sidebar and content sections",
      icon: <FileText className="w-8 h-8 text-[#e27447]" />
    },
    {
      name: "Lesson Template",
      href: "/templates/course-templates/lesson",
      description: "Individual lesson layout with content and navigation",
      icon: <BookOpen className="w-8 h-8 text-[#e27447]" />
    },
    {
      name: "Quiz Template",
      href: "/templates/course-templates/quiz",
      description: "Interactive quiz and assessment template",
      icon: <FileText className="w-8 h-8 text-[#e27447]" />
    },
    {
      name: "Certificate",
      href: "/templates/course-templates/certificate",
      description: "Completion certificate design template",
      icon: <Users className="w-8 h-8 text-[#e27447]" />
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumbs */}
        <div className="mb-12">
          <Link 
            href="/templates" 
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Templates
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-[#1e293b] mb-4">Course Templates</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Educational templates designed specifically for learning management systems, online courses, 
            and educational platforms. Each template follows best practices for educational content.
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {courseTemplates.map((template, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-[#feefea] hover:border-[#e27447]">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-[#feefea] rounded-full flex items-center justify-center">
                    {template.icon}
                  </div>
                  {template.badge && (
                    <Badge className="bg-[#feefea] text-[#e27447] border-[#e27447]">
                      {template.badge}
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-xl text-[#1e293b]">{template.name}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="mb-6 text-[#4a6f73]">
                  {template.description}
                </CardDescription>
                <Link href={template.href}>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="w-full border-[#1e293b] hover:bg-[#1e293b] hover:text-white transition-colors"
                  >
                    View Template
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <Card className="p-8 bg-gradient-to-br from-[#feefea] to-[#fffefd] border-[#e27447] max-w-2xl mx-auto">
            <CardContent>
              <h3 className="text-2xl font-bold text-[#1e293b] mb-4">Need a Custom Course Template?</h3>
              <p className="text-[#1e293b] mb-6">
                Can&apos;t find the perfect course template? We can create custom educational layouts tailored to your curriculum.
              </p>
              <div className="flex gap-4 justify-center">
                <Button className="bg-[#e27447] hover:bg-[#e27447]/90">
                  Request Custom Template
                </Button>
                <Button variant="outline" className="border-[#1e293b] hover:bg-[#1e293b] hover:text-white">
                  Contact Us
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
