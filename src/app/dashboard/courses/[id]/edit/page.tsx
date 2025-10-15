"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Plus, Save, Eye, Settings, FileText, Layers } from "lucide-react";
import { Button } from "@/app/components-demo/ui/ui-components/button";
import { Input } from "@/app/components-demo/ui/ui-components/input";
import { Textarea } from "@/app/components-demo/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components-demo/ui/ui-components/card";
import { Badge } from "@/app/components-demo/ui/ui-components/badge";
import { Switch } from "@/app/components-demo/ui/switch";
import { Label } from "@/app/components-demo/ui/ui-components/label";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase/client";
import { Course, Lesson } from "@/lib/courses";

// Unused interface removed

export default function CourseBuilder({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { user } = useAuth();
  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "details" | "lessons" | "content" | "preview"
  >("details");
  const [error, setError] = useState<string | null>(null);
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(
    null
  );

  const supabase = createClient();

  // Resolve params
  useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  const loadCourse = useCallback(async () => {
    if (!resolvedParams) return;

    try {
      setIsLoading(true);
      setError(null);

      // Load course details
      const { data: courseData, error: courseError } = await supabase
        .from("courses")
        .select("*")
        .eq("id", resolvedParams.id)
        .single();

      if (courseError) throw courseError;
      setCourse(courseData);

      // Load lessons
      const { data: lessonsData, error: lessonsError } = await supabase
        .from("courses_lessons")
        .select("*")
        .eq("course_id", resolvedParams.id)
        .order("lesson_order");

      if (lessonsError) throw lessonsError;
      setLessons(lessonsData || []);
    } catch (err) {
      console.error("Error loading course:", err);
      setError("Failed to load course");
    } finally {
      setIsLoading(false);
    }
  }, [resolvedParams, supabase]);

  useEffect(() => {
    if (!resolvedParams) return;
    loadCourse();
  }, [resolvedParams, loadCourse]);

  const createNewCourse = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch("/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to create course");
      }

      const { course: newCourse } = await response.json();

      // Redirect to the course builder
      router.push(`/dashboard/courses/${newCourse.id}/edit`);
    } catch (err) {
      console.error("Error creating course:", err);
      setError("Failed to create course");
    } finally {
      setIsLoading(false);
    }
  };

  const saveCourse = async () => {
    if (!course) return;

    try {
      setIsSaving(true);
      setError(null);

      const { error } = await supabase
        .from("courses")
        .update({
          title: course.title,
          description: course.description,
          price: course.price,
          slug: course.slug,
        })
        .eq("id", course.id);

      if (error) throw error;

      // Show success message
      alert("Course saved successfully!");
    } catch (err) {
      console.error("Error saving course:", err);
      setError("Failed to save course");
    } finally {
      setIsSaving(false);
    }
  };

  const publishCourse = async () => {
    if (!course) return;

    try {
      setIsSaving(true);
      setError(null);

      const { error } = await supabase
        .from("courses")
        .update({ status: "published" })
        .eq("id", course.id);

      if (error) throw error;

      setCourse({ ...course, status: "published" });
      alert("Course published successfully!");
    } catch (err) {
      console.error("Error publishing course:", err);
      setError("Failed to publish course");
    } finally {
      setIsSaving(false);
    }
  };

  const updateLesson = async (lessonId: string, updates: Partial<Lesson>) => {
    try {
      const { error } = await supabase
        .from("courses_lessons")
        .update(updates)
        .eq("id", lessonId);

      if (error) throw error;

      // Update local state
      setLessons((prev) =>
        prev.map((lesson) =>
          lesson.id === lessonId ? { ...lesson, ...updates } : lesson
        )
      );
    } catch (err) {
      console.error("Error updating lesson:", err);
      setError("Failed to update lesson");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">
            Please log in to access the course builder
          </p>
          <Button onClick={() => router.push("/auth")}>Sign In</Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e27447] mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading course builder...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  // If no courseId, show course creation
  if (!resolvedParams?.id) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-[#1e293b] mb-6">
              Create New Course
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Start building your course with our easy-to-use course builder.
            </p>
            <Button
              onClick={createNewCourse}
              disabled={isLoading}
              size="lg"
              className="bg-[#e27447] hover:bg-[#e27447]/90"
            >
              <Plus className="w-5 h-5 mr-2" />
              {isLoading ? "Creating..." : "Create Course"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#1e293b] mb-2">
              Edit Course
            </h1>
            <p className="text-muted-foreground">
              {course?.status === "draft" ? "Draft" : "Published"} •{" "}
              {lessons.length} lessons
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button onClick={saveCourse} disabled={isSaving} variant="outline">
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? "Saving..." : "Save"}
            </Button>
            {course?.status === "draft" && (
              <Button
                onClick={publishCourse}
                disabled={isSaving}
                className="bg-[#e27447] hover:bg-[#e27447]/90"
              >
                <Eye className="w-4 h-4 mr-2" />
                Publish Course
              </Button>
            )}
            {course?.status === "published" && (
              <Badge className="bg-green-500 text-white">Published</Badge>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-[#feefea] mb-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab("details")}
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "details"
                  ? "border-[#e27447] text-[#e27447]"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Settings className="w-4 h-4 inline mr-2" />
              Course Details
            </button>
            <button
              onClick={() => setActiveTab("lessons")}
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "lessons"
                  ? "border-[#e27447] text-[#e27447]"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <FileText className="w-4 h-4 inline mr-2" />
              Lessons ({lessons.length})
            </button>
            <button
              onClick={() => setActiveTab("content")}
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "content"
                  ? "border-[#e27447] text-[#e27447]"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Layers className="w-4 h-4 inline mr-2" />
              Content
            </button>
            <button
              onClick={() => setActiveTab("preview")}
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "preview"
                  ? "border-[#e27447] text-[#e27447]"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Eye className="w-4 h-4 inline mr-2" />
              Preview
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === "details" && (
              <Card className="border-[#feefea]">
                <CardHeader>
                  <CardTitle>Course Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="title">Course Title</Label>
                    <Input
                      id="title"
                      value={course?.title || ""}
                      onChange={(e) =>
                        setCourse((prev) =>
                          prev ? { ...prev, title: e.target.value } : null
                        )
                      }
                      placeholder="Enter course title"
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={course?.description || ""}
                      onChange={(e) =>
                        setCourse((prev) =>
                          prev ? { ...prev, description: e.target.value } : null
                        )
                      }
                      placeholder="Describe your course"
                      rows={4}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="slug">Course URL Slug</Label>
                    <Input
                      id="slug"
                      value={course?.slug || ""}
                      onChange={(e) =>
                        setCourse((prev) =>
                          prev ? { ...prev, slug: e.target.value } : null
                        )
                      }
                      placeholder="course-url-slug"
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="price">Price (₹)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={course?.price || 0}
                      onChange={(e) =>
                        setCourse((prev) =>
                          prev
                            ? {
                                ...prev,
                                price: parseFloat(e.target.value) || 0,
                              }
                            : null
                        )
                      }
                      placeholder="0"
                      className="mt-2"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "lessons" && (
              <div className="space-y-4">
                {lessons.map((lesson) => (
                  <Card key={lesson.id} className="border-[#feefea]">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        <div className="flex-1">
                          <Input
                            value={lesson.title}
                            onChange={(e) =>
                              updateLesson(lesson.id, { title: e.target.value })
                            }
                            className="font-medium mb-2"
                            placeholder="Lesson title"
                          />
                          <Textarea
                            value={lesson.content || ""}
                            onChange={(e) =>
                              updateLesson(lesson.id, {
                                content: e.target.value,
                              })
                            }
                            placeholder="Lesson content"
                            rows={3}
                            className="text-sm"
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={lesson.is_preview}
                            onCheckedChange={(checked) =>
                              updateLesson(lesson.id, { is_preview: checked })
                            }
                          />
                          <Label className="text-sm">Preview</Label>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {activeTab === "content" && (
              <div className="space-y-6">
                <Card className="border-[#feefea]">
                  <CardHeader>
                    <CardTitle>Content Management</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Select a lesson to manage its content sections
                    </p>
                  </CardHeader>
                  <CardContent>
                    {lessons.length === 0 ? (
                      <div className="text-center py-8">
                        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">
                          No lessons yet
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          Create lessons first to add content sections
                        </p>
                        <Button onClick={() => setActiveTab("lessons")}>
                          Go to Lessons
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {lessons.map((lesson) => (
                          <div
                            key={lesson.id}
                            className="border rounded-lg p-4"
                          >
                            <h3 className="font-medium mb-4">{lesson.title}</h3>
                            <div className="text-sm text-muted-foreground">
                              Content editor will be available soon
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "preview" && (
              <Card className="border-[#feefea]">
                <CardHeader>
                  <CardTitle>Course Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold">{course?.title}</h2>
                    <p className="text-muted-foreground">
                      {course?.description}
                    </p>

                    <div className="flex items-center space-x-4">
                      <Badge
                        className={
                          (course?.price || 0) === 0 ? "bg-green-500" : "bg-[#e27447]"
                        }
                      >
                        {(course?.price || 0) === 0 ? "Free" : `₹${course?.price}`}
                      </Badge>
                      <Badge variant="outline">{lessons.length} lessons</Badge>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-semibold">Lessons:</h3>
                      {lessons.map((lesson, index) => (
                        <div
                          key={lesson.id}
                          className="flex items-center space-x-2 p-2 bg-gray-50 rounded-sm"
                        >
                          <span className="text-sm text-muted-foreground">
                            {index + 1}.
                          </span>
                          <span className="text-sm">{lesson.title}</span>
                          {lesson.is_preview && (
                            <Badge variant="outline" className="text-xs">
                              Preview
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-[#feefea]">
              <CardHeader>
                <CardTitle>Course Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Badge
                    className={
                      course?.status === "published"
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    }
                  >
                    {course?.status === "published" ? "Published" : "Draft"}
                  </Badge>
                </div>

                <div className="text-sm text-muted-foreground">
                  <p>• {lessons.length} lessons created</p>
                  <p>
                    • {lessons.filter((l) => l.is_preview).length} preview
                    lessons
                  </p>
                  <p>
                    • Last saved:{" "}
                    {course?.updated_at
                      ? new Date(course.updated_at).toLocaleDateString()
                      : "Never"}
                  </p>
                </div>

                <div className="pt-4 border-t">
                  <Button
                    onClick={() => router.push(`/courses/${course?.slug}`)}
                    variant="outline"
                    className="w-full"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Course
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
