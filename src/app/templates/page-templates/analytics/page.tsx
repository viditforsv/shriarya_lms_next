'use client'
import { memo } from "react"
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components-demo/ui/card"
import { Button } from "@/app/components-demo/ui/button"
import { Badge } from "@/app/components-demo/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components-demo/ui/tabs"
import { CompletionDot } from "@/app/components-demo/ui/template-status"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  BookOpen,
  Award,
  Clock,
  DollarSign,
  Eye,
  Download,
  Filter,
  Calendar,
  Target,
  Zap,
  Activity,
  PieChart,
  LineChart,
  BarChart,
  RefreshCw,
  Settings,
  Share2,
  AlertCircle,
  CheckCircle,
  Star,
  GraduationCap,
  MessageCircle,
  Heart,
  ThumbsUp
} from 'lucide-react'

const AnalyticsTemplate = memo(function AnalyticsTemplate() {
  const [selectedPeriod, setSelectedPeriod] = useState('30d')
  const [selectedMetric, setSelectedMetric] = useState('overview')

  const overviewStats = {
    totalUsers: 15420,
    activeUsers: 8930,
    totalCourses: 156,
    completedCourses: 1240,
    totalRevenue: 2450000,
    averageRating: 4.7,
    userGrowth: 12.5,
    revenueGrowth: 8.3
  }

  const userAnalytics = {
    newUsers: 450,
    returningUsers: 1200,
    churnedUsers: 89,
    userRetention: 87.2,
    averageSessionTime: '24m 15s',
    bounceRate: 12.8,
    conversionRate: 15.6
  }

  const courseAnalytics = {
    totalEnrollments: 45670,
    completionRate: 78.5,
    averageRating: 4.6,
    topPerformingCourse: 'Complete Mathematics Course - Class 10',
    mostPopularCategory: 'Mathematics',
    averageCourseLength: '12h 30m'
  }

  const revenueAnalytics = {
    monthlyRevenue: 245000,
    yearlyRevenue: 2450000,
    averageRevenuePerUser: 159,
    subscriptionRevenue: 180000,
    courseRevenue: 65000,
    revenueGrowth: 8.3
  }

  const engagementMetrics = {
    dailyActiveUsers: 2340,
    weeklyActiveUsers: 8930,
    monthlyActiveUsers: 15420,
    averageTimeOnSite: '18m 45s',
    pagesPerSession: 4.2,
    socialShares: 1250,
    comments: 890,
    likes: 4560
  }

  const topCourses = [
    { name: 'Complete Mathematics Course - Class 10', enrollments: 3450, revenue: 345000, rating: 4.9 },
    { name: 'Physics Masterclass - Advanced Level', enrollments: 2890, revenue: 289000, rating: 4.8 },
    { name: 'Chemistry Fundamentals', enrollments: 2340, revenue: 234000, rating: 4.7 },
    { name: 'Biology Complete Course', enrollments: 1980, revenue: 198000, rating: 4.6 },
    { name: 'English Literature Masterclass', enrollments: 1650, revenue: 165000, rating: 4.5 }
  ]

  const userSegments = [
    { segment: 'Students', count: 12350, percentage: 80.1, growth: 15.2 },
    { segment: 'Teachers', count: 1890, percentage: 12.3, growth: 8.7 },
    { segment: 'Parents', count: 980, percentage: 6.4, growth: 12.1 },
    { segment: 'Professionals', count: 200, percentage: 1.3, growth: 25.0 }
  ]

  const getGrowthColor = (growth: number) => {
    if (growth > 0) return 'text-green-600'
    if (growth < 0) return 'text-red-600'
    return 'text-gray-600'
  }

  const getGrowthIcon = (growth: number) => {
    if (growth > 0) return <TrendingUp className="w-4 h-4" />
    if (growth < 0) return <TrendingDown className="w-4 h-4" />
    return <Activity className="w-4 h-4" />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#feefea] to-[#fffefd]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1e293b] to-[#2d3748] text-white py-8 relative">
        <CompletionDot isCompleted={true} />
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold font-cardo mb-2">Analytics Dashboard</h1>
              <p className="text-lg text-gray-300 font-dm-sans">
                Comprehensive insights into your platform performance
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-2xl font-bold">{overviewStats.totalUsers.toLocaleString()}</div>
                <div className="text-sm text-gray-300">Total Users</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-400">+{overviewStats.userGrowth}%</div>
                <div className="text-sm text-gray-300">Growth</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 rounded-sm bg-white p-1 shadow-sm">
            <TabsTrigger
              value="overview"
              className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white font-medium"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="users"
              className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white font-medium"
            >
              <Users className="w-4 h-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger
              value="courses"
              className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white font-medium"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Courses
            </TabsTrigger>
            <TabsTrigger
              value="revenue"
              className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white font-medium"
            >
              <DollarSign className="w-4 h-4 mr-2" />
              Revenue
            </TabsTrigger>
            <TabsTrigger
              value="engagement"
              className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white font-medium"
            >
              <Activity className="w-4 h-4 mr-2" />
              Engagement
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white font-medium"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Period Selector */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold font-cardo">Platform Overview</h2>
              <div className="flex items-center gap-4">
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#e27447] focus:border-transparent"
                >
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                  <option value="1y">Last year</option>
                </select>
                <Button variant="outline" className="rounded-sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="rounded-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Users</p>
                      <p className="text-2xl font-bold text-gray-900">{overviewStats.totalUsers.toLocaleString()}</p>
                      <div className="flex items-center gap-1 mt-1">
                        {getGrowthIcon(overviewStats.userGrowth)}
                        <span className={`text-sm font-medium ${getGrowthColor(overviewStats.userGrowth)}`}>
                          +{overviewStats.userGrowth}%
                        </span>
                      </div>
                    </div>
                    <Users className="w-8 h-8 text-[#e27447]" />
                  </div>
                </CardContent>
              </Card>
              <Card className="rounded-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Users</p>
                      <p className="text-2xl font-bold text-blue-600">{overviewStats.activeUsers.toLocaleString()}</p>
                      <div className="flex items-center gap-1 mt-1">
                        {getGrowthIcon(8.2)}
                        <span className="text-sm font-medium text-green-600">+8.2%</span>
                      </div>
                    </div>
                    <Activity className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card className="rounded-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Courses</p>
                      <p className="text-2xl font-bold text-green-600">{overviewStats.totalCourses}</p>
                      <div className="flex items-center gap-1 mt-1">
                        {getGrowthIcon(5.1)}
                        <span className="text-sm font-medium text-green-600">+5.1%</span>
                      </div>
                    </div>
                    <BookOpen className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card className="rounded-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                      <p className="text-2xl font-bold text-purple-600">₹{overviewStats.totalRevenue.toLocaleString()}</p>
                      <div className="flex items-center gap-1 mt-1">
                        {getGrowthIcon(overviewStats.revenueGrowth)}
                        <span className={`text-sm font-medium ${getGrowthColor(overviewStats.revenueGrowth)}`}>
                          +{overviewStats.revenueGrowth}%
                        </span>
                      </div>
                    </div>
                    <DollarSign className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="rounded-sm">
                <CardHeader>
                  <CardTitle className="font-cardo">User Growth Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-end justify-between gap-2">
                    {[1200, 1350, 1420, 1580, 1650, 1780, 1890, 2100, 2250, 2400, 2580, 2750].map((value, index) => (
                      <div key={index} className="flex flex-col items-center gap-2">
                        <div 
                          className="bg-[#e27447] rounded-t-sm w-6 transition-all duration-500"
                          style={{ height: `${(value / 3000) * 200}px` }}
                        ></div>
                        <span className="text-xs text-gray-600">{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][index]}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-sm">
                <CardHeader>
                  <CardTitle className="font-cardo">Revenue Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Subscriptions</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-[#e27447] h-2 rounded-full" style={{ width: '73%' }}></div>
                        </div>
                        <span className="text-sm font-medium">73%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Course Sales</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '27%' }}></div>
                        </div>
                        <span className="text-sm font-medium">27%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="rounded-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">New Users</p>
                      <p className="text-2xl font-bold text-green-600">{userAnalytics.newUsers}</p>
                    </div>
                    <Users className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card className="rounded-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Returning Users</p>
                      <p className="text-2xl font-bold text-blue-600">{userAnalytics.returningUsers}</p>
                    </div>
                    <RefreshCw className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card className="rounded-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">User Retention</p>
                      <p className="text-2xl font-bold text-purple-600">{userAnalytics.userRetention}%</p>
                    </div>
                    <Target className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
              <Card className="rounded-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Avg Session Time</p>
                      <p className="text-2xl font-bold text-orange-600">{userAnalytics.averageSessionTime}</p>
                    </div>
                    <Clock className="w-8 h-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="rounded-sm">
                <CardHeader>
                  <CardTitle className="font-cardo">User Segments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userSegments.map((segment, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{segment.segment}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-[#e27447] h-2 rounded-full" 
                              style={{ width: `${segment.percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{segment.count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-sm">
                <CardHeader>
                  <CardTitle className="font-cardo">User Behavior</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Bounce Rate</span>
                      <span className="text-sm font-medium text-red-600">{userAnalytics.bounceRate}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Conversion Rate</span>
                      <span className="text-sm font-medium text-green-600">{userAnalytics.conversionRate}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Pages per Session</span>
                      <span className="text-sm font-medium text-blue-600">4.2</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Courses Tab */}
          <TabsContent value="courses" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="rounded-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Enrollments</p>
                      <p className="text-2xl font-bold text-blue-600">{courseAnalytics.totalEnrollments.toLocaleString()}</p>
                    </div>
                    <BookOpen className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card className="rounded-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                      <p className="text-2xl font-bold text-green-600">{courseAnalytics.completionRate}%</p>
                    </div>
                    <Award className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card className="rounded-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Average Rating</p>
                      <p className="text-2xl font-bold text-yellow-600">{courseAnalytics.averageRating}</p>
                    </div>
                    <Star className="w-8 h-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>
              <Card className="rounded-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Avg Course Length</p>
                      <p className="text-2xl font-bold text-purple-600">{courseAnalytics.averageCourseLength}</p>
                    </div>
                    <Clock className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="rounded-sm">
              <CardHeader>
                <CardTitle className="font-cardo">Top Performing Courses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topCourses.map((course, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-sm">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{course.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                          <span>{course.enrollments.toLocaleString()} enrollments</span>
                          <span>₹{course.revenue.toLocaleString()} revenue</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span>{course.rating}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="rounded-sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Revenue Tab */}
          <TabsContent value="revenue" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="rounded-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                      <p className="text-2xl font-bold text-green-600">₹{revenueAnalytics.monthlyRevenue.toLocaleString()}</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card className="rounded-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Yearly Revenue</p>
                      <p className="text-2xl font-bold text-blue-600">₹{revenueAnalytics.yearlyRevenue.toLocaleString()}</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card className="rounded-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">ARPU</p>
                      <p className="text-2xl font-bold text-purple-600">₹{revenueAnalytics.averageRevenuePerUser}</p>
                    </div>
                    <Users className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
              <Card className="rounded-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Revenue Growth</p>
                      <p className="text-2xl font-bold text-orange-600">+{revenueAnalytics.revenueGrowth}%</p>
                    </div>
                    <BarChart className="w-8 h-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="rounded-sm">
                <CardHeader>
                  <CardTitle className="font-cardo">Revenue Sources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Subscriptions</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-[#e27447] h-2 rounded-full" style={{ width: '73%' }}></div>
                        </div>
                        <span className="text-sm font-medium">₹{revenueAnalytics.subscriptionRevenue.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Course Sales</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '27%' }}></div>
                        </div>
                        <span className="text-sm font-medium">₹{revenueAnalytics.courseRevenue.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-sm">
                <CardHeader>
                  <CardTitle className="font-cardo">Revenue Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-end justify-between gap-2">
                    {[180, 195, 210, 225, 240, 235, 250, 265, 280, 275, 290, 300].map((value, index) => (
                      <div key={index} className="flex flex-col items-center gap-2">
                        <div 
                          className="bg-green-500 rounded-t-sm w-6 transition-all duration-500"
                          style={{ height: `${(value / 350) * 200}px` }}
                        ></div>
                        <span className="text-xs text-gray-600">{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][index]}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Engagement Tab */}
          <TabsContent value="engagement" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="rounded-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Daily Active Users</p>
                      <p className="text-2xl font-bold text-blue-600">{engagementMetrics.dailyActiveUsers.toLocaleString()}</p>
                    </div>
                    <Activity className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card className="rounded-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Weekly Active Users</p>
                      <p className="text-2xl font-bold text-green-600">{engagementMetrics.weeklyActiveUsers.toLocaleString()}</p>
                    </div>
                    <Users className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card className="rounded-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Avg Time on Site</p>
                      <p className="text-2xl font-bold text-purple-600">{engagementMetrics.averageTimeOnSite}</p>
                    </div>
                    <Clock className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
              <Card className="rounded-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Social Shares</p>
                      <p className="text-2xl font-bold text-orange-600">{engagementMetrics.socialShares}</p>
                    </div>
                    <Share2 className="w-8 h-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="rounded-sm">
                <CardHeader>
                  <CardTitle className="font-cardo">Engagement Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Pages per Session</span>
                      <span className="text-sm font-medium text-blue-600">{engagementMetrics.pagesPerSession}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Comments</span>
                      <span className="text-sm font-medium text-green-600">{engagementMetrics.comments}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Likes</span>
                      <span className="text-sm font-medium text-red-600">{engagementMetrics.likes}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Messages</span>
                      <span className="text-sm font-medium text-purple-600">234</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-sm">
                <CardHeader>
                  <CardTitle className="font-cardo">Activity Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-end justify-between gap-2">
                    {[45, 52, 48, 61, 58, 67, 72, 69, 75, 78, 82, 85].map((value, index) => (
                      <div key={index} className="flex flex-col items-center gap-2">
                        <div 
                          className="bg-blue-500 rounded-t-sm w-6 transition-all duration-500"
                          style={{ height: `${(value / 100) * 200}px` }}
                        ></div>
                        <span className="text-xs text-gray-600">{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][index]}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="rounded-sm">
              <CardHeader>
                <CardTitle className="font-cardo">Analytics Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Real-time Analytics</h4>
                      <p className="text-sm text-gray-600">Enable real-time data updates</p>
                    </div>
                    <input type="checkbox" className="rounded-sm" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Email Reports</h4>
                      <p className="text-sm text-gray-600">Send weekly analytics reports</p>
                    </div>
                    <input type="checkbox" className="rounded-sm" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Data Retention</h4>
                      <p className="text-sm text-gray-600">Keep analytics data for 2 years</p>
                    </div>
                    <input type="checkbox" className="rounded-sm" defaultChecked />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Report Frequency
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#e27447] focus:border-transparent">
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                  </select>
                </div>
                
                <Button className="bg-[#e27447] hover:bg-[#d65a2b] text-white rounded-sm">
                  Save Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
})

export default AnalyticsTemplate

