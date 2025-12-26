"use client";

// Removed unused imports
import { Button } from "@/design-system/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/design-system/components/ui/card";
import {
  BookOpen,
  Award,
  Clock,
  ArrowRight,
  TrendingUp,
  Users,
  GraduationCap,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  // Use auth context
  const authContext = useAuth();
  const user = authContext?.user;
  const profile = authContext?.profile;
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
        <section className="relative bg-gradient-to-br from-white via-green-50 to-emerald-50 py-20 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>

          <div className="container mx-auto px-4 text-center relative z-10">
            {/* Subtle Logo */}
            <div className="mb-6 flex justify-center">
              <Image
                src="/images/preppeo logo package/logo_color_wo_bg.png"
                alt="Preppeo"
                width={600}
                height={180}
                className="w-auto h-36 object-contain opacity-90"
              />
            </div>

            <h1 className="text-5xl font-bold text-foreground mb-6">
              Welcome back,{" "}
              {profile?.first_name || profile?.full_name || "Student"}!
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Continue your learning journey with personalized courses and
              progress tracking.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white shadow-lg"
                onClick={() => router.push("/courses/enrolled")}
              >
                My Courses
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white"
                onClick={() => router.push("/courses/discover")}
              >
                Browse Courses
              </Button>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Your Learning Progress
              </h2>
              <p className="text-lg text-muted-foreground">
                Track your journey to success
              </p>
            </div>
            {stats.loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading your stats...</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="text-center ">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <BookOpen className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-lg">Enrolled Courses</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      <span className="text-5xl font-bold text-primary">
                        {stats.enrolledCourses}
                      </span>
                    </CardDescription>
                    <p className="text-sm text-muted-foreground mt-2">
                      Active enrollments
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center ">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Award className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-lg">Lessons Completed</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      <span className="text-5xl font-bold text-amber-600">
                        {stats.completedCourses}
                      </span>
                    </CardDescription>
                    <p className="text-sm text-muted-foreground mt-2">
                      Keep learning!
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center ">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <TrendingUp className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-lg">Average Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      <span className="text-5xl font-bold text-blue-600">
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
                className="w-full rounded-sm border-2 border-primary text-primary hover:bg-primary hover:text-white"
                onClick={() => router.push("/courses/enrolled")}
              >
                <BookOpen className="w-5 h-5 mr-2" />
                View My Courses
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full rounded-sm border-2 border-primary text-primary hover:bg-primary hover:text-white"
                onClick={() => router.push("/courses/discover")}
              >
                <Clock className="w-5 h-5 mr-2" />
                Discover New Courses
              </Button>
            </div>
          </div>
        </section>

        {/* Board Cards Section */}
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Explore by Board
              </h2>
              <p className="text-lg text-muted-foreground">
                Choose your curriculum and start learning today
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                {
                  name: "CBSE",
                  color: "bg-blue-500",
                  gradient: "from-blue-500 to-blue-600",
                },
                {
                  name: "ICSE",
                  color: "bg-primary",
                  gradient: "from-primary to-emerald-600",
                },
                {
                  name: "IBDP",
                  color: "bg-purple-500",
                  gradient: "from-purple-500 to-purple-600",
                },
                {
                  name: "IGCSE",
                  color: "bg-orange-500",
                  gradient: "from-orange-500 to-orange-600",
                },
                {
                  name: "GMAT",
                  color: "bg-red-500",
                  gradient: "from-red-500 to-red-600",
                },
                {
                  name: "SAT",
                  color: "bg-indigo-500",
                  gradient: "from-indigo-500 to-indigo-600",
                },
              ].map((board) => (
                <Card
                  key={board.name}
                  className="cursor-pointer "
                  onClick={() =>
                    router.push(`/courses/discover?curriculum=${board.name}`)
                  }
                >
                  <CardContent className="p-6 text-center relative">
                    <div
                      className={`w-14 h-14 bg-gradient-to-br ${board.gradient} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform`}
                    >
                      <GraduationCap className="w-7 h-7 text-white" />
                    </div>
                    <h3 
                      className="font-bold text-foreground text-lg"
                      style={board.name === "IGCSE" ? { fontFamily: "var(--font-lato)" } : undefined}
                    >
                      {board.name}
                    </h3>
                  </CardContent>
                </Card>
              ))}
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
      <section className="relative bg-gradient-to-br from-white via-green-50 to-emerald-50 py-24 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          {/* Logo */}
          <div className="mb-8 flex justify-center animate-fade-in">
            <div className="relative group">
              <Image
                src="/images/preppeo logo package/logo_color_wo_bg.png"
                alt="Preppeo Logo"
                width={1200}
                height={360}
                priority
                className="w-auto h-72 md:h-96 object-contain drop-shadow-2xl"
              />
            </div>
          </div>

          <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full">
            <span className="text-primary font-semibold text-sm">
              🎓 Transform Your Learning Journey
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Welcome to Your Learning Platform
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            A modern learning management system designed to transform education
            with interactive courses, real-time collaboration, and personalized
            learning experiences.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white shadow-lg "
              onClick={() => router.push("/courses/discover")}
            >
              Browse Courses
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-6 text-lg transition-all"
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
            Why Choose Preppeo LMS?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <BookOpen className="w-12 h-12 text-primary mx-auto mb-4" />
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
                <Users className="w-12 h-12 text-accent mx-auto mb-4" />
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
                <Award className="w-12 h-12 text-primary mx-auto mb-4" />
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
                <Clock className="w-12 h-12 text-accent mx-auto mb-4" />
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

      {/* Board Cards Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Explore by Board
            </h2>
            <p className="text-lg text-muted-foreground">
              Choose your curriculum and start learning today
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              {
                name: "CBSE",
                color: "bg-blue-500",
                gradient: "from-blue-500 to-blue-600",
              },
              {
                name: "ICSE",
                color: "bg-primary",
                gradient: "from-primary to-emerald-600",
              },
              {
                name: "IBDP",
                color: "bg-purple-500",
                gradient: "from-purple-500 to-purple-600",
              },
              {
                name: "IGCSE",
                color: "bg-orange-500",
                gradient: "from-orange-500 to-orange-600",
              },
              {
                name: "GMAT",
                color: "bg-red-500",
                gradient: "from-red-500 to-red-600",
              },
              {
                name: "SAT",
                color: "bg-indigo-500",
                gradient: "from-indigo-500 to-indigo-600",
              },
            ].map((board) => (
              <Card
                key={board.name}
                className="cursor-pointer "
                onClick={() =>
                  router.push(`/courses/discover?curriculum=${board.name}`)
                }
              >
                <CardContent className="p-6 text-center relative">
                  <div
                    className={`w-14 h-14 bg-gradient-to-br ${board.gradient} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform`}
                  >
                    <GraduationCap className="w-7 h-7 text-white" />
                  </div>
                  <h3 
                    className="font-bold text-foreground text-lg"
                    style={board.name === "IGCSE" ? { fontFamily: "var(--font-lato)" } : undefined}
                  >
                    {board.name}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-primary overflow-hidden">
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute top-0 left-0 w-full bottom-8"
            style={{
              backgroundImage:
                "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Learning?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Join thousands of learners who are already transforming their skills
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white hover:bg-gray-100 text-primary shadow-xl px-8 py-6 text-lg font-semibold"
              onClick={() => router.push("/auth?tab=signup")}
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              className="bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-6 text-lg"
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
