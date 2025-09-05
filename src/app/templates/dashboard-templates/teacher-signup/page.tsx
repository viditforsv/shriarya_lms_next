'use client'

import { useState, memo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components-demo/ui/card"
import { Button } from "@/app/components-demo/ui/button"
import { Badge } from "@/app/components-demo/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components-demo/ui/tabs"
import { CompletionDot } from "@/app/components-demo/ui/template-status"
import { TemplateLayout } from "@/app/components-demo/ui/template-layout"
import {
  GraduationCap,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  BookOpen,
  Award,
  Upload,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  Edit,
  Trash2,
  Download,
  Send,
  Clock,
  Star,
  Users,
  Building2,
  FileText,
  Camera,
  Plus,
  Search,
  Filter
} from 'lucide-react'

const TeacherSignupTemplate = memo(function TeacherSignupTemplate() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    },
    professionalInfo: {
      institution: '',
      department: '',
      position: '',
      experience: '',
      qualifications: '',
      subjects: [],
      bio: ''
    },
    documents: {
      resume: null,
      certificates: [],
      profilePicture: null
    },
    preferences: {
      teachingLevel: '',
      availability: '',
      communication: '',
      notifications: true
    }
  })

  const pendingApplications = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@email.com",
      institution: "Delhi Public School",
      subjects: ["Mathematics", "Physics"],
      experience: "8 years",
      status: "Under Review",
      submittedDate: "2024-01-15",
      reviewNotes: "Excellent qualifications, pending background check"
    },
    {
      id: 2,
      name: "Prof. Michael Chen",
      email: "michael.chen@email.com",
      institution: "International School of Mumbai",
      subjects: ["Chemistry", "Biology"],
      experience: "12 years",
      status: "Pending Documents",
      submittedDate: "2024-01-12",
      reviewNotes: "Missing teaching certificate"
    },
    {
      id: 3,
      name: "Ms. Emily Rodriguez",
      email: "emily.rodriguez@email.com",
      institution: "Bangalore Academy",
      subjects: ["English", "Literature"],
      experience: "5 years",
      status: "Approved",
      submittedDate: "2024-01-10",
      reviewNotes: "Ready for onboarding"
    },
    {
      id: 4,
      name: "Mr. David Kim",
      email: "david.kim@email.com",
      institution: "Chennai Central School",
      subjects: ["Computer Science", "Mathematics"],
      experience: "6 years",
      status: "Rejected",
      submittedDate: "2024-01-08",
      reviewNotes: "Insufficient qualifications for advanced courses"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800'
      case 'Under Review': return 'bg-blue-100 text-blue-800'
      case 'Pending Documents': return 'bg-yellow-100 text-yellow-800'
      case 'Rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved': return <CheckCircle className="w-4 h-4" />
      case 'Under Review': return <Clock className="w-4 h-4" />
      case 'Pending Documents': return <AlertCircle className="w-4 h-4" />
      case 'Rejected': return <XCircle className="w-4 h-4" />
      default: return <AlertCircle className="w-4 h-4" />
    }
  }

  const steps = [
    { id: 1, title: "Personal Information", icon: User },
    { id: 2, title: "Professional Details", icon: GraduationCap },
    { id: 3, title: "Documents Upload", icon: Upload },
    { id: 4, title: "Preferences", icon: Star },
    { id: 5, title: "Review & Submit", icon: CheckCircle }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#feefea] to-[#fffefd]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1e293b] to-[#2d3748] text-white py-8 relative">
        <CompletionDot isCompleted={true} />
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold font-cardo mb-2">Teacher Signup</h1>
              <p className="text-lg text-gray-300 font-dm-sans">
                Join our platform as an educator and inspire students
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-2xl font-bold">{pendingApplications.length}</div>
                <div className="text-sm text-gray-300">Applications</div>
              </div>
              <Button className="bg-[#e27447] hover:bg-[#d65a2b] text-white rounded-sm">
                <Plus className="w-4 h-4 mr-2" />
                New Application
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue="signup" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 rounded-sm bg-white p-1 shadow-sm">
            <TabsTrigger
              value="signup"
              className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white font-medium"
            >
              <User className="w-4 h-4 mr-2" />
              Signup Form
            </TabsTrigger>
            <TabsTrigger
              value="applications"
              className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white font-medium"
            >
              <FileText className="w-4 h-4 mr-2" />
              Applications
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white font-medium"
            >
              <Award className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Signup Form Tab */}
          <TabsContent value="signup" className="space-y-6">
            <Card className="rounded-sm">
              <CardHeader>
                <CardTitle className="font-cardo">Teacher Registration</CardTitle>
                <div className="flex items-center justify-between mt-4">
                  {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                        currentStep >= step.id 
                          ? 'bg-[#e27447] border-[#e27447] text-white' 
                          : 'border-gray-300 text-gray-500'
                      }`}>
                        <step.icon className="w-5 h-5" />
                      </div>
                      <div className="ml-3">
                        <p className={`text-sm font-medium ${
                          currentStep >= step.id ? 'text-[#e27447]' : 'text-gray-500'
                        }`}>
                          {step.title}
                        </p>
                      </div>
                      {index < steps.length - 1 && (
                        <div className={`w-16 h-0.5 mx-4 ${
                          currentStep > step.id ? 'bg-[#e27447]' : 'bg-gray-300'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="p-8">
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold font-cardo mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#e27447] focus:border-transparent"
                          placeholder="Enter your first name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#e27447] focus:border-transparent"
                          placeholder="Enter your last name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#e27447] focus:border-transparent"
                          placeholder="Enter your email"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#e27447] focus:border-transparent"
                          placeholder="Enter your phone number"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Date of Birth *
                        </label>
                        <input
                          type="date"
                          className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#e27447] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Country *
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#e27447] focus:border-transparent">
                          <option>Select Country</option>
                          <option>India</option>
                          <option>United States</option>
                          <option>United Kingdom</option>
                          <option>Canada</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address *
                      </label>
                      <textarea
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#e27447] focus:border-transparent"
                        placeholder="Enter your full address"
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Professional Details */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold font-cardo mb-4">Professional Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Institution/Organization *
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#e27447] focus:border-transparent"
                          placeholder="Enter institution name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Department *
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#e27447] focus:border-transparent"
                          placeholder="Enter department"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Position/Title *
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#e27447] focus:border-transparent">
                          <option>Select Position</option>
                          <option>Teacher</option>
                          <option>Professor</option>
                          <option>Lecturer</option>
                          <option>Instructor</option>
                          <option>Head of Department</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Years of Experience *
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#e27447] focus:border-transparent">
                          <option>Select Experience</option>
                          <option>0-1 years</option>
                          <option>2-5 years</option>
                          <option>6-10 years</option>
                          <option>11-15 years</option>
                          <option>15+ years</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Educational Qualifications *
                      </label>
                      <textarea
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#e27447] focus:border-transparent"
                        placeholder="List your degrees, certifications, etc."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subjects You Teach *
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {["Mathematics", "Physics", "Chemistry", "Biology", "English", "History", "Geography", "Computer Science"].map(subject => (
                          <label key={subject} className="flex items-center space-x-2">
                            <input type="checkbox" className="rounded-sm" />
                            <span className="text-sm">{subject}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Teaching Philosophy/Bio
                      </label>
                      <textarea
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#e27447] focus:border-transparent"
                        placeholder="Tell us about your teaching approach and philosophy..."
                      />
                    </div>
                  </div>
                )}

                {/* Step 3: Documents Upload */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold font-cardo mb-4">Document Upload</h3>
                    <div className="space-y-6">
                      <div className="border-2 border-dashed border-gray-300 rounded-sm p-8 text-center">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h4 className="text-lg font-medium text-gray-900 mb-2">Upload Resume/CV</h4>
                        <p className="text-sm text-gray-600 mb-4">PDF, DOC, or DOCX files only (Max 10MB)</p>
                        <Button variant="outline" className="rounded-sm">
                          <Upload className="w-4 h-4 mr-2" />
                          Choose File
                        </Button>
                      </div>
                      <div className="border-2 border-dashed border-gray-300 rounded-sm p-8 text-center">
                        <Award className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h4 className="text-lg font-medium text-gray-900 mb-2">Upload Certificates</h4>
                        <p className="text-sm text-gray-600 mb-4">Teaching certificates, degrees, etc.</p>
                        <Button variant="outline" className="rounded-sm">
                          <Upload className="w-4 h-4 mr-2" />
                          Choose Files
                        </Button>
                      </div>
                      <div className="border-2 border-dashed border-gray-300 rounded-sm p-8 text-center">
                        <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h4 className="text-lg font-medium text-gray-900 mb-2">Profile Picture</h4>
                        <p className="text-sm text-gray-600 mb-4">JPG, PNG files only (Max 5MB)</p>
                        <Button variant="outline" className="rounded-sm">
                          <Camera className="w-4 h-4 mr-2" />
                          Choose Photo
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Preferences */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold font-cardo mb-4">Preferences & Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Preferred Teaching Level
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#e27447] focus:border-transparent">
                          <option>Select Level</option>
                          <option>Elementary (K-5)</option>
                          <option>Middle School (6-8)</option>
                          <option>High School (9-12)</option>
                          <option>College/University</option>
                          <option>All Levels</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Availability
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#e27447] focus:border-transparent">
                          <option>Select Availability</option>
                          <option>Full-time</option>
                          <option>Part-time</option>
                          <option>Weekends only</option>
                          <option>Evenings only</option>
                          <option>Flexible</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Communication Preferences
                      </label>
                      <div className="space-y-2">
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded-sm" defaultChecked />
                          <span className="text-sm">Email notifications</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded-sm" defaultChecked />
                          <span className="text-sm">SMS notifications</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded-sm" />
                          <span className="text-sm">Phone calls</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 5: Review & Submit */}
                {currentStep === 5 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold font-cardo mb-4">Review Your Application</h3>
                    <div className="bg-gray-50 rounded-sm p-6 space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900">Personal Information</h4>
                        <p className="text-sm text-gray-600">John Doe • john.doe@email.com • +1-234-567-8900</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Professional Information</h4>
                        <p className="text-sm text-gray-600">Delhi Public School • Mathematics Teacher • 8 years experience</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Documents</h4>
                        <p className="text-sm text-gray-600">Resume.pdf • Teaching_Certificate.pdf • Profile_Picture.jpg</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Preferences</h4>
                        <p className="text-sm text-gray-600">High School • Full-time • Email notifications enabled</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded-sm" />
                      <span className="text-sm text-gray-600">
                        I agree to the Terms of Service and Privacy Policy
                      </span>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                    disabled={currentStep === 1}
                    className="rounded-sm"
                  >
                    Previous
                  </Button>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Step {currentStep} of {steps.length}</span>
                    {currentStep < steps.length ? (
                      <Button
                        onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
                        className="bg-[#e27447] hover:bg-[#d65a2b] text-white rounded-sm"
                      >
                        Next
                      </Button>
                    ) : (
                      <Button className="bg-green-600 hover:bg-green-700 text-white rounded-sm">
                        <Send className="w-4 h-4 mr-2" />
                        Submit Application
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold font-cardo">Teacher Applications</h2>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search applications..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#e27447] focus:border-transparent"
                  />
                </div>
                <select className="px-3 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#e27447]">
                  <option>All Status</option>
                  <option>Under Review</option>
                  <option>Pending Documents</option>
                  <option>Approved</option>
                  <option>Rejected</option>
                </select>
              </div>
            </div>

            <div className="grid gap-4">
              {pendingApplications.map(application => (
                <Card key={application.id} className="rounded-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-[#e27447] rounded-sm flex items-center justify-center text-white font-bold text-xl">
                          {application.name.split(' ').map(word => word[0]).join('')}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-semibold text-gray-900 font-cardo">
                              {application.name}
                            </h3>
                            <Badge className={`rounded-sm ${getStatusColor(application.status)}`}>
                              {application.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-6 text-sm text-gray-600 mb-3">
                            <div className="flex items-center gap-1">
                              <Mail className="w-4 h-4" />
                              {application.email}
                            </div>
                            <div className="flex items-center gap-1">
                              <Building2 className="w-4 h-4" />
                              {application.institution}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {application.experience} experience
                            </div>
                          </div>
                          <div className="mb-3">
                            <p className="text-sm text-gray-600 mb-1">Subjects:</p>
                            <div className="flex flex-wrap gap-2">
                              {application.subjects.map(subject => (
                                <Badge key={subject} variant="outline" className="rounded-sm text-xs">
                                  {subject}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">
                            <strong>Review Notes:</strong> {application.reviewNotes}
                          </p>
                          <p className="text-xs text-gray-500 mt-2">
                            Submitted: {new Date(application.submittedDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Button variant="outline" size="sm" className="rounded-sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-sm">
                          <Download className="w-4 h-4" />
                        </Button>
                        {application.status === 'Under Review' && (
                          <>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700 rounded-sm">
                              Approve
                            </Button>
                            <Button variant="outline" size="sm" className="rounded-sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="rounded-sm">
              <CardHeader>
                <CardTitle className="font-cardo">Teacher Signup Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Auto-approve Teachers
                    </label>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded-sm" />
                      <span className="text-sm text-gray-600">Automatically approve qualified teachers</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Required Documents
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded-sm" defaultChecked />
                        <span className="text-sm">Resume/CV</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded-sm" defaultChecked />
                        <span className="text-sm">Teaching Certificate</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded-sm" />
                        <span className="text-sm">Background Check</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject Categories
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {["Mathematics", "Science", "English", "History", "Geography", "Computer Science", "Art", "Music"].map(subject => (
                      <label key={subject} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded-sm" defaultChecked />
                        <span className="text-sm">{subject}</span>
                      </label>
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

