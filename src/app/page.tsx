'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { BookOpen, Users, Award, Clock, ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="min-h-screen">
        {/* Breadcrumbs */}
        <div className="container mx-auto px-4 pt-8">
          <Breadcrumb 
            items={[
              { label: "Home", href: "/", isActive: true },
            ]} 
          />
        </div>
        
        {/* Hero Section for Authenticated Users */}
        <section className="bg-gradient-to-br from-secondary to-muted py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold text-foreground mb-6">
              Welcome back, {user.user_metadata?.full_name || user.email}!
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Continue your learning journey with personalized courses and progress tracking.
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90"
                onClick={() => router.push('/dashboard')}
              >
                Go to Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => router.push('/courses')}
              >
                Browse Courses
              </Button>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">
              Your Learning Progress
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="text-center">
                <CardHeader>
                  <BookOpen className="w-12 h-12 text-accent mx-auto mb-4" />
                  <CardTitle>Enrolled Courses</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    <span className="text-2xl font-bold text-accent">8</span>
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <Award className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <CardTitle>Completed</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    <span className="text-2xl font-bold text-green-600">3</span>
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <Clock className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <CardTitle>Study Hours</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    <span className="text-2xl font-bold text-purple-600">24</span>
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <Users className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                  <CardTitle>Study Groups</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    <span className="text-2xl font-bold text-orange-600">2</span>
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Original content for unauthenticated users
  return (
    <div className="min-h-screen">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 pt-8">
        <Breadcrumb 
          items={[
            { label: "Home", href: "/", isActive: true },
          ]} 
        />
      </div>
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-secondary to-muted py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-foreground mb-6">
            Welcome to{" "}
            <span className="text-accent">ShriArya LMS</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            A modern learning management system designed to transform education 
            with interactive courses, real-time collaboration, and personalized learning experiences.
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90"
              onClick={() => router.push('/auth')}
            >
              Get Started
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => router.push('/auth')}
            >
              Sign In
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Why Choose ShriArya LMS?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <BookOpen className="w-12 h-12 text-accent mx-auto mb-4" />
                <CardTitle>Rich Content</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Access comprehensive course materials, videos, and interactive content
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Collaborative Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Connect with peers and instructors through discussion forums and live sessions
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Award className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Progress Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Monitor your learning progress with detailed analytics and achievements
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Clock className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                <CardTitle>Flexible Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Learn at your own pace with 24/7 access to course materials
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
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
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-accent-foreground mb-6">
            Ready to Start Learning?
          </h2>
          <p className="text-xl text-accent-foreground/80 mb-8">
            Join thousands of learners who are already transforming their skills
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => router.push('/auth')}
            >
              Get Started
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-accent-foreground text-accent-foreground hover:bg-accent-foreground hover:text-accent"
              onClick={() => router.push('/auth')}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
