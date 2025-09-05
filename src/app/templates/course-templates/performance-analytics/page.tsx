'use client'

import { useState, memo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components-demo/ui/card"
import { Button } from "@/app/components-demo/ui/button"
import { Badge } from "@/app/components-demo/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components-demo/ui/tabs"
import { CompletionDot } from "@/app/components-demo/ui/template-status"
import { TemplateLayout } from "@/app/components-demo/ui/template-layout"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  BookOpen,
  Clock,
  Target,
  Award,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  Eye,
  Star,
  CheckCircle,
  XCircle,
  AlertCircle,
  PieChart,
  Activity,
  Zap
} from 'lucide-react'

const PerformanceAnalyticsTemplate = memo(function PerformanceAnalyticsTemplate() {
  const [selectedPeriod, setSelectedPeriod] = useState('30d')
  const [selectedCourse, setSelectedCourse] = useState('all')

  const analyticsData = {
    overview: {
      totalStudents: 1247,
      activeStudents: 892,
      completionRate: 78.5,
      avgScore: 84.2,
      totalCourses: 15,
      avgTimeSpent: 2.3
    },
    courses: [
      {
        id: 1,
        name: "Algebra Fundamentals",
        students: 156,
        completionRate: 82.1,
        avgScore: 87.3,
        avgTime: 3.2,
        trend: 'up'
      },
      {
        id: 2,
        name: "Geometry Basics",
        students: 134,
        completionRate: 75.4,
        avgScore: 81.7,
        avgTime: 2.8,
        trend: 'up'
      },
      {
        id: 3,
        name: "Calculus Advanced",
        students: 98,
        completionRate: 68.9,
        avgScore: 79.2,
        avgTime: 4.1,
        trend: 'down'
      },
      {
        id: 4,
        name: "Statistics & Probability",
        students: 112,
        completionRate: 85.7,
        avgScore: 88.1,
        avgTime: 2.9,
        trend: 'up'
      }
    ],
    studentPerformance: [
      {
        id: 1,
        name: "Sarah Johnson",
        course: "Algebra Fundamentals",
        score: 94,
        timeSpent: 2.8,
        lastActive: "2 hours ago",
        status: "excellent"
      },
      {
        id: 2,
        name: "Michael Chen",
        course: "Geometry Basics",
        score: 87,
        timeSpent: 3.1,
        lastActive: "1 day ago",
        status: "good"
      },
      {
        id: 3,
        name: "Emily Rodriguez",
        course: "Calculus Advanced",
        score: 76,
        timeSpent: 4.2,
        lastActive: "3 days ago",
        status: "needs_improvement"
      },
      {
        id: 4,
        name: "David Kim",
        course: "Statistics & Probability",
        score: 91,
        timeSpent: 2.5,
        lastActive: "5 hours ago",
        status: "excellent"
      }
    ],
    trends: {
      enrollments: [45, 52, 38, 67, 73, 58, 62],
      completions: [32, 41, 28, 48, 55, 42, 38],
      scores: [82, 85, 79, 87, 89, 84, 86]
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800'
      case 'good': return 'bg-blue-100 text-blue-800'
      case 'needs_improvement': return 'bg-yellow-100 text-yellow-800'
      case 'at_risk': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': return <CheckCircle className="w-4 h-4" />
      case 'good': return <Star className="w-4 h-4" />
      case 'needs_improvement': return <AlertCircle className="w-4 h-4" />
      case 'at_risk': return <XCircle className="w-4 h-4" />
      default: return <AlertCircle className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#feefea] to-[#fffefd]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1e293b] to-[#2d3748] text-white py-8 relative">
        <CompletionDot isCompleted={true} />
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold font-cardo mb-2">Performance Analytics</h1>
              <p className="text-lg text-gray-300 font-dm-sans">
                Track student progress and course performance metrics
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="px-3 py-2 bg-white/10 border border-white/20 rounded-sm text-white focus:ring-2 focus:ring-white/50"
                >
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                  <option value="1y">Last year</option>
                </select>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="rounded-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Students</p>
                  <p className="text-2xl font-bold text-gray-900">{analyticsData.overview.totalStudents}</p>
                  <p className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +12% from last month
                  </p>
                </div>
                <Users className="w-8 h-8 text-[#e27447]" />
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                  <p className="text-2xl font-bold text-green-600">{analyticsData.overview.completionRate}%</p>
                  <p className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +5.2% from last month
                  </p>
                </div>
                <Target className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Score</p>
                  <p className="text-2xl font-bold text-blue-600">{analyticsData.overview.avgScore}%</p>
                  <p className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +2.1% from last month
                  </p>
                </div>
                <Award className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg. Time Spent</p>
                  <p className="text-2xl font-bold text-purple-600">{analyticsData.overview.avgTimeSpent}h</p>
                  <p className="text-xs text-red-600 flex items-center">
                    <TrendingDown className="w-3 h-3 mr-1" />
                    -0.3h from last month
                  </p>
                </div>
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 rounded-sm bg-white p-1 shadow-sm">
            <TabsTrigger
              value="overview"
              className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white font-medium"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="courses"
              className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white font-medium"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Courses
            </TabsTrigger>
            <TabsTrigger
              value="students"
              className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white font-medium"
            >
              <Users className="w-4 h-4 mr-2" />
              Students
            </TabsTrigger>
            <TabsTrigger
              value="trends"
              className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white font-medium"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Trends
            </TabsTrigger>
            <TabsTrigger
              value="insights"
              className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white font-medium"
            >
              <Zap className="w-4 h-4 mr-2" />
              Insights
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="rounded-sm">
                <CardHeader>
                  <CardTitle className="font-cardo">Course Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.courses.map(course => (
                      <div key={course.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-sm">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 font-dm-sans">{course.name}</h4>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                            <span>{course.students} students</span>
                            <span>{course.completionRate}% completion</span>
                            <span>{course.avgScore}% avg score</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {course.trend === 'up' ? (
                            <TrendingUp className="w-4 h-4 text-green-600" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-red-600" />
                          )}
                          <Badge className={`rounded-sm ${
                            course.completionRate >= 80 ? 'bg-green-100 text-green-800' :
                            course.completionRate >= 70 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {course.completionRate >= 80 ? 'Excellent' :
                             course.completionRate >= 70 ? 'Good' : 'Needs Attention'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-sm">
                <CardHeader>
                  <CardTitle className="font-cardo">Student Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium">Excellent (90%+)</span>
                      </div>
                      <span className="text-sm font-bold">342 students</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-sm font-medium">Good (80-89%)</span>
                      </div>
                      <span className="text-sm font-bold">456 students</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm font-medium">Average (70-79%)</span>
                      </div>
                      <span className="text-sm font-bold">298 students</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-sm font-medium">Needs Help (&lt;70%)</span>
                      </div>
                      <span className="text-sm font-bold">151 students</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Courses Tab */}
          <TabsContent value="courses" className="space-y-6">
            <div className="grid gap-4">
              {analyticsData.courses.map(course => (
                <Card key={course.id} className="rounded-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 font-cardo mb-2">
                          {course.name}
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Students</p>
                            <p className="font-semibold text-lg">{course.students}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Completion Rate</p>
                            <p className="font-semibold text-lg text-green-600">{course.completionRate}%</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Average Score</p>
                            <p className="font-semibold text-lg text-blue-600">{course.avgScore}%</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Avg. Time</p>
                            <p className="font-semibold text-lg text-purple-600">{course.avgTime}h</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Button variant="outline" className="rounded-sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        <Button variant="outline" className="rounded-sm">
                          <Download className="w-4 h-4 mr-2" />
                          Export
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students" className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold font-cardo">Student Performance</h2>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <select className="px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#e27447]">
                  <option>All Students</option>
                  <option>Excellent</option>
                  <option>Good</option>
                  <option>Needs Improvement</option>
                </select>
              </div>
            </div>
            <div className="grid gap-4">
              {analyticsData.studentPerformance.map(student => (
                <Card key={student.id} className="rounded-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#e27447] rounded-full flex items-center justify-center text-white font-bold">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 font-dm-sans">{student.name}</h3>
                          <p className="text-sm text-gray-600">{student.course}</p>
                          <p className="text-xs text-gray-500">Last active: {student.lastActive}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Score</p>
                          <p className="font-bold text-lg">{student.score}%</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Time Spent</p>
                          <p className="font-bold text-lg">{student.timeSpent}h</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(student.status)}
                          <Badge className={`rounded-sm ${getStatusColor(student.status)}`}>
                            {student.status.replace('_', ' ')}
                          </Badge>
                        </div>
                        <Button variant="outline" size="sm" className="rounded-sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Trends Tab */}
          <TabsContent value="trends" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="rounded-sm">
                <CardHeader>
                  <CardTitle className="font-cardo">Enrollment Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-end justify-between gap-2">
                    {analyticsData.trends.enrollments.map((value, index) => (
                      <div key={index} className="flex flex-col items-center gap-2">
                        <div 
                          className="bg-[#e27447] rounded-t-sm w-8 transition-all duration-500"
                          style={{ height: `${(value / 80) * 200}px` }}
                        ></div>
                        <span className="text-xs text-gray-600">Week {index + 1}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-sm">
                <CardHeader>
                  <CardTitle className="font-cardo">Completion Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-end justify-between gap-2">
                    {analyticsData.trends.completions.map((value, index) => (
                      <div key={index} className="flex flex-col items-center gap-2">
                        <div 
                          className="bg-green-500 rounded-t-sm w-8 transition-all duration-500"
                          style={{ height: `${(value / 60) * 200}px` }}
                        ></div>
                        <span className="text-xs text-gray-600">Week {index + 1}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Insights Tab */}
          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="rounded-sm">
                <CardHeader>
                  <CardTitle className="font-cardo flex items-center gap-2">
                    <Zap className="w-5 h-5 text-[#e27447]" />
                    Key Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded-sm">
                      <p className="text-sm font-medium text-green-800">
                        📈 Completion rates increased by 5.2% this month
                      </p>
                    </div>
                    <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-sm">
                      <p className="text-sm font-medium text-blue-800">
                        🎯 Algebra Fundamentals is your top-performing course
                      </p>
                    </div>
                    <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded-sm">
                      <p className="text-sm font-medium text-yellow-800">
                        ⚠️ 151 students need additional support
                      </p>
                    </div>
                    <div className="p-4 bg-purple-50 border-l-4 border-purple-500 rounded-sm">
                      <p className="text-sm font-medium text-purple-800">
                        💡 Students spend 0.3h less time per session
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-sm">
                <CardHeader>
                  <CardTitle className="font-cardo flex items-center gap-2">
                    <Target className="w-5 h-5 text-[#e27447]" />
                    Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-sm">
                      <h4 className="font-medium text-gray-900 mb-2">Focus Areas</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Provide extra support for Calculus Advanced</li>
                        <li>• Create more interactive content for Geometry</li>
                        <li>• Implement peer learning groups</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-sm">
                      <h4 className="font-medium text-gray-900 mb-2">Quick Actions</h4>
                      <div className="space-y-2">
                        <Button variant="outline" size="sm" className="w-full rounded-sm">
                          Send Progress Reports
                        </Button>
                        <Button variant="outline" size="sm" className="w-full rounded-sm">
                          Schedule Review Sessions
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
})

export default PerformanceAnalyticsTemplate

