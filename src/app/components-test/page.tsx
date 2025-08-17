"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { ChevronDown, BookOpen, Users, Clock, Star } from "lucide-react"
import { useState, useEffect } from "react"

// Force dynamic rendering to prevent static generation issues
export const dynamic = 'force-dynamic'

export default function ComponentsTestPage() {
  const [sortBy, setSortBy] = useState("default")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent hydration issues
  if (!mounted) {
    return (
      <div className="container mx-auto py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded-sm mb-4"></div>
          <div className="h-4 bg-muted rounded-sm mb-8"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-muted rounded-sm"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const courses = [
    {
      id: 1,
      title: "IBDP Math AA HL – Complete Problem Solving",
      subtitle: "Master advanced calculus, algebra, and problem-solving techniques for IBDP Mathematics AA Higher Level. Comprehensive coverage of all syllabus topics with extensive practice.",
      instructor: "Shrividhya Faculty",
      lessons: 24,
      students: 320,
      duration: "18 Hours",
      rating: 4.8,
      reviews: 230,
      badge: "IBDP HL Special",
      price: "₹3,999",
      thumbnail: "/images/course-1.jpg"
    },
    {
      id: 2,
      title: "IBDP Math AI SL – Data & Applications Mastery",
      subtitle: "Explore statistics, modeling, and real-world applications in IBDP Mathematics AI Standard Level. Perfect for students interested in data science and practical mathematics.",
      instructor: "Shrividhya Faculty",
      lessons: 18,
      students: 245,
      duration: "15 Hours",
      rating: 4.7,
      reviews: 189,
      badge: "Board Exam Prep",
      price: "₹2,999",
      thumbnail: "/images/course-2.jpg"
    },
    {
      id: 3,
      title: "ICSE Grade 10 Math – Final Exam Booster",
      subtitle: "Intensive preparation for ICSE Grade 10 Mathematics final examinations. Covers all board topics with practice papers and step-by-step solutions.",
      instructor: "Shrividhya Faculty",
      lessons: 20,
      students: 412,
      duration: "16 Hours",
      rating: 4.9,
      reviews: 298,
      badge: "Featured",
      price: "₹2,499",
      thumbnail: "/images/course-3.jpg"
    },
    {
      id: 4,
      title: "IBDP Math IA Guidance & Mentorship",
      subtitle: "Personalized guidance for IBDP Mathematics Internal Assessment. Expert mentorship to help you excel in your mathematical exploration and research project.",
      instructor: "Guest IB Examiners",
      lessons: 12,
      students: 156,
      duration: "10 Hours",
      rating: 4.9,
      reviews: 89,
      badge: "Premium",
      price: "₹4,999",
      thumbnail: "/images/course-4.jpg"
    }
  ]

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumb 
        items={[
          { label: "Home", href: "/" },
          { label: "Components Test", href: "/components-test", isActive: true },
        ]} 
      />
      
      <h1 className="text-3xl font-bold">Course List View Component</h1>
      
      {/* Course List Section */}
      <section className="bg-card rounded-sm shadow-sm border border-border p-8">
        {/* Header with Sorting */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Available Courses</h2>
            <p className="text-muted-foreground">Browse our comprehensive mathematics courses</p>
          </div>
          
          {/* Sorting Dropdown */}
          <div className="relative mt-4 sm:mt-0">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-background border border-border rounded-sm px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            >
              <option value="default">Default</option>
              <option value="popular">Most Popular</option>
              <option value="highest-rated">Highest Rated</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        {/* Course Cards */}
        <div className="space-y-6">
          {courses.map((course, index) => (
            <div key={course.id}>
              {/* Course Card */}
              <Card className="hover:shadow-lg transition-all duration-300 border border-gray-200">
                <CardContent className="p-0">
                  <div className="flex flex-col lg:flex-row">
                                         {/* Thumbnail Image */}
                     <div className="lg:w-84 lg:h-64 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-l-sm flex items-center justify-center">
                       <div className="text-center text-gray-500">
                         <svg className="w-20 h-20 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                         </svg>
                         <p className="text-sm">Course Thumbnail</p>
                       </div>
                     </div>

                    {/* Course Details */}
                    <div className="flex-1 p-6">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between h-full">
                        {/* Left Side - Course Info */}
                        <div className="flex-1 lg:pr-6">
                          {/* Meta Info Row */}
                          <div className="flex items-center gap-6 mb-3 text-sm text-[#4a6f73]">
                            <div className="flex items-center gap-2">
                              <BookOpen className="w-4 h-4" />
                              <span>{course.lessons} Lessons</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4" />
                              <span>{course.students} Students</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              <span>{course.duration}</span>
                            </div>
                          </div>

                          {/* Course Title */}
                          <h3 className="text-xl font-bold text-[#1b4a56] mb-2 font-dm-sans leading-tight">
                            {course.title}
                          </h3>

                          {/* Course Subtitle */}
                          <p className="text-[#4a6f73] mb-3 font-dm-sans line-clamp-2 leading-relaxed">
                            {course.subtitle}
                          </p>

                          {/* Instructor */}
                          <p className="text-sm text-[#4a6f73] mb-3 font-dm-sans">
                            By: {course.instructor}
                          </p>

                          {/* Rating Row */}
                          <div className="flex items-center gap-2 mb-3">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span className="font-semibold text-sm">{course.rating}</span>
                            </div>
                            <span className="text-sm text-gray-500">({course.reviews})</span>
                          </div>

                          {/* Badge */}
                          <Badge className="bg-[#E57342] text-white border-0 font-dm-sans">
                            {course.badge}
                          </Badge>
                        </div>

                        {/* Right Side - Price */}
                        <div className="mt-4 lg:mt-0 lg:flex-shrink-0">
                          <div className="text-right">
                            <div className="text-2xl font-bold text-[#E57342] font-dm-sans">
                              {course.price}
                            </div>
                                                         <Button 
                               variant="outline" 
                               size="sm" 
                               className="mt-2 hover:bg-[#1b4a56] hover:text-white transition-colors"
                             >
                               Enroll Now
                             </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Divider (except for last item) */}
              {index < courses.length - 1 && (
                <div className="h-px bg-gray-200 my-6"></div>
              )}
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-[#4a6f73] font-dm-sans mb-4 sm:mb-0">
              Showing 1–{courses.length} of {courses.length} Courses
            </p>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="rounded-sm">Previous</Button>
              <Button variant="outline" size="sm" className="rounded-sm bg-[#1b4a56] text-white">1</Button>
              <Button variant="outline" size="sm" className="rounded-sm">2</Button>
              <Button variant="outline" size="sm" className="rounded-sm">3</Button>
              <Button variant="outline" size="sm" className="rounded-sm">Next</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
