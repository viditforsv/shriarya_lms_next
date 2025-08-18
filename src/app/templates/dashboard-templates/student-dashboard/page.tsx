'use client'

import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, BookOpen, Clock, Award, TrendingUp, Play, CheckCircle, Calendar } from "lucide-react"
import Link from "next/link"

export default function StudentDashboardTemplate() {
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
          <h1 className="text-4xl font-bold text-[#1e293b] mb-4">Student Dashboard Template</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A comprehensive student dashboard template featuring course progress, upcoming lessons, and learning analytics.
          </p>
        </div>

        {/* Welcome Section */}
        <section className="mb-8">
          <Card className="bg-gradient-to-r from-[#feefea] to-[#fffefd] border-[#e27447]">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-[#1e293b] mb-2">
                    Welcome back, [Student Name]!
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    Continue your learning journey from where you left off
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Current Streak</p>
                  <p className="text-3xl font-bold text-[#e27447]">7 days</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Stats Overview */}
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="p-6">
              <CardContent className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#feefea] rounded-full flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-[#e27447]" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Courses Enrolled</p>
                  <p className="text-2xl font-bold text-[#1e293b]">5</p>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#feefea] rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-[#e27447]" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Hours Studied</p>
                  <p className="text-2xl font-bold text-[#1e293b]">24.5</p>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#feefea] rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-[#e27447]" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Certificates</p>
                  <p className="text-2xl font-bold text-[#1e293b]">2</p>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#feefea] rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-[#e27447]" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Progress</p>
                  <p className="text-2xl font-bold text-[#1e293b]">68%</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Current Courses */}
          <div className="lg:col-span-2">
            {/* Current Courses */}
            <section className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-[#1e293b]">Current Courses</h3>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
              
              <div className="space-y-4">
                <Card className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h4 className="font-semibold text-[#1e293b]">Mathematics - Class 10</h4>
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        Master fundamental concepts of algebra, geometry, and trigonometry
                      </p>
                      <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                        <span>Progress: 75%</span>
                        <span>Next Lesson: Quadratic Equations</span>
                        <span>Due: Tomorrow</span>
                      </div>
                    </div>
                    <Button size="sm" className="bg-[#e27447] hover:bg-[#e27447]/90">
                      <Play className="w-4 h-4 mr-2" />
                      Continue
                    </Button>
                  </div>
                  <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-[#e27447] h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h4 className="font-semibold text-[#1e293b]">Physics - Class 11</h4>
                        <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        Explore mechanics, thermodynamics, and wave phenomena
                      </p>
                      <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                        <span>Progress: 45%</span>
                        <span>Next Lesson: Newton's Laws</span>
                        <span>Due: Friday</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="border-[#1e293b] hover:bg-[#1e293b] hover:text-white">
                      <Play className="w-4 h-4 mr-2" />
                      Resume
                    </Button>
                  </div>
                  <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-[#e27447] h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </Card>
              </div>
            </section>

            {/* Recent Activity */}
            <section className="mb-8">
              <h3 className="text-2xl font-bold text-[#1e293b] mb-6">Recent Activity</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-[#1e293b]">Completed Algebra Quiz</p>
                        <p className="text-sm text-muted-foreground">Score: 85% • 2 hours ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Play className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-[#1e293b]">Watched: Quadratic Equations</p>
                        <p className="text-sm text-muted-foreground">Duration: 45 minutes • 1 day ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <Award className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-[#1e293b]">Earned: Algebra Master Badge</p>
                        <p className="text-sm text-muted-foreground">Achievement unlocked • 2 days ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1">
            {/* Upcoming Deadlines */}
            <section className="mb-8">
              <h3 className="text-xl font-bold text-[#1e293b] mb-4">Upcoming Deadlines</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-[#e27447]" />
                      <div>
                        <p className="font-medium text-[#1e293b]">Math Assignment</p>
                        <p className="text-sm text-muted-foreground">Due Tomorrow</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-[#e27447]" />
                      <div>
                        <p className="font-medium text-[#1e293b]">Physics Quiz</p>
                        <p className="text-sm text-muted-foreground">Due Friday</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-[#e27447]" />
                      <div>
                        <p className="font-medium text-[#1e293b]">Chemistry Lab Report</p>
                        <p className="text-sm text-muted-foreground">Due Next Week</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Quick Actions */}
            <section className="mb-8">
              <h3 className="text-xl font-bold text-[#1e293b] mb-4">Quick Actions</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <Button className="w-full justify-start" variant="outline">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Browse Courses
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Award className="w-4 h-4 mr-2" />
                      View Certificates
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Progress Report
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Study Tips */}
            <section>
              <h3 className="text-xl font-bold text-[#1e293b] mb-4">Study Tips</h3>
              <Card className="bg-[#feefea] border-[#e27447]">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-[#1e293b] mb-3">Today's Tip</h4>
                  <p className="text-sm text-[#1e293b]">
                    Break your study sessions into 25-minute focused blocks with 5-minute breaks. 
                    This technique, known as the Pomodoro Method, can improve concentration and retention.
                  </p>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>

        {/* Template Usage Instructions */}
        <div className="mt-20 bg-[#feefea] rounded-sm border border-[#e27447] p-8">
          <h3 className="text-2xl font-bold text-[#1e293b] mb-6">Template Usage Instructions</h3>
          <div className="space-y-4 text-[#1e293b]">
            <p><strong>1. Student Information:</strong> Replace placeholder text with actual student data and personalization.</p>
            <p><strong>2. Course Data:</strong> Connect to your course management system to display real course progress.</p>
            <p><strong>3. Progress Tracking:</strong> Implement actual progress calculation and tracking functionality.</p>
            <p><strong>4. Activity Feed:</strong> Connect to your learning analytics to show real student activity.</p>
            <p><strong>5. Deadlines:</strong> Integrate with your assignment and quiz scheduling system.</p>
            <p><strong>6. Quick Actions:</strong> Link buttons to appropriate pages and functionality in your app.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
