'use client'

import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Users, BookOpen, TrendingUp, Clock, MessageSquare, BarChart3, Plus, Eye, Edit, Download } from "lucide-react"
import Link from "next/link"

export default function InstructorDashboardTemplate() {
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
          <h1 className="text-4xl font-bold text-[#1e293b] mb-4">Instructor Dashboard Template</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A comprehensive instructor dashboard template featuring course management, student analytics, and content creation tools.
          </p>
        </div>

        {/* Welcome Section */}
        <section className="mb-8">
          <Card className="bg-gradient-to-r from-[#feefea] to-[#fffefd] border-[#e27447]">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-[#1e293b] mb-2">
                    Welcome back, [Instructor Name]!
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    Manage your courses and track student progress
                  </p>
                </div>
                <Button className="bg-[#e27447] hover:bg-[#e27447]/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Course
                </Button>
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
                  <p className="text-sm text-muted-foreground">Active Courses</p>
                  <p className="text-2xl font-bold text-[#1e293b]">8</p>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#feefea] rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-[#e27447]" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Students</p>
                  <p className="text-2xl font-bold text-[#1e293b]">342</p>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#feefea] rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-[#e27447]" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Rating</p>
                  <p className="text-2xl font-bold text-[#1e293b]">4.8</p>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#feefea] rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-[#e27447]" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Hours Taught</p>
                  <p className="text-2xl font-bold text-[#1e293b]">156</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Course Management */}
          <div className="lg:col-span-2">
            {/* Active Courses */}
            <section className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-[#1e293b]">Active Courses</h3>
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
                        <Badge variant="outline">45 Students</Badge>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        Master fundamental concepts of algebra, geometry, and trigonometry
                      </p>
                      <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                        <span>Progress: 75%</span>
                        <span>Next Lesson: Quadratic Equations</span>
                        <span>Last Updated: 2 hours ago</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </div>
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
                        <Badge variant="outline">32 Students</Badge>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        Explore mechanics, thermodynamics, and wave phenomena
                      </p>
                      <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                        <span>Progress: 45%</span>
                        <span>Next Lesson: Newton's Laws</span>
                        <span>Last Updated: 1 day ago</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </div>
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
                        <Users className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-[#1e293b]">New student enrolled in Mathematics Class 10</p>
                        <p className="text-sm text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-[#1e293b]">Student question about Quadratic Equations</p>
                        <p className="text-sm text-muted-foreground">4 hours ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <BarChart3 className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-[#1e293b]">Quiz results updated for Physics Class 11</p>
                        <p className="text-sm text-muted-foreground">1 day ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1">
            {/* Quick Actions */}
            <section className="mb-8">
              <h3 className="text-xl font-bold text-[#1e293b] mb-4">Quick Actions</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <Button className="w-full justify-start" variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Course
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Users className="w-4 h-4 mr-2" />
                      Manage Students
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      View Analytics
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Messages
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Recent Messages */}
            <section className="mb-8">
              <h3 className="text-xl font-bold text-[#1e293b] mb-4">Recent Messages</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-[#feefea] rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-[#1e293b]">JD</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-[#1e293b]">John Doe</p>
                        <p className="text-sm text-muted-foreground">Question about assignment...</p>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-[#feefea] rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-[#1e293b]">JS</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-[#1e293b]">Jane Smith</p>
                        <p className="text-sm text-muted-foreground">Need help with physics...</p>
                        <p className="text-xs text-muted-foreground">4 hours ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Course Analytics */}
            <section>
              <h3 className="text-xl font-bold text-[#1e293b] mb-4">Course Analytics</h3>
              <Card className="bg-[#feefea] border-[#e27447]">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-[#1e293b] mb-3">This Month</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-[#1e293b]">New Enrollments</span>
                      <span className="font-medium text-[#1e293b]">+12</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-[#1e293b]">Course Completions</span>
                      <span className="font-medium text-[#1e293b]">+8</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-[#1e293b]">Avg. Rating</span>
                      <span className="font-medium text-[#1e293b]">4.9</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>

        {/* Template Usage Instructions */}
        <div className="mt-20 bg-[#feefea] rounded-sm border border-[#e27447] p-8">
          <h3 className="text-2xl font-bold text-[#1e293b] mb-6">Template Usage Instructions</h3>
          <div className="space-y-4 text-[#1e293b]">
            <p><strong>1. Instructor Information:</strong> Replace placeholder text with actual instructor data and personalization.</p>
            <p><strong>2. Course Data:</strong> Connect to your course management system to display real course information.</p>
            <p><strong>3. Student Analytics:</strong> Implement actual student tracking and progress monitoring.</p>
            <p><strong>4. Activity Feed:</strong> Connect to your system to show real instructor activity and notifications.</p>
            <p><strong>5. Quick Actions:</strong> Link buttons to appropriate pages and functionality in your app.</p>
            <p><strong>6. Messages:</strong> Integrate with your messaging system for student communication.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
