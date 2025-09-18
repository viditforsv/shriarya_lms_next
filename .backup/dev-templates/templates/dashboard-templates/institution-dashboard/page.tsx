'use client'

import { useState, memo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components-demo/ui/ui-components/card"
import { Button } from "@/app/components-demo/ui/ui-components/button"
import { Badge } from "@/app/components-demo/ui/ui-components/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components-demo/ui/tabs"
import { CompletionDot } from "@/app/components-demo/ui/template-status"
import { TemplateLayout } from "@/app/components-demo/ui/template-layout"
import {
  Building2,
  Users,
  GraduationCap,
  BookOpen,
  TrendingUp,
  Calendar,
  Settings,
  Plus,
  Eye,
  Edit,
  Trash2,
  Download,
  Upload,
  Bell,
  Mail,
  Phone,
  MapPin,
  Globe,
  Award,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Clock,
  CheckCircle,
  AlertCircle,
  UserPlus,
  School,
  BookMarked,
  RefreshCw
} from 'lucide-react'

const InstitutionDashboardTemplate = memo(function InstitutionDashboardTemplate() {
  const [selectedInstitution, setSelectedInstitution] = useState('all')

  const institutions = [
    {
      id: 1,
      name: "Delhi Public School",
      type: "K-12 School",
      location: "New Delhi, India",
      students: 1250,
      teachers: 85,
      courses: 45,
      status: "Active",
      joinDate: "2023-01-15",
      lastActive: "2 hours ago",
      performance: 92
    },
    {
      id: 2,
      name: "International School of Mumbai",
      type: "IB School",
      location: "Mumbai, India",
      students: 890,
      teachers: 62,
      courses: 38,
      status: "Active",
      joinDate: "2023-03-22",
      lastActive: "1 day ago",
      performance: 88
    },
    {
      id: 3,
      name: "Bangalore Academy",
      type: "CBSE School",
      location: "Bangalore, India",
      students: 2100,
      teachers: 120,
      courses: 67,
      status: "Active",
      joinDate: "2022-11-08",
      lastActive: "3 hours ago",
      performance: 95
    },
    {
      id: 4,
      name: "Chennai Central School",
      type: "State Board",
      location: "Chennai, India",
      students: 750,
      teachers: 45,
      courses: 28,
      status: "Pending",
      joinDate: "2024-01-10",
      lastActive: "5 days ago",
      performance: 76
    }
  ]

  const overviewStats = {
    totalInstitutions: 24,
    activeInstitutions: 22,
    totalStudents: 15680,
    totalTeachers: 892,
    totalCourses: 456,
    avgPerformance: 89.2
  }

  const recentActivities = [
    {
      id: 1,
      institution: "Delhi Public School",
      action: "Added 15 new students",
      time: "2 hours ago",
      type: "student"
    },
    {
      id: 2,
      institution: "International School of Mumbai",
      action: "Completed course setup",
      time: "4 hours ago",
      type: "course"
    },
    {
      id: 3,
      institution: "Bangalore Academy",
      action: "Updated teacher profiles",
      time: "6 hours ago",
      type: "teacher"
    },
    {
      id: 4,
      institution: "Chennai Central School",
      action: "Requested support",
      time: "1 day ago",
      type: "support"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800'
      case 'Pending': return 'bg-yellow-100 text-yellow-800'
      case 'Suspended': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'student': return <Users className="w-4 h-4 text-blue-600" />
      case 'teacher': return <GraduationCap className="w-4 h-4 text-green-600" />
      case 'course': return <BookOpen className="w-4 h-4 text-purple-600" />
      case 'support': return <Bell className="w-4 h-4 text-orange-600" />
      default: return <Activity className="w-4 h-4 text-gray-600" />
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
              <h1 className="text-4xl font-bold font-cardo mb-2">Institution Dashboard</h1>
              <p className="text-lg text-gray-300 font-dm-sans">
                Manage schools, colleges, and educational institutions
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-2xl font-bold">{overviewStats.totalInstitutions}</div>
                <div className="text-sm text-gray-300">Institutions</div>
              </div>
              <Button className="bg-[#e27447] hover:bg-[#d65a2b] text-white rounded-sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Institution
              </Button>
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
                  <p className="text-sm font-medium text-gray-600">Total Institutions</p>
                  <p className="text-2xl font-bold text-gray-900">{overviewStats.totalInstitutions}</p>
                  <p className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +3 this month
                  </p>
                </div>
                <Building2 className="w-8 h-8 text-[#e27447]" />
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Students</p>
                  <p className="text-2xl font-bold text-blue-600">{overviewStats.totalStudents.toLocaleString()}</p>
                  <p className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +8.2% growth
                  </p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Teachers</p>
                  <p className="text-2xl font-bold text-green-600">{overviewStats.totalTeachers}</p>
                  <p className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +12 new teachers
                  </p>
                </div>
                <GraduationCap className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg. Performance</p>
                  <p className="text-2xl font-bold text-purple-600">{overviewStats.avgPerformance}%</p>
                  <p className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +2.1% improvement
                  </p>
                </div>
                <Award className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="institutions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 rounded-sm bg-white p-1 shadow-sm">
            <TabsTrigger
              value="institutions"
              className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white font-medium"
            >
              <Building2 className="w-4 h-4 mr-2" />
              Institutions
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white font-medium"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger
              value="activities"
              className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white font-medium"
            >
              <Activity className="w-4 h-4 mr-2" />
              Activities
            </TabsTrigger>
            <TabsTrigger
              value="requests"
              className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white font-medium"
            >
              <Bell className="w-4 h-4 mr-2" />
              Requests
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white font-medium"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Institutions Tab */}
          <TabsContent value="institutions" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold font-cardo">Institution Management</h2>
              <div className="flex items-center gap-2">
                <select
                  value={selectedInstitution}
                  onChange={(e) => setSelectedInstitution(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#e27447]"
                >
                  <option value="all">All Institutions</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="suspended">Suspended</option>
                </select>
                <Button variant="outline" className="rounded-sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
              {institutions.map(institution => (
                <Card key={institution.id} className="rounded-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-[#e27447] rounded-sm flex items-center justify-center text-white font-bold text-xl">
                          {institution.name.split(' ').map(word => word[0]).join('').slice(0, 2)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-semibold text-gray-900 font-cardo">
                              {institution.name}
                            </h3>
                            <Badge className={`rounded-sm ${getStatusColor(institution.status)}`}>
                              {institution.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-6 text-sm text-gray-600 mb-3">
                            <div className="flex items-center gap-1">
                              <Building2 className="w-4 h-4" />
                              {institution.type}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {institution.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              Joined {new Date(institution.joinDate).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-gray-600">Students</p>
                              <p className="font-semibold text-lg text-blue-600">{institution.students}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Teachers</p>
                              <p className="font-semibold text-lg text-green-600">{institution.teachers}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Courses</p>
                              <p className="font-semibold text-lg text-purple-600">{institution.courses}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Performance</p>
                              <p className="font-semibold text-lg text-orange-600">{institution.performance}%</p>
                            </div>
                          </div>
                          <p className="text-xs text-gray-500 mt-2">
                            Last active: {institution.lastActive}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Button variant="outline" size="sm" className="rounded-sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-sm">
                          <Mail className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-sm text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="rounded-sm">
                <CardHeader>
                  <CardTitle className="font-cardo">Institution Types</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-sm font-medium">K-12 Schools</span>
                      </div>
                      <span className="text-sm font-bold">12 institutions</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium">IB Schools</span>
                      </div>
                      <span className="text-sm font-bold">6 institutions</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <span className="text-sm font-medium">CBSE Schools</span>
                      </div>
                      <span className="text-sm font-bold">4 institutions</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                        <span className="text-sm font-medium">State Board</span>
                      </div>
                      <span className="text-sm font-bold">2 institutions</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-sm">
                <CardHeader>
                  <CardTitle className="font-cardo">Performance Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium">Excellent (90%+)</span>
                      </div>
                      <span className="text-sm font-bold">8 institutions</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-sm font-medium">Good (80-89%)</span>
                      </div>
                      <span className="text-sm font-bold">12 institutions</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm font-medium">Average (70-79%)</span>
                      </div>
                      <span className="text-sm font-bold">3 institutions</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-sm font-medium">Needs Support (&lt;70%)</span>
                      </div>
                      <span className="text-sm font-bold">1 institution</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="rounded-sm">
              <CardHeader>
                <CardTitle className="font-cardo">Growth Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end justify-between gap-2">
                  {[45, 52, 38, 67, 73, 58, 62, 78, 85, 92, 88, 95].map((value, index) => (
                    <div key={index} className="flex flex-col items-center gap-2">
                      <div 
                        className="bg-[#e27447] rounded-t-sm w-8 transition-all duration-500"
                        style={{ height: `${(value / 100) * 200}px` }}
                      ></div>
                      <span className="text-xs text-gray-600">{index + 1}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-4 text-center">
                  Monthly institution growth over the past year
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activities Tab */}
          <TabsContent value="activities" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold font-cardo">Recent Activities</h2>
              <Button variant="outline" className="rounded-sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
            <div className="space-y-4">
              {recentActivities.map(activity => (
                <Card key={activity.id} className="rounded-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      {getActivityIcon(activity.type)}
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 font-dm-sans">
                          {activity.institution}
                        </p>
                        <p className="text-sm text-gray-600">{activity.action}</p>
                      </div>
                      <div className="text-sm text-gray-500">
                        {activity.time}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Requests Tab */}
          <TabsContent value="requests" className="space-y-6">
            <div className="grid gap-4">
              <Card className="rounded-sm border-l-4 border-blue-500">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 font-cardo">New Institution Request</h3>
                      <p className="text-sm text-gray-600">Chennai Central School wants to join the platform</p>
                      <p className="text-xs text-gray-500 mt-1">Requested 2 days ago</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 rounded-sm">
                        Approve
                      </Button>
                      <Button variant="outline" size="sm" className="rounded-sm">
                        Review
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-sm border-l-4 border-yellow-500">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 font-cardo">Support Request</h3>
                      <p className="text-sm text-gray-600">Delhi Public School needs help with course setup</p>
                      <p className="text-xs text-gray-500 mt-1">Requested 1 day ago</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 rounded-sm">
                        Respond
                      </Button>
                      <Button variant="outline" size="sm" className="rounded-sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="rounded-sm">
              <CardHeader>
                <CardTitle className="font-cardo">Institution Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Auto-approve Institutions
                    </label>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded-sm" />
                      <span className="text-sm text-gray-600">Automatically approve new institution requests</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Default Course Limit
                    </label>
                    <input
                      type="number"
                      defaultValue={50}
                      className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#e27447] focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Institution Categories
                  </label>
                  <div className="space-y-2">
                    {["K-12 School", "IB School", "CBSE School", "State Board", "University", "College"].map(category => (
                      <div key={category} className="flex items-center justify-between">
                        <span className="font-dm-sans">{category}</span>
                        <Button variant="outline" size="sm" className="rounded-sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
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

export default InstitutionDashboardTemplate

