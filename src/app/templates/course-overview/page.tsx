'use client'

import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  CheckCircle, 
  Clock, 
  Users, 
  BookOpen,
  Play,
  Star,
  Target
} from "lucide-react"

export default function CourseOverviewTemplate() {
  const courseInfo = {
    title: "Advanced Mathematics for IBDP",
    subtitle: "Master complex mathematical concepts and problem-solving techniques",
    instructor: "Dr. Sarah Chen",
    duration: "24 weeks",
    lessons: 48,
    students: 156,
    rating: 4.8,
    reviews: 89,
    level: "Advanced",
    category: "Mathematics",
    language: "English",
    certificate: true
  }

  const modules = [
    {
      title: "Module 1: Foundation Review",
      description: "Essential mathematical concepts and prerequisites",
      lessons: 8,
      duration: "4 weeks",
      completed: true,
      progress: 100
    },
    {
      title: "Module 2: Advanced Algebra",
      description: "Complex algebraic equations and functions",
      lessons: 12,
      duration: "6 weeks",
      completed: false,
      progress: 75
    },
    {
      title: "Module 3: Calculus Fundamentals",
      description: "Introduction to differential and integral calculus",
      lessons: 14,
      duration: "7 weeks",
      completed: false,
      progress: 0
    },
    {
      title: "Module 4: Problem Solving",
      description: "Advanced problem-solving strategies and techniques",
      lessons: 14,
      duration: "7 weeks",
      completed: false,
      progress: 0
    }
  ]

  const learningOutcomes = [
    "Master advanced mathematical concepts and theories",
    "Develop critical thinking and problem-solving skills",
    "Apply mathematical knowledge to real-world scenarios",
    "Prepare for IBDP examinations with confidence",
    "Build a strong foundation for higher education"
  ]

  const requirements = [
    "Basic understanding of algebra and geometry",
    "Familiarity with mathematical notation",
    "Dedication to regular study and practice",
    "Access to a scientific calculator",
    "Minimum 10 hours of study per week"
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb 
          items={[
            { label: "Home", href: "/" },
            { label: "Templates", href: "/templates" },
            { label: "Course Overview", href: "/templates/course-overview", isActive: true },
          ]} 
        />
      </div>

      {/* Course Header */}
      <section className="py-12 bg-gradient-to-br from-secondary to-muted">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Course Info */}
            <div className="lg:col-span-2">
              <Badge variant="secondary" className="mb-4">
                Template Preview
              </Badge>
              <h1 className="text-4xl font-bold text-foreground mb-4">
                {courseInfo.title}
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                {courseInfo.subtitle}
              </p>
              
              {/* Course Meta */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>{courseInfo.instructor}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{courseInfo.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <BookOpen className="w-4 h-4" />
                  <span>{courseInfo.lessons} lessons</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>{courseInfo.students} students</span>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < Math.floor(courseInfo.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} 
                    />
                  ))}
                </div>
                <span className="text-foreground font-medium">{courseInfo.rating}</span>
                <span className="text-muted-foreground">({courseInfo.reviews} reviews)</span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button size="lg" className="bg-accent hover:bg-accent/90">
                  <Play className="mr-2 h-5 w-5" />
                  Start Learning
                </Button>
                <Button size="lg" variant="outline">
                  Preview Course
                </Button>
              </div>
            </div>

            {/* Course Card */}
            <div>
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="text-2xl">Course Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Level:</span>
                      <Badge variant="secondary" className="ml-2">{courseInfo.level}</Badge>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Category:</span>
                      <Badge variant="outline" className="ml-2">{courseInfo.category}</Badge>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Language:</span>
                      <span className="ml-2 font-medium">{courseInfo.language}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Certificate:</span>
                      <Badge variant={courseInfo.certificate ? "default" : "secondary"} className="ml-2">
                        {courseInfo.certificate ? "Yes" : "No"}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Course Progress</span>
                      <span className="text-sm text-muted-foreground">25%</span>
                    </div>
                    <Progress value={25} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Course Modules */}
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-8">Course Modules</h2>
                <div className="space-y-4">
                  {modules.map((module, index) => (
                    <Card key={index} className="hover:shadow-md transition-all duration-200">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              module.completed ? 'bg-green-100 text-green-600' : 'bg-secondary text-muted-foreground'
                            }`}>
                              {module.completed ? (
                                <CheckCircle className="w-4 h-4" />
                              ) : (
                                <span className="text-sm font-medium">{index + 1}</span>
                              )}
                            </div>
                            <div>
                              <CardTitle className="text-lg">{module.title}</CardTitle>
                              <CardDescription>{module.description}</CardDescription>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-muted-foreground">{module.lessons} lessons</div>
                            <div className="text-sm text-muted-foreground">{module.duration}</div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-4">
                          <div className="flex-1">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium">Progress</span>
                              <span className="text-sm text-muted-foreground">{module.progress}%</span>
                            </div>
                            <Progress value={module.progress} className="h-2" />
                          </div>
                          <Button variant="outline" size="sm">
                            {module.completed ? 'Review' : 'Continue'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Learning Outcomes */}
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Learning Outcomes</h2>
                <div className="grid gap-4">
                  {learningOutcomes.map((outcome, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Target className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Requirements</h2>
                <div className="grid gap-4">
                  {requirements.map((requirement, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{requirement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Course Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Course Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Duration</span>
                    <span className="font-medium">{courseInfo.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Lessons</span>
                    <span className="font-medium">{courseInfo.lessons}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Enrolled Students</span>
                    <span className="font-medium">{courseInfo.students}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Average Rating</span>
                    <span className="font-medium">{courseInfo.rating}/5</span>
                  </div>
                </CardContent>
              </Card>

              {/* Instructor Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Instructor</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="w-16 h-16 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{courseInfo.instructor}</h3>
                  <p className="text-sm text-muted-foreground mb-4">Mathematics Expert</p>
                  <Button variant="outline" size="sm" className="w-full">
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Template Info */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Course Overview Template</CardTitle>
              <CardDescription>
                This is a preview of the Course Overview template. Use this structure to create comprehensive course pages with modules, progress tracking, and learning outcomes.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex gap-4 justify-center">
                <Button variant="outline">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Use This Template
                </Button>
                <Button variant="outline">
                  Download Code
                </Button>
                <Button variant="outline">
                  Customize
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
