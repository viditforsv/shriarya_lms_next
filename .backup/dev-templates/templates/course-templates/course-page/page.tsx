'use client'

import { memo, useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Play, Clock, FileText, Download, Smartphone, Infinity, Award, Share2, ChevronDown, ChevronUp, Heart, Bookmark, Star, CheckCircle, Lock, Eye, EyeOff } from "@/app/components-demo/ui/icons"
import { Button } from "@/app/components-demo/ui/ui-components/button"
import { Badge } from "@/app/components-demo/ui/ui-components/badge"
import { SocialIconsRow, CourseStats, CourseContentSection } from "@/app/components-demo/ui"
import { TemplateLayout, TemplateSection, TemplateCard } from "@/app/components-demo/ui/template-layout"
import { useAuth } from "@/contexts/AuthContext"

// Force dynamic rendering to prevent static generation issues
export const dynamic = 'force-dynamic'

interface Lesson {
  id: string
  title: string
  duration: string
  type: 'video' | 'document' | 'question' | 'practice'
  hasPreview: boolean
  isLocked: boolean
  description?: string
}

interface CourseSection {
  id: string
  title: string
  lectures: number
  duration: string
  lessons: Lesson[]
}

const CoursePageTemplate = memo(function CoursePageTemplate() {
  const { user, profile } = useAuth()
  
  // State management
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['section-1']))
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [isInCart, setIsInCart] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [showAllSections, setShowAllSections] = useState(false)
  const [enrollmentLoading, setEnrollmentLoading] = useState(false)
  const [cartLoading, setCartLoading] = useState(false)
  const [previewLesson, setPreviewLesson] = useState<Lesson | null>(null)

  // Sample course data
  const courseData = {
    title: "Master CBSE Mathematics Class 10",
    description: "Comprehensive CBSE Class 10 Mathematics course covering all chapters with detailed explanations, practice problems, and board exam preparation.",
    price: 2999,
    originalPrice: 4999,
    discount: 40,
    rating: 4.8,
    totalRatings: 2847,
    students: 1234,
    lessons: 104,
    duration: "120 hours",
    lastUpdated: "12/2024",
    instructor: {
      name: "Dr. Priya Sharma",
      title: "Mathematics Expert & CBSE Trainer",
      bio: "With over 15 years of experience in CBSE Mathematics education, Dr. Priya Sharma has helped thousands of students achieve excellence in their board examinations.",
      rating: 4.9,
      courses: 12,
      students: 5000
    },
    features: [
      "Complete NCERT syllabus coverage",
      "Board exam focused preparation", 
      "Step-by-step problem solving",
      "Practice tests and mock exams",
      "Doubt clearing sessions",
      "Mobile app access",
      "Certificate of completion"
    ],
    requirements: [
      "Basic understanding of Class 9 Mathematics",
      "Stable internet connection",
      "Notebook and pen for practice"
    ],
    learningOutcomes: [
      "Master fundamental concepts and operations",
      "Solve complex problems and equations", 
      "Understand theoretical foundations",
      "Apply practical applications",
      "Learn advanced techniques",
      "Master statistical analysis",
      "Prepare for examinations",
      "Access 120+ hours of video instruction",
      "Practice with 50+ downloadable resources",
      "Get expert support and guidance",
      "Track progress with detailed analytics",
      "Earn certificate of completion"
    ]
  }

  const courseSections: CourseSection[] = [
    {
      id: "section-1",
      title: "Real Numbers & Number Systems",
      lectures: 8,
      duration: "6 hours",
      lessons: [
        {
          id: "1",
          title: "Introduction to Real Numbers",
          duration: "45:20",
          type: "video",
          hasPreview: true,
          isLocked: false,
          description: "Understanding the concept of real numbers, rational and irrational numbers"
        },
        {
          id: "2", 
          title: "Euclid's Division Lemma",
          duration: "52:15",
          type: "video",
          hasPreview: true,
          isLocked: false,
          description: "Learn about Euclid's Division Lemma and its applications"
        },
        {
          id: "3",
          title: "Fundamental Theorem of Arithmetic",
          duration: "38:45",
          type: "document",
          hasPreview: true,
          isLocked: true,
          description: "Understanding prime factorization and its applications"
        },
        {
          id: "4",
          title: "Practice Problems - Real Numbers",
          duration: "25:30",
          type: "practice",
          hasPreview: false,
          isLocked: true,
          description: "Comprehensive practice problems with solutions"
        }
      ]
    },
    {
      id: "section-2",
      title: "Polynomials & Quadratic Equations",
      lectures: 10,
      duration: "8 hours",
      lessons: [
        {
          id: "5",
          title: "Introduction to Polynomials",
          duration: "40:15",
          type: "video",
          hasPreview: true,
          isLocked: true,
          description: "Understanding polynomial expressions and their properties"
        },
        {
          id: "6",
          title: "Division Algorithm for Polynomials",
          duration: "35:20",
          type: "video",
          hasPreview: false,
          isLocked: true,
          description: "Learning polynomial division techniques"
        }
      ]
    },
    {
      id: "section-3",
      title: "Coordinate Geometry",
      lectures: 12,
      duration: "10 hours",
      lessons: [
        {
          id: "7",
          title: "Distance Formula",
          duration: "42:30",
          type: "video",
          hasPreview: true,
          isLocked: true,
          description: "Calculating distances between points on coordinate plane"
        }
      ]
    },
    {
      id: "section-4",
      title: "Trigonometry",
      lectures: 18,
      duration: "12 hours",
      lessons: [
        {
          id: "8",
          title: "Introduction to Trigonometry",
          duration: "48:45",
          type: "video",
          hasPreview: true,
          isLocked: true,
          description: "Understanding trigonometric ratios and their applications"
        }
      ]
    }
  ]

  // Event handlers
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

  const handleEnrollNow = async () => {
    if (!user) {
      // Redirect to login
      window.location.href = '/auth?next=' + encodeURIComponent(window.location.pathname)
      return
    }

    setEnrollmentLoading(true)
    
    // Simulate enrollment process
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsEnrolled(true)
    setEnrollmentLoading(false)
    
    // Show success message
    alert('🎉 Successfully enrolled! You can now access all course content.')
  }

  const handleAddToCart = async () => {
    setCartLoading(true)
    
    // Simulate cart addition
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsInCart(true)
    setCartLoading(false)
    
    // Show success message
    alert('✅ Course added to cart!')
  }

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted)
    alert(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist')
  }

  const handlePreviewLesson = (lesson: Lesson) => {
    if (lesson.hasPreview) {
      setPreviewLesson(lesson)
      // In a real app, this would open a modal or redirect to preview
      alert(`🎬 Starting preview: "${lesson.title}"\n\nDuration: ${lesson.duration}\nDescription: ${lesson.description}`)
    }
  }

  const handleShareCourse = (platform: string) => {
    const url = window.location.href
    const title = courseData.title
    
    let shareUrl = ''
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        break
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
        break
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        break
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`
        break
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400')
    }
  }

  const handleShowMoreSections = () => {
    setShowAllSections(true)
    // In a real app, this would load more sections from the API
    alert('📚 Loading more course sections...')
  }

  const visibleSections = showAllSections ? courseSections : courseSections.slice(0, 2)

  return (
    <TemplateLayout
      title="Enhanced Course Page Template"
      description="A fully interactive course page template with functional buttons, expandable accordions, enrollment flow, and social sharing. Based on our CBSE Mathematics Class 10 course design."
      phase="Phase 1-3"
      ready={true}
    >
      {/* Preview Modal */}
      {previewLesson && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-sm p-6 max-w-2xl w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">🎬 {previewLesson.title}</h3>
              <button 
                onClick={() => setPreviewLesson(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="aspect-video bg-gray-100 rounded-sm flex items-center justify-center mb-4">
              <div className="text-center">
                <Play className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Preview Video Player</p>
                <p className="text-sm text-gray-500 mt-1">Duration: {previewLesson.duration}</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4">{previewLesson.description}</p>
            <div className="flex gap-3">
              <Button onClick={() => setPreviewLesson(null)} className="flex-1">
                Close Preview
              </Button>
              <Button 
                onClick={() => {
                  setPreviewLesson(null)
                  handleEnrollNow()
                }}
                className="flex-1 bg-[#e27447] hover:bg-[#e27447]/90"
              >
                Enroll to Access Full Content
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Content Area */}
        <div className="lg:col-span-2">
          {/* Course Overview Section */}
          <div className="bg-white rounded-sm border border-[#feefea] p-10 mb-10">
            {/* Course Title */}
            <h2 className="text-4xl font-bold text-[#1e293b] mb-6 leading-tight">
              {courseData.title}
            </h2>
            
            {/* Learning Objectives */}
            <div className="mb-8">
              <span className="text-[#1e293b] font-medium">Learn:</span>
              <span className="text-muted-foreground ml-2">
                Real Numbers | Polynomials | Coordinate Geometry | Trigonometry | Statistics | Probability | Circles | Constructions
              </span>
            </div>
            
            {/* Course Statistics */}
            <CourseStats
              rating={courseData.rating}
              totalRatings={courseData.totalRatings}
              lessons={courseData.lessons}
              students={courseData.students}
              lastUpdated={courseData.lastUpdated}
              className="mb-8"
            />
            
            {/* Instructor Information */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full border-2 border-[#feefea] overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-[#feefea] to-[#fffefd] flex items-center justify-center">
                  <img 
                    src="/images/main_logo.webp" 
                    alt="Instructor Logo" 
                    className="w-8 h-8 object-contain"
                    style={{ mixBlendMode: 'multiply' }}
                  />
                </div>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">By</span>
                <span className="text-[#1e293b] font-semibold ml-1">{courseData.instructor.name}</span>
              </div>
            </div>
          </div>

          {/* What You'll Learn Section */}
          <div className="bg-white rounded-sm border border-[#feefea] p-10 mb-10">
            <h3 className="text-3xl font-bold text-[#1e293b] mb-10">What you&apos;ll learn</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-5">
                {courseData.learningOutcomes.slice(0, 6).map((outcome, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-[#1e293b] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-muted-foreground">{outcome}</span>
                  </div>
                ))}
              </div>
              
              {/* Right Column */}
              <div className="space-y-5">
                {courseData.learningOutcomes.slice(6).map((outcome, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-[#1e293b] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-muted-foreground">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Requirements Section */}
          <div className="bg-white rounded-sm border border-[#feefea] p-10 mb-10">
            <h3 className="text-3xl font-bold text-[#1e293b] mb-8">Requirements</h3>
            <ul className="space-y-4">
              {courseData.requirements.map((requirement, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#1e293b] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-muted-foreground">{requirement}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* About This Course Section */}
          <div className="bg-white rounded-sm border border-[#feefea] p-10 mb-10">
            <h3 className="text-3xl font-bold text-[#1e293b] mb-8">About This Course</h3>
            <div className="space-y-6">
              <p className="text-muted-foreground leading-relaxed">
                Welcome to our comprehensive CBSE Mathematics Class 10 course designed to help you master all the essential concepts required for your board examinations. This course covers the complete syllabus with detailed explanations, practical examples, and extensive practice problems.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our expert instructors have carefully structured the content to build your foundation step by step, ensuring you understand both the theory and practical applications of each concept.
              </p>
              {showFullDescription && (
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    The course includes comprehensive coverage of all NCERT chapters with special focus on board exam preparation. Each lesson is designed to build upon previous knowledge while introducing new concepts in an engaging and easy-to-understand manner.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Students will have access to practice tests, mock examinations, and detailed solutions to help them prepare effectively for their CBSE Class 10 Mathematics board examination.
                  </p>
                </div>
              )}
              <button 
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="flex items-center space-x-2 text-[#e27447] hover:text-[#e27447]/80 transition-colors font-medium"
              >
                <span>{showFullDescription ? 'Show Less' : 'Show More'}</span>
                {showFullDescription ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Course Content Section */}
          <div className="bg-white rounded-sm border border-[#feefea] p-10 mb-10">
            <h3 className="text-3xl font-bold text-[#1e293b] mb-8">Course Content</h3>
            
            {/* Course Sections */}
            <div className="space-y-4">
              {visibleSections.map((section) => (
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
            
            {/* Enhanced Lesson Display */}
            {expandedSections.size > 0 && (
              <div className="mt-6 space-y-3">
                {visibleSections
                  .filter(section => expandedSections.has(section.id))
                  .map(section => (
                    <div key={section.id} className="pl-4 border-l-2 border-[#feefea]">
                      {section.lessons.map((lesson) => {
                        const IconComponent = lesson.type === 'video' ? Play : 
                                            lesson.type === 'document' ? FileText :
                                            lesson.type === 'question' ? Clock : Play
                        
                        return (
                          <div key={lesson.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                            <div className="flex items-center space-x-3">
                              <div className="w-4 h-4 rounded-full bg-[#1e293b] flex items-center justify-center">
                                <IconComponent className="w-3 h-3 text-white" />
                              </div>
                              <div>
                                <span className="text-sm text-[#1e293b] font-medium">{lesson.title}</span>
                                {lesson.description && (
                                  <p className="text-xs text-muted-foreground mt-1">{lesson.description}</p>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                              {lesson.hasPreview && (
                                <Button 
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handlePreviewLesson(lesson)}
                                  className="text-xs px-3 py-1 bg-[#e27447] text-white hover:bg-[#e27447]/90 border-[#e27447]"
                                >
                                  Preview
                                </Button>
                              )}
                              {lesson.isLocked && (
                                <Lock className="w-4 h-4 text-muted-foreground" />
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  ))}
              </div>
            )}
            
            {/* More Sections Button */}
            {!showAllSections && (
              <div className="mt-8 text-center">
                <Button 
                  onClick={handleShowMoreSections}
                  variant="outline"
                  className="px-8 py-4 border border-[#feefea] rounded-sm bg-white text-[#1e293b] font-medium hover:bg-[#feefea]/30 transition-colors"
                >
                  <span>Show {courseSections.length - 2} More Sections</span>
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}
          </div>

          {/* Instructor Section */}
          <div className="bg-white rounded-sm border border-[#feefea] p-10">
            <h3 className="text-3xl font-bold text-[#1e293b] mb-8">Instructor</h3>
            
            <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-8">
              {/* Profile Picture */}
              <div className="flex-shrink-0">
                <div className="w-32 h-32 rounded-sm overflow-hidden border-2 border-[#feefea]">
                  <div className="w-full h-full bg-gradient-to-br from-[#feefea] to-[#fffefd] flex items-center justify-center">
                    <img 
                      src="/images/main_logo.webp" 
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
                <h4 className="text-2xl font-bold text-[#1e293b] mb-2">{courseData.instructor.name}</h4>
                <p className="text-lg text-muted-foreground mb-6">{courseData.instructor.title}</p>
                
                {/* Statistics */}
                <CourseStats
                  rating={courseData.instructor.rating}
                  totalRatings={2847}
                  students={courseData.instructor.students}
                  duration={`${courseData.instructor.courses} Courses`}
                  className="mb-6"
                />
                
                {/* Bio */}
                <div className="space-y-4 mb-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {courseData.instructor.bio}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    With a focus on practical applications and real-world examples, we help students build strong foundations that prepare them not just for exams, but for future academic and professional success.
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
                      src="/images/main_logo.webp" 
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
                  <span className="text-3xl font-bold text-[#e27447]">₹{courseData.price.toLocaleString()}</span>
                  <span className="text-lg text-muted-foreground line-through">₹{courseData.originalPrice.toLocaleString()}</span>
                </div>
                <Badge className="bg-[#feefea] text-[#e27447] hover:bg-[#feefea] border border-[#feefea]">
                  {courseData.discount}% OFF
                </Badge>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mb-6">
              {isEnrolled ? (
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white rounded-sm">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Enrolled - Access Course
                </Button>
              ) : (
                <>
                  <Button 
                    onClick={handleAddToCart}
                    disabled={cartLoading || isInCart}
                    className="w-full bg-[#1e293b] hover:bg-[#1e293b]/90 text-white rounded-sm"
                  >
                    {cartLoading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    ) : isInCart ? (
                      <CheckCircle className="w-4 h-4 mr-2" />
                    ) : (
                      <ArrowLeft className="w-4 h-4 mr-2 rotate-45" strokeWidth={1.5} />
                    )}
                    {isInCart ? 'Added to Cart' : 'Add to Cart'}
                  </Button>
                  <Button 
                    onClick={handleEnrollNow}
                    disabled={enrollmentLoading}
                    variant="outline" 
                    className="w-full rounded-sm border-black hover:bg-[#feefea]"
                  >
                    {enrollmentLoading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#1e293b] mr-2"></div>
                    ) : (
                      <ArrowLeft className="w-4 h-4 mr-2 rotate-45" strokeWidth={1.5} />
                    )}
                    {enrollmentLoading ? 'Enrolling...' : 'Enroll Now'}
                  </Button>
                </>
              )}
              
              {/* Wishlist Button */}
              <Button 
                onClick={handleWishlistToggle}
                variant="outline"
                className="w-full rounded-sm border-[#feefea] hover:bg-[#feefea]/30"
              >
                <Heart className={`w-4 h-4 mr-2 ${isWishlisted ? 'text-red-500 fill-current' : ''}`} />
                {isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </Button>
            </div>

            {/* Guarantee */}
            <div className="text-center mb-6">
              <p className="text-sm text-muted-foreground">
                30-Day Satisfaction Guarantee
              </p>
            </div>

            {/* Course Details */}
            <div className="mb-6">
              <h4 className="font-semibold text-[#1e293b] mb-4">This course includes:</h4>
              <div className="space-y-3">
                {courseData.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-[#1e293b]" strokeWidth={1.5} />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Sharing */}
            <div className="border-t border-[#feefea] pt-6">
              <h4 className="font-semibold text-[#1e293b] mb-4 flex items-center">
                <Share2 className="w-4 h-4 mr-2" strokeWidth={1.5} />
                Share this course
              </h4>
              <div className="flex space-x-2">
                {['facebook', 'twitter', 'linkedin', 'whatsapp'].map((platform) => (
                  <Button
                    key={platform}
                    onClick={() => handleShareCourse(platform)}
                    variant="outline"
                    size="sm"
                    className="flex-1 rounded-sm border-[#feefea] hover:bg-[#feefea]/30"
                  >
                    {platform.charAt(0).toUpperCase() + platform.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Template Usage Instructions */}
      <div className="mt-20 bg-[#feefea] rounded-sm border border-[#e27447] p-8">
        <h3 className="text-2xl font-bold text-[#1e293b] mb-6">Enhanced Template Features</h3>
        <div className="space-y-4 text-[#1e293b]">
          <p><strong>✅ Interactive Elements:</strong> All buttons are now functional with proper loading states and user feedback.</p>
          <p><strong>✅ Expandable Accordions:</strong> Course sections can be expanded/collapsed with smooth animations.</p>
          <p><strong>✅ Enrollment Flow:</strong> Complete enrollment process with authentication checks and success messages.</p>
          <p><strong>✅ Preview System:</strong> Students can preview lessons before enrolling.</p>
          <p><strong>✅ Social Sharing:</strong> Share course on multiple platforms with proper URL handling.</p>
          <p><strong>✅ Wishlist Functionality:</strong> Add/remove courses from wishlist with visual feedback.</p>
          <p><strong>✅ Cart Management:</strong> Add courses to cart with loading states and confirmation.</p>
          <p><strong>✅ Responsive Design:</strong> Fully responsive layout that works on all devices.</p>
        </div>
      </div>
    </TemplateLayout>
  )
})

export default CoursePageTemplate