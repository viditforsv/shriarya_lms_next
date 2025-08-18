'use client'

import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, TrendingUp, TrendingDown, Users, BookOpen, DollarSign, BarChart3, Download, Calendar } from "lucide-react"
import Link from "next/link"

export default function AnalyticsDashboardTemplate() {
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
          <h1 className="text-4xl font-bold text-[#1e293b] mb-4">Analytics Dashboard Template</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A comprehensive analytics dashboard template featuring data visualization, performance metrics, and business insights.
          </p>
        </div>

        {/* Date Range Selector */}
        <section className="mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-[#1e293b]">Analytics Overview</h3>
                  <p className="text-sm text-muted-foreground">Last 30 days performance</p>
                </div>
                <div className="flex items-center space-x-4">
                  <Button variant="outline" size="sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    Last 7 days
                  </Button>
                  <Button variant="outline" size="sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    Last 30 days
                  </Button>
                  <Button variant="outline" size="sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    Last 90 days
                  </Button>
                  <Button size="sm" className="bg-[#e27447] hover:bg-[#e27447]/90">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Key Metrics */}
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="p-6">
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Revenue</p>
                    <p className="text-2xl font-bold text-[#1e293b]">$45,231</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <span className="text-sm text-green-600 font-medium">+20.1%</span>
                  <span className="text-sm text-muted-foreground ml-2">from last month</span>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">New Users</p>
                    <p className="text-2xl font-bold text-[#1e293b]">2,350</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <span className="text-sm text-green-600 font-medium">+15.3%</span>
                  <span className="text-sm text-muted-foreground ml-2">from last month</span>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Course Enrollments</p>
                    <p className="text-2xl font-bold text-[#1e293b]">1,234</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <span className="text-sm text-red-600 font-medium">-2.4%</span>
                  <span className="text-sm text-muted-foreground ml-2">from last month</span>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Conversion Rate</p>
                    <p className="text-2xl font-bold text-[#1e293b]">3.24%</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <span className="text-sm text-green-600 font-medium">+4.1%</span>
                  <span className="text-sm text-muted-foreground ml-2">from last month</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Charts Section */}
        <section className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Revenue Chart */}
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="text-xl text-[#1e293b]">Revenue Trend</CardTitle>
                <CardDescription>Monthly revenue over the last 12 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-br from-[#feefea] to-[#fffefd] rounded-sm flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="w-16 h-16 text-[#e27447] mx-auto mb-4" />
                    <p className="text-[#1e293b] font-medium">Chart Placeholder</p>
                    <p className="text-sm text-muted-foreground">Replace with actual chart component</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* User Growth Chart */}
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="text-xl text-[#1e293b]">User Growth</CardTitle>
                <CardDescription>New user registrations over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-br from-[#feefea] to-[#fffefd] rounded-sm flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="w-16 h-16 text-[#e27447] mx-auto mb-4" />
                    <p className="text-[#1e293b] font-medium">Chart Placeholder</p>
                    <p className="text-sm text-muted-foreground">Replace with actual chart component</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Detailed Analytics */}
        <section className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Top Performing Courses */}
            <div className="lg:col-span-2">
              <Card className="p-6">
                <CardHeader>
                  <CardTitle className="text-xl text-[#1e293b]">Top Performing Courses</CardTitle>
                  <CardDescription>Courses with highest enrollment and completion rates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-[#feefea] rounded-sm">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-[#e27447] rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">1</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#1e293b]">Mathematics - Class 10</h4>
                          <p className="text-sm text-muted-foreground">CBSE Board</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-[#1e293b]">156 students</p>
                        <p className="text-sm text-green-600">+12% this month</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-[#feefea] rounded-sm">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-[#e27447] rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">2</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#1e293b]">Physics - Class 11</h4>
                          <p className="text-sm text-muted-foreground">IBDP Program</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-[#1e293b]">134 students</p>
                        <p className="text-sm text-green-600">+8% this month</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-[#feefea] rounded-sm">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-[#e27447] rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">3</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#1e293b]">Chemistry - Class 12</h4>
                          <p className="text-sm text-muted-foreground">ICSE Board</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-[#1e293b]">98 students</p>
                        <p className="text-sm text-green-600">+5% this month</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Stats */}
            <div>
              <Card className="p-6">
                <CardHeader>
                  <CardTitle className="text-xl text-[#1e293b]">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-[#e27447]">89%</p>
                    <p className="text-sm text-muted-foreground">Course Completion Rate</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-3xl font-bold text-[#1e293b]">4.8/5</p>
                    <p className="text-sm text-muted-foreground">Average Student Rating</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-3xl font-bold text-[#1e293b]">24.5</p>
                    <p className="text-sm text-muted-foreground">Avg. Study Hours/Week</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-3xl font-bold text-[#1e293b]">67%</p>
                    <p className="text-sm text-muted-foreground">Mobile App Usage</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Geographic Distribution */}
        <section className="mb-8">
          <Card className="p-6">
            <CardHeader>
              <CardTitle className="text-xl text-[#1e293b]">Geographic Distribution</CardTitle>
              <CardDescription>Student enrollment by region</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#feefea] rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold text-[#1e293b]">45%</span>
                  </div>
                  <h4 className="font-semibold text-[#1e293b]">North India</h4>
                  <p className="text-sm text-muted-foreground">Delhi, UP, Punjab</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#feefea] rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold text-[#1e293b]">28%</span>
                  </div>
                  <h4 className="font-semibold text-[#1e293b]">South India</h4>
                  <p className="text-sm text-muted-foreground">Karnataka, Tamil Nadu</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#feefea] rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold text-[#1e293b]">18%</span>
                  </div>
                  <h4 className="font-semibold text-[#1e293b]">West India</h4>
                  <p className="text-sm text-muted-foreground">Maharashtra, Gujarat</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#feefea] rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold text-[#1e293b]">9%</span>
                  </div>
                  <h4 className="font-semibold text-[#1e293b]">Other Regions</h4>
                  <p className="text-sm text-muted-foreground">International</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Template Usage Instructions */}
        <div className="mt-20 bg-[#feefea] rounded-sm border border-[#e27447] p-8">
          <h3 className="text-2xl font-bold text-[#1e293b] mb-6">Template Usage Instructions</h3>
          <div className="space-y-4 text-[#1e293b]">
            <p><strong>1. Data Integration:</strong> Connect to your actual data sources to display real analytics.</p>
            <p><strong>2. Chart Components:</strong> Replace chart placeholders with actual chart libraries (Chart.js, Recharts, etc.).</p>
            <p><strong>3. Metrics Calculation:</strong> Implement actual calculations for revenue, user growth, and other KPIs.</p>
            <p><strong>4. Date Filtering:</strong> Add functionality to the date range selectors for dynamic data filtering.</p>
            <p><strong>5. Export Functionality:</strong> Implement data export features for reports and analytics.</p>
            <p><strong>6. Real-time Updates:</strong> Consider adding real-time data updates for live analytics.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
