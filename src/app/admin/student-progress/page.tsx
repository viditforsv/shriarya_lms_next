"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { AdminOnly } from "@/app/components-demo/ui/form-components/RoleGuard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components-demo/ui/ui-components/card";
import { Button } from "@/app/components-demo/ui/ui-components/button";
import { Badge } from "@/app/components-demo/ui/ui-components/badge";
import { Breadcrumb } from "@/app/components-demo/ui/breadcrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components-demo/ui/select";
import {
  Users,
  TrendingUp,
  Clock,
  Target,
  Award,
  AlertCircle,
  CheckCircle,
  BookOpen,
  BarChart3,
} from "lucide-react";
import Link from "next/link";

interface ClassAnalytics {
  overview: {
    totalStudents: number;
    totalAttempts: number;
    classAccuracy: number;
    avgTimeSeconds: number;
  };
  studentRankings: Array<{
    studentId: string;
    totalAttempts: number;
    accuracy: number;
    avgTimeSeconds: number;
    avgMasteryScore: number;
    redTags: number;
    yellowTags: number;
    greenTags: number;
  }>;
  tagInsights: Array<{
    tagName: string;
    totalAttempts: number;
    accuracy: number;
    avgTimeSeconds: number;
    studentsAttempted: number;
    redCount: number;
    yellowCount: number;
    greenCount: number;
    difficultyLevel: string;
  }>;
  strugglingTags: Array<{
    tagName: string;
    redCount: number;
    accuracy: number;
  }>;
  masterTags: Array<{
    tagName: string;
    greenCount: number;
    accuracy: number;
  }>;
  masteryDistribution: {
    totalTags: number;
    redTags: number;
    yellowTags: number;
    greenTags: number;
  };
}

interface StudentProfile {
  id: string;
  full_name: string;
  email: string;
}

export default function StudentProgressDashboard() {
  const { profile } = useAuth();
  const [analytics, setAnalytics] = useState<ClassAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [courses, setCourses] = useState<Array<{ id: string; title: string }>>(
    []
  );
  const [studentProfiles, setStudentProfiles] = useState<
    Map<string, StudentProfile>
  >(new Map());
  const [selectedView, setSelectedView] = useState<
    "overview" | "students" | "tags"
  >("overview");

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      fetchAnalytics();
    }
  }, [selectedCourse]);

  const fetchCourses = async () => {
    try {
      const response = await fetch("/api/courses");
      if (response.ok) {
        const data = await response.json();
        setCourses(data.courses || []);
        if (data.courses && data.courses.length > 0) {
          setSelectedCourse(data.courses[0].id);
        }
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const url = selectedCourse
        ? `/api/student-progress/class-analytics?courseId=${selectedCourse}`
        : `/api/student-progress/class-analytics`;

      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setAnalytics(data.classAnalytics);

        // Fetch student profiles
        if (data.classAnalytics?.studentRankings) {
          await fetchStudentProfiles(
            data.classAnalytics.studentRankings.map((s: any) => s.studentId)
          );
        }
      }
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudentProfiles = async (studentIds: string[]) => {
    try {
      const profilesMap = new Map<string, StudentProfile>();

      // Fetch in batches
      for (const studentId of studentIds.slice(0, 50)) {
        const response = await fetch(`/api/user-profiles?userId=${studentId}`);
        if (response.ok) {
          const data = await response.json();
          if (data.profile) {
            profilesMap.set(studentId, data.profile);
          }
        }
      }

      setStudentProfiles(profilesMap);
    } catch (error) {
      console.error("Error fetching student profiles:", error);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  };

  const getMasteryColor = (level: string) => {
    switch (level) {
      case "red":
        return "bg-red-100 text-red-800 border-red-200";
      case "yellow":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "green":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (loading && !analytics) {
    return (
      <AdminOnly>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading analytics...</p>
          </div>
        </div>
      </AdminOnly>
    );
  }

  return (
    <AdminOnly>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumbs */}
          <div className="mb-6">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Admin", href: "/admin/site-administration" },
                { label: "Student Progress", isActive: true },
              ]}
            />
          </div>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Student Progress Dashboard
                </h1>
                <p className="text-muted-foreground mt-2">
                  Monitor student performance, tag mastery, and class insights
                </p>
              </div>
              <Badge variant="secondary" className="text-sm">
                Admin Dashboard
              </Badge>
            </div>

            <div className="flex gap-4 items-center">
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger className="w-[300px] rounded-sm">
                  <SelectValue placeholder="Select a course" />
                </SelectTrigger>
                <SelectContent className="rounded-sm">
                  {courses.map((course) => (
                    <SelectItem
                      key={course.id}
                      value={course.id}
                      className="rounded-sm"
                    >
                      {course.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex gap-2">
                <Button
                  variant={selectedView === "overview" ? "primary" : "outline"}
                  onClick={() => setSelectedView("overview")}
                  className="rounded-sm"
                >
                  Overview
                </Button>
                <Button
                  variant={selectedView === "students" ? "primary" : "outline"}
                  onClick={() => setSelectedView("students")}
                  className="rounded-sm"
                >
                  Students
                </Button>
                <Button
                  variant={selectedView === "tags" ? "primary" : "outline"}
                  onClick={() => setSelectedView("tags")}
                  className="rounded-sm"
                >
                  Tag Insights
                </Button>
              </div>
            </div>
          </div>

          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="rounded-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Total Students
                    </p>
                    <p className="text-3xl font-bold mt-1">
                      {analytics?.overview.totalStudents || 0}
                    </p>
                  </div>
                  <Users className="w-10 h-10 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Total Attempts
                    </p>
                    <p className="text-3xl font-bold mt-1">
                      {analytics?.overview.totalAttempts.toLocaleString() || 0}
                    </p>
                  </div>
                  <BookOpen className="w-10 h-10 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Class Accuracy
                    </p>
                    <p className="text-3xl font-bold mt-1">
                      {analytics?.overview.classAccuracy.toFixed(1)}%
                    </p>
                  </div>
                  <Target className="w-10 h-10 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Time</p>
                    <p className="text-3xl font-bold mt-1">
                      {formatTime(analytics?.overview.avgTimeSeconds || 0)}
                    </p>
                  </div>
                  <Clock className="w-10 h-10 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Mastery Distribution */}
          {selectedView === "overview" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <Card className="rounded-sm border-2 border-red-200 bg-red-50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                      Red Tags (Struggling)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-4xl font-bold text-red-600">
                      {analytics?.masteryDistribution.redTags || 0}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Tags with &lt;60% accuracy
                    </p>
                  </CardContent>
                </Card>

                <Card className="rounded-sm border-2 border-yellow-200 bg-yellow-50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <TrendingUp className="w-5 h-5 text-yellow-600" />
                      Yellow Tags (Developing)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-4xl font-bold text-yellow-600">
                      {analytics?.masteryDistribution.yellowTags || 0}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Tags with 60-85% accuracy
                    </p>
                  </CardContent>
                </Card>

                <Card className="rounded-sm border-2 border-green-200 bg-green-50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      Green Tags (Mastered)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-4xl font-bold text-green-600">
                      {analytics?.masteryDistribution.greenTags || 0}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Tags with &gt;85% accuracy
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Struggling vs Master Tags */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card className="rounded-sm">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                      Top Struggling Tags
                    </CardTitle>
                    <CardDescription>
                      Tags where most students are struggling (Red mastery)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analytics?.strugglingTags.slice(0, 10).map((tag) => (
                        <div
                          key={tag.tagName}
                          className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-sm"
                        >
                          <div className="flex-1">
                            <p className="font-medium text-sm">{tag.tagName}</p>
                            <p className="text-xs text-muted-foreground">
                              {tag.redCount} students struggling
                            </p>
                          </div>
                          <Badge variant="destructive" className="rounded-sm">
                            {tag.accuracy.toFixed(1)}%
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="rounded-sm">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Award className="w-5 h-5 text-green-600" />
                      Top Mastered Tags
                    </CardTitle>
                    <CardDescription>
                      Tags where most students have achieved mastery (Green)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analytics?.masterTags.slice(0, 10).map((tag) => (
                        <div
                          key={tag.tagName}
                          className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-sm"
                        >
                          <div className="flex-1">
                            <p className="font-medium text-sm">{tag.tagName}</p>
                            <p className="text-xs text-muted-foreground">
                              {tag.greenCount} students mastered
                            </p>
                          </div>
                          <Badge className="bg-green-600 rounded-sm">
                            {tag.accuracy.toFixed(1)}%
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}

          {/* Student Rankings */}
          {selectedView === "students" && (
            <Card className="rounded-sm">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Users className="w-5 h-5 text-orange-600" />
                  Student Performance Rankings
                </CardTitle>
                <CardDescription>
                  Ranked by average mastery score across all tags
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analytics?.studentRankings.map((student, index) => {
                    const studentProfile = studentProfiles.get(
                      student.studentId
                    );
                    return (
                      <div
                        key={student.studentId}
                        className="flex items-center gap-4 p-4 bg-secondary/50 border rounded-sm hover:bg-secondary transition-colors"
                      >
                        <div className="w-8 text-center font-bold text-muted-foreground">
                          #{index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">
                            {studentProfile?.full_name ||
                              student.studentId.slice(0, 8)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {student.totalAttempts} attempts ·{" "}
                            {student.accuracy.toFixed(1)}% accuracy ·{" "}
                            {formatTime(student.avgTimeSeconds)} avg
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Badge className="bg-red-600 rounded-sm">
                            {student.redTags} R
                          </Badge>
                          <Badge className="bg-yellow-600 rounded-sm">
                            {student.yellowTags} Y
                          </Badge>
                          <Badge className="bg-green-600 rounded-sm">
                            {student.greenTags} G
                          </Badge>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-orange-600">
                            {student.avgMasteryScore}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Mastery
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tag Insights */}
          {selectedView === "tags" && (
            <Card className="rounded-sm">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-orange-600" />
                  Detailed Tag Analytics
                </CardTitle>
                <CardDescription>
                  Performance breakdown by tag across all students
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analytics?.tagInsights.map((tag) => (
                    <div
                      key={tag.tagName}
                      className="p-4 bg-secondary/50 border rounded-sm"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-medium">{tag.tagName}</h4>
                          <p className="text-sm text-muted-foreground">
                            {tag.studentsAttempted} students ·{" "}
                            {tag.totalAttempts} attempts ·{" "}
                            {formatTime(tag.avgTimeSeconds)} avg time
                          </p>
                        </div>
                        <Badge variant="outline" className="rounded-sm">
                          {tag.accuracy.toFixed(1)}% accuracy
                        </Badge>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
                          <span className="text-sm">{tag.redCount} Red</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 bg-yellow-500 rounded-sm"></div>
                          <span className="text-sm">
                            {tag.yellowCount} Yellow
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                          <span className="text-sm">
                            {tag.greenCount} Green
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AdminOnly>
  );
}
