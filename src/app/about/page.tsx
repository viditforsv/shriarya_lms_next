'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Award, BookOpen, Globe, Target, Heart } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-secondary to-muted mb-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold text-foreground mb-6">
              About ShriArya LMS
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Empowering students with comprehensive learning solutions across CBSE, ICSE, IBDP, and IGCSE curricula. 
              We are dedicated to making quality education accessible to every student.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#1e293b] mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6">
                At ShriArya LMS, our mission is to democratize education by providing high-quality, 
                curriculum-aligned learning resources to students across India and beyond.
              </p>
              <p className="text-lg text-muted-foreground">
                We believe every student deserves access to world-class education regardless of their 
                location or background. Through our comprehensive platform, we strive to bridge the 
                gap between traditional and digital learning.
              </p>
            </div>
            <div className="bg-gradient-to-br from-[#feefea] to-[#fffefd] rounded-sm p-12 text-center">
              <Globe className="w-24 h-24 text-[#e27447] mx-auto mb-6" />
              <p className="text-lg text-[#1e293b] font-medium">Global Learning Impact</p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-[#1e293b] mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8">
              <CardHeader>
                <div className="w-16 h-16 bg-[#feefea] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-[#e27447]" />
                </div>
                <CardTitle className="text-xl">Student First</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Every decision we make is centered around student success and learning outcomes.
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
                  We maintain the highest standards in curriculum content and educational delivery.
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
                  We continuously innovate our platform to provide the best learning experience.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* What We Offer Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-[#1e293b] mb-12 text-center">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-[#feefea] rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-[#e27447]" />
              </div>
              <CardHeader>
                <CardTitle className="text-lg">CBSE Curriculum</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Complete coverage of CBSE syllabus from Class 9 to 12
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-[#feefea] rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-[#e27447]" />
              </div>
              <CardHeader>
                <CardTitle className="text-lg">ICSE/ISC</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Comprehensive ICSE and ISC board preparation
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-[#feefea] rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-[#e27447]" />
              </div>
              <CardHeader>
                <CardTitle className="text-lg">IBDP</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  International Baccalaureate Diploma Programme support
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-[#feefea] rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-[#e27447]" />
              </div>
              <CardHeader>
                <CardTitle className="text-lg">IGCSE</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  International General Certificate of Secondary Education
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <Card className="p-12 bg-gradient-to-br from-[#feefea] to-[#fffefd] border-[#e27447]">
            <CardHeader>
              <CardTitle className="text-3xl text-[#1e293b] mb-4">Ready to Start Learning?</CardTitle>
              <CardDescription className="text-lg">
                Join thousands of students who are already learning with ShriArya LMS
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 justify-center">
                <Link href="/courses">
                  <Button size="lg" className="bg-[#e27447] hover:bg-[#e27447]/90">
                    Explore Courses
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="border-[#1e293b] hover:bg-[#1e293b] hover:text-white">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
