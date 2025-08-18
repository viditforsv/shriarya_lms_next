'use client'

import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Users, Award, BookOpen, Globe } from "lucide-react"
import Link from "next/link"

export default function AboutPageTemplate() {
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

        {/* Template Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#1e293b] mb-4">About Page Template</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A professional about page template featuring company information, team details, and mission statement.
          </p>
        </div>

        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-secondary to-muted mb-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-5xl font-bold text-foreground mb-6">
              About [Company Name]
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              [Company description] We are dedicated to [mission statement] and committed to [values].
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-3xl font-bold text-[#1e293b] mb-6">Our Mission</h3>
              <p className="text-lg text-muted-foreground mb-6">
                [Mission statement paragraph 1] Our goal is to [specific goal] and [specific outcome].
              </p>
              <p className="text-lg text-muted-foreground">
                [Mission statement paragraph 2] We believe in [core belief] and strive to [action].
              </p>
            </div>
            <div className="bg-gradient-to-br from-[#feefea] to-[#fffefd] rounded-sm p-12 text-center">
              <Globe className="w-24 h-24 text-[#e27447] mx-auto mb-6" />
              <p className="text-lg text-[#1e293b] font-medium">Global Impact</p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-20">
          <h3 className="text-3xl font-bold text-[#1e293b] mb-12 text-center">Our Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8">
              <CardHeader>
                <div className="w-16 h-16 bg-[#feefea] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-[#e27447]" />
                </div>
                <CardTitle className="text-xl">People First</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We prioritize our team, customers, and community in everything we do.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8">
              <CardHeader>
                <div className="w-16 h-16 bg-[#feefea] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-[#e27447]" />
                </div>
                <CardTitle className="text-xl">Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We strive for excellence in every project and deliver the highest quality results.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8">
              <CardHeader>
                <div className="w-16 h-16 bg-[#feefea] rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-[#e27447]" />
                </div>
                <CardTitle className="text-xl">Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We embrace new ideas and technologies to solve complex challenges.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-20">
          <h3 className="text-3xl font-bold text-[#1e293b] mb-12 text-center">Our Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <div className="w-24 h-24 bg-gradient-to-br from-[#feefea] to-[#fffefd] rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="w-12 h-12 text-[#1e293b]" />
              </div>
              <CardHeader>
                <CardTitle className="text-lg">[Team Member Name]</CardTitle>
                <CardDescription>[Position/Role]</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  [Brief description of team member&apos;s expertise and contribution]
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <div className="w-24 h-24 bg-gradient-to-br from-[#feefea] to-[#fffefd] rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="w-12 h-12 text-[#1e293b]" />
              </div>
              <CardHeader>
                <CardTitle className="text-lg">[Team Member Name]</CardTitle>
                <CardDescription>[Position/Role]</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  [Brief description of team member&apos;s expertise and contribution]
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <div className="w-24 h-24 bg-gradient-to-br from-[#feefea] to-[#fffefd] rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="w-12 h-12 text-[#1e293b]" />
              </div>
              <CardHeader>
                <CardTitle className="text-lg">[Team Member Name]</CardTitle>
                <CardDescription>[Position/Role]</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  [Brief description of team member&apos;s expertise and contribution]
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <Card className="p-12 bg-gradient-to-br from-[#feefea] to-[#fffefd] border-[#e27447]">
            <CardHeader>
              <CardTitle className="text-3xl text-[#1e293b] mb-4">Ready to Get Started?</CardTitle>
              <CardDescription className="text-lg">
                Join us in our mission to [specific goal or outcome]
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 justify-center">
                <Button size="lg" className="bg-[#e27447] hover:bg-[#e27447]/90">
                  Contact Us
                </Button>
                <Button size="lg" variant="outline" className="border-[#1e293b] hover:bg-[#1e293b] hover:text-white">
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Template Usage Instructions */}
        <div className="mt-20 bg-[#feefea] rounded-sm border border-[#e27447] p-8">
          <h3 className="text-2xl font-bold text-[#1e293b] mb-6">Template Usage Instructions</h3>
          <div className="space-y-4 text-[#1e293b]">
            <p><strong>1. Company Information:</strong> Replace all placeholder text in [brackets] with your actual company details.</p>
            <p><strong>2. Mission & Values:</strong> Update the mission statement and company values to reflect your organization.</p>
            <p><strong>3. Team Section:</strong> Add your actual team members with photos, names, and descriptions.</p>
            <p><strong>4. Images:</strong> Replace placeholder icons with your company photos and team images.</p>
            <p><strong>5. Styling:</strong> Adjust colors, fonts, and spacing to match your brand guidelines.</p>
            <p><strong>6. CTA:</strong> Modify the call-to-action to align with your business goals.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
