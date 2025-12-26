"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/design-system/components/ui/card";
import { Button } from "@/design-system/components/ui/button";
import { Input } from "@/design-system/components/ui/input";
import { Textarea } from "@/design-system/components/textarea";
import { Badge } from "@/design-system/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/design-system/components/tabs";
import {
  ArrowLeft,
  Save,
  FileText,
  Video,
  Lightbulb,
  Calculator,
  BookOpen,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface Lesson {
  id: string;
  title: string;
  slug: string;
  lesson_order: number;
  is_preview: boolean;
  content?: string;
  quiz_id?: string;
  video_url?: string;
  pdf_url?: string;
  solution_url?: string;
  video_thumbnail_url?: string;
  topic_badge?: string;
  topic_number?: string;
  concept_title?: string;
  concept_content?: string;
  formula_title?: string;
  formula_content?: string;
  chapter?: {
    id: string;
    chapter_name: string;
    chapter_order: number;
    unit?: {
      id: string;
      unit_name: string;
      unit_order: number;
    };
  };
}

export default function AdminLessonEditorPage({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  const router = useRouter();
  const { profile } = useAuth();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resolvedParams, setResolvedParams] = useState<{
    lessonId: string;
  } | null>(null);
  const [activeTab, setActiveTab] = useState("basic");

  // Resolve params
  useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  // Check admin access
  useEffect(() => {
    if (profile && profile.role !== "admin") {
      router.push("/dashboard");
    }
  }, [profile, router]);

  // Load lesson data
  useEffect(() => {
    if (resolvedParams?.lessonId) {
      loadLessonData(resolvedParams.lessonId);
    }
  }, [resolvedParams]);

  const loadLessonData = async (lessonId: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const lessonResponse = await fetch(`/api/lessons/${lessonId}`);
      if (!lessonResponse.ok) {
        throw new Error("Failed to load lesson");
      }
      const lessonData = await lessonResponse.json();
      setLesson(lessonData.lesson);
    } catch (error) {
      console.error("Error loading lesson data:", error);
      setError("Failed to load lesson data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!lesson || !resolvedParams?.lessonId) return;

    try {
      setIsSaving(true);
      setError(null);

      const response = await fetch(`/api/lessons/${resolvedParams.lessonId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: lesson.title,
          slug: lesson.slug,
          is_preview: lesson.is_preview,
          content: lesson.content,
          quiz_id: lesson.quiz_id || null,
          video_url: lesson.video_url || null,
          pdf_url: lesson.pdf_url || null,
          solution_url: lesson.solution_url || null,
          video_thumbnail_url: lesson.video_thumbnail_url || null,
          topic_badge: lesson.topic_badge || null,
          concept_title: lesson.concept_title || null,
          concept_content: lesson.concept_content || null,
          formula_title: lesson.formula_title || null,
          formula_content: lesson.formula_content || null,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save lesson");
      }

      const data = await response.json();
      setLesson(data.lesson);
      alert("Lesson saved successfully!");
    } catch (error) {
      console.error("Error saving lesson:", error);
      setError(
        error instanceof Error ? error.message : "Failed to save lesson"
      );
    } finally {
      setIsSaving(false);
    }
  };

  const updateField = (
    field: keyof Lesson,
    value: string | number | boolean
  ) => {
    setLesson((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  if (profile?.role !== "admin") {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-4">
            You need admin privileges to access this page.
          </p>
          <Link href="/dashboard">
            <Button>Go to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e27447] mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading lesson data...</p>
        </div>
      </div>
    );
  }

  if (error && !lesson) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p className="text-red-600 mb-4">{error || "Lesson not found"}</p>
          <Link href="/admin/lesson-editor">
            <Button>Back to Lesson Editor</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <Link href="/admin/lesson-editor">
              <Button variant="outline" size="sm" className="rounded-sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Lessons
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Edit Lesson</h1>
              <p className="text-muted-foreground">
                {lesson.chapter?.unit?.unit_name} →{" "}
                {lesson.chapter?.chapter_name}
              </p>
            </div>
          </div>
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="rounded-sm bg-[#e27447] hover:bg-[#d1653a]"
          >
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? "Saving..." : "Save Lesson"}
          </Button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-sm">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {/* Lesson Info Badge */}
        <Card className="rounded-sm mb-6">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="rounded-sm">
                Lesson {lesson.lesson_order}
              </Badge>
              {lesson.topic_number && (
                <Badge variant="outline" className="rounded-sm">
                  {lesson.topic_number}
                </Badge>
              )}
              {lesson.topic_badge && (
                <Badge variant="outline" className="rounded-sm">
                  {lesson.topic_badge}
                </Badge>
              )}
            </div>
            <CardTitle className="text-xl">{lesson.title}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Editor Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 rounded-lg bg-gray-100 p-1">
          <TabsTrigger
            value="basic"
            className="rounded-sm data-[state=active]:bg-primary data-[state=active]:text-white font-medium"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Basic Info
          </TabsTrigger>
          <TabsTrigger
            value="content"
            className="rounded-sm data-[state=active]:bg-primary data-[state=active]:text-white font-medium"
          >
            <FileText className="w-4 h-4 mr-2" />
            Content
          </TabsTrigger>
          <TabsTrigger
            value="media"
            className="rounded-sm data-[state=active]:bg-primary data-[state=active]:text-white font-medium"
          >
            <Video className="w-4 h-4 mr-2" />
            Media & Files
          </TabsTrigger>
          <TabsTrigger
            value="concepts"
            className="rounded-sm data-[state=active]:bg-primary data-[state=active]:text-white font-medium"
          >
            <Lightbulb className="w-4 h-4 mr-2" />
            Concepts & Formulas
          </TabsTrigger>
        </TabsList>

        {/* Basic Info Tab */}
        <TabsContent value="basic" className="mt-6">
          <Card className="rounded-sm">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Title *
                  </label>
                  <Input
                    value={lesson.title}
                    onChange={(e) => updateField("title", e.target.value)}
                    placeholder="Lesson title"
                    className="rounded-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Slug *
                  </label>
                  <Input
                    value={lesson.slug}
                    onChange={(e) => updateField("slug", e.target.value)}
                    placeholder="lesson-slug"
                    className="rounded-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Topic Badge
                  </label>
                  <Input
                    value={lesson.topic_badge || ""}
                    onChange={(e) => updateField("topic_badge", e.target.value)}
                    placeholder="e.g., Topic 1, Section A"
                    className="rounded-sm"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Displayed as badge with topic number
                  </p>
                </div>
                <div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={lesson.is_preview || false}
                      onChange={(e) =>
                        updateField("is_preview", e.target.checked)
                      }
                      className="rounded-sm"
                    />
                    <span className="text-sm font-medium">Is Preview</span>
                  </label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Allow preview access for non-enrolled users
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Quiz ID
                </label>
                <Input
                  value={lesson.quiz_id || ""}
                  onChange={(e) => updateField("quiz_id", e.target.value)}
                  placeholder="UUID of quiz"
                  className="rounded-sm"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Content Tab */}
        <TabsContent value="content" className="mt-6">
          <Card className="rounded-sm">
            <CardHeader>
              <CardTitle>Lesson Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Content (LaTeX/Text)
                </label>
                <Textarea
                  value={lesson.content || ""}
                  onChange={(e) => updateField("content", e.target.value)}
                  placeholder="Enter lesson notes with LaTeX support (use $ for inline math, $$ for display math)"
                  rows={8}
                  className="rounded-sm"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  LaTeX math: use $ for inline math (e.g., $x^2$) and $$ for
                  display math (e.g., $$\\int_0^1 x dx$$)
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Media & Files Tab */}
        <TabsContent value="media" className="mt-6">
          <Card className="rounded-sm">
            <CardHeader>
              <CardTitle>Media & Files</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Video URL
                </label>
                <Input
                  value={lesson.video_url || ""}
                  onChange={(e) => updateField("video_url", e.target.value)}
                  placeholder="https://youtube.com/watch?v=..."
                  className="rounded-sm"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  YouTube, Vimeo, or direct video URL
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Video Thumbnail URL
                </label>
                <Input
                  value={lesson.video_thumbnail_url || ""}
                  onChange={(e) =>
                    updateField("video_thumbnail_url", e.target.value)
                  }
                  placeholder="https://example.com/thumbnail.jpg"
                  className="rounded-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  PDF URL (Assignment)
                </label>
                <Input
                  value={lesson.pdf_url || ""}
                  onChange={(e) => updateField("pdf_url", e.target.value)}
                  placeholder="https://example.com/assignment.pdf"
                  className="rounded-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Solution URL
                </label>
                <Input
                  value={lesson.solution_url || ""}
                  onChange={(e) => updateField("solution_url", e.target.value)}
                  placeholder="https://example.com/solution.pdf"
                  className="rounded-sm"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Concepts & Formulas Tab */}
        <TabsContent value="concepts" className="mt-6">
          <div className="space-y-6">
            {/* Concept Section */}
            <Card className="rounded-sm">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-[#e27447]" />
                  <CardTitle>Concept</CardTitle>
                </div>
                <CardDescription>
                  Main concept covered in this lesson
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Concept Title
                  </label>
                  <Input
                    value={lesson.concept_title || ""}
                    onChange={(e) =>
                      updateField("concept_title", e.target.value)
                    }
                    placeholder="e.g., Introduction to Algebra"
                    className="rounded-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Concept Content
                  </label>
                  <Textarea
                    value={lesson.concept_content || ""}
                    onChange={(e) =>
                      updateField("concept_content", e.target.value)
                    }
                    placeholder="Concept explanation (HTML or text supported)"
                    rows={6}
                    className="rounded-sm"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    HTML or plain text. If empty, concept section won&apos;t
                    appear.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Formula Section */}
            <Card className="rounded-sm">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-[#e27447]" />
                  <CardTitle>Formula</CardTitle>
                </div>
                <CardDescription>
                  Main formula taught in this lesson
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Formula Title
                  </label>
                  <Input
                    value={lesson.formula_title || ""}
                    onChange={(e) =>
                      updateField("formula_title", e.target.value)
                    }
                    placeholder="e.g., Quadratic Formula"
                    className="rounded-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Formula Content
                  </label>
                  <Textarea
                    value={lesson.formula_content || ""}
                    onChange={(e) =>
                      updateField("formula_content", e.target.value)
                    }
                    placeholder="Formula content (LaTeX, HTML, or text supported)"
                    rows={6}
                    className="rounded-sm font-mono"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    LaTeX, HTML, or plain text. If empty, formula section
                    won&apos;t appear.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
