'use client'
import { memo } from "react"
import Link from 'next/link'
import { Button } from '@/app/components-demo/ui/ui-components/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components-demo/ui/ui-components/card'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export default function PageTemplatesIndex() {
  const pageTemplates = [
    // Phase 1 (MVP - Launch) - Core Learning Experience
    {
      name: "Landing Page (Home)",
      href: "/templates/page-templates/landing",
      phase: "Phase 1 - MVP",
      ready: true
    },
    {
      name: "Courses Listing + Search/Filter",
      href: "/templates/page-templates/courses-listing",
      phase: "Phase 1 - MVP",
      ready: true
    },
    // Note: Course Detail, Lesson Page are in course-templates, not page-templates
    
    // Phase 1 (MVP - Launch) - User Access
    {
      name: "Login Page",
      href: "/templates/page-templates/login",
      phase: "Phase 1 - MVP",
      ready: true
    },
    {
      name: "Signup Page (Student, Teacher)",
      href: "/templates/page-templates/signup",
      phase: "Phase 1 - MVP",
      ready: true
    },
    {
      name: "Password Reset + Email Verification",
      href: "/templates/page-templates/password-reset",
      phase: "Phase 1 - MVP",
      ready: true
    },
    {
      name: "User Profile + Settings",
      href: "/templates/page-templates/user-profile",
      phase: "Phase 1 - MVP",
      ready: true
    },
    
    // Phase 1 (MVP - Launch) - Business/Info Pages
    {
      name: "Pricing Page",
      href: "/templates/page-templates/pricing",
      phase: "Phase 1 - MVP",
      ready: true
    },
    {
      name: "About Page",
      href: "/templates/page-templates/about",
      phase: "Phase 1 - MVP",
      ready: true
    },
    {
      name: "Contact Page",
      href: "/templates/page-templates/contact",
      phase: "Phase 1 - MVP",
      ready: true
    },
    
    // Phase 1 (MVP - Launch) - Compliance
    {
      name: "Privacy Policy",
      href: "/templates/page-templates/privacy",
      phase: "Phase 1 - MVP",
      ready: true
    },
    {
      name: "Terms of Service",
      href: "/templates/page-templates/terms",
      phase: "Phase 1 - MVP",
      ready: true
    },
    
    // Phase 2 (Growth) - Learning Enhancements
    // Note: Quiz and Assignments are in course-templates, not page-templates
    
    // Phase 2 (Growth) - Commerce Layer
    {
      name: "Checkout / Payment Flow",
      href: "/templates/page-templates/checkout",
      phase: "Phase 2 - Growth",
      ready: true
    },
    {
      name: "Subscription / Plan Management",
      href: "/templates/page-templates/subscription-management",
      phase: "Phase 2 - Growth",
      ready: true
    },
    {
      name: "Refund / Guarantee Page",
      href: "/templates/page-templates/refund",
      phase: "Phase 2 - Growth",
      ready: true
    },
    
    // Phase 2 (Growth) - Support
    {
      name: "FAQ + Support (combined)",
      href: "/templates/page-templates/faq-support",
      phase: "Phase 2 - Growth",
      ready: true
    },
    {
      name: "FAQ Page",
      href: "/templates/page-templates/faq",
      phase: "Phase 2 - Growth",
      ready: true
    },
    {
      name: "Helpdesk Ticketing OR Chatbot",
      href: "/templates/page-templates/helpdesk",
      phase: "Phase 2 - Growth",
      ready: true
    },
    
    // Phase 3 (Scale) - Marketing/SEO
    {
      name: "Case Studies / Testimonials",
      href: "/templates/page-templates/testimonials",
      phase: "Phase 3 - Scale",
      ready: true
    },
    
    // Additional Templates (Bonus Features)
    {
      name: "Team Page",
      href: "/templates/page-templates/team",
      phase: "Bonus",
      ready: true
    },
    {
      name: "404 Error Page",
      href: "/templates/page-templates/404",
      phase: "Bonus",
      ready: true
    }
  ]

  // Group templates by phase
  const groupedTemplates = {
    "Phase 1 - MVP": pageTemplates.filter(t => t.phase === "Phase 1 - MVP"),
    "Phase 2 - Growth": pageTemplates.filter(t => t.phase === "Phase 2 - Growth"),
    "Phase 3 - Scale": pageTemplates.filter(t => t.phase === "Phase 3 - Scale"),
    "Bonus Features": pageTemplates.filter(t => t.phase === "Bonus")
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
          <h1 className="text-3xl font-bold text-[#1e293b] mb-2">Page Templates</h1>
          <p className="text-muted-foreground">
            Complete LMS page templates organized by development phases
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
          {pageTemplates.filter(t => t.ready).length} of {pageTemplates.length} page templates ready
          <br />
          <span className="text-xs">Course-specific templates (Quiz, Assignments, Lessons) are in course-templates</span>
        </div>
      </div>
    </div>
  )
}
