'use client'

import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowRight, 
  CheckCircle, 
  Star, 
  Users, 
  BookOpen,
  Award,
  Clock,
  Play
} from "lucide-react"

export default function LandingPageTemplate() {
  const features = [
    {
      icon: <BookOpen className="w-6 h-6 text-accent" />,
      title: "Comprehensive Learning",
      description: "Access to a wide range of courses and learning materials"
    },
    {
      icon: <Users className="w-6 h-6 text-green-600" />,
      title: "Expert Instructors",
      description: "Learn from industry professionals and certified educators"
    },
    {
      icon: <Award className="w-6 h-6 text-purple-600" />,
      title: "Certification",
      description: "Earn certificates upon course completion"
    },
    {
      icon: <Clock className="w-6 h-6 text-orange-600" />,
      title: "Flexible Schedule",
      description: "Learn at your own pace, anytime, anywhere"
    }
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Student",
      content: "The courses here have transformed my career. Highly recommended!",
      rating: 5,
      avatar: "/images/avatar-1.jpg"
    },
    {
      name: "Michael Chen",
      role: "Professional",
      content: "Excellent content quality and very user-friendly platform.",
      rating: 5,
      avatar: "/images/avatar-2.jpg"
    },
    {
      name: "Emily Davis",
      role: "Student",
      content: "Great learning experience with practical, real-world applications.",
      rating: 5,
      avatar: "/images/avatar-3.jpg"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb 
          items={[
            { label: "Home", href: "/" },
            { label: "Templates", href: "/templates" },
            { label: "Landing Page", href: "/templates/landing", isActive: true },
          ]} 
        />
      </div>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-secondary to-muted">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-4">
            Template Preview
          </Badge>
          <h1 className="text-5xl font-bold text-foreground mb-6">
            Welcome to ShriArya LMS
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Transform your learning journey with our comprehensive online courses. 
            Expert instructors, flexible schedules, and industry-recognized certifications.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="bg-accent hover:bg-accent/90">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline">
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover the advantages that make us the preferred choice for online learning
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-md transition-all duration-200">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-4xl font-bold text-accent mb-2">100+</h3>
              <p className="text-muted-foreground">Courses Available</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-green-600 mb-2">10K+</h3>
              <p className="text-muted-foreground">Active Students</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-purple-600 mb-2">50+</h3>
              <p className="text-muted-foreground">Expert Instructors</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-orange-600 mb-2">95%</h3>
              <p className="text-muted-foreground">Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              What Our Students Say
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real feedback from learners who have transformed their careers
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-md transition-all duration-200">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                      <Users className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                      <CardDescription>{testimonial.role}</CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    &ldquo;{testimonial.content}&rdquo;
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-accent-foreground mb-6">
            Ready to Start Learning?
          </h2>
          <p className="text-xl text-accent-foreground/80 mb-8 max-w-2xl mx-auto">
            Join thousands of learners who are already transforming their skills and advancing their careers
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Browse Courses
            </Button>
            <Button size="lg" variant="outline" className="border-accent-foreground text-accent-foreground hover:bg-accent-foreground hover:text-accent">
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      {/* Template Info */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Landing Page Template</CardTitle>
              <CardDescription>
                This is a preview of the Landing Page template. Use this structure to create engaging landing pages for your courses or services.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex gap-4 justify-center">
                <Button variant="outline">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Use This Template
                </Button>
                <Button variant="outline">
                  Download Code
                </Button>
                <Button variant="outline">
                  Customize
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
