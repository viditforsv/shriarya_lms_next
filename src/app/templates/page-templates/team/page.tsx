'use client'
import { memo } from "react"
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components-demo/ui/ui-components/card"
import { Button } from "@/app/components-demo/ui/ui-components/button"
import { Badge } from "@/app/components-demo/ui/ui-components/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components-demo/ui/tabs"
import { CompletionDot } from "@/app/components-demo/ui/template-status"
import {
  Users,
  GraduationCap,
  Award,
  BookOpen,
  Star,
  Mail,
  Linkedin,
  Twitter,
  Globe,
  Calendar,
  MapPin,
  Phone,
  MessageCircle,
  Plus,
  Edit,
  Eye,
  Trash2,
  Filter,
  Search,
  Heart,
  Share2,
  Download,
  Upload,
  Settings,
  Zap,
  Target,
  TrendingUp,
  Clock,
  CheckCircle
} from 'lucide-react'

const TeamTemplate = memo(function TeamTemplate() {
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [selectedRole, setSelectedRole] = useState('all')

  const teamMembers = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      role: 'Chief Academic Officer',
      department: 'Academic',
      email: 'sarah.johnson@shrividhya.in',
      phone: '+91-98765-43210',
      location: 'New Delhi, India',
      bio: 'Dr. Sarah Johnson has over 15 years of experience in educational technology and curriculum development. She holds a Ph.D. in Mathematics Education and has published numerous research papers on innovative teaching methodologies.',
      image: null,
      specialties: ['Mathematics', 'Curriculum Design', 'Educational Technology'],
      experience: '15 years',
      education: 'Ph.D. Mathematics Education',
      achievements: ['Best Teacher Award 2023', 'Published 25+ Research Papers'],
      social: {
        linkedin: 'https://linkedin.com/in/sarahjohnson',
        twitter: 'https://twitter.com/sarahjohnson',
        website: 'https://sarahjohnson.com'
      },
      courses: ['Complete Mathematics Course - Class 10', 'Advanced Calculus'],
      students: 1250,
      rating: 4.9,
      joinDate: '2020-01-15',
      status: 'active'
    },
    {
      id: 2,
      name: 'Prof. Michael Chen',
      role: 'Head of Physics Department',
      department: 'Academic',
      email: 'michael.chen@shrividhya.in',
      phone: '+91-98765-43211',
      location: 'Mumbai, India',
      bio: 'Prof. Michael Chen is a renowned physicist with expertise in quantum mechanics and theoretical physics. He has taught at prestigious institutions and authored several textbooks used by universities worldwide.',
      image: null,
      specialties: ['Physics', 'Quantum Mechanics', 'Research'],
      experience: '12 years',
      education: 'M.Sc. Physics, Ph.D. Theoretical Physics',
      achievements: ['Nobel Prize Nominee 2022', 'Author of 10+ Textbooks'],
      social: {
        linkedin: 'https://linkedin.com/in/michaelchen',
        twitter: 'https://twitter.com/michaelchen',
        website: 'https://michaelchen.com'
      },
      courses: ['Physics Masterclass - Advanced Level', 'Quantum Physics Basics'],
      students: 890,
      rating: 4.8,
      joinDate: '2021-03-22',
      status: 'active'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Student Success Manager',
      department: 'Support',
      email: 'emily.rodriguez@shrividhya.in',
      phone: '+91-98765-43212',
      location: 'Bangalore, India',
      bio: 'Emily Rodriguez specializes in student engagement and success strategies. She has helped thousands of students achieve their academic goals through personalized learning approaches and motivational techniques.',
      image: null,
      specialties: ['Student Engagement', 'Learning Psychology', 'Mentoring'],
      experience: '8 years',
      education: 'M.A. Educational Psychology',
      achievements: ['Student Success Rate 95%', 'Mentor of the Year 2023'],
      social: {
        linkedin: 'https://linkedin.com/in/emilyrodriguez',
        twitter: 'https://twitter.com/emilyrodriguez',
        website: 'https://emilyrodriguez.com'
      },
      courses: ['Study Skills Masterclass', 'Time Management for Students'],
      students: 2100,
      rating: 4.7,
      joinDate: '2022-06-10',
      status: 'active'
    },
    {
      id: 4,
      name: 'David Kim',
      role: 'Technology Director',
      department: 'Technology',
      email: 'david.kim@shrividhya.in',
      phone: '+91-98765-43213',
      location: 'Chennai, India',
      bio: 'David Kim leads our technology initiatives, ensuring seamless learning experiences through innovative platforms and tools. He has expertise in AI, machine learning, and educational software development.',
      image: null,
      specialties: ['Educational Technology', 'AI/ML', 'Software Development'],
      experience: '10 years',
      education: 'B.Tech Computer Science, M.Tech AI',
      achievements: ['Tech Innovation Award 2023', 'Patented 5 Educational Tools'],
      social: {
        linkedin: 'https://linkedin.com/in/davidkim',
        twitter: 'https://twitter.com/davidkim',
        website: 'https://davidkim.com'
      },
      courses: ['Introduction to AI', 'Educational Technology'],
      students: 750,
      rating: 4.6,
      joinDate: '2021-11-08',
      status: 'active'
    },
    {
      id: 5,
      name: 'Lisa Wang',
      role: 'Content Creator',
      department: 'Content',
      email: 'lisa.wang@shrividhya.in',
      phone: '+91-98765-43214',
      location: 'Pune, India',
      bio: 'Lisa Wang creates engaging educational content including videos, animations, and interactive materials. She has a background in multimedia design and educational content development.',
      image: null,
      specialties: ['Content Creation', 'Video Production', 'Animation'],
      experience: '6 years',
      education: 'B.A. Multimedia Design',
      achievements: ['Content Excellence Award 2023', 'Created 500+ Educational Videos'],
      social: {
        linkedin: 'https://linkedin.com/in/lisawang',
        twitter: 'https://twitter.com/lisawang',
        website: 'https://lisawang.com'
      },
      courses: ['Creative Learning Methods', 'Digital Content Creation'],
      students: 1200,
      rating: 4.5,
      joinDate: '2023-01-20',
      status: 'active'
    }
  ]

  const departments = [
    { id: 'all', name: 'All Departments', count: teamMembers.length },
    { id: 'Academic', name: 'Academic', count: teamMembers.filter(m => m.department === 'Academic').length },
    { id: 'Support', name: 'Support', count: teamMembers.filter(m => m.department === 'Support').length },
    { id: 'Technology', name: 'Technology', count: teamMembers.filter(m => m.department === 'Technology').length },
    { id: 'Content', name: 'Content', count: teamMembers.filter(m => m.department === 'Content').length }
  ]

  const stats = {
    totalMembers: teamMembers.length,
    totalStudents: teamMembers.reduce((sum, m) => sum + m.students, 0),
    averageRating: (teamMembers.reduce((sum, m) => sum + m.rating, 0) / teamMembers.length).toFixed(1),
    activeMembers: teamMembers.filter(m => m.status === 'active').length
  }

  const filteredMembers = teamMembers.filter(member => {
    const departmentMatch = selectedDepartment === 'all' || member.department === selectedDepartment
    const roleMatch = selectedRole === 'all' || member.role.toLowerCase().includes(selectedRole.toLowerCase())
    return departmentMatch && roleMatch
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#feefea] to-[#fffefd]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1e293b] to-[#2d3748] text-white py-8 relative">
        <CompletionDot isCompleted={true} />
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold font-cardo mb-2">Our Team</h1>
              <p className="text-lg text-gray-300 font-dm-sans">
                Meet the passionate educators and experts behind your learning journey
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-2xl font-bold">{stats.totalMembers}</div>
                <div className="text-sm text-gray-300">Team Members</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-yellow-400">{stats.averageRating}</div>
                <div className="text-sm text-gray-300">Avg Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue="team" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 rounded-sm bg-white p-1 shadow-sm">
            <TabsTrigger
              value="team"
              className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white font-medium"
            >
              <Users className="w-4 h-4 mr-2" />
              Team
            </TabsTrigger>
            <TabsTrigger
              value="departments"
              className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white font-medium"
            >
              <Target className="w-4 h-4 mr-2" />
              Departments
            </TabsTrigger>
            <TabsTrigger
              value="stats"
              className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white font-medium"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Statistics
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white font-medium"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Team Tab */}
          <TabsContent value="team" className="space-y-6">
            {/* Filters */}
            <Card className="rounded-sm">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search team members..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#e27447] focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <select
                      value={selectedDepartment}
                      onChange={(e) => setSelectedDepartment(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#e27447] focus:border-transparent"
                    >
                      {departments.map(dept => (
                        <option key={dept.id} value={dept.id}>
                          {dept.name} ({dept.count})
                        </option>
                      ))}
                    </select>
                    <select
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#e27447] focus:border-transparent"
                    >
                      <option value="all">All Roles</option>
                      <option value="chief">Chief</option>
                      <option value="head">Head</option>
                      <option value="manager">Manager</option>
                      <option value="director">Director</option>
                      <option value="creator">Creator</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Team Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMembers.map(member => (
                <Card key={member.id} className="rounded-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="text-center">
                        <div className="w-20 h-20 bg-[#e27447] rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 font-cardo">
                          {member.name}
                        </h3>
                        <p className="text-sm text-gray-600">{member.role}</p>
                        <Badge className="bg-blue-100 text-blue-800 rounded-sm text-xs mt-2">
                          {member.department}
                        </Badge>
                      </div>

                      {/* Bio */}
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {member.bio.substring(0, 120)}...
                      </p>

                      {/* Specialties */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Specialties:</h4>
                        <div className="flex flex-wrap gap-1">
                          {member.specialties.map((specialty, index) => (
                            <Badge key={index} variant="outline" className="rounded-sm text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="text-lg font-bold text-[#e27447]">{member.students}</div>
                          <div className="text-xs text-gray-600">Students</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-yellow-600">{member.rating}</div>
                          <div className="text-xs text-gray-600">Rating</div>
                        </div>
                      </div>

                      {/* Social Links */}
                      <div className="flex items-center justify-center gap-3">
                        <Button variant="outline" size="sm" className="rounded-sm">
                          <Mail className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-sm">
                          <Linkedin className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-sm">
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* View Profile Button */}
                      <Button variant="outline" className="w-full rounded-sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Departments Tab */}
          <TabsContent value="departments" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {departments.slice(1).map(dept => (
                <Card key={dept.id} className="rounded-sm">
                  <CardHeader>
                    <CardTitle className="font-cardo text-center">{dept.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-3xl font-bold text-[#e27447] mb-2">{dept.count}</div>
                    <div className="text-sm text-gray-600 mb-4">Team Members</div>
                    <Button variant="outline" className="w-full rounded-sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View Team
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="rounded-sm">
                <CardHeader>
                  <CardTitle className="font-cardo">Department Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {departments.slice(1).map(dept => {
                      const percentage = (dept.count / teamMembers.length) * 100
                      return (
                        <div key={dept.id} className="flex items-center justify-between">
                          <span className="text-sm font-medium">{dept.name}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-32 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-[#e27447] h-2 rounded-full" 
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium">{dept.count}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-sm">
                <CardHeader>
                  <CardTitle className="font-cardo">Recent Additions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {teamMembers.slice(0, 3).map(member => (
                      <div key={member.id} className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#e27447] rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{member.name}</p>
                          <p className="text-xs text-gray-600">{member.role}</p>
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(member.joinDate).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Statistics Tab */}
          <TabsContent value="stats" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="rounded-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Members</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalMembers}</p>
                    </div>
                    <Users className="w-8 h-8 text-[#e27447]" />
                  </div>
                </CardContent>
              </Card>
              <Card className="rounded-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Students</p>
                      <p className="text-2xl font-bold text-blue-600">{stats.totalStudents.toLocaleString()}</p>
                    </div>
                    <GraduationCap className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card className="rounded-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Average Rating</p>
                      <p className="text-2xl font-bold text-yellow-600">{stats.averageRating}</p>
                    </div>
                    <Star className="w-8 h-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>
              <Card className="rounded-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Members</p>
                      <p className="text-2xl font-bold text-green-600">{stats.activeMembers}</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="rounded-sm">
                <CardHeader>
                  <CardTitle className="font-cardo">Experience Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">10+ years</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-[#e27447] h-2 rounded-full" style={{ width: '40%' }}></div>
                        </div>
                        <span className="text-sm font-medium">2</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">5-10 years</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                        </div>
                        <span className="text-sm font-medium">3</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-sm">
                <CardHeader>
                  <CardTitle className="font-cardo">Top Performers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {teamMembers.slice(0, 3).map((member, index) => (
                      <div key={member.id} className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#e27447] rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{member.name}</p>
                          <p className="text-xs text-gray-600">{member.students} students</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-sm font-medium">{member.rating}</span>
                        </div>
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
                <CardTitle className="font-cardo">Team Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Public Team Directory</h4>
                      <p className="text-sm text-gray-600">Allow public access to team information</p>
                    </div>
                    <input type="checkbox" className="rounded-sm" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Contact Information</h4>
                      <p className="text-sm text-gray-600">Show contact details on profiles</p>
                    </div>
                    <input type="checkbox" className="rounded-sm" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Social Media Links</h4>
                      <p className="text-sm text-gray-600">Display social media profiles</p>
                    </div>
                    <input type="checkbox" className="rounded-sm" defaultChecked />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Default Profile Image
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                      <Upload className="w-6 h-6 text-gray-400" />
                    </div>
                    <Button variant="outline" className="rounded-sm">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Image
                    </Button>
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

export default TeamTemplate
