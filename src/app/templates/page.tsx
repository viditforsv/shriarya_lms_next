'use client'

import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  BookOpen, 
  Users, 
  ArrowRight, 
  FileText,
  Layout,
  Sparkles
} from "lucide-react"
import Link from "next/link"

// Force dynamic rendering to prevent static generation issues
export const dynamic = 'force-dynamic'

export default function TemplatesPage() {
  const templateCategories = [
    {
      title: "Page Templates",
      description: "Complete page layouts for different purposes",
      icon: <Layout className="w-8 h-8 text-accent" />,
      templates: [
        { name: "Landing Page", href: "/templates/landing", badge: "Popular", description: "Modern landing page with hero section" },
        { name: "About Page", href: "/templates/about", badge: "New", description: "Professional about page layout" },
        { name: "Contact Page", href: "/templates/contact", description: "Contact form with map integration" },
        { name: "Pricing Page", href: "/templates/pricing", description: "Pricing tables and plans" },
      ]
    },
    {
      title: "Course Templates",
      description: "Templates specifically designed for educational content",
      icon: <BookOpen className="w-8 h-8 text-green-600" />,
      templates: [
        { name: "Course Overview", href: "/templates/course-overview", badge: "Featured", description: "Course introduction and syllabus" },
        { name: "Course Page", href: "/templates/course-page", badge: "New", description: "Complete course page with sidebar and content" },
        { name: "Lesson Template", href: "/templates/lesson", description: "Individual lesson layout" },
        { name: "Quiz Template", href: "/templates/quiz", description: "Interactive quiz and assessment" },
        { name: "Certificate", href: "/templates/certificate", description: "Completion certificate design" },
      ]
    },
    {
      title: "Dashboard Templates",
      description: "Admin and user dashboard layouts",
      icon: <Users className="w-8 h-8 text-purple-600" />,
      templates: [
        { name: "Student Dashboard", href: "/templates/student-dashboard", description: "Student progress and courses" },
        { name: "Instructor Dashboard", href: "/templates/instructor-dashboard", description: "Course management interface" },
        { name: "Admin Panel", href: "/templates/admin-panel", description: "Full administrative interface" },
        { name: "Analytics Dashboard", href: "/templates/analytics", description: "Data visualization and reports" },
      ]
    },
    {
      title: "Component Templates",
      description: "Reusable component layouts and patterns",
      icon: <FileText className="w-8 h-8 text-orange-600" />,
      templates: [
        { name: "Navigation Bars", href: "/templates/navigation", description: "Header and navigation patterns" },
        { name: "Form Templates", href: "/templates/forms", description: "Contact and data entry forms" },
        { name: "Card Layouts", href: "/templates/cards", description: "Content card variations" },
        { name: "Modal Templates", href: "/templates/modals", description: "Dialog and overlay patterns" },
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb 
          items={[
            { label: "Home", href: "/" },
            { label: "Templates", href: "/templates", isActive: true },
          ]} 
        />
      </div>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-secondary to-muted">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-sm flex items-center justify-center bg-accent">
              <Sparkles className="w-8 h-8 text-accent-foreground" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-6">
            Template Library
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Discover our collection of professionally designed templates to accelerate your development process. 
            Each template is crafted with best practices and ready for customization.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="bg-accent hover:bg-accent/90">
              Browse All Templates
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="hover:bg-[#e27447] hover:text-white transition-colors">
              View Documentation
            </Button>
          </div>
        </div>
      </section>

      {/* Template Categories */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid gap-8">
            {templateCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="space-y-6">
                <div className="flex items-center gap-3">
                  {category.icon}
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">{category.title}</h2>
                    <p className="text-muted-foreground">{category.description}</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {category.templates.map((template, templateIndex) => (
                    <Card key={templateIndex} className="group hover:shadow-md transition-all duration-200">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{template.name}</CardTitle>
                          {template.badge && (
                            <Badge variant="secondary" className="text-xs">
                              {template.badge}
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <CardDescription className="mb-4">
                          {template.description}
                        </CardDescription>
                        <Link href={template.href}>
                          <Button size="lg" variant="outline" className="w-[100%] hover:bg-[#e27447] hover:text-white transition-colors">
                            View Template
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Need a Custom Template?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Can&apos;t find what you&apos;re looking for? We can create custom templates tailored to your specific needs.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="bg-accent hover:bg-accent/90">
              Request Custom Template
            </Button>
            <Button size="lg" variant="outline" className="hover:bg-[#e27447] hover:text-white transition-colors">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
