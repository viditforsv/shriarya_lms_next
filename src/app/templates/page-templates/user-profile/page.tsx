'use client'
import { memo } from "react"
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components-demo/ui/card"
import { Button } from "@/app/components-demo/ui/button"
import { Badge } from "@/app/components-demo/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components-demo/ui/tabs"
import { CompletionDot } from "@/app/components-demo/ui/template-status"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Save,
  Camera,
  Settings,
  Bell,
  Shield,
  Lock,
  Eye,
  EyeOff,
  Star,
  Award,
  BookOpen,
  Clock,
  TrendingUp,
  Download,
  Upload,
  Trash2,
  Plus,
  Minus,
  CheckCircle,
  XCircle,
  AlertCircle,
  Heart,
  Share2,
  MessageCircle,
  Linkedin,
  Twitter,
  Globe,
  GraduationCap,
  Target,
  Zap
} from 'lucide-react'

const UserProfileTemplate = memo(function UserProfileTemplate() {
  const [isEditing, setIsEditing] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')

  const userProfile = {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+91-98765-43210',
    location: 'New Delhi, India',
    bio: 'Passionate mathematics educator with over 10 years of experience in teaching and curriculum development. I love helping students discover the beauty of mathematics through interactive learning.',
    avatar: null,
    role: 'Student',
    joinDate: '2022-03-15',
    lastActive: '2024-01-20',
    verified: true,
    preferences: {
      notifications: true,
      emailUpdates: true,
      publicProfile: true,
      showEmail: false,
      showPhone: false
    },
    social: {
      linkedin: 'https://linkedin.com/in/sarahjohnson',
      twitter: 'https://twitter.com/sarahjohnson',
      website: 'https://sarahjohnson.com'
    },
    achievements: [
      { id: 1, title: 'Mathematics Master', description: 'Completed 5 advanced math courses', date: '2024-01-15', icon: 'Award' },
      { id: 2, title: 'Perfect Score', description: 'Scored 100% in Calculus Final Exam', date: '2023-12-20', icon: 'Star' },
      { id: 3, title: 'Study Streak', description: '30 days of consecutive learning', date: '2024-01-10', icon: 'Target' }
    ],
    courses: [
      { id: 1, name: 'Complete Mathematics Course - Class 10', progress: 85, status: 'in-progress', startDate: '2023-09-01' },
      { id: 2, name: 'Advanced Calculus', progress: 100, status: 'completed', startDate: '2023-06-15' },
      { id: 3, name: 'Statistics & Probability', progress: 45, status: 'in-progress', startDate: '2024-01-01' }
    ],
    stats: {
      totalCourses: 12,
      completedCourses: 8,
      totalHours: 156,
      certificates: 5,
      currentStreak: 15,
      longestStreak: 45
    }
  }

  const [profile, setProfile] = useState(userProfile)

  const handleSave = () => {
    setIsEditing(false)
    // Here you would typically save to backend
  }

  const handleCancel = () => {
    setProfile(userProfile)
    setIsEditing(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'in-progress': return 'bg-blue-100 text-blue-800'
      case 'not-started': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#feefea] to-[#fffefd]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1e293b] to-[#2d3748] text-white py-8 relative">
        <CompletionDot isCompleted={true} />
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-[#e27447] rounded-full flex items-center justify-center text-white font-bold text-2xl">
                {profile.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h1 className="text-4xl font-bold font-cardo mb-2">{profile.name}</h1>
                <p className="text-lg text-gray-300 font-dm-sans">{profile.role}</p>
                {profile.verified && (
                  <Badge className="bg-green-100 text-green-800 rounded-sm mt-2">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-2xl font-bold">{profile.stats.totalCourses}</div>
                <div className="text-sm text-gray-300">Courses</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-yellow-400">{profile.stats.certificates}</div>
                <div className="text-sm text-gray-300">Certificates</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 rounded-sm bg-white p-1 shadow-sm">
            <TabsTrigger
              value="profile"
              className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white font-medium"
            >
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="courses"
              className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white font-medium"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Courses
            </TabsTrigger>
            <TabsTrigger
              value="achievements"
              className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white font-medium"
            >
              <Award className="w-4 h-4 mr-2" />
              Achievements
            </TabsTrigger>
            <TabsTrigger
              value="activity"
              className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white font-medium"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Activity
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white font-medium"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Info */}
              <div className="lg:col-span-2">
                <Card className="rounded-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="font-cardo">Personal Information</CardTitle>
                      {!isEditing ? (
                        <Button variant="outline" onClick={() => setIsEditing(true)} className="rounded-sm">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Profile
                        </Button>
                      ) : (
                        <div className="flex gap-2">
                          <Button onClick={handleSave} className="bg-[#e27447] hover:bg-[#d65a2b] rounded-sm">
                            <Save className="w-4 h-4 mr-2" />
                            Save
                          </Button>
                          <Button variant="outline" onClick={handleCancel} className="rounded-sm">
                            Cancel
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={profile.name}
                            onChange={(e) => setProfile({...profile, name: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#e27447] focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-900">{profile.name}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        {isEditing ? (
                          <input
                            type="email"
                            value={profile.email}
                            onChange={(e) => setProfile({...profile, email: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#e27447] focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-900">{profile.email}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                        {isEditing ? (
                          <input
                            type="tel"
                            value={profile.phone}
                            onChange={(e) => setProfile({...profile, phone: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#e27447] focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-900">{profile.phone}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={profile.location}
                            onChange={(e) => setProfile({...profile, location: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#e27447] focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-900">{profile.location}</p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                      {isEditing ? (
                        <textarea
                          value={profile.bio}
                          onChange={(e) => setProfile({...profile, bio: e.target.value})}
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#e27447] focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900">{profile.bio}</p>
                      )}
                    </div>

                    {/* Social Links */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Social Links</label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">LinkedIn</label>
                          {isEditing ? (
                            <input
                              type="url"
                              value={profile.social.linkedin}
                              onChange={(e) => setProfile({...profile, social: {...profile.social, linkedin: e.target.value}})}
                              className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#e27447] focus:border-transparent"
                            />
                          ) : (
                            <p className="text-gray-900 text-sm">{profile.social.linkedin}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Twitter</label>
                          {isEditing ? (
                            <input
                              type="url"
                              value={profile.social.twitter}
                              onChange={(e) => setProfile({...profile, social: {...profile.social, twitter: e.target.value}})}
                              className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#e27447] focus:border-transparent"
                            />
                          ) : (
                            <p className="text-gray-900 text-sm">{profile.social.twitter}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-xs text-gray-600 mb-1">Website</label>
                          {isEditing ? (
                            <input
                              type="url"
                              value={profile.social.website}
                              onChange={(e) => setProfile({...profile, social: {...profile.social, website: e.target.value}})}
                              className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#e27447] focus:border-transparent"
                            />
                          ) : (
                            <p className="text-gray-900 text-sm">{profile.social.website}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Profile Stats */}
              <div className="space-y-6">
                <Card className="rounded-sm">
                  <CardHeader>
                    <CardTitle className="font-cardo">Profile Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Total Courses</span>
                      <span className="font-bold text-[#e27447]">{profile.stats.totalCourses}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Completed</span>
                      <span className="font-bold text-green-600">{profile.stats.completedCourses}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Total Hours</span>
                      <span className="font-bold text-blue-600">{profile.stats.totalHours}h</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Certificates</span>
                      <span className="font-bold text-purple-600">{profile.stats.certificates}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Current Streak</span>
                      <span className="font-bold text-orange-600">{profile.stats.currentStreak} days</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="rounded-sm">
                  <CardHeader>
                    <CardTitle className="font-cardo">Account Info</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Member since</span>
                      <span>{new Date(profile.joinDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Last active</span>
                      <span>{new Date(profile.lastActive).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Role</span>
                      <Badge className="bg-blue-100 text-blue-800 rounded-sm">{profile.role}</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Courses Tab */}
          <TabsContent value="courses" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold font-cardo">My Courses</h2>
              <Button className="bg-[#e27447] hover:bg-[#d65a2b] rounded-sm">
                <Plus className="w-4 h-4 mr-2" />
                Enroll in Course
              </Button>
            </div>

            <div className="grid gap-4">
              {profile.courses.map(course => (
                <Card key={course.id} className="rounded-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 font-cardo mb-2">
                          {course.name}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Started {new Date(course.startDate).toLocaleDateString()}
                          </div>
                          <Badge className={`rounded-sm ${getStatusColor(course.status)}`}>
                            {course.status}
                          </Badge>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                          <div 
                            className="bg-[#e27447] h-2 rounded-full transition-all duration-500"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span>{course.progress}% Complete</span>
                          <span>{course.progress === 100 ? 'Completed' : 'In Progress'}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Button variant="outline" size="sm" className="rounded-sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold font-cardo">Achievements</h2>
              <Button variant="outline" className="rounded-sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share Achievements
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profile.achievements.map(achievement => (
                <Card key={achievement.id} className="rounded-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-[#e27447] rounded-full flex items-center justify-center text-white mx-auto mb-4">
                      <Award className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 font-cardo mb-2">
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
                    <div className="text-xs text-gray-500">
                      Earned on {new Date(achievement.date).toLocaleDateString()}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="rounded-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Learning Streak</p>
                      <p className="text-2xl font-bold text-orange-600">{profile.stats.currentStreak}</p>
                      <p className="text-xs text-gray-500">days</p>
                    </div>
                    <Target className="w-8 h-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
              <Card className="rounded-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Study Time</p>
                      <p className="text-2xl font-bold text-blue-600">{profile.stats.totalHours}</p>
                      <p className="text-xs text-gray-500">hours</p>
                    </div>
                    <Clock className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card className="rounded-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Certificates</p>
                      <p className="text-2xl font-bold text-green-600">{profile.stats.certificates}</p>
                      <p className="text-xs text-gray-500">earned</p>
                    </div>
                    <Award className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card className="rounded-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                      <p className="text-2xl font-bold text-purple-600">
                        {Math.round((profile.stats.completedCourses / profile.stats.totalCourses) * 100)}%
                      </p>
                      <p className="text-xs text-gray-500">courses</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="rounded-sm">
              <CardHeader>
                <CardTitle className="font-cardo">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-sm">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Completed &quot;Advanced Calculus&quot;</p>
                      <p className="text-sm text-gray-600">2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-sm">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Started &quot;Statistics &amp; Probability&quot;</p>
                      <p className="text-sm text-gray-600">1 week ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-sm">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Award className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Earned &quot;Mathematics Master&quot; achievement</p>
                      <p className="text-sm text-gray-600">2 weeks ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="rounded-sm">
                <CardHeader>
                  <CardTitle className="font-cardo">Privacy Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Public Profile</h4>
                      <p className="text-sm text-gray-600">Allow others to view your profile</p>
                    </div>
                    <input type="checkbox" className="rounded-sm" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Show Email</h4>
                      <p className="text-sm text-gray-600">Display email on public profile</p>
                    </div>
                    <input type="checkbox" className="rounded-sm" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Show Phone</h4>
                      <p className="text-sm text-gray-600">Display phone on public profile</p>
                    </div>
                    <input type="checkbox" className="rounded-sm" />
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-sm">
                <CardHeader>
                  <CardTitle className="font-cardo">Notification Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Email Notifications</h4>
                      <p className="text-sm text-gray-600">Receive email updates</p>
                    </div>
                    <input type="checkbox" className="rounded-sm" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Push Notifications</h4>
                      <p className="text-sm text-gray-600">Receive push notifications</p>
                    </div>
                    <input type="checkbox" className="rounded-sm" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Course Updates</h4>
                      <p className="text-sm text-gray-600">Notify about course changes</p>
                    </div>
                    <input type="checkbox" className="rounded-sm" defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="rounded-sm">
              <CardHeader>
                <CardTitle className="font-cardo">Account Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Change Password
                  </label>
                  <div className="space-y-3">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Current password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#e27447] focus:border-transparent"
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="New password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#e27447] focus:border-transparent"
                    />
                    <div className="flex items-center gap-2">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm new password"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#e27447] focus:border-transparent"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowPassword(!showPassword)}
                        className="rounded-sm"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h4 className="font-medium text-gray-900 mb-4">Danger Zone</h4>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full rounded-sm text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Account
                    </Button>
                    <Button variant="outline" className="w-full rounded-sm text-red-600 hover:text-red-700">
                      <Download className="w-4 h-4 mr-2" />
                      Export Data
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
})

export default UserProfileTemplate
