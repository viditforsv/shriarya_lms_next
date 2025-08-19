'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export default function PageTemplatesIndex() {
  const pageTemplates = [
    {
      name: "Landing Page",
      href: "/templates/page-templates/landing"
    },
    {
      name: "About Page",
      href: "/templates/page-templates/about"
    },
    {
      name: "Contact Page",
      href: "/templates/page-templates/contact"
    },
    {
      name: "Pricing Page",
      href: "/templates/page-templates/pricing"
    },
    {
      name: "Login Page",
      href: "/templates/page-templates/login"
    },
    {
      name: "Signup Page",
      href: "/templates/page-templates/signup"
    },
    {
      name: "FAQ Page",
      href: "/templates/page-templates/faq"
    },
    {
      name: "Privacy Policy",
      href: "/templates/page-templates/privacy"
    },
    {
      name: "Terms of Service",
      href: "/templates/page-templates/terms"
    },
    {
      name: "Blog Listing",
      href: "/templates/page-templates/blog"
    },
    {
      name: "Blog Post",
      href: "/templates/page-templates/blog-post"
    },
    {
      name: "Portfolio",
      href: "/templates/page-templates/portfolio"
    },
    {
      name: "Services",
      href: "/templates/page-templates/services"
    },
    {
      name: "Team Page",
      href: "/templates/page-templates/team"
    },
    {
      name: "Testimonials",
      href: "/templates/page-templates/testimonials"
    },
    {
      name: "404 Error",
      href: "/templates/page-templates/404"
    }
  ]

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
            Internal page templates for quick reference and development
          </p>
        </div>

        {/* Templates Grid - 4 columns on desktop for better space usage */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {pageTemplates.map((template, index) => (
            <Card key={index} className="hover:shadow-md transition-all duration-200 border-[#feefea] hover:border-[#e27447]">
              <CardHeader className="pb-3">
                <CardTitle className="text-base text-[#1e293b] text-center">{template.name}</CardTitle>
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

        {/* Quick Stats */}
        <div className="mt-12 text-center text-sm text-muted-foreground">
          {pageTemplates.length} page templates available
        </div>
      </div>
    </div>
  )
}
