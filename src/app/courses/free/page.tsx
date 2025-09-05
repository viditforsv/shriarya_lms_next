'use client'

import { Button } from "@/app/components-demo/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components-demo/ui/card"
import { Badge } from "@/app/components-demo/ui/badge"
import { Input } from "@/app/components-demo/ui/input"
import { Search, Filter, Clock, Users, BookOpen } from "lucide-react"
import { useState, useEffect } from "react"
import { getFreeCourses, Course } from "@/lib/courses"
import { useCourseEnrollment } from "@/hooks/useCourseEnrollment"
import { useAuth } from "@/contexts/AuthContext"

export default function FreeCoursesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBoard, setSelectedBoard] = useState('all')
  const [selectedLevel, setSelectedLevel] = useState('all')
  const [selectedSubject, setSelectedSubject] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { user } = useAuth()
  const { enroll, loading: enrollLoading } = useCourseEnrollment()

  // Fetch free courses from database
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true)
        const freeCourses = await getFreeCourses()
        setCourses(freeCourses)
      } catch (err) {
        setError('Failed to load courses')
        console.error('Error fetching courses:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  // Handle enrollment
  const handleEnroll = async (courseId: string) => {
    if (!user) {
      // Redirect to login
      window.location.href = '/auth'
      return
    }

    try {
      const enrollment = await enroll(courseId)
      if (enrollment) {
        // Show success message and redirect to course
        alert('Successfully enrolled! Redirecting to course...')
        // Redirect to the course page
        window.location.href = `/courses/cbse/mathematics/class-10`
      }
    } catch (err) {
      console.error('Enrollment error:', err)
    }
  }

  // Filter options (you can extend these based on your course data)
  const boards = ['all', 'CBSE', 'ICSE', 'IBDP', 'IGCSE']
  const levels = ['all', 'Class 9', 'Class 10', 'Class 11', 'Class 12', 'Higher Level', 'Standard Level']
  const subjects = ['all', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Computer Science']

  // Filter courses based on search and filters
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (course.description && course.description.toLowerCase().includes(searchQuery.toLowerCase()))
    
    // For now, we'll use simple filtering. You can extend this based on your course data structure
    const matchesBoard = selectedBoard === 'all' || course.title.includes(selectedBoard)
    const matchesLevel = selectedLevel === 'all' || course.title.includes(selectedLevel)
    const matchesSubject = selectedSubject === 'all' || course.title.includes(selectedSubject)

    return matchesSearch && matchesBoard && matchesLevel && matchesSubject
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e27447] mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading free courses...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-secondary to-muted mb-20">
          <div className="container mx-auto px-4 text-center">
            <div className="w-20 h-20 bg-[#feefea] rounded-sm flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-10 h-10 text-[#e27447]" />
            </div>
            <Badge className="bg-[#e27447] text-white mb-4">
              Free Resources
            </Badge>
            <h1 className="text-5xl font-bold text-foreground mb-6">
              Free Courses
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Access high-quality educational content completely free. Start learning today with our comprehensive free courses.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for courses..."
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
              Showing {filteredCourses.length} of {courses.length} free courses
            </p>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <select className="text-sm border-none bg-transparent text-[#e27447] font-medium">
                <option>Most Recent</option>
                <option>Alphabetical</option>
                <option>Most Popular</option>
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
                    <Badge className="absolute top-2 left-2 bg-green-500 text-white">
                      Free
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
                        <Clock className="w-4 h-4" />
                      <span>Self-paced</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                      <span>Open to all</span>
                    </div>
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between">
                  <div>
                      <span className="text-lg font-bold text-green-600">Free</span>
                    </div>
                    <Button 
                      size="sm" 
                      className="bg-[#e27447] hover:bg-[#e27447]/90"
                      onClick={() => handleEnroll(course.id)}
                      disabled={enrollLoading === course.id}
                    >
                      {enrollLoading === course.id ? 'Enrolling...' : 'Start Learning'}
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
              <h3 className="text-xl font-semibold text-[#1e293b] mb-2">No free courses found</h3>
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

          {/* Call to Action */}
        <section className="text-center mb-20">
          <Card className="max-w-2xl mx-auto border-[#e27447] bg-gradient-to-br from-[#feefea] to-[#fffefd]">
              <CardContent className="py-8">
              <h3 className="text-2xl font-bold text-[#1e293b] mb-4">
                  Ready to Start Learning?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Join thousands of students who are already learning with our free courses. 
              </p>
              <div className="flex gap-4 justify-center">
                <Button className="bg-[#e27447] hover:bg-[#e27447]/90">
                  Browse All Courses
                    </Button>
                <Button variant="outline" className="border-[#1e293b] hover:bg-[#1e293b] hover:text-white">
                  Sign Up Free
                    </Button>
                </div>
              </CardContent>
            </Card>
        </section>
        </div>
    </div>
  )
}
