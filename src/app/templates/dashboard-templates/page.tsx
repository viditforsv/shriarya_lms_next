'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Users, BarChart3, Shield, ArrowRight } from 'lucide-react'

export default function DashboardTemplatesIndex() {
  const dashboardTemplates = [
    {
      name: "Student Dashboard",
      href: "/templates/dashboard-templates/student-dashboard",
      badge: "Popular",
      description: "Student progress tracking, course management, and learning analytics",
      icon: <Users className="w-8 h-8 text-[#e27447]" />
    },
    {
      name: "Instructor Dashboard",
      href: "/templates/dashboard-templates/instructor-dashboard",
      badge: "Featured",
      description: "Course management, student analytics, and content creation tools",
      icon: <BarChart3 className="w-8 h-8 text-[#e27447]" />
    },
    {
      name: "Admin Panel",
      href: "/templates/dashboard-templates/admin-panel",
      description: "User management, system analytics, and administrative controls",
      icon: <Shield className="w-8 h-8 text-[#e27447]" />
    },
    {
      name: "Analytics Dashboard",
      href: "/templates/dashboard-templates/analytics",
      description: "Data visualization, performance metrics, and business insights",
      icon: <BarChart3 className="w-8 h-8 text-[#e27447]" />
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
          <h1 className="text-4xl font-bold text-[#1e293b] mb-4">Dashboard Templates</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Professional dashboard templates for different user roles and purposes. 
            Each template includes comprehensive analytics, user management, and intuitive navigation.
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {dashboardTemplates.map((template, index) => (
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
              <h3 className="text-2xl font-bold text-[#1e293b] mb-4">Need a Custom Dashboard?</h3>
              <p className="text-[#1e293b] mb-6">
                Can&apos;t find the perfect dashboard template? We can create custom dashboards tailored to your specific needs.
              </p>
              <div className="flex gap-4 justify-center">
                <Button className="bg-[#e27447] hover:bg-[#e27447]/90">
                  Request Custom Dashboard
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
