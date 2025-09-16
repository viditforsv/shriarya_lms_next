"use client"

import { useState, memo } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components-demo/ui/ui-components/card'
import { Button } from '@/app/components-demo/ui/ui-components/button'
import { Badge } from '@/app/components-demo/ui/ui-components/badge'
import { 
  ArrowLeft,
  Download,
  Share2,
  Printer,
  Award,
  Calendar,
  User,
  BookOpen,
  CheckCircle,
  Star,
  Mail,
  Linkedin,
  Twitter
} from 'lucide-react'
import { CompletionDot } from '@/app/components-demo/ui/template-status'
import { TemplateLayout } from "@/app/components-demo/ui/template-layout"
const CertificateTemplate = memo(function CertificateTemplate() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [isShared, setIsShared] = useState(false)

  // Mock certificate data
  const certificate = {
    id: 'CERT-2024-001',
    studentName: 'John Smith',
    courseName: 'CBSE Mathematics Class 10',
    completionDate: '2024-01-15',
    grade: 'A+',
    score: '95%',
    instructor: 'Dr. Sarah Johnson',
    institution: 'ShriArya Learning Platform',
    duration: '120 hours',
    issuedDate: '2024-01-16',
    verificationUrl: 'https://shriarya.com/verify/CERT-2024-001'
  }

  const achievements = [
    { name: 'Perfect Score', icon: Star, color: 'text-yellow-500' },
    { name: 'Early Completion', icon: Calendar, color: 'text-green-500' },
    { name: 'Consistent Performance', icon: CheckCircle, color: 'text-blue-500' }
  ]

  const handleDownload = () => {
    setIsGenerating(true)
    // Simulate PDF generation
    setTimeout(() => {
      setIsGenerating(false)
      console.log('Certificate downloaded')
    }, 2000)
  }

  const handleShare = (platform: string) => {
    setIsShared(true)
    setTimeout(() => setIsShared(false), 2000)
    console.log(`Sharing to ${platform}`)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#feefea] to-[#fffefd] border-b border-[#e27447] py-6 relative">
        <CompletionDot isCompleted={true} />
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/templates/course-templates" 
              className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Course Templates
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#1e293b] mb-2">Certificate of Completion</h1>
          <p className="text-muted-foreground">
            Congratulations on completing your course! Download and share your achievement.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Certificate Display */}
          <Card className="rounded-sm mb-8 overflow-hidden">
            <CardContent className="p-0">
              {/* Certificate Design */}
              <div className="bg-gradient-to-br from-[#feefea] to-[#fffefd] border-4 border-[#e27447] p-12 text-center relative">
                {/* Decorative Elements */}
                <div className="absolute top-8 left-8 w-16 h-16 border-4 border-[#e27447] rounded-full opacity-20"></div>
                <div className="absolute top-8 right-8 w-16 h-16 border-4 border-[#e27447] rounded-full opacity-20"></div>
                <div className="absolute bottom-8 left-8 w-16 h-16 border-4 border-[#e27447] rounded-full opacity-20"></div>
                <div className="absolute bottom-8 right-8 w-16 h-16 border-4 border-[#e27447] rounded-full opacity-20"></div>

                {/* Certificate Content */}
                <div className="space-y-8">
                  {/* Header */}
                  <div>
                    <h2 className="text-4xl font-bold text-[#1e293b] mb-2">CERTIFICATE</h2>
                    <h3 className="text-2xl font-semibold text-[#e27447] mb-4">OF COMPLETION</h3>
                    <div className="w-32 h-1 bg-[#e27447] mx-auto rounded-sm"></div>
                  </div>

                  {/* Main Content */}
                  <div className="space-y-6">
                    <p className="text-lg text-[#1e293b]">
                      This is to certify that
                    </p>
                    <h1 className="text-3xl font-bold text-[#1e293b] border-b-2 border-[#e27447] pb-2 inline-block">
                      {certificate.studentName}
                    </h1>
                    <p className="text-lg text-[#1e293b]">
                      has successfully completed the course
                    </p>
                    <h2 className="text-2xl font-semibold text-[#e27447]">
                      {certificate.courseName}
                    </h2>
                    <p className="text-lg text-[#1e293b]">
                      with a grade of <span className="font-bold text-[#e27447]">{certificate.grade}</span> 
                      {' '}({certificate.score})
                    </p>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                    <div className="text-left">
                      <p className="text-sm text-muted-foreground mb-1">Completion Date</p>
                      <p className="font-semibold text-[#1e293b]">{certificate.completionDate}</p>
                    </div>
                    <div className="text-left">
                      <p className="text-sm text-muted-foreground mb-1">Duration</p>
                      <p className="font-semibold text-[#1e293b]">{certificate.duration}</p>
                    </div>
                    <div className="text-left">
                      <p className="text-sm text-muted-foreground mb-1">Instructor</p>
                      <p className="font-semibold text-[#1e293b]">{certificate.instructor}</p>
                    </div>
                    <div className="text-left">
                      <p className="text-sm text-muted-foreground mb-1">Certificate ID</p>
                      <p className="font-semibold text-[#1e293b]">{certificate.id}</p>
                    </div>
                  </div>

                  {/* Signatures */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                    <div className="text-center">
                      <div className="border-t-2 border-[#1e293b] w-32 mx-auto mb-2"></div>
                      <p className="text-sm text-muted-foreground">Instructor Signature</p>
                      <p className="font-semibold text-[#1e293b]">{certificate.instructor}</p>
                    </div>
                    <div className="text-center">
                      <div className="border-t-2 border-[#1e293b] w-32 mx-auto mb-2"></div>
                      <p className="text-sm text-muted-foreground">Date Issued</p>
                      <p className="font-semibold text-[#1e293b]">{certificate.issuedDate}</p>
                    </div>
                  </div>

                  {/* Institution */}
                  <div className="mt-8">
                    <p className="text-lg font-semibold text-[#1e293b]">
                      {certificate.institution}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Certificate Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Download Section */}
            <Card className="rounded-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Download className="w-5 h-5 text-[#e27447]" />
                  <span>Download Certificate</span>
                </CardTitle>
                <CardDescription>
                  Save your certificate as a PDF for your records
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={handleDownload}
                  disabled={isGenerating}
                  className="w-full bg-[#e27447] hover:bg-[#e27447]/90 rounded-sm"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Generating PDF...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </>
                  )}
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full rounded-sm"
                  onClick={() => window.print()}
                >
                  <Printer className="w-4 h-4 mr-2" />
                  Print Certificate
                </Button>
              </CardContent>
            </Card>

            {/* Share Section */}
            <Card className="rounded-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Share2 className="w-5 h-5 text-[#e27447]" />
                  <span>Share Achievement</span>
                </CardTitle>
                <CardDescription>
                  Share your accomplishment on social media
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant="outline" 
                    className="rounded-sm"
                    onClick={() => handleShare('linkedin')}
                  >
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </Button>
                  <Button 
                    variant="outline" 
                    className="rounded-sm"
                    onClick={() => handleShare('twitter')}
                  >
                    <Twitter className="w-4 h-4 mr-2" />
                    Twitter
                  </Button>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full rounded-sm"
                  onClick={() => handleShare('email')}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Share via Email
                </Button>
                {isShared && (
                  <div className="text-center text-green-600 text-sm">
                    ✓ Shared successfully!
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Certificate Details */}
          <Card className="rounded-sm mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-[#e27447]" />
                <span>Certificate Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <User className="w-5 h-5 text-[#e27447]" />
                    <div>
                      <p className="text-sm text-muted-foreground">Student Name</p>
                      <p className="font-semibold text-[#1e293b]">{certificate.studentName}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <BookOpen className="w-5 h-5 text-[#e27447]" />
                    <div>
                      <p className="text-sm text-muted-foreground">Course</p>
                      <p className="font-semibold text-[#1e293b]">{certificate.courseName}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-[#e27447]" />
                    <div>
                      <p className="text-sm text-muted-foreground">Completion Date</p>
                      <p className="font-semibold text-[#1e293b]">{certificate.completionDate}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Award className="w-5 h-5 text-[#e27447]" />
                    <div>
                      <p className="text-sm text-muted-foreground">Grade</p>
                      <p className="font-semibold text-[#1e293b]">{certificate.grade} ({certificate.score})</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-[#e27447]" />
                    <div>
                      <p className="text-sm text-muted-foreground">Certificate ID</p>
                      <p className="font-semibold text-[#1e293b]">{certificate.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Star className="w-5 h-5 text-[#e27447]" />
                    <div>
                      <p className="text-sm text-muted-foreground">Verification</p>
                      <p className="font-semibold text-[#1e293b]">
                        <a href={certificate.verificationUrl} className="text-[#e27447] hover:underline">
                          Verify Certificate
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="rounded-sm mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-[#e27447]" />
                <span>Special Achievements</span>
              </CardTitle>
              <CardDescription>
                Additional accomplishments earned during this course
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon
                  return (
                    <div key={index} className="text-center p-4 bg-[#feefea] rounded-sm">
                      <Icon className={`w-8 h-8 ${achievement.color} mx-auto mb-2`} />
                      <h3 className="font-semibold text-[#1e293b]">{achievement.name}</h3>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="rounded-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-[#e27447]" />
                <span>What&apos;s Next?</span>
              </CardTitle>
              <CardDescription>
                Continue your learning journey with these recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="rounded-sm justify-start">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Browse More Courses
                </Button>
                <Button variant="outline" className="rounded-sm justify-start">
                  <Award className="w-4 h-4 mr-2" />
                  View All Certificates
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
})

export default CertificateTemplate

