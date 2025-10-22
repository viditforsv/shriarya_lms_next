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
} from "@/app/components-demo/ui/ui-components/card";
import { Button } from "@/app/components-demo/ui/ui-components/button";
import { Input } from "@/app/components-demo/ui/ui-components/input";
import { Textarea } from "@/app/components-demo/ui/textarea";
import { Badge } from "@/app/components-demo/ui/ui-components/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components-demo/ui/tabs";
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  Edit,
  Lightbulb,
  Calculator,
  FileText,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface Lesson {
  id: string;
  title: string;
  slug: string;
  lesson_order: number;
  topic_number?: string;
  lesson_code?: string;
  conceptual_focus?: string;
  lesson_description?: string;
  skill_emphasis?: string;
  assessment_context?: string;
  difficulty_level?: number;
  learning_outcome?: string;
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

interface LessonContent {
  id: string;
  lesson_id: string;
  content_type: "concepts" | "formulas";
  title: string;
  content: string;
  content_html: string;
  metadata: any;
  order_index: number;
  is_active: boolean;
}

export default function AdminLessonContentEditorPage({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  const router = useRouter();
  const { user, profile } = useAuth();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [lessonContent, setLessonContent] = useState<{
    concepts: LessonContent[];
    formulas: LessonContent[];
  }>({ concepts: [], formulas: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resolvedParams, setResolvedParams] = useState<{
    lessonId: string;
  } | null>(null);

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

      // Load lesson details
      const lessonResponse = await fetch(`/api/lessons/${lessonId}`);
      if (!lessonResponse.ok) {
        throw new Error("Failed to load lesson");
      }
      const lessonData = await lessonResponse.json();
      setLesson(lessonData.lesson);

      // Load lesson content
      const contentResponse = await fetch(
        `/api/lesson-content?lesson_id=${lessonId}`
      );
      if (contentResponse.ok) {
        const contentData = await contentResponse.json();
        setLessonContent(contentData.content);
      }
    } catch (error) {
      console.error("Error loading lesson data:", error);
      setError("Failed to load lesson data");
    } finally {
      setIsLoading(false);
    }
  };

  const saveContent = async (
    content: LessonContent,
    isNew: boolean = false
  ) => {
    try {
      setIsSaving(true);

      const url = "/api/lesson-content";
      const method = isNew ? "POST" : "PUT";
      const body = isNew
        ? {
            lesson_id: resolvedParams?.lessonId,
            content_type: content.content_type,
            title: content.title,
            content: content.content,
            content_html: content.content_html,
            metadata: content.metadata,
            order_index: content.order_index,
          }
        : {
            id: content.id,
            title: content.title,
            content: content.content,
            content_html: content.content_html,
            metadata: content.metadata,
            order_index: content.order_index,
            is_active: content.is_active,
          };

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${isNew ? "create" : "update"} content`);
      }

      // Reload lesson content
      await loadLessonData(resolvedParams?.lessonId || "");
    } catch (error) {
      console.error("Error saving content:", error);
      setError(`Failed to ${isNew ? "create" : "update"} content`);
    } finally {
      setIsSaving(false);
    }
  };

  const deleteContent = async (contentId: string) => {
    try {
      const response = await fetch(`/api/lesson-content?id=${contentId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete content");
      }

      // Reload lesson content
      await loadLessonData(resolvedParams?.lessonId || "");
    } catch (error) {
      console.error("Error deleting content:", error);
      setError("Failed to delete content");
    }
  };

  const addNewContent = (type: "concepts" | "formulas") => {
    const newContent: LessonContent = {
      id: "",
      lesson_id: resolvedParams?.lessonId || "",
      content_type: type,
      title: "",
      content: "",
      content_html: "",
      metadata: type === "concepts" ? { keyPoints: [] } : { description: "" },
      order_index: lessonContent[type].length,
      is_active: true,
    };

    setLessonContent((prev) => ({
      ...prev,
      [type]: [...prev[type], newContent],
    }));
  };

  const updateContent = (
    type: "concepts" | "formulas",
    index: number,
    field: keyof LessonContent,
    value: any
  ) => {
    setLessonContent((prev) => ({
      ...prev,
      [type]: prev[type].map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
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

  if (error || !lesson) {
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

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Link href="/admin/lesson-editor">
            <Button variant="outline" size="sm" className="rounded-sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Lessons
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Edit Lesson Content</h1>
            <p className="text-muted-foreground">
              Manage concepts and formulas for this lesson
            </p>
          </div>
        </div>

        {/* Lesson Info */}
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
            </div>
            <CardTitle className="text-xl">{lesson.title}</CardTitle>
            <CardDescription>
              {lesson.chapter?.unit?.unit_name} → {lesson.chapter?.chapter_name}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Content Editor */}
      <Tabs defaultValue="concepts" className="w-full">
        <TabsList className="grid w-full grid-cols-2 rounded-sm bg-gray-100 p-1 shadow-sm border border-gray-200">
          <TabsTrigger
            value="concepts"
            className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white data-[state=active]:shadow-sm font-medium transition-all duration-200 hover:bg-gray-200 data-[state=inactive]:text-gray-600"
          >
            <Lightbulb className="w-4 h-4 mr-2" />
            Concepts
          </TabsTrigger>
          <TabsTrigger
            value="formulas"
            className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white data-[state=active]:shadow-sm font-medium transition-all duration-200 hover:bg-gray-200 data-[state=inactive]:text-gray-600"
          >
            <Calculator className="w-4 h-4 mr-2" />
            Formulas
          </TabsTrigger>
        </TabsList>

        {/* Concepts Tab */}
        <TabsContent value="concepts" className="mt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Concepts</h2>
              <Button
                onClick={() => addNewContent("concepts")}
                size="sm"
                className="rounded-sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Concept
              </Button>
            </div>

            {lessonContent.concepts.map((concept, index) => (
              <Card key={index} className="rounded-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      Concept {index + 1}
                    </CardTitle>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => saveContent(concept, !concept.id)}
                        disabled={isSaving}
                        size="sm"
                        className="rounded-sm"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        {concept.id ? "Update" : "Save"}
                      </Button>
                      {concept.id && (
                        <Button
                          onClick={() => deleteContent(concept.id)}
                          variant="destructive"
                          size="sm"
                          className="rounded-sm"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Title
                    </label>
                    <Input
                      value={concept.title}
                      onChange={(e) =>
                        updateContent(
                          "concepts",
                          index,
                          "title",
                          e.target.value
                        )
                      }
                      placeholder="Concept title..."
                      className="rounded-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Content (Raw Text)
                    </label>
                    <Textarea
                      value={concept.content}
                      onChange={(e) =>
                        updateContent(
                          "concepts",
                          index,
                          "content",
                          e.target.value
                        )
                      }
                      placeholder="Enter concept description..."
                      rows={4}
                      className="rounded-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Content (HTML)
                    </label>
                    <Textarea
                      value={concept.content_html}
                      onChange={(e) =>
                        updateContent(
                          "concepts",
                          index,
                          "content_html",
                          e.target.value
                        )
                      }
                      placeholder="Enter HTML content (optional)..."
                      rows={4}
                      className="rounded-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Key Points (JSON)
                    </label>
                    <Textarea
                      value={JSON.stringify(
                        concept.metadata?.keyPoints || [],
                        null,
                        2
                      )}
                      onChange={(e) => {
                        try {
                          const keyPoints = JSON.parse(e.target.value);
                          updateContent("concepts", index, "metadata", {
                            ...concept.metadata,
                            keyPoints,
                          });
                        } catch (error) {
                          // Invalid JSON, don't update
                        }
                      }}
                      placeholder='["Key point 1", "Key point 2", ...]'
                      rows={3}
                      className="rounded-sm font-mono text-sm"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Formulas Tab */}
        <TabsContent value="formulas" className="mt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Formulas</h2>
              <Button
                onClick={() => addNewContent("formulas")}
                size="sm"
                className="rounded-sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Formula
              </Button>
            </div>

            {lessonContent.formulas.map((formula, index) => (
              <Card key={index} className="rounded-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      Formula {index + 1}
                    </CardTitle>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => saveContent(formula, !formula.id)}
                        disabled={isSaving}
                        size="sm"
                        className="rounded-sm"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        {formula.id ? "Update" : "Save"}
                      </Button>
                      {formula.id && (
                        <Button
                          onClick={() => deleteContent(formula.id)}
                          variant="destructive"
                          size="sm"
                          className="rounded-sm"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Title
                    </label>
                    <Input
                      value={formula.title}
                      onChange={(e) =>
                        updateContent(
                          "formulas",
                          index,
                          "title",
                          e.target.value
                        )
                      }
                      placeholder="Formula title..."
                      className="rounded-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Formula (Raw Text)
                    </label>
                    <Textarea
                      value={formula.content}
                      onChange={(e) =>
                        updateContent(
                          "formulas",
                          index,
                          "content",
                          e.target.value
                        )
                      }
                      placeholder="Enter formula (LaTeX supported)..."
                      rows={3}
                      className="rounded-sm font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Formula (HTML)
                    </label>
                    <Textarea
                      value={formula.content_html}
                      onChange={(e) =>
                        updateContent(
                          "formulas",
                          index,
                          "content_html",
                          e.target.value
                        )
                      }
                      placeholder="Enter HTML formula (optional)..."
                      rows={3}
                      className="rounded-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Description
                    </label>
                    <Input
                      value={formula.metadata?.description || ""}
                      onChange={(e) =>
                        updateContent("formulas", index, "metadata", {
                          ...formula.metadata,
                          description: e.target.value,
                        })
                      }
                      placeholder="Formula description..."
                      className="rounded-sm"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
