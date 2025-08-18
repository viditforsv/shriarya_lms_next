'use client'

import Link from "next/link"
import { ArrowLeft, Play, Clock, FileText, Download, Smartphone, Infinity, Award, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SocialIconsRow, CourseStats, CourseContentSection } from "@/components/ui"

// Force dynamic rendering to prevent static generation issues
export const dynamic = 'force-dynamic'

export default function CoursePageTemplate() {
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
          <h1 className="text-4xl font-bold text-[#1e293b] mb-4">Course Page Template</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive course page template with course overview, learning objectives, requirements, 
            course content, and instructor information. Perfect for educational platforms and LMS systems.
          </p>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            {/* Course Overview Section */}
            <div className="bg-white rounded-sm border border-[#feefea] p-10 mb-10">
              {/* Course Title */}
              <h1 className="text-4xl font-bold text-[#1e293b] mb-6 leading-tight">
                [Course Title]
              </h1>
              
              {/* Learning Objectives */}
              <div className="mb-8">
                <span className="text-[#1e293b] font-medium">Learn:</span>
                <span className="text-muted-foreground ml-2">
                  [Topic 1] | [Topic 2] | [Topic 3] | [Topic 4] | [Topic 5] | [Topic 6]
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
                      alt="Instructor Logo" 
                      className="w-8 h-8 object-contain"
                      style={{ mixBlendMode: 'multiply' }}
                    />
                  </div>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">By</span>
                  <span className="text-[#1e293b] font-semibold ml-1">[Instructor Name]</span>
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
                    <span className="text-muted-foreground">[Learning Outcome 1]</span>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-[#1e293b] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-muted-foreground">[Learning Outcome 2]</span>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-[#1e293b] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-muted-foreground">[Learning Outcome 3]</span>
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
                    <span className="text-muted-foreground">[Learning Outcome 4]</span>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-[#1e293b] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-muted-foreground">[Learning Outcome 5]</span>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-[#1e293b] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-muted-foreground">[Learning Outcome 6]</span>
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
                    [Requirement 1]
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1e293b] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-muted-foreground">
                    [Requirement 2]
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1e293b] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-muted-foreground">
                    [Requirement 3]
                  </span>
                </li>
              </ul>
            </div>

            {/* About This Course Section */}
            <div className="bg-white rounded-sm border border-[#feefea] p-10 mb-10">
              <h2 className="text-3xl font-bold text-[#1e293b] mb-8">About This Course</h2>
              <div className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  [Course description paragraph 1]
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  [Course description paragraph 2]
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
                title="[Section Title]"
                lectures={8}
                duration="6 hours"
                lessons={[
                  {
                    id: "1",
                    title: "[Lesson Title 1]",
                    duration: "45:20",
                    type: "video",
                    hasPreview: true,
                    isLocked: false
                  },
                  {
                    id: "2",
                    title: "[Lesson Title 2]",
                    duration: "52:15",
                    type: "document",
                    hasPreview: true,
                    isLocked: false
                  },
                  {
                    id: "3",
                    title: "[Lesson Title 3]",
                    duration: "38:45",
                    type: "question",
                    hasPreview: true,
                    isLocked: true
                  }
                ]}
                isExpanded={true}
                className="mb-4"
              />
              
              {/* Collapsed Sections */}
              <div className="space-y-4">
                <CourseContentSection
                  title="[Section Title 2]"
                  lectures={10}
                  duration="8 hours"
                  lessons={[]}
                  isExpanded={false}
                />
                
                <CourseContentSection
                  title="[Section Title 3]"
                  lectures={12}
                  duration="10 hours"
                  lessons={[]}
                  isExpanded={false}
                />
              </div>
              
              {/* More Sections Button */}
              <div className="mt-8 text-center">
                <button className="px-8 py-4 border border-[#feefea] rounded-sm bg-white text-[#1e293b] font-medium hover:bg-[#feefea]/30 transition-colors flex items-center space-x-2 mx-auto">
                  <span>[X] More Sections</span>
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
                        alt="Instructor Logo" 
                        className="w-20 h-20 object-contain"
                        style={{ mixBlendMode: 'multiply' }}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Instructor Details */}
                <div className="flex-1">
                  {/* Name and Title */}
                  <h3 className="text-2xl font-bold text-[#1e293b] mb-2">[Instructor Name]</h3>
                  <p className="text-lg text-muted-foreground mb-6">[Instructor Title]</p>
                  
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
                      [Instructor bio paragraph 1]
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      [Instructor bio paragraph 2]
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
                        alt="Course Logo" 
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
                    <span className="text-3xl font-bold text-[#e27447]">₹[Price]</span>
                    <span className="text-lg text-muted-foreground line-through">₹[Original Price]</span>
                  </div>
                  <Badge className="bg-[#feefea] text-[#e27447] hover:bg-[#feefea] border border-[#feefea]">
                    [X]% OFF
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
                    <span className="text-sm text-muted-foreground">[X] hours on-demand video</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-[#1e293b]" strokeWidth={1.5} />
                    <span className="text-sm text-muted-foreground">[X] practice worksheets</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Download className="w-5 h-5 text-[#1e293b]" strokeWidth={1.5} />
                    <span className="text-sm text-muted-foreground">[X] downloadable resources</span>
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

        {/* Template Usage Instructions */}
        <div className="mt-16 bg-[#feefea] rounded-sm p-8">
          <h2 className="text-2xl font-bold text-[#1e293b] mb-6">How to Use This Template</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-[#1e293b] mb-4">Template Features</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Complete course page layout with sidebar</li>
                <li>• Course overview with statistics and instructor info</li>
                <li>• Learning objectives in two-column format</li>
                <li>• Requirements section with bullet points</li>
                <li>• About course section with expandable content</li>
                <li>• Interactive course content with expandable sections</li>
                <li>• Instructor profile with social media links</li>
                <li>• Pricing sidebar with course details</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#1e293b] mb-4">Customization Steps</h3>
              <ol className="space-y-2 text-muted-foreground">
                <li>1. Replace all placeholder text in [brackets]</li>
                <li>2. Update course statistics and ratings</li>
                <li>3. Add your course content and lessons</li>
                <li>4. Update instructor information and bio</li>
                <li>5. Modify pricing and course details</li>
                <li>6. Add your logo and branding</li>
                <li>7. Customize colors to match your theme</li>
                <li>8. Test responsive behavior on mobile</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
