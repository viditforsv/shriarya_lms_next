"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Clock, FileText, Download, Smartphone, Infinity, Award, Share2, BookOpen, Users, Star, CheckCircle, Bookmark, Share } from "lucide-react"
import { Button } from "@/app/components-demo/ui/button"
import { Badge } from "@/app/components-demo/ui/badge"
import { SocialIconsRow, CourseStats, CourseContentSection } from "@/app/components-demo/ui"
import { useAuth } from "@/contexts/AuthContext"
import { useCourseData } from "@/hooks/useCourseData"
import { createClient } from "@/lib/supabase/client"

// Force dynamic rendering to prevent static generation issues
export const dynamic = 'force-dynamic'

export default function Class10MathematicsPage() {
  const { user } = useAuth()
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['real-numbers']))
  const [isLoading, setIsLoading] = useState(false)
  const [enrollmentMessage, setEnrollmentMessage] = useState<string | null>(null)

  const supabase = createClient()

  // Use the new hook to load course data
  const {
    courseData,
    courseContent,
    courseProgress,
    isLoading: isDataLoading,
    error,
    isEnrolled,
    isFree,
    canPreview
  } = useCourseData('cbse-math-10')

  const handleEnroll = async () => {
    if (!user) {
      // Redirect to login
      window.location.href = '/auth'
      return
    }

    if (!courseData) {
      console.error('Course data not available')
      return
    }

    setIsLoading(true)
    setEnrollmentMessage(null)
    
    try {
      // Simple insert - database policies handle everything!
      const { error } = await supabase
        .from('enrollments')
        .insert({ course_id: courseData.id })
      
      if (error) {
        throw error
      }
      
      setEnrollmentMessage('Successfully enrolled in the course!')
      
      // Refresh the page to update enrollment status
      setTimeout(() => {
        window.location.reload()
      }, 1500)
    } catch (error) {
      console.error('Enrollment failed:', error)
      setEnrollmentMessage('Failed to enroll in the course. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    // Add API call to save bookmark
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'CBSE Class 10 Mathematics Course',
        text: 'Master CBSE Class 10 Mathematics with comprehensive lessons and practice problems',
        url: window.location.href
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev)
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId)
      } else {
        newSet.add(sectionId)
      }
      return newSet
    })
  }

  const handleLessonClick = (lesson: { id: string; title: string; type: string; isLocked: boolean; slug?: string }) => {
    if (lesson.isLocked && !isEnrolled) {
      alert('Please enroll in the course to access this lesson.')
      return
    }
    
    // Navigate to the lesson page
    if (lesson.slug) {
      window.location.href = `/courses/cbse/mathematics/class-10/lesson/${lesson.slug}`
    } else {
      console.log('Lesson slug not available:', lesson.title)
    }
  }

  const handlePreviewClick = (lesson: { title: string }, event: React.MouseEvent) => {
    event.stopPropagation() // Prevent lesson click
    console.log('Preview lesson:', lesson.title)
    // Add your preview logic here
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'content', label: 'Content', icon: FileText },
    { id: 'instructor', label: 'Instructor', icon: Users },
    { id: 'reviews', label: 'Reviews', icon: Star }
  ]

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

        {/* Loading State */}
        {isDataLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e27447] mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading course...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <p className="text-red-600 mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          </div>
        )}

        {/* Main Content Layout */}
        {!isDataLoading && !error && courseData && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main Content Area */}
            <div className="lg:col-span-2">
              {/* Course Overview Section */}
              <div className="bg-white rounded-sm border border-[#feefea] p-10 mb-10">
                {/* Course Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <h1 className="text-4xl font-bold text-[#1e293b] mb-6 leading-tight">
                      {courseData.title || 'Master CBSE Class 10 Mathematics'}
                    </h1>
                    
                    {/* Learning Objectives */}
                    <div className="mb-8">
                      <span className="text-[#1e293b] font-medium">Learn:</span>
                      <span className="text-muted-foreground ml-2">
                        Algebra | Geometry | Trigonometry | Statistics | Probability | Coordinate Geometry | Circles | Constructions
                      </span>
                    </div>
                  </div>
                
                  {/* Action Buttons */}
                  <div className="flex items-center space-x-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleBookmark}
                      className={isBookmarked ? "text-[#e27447] border-[#e27447]" : ""}
                    >
                      <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`} />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleShare}
                    >
                      <Share className="w-4 h-4" />
                    </Button>
                  </div>
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
                
                {/* Progress Bar for Enrolled Users */}
                {isEnrolled && (
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-[#1e293b]">Your Progress</span>
                      <span className="text-sm text-muted-foreground">{courseProgress}% Complete</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-[#e27447] h-2 rounded-full transition-all duration-500" 
                        style={{ width: `${courseProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                
                {/* Instructor Information */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full border-2 border-[#feefea] overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-[#feefea] to-[#fffefd] flex items-center justify-center">
                      <img 
                        src="/images/main_logo.webp" 
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

              {/* Tab Navigation */}
              <div className="bg-white rounded-sm border border-[#feefea] mb-10">
                <div className="flex border-b border-[#feefea]">
                  {tabs.map((tab) => {
                    const Icon = tab.icon
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-colors ${
                          activeTab === tab.id
                            ? "text-[#e27447] border-b-2 border-[#e27447]"
                            : "text-muted-foreground hover:text-[#1e293b]"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{tab.label}</span>
                      </button>
                    )
                  })}
                </div>
                
                {/* Tab Content */}
                <div className="p-10">
                  {activeTab === 'overview' && (
                    <div className="space-y-10">
                      {/* What You'll Learn Section */}
                      <div>
                        <h2 className="text-3xl font-bold text-[#1e293b] mb-10">What you&apos;ll learn</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          {/* Left Column */}
                          <div className="space-y-5">
                            <div className="flex items-start space-x-3">
                              <div className="w-6 h-6 rounded-full bg-[#1e293b] flex items-center justify-center flex-shrink-0 mt-0.5">
                                <CheckCircle className="w-4 h-4 text-white" />
                              </div>
                              <span className="text-muted-foreground">Master fundamental algebraic concepts and operations</span>
                            </div>
                            
                            <div className="flex items-start space-x-3">
                              <div className="w-6 h-6 rounded-full bg-[#1e293b] flex items-center justify-center flex-shrink-0 mt-0.5">
                                <CheckCircle className="w-4 h-4 text-white" />
                              </div>
                              <span className="text-muted-foreground">Solve complex quadratic equations and polynomials</span>
                            </div>
                            
                            <div className="flex items-start space-x-3">
                              <div className="w-6 h-6 rounded-full bg-[#1e293b] flex items-center justify-center flex-shrink-0 mt-0.5">
                                <CheckCircle className="w-4 h-4 text-white" />
                              </div>
                              <span className="text-muted-foreground">Understand geometric theorems and proofs</span>
                            </div>
                            
                            <div className="flex items-start space-x-3">
                              <div className="w-6 h-6 rounded-full bg-[#1e293b] flex items-center justify-center flex-shrink-0 mt-0.5">
                                <CheckCircle className="w-4 h-4 text-white" />
                              </div>
                              <span className="text-muted-foreground">Apply trigonometric concepts to real-world problems</span>
                            </div>
                          </div>
                          
                          {/* Right Column */}
                          <div className="space-y-5">
                            <div className="flex items-start space-x-3">
                              <div className="w-6 h-6 rounded-full bg-[#1e293b] flex items-center justify-center flex-shrink-0 mt-0.5">
                                <CheckCircle className="w-4 h-4 text-white" />
                              </div>
                              <span className="text-muted-foreground">Analyze statistical data and probability</span>
                            </div>
                            
                            <div className="flex items-start space-x-3">
                              <div className="w-6 h-6 rounded-full bg-[#1e293b] flex items-center justify-center flex-shrink-0 mt-0.5">
                                <CheckCircle className="w-4 h-4 text-white" />
                              </div>
                              <span className="text-muted-foreground">Master coordinate geometry and circles</span>
                            </div>
                            
                            <div className="flex items-start space-x-3">
                              <div className="w-6 h-6 rounded-full bg-[#1e293b] flex items-center justify-center flex-shrink-0 mt-0.5">
                                <CheckCircle className="w-4 h-4 text-white" />
                              </div>
                              <span className="text-muted-foreground">Learn geometric constructions and measurements</span>
                            </div>
                            
                            <div className="flex items-start space-x-3">
                              <div className="w-6 h-6 rounded-full bg-[#1e293b] flex items-center justify-center flex-shrink-0 mt-0.5">
                                <CheckCircle className="w-4 h-4 text-white" />
                              </div>
                              <span className="text-muted-foreground">Prepare for CBSE board examinations</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Requirements Section */}
                      <div>
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
                      <div>
                        <h2 className="text-3xl font-bold text-[#1e293b] mb-8">About This Course</h2>
                        <div className="space-y-6">
                          <p className="text-muted-foreground leading-relaxed">
                            {courseData.description || 'Welcome to our comprehensive CBSE Class 10 Mathematics course designed to help you master all the essential concepts required for your board examinations. This course covers the complete syllabus with detailed explanations, practical examples, and extensive practice problems.'}
                          </p>
                          {showFullDescription && (
                            <>
                              <p className="text-muted-foreground leading-relaxed">
                                Our expert instructors have carefully structured the content to build your mathematical foundation step by step, ensuring you understand both the theory and practical applications of each concept.
                              </p>
                              <p className="text-muted-foreground leading-relaxed">
                                Each module includes interactive exercises, real-world examples, and comprehensive assessments to reinforce your learning. You&apos;ll also have access to our community forum where you can ask questions and collaborate with fellow students.
                              </p>
                            </>
                          )}
                          <button 
                            onClick={() => setShowFullDescription(!showFullDescription)}
                            className="flex items-center space-x-2 text-[#e27447] hover:text-[#e27447]/80 transition-colors font-medium"
                          >
                            <span>{showFullDescription ? 'Show Less' : 'Show More'}</span>
                            <svg 
                              className={`w-4 h-4 transition-transform ${showFullDescription ? 'rotate-180' : ''}`} 
                              fill="currentColor" 
                              viewBox="0 0 20 20"
                            >
                              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'content' && (
                    <div>
                      <h2 className="text-3xl font-bold text-[#1e293b] mb-8">Course Content</h2>
                      <p className="text-muted-foreground mb-6">
                        Click on any section to expand and view the lessons. {!isEnrolled && "Enroll in the course to access all content."}
                      </p>
                      {courseContent.length === 0 ? (
                        <div className="flex items-center justify-center py-12">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#e27447]"></div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {courseContent.map((section) => (
                            <CourseContentSection
                              key={section.id}
                              title={section.title}
                              lectures={section.lectures}
                              duration={section.duration}
                              lessons={section.lessons}
                              isExpanded={expandedSections.has(section.id)}
                              onToggle={() => toggleSection(section.id)}
                              className="mb-4"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'instructor' && (
                    <div>
                      <h2 className="text-3xl font-bold text-[#1e293b] mb-8">Your Instructor</h2>
                      <div className="flex items-start space-x-6">
                        <div className="w-24 h-24 rounded-full border-2 border-[#feefea] overflow-hidden">
                          <div className="w-full h-full bg-gradient-to-br from-[#feefea] to-[#fffefd] flex items-center justify-center">
                            <img 
                              src="/images/main_logo.webp" 
                              alt="ShriArya Logo" 
                              className="w-16 h-16 object-contain"
                              style={{ mixBlendMode: 'multiply' }}
                            />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-[#1e293b] mb-2">ShriArya Mathematics Team</h3>
                          <p className="text-muted-foreground mb-4">Expert Mathematics Educators</p>
                          <p className="text-muted-foreground leading-relaxed mb-4">
                            Our team of experienced mathematics educators has over 15 years of combined experience in teaching CBSE mathematics. We specialize in making complex mathematical concepts accessible and engaging for students of all levels.
                          </p>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                              <Users className="w-4 h-4 text-[#e27447]" />
                              <span className="text-sm text-muted-foreground">15+ Years Experience</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Star className="w-4 h-4 text-[#e27447]" />
                              <span className="text-sm text-muted-foreground">4.8 Instructor Rating</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'reviews' && (
                    <div>
                      <h2 className="text-3xl font-bold text-[#1e293b] mb-8">Student Reviews</h2>
                      <div className="space-y-6">
                        <div className="bg-gray-50 p-6 rounded-sm">
                          <div className="flex items-center space-x-2 mb-3">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">5.0</span>
                          </div>
                                                     <p className="text-muted-foreground mb-3">
                             &ldquo;Excellent course! The explanations are clear and the practice problems really help reinforce the concepts.&rdquo;
                           </p>
                          <p className="text-sm font-medium text-[#1e293b]">- Priya S.</p>
                        </div>
                        
                        <div className="bg-gray-50 p-6 rounded-sm">
                          <div className="flex items-center space-x-2 mb-3">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">5.0</span>
                          </div>
                                                     <p className="text-muted-foreground mb-3">
                             &ldquo;Perfect for CBSE preparation. The course structure is well-organized and covers all important topics.&rdquo;
                           </p>
                          <p className="text-sm font-medium text-[#1e293b]">- Rahul M.</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-sm border border-[#feefea] p-6 sticky top-6">
                {/* Course Preview */}
                <div className="mb-6">
                  <div className="aspect-video bg-gray-100 rounded-sm mb-3 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-[#e27447] rounded-full flex items-center justify-center mx-auto mb-2">
                        <BookOpen className="w-8 h-8 text-white" />
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
                  {isEnrolled ? (
                    <Button className="w-full bg-[#1e27447] hover:bg-[#e27447]/90 text-white rounded-sm">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Continue Learning
                    </Button>
                  ) : (
                    <>
                      <Button className="w-full bg-[#1e293b] hover:bg-[#1e293b]/90 text-white rounded-sm">
                        Add to Cart
                        <ArrowLeft className="w-4 h-4 ml-2 rotate-45" strokeWidth={1.5} />
                      </Button>
                      <Button 
                        className="w-full bg-[#e27447] hover:bg-[#e27447]/90 text-white rounded-sm"
                        onClick={handleEnroll}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Enrolling...</span>
                          </div>
                        ) : (
                          <>
                            Enroll Now
                            <ArrowLeft className="w-4 h-4 ml-2 rotate-45" strokeWidth={1.5} />
                          </>
                        )}
                      </Button>
                    </>
                  )}
                </div>

                {/* Enrollment Message */}
                {enrollmentMessage && (
                  <div className={`text-sm p-3 rounded-sm mb-6 ${
                    enrollmentMessage.includes('Successfully') 
                      ? 'bg-green-50 text-green-700 border border-green-200' 
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}>
                    {enrollmentMessage}
                  </div>
                )}

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
        )}
      </div>
    </div>
  )
}
