"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, BookOpen, Users, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/contexts/AuthContext"
import { createClient } from "@/lib/supabase/client"

export default function CreateCoursePage() {
  const router = useRouter()
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  const createNewCourse = async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Get the current session token
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        throw new Error('No active session')
      }

      const response = await fetch('/api/courses-v3', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create course')
      }

      const { course } = data
      
      // Redirect to the course builder
      router.push(`/dashboard/courses/${course.id}/edit`)
    } catch (err) {
      console.error('Error creating course:', err)
      setError(err instanceof Error ? err.message : 'Failed to create course')
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Please log in to create courses</p>
          <Button onClick={() => router.push('/auth')}>
            Sign In
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#1e293b] mb-6">
              Create Your Course
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Build engaging courses with our intuitive course builder. Add lessons, resources, and publish to reach your students.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="border-[#feefea] text-center">
              <CardContent className="p-6">
                <BookOpen className="w-12 h-12 text-[#e27447] mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Easy Lesson Creation</h3>
                <p className="text-muted-foreground text-sm">
                  Create lessons with rich content, videos, and practice problems
                </p>
              </CardContent>
            </Card>

            <Card className="border-[#feefea] text-center">
              <CardContent className="p-6">
                <Users className="w-12 h-12 text-[#e27447] mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Student Engagement</h3>
                <p className="text-muted-foreground text-sm">
                  Track progress and engage students with interactive content
                </p>
              </CardContent>
            </Card>

            <Card className="border-[#feefea] text-center">
              <CardContent className="p-6">
                <Clock className="w-12 h-12 text-[#e27447] mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Flexible Publishing</h3>
                <p className="text-muted-foreground text-sm">
                  Work on drafts and publish when ready to reach your audience
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Create Course Button */}
          <div className="text-center">
            {error && (
              <p className="text-red-600 mb-4">{error}</p>
            )}
            <Button 
              onClick={createNewCourse}
              disabled={isLoading}
              size="lg"
              className="bg-[#e27447] hover:bg-[#e27447]/90 px-8 py-3"
            >
              <Plus className="w-5 h-5 mr-2" />
              {isLoading ? 'Creating Course...' : 'Start Creating Course'}
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              You'll be redirected to the course builder where you can add your content
            </p>
          </div>

          {/* How it works */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-[#1e293b] mb-8 text-center">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-[#e27447] text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                  1
                </div>
                <h3 className="font-semibold mb-2">Create Course</h3>
                <p className="text-sm text-muted-foreground">
                  Start with a blank course template
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[#e27447] text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                  2
                </div>
                <h3 className="font-semibold mb-2">Add Content</h3>
                <p className="text-sm text-muted-foreground">
                  Create lessons and add your materials
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[#e27447] text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                  3
                </div>
                <h3 className="font-semibold mb-2">Preview & Edit</h3>
                <p className="text-sm text-muted-foreground">
                  Review your course and make adjustments
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[#e27447] text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                  4
                </div>
                <h3 className="font-semibold mb-2">Publish</h3>
                <p className="text-sm text-muted-foreground">
                  Make your course available to students
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
