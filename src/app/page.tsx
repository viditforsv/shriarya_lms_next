"use client";

// Removed unused imports
import { Button } from "@/app/components-demo/ui/ui-components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components-demo/ui/ui-components/card";
import { BookOpen, Award, Clock, ArrowRight, TrendingUp } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export default function Home() {
  const router = useRouter();

  // Use auth context
  const authContext = useAuth();
  const user = authContext?.user;
  const loading = authContext?.loading;

  // Stats state
  const [stats, setStats] = useState({
    enrolledCourses: 0,
    completedCourses: 0,
    totalProgress: 0,
    loading: true,
  });

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return;

      try {
        const supabase = createClient();

        // Get enrolled courses count
        const { count: enrolledCount } = await supabase
          .from("courses_enrollments")
          .select("*", { count: "exact", head: true })
          .eq("student_id", user.id)
          .eq("is_active", true);

        // Get user progress data
        const { data: progressData } = await supabase
          .from("user_progress")
          .select("is_completed, completion_percentage")
          .eq("user_id", user.id);

        const completedCount =
          progressData?.filter((p) => p.is_completed).length || 0;
        const avgProgress =
          progressData && progressData.length > 0
            ? Math.round(
                progressData.reduce(
                  (acc, p) => acc + (p.completion_percentage || 0),
                  0
                ) / progressData.length
              )
            : 0;

        setStats({
          enrolledCourses: enrolledCount || 0,
          completedCourses: completedCount,
          totalProgress: avgProgress,
          loading: false,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
        setStats((prev) => ({ ...prev, loading: false }));
      }
    };

    fetchStats();
  }, [user]);

  // Show loading while auth is being determined (with a timeout)
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Show authenticated user content
  if (user) {
    return (
      <div className="min-h-screen">
        {/* Hero Section for Authenticated Users */}
        <section className="bg-gradient-to-br from-secondary to-muted py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold text-foreground mb-6">
              Welcome back, {user.user_metadata?.full_name || user.email}!
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Continue your learning journey with personalized courses and
              progress tracking.
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90"
                onClick={() => router.push("/courses/enrolled")}
              >
                My Courses
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => router.push("/courses/discover")}
              >
                Browse Courses
              </Button>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">
              Your Learning Progress
            </h2>
            {stats.loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e27447] mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading your stats...</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="text-center hover:shadow-lg transition-shadow rounded-sm">
                  <CardHeader>
                    <BookOpen className="w-12 h-12 text-[#e27447] mx-auto mb-4" />
                    <CardTitle>Enrolled Courses</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      <span className="text-3xl font-bold text-[#e27447]">
                        {stats.enrolledCourses}
                      </span>
                    </CardDescription>
                    <p className="text-sm text-muted-foreground mt-2">
                      Active enrollments
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center hover:shadow-lg transition-shadow rounded-sm">
                  <CardHeader>
                    <Award className="w-12 h-12 text-green-600 mx-auto mb-4" />
                    <CardTitle>Lessons Completed</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      <span className="text-3xl font-bold text-green-600">
                        {stats.completedCourses}
                      </span>
                    </CardDescription>
                    <p className="text-sm text-muted-foreground mt-2">
                      Keep learning!
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center hover:shadow-lg transition-shadow rounded-sm">
                  <CardHeader>
                    <TrendingUp className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                    <CardTitle>Average Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      <span className="text-3xl font-bold text-purple-600">
                        {stats.totalProgress}%
                      </span>
                    </CardDescription>
                    <p className="text-sm text-muted-foreground mt-2">
                      Overall completion
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Quick Actions */}
            <div className="mt-12 grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full rounded-sm"
                onClick={() => router.push("/courses/enrolled")}
              >
                <BookOpen className="w-5 h-5 mr-2" />
                View My Courses
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full rounded-sm"
                onClick={() => router.push("/courses/discover")}
              >
                <Clock className="w-5 h-5 mr-2" />
                Discover New Courses
              </Button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Original content for unauthenticated users
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-secondary to-muted py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-foreground mb-6">
            Welcome to <span className="text-accent">ShriArya LMS</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            A modern learning management system designed to transform education
            with interactive courses, real-time collaboration, and personalized
            learning experiences.
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90"
              onClick={() => router.push("/auth?tab=signup")}
            >
              Get Started
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-accent text-accent hover:bg-accent hover:text-white"
              onClick={() => router.push("/auth?tab=signin")}
            >
              Sign In
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Why Choose ShriArya LMS?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <BookOpen className="w-12 h-12 text-accent mx-auto mb-4" />
                <CardTitle>Rich Content</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Access comprehensive course materials, videos, and interactive
                  content
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Collaborative Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Connect with peers and instructors through discussion forums
                  and live sessions
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Award className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Progress Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Monitor your learning progress with detailed analytics and
                  achievements
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Clock className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                <CardTitle>Flexible Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Learn at your own pace with 24/7 access to course materials
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-4xl font-bold text-accent mb-2">100+</h3>
              <p className="text-muted-foreground">Courses Available</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-green-600 mb-2">10K+</h3>
              <p className="text-muted-foreground">Active Students</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-purple-600 mb-2">50+</h3>
              <p className="text-muted-foreground">Expert Instructors</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-accent-foreground mb-6">
            Ready to Start Learning?
          </h2>
          <p className="text-xl text-accent-foreground/80 mb-8">
            Join thousands of learners who are already transforming their skills
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              onClick={() => router.push("/auth?tab=signup")}
            >
              Get Started
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-black hover:bg-white hover:text-accent"
              onClick={() => router.push("/courses/discover")}
            >
              Browse Courses
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
