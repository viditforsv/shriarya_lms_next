'use client'
import { memo } from "react"
import { Breadcrumb } from "@/app/components-demo/ui/breadcrumb"
import { Button } from "@/app/components-demo/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components-demo/ui/card"
import { Badge } from "@/app/components-demo/ui/badge"
import { Input } from "@/app/components-demo/ui/input"
import { ArrowLeft, Search, Filter, Star, Clock, Users, BookOpen } from "@/app/components-demo/ui/icons"
import Link from "next/link"
import { useState } from "react"

const CourseListingPageTemplate = memo(function CourseListingPageTemplate() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBoard, setSelectedBoard] = useState('all')
  const [selectedLevel, setSelectedLevel] = useState('all')
  const [selectedSubject, setSelectedSubject] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  // Sample course data
  const courses = [
    {
      id: 1,
      title: "Mathematics Class 10 CBSE",
      board: "CBSE",
      level: "Class 10",
      subject: "Mathematics",
      description: "Complete mathematics course covering all CBSE Class 10 topics with practice questions and mock tests.",
      instructor: "Dr. Rajesh Kumar",
      rating: 4.8,
      students: 1250,
      duration: "6 months",
      price: "₹2,999",
      originalPrice: "₹4,999",
      image: "/images/Course Page 1.png",
      tags: ["Algebra", "Geometry", "Trigonometry"],
      isPopular: true
    },
    {
      id: 2,
      title: "Physics Class 12 ICSE",
      board: "ICSE",
      level: "Class 12",
      subject: "Physics",
      description: "Advanced physics concepts for ICSE Class 12 with practical experiments and numerical problems.",
      instructor: "Prof. Priya Sharma",
      rating: 4.6,
      students: 890,
      duration: "8 months",
      price: "₹3,499",
      originalPrice: "₹5,499",
      image: "/images/Course Page 2.png",
      tags: ["Mechanics", "Electromagnetism", "Optics"],
      isPopular: false
    },
    {
      id: 3,
      title: "Chemistry Class 11 CBSE",
      board: "CBSE",
      level: "Class 11",
      subject: "Chemistry",
      description: "Comprehensive chemistry course for CBSE Class 11 with lab work and theory.",
      instructor: "Dr. Amit Patel",
      rating: 4.7,
      students: 1100,
      duration: "7 months",
      price: "₹2,799",
      originalPrice: "₹4,299",
      image: "/images/Course Page 1.png",
      tags: ["Organic", "Inorganic", "Physical"],
      isPopular: true
    },
    {
      id: 4,
      title: "English Literature IBDP",
      board: "IBDP",
      level: "Higher Level",
      subject: "English",
      description: "International Baccalaureate English Literature course with critical analysis and essay writing.",
      instructor: "Ms. Sarah Johnson",
      rating: 4.9,
      students: 650,
      duration: "12 months",
      price: "₹4,999",
      originalPrice: "₹6,999",
      image: "/images/Course Page 2.png",
      tags: ["Literature", "Analysis", "Writing"],
      isPopular: false
    },
    {
      id: 5,
      title: "Biology Class 10 ICSE",
      board: "ICSE",
      level: "Class 10",
      subject: "Biology",
      description: "Complete biology syllabus for ICSE Class 10 with diagrams and practical knowledge.",
      instructor: "Dr. Meera Singh",
      rating: 4.5,
      students: 950,
      duration: "6 months",
      price: "₹2,599",
      originalPrice: "₹3,999",
      image: "/images/Course Page 1.png",
      tags: ["Botany", "Zoology", "Human Biology"],
      isPopular: false
    },
    {
      id: 6,
      title: "Computer Science IGCSE",
      board: "IGCSE",
      level: "Class 10",
      subject: "Computer Science",
      description: "IGCSE Computer Science course covering programming, algorithms, and computer systems.",
      instructor: "Mr. David Chen",
      rating: 4.8,
      students: 720,
      duration: "9 months",
      price: "₹3,299",
      originalPrice: "₹4,799",
      image: "/images/Course Page 2.png",
      tags: ["Programming", "Algorithms", "Systems"],
      isPopular: true
    }
  ]

  // Filter options
  const boards = ['all', 'CBSE', 'ICSE', 'IBDP', 'IGCSE']
  const levels = ['all', 'Class 9', 'Class 10', 'Class 11', 'Class 12', 'Higher Level', 'Standard Level']
  const subjects = ['all', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Computer Science']

  // Filter courses based on search and filters
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesBoard = selectedBoard === 'all' || course.board === selectedBoard
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel
    const matchesSubject = selectedSubject === 'all' || course.subject === selectedSubject

    return matchesSearch && matchesBoard && matchesLevel && matchesSubject
  })

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
          <h1 className="text-4xl font-bold text-[#1e293b] mb-4">Course Listing Template</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A comprehensive course listing page with search, filters, and course cards.
          </p>
        </div>

        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-secondary to-muted mb-20">
          <div className="container mx-auto px-4 text-center">
            <div className="w-20 h-20 bg-[#feefea] rounded-sm flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-10 h-10 text-[#e27447]" />
            </div>
            <h2 className="text-5xl font-bold text-foreground mb-6">
              Explore Our Courses
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Discover comprehensive courses across multiple boards and subjects. Find the perfect learning path for your academic journey.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for courses, subjects, or instructors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 text-lg border-[#feefea] focus:border-[#e27447] focus:ring-[#e27447]"
                />
              </div>
            </div>

            {/* Filter Toggle */}
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="border-[#e27447] text-[#e27447] hover:bg-[#e27447] hover:text-white"
            >
              <Filter className="w-4 h-4 mr-2" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </Button>
          </div>
        </section>

        {/* Filters Section */}
        {showFilters && (
          <section className="mb-12">
            <Card className="border-[#feefea]">
              <CardHeader>
                <CardTitle className="text-xl text-[#1e293b] flex items-center space-x-2">
                  <Filter className="w-5 h-5 text-[#e27447]" />
                  <span>Filter Courses</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Board Filter */}
                  <div>
                    <label className="block text-sm font-medium text-[#1e293b] mb-2">Board</label>
                    <select
                      value={selectedBoard}
                      onChange={(e) => setSelectedBoard(e.target.value)}
                      className="w-full px-3 py-2 border border-[#feefea] rounded-sm focus:border-[#e27447] focus:ring-[#e27447]"
                    >
                      {boards.map(board => (
                        <option key={board} value={board}>
                          {board === 'all' ? 'All Boards' : board}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Level Filter */}
                  <div>
                    <label className="block text-sm font-medium text-[#1e293b] mb-2">Level</label>
                    <select
                      value={selectedLevel}
                      onChange={(e) => setSelectedLevel(e.target.value)}
                      className="w-full px-3 py-2 border border-[#feefea] rounded-sm focus:border-[#e27447] focus:ring-[#e27447]"
                    >
                      {levels.map(level => (
                        <option key={level} value={level}>
                          {level === 'all' ? 'All Levels' : level}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Subject Filter */}
                  <div>
                    <label className="block text-sm font-medium text-[#1e293b] mb-2">Subject</label>
                    <select
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value)}
                      className="w-full px-3 py-2 border border-[#feefea] rounded-sm focus:border-[#e27447] focus:ring-[#e27447]"
                    >
                      {subjects.map(subject => (
                        <option key={subject} value={subject}>
                          {subject === 'all' ? 'All Subjects' : subject}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Clear Filters */}
                <div className="mt-6 text-center">
                  <Button
                    onClick={() => {
                      setSelectedBoard('all')
                      setSelectedLevel('all')
                      setSelectedSubject('all')
                    }}
                    variant="outline"
                    className="border-[#1e293b] text-[#1e293b] hover:bg-[#1e293b] hover:text-white"
                  >
                    Clear All Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Results Count */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              Showing {filteredCourses.length} of {courses.length} courses
            </p>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <select className="text-sm border-none bg-transparent text-[#e27447] font-medium">
                <option>Most Popular</option>
                <option>Highest Rated</option>
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="group hover:shadow-lg transition-all duration-300 border-[#feefea] hover:border-[#e27447]">
                <CardHeader className="pb-4">
                  <div className="relative">
                    <div className="w-full h-48 bg-gradient-to-br from-[#feefea] to-[#fffefd] rounded-sm mb-4 flex items-center justify-center">
                      <BookOpen className="w-16 h-16 text-[#e27447]" />
                    </div>
                    {course.isPopular && (
                      <Badge className="absolute top-2 right-2 bg-[#e27447] text-white">
                        Popular
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs border-[#feefea] text-[#1e293b]">
                      {course.board}
                    </Badge>
                    <Badge variant="outline" className="text-xs border-[#feefea] text-[#1e293b]">
                      {course.level}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg text-[#1e293b] group-hover:text-[#e27447] transition-colors">
                    {course.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  {/* Course Stats */}
                  <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span>{course.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {course.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Instructor */}
                  <p className="text-sm text-muted-foreground mb-4">
                    By <span className="font-medium text-[#1e293b]">{course.instructor}</span>
                  </p>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-[#e27447]">{course.price}</span>
                      <span className="text-sm text-muted-foreground line-through ml-2">{course.originalPrice}</span>
                    </div>
                    <Button size="sm" className="bg-[#e27447] hover:bg-[#e27447]/90">
                      View Course
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#1e293b] mb-2">No courses found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search terms or filters to find what you&apos;re looking for.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedBoard('all')
                  setSelectedLevel('all')
                  setSelectedSubject('all')
                }}
                className="bg-[#e27447] hover:bg-[#e27447]/90"
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </section>

        {/* Pagination */}
        <section className="text-center">
          <div className="flex items-center justify-center space-x-2">
            <Button variant="outline" className="border-[#feefea] text-[#1e293b] hover:bg-[#feefea]">
              Previous
            </Button>
            <Button className="bg-[#e27447] hover:bg-[#e27447]/90">1</Button>
            <Button variant="outline" className="border-[#feefea] text-[#1e293b] hover:bg-[#feefea]">2</Button>
            <Button variant="outline" className="border-[#feefea] text-[#1e293b] hover:bg-[#feefea]">3</Button>
            <Button variant="outline" className="border-[#feefea] text-[#1e293b] hover:bg-[#feefea]">
              Next
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
})

