'use client'

import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Users, BookOpen, TrendingUp, Settings, Shield, BarChart3, Plus, Eye, Edit, Trash2, Download } from "lucide-react"
import Link from "next/link"

export default function AdminPanelTemplate() {
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
          <h1 className="text-4xl font-bold text-[#1e293b] mb-4">Admin Panel Template</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A comprehensive admin panel template featuring user management, system analytics, and administrative controls.
          </p>
        </div>

        {/* Welcome Section */}
        <section className="mb-8">
          <Card className="bg-gradient-to-r from-[#feefea] to-[#fffefd] border-[#e27447]">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-[#1e293b] mb-2">
                    Welcome, [Admin Name]!
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    Manage your platform and monitor system performance
                  </p>
                </div>
                <div className="flex space-x-3">
                  <Button variant="outline" className="border-[#1e293b] hover:bg-[#1e293b] hover:text-white">
                    <Settings className="w-4 h-4 mr-2" />
                    System Settings
                  </Button>
                  <Button className="bg-[#e27447] hover:bg-[#e27447]/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Add User
                  </Button>
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
                  <Users className="w-6 h-6 text-[#e27447]" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold text-[#1e293b]">1,247</p>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#feefea] rounded-full flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-[#e27447]" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active Courses</p>
                  <p className="text-2xl font-bold text-[#1e293b]">89</p>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#feefea] rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-[#e27447]" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Revenue</p>
                  <p className="text-2xl font-bold text-[#1e293b]">$45.2K</p>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#feefea] rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-[#e27447]" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">System Status</p>
                  <p className="text-2xl font-bold text-green-600">Online</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - User Management */}
          <div className="lg:col-span-2">
            {/* Recent Users */}
            <section className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-[#1e293b]">Recent Users</h3>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
              
              <div className="space-y-4">
                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-[#feefea] rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-[#1e293b]">JD</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#1e293b]">John Doe</h4>
                        <p className="text-sm text-muted-foreground">john.doe@example.com</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className="bg-green-100 text-green-800">Student</Badge>
                          <span className="text-xs text-muted-foreground">Joined 2 days ago</span>
                        </div>
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
                      <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-[#feefea] rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-[#1e293b]">JS</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#1e293b]">Jane Smith</h4>
                        <p className="text-sm text-muted-foreground">jane.smith@example.com</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className="bg-blue-100 text-blue-800">Instructor</Badge>
                          <span className="text-xs text-muted-foreground">Joined 1 week ago</span>
                        </div>
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
                      <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </section>

            {/* System Activity */}
            <section className="mb-8">
              <h3 className="text-2xl font-bold text-[#1e293b] mb-6">System Activity</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-[#1e293b]">New user registration: john.doe@example.com</p>
                        <p className="text-sm text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-[#1e293b]">New course created: Advanced Physics</p>
                        <p className="text-sm text-muted-foreground">4 hours ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                        <Shield className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-[#1e293b]">Security alert: Multiple failed login attempts</p>
                        <p className="text-sm text-muted-foreground">6 hours ago</p>
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
                      Add User
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Manage Courses
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      View Analytics
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Settings className="w-4 h-4 mr-2" />
                      System Settings
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Export Data
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* System Health */}
            <section className="mb-8">
              <h3 className="text-xl font-bold text-[#1e293b] mb-4">System Health</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[#1e293b]">CPU Usage</span>
                      <span className="text-sm font-medium text-[#1e293b]">45%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[#1e293b]">Memory Usage</span>
                      <span className="text-sm font-medium text-[#1e293b]">62%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '62%' }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[#1e293b]">Storage</span>
                      <span className="text-sm font-medium text-[#1e293b]">78%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Recent Alerts */}
            <section>
              <h3 className="text-xl font-bold text-[#1e293b] mb-4">Recent Alerts</h3>
              <Card className="bg-red-50 border-red-200">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-red-800 mb-3">High Priority</h4>
                  <div className="space-y-3">
                    <div className="text-sm text-red-700">
                      <p className="font-medium">Storage space running low</p>
                      <p className="text-xs">Consider cleaning up old files</p>
                    </div>
                    <div className="text-sm text-red-700">
                      <p className="font-medium">Multiple failed login attempts</p>
                      <p className="text-xs">IP: 192.168.1.100</p>
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
            <p><strong>1. Admin Information:</strong> Replace placeholder text with actual admin data and personalization.</p>
            <p><strong>2. User Management:</strong> Connect to your user database to display real user information.</p>
            <p><strong>3. System Monitoring:</strong> Implement actual system health monitoring and alerts.</p>
            <p><strong>4. Activity Logs:</strong> Connect to your system logs to show real administrative activity.</p>
            <p><strong>5. Quick Actions:</strong> Link buttons to appropriate administrative functions in your app.</p>
            <p><strong>6. Security:</strong> Implement proper authentication and authorization for admin access.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
