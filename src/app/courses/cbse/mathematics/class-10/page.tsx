"use client"

import Link from "next/link"
import { ArrowLeft, Play, Clock, FileText, Download, Smartphone, Infinity, Award, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SocialIconsRow, CourseStats, CourseContentSection } from "@/components/ui"

// Force dynamic rendering to prevent static generation issues
export const dynamic = 'force-dynamic'

export default function Class10MathematicsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumbs */}
        <div className="mb-12">
          <Link 
            href="/courses/cbse/mathematics" 
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to CBSE Mathematics
          </Link>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            {/* Course Overview Section */}
            <div className="bg-white rounded-sm border border-[#feefea] p-10 mb-10">
              {/* Course Title */}
              <h1 className="text-4xl font-bold text-[#1e293b] mb-6 leading-tight">
                Master CBSE Class 10 Mathematics
              </h1>
              
              {/* Learning Objectives */}
              <div className="mb-8">
                <span className="text-[#1e293b] font-medium">Learn:</span>
                <span className="text-muted-foreground ml-2">
                  Algebra | Geometry | Trigonometry | Statistics | Probability | Coordinate Geometry | Circles | Constructions
                </span>
              </div>
              
              {/* Course Statistics */}
              <CourseStats
                rating={4.8}
                totalRatings={2847}
                lessons={104}
                students={1234}
                lastUpdated="12/2024"
                className="mb-8"
              />
              
              {/* Instructor Information */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full border-2 border-[#feefea] overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-[#feefea] to-[#fffefd] flex items-center justify-center">
                    <img 
                      src="/images/logo.webp" 
                      alt="ShriArya Logo" 
                      className="w-8 h-8 object-contain"
                      style={{ mixBlendMode: 'multiply' }}
                    />
                  </div>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">By</span>
                  <span className="text-[#1e293b] font-semibold ml-1">ShriArya Mathematics Team</span>
                </div>
              </div>
            </div>

            {/* What You'll Learn Section */}
            <div className="bg-white rounded-sm border border-[#feefea] p-10 mb-10">
              <h2 className="text-3xl font-bold text-[#1e293b] mb-10">What you&apos;ll learn</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-5">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-[#1e293b] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-muted-foreground">Master fundamental algebraic concepts and operations</span>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-[#1e293b] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-muted-foreground">Solve complex quadratic equations and polynomials</span>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-[#1e293b] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-muted-foreground">Understand geometric theorems and proofs</span>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-[#1e293b] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-muted-foreground">Apply trigonometric ratios and identities</span>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-[#1e293b] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-muted-foreground">Learn coordinate geometry and distance formulas</span>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-[#1e293b] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-muted-foreground">Master statistical analysis and probability</span>
                  </div>
                </div>
                
                {/* Right Column */}
                <div className="space-y-5">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-[#1e293b] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-muted-foreground">Prepare for CBSE Board examinations</span>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-[#1e293b] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-muted-foreground">Access 80+ hours of video instruction</span>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-[#1e293b] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-muted-foreground">Practice with 150+ downloadable resources</span>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-[#1e293b] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-muted-foreground">Get expert support and guidance</span>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-[#1e293b] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-muted-foreground">Track progress with detailed analytics</span>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-[#1e293b] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-muted-foreground">Earn certificate of completion</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Requirements Section */}
            <div className="bg-white rounded-sm border border-[#feefea] p-10 mb-10">
              <h2 className="text-3xl font-bold text-[#1e293b] mb-8">Requirements</h2>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1e293b] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-muted-foreground">
                    There are no skill prerequisites for this course, although it&apos;s helpful if you are familiar with basic mathematical operations and concepts from Class 9.
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1e293b] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-muted-foreground">
                    You can take this course using a Mac, PC, or Linux machine with a stable internet connection.
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1e293b] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-muted-foreground">
                    It is recommended that you have a notebook and pen for solving practice problems and taking notes.
                  </span>
                </li>
              </ul>
            </div>

            {/* About This Course Section */}
            <div className="bg-white rounded-sm border border-[#feefea] p-10 mb-10">
              <h2 className="text-3xl font-bold text-[#1e293b] mb-8">About This Course</h2>
              <div className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  Welcome to our comprehensive CBSE Class 10 Mathematics course designed to help you master all the essential concepts required for your board examinations. This course covers the complete syllabus with detailed explanations, practical examples, and extensive practice problems.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Our expert instructors have carefully structured the content to build your mathematical foundation step by step, ensuring you understand both the theory and practical applications of each concept.
                </p>
                <button className="flex items-center space-x-2 text-[#e27447] hover:text-[#e27447]/80 transition-colors font-medium">
                  <span>Show More</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Course Content Section */}
            <div className="bg-white rounded-sm border border-[#feefea] p-10 mb-10">
              <h2 className="text-3xl font-bold text-[#1e293b] mb-8">Course Content</h2>
              
              {/* Expanded Section */}
              <CourseContentSection
                title="Real Numbers & Algebra"
                lectures={8}
                duration="6 hours"
                lessons={[
                  {
                    id: "1",
                    title: "Introduction to Real Numbers",
                    duration: "45:20",
                    type: "video",
                    hasPreview: true,
                    isLocked: false
                  },
                  {
                    id: "2",
                    title: "Euclid's Division Algorithm",
                    duration: "52:15",
                    type: "document",
                    hasPreview: true,
                    isLocked: false
                  },
                  {
                    id: "3",
                    title: "Fundamental Theorem of Arithmetic",
                    duration: "38:45",
                    type: "question",
                    hasPreview: true,
                    isLocked: true
                  },
                  {
                    id: "4",
                    title: "Real Numbers Practice Problems",
                    duration: "25:30",
                    type: "practice",
                    hasPreview: false,
                    isLocked: true
                  }
                ]}
                isExpanded={true}
                className="mb-4"
              />
              
              {/* Collapsed Sections */}
              <div className="space-y-4">
                <CourseContentSection
                  title="Polynomials & Equations"
                  lectures={10}
                  duration="8 hours"
                  lessons={[]}
                  isExpanded={false}
                />
                
                <CourseContentSection
                  title="Geometry & Triangles"
                  lectures={12}
                  duration="10 hours"
                  lessons={[]}
                  isExpanded={false}
                />
                
                <CourseContentSection
                  title="Trigonometry & Circles"
                  lectures={18}
                  duration="12 hours"
                  lessons={[]}
                  isExpanded={false}
                />
              </div>
              
              {/* More Sections Button */}
              <div className="mt-8 text-center">
                <button className="px-8 py-4 border border-[#feefea] rounded-sm bg-white text-[#1e293b] font-medium hover:bg-[#feefea]/30 transition-colors flex items-center space-x-2 mx-auto">
                  <span>12 More Sections</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Instructor Section */}
            <div className="bg-white rounded-sm border border-[#feefea] p-10">
              <h2 className="text-3xl font-bold text-[#1e293b] mb-8">Instructor</h2>
              
              <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-8">
                {/* Profile Picture */}
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 rounded-sm overflow-hidden border-2 border-[#feefea]">
                    <div className="w-full h-full bg-gradient-to-br from-[#feefea] to-[#fffefd] flex items-center justify-center">
                      <img 
                        src="/images/logo.webp" 
                        alt="ShriArya Logo" 
                        className="w-20 h-20 object-contain"
                        style={{ mixBlendMode: 'multiply' }}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Instructor Details */}
                <div className="flex-1">
                  {/* Name and Title */}
                  <h3 className="text-2xl font-bold text-[#1e293b] mb-2">ShriArya Mathematics Team</h3>
                  <p className="text-lg text-muted-foreground mb-6">Professional Mathematics Educators</p>
                  
                  {/* Statistics */}
                  <CourseStats
                    rating={4.9}
                    totalRatings={2847}
                    students={1234}
                    duration="15 Courses"
                    className="mb-6"
                  />
                  
                  {/* Bio */}
                  <div className="space-y-4 mb-6">
                    <p className="text-muted-foreground leading-relaxed">
                      Our team of experienced mathematics educators brings together decades of teaching experience in CBSE curriculum. We specialize in making complex mathematical concepts accessible and engaging for students at all levels.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      With a focus on practical applications and real-world examples, we help students build strong mathematical foundations that prepare them not just for exams, but for future academic and professional success.
                    </p>
                  </div>
                  
                  {/* Social Media Links */}
                  <SocialIconsRow 
                    platforms={['facebook', 'twitter', 'instagram', 'linkedin']}
                    size="md"
                    variant="outline"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Course Sidebar Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-sm shadow-lg border border-[#feefea] p-6 sticky top-8">
              {/* Course Preview Thumbnail */}
              <div className="relative mb-6">
                <div className="w-full h-48 bg-gradient-to-br from-[#feefea] to-[#fffefd] rounded-sm flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg mb-3 border border-[#feefea]">
                      <img 
                        src="/images/logo.webp" 
                        alt="ShriArya Logo" 
                        className="w-10 h-10 object-contain"
                        style={{ mixBlendMode: 'multiply' }}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">Course Preview</p>
                  </div>
                </div>
              </div>

              {/* Pricing Section */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl font-bold text-[#e27447]">₹1,999</span>
                    <span className="text-lg text-muted-foreground line-through">₹3,499</span>
                  </div>
                  <Badge className="bg-[#feefea] text-[#e27447] hover:bg-[#feefea] border border-[#feefea]">
                    43% OFF
                  </Badge>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 mb-6">
                <Button className="w-full bg-[#1e293b] hover:bg-[#1e293b]/90 text-white rounded-sm">
                  Add to Cart
                  <ArrowLeft className="w-4 h-4 ml-2 rotate-45" strokeWidth={1.5} />
                </Button>
                <Button variant="outline" className="w-full rounded-sm border-black hover:bg-[#feefea]">
                  Enroll Now
                  <ArrowLeft className="w-4 h-4 ml-2 rotate-45" strokeWidth={1.5} />
                </Button>
              </div>

              {/* Guarantee */}
              <div className="text-center mb-6">
                <p className="text-sm text-muted-foreground">
                  14-Day Satisfaction Guarantee
                </p>
              </div>

              {/* Course Details */}
              <div className="mb-6">
                <h3 className="font-semibold text-[#1e293b] mb-4">This course includes:</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-[#1e293b]" strokeWidth={1.5} />
                    <span className="text-sm text-muted-foreground">80+ hours on-demand video</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-[#1e293b]" strokeWidth={1.5} />
                    <span className="text-sm text-muted-foreground">25+ practice worksheets</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Download className="w-5 h-5 text-[#1e293b]" strokeWidth={1.5} />
                    <span className="text-sm text-muted-foreground">150+ downloadable resources</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Smartphone className="w-5 h-5 text-[#1e293b]" strokeWidth={1.5} />
                    <span className="text-sm text-muted-foreground">Access on web + mobile app</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Infinity className="w-5 h-5 text-[#1e293b]" strokeWidth={1.5} />
                    <span className="text-sm text-muted-foreground">Progress tracking & analytics</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Award className="w-5 h-5 text-[#1e293b]" strokeWidth={1.5} />
                    <span className="text-sm text-muted-foreground">Certificate of completion</span>
                  </div>
                </div>
              </div>

              {/* Social Sharing */}
              <div className="border-t border-[#feefea] pt-6">
                <h3 className="font-semibold text-[#1e293b] mb-4 flex items-center">
                  <Share2 className="w-4 h-4 mr-2" strokeWidth={1.5} />
                  Share this course
                </h3>
                <SocialIconsRow 
                  platforms={['facebook', 'twitter', 'instagram', 'linkedin']}
                  size="sm"
                  variant="outline"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
