"use client";

import { Button } from "@/design-system/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/design-system/components/ui/card";
import { Award, BookOpen, Globe, Target, Heart } from "lucide-react";
import Link from "next/link";

/**
 * AboutPage is the main landing page for Preppeo LMS. It displays the Hero Section,

 * Mission Section, Values Section, What We Offer Section, and CTA Section.
 * @returns {JSX.Element} The rendered AboutPage component
 */
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-white via-green-50 to-emerald-50 mb-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold text-foreground mb-6">
              About Preppeo
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Empowering students with comprehensive learning solutions across
              CBSE, ICSE, IBDP, and IGCSE curricula. We are dedicated to making
              quality education accessible to every student.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                At Preppeo, our mission is to democratize education by providing
                high-quality, curriculum-aligned learning resources to students
                across India and beyond.
              </p>
              <p className="text-lg text-muted-foreground">
                We believe every student deserves access to world-class
                education regardless of their location or background. Through
                our comprehensive platform, we strive to bridge the gap between
                traditional and digital learning.
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-emerald-50 rounded-xl p-12 text-center shadow-lg">
              <Globe className="w-24 h-24 text-primary mx-auto mb-6" />
              <p className="text-lg text-foreground font-medium">
                Global Learning Impact
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8 ">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">Student First</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Every decision we make is centered around student success and
                  learning outcomes.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 ">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We maintain the highest standards in curriculum content and
                  educational delivery.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 ">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We continuously innovate our platform to provide the best
                  learning experience.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* What We Offer Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6 ">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Target className="w-8 h-8 text-white" />
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

            <Card className="text-center p-6 ">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <BookOpen className="w-8 h-8 text-white" />
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

            <Card className="text-center p-6 ">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Globe className="w-8 h-8 text-white" />
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

            <Card className="text-center p-6 ">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Award className="w-8 h-8 text-white" />
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
          <div className="bg-gradient-to-br from-primary to-emerald-600 rounded-xl p-12 shadow-xl">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Start Learning?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of students who are already learning with Preppeo
              LMS
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/courses/discover">
                <Button
                  size="lg"
                  className="bg-white hover:bg-gray-100 text-primary shadow-lg px-8 py-6 text-lg font-semibold"
                >
                  Explore Courses
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-6 text-lg"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
