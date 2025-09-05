'use client'
import { memo } from "react"
import Link from 'next/link'
import { Button } from '@/app/components-demo/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components-demo/ui/card'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export default function ScaleUpTemplatesIndex() {
  const scaleUpTemplates = [
    // Advanced Dashboard Templates
    {
      name: "Admin Dashboard (advanced)",
      href: "/templates/dashboard-templates/admin-panel",
      category: "Dashboard",
      description: "Comprehensive administrative interface with advanced controls",
      ready: true
    },
    {
      name: "Institution Analytics",
      href: "/templates/dashboard-templates/institution-dashboard",
      category: "Dashboard", 
      description: "Enterprise-level analytics for institutional management",
      ready: false
    },
    {
      name: "Teacher Signup",
      href: "/templates/dashboard-templates/teacher-signup",
      category: "Dashboard",
      description: "Institutional onboarding and teacher registration system",
      ready: false
    },
    
    // Advanced Course Templates
    {
      name: "Performance Analytics",
      href: "/templates/course-templates/performance-analytics",
      category: "Course",
      description: "Advanced learning analytics and personalized recommendations",
      ready: false
    },
    
    // Advanced Page Templates
    {
      name: "Blog Listing Page",
      href: "/templates/page-templates/blog",
      category: "Page",
      description: "SEO-optimized blog system for content marketing",
      ready: false
    },
    {
      name: "Blog Post Page", 
      href: "/templates/page-templates/blog-post",
      category: "Page",
      description: "Professional blog post layout with social sharing",
      ready: false
    },
    {
      name: "Case Studies / Testimonials",
      href: "/templates/page-templates/testimonials",
      category: "Page",
      description: "Social proof and success story presentation",
      ready: false
    }
  ]

  // Group templates by category
  const groupedTemplates = {
    "Dashboard Templates": scaleUpTemplates.filter(t => t.category === "Dashboard"),
    "Course Templates": scaleUpTemplates.filter(t => t.category === "Course"),
    "Page Templates": scaleUpTemplates.filter(t => t.category === "Page")
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
          <div className="flex items-center gap-3 mb-4">
            <div className="px-3 py-1 bg-[#e27447] text-white text-sm font-medium rounded-sm">
              Phase 3 - Scale
            </div>
          </div>
          <h1 className="text-3xl font-bold text-[#1e293b] mb-2">Scale up Templates</h1>
          <p className="text-muted-foreground">
            Advanced templates for scaling your platform including institutional features, enterprise solutions, and marketing tools
          </p>
        </div>

        {/* Templates by Category */}
        {Object.entries(groupedTemplates).map(([category, templates]) => (
          <div key={category} className="mb-12">
            <h2 className="text-xl font-semibold text-[#1e293b] mb-4 border-b border-[#feefea] pb-2">
              {category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 border-[#feefea] hover:border-[#e27447]">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="px-2 py-1 bg-[#feefea] text-[#e27447] text-xs font-medium rounded-sm">
                        {template.category}
                      </div>
                    </div>
                    <CardTitle className="text-lg text-[#1e293b]">
                      <div className="relative">
                        {template.name}
                        {template.ready && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-white"></div>
                        )}
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground mb-4">
                      {template.description}
                    </p>
                    <Link href={template.href}>
                      <Button 
                        size="sm" 
                        className="w-full bg-[#e27447] hover:bg-[#e27447]/90"
                      >
                        View Template
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}

        {/* Feature Highlights */}
        <div className="mt-16 p-8 bg-gradient-to-br from-[#feefea] to-[#fffefd] rounded-sm border border-[#e27447]">
          <h3 className="text-2xl font-bold text-[#1e293b] mb-4">Enterprise Features</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-[#1e293b] mb-2">Institutional Management</h4>
              <p className="text-sm text-muted-foreground">
                Advanced dashboards for managing multiple institutions, comprehensive analytics, and teacher onboarding systems.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-[#1e293b] mb-2">Marketing & Growth</h4>
              <p className="text-sm text-muted-foreground">
                SEO-optimized blog systems, testimonials, and case studies to drive organic growth and build trust.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-[#1e293b] mb-2">Advanced Analytics</h4>
              <p className="text-sm text-muted-foreground">
                Performance analytics with personalized recommendations and institution-level insights.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-[#1e293b] mb-2">Scalability</h4>
              <p className="text-sm text-muted-foreground">
                Templates designed to handle enterprise-level traffic and complex organizational structures.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-12 text-center text-sm text-muted-foreground">
          {scaleUpTemplates.filter(t => t.ready).length} of {scaleUpTemplates.length} scale-up templates ready
        </div>
      </div>
    </div>
  )
}
