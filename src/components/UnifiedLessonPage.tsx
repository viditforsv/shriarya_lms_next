"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/design-system/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/design-system/components/tabs";
import {
  BookOpen,
  FileText,
  Video,
  FileCheck,
  CheckCircle2,
  CheckCircle,
  Upload,
  ArrowLeft,
  ArrowRight,
  Lightbulb,
  Calculator,
  MessageCircle,
  Send,
  Edit,
  Save,
  X,
  Loader2,
  AlertCircle,
  Flag,
  Image as ImageIcon,
} from "lucide-react";
import { Input } from "@/design-system/components/ui/input";
import { Textarea } from "@/design-system/components/textarea";
import { Badge } from "@/design-system/components/ui/badge";
import { Button } from "@/design-system/components/ui/button";
import { VideoResource } from "@/design-system/components/youtube-video";
import { renderMixedContent } from "@/components/MathRenderer";
import { Switch } from "@/design-system/components/switch";
import { Label } from "@/design-system/components/ui/label";
import { IBDPQuestionSession } from "@/components/IBDPMathTemplate/IBDPQuestionSession";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/design-system/components/dialog";
import { QuizPlayer } from "@/components/QuizPlayer";
import { useScreenshotPrevention } from "@/hooks/useScreenshotPrevention";

interface LessonContent {
  id: string;
  content_type: "concepts" | "formulas";
  title: string;
  content: string;
  order_index: number;
}

interface Lesson {
  id: string;
  title: string;
  slug: string;
  description?: string;
  topic_number?: string;
  lesson_order?: number;
  is_preview?: boolean;
  video_url?: string;
  video_thumbnail_url?: string;
  topic_badge?: string;
  pdf_url?: string;
  solution_url?: string;
  quiz_id?: string;
  content?: string;
  concept_title?: string;
  concept_content?: string;
  formula_title?: string;
  formula_content?: string;
  course_lesson_content?: LessonContent[];
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

interface UnifiedLessonPageProps {
  lesson: Lesson;
  courseSlug: string;
  showTopicNumber?: boolean;
  onMarkComplete?: () => void;
  onFileUpload?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isCompleted?: boolean;
  isMarkingComplete?: boolean;
  uploadedFile?: File | null;
  submissionStatus?: "idle" | "uploading" | "success" | "error";
  submissionError?: string;
  allLessons?: Lesson[];
  onNavigateLesson?: (direction: "prev" | "next") => void;
  isAdmin?: boolean;
  onLessonUpdate?: (updatedLesson: Partial<Lesson>) => void;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export function UnifiedLessonPage({
  lesson,
  courseSlug,
  showTopicNumber = true,
  onMarkComplete,
  onFileUpload,
  isCompleted = false,
  isMarkingComplete = false,
  uploadedFile = null,
  submissionStatus = "idle",
  submissionError = "",
  allLessons = [],
  onNavigateLesson,
  isAdmin = false,
  onLessonUpdate,
}: UnifiedLessonPageProps) {
  const [lessonContent, setLessonContent] = useState<LessonContent[]>([]);
  const [loadingContent, setLoadingContent] = useState(true);
  const [activeTab, setActiveTab] = useState<string>("");
  const [questions, setQuestions] = useState<
    Array<{
      id: string;
      question_text: string;
      tags: string[];
      marks: number;
      solution?: string;
      difficulty?: number;
    }>
  >([]);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: `Hello! I'm your AI tutor. I'm here to help you with "${lesson.title}". Ask me questions about this lesson or request practice problems!`,
      timestamp: new Date(),
    },
  ]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isAITyping, setIsAITyping] = useState(false);
  const [isAssignmentTabActive, setIsAssignmentTabActive] = useState(false);

  // Screenshot prevention for PDF viewer
  const pdfContainerRef = useScreenshotPrevention(!!lesson.pdf_url && isAssignmentTabActive);

  // Inline editing state for admins
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Record<string, unknown>>({});
  const [saving, setSaving] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackType, setFeedbackType] = useState<
    "mistake" | "suggestion" | null
  >(null);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [submittingFeedback, setSubmittingFeedback] = useState(false);
  const [feedbackImage, setFeedbackImage] = useState<File | null>(null);
  const [feedbackImagePreview, setFeedbackImagePreview] = useState<
    string | null
  >(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchLessonContent = async () => {
      try {
        setLoadingContent(true);
        const response = await fetch(`/api/lessons/${lesson.id}/content`);
        if (response.ok) {
          const data = await response.json();
          setLessonContent(data.content || []);
        }
      } catch (error) {
        console.error("Error fetching lesson content:", error);
      } finally {
        setLoadingContent(false);
      }
    };

    if (lesson.id) {
      fetchLessonContent();
    }
  }, [lesson.id]);

  // Fetch questions for the lesson
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoadingQuestions(true);
        const response = await fetch(`/api/lessons/${lesson.id}/questions`);
        if (response.ok) {
          const data = await response.json();
          setQuestions(data.questions || []);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoadingQuestions(false);
      }
    };

    if (lesson.id) {
      fetchQuestions();
    }
  }, [lesson.id]);

  // Save lesson field changes (admin only)
  const handleSaveField = async (field: string) => {
    if (!isAdmin || !lesson?.id) return;

    setSaving(true);
    try {
      const updateData: Record<string, unknown> = {
        [field]: editValues[field],
      };

      const response = await fetch(`/api/lessons/${lesson.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update lesson");
      }

      const { lesson: updatedLesson } = await response.json();

      // Call update callback if provided
      if (onLessonUpdate) {
        onLessonUpdate(updatedLesson);
      }

      // Reset editing state
      setEditingField(null);
      setEditValues({});

      // Reload page to reflect changes
      window.location.reload();
    } catch (err) {
      console.error("Error saving field:", err);
      alert(
        err instanceof Error
          ? err.message
          : "Failed to save changes. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  // Start editing a field
  const handleStartEdit = (field: string) => {
    if (!isAdmin || !lesson) return;

    setEditingField(field);
    const currentValue = lesson[field as keyof Lesson];
    setEditValues({
      [field]: currentValue || "",
    });
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingField(null);
    setEditValues({});
  };

  // Helper function to extract YouTube video ID (improved regex)
  const extractYouTubeId = (url: string): string | null => {
    if (!url) return null;

    // More comprehensive YouTube URL patterns
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([^#&?]{11})/,
      /^([a-zA-Z0-9_-]{11})$/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1] && match[1].length === 11) {
        return match[1];
      }
    }

    return null;
  };

  // Determine which tabs to show based on available content
  const hasConcepts = lessonContent.some((c) => c.content_type === "concepts");
  const hasFormulas = lessonContent.some((c) => c.content_type === "formulas");
  const hasVideo = !!lesson.video_url;
  const hasPDFAssignment = !!lesson.pdf_url;
  const hasPDFSolution = !!lesson.solution_url;
  const hasQuiz = !!lesson.quiz_id;
  const hasQuestions = questions.length > 0;

  // Debug logging
  useEffect(() => {
    console.log("UnifiedLessonPage - Lesson data:", {
      id: lesson.id,
      title: lesson.title,
      quiz_id: lesson.quiz_id,
      hasQuiz,
    });
  }, [lesson, hasQuiz]);
  // Check for notes - can be in content, concept, or formula fields
  const hasNotes = !!(
    lesson.content ||
    lesson.concept_title ||
    lesson.concept_content ||
    lesson.formula_title ||
    lesson.formula_content
  );

  // Build tabs array dynamically
  interface TabItem {
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }
  const availableTabs: TabItem[] = useMemo(() => {
    const tabs: TabItem[] = [];
    // Questions tab - prioritize it as first tab if available
    if (hasQuestions) {
      tabs.push({
        id: "questions",
        label: "Questions",
        icon: FileCheck,
      });
    }
    if (hasConcepts || hasFormulas) {
      tabs.push({
        id: "content",
        label: "Concepts & Formulas",
        icon: BookOpen,
      });
    }
    if (hasVideo) {
      tabs.push({ id: "video", label: "Video", icon: Video });
    }
    if (hasNotes) {
      tabs.push({ id: "notes", label: "Concepts", icon: FileText });
    }
    if (hasPDFAssignment) {
      tabs.push({
        id: "assignment",
        label: "Assignment",
        icon: FileText,
      });
    }
    if (hasPDFSolution) {
      tabs.push({
        id: "solution",
        label: "Solution",
        icon: CheckCircle2,
      });
    }
    if (hasQuiz) {
      tabs.push({ id: "quiz", label: "Quiz", icon: FileCheck });
    }
    return tabs;
  }, [hasQuestions, hasConcepts, hasFormulas, hasVideo, hasNotes, hasPDFAssignment, hasPDFSolution, hasQuiz]);

  const defaultTab = availableTabs[0]?.id || "content";

  // Debug logging for tabs
  useEffect(() => {
    console.log(
      "UnifiedLessonPage - Available tabs:",
      availableTabs.map((t) => t.id)
    );
    console.log("UnifiedLessonPage - Default tab:", defaultTab);
  }, [availableTabs, defaultTab]);

  // Initialize PDF tab states based on current tab
  useEffect(() => {
    const currentTab = activeTab || defaultTab;
    setIsAssignmentTabActive(currentTab === "assignment");
  }, [activeTab, defaultTab]);

  // Set default tab on mount
  useEffect(() => {
    if (!activeTab && availableTabs.length > 0) {
      setActiveTab(defaultTab);
    }
  }, [activeTab, availableTabs.length, defaultTab]);

  const getNextLesson = () => {
    if (!lesson || !allLessons.length || !onNavigateLesson) return;
    const currentIndex = allLessons.findIndex((l) => l.slug === lesson.slug);
    if (currentIndex < allLessons.length - 1) {
      onNavigateLesson("next");
    }
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      role: "user",
      content: currentMessage,
      timestamp: new Date(),
    };

    setChatMessages((prev) => [...prev, userMessage]);
    const messageText = currentMessage;
    setCurrentMessage("");
    setIsAITyping(true);

    // Simulate AI response (replace with actual API call later)
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        role: "assistant",
        content: `I understand you're asking about "${messageText}". This is related to ${lesson.title}. Here's a helpful explanation... [AI response would go here. This is a placeholder - integrate with your AI service when ready.]`,
        timestamp: new Date(),
      };
      setChatMessages((prev) => [...prev, aiMessage]);
      setIsAITyping(false);
    }, 1500);
  };

  const getPreviousLesson = () => {
    if (!lesson || !allLessons.length || !onNavigateLesson) return;
    const currentIndex = allLessons.findIndex((l) => l.slug === lesson.slug);
    if (currentIndex > 0) {
      onNavigateLesson("prev");
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      alert("Image size must be less than 10MB");
      return;
    }

    setFeedbackImage(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setFeedbackImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setFeedbackImage(null);
    setFeedbackImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmitFeedback = async () => {
    if (!feedbackType || !feedbackMessage.trim()) return;

    setSubmittingFeedback(true);
    let imageUrl: string | null = null;

    try {
      // Upload image if selected
      if (feedbackImage) {
        setUploadingImage(true);
        const formData = new FormData();
        formData.append("file", feedbackImage);
        formData.append("type", "feedback-image");
        formData.append("title", `Feedback Image - ${feedbackImage.name}`);

        const authToken = localStorage.getItem("supabase.auth.token");
        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: formData,
          headers: authToken
            ? {
                Authorization: `Bearer ${authToken}`,
              }
            : {},
        });

        if (uploadResponse.ok) {
          const uploadData = await uploadResponse.json();
          if (uploadData.success && uploadData.url) {
            imageUrl = uploadData.url;
          }
        } else {
          const errorData = await uploadResponse.json();
          throw new Error(errorData.error || "Image upload failed");
        }
        setUploadingImage(false);
      }

      // Submit feedback to API
      const response = await fetch("/api/lesson-feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lesson_id: lesson.id,
          lesson_slug: lesson.slug,
          course_slug: courseSlug,
          feedback_type: feedbackType,
          message: feedbackMessage,
          image_url: imageUrl,
        }),
      });

      if (response.ok) {
        // Reset form and close modal
        setFeedbackMessage("");
        setFeedbackType(null);
        setFeedbackImage(null);
        setFeedbackImagePreview(null);
        setShowFeedbackModal(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        alert("Thank you for your feedback! We'll review it soon.");
      } else {
        const data = await response.json();
        alert(`Error: ${data.error || "Failed to submit feedback"}`);
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert(
        `Failed to submit feedback: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setSubmittingFeedback(false);
      setUploadingImage(false);
    }
  };

  return (
    <div>
      {/* Lesson Header - Clean and elegant like IBDP */}
      <div className="mb-4 md:mb-6">
        {editingField === "title" ? (
          <div className="flex items-center gap-2 mb-2">
            <input
              type="text"
              value={(editValues.title as string) || ""}
              onChange={(e) =>
                setEditValues({ ...editValues, title: e.target.value })
              }
              className="text-2xl md:text-3xl font-bold text-[#1e293b] border-2 border-[#e27447] rounded-sm px-3 py-2 flex-1"
              autoFocus
            />
            <Button
              size="sm"
              onClick={() => handleSaveField("title")}
              disabled={saving}
              className="rounded-sm bg-green-600 hover:bg-green-700"
            >
              {saving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
            </Button>
            <Button
              size="sm"
              onClick={handleCancelEdit}
              disabled={saving}
              variant="outline"
              className="rounded-sm"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-2xl md:text-3xl font-bold text-[#1e293b]">
                {lesson.title}
              </h1>
              {isAdmin && (
                <button
                  onClick={() => handleStartEdit("title")}
                  className="p-2 hover:bg-gray-100 rounded-sm transition-colors border border-gray-300 bg-white shadow-sm"
                  title="Edit title"
                >
                  <Edit className="w-4 h-4 text-[#e27447]" />
                </button>
              )}
            </div>
            {/* Unit → Chapter Mapping */}
            {lesson.chapter?.unit?.unit_name &&
              lesson.chapter?.chapter_name && (
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground">
                    {lesson.chapter.unit.unit_name} →{" "}
                    {lesson.chapter.chapter_name}
                  </p>
                </div>
              )}
          </>
        )}
        {editingField === "topic_badge" ? (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={(editValues.topic_badge as string) || ""}
              onChange={(e) =>
                setEditValues({ ...editValues, topic_badge: e.target.value })
              }
              className="text-muted-foreground border-2 border-[#e27447] rounded-sm px-3 py-2 flex-1 max-w-xs"
              placeholder={`Topic ${lesson.topic_number || ""}`}
              autoFocus
            />
            <Button
              size="sm"
              onClick={() => handleSaveField("topic_badge")}
              disabled={saving}
              className="rounded-sm bg-green-600 hover:bg-green-700"
            >
              {saving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
            </Button>
            <Button
              size="sm"
              onClick={handleCancelEdit}
              disabled={saving}
              variant="outline"
              className="rounded-sm"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          showTopicNumber &&
          lesson.topic_number && (
            <div className="flex items-center gap-2">
              <p className="text-muted-foreground">
                {lesson.topic_badge || `Topic ${lesson.topic_number}`}
              </p>
              {isAdmin && (
                <button
                  onClick={() => handleStartEdit("topic_badge")}
                  className="p-1 hover:bg-gray-100 rounded-sm transition-colors border border-gray-300 bg-white shadow-sm"
                  title="Edit topic badge"
                >
                  <Edit className="w-3 h-3 text-[#e27447]" />
                </button>
              )}
            </div>
          )
        )}
      </div>

      {/* Dynamic Lesson Tabs */}
      {availableTabs.length > 0 ? (
        <Tabs
          value={activeTab || defaultTab}
          onValueChange={(value) => {
            setActiveTab(value);
            // Force PDF iframes to reload when tab becomes active
            setIsAssignmentTabActive(value === "assignment");
          }}
          className="w-full"
        >
          <TabsList
            className={`grid w-full rounded-sm bg-gray-100 p-1 shadow-sm border border-gray-200 overflow-x-auto ${
              availableTabs.length === 1
                ? "grid-cols-1"
                : availableTabs.length === 2
                ? "grid-cols-2"
                : availableTabs.length === 3
                ? "grid-cols-3"
                : availableTabs.length === 4
                ? "grid-cols-2 md:grid-cols-4"
                : availableTabs.length === 5
                ? "grid-cols-3 md:grid-cols-5"
                : availableTabs.length === 6
                ? "grid-cols-3 md:grid-cols-6"
                : "grid-cols-3 md:grid-cols-7"
            }`}
          >
            {availableTabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="rounded-sm data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-sm font-medium transition-all duration-200 text-xs md:text-sm"
              >
                <tab.icon className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Questions Tab */}
          {hasQuestions && (
            <TabsContent value="questions" className="mt-6 space-y-4">
              {loadingQuestions ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e27447] mx-auto mb-4"></div>
                    <p className="text-muted-foreground">
                      Loading questions...
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <IBDPQuestionSession
                  questions={questions}
                  onSessionComplete={(results) => {
                    console.log("Question session completed:", results);
                    // Calculate progress based on results
                    const correctAnswers = results.filter(
                      (r) => r.result === "correct"
                    ).length;
                    const progress =
                      questions.length > 0
                        ? (correctAnswers / questions.length) * 100
                        : 0;

                    // Optionally update lesson progress here
                    if (onMarkComplete && progress >= 80) {
                      // Auto-mark as complete if 80%+ correct
                      // onMarkComplete(); // Uncomment if desired
                    }
                  }}
                />
              )}
            </TabsContent>
          )}

          {/* Concepts & Formulas Tab */}
          {(hasConcepts || hasFormulas) && (
            <TabsContent value="content" className="mt-6 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Concepts & Formulas</CardTitle>
                </CardHeader>
                <CardContent>
                  {loadingContent ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#e27447] mx-auto"></div>
                    </div>
                  ) : lessonContent.length > 0 ? (
                    <div className="space-y-6">
                      {lessonContent
                        .sort((a, b) => a.order_index - b.order_index)
                        .map((content) => (
                          <div
                            key={content.id}
                            className="border rounded-sm p-4"
                          >
                            <h3 className="font-semibold mb-2 flex items-center space-x-2">
                              <Badge variant="secondary" className="capitalize">
                                {content.content_type}
                              </Badge>
                              <span>{content.title}</span>
                            </h3>
                            <div
                              className="prose max-w-none"
                              dangerouslySetInnerHTML={{
                                __html: content.content || "",
                              }}
                            />
                          </div>
                        ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-8">
                      No content available yet.
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* PDF Assignment Tab */}
          {hasPDFAssignment && (
            <TabsContent value="assignment" className="mt-6 space-y-4">
              <Card className="rounded-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <FileText className="w-5 h-5 text-[#e27447]" />
                        <span>Assignment</span>
                      </CardTitle>
                      <CardDescription>
                        Complete this assignment to test your understanding
                      </CardDescription>
                    </div>
                    {isAdmin && (
                      <button
                        onClick={() => handleStartEdit("pdf_url")}
                        className="p-2 hover:bg-gray-100 rounded-sm transition-colors border border-gray-300 bg-white shadow-sm"
                        title="Edit PDF URL"
                      >
                        <Edit className="w-4 h-4 text-[#e27447]" />
                      </button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {editingField === "pdf_url" ? (
                    <div className="mb-6 space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Assignment PDF URL
                        </label>
                        <div className="flex gap-2">
                          <Input
                            type="url"
                            value={(editValues.pdf_url as string) || ""}
                            onChange={(e) =>
                              setEditValues({
                                ...editValues,
                                pdf_url: e.target.value,
                              })
                            }
                            placeholder="https://..."
                            className="flex-1"
                          />
                          <Button
                            size="sm"
                            onClick={() => handleSaveField("pdf_url")}
                            disabled={saving}
                            className="rounded-sm bg-green-600 hover:bg-green-700"
                          >
                            {saving ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Save className="w-4 h-4" />
                            )}
                          </Button>
                          <Button
                            size="sm"
                            onClick={handleCancelEdit}
                            disabled={saving}
                            variant="outline"
                            className="rounded-sm"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : lesson.pdf_url ? (
                    <div className="space-y-4">
                      {/* Assignment PDF Embedder - Full height like CBSE Class 9 */}
                      <div 
                        ref={pdfContainerRef}
                        className="w-full h-[500px] md:h-[800px] border-2 border-[#feefea] rounded-sm overflow-hidden bg-gray-50"
                      >
                        {isAssignmentTabActive && (
                          <iframe
                            key={`assignment-${lesson.id}-${lesson.pdf_url}`}
                            src={lesson.pdf_url}
                            className="w-full h-full"
                            title={`${lesson.title} - Assignment`}
                            allow="autoplay; fullscreen"
                            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                          />
                        )}
                        {!isAssignmentTabActive && (
                          <div className="w-full h-full flex items-center justify-center">
                            <p className="text-muted-foreground">
                              Loading PDF...
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Submit Your Work Section */}
                      {(onFileUpload || onMarkComplete) && (
                        <div className="border-t pt-4 mt-4">
                          <h3 className="text-lg font-semibold mb-3">
                            Submit Your Work
                          </h3>
                          <div className="space-y-4">
                            {onFileUpload && (
                              <div>
                                <label
                                  htmlFor="assignment-file"
                                  className="block text-sm font-medium mb-2"
                                >
                                  Upload your completed assignment (PDF only,
                                  max 5MB)
                                </label>
                                <div className="flex items-center gap-3">
                                  <input
                                    id="assignment-file"
                                    type="file"
                                    accept=".pdf"
                                    onChange={onFileUpload}
                                    className="hidden"
                                    disabled={submissionStatus === "uploading"}
                                  />
                                  <label
                                    htmlFor="assignment-file"
                                    className="flex items-center gap-2 px-4 py-2 border rounded-sm cursor-pointer hover:bg-gray-50 transition-colors"
                                  >
                                    <Upload className="w-4 h-4" />
                                    Choose PDF File
                                  </label>
                                  {uploadedFile && (
                                    <span className="text-sm text-muted-foreground">
                                      Selected: {uploadedFile.name}
                                    </span>
                                  )}
                                </div>
                                {submissionError && (
                                  <p className="text-sm text-red-600 mt-2">
                                    {submissionError}
                                  </p>
                                )}
                                {submissionStatus === "success" && (
                                  <p className="text-sm text-green-600 mt-2">
                                    Assignment submitted successfully! Your
                                    teacher will review it.
                                  </p>
                                )}
                                {submissionStatus === "uploading" && (
                                  <p className="text-sm text-blue-600 mt-2">
                                    Uploading...
                                  </p>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Assignment Actions */}
                      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between mt-4 gap-3">
                        <Button
                          variant="outline"
                          className="rounded-sm w-full md:w-auto"
                          onClick={() => window.open(lesson.pdf_url, "_blank")}
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          Open in New Tab
                        </Button>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                          {hasPDFSolution && (
                            <Button
                              variant="outline"
                              className="rounded-sm w-full sm:w-auto"
                              onClick={() => {
                                setActiveTab("solution");
                                setIsAssignmentTabActive(false);
                              }}
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              View Solution
                            </Button>
                          )}
                          {onMarkComplete && (
                            <div className="flex items-center justify-between sm:justify-start space-x-3 p-3 sm:p-0 border sm:border-0 rounded-sm">
                              <Label
                                htmlFor="complete-toggle"
                                className="text-sm font-medium"
                              >
                                {isCompleted ? "Completed" : "Mark as Complete"}
                              </Label>
                              <div className="relative">
                                <Switch
                                  id="complete-toggle"
                                  checked={isCompleted}
                                  onCheckedChange={(checked) => {
                                    if (!isMarkingComplete && onMarkComplete) {
                                      // Only call if state is changing
                                      if (checked !== isCompleted) {
                                        onMarkComplete();
                                      }
                                    }
                                  }}
                                  disabled={isMarkingComplete}
                                  className="data-[state=checked]:bg-green-600"
                                />
                                {isMarkingComplete && (
                                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <Loader2 className="w-3 h-3 animate-spin text-white" />
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg mb-2">Assignment not available</p>
                      <p className="text-sm">
                        The assignment for this lesson will be available soon
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* PDF Solution Tab */}
          {hasPDFSolution && (
            <TabsContent value="solution" className="mt-6 space-y-4">
              <Card className="rounded-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span>Solution</span>
                      </CardTitle>
                      <CardDescription>
                        Check your answers with the complete solution
                      </CardDescription>
                    </div>
                    {isAdmin && (
                      <button
                        onClick={() => handleStartEdit("solution_url")}
                        className="p-2 hover:bg-gray-100 rounded-sm transition-colors border border-gray-300 bg-white shadow-sm"
                        title="Edit Solution URL"
                      >
                        <Edit className="w-4 h-4 text-[#e27447]" />
                      </button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {editingField === "solution_url" ? (
                    <div className="mb-6 space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Solution PDF URL
                        </label>
                        <div className="flex gap-2">
                          <Input
                            type="url"
                            value={(editValues.solution_url as string) || ""}
                            onChange={(e) =>
                              setEditValues({
                                ...editValues,
                                solution_url: e.target.value,
                              })
                            }
                            placeholder="https://..."
                            className="flex-1"
                          />
                          <Button
                            size="sm"
                            onClick={() => handleSaveField("solution_url")}
                            disabled={saving}
                            className="rounded-sm bg-green-600 hover:bg-green-700"
                          >
                            {saving ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Save className="w-4 h-4" />
                            )}
                          </Button>
                          <Button
                            size="sm"
                            onClick={handleCancelEdit}
                            disabled={saving}
                            variant="outline"
                            className="rounded-sm"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : lesson.solution_url ? (
                    <div className="space-y-4">
                      {/* Solution PDF Embedder - Full height like CBSE Class 9 */}
                      <div className="w-full h-[500px] md:h-[800px] border-2 border-green-100 rounded-sm overflow-hidden bg-gray-50">
                        <iframe
                          src={lesson.solution_url}
                          className="w-full h-full"
                          title={`${lesson.title} - Solution`}
                          allow="autoplay; fullscreen"
                          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                        />
                      </div>

                      {/* Solution Actions */}
                      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                        <Button
                          variant="outline"
                          className="rounded-sm w-full md:w-auto"
                          onClick={() =>
                            window.open(lesson.solution_url, "_blank")
                          }
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          Open in New Tab
                        </Button>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                          {hasPDFAssignment && (
                            <Button
                              variant="outline"
                              className="rounded-sm w-full sm:w-auto"
                              onClick={() => {
                                setActiveTab("assignment");
                                setIsAssignmentTabActive(true);
                              }}
                            >
                              <FileText className="w-4 h-4 mr-2" />
                              Back to Assignment
                            </Button>
                          )}
                          {onMarkComplete && (
                            <Button
                              className={`rounded-sm w-full sm:w-auto ${
                                isCompleted
                                  ? "bg-green-600 hover:bg-green-700"
                                  : "bg-[#e27447] hover:bg-[#e27447]/90"
                              }`}
                              onClick={onMarkComplete}
                              disabled={isMarkingComplete}
                            >
                              {isMarkingComplete ? (
                                <>
                                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                  Saving...
                                </>
                              ) : isCompleted ? (
                                <>
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Mark as Incomplete
                                </>
                              ) : (
                                <>
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Mark as Complete
                                </>
                              )}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <CheckCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg mb-2">Solution not available</p>
                      <p className="text-sm">
                        The solution for this lesson will be available soon
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* Video Tab */}
          {hasVideo && (
            <TabsContent value="video" className="mt-6 space-y-4">
              <Card className="rounded-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <Video className="w-5 h-5 text-[#e27447]" />
                        <span>Video Lesson</span>
                      </CardTitle>
                      <CardDescription>
                        Watch the complete lesson video with explanations and
                        examples
                      </CardDescription>
                    </div>
                    {isAdmin && (
                      <button
                        onClick={() => handleStartEdit("video_url")}
                        className="p-2 hover:bg-gray-100 rounded-sm transition-colors border border-gray-300 bg-white shadow-sm"
                        title="Edit video URL"
                      >
                        <Edit className="w-4 h-4 text-[#e27447]" />
                      </button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {editingField === "video_url" ? (
                    <div className="mb-6 space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Video URL
                        </label>
                        <div className="flex gap-2">
                          <Input
                            type="url"
                            value={(editValues.video_url as string) || ""}
                            onChange={(e) =>
                              setEditValues({
                                ...editValues,
                                video_url: e.target.value,
                              })
                            }
                            placeholder="https://www.youtube.com/watch?v=..."
                            className="flex-1"
                          />
                          <Button
                            size="sm"
                            onClick={() => handleSaveField("video_url")}
                            disabled={saving}
                            className="rounded-sm bg-green-600 hover:bg-green-700"
                          >
                            {saving ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Save className="w-4 h-4" />
                            )}
                          </Button>
                          <Button
                            size="sm"
                            onClick={handleCancelEdit}
                            disabled={saving}
                            variant="outline"
                            className="rounded-sm"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : lesson.video_url ? (
                    <div className="mb-6">
                      <VideoResource
                        resource={{
                          id: lesson.id,
                          type: "video",
                          url: lesson.video_url,
                          title: lesson.title,
                          description: lesson.description || "",
                          duration: 0,
                          isYouTube:
                            lesson.video_url.includes("youtube.com") ||
                            lesson.video_url.includes("youtu.be"),
                          youtubeId: lesson.video_url
                            ? extractYouTubeId(lesson.video_url) || undefined
                            : undefined,
                          thumbnail: lesson.video_thumbnail_url || undefined,
                        }}
                        lessonId={lesson.id}
                        courseSlug={courseSlug}
                        onProgressUpdate={(progress) => {
                          // Video progress can be tracked here if needed
                          console.log("Video progress:", progress);
                        }}
                      />
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-8">
                      Video not available.
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* Notes Tab with nested tabs for Concepts & Formulas */}
          {hasNotes && (
            <TabsContent value="notes" className="mt-6 space-y-4">
              {/* Context Breadcrumb */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <BookOpen className="w-4 h-4" />
                <span>{lesson.title}</span>
              </div>

              {/* Nested Tabs for Concepts, Formulas, Notes, AI Tutor */}
              {(() => {
                const hasConceptTab =
                  lesson.concept_title || lesson.concept_content;
                const hasFormulaTab =
                  lesson.formula_title || lesson.formula_content;
                const hasNotesTab = lesson.content;
                const hasAITutorTab = true; // Always available
                const nestedTabCount =
                  (hasConceptTab ? 1 : 0) +
                  (hasFormulaTab ? 1 : 0) +
                  (hasNotesTab ? 1 : 0) +
                  (hasAITutorTab ? 1 : 0);

                return (
                  <Tabs
                    defaultValue={
                      hasConceptTab
                        ? "concepts"
                        : hasFormulaTab
                        ? "formulas"
                        : hasNotesTab
                        ? "notes"
                        : "ai-tutor"
                    }
                    className="w-full"
                  >
                    <TabsList
                      className={`grid w-full rounded-sm bg-white p-1 shadow-sm border border-gray-200 gap-1 ${
                        nestedTabCount === 1
                          ? "grid-cols-1"
                          : nestedTabCount === 2
                          ? "grid-cols-2"
                          : nestedTabCount === 3
                          ? "grid-cols-3"
                          : nestedTabCount === 4
                          ? "grid-cols-2 md:grid-cols-4"
                          : "grid-cols-2 md:grid-cols-4"
                      }`}
                    >
                      {hasConceptTab && (
                        <TabsTrigger
                          value="concepts"
                          className="rounded-sm data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-sm font-medium transition-all duration-200 hover:bg-gray-100 data-[state=inactive]:text-gray-700 data-[state=inactive]:bg-gray-50 data-[state=inactive]:border data-[state=inactive]:border-gray-200 text-xs md:text-sm"
                        >
                          Concepts
                        </TabsTrigger>
                      )}
                      {hasFormulaTab && (
                        <TabsTrigger
                          value="formulas"
                          className="rounded-sm data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-sm font-medium transition-all duration-200 hover:bg-gray-100 data-[state=inactive]:text-gray-700 data-[state=inactive]:bg-gray-50 data-[state=inactive]:border data-[state=inactive]:border-gray-200 text-xs md:text-sm"
                        >
                          Formulas
                        </TabsTrigger>
                      )}
                      {hasNotesTab && (
                        <TabsTrigger
                          value="notes"
                          className="rounded-sm data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-sm font-medium transition-all duration-200 hover:bg-gray-100 data-[state=inactive]:text-gray-700 data-[state=inactive]:bg-gray-50 data-[state=inactive]:border data-[state=inactive]:border-gray-200 text-xs md:text-sm"
                        >
                          Notes
                        </TabsTrigger>
                      )}
                      {hasAITutorTab && (
                        <TabsTrigger
                          value="ai-tutor"
                          className="rounded-sm data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-sm font-medium transition-all duration-200 hover:bg-gray-100 data-[state=inactive]:text-gray-700 data-[state=inactive]:bg-gray-50 data-[state=inactive]:border data-[state=inactive]:border-gray-200 text-xs md:text-sm"
                        >
                          AI Tutor
                        </TabsTrigger>
                      )}
                    </TabsList>

                    {/* Concepts Sub-Tab */}
                    {(lesson.concept_title ||
                      lesson.concept_content ||
                      isAdmin) && (
                      <TabsContent value="concepts" className="space-y-4 mt-6">
                        <Card className="rounded-sm">
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <div>
                                {editingField === "concept_title" ? (
                                  <div className="flex items-center gap-2">
                                    <Lightbulb className="w-5 h-5 text-[#e27447]" />
                                    <Input
                                      type="text"
                                      value={
                                        (editValues.concept_title as string) ||
                                        ""
                                      }
                                      onChange={(e) =>
                                        setEditValues({
                                          ...editValues,
                                          concept_title: e.target.value,
                                        })
                                      }
                                      className="flex-1"
                                      placeholder="Concept title"
                                      autoFocus
                                    />
                                    <Button
                                      size="sm"
                                      onClick={() =>
                                        handleSaveField("concept_title")
                                      }
                                      disabled={saving}
                                      className="rounded-sm bg-green-600 hover:bg-green-700"
                                    >
                                      {saving ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                      ) : (
                                        <Save className="w-4 h-4" />
                                      )}
                                    </Button>
                                    <Button
                                      size="sm"
                                      onClick={handleCancelEdit}
                                      disabled={saving}
                                      variant="outline"
                                      className="rounded-sm"
                                    >
                                      <X className="w-4 h-4" />
                                    </Button>
                                  </div>
                                ) : (
                                  <CardTitle className="flex items-center gap-2">
                                    <Lightbulb className="w-5 h-5 text-[#e27447]" />
                                    {lesson.concept_title ||
                                      "Understanding Concepts"}
                                    {isAdmin && (
                                      <button
                                        onClick={() =>
                                          handleStartEdit("concept_title")
                                        }
                                        className="ml-2 p-1 hover:bg-gray-100 rounded-sm transition-colors border border-gray-300 bg-white shadow-sm"
                                        title="Edit concept title"
                                      >
                                        <Edit className="w-3 h-3 text-[#e27447]" />
                                      </button>
                                    )}
                                  </CardTitle>
                                )}
                                <CardDescription>
                                  Key concepts and principles for this lesson
                                </CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            {editingField === "concept_content" ? (
                              <div className="space-y-2">
                                <Textarea
                                  value={
                                    (editValues.concept_content as string) || ""
                                  }
                                  onChange={(e) =>
                                    setEditValues({
                                      ...editValues,
                                      concept_content: e.target.value,
                                    })
                                  }
                                  placeholder="Enter concept content (HTML or markdown supported)"
                                  className="min-h-[300px] font-mono text-sm"
                                  autoFocus
                                />
                                <div className="flex gap-2 justify-end">
                                  <Button
                                    size="sm"
                                    onClick={() =>
                                      handleSaveField("concept_content")
                                    }
                                    disabled={saving}
                                    className="rounded-sm bg-green-600 hover:bg-green-700"
                                  >
                                    {saving ? (
                                      <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                      <Save className="w-4 h-4" />
                                    )}
                                  </Button>
                                  <Button
                                    size="sm"
                                    onClick={handleCancelEdit}
                                    disabled={saving}
                                    variant="outline"
                                    className="rounded-sm"
                                  >
                                    <X className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            ) : lesson.concept_content ? (
                              <div className="relative group">
                                <div className="text-base leading-relaxed text-gray-700 prose prose-sm max-w-none">
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: lesson.concept_content,
                                    }}
                                  />
                                </div>
                                {isAdmin && (
                                  <button
                                    onClick={() =>
                                      handleStartEdit("concept_content")
                                    }
                                    className="absolute top-0 right-0 p-2 hover:bg-gray-100 rounded-sm transition-colors border border-gray-300 bg-white shadow-sm opacity-0 group-hover:opacity-100"
                                    title="Edit concept content"
                                  >
                                    <Edit className="w-4 h-4 text-[#e27447]" />
                                  </button>
                                )}
                              </div>
                            ) : (
                              <div className="text-center py-8 text-muted-foreground relative">
                                <Lightbulb className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                <p>Concept content will be available soon</p>
                                {isAdmin && (
                                  <Button
                                    size="sm"
                                    onClick={() =>
                                      handleStartEdit("concept_content")
                                    }
                                    className="mt-4 rounded-sm"
                                    variant="outline"
                                  >
                                    <Edit className="w-4 h-4 mr-2" />
                                    Add Content
                                  </Button>
                                )}
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </TabsContent>
                    )}

                    {/* Formulas Sub-Tab */}
                    {(lesson.formula_title ||
                      lesson.formula_content ||
                      isAdmin) && (
                      <TabsContent value="formulas" className="space-y-4 mt-6">
                        <Card className="rounded-sm">
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <div>
                                {editingField === "formula_title" ? (
                                  <div className="flex items-center gap-2">
                                    <Calculator className="w-5 h-5 text-[#e27447]" />
                                    <Input
                                      type="text"
                                      value={
                                        (editValues.formula_title as string) ||
                                        ""
                                      }
                                      onChange={(e) =>
                                        setEditValues({
                                          ...editValues,
                                          formula_title: e.target.value,
                                        })
                                      }
                                      className="flex-1"
                                      placeholder="Formula title"
                                      autoFocus
                                    />
                                    <Button
                                      size="sm"
                                      onClick={() =>
                                        handleSaveField("formula_title")
                                      }
                                      disabled={saving}
                                      className="rounded-sm bg-green-600 hover:bg-green-700"
                                    >
                                      {saving ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                      ) : (
                                        <Save className="w-4 h-4" />
                                      )}
                                    </Button>
                                    <Button
                                      size="sm"
                                      onClick={handleCancelEdit}
                                      disabled={saving}
                                      variant="outline"
                                      className="rounded-sm"
                                    >
                                      <X className="w-4 h-4" />
                                    </Button>
                                  </div>
                                ) : (
                                  <CardTitle className="flex items-center gap-2">
                                    <Calculator className="w-5 h-5 text-[#e27447]" />
                                    {lesson.formula_title || "Key Formulas"}
                                    {isAdmin && (
                                      <button
                                        onClick={() =>
                                          handleStartEdit("formula_title")
                                        }
                                        className="ml-2 p-1 hover:bg-gray-100 rounded-sm transition-colors border border-gray-300 bg-white shadow-sm"
                                        title="Edit formula title"
                                      >
                                        <Edit className="w-3 h-3 text-[#e27447]" />
                                      </button>
                                    )}
                                  </CardTitle>
                                )}
                                <CardDescription>
                                  Essential formulas for this lesson
                                </CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            {editingField === "formula_content" ? (
                              <div className="space-y-2">
                                <Textarea
                                  value={
                                    (editValues.formula_content as string) || ""
                                  }
                                  onChange={(e) =>
                                    setEditValues({
                                      ...editValues,
                                      formula_content: e.target.value,
                                    })
                                  }
                                  placeholder="Enter formula content (HTML or markdown supported)"
                                  className="min-h-[300px] font-mono text-sm"
                                  autoFocus
                                />
                                <div className="flex gap-2 justify-end">
                                  <Button
                                    size="sm"
                                    onClick={() =>
                                      handleSaveField("formula_content")
                                    }
                                    disabled={saving}
                                    className="rounded-sm bg-green-600 hover:bg-green-700"
                                  >
                                    {saving ? (
                                      <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                      <Save className="w-4 h-4" />
                                    )}
                                  </Button>
                                  <Button
                                    size="sm"
                                    onClick={handleCancelEdit}
                                    disabled={saving}
                                    variant="outline"
                                    className="rounded-sm"
                                  >
                                    <X className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            ) : lesson.formula_content ? (
                              <div className="relative group">
                                <div className="p-4 bg-gray-50 rounded-sm border border-gray-200">
                                  <div className="text-xl prose prose-sm max-w-none">
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html: lesson.formula_content,
                                      }}
                                    />
                                  </div>
                                </div>
                                {isAdmin && (
                                  <button
                                    onClick={() =>
                                      handleStartEdit("formula_content")
                                    }
                                    className="absolute top-2 right-2 p-2 hover:bg-gray-100 rounded-sm transition-colors border border-gray-300 bg-white shadow-sm opacity-0 group-hover:opacity-100"
                                    title="Edit formula content"
                                  >
                                    <Edit className="w-4 h-4 text-[#e27447]" />
                                  </button>
                                )}
                              </div>
                            ) : (
                              <div className="text-center py-8 text-muted-foreground relative">
                                <Calculator className="w-12 h-12 mx-auto mb-3 opacity-30" />
                                <p>
                                  No formulas available for this lesson yet.
                                </p>
                                {isAdmin && (
                                  <Button
                                    size="sm"
                                    onClick={() =>
                                      handleStartEdit("formula_content")
                                    }
                                    className="mt-4 rounded-sm"
                                    variant="outline"
                                  >
                                    <Edit className="w-4 h-4 mr-2" />
                                    Add Content
                                  </Button>
                                )}
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </TabsContent>
                    )}

                    {/* Notes Sub-Tab */}
                    {(lesson.content || isAdmin) && (
                      <TabsContent value="notes" className="space-y-4 mt-6">
                        <Card className="rounded-sm">
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <div>
                                <CardTitle className="flex items-center gap-2">
                                  <FileText className="w-5 h-5 text-[#e27447]" />
                                  Lesson Notes
                                </CardTitle>
                                <CardDescription>
                                  Comprehensive notes from this lesson
                                </CardDescription>
                              </div>
                              {!editingField && isAdmin && (
                                <button
                                  onClick={() => {
                                    setEditingField("content");
                                    setEditValues({
                                      content: lesson.content || "",
                                    });
                                  }}
                                  className="p-2 hover:bg-gray-100 rounded-sm transition-colors border border-gray-300 bg-white shadow-sm"
                                  title="Edit notes"
                                >
                                  <Edit className="w-4 h-4 text-[#e27447]" />
                                </button>
                              )}
                            </div>
                          </CardHeader>
                          <CardContent>
                            {editingField === "content" ? (
                              <div className="space-y-2">
                                <Textarea
                                  value={(editValues.content as string) || ""}
                                  onChange={(e) =>
                                    setEditValues({
                                      ...editValues,
                                      content: e.target.value,
                                    })
                                  }
                                  placeholder="Enter lesson notes (LaTeX supported: use $ for inline math, $$ for display math)"
                                  className="min-h-[400px] font-mono text-sm"
                                  autoFocus
                                />
                                <div className="flex gap-2 justify-end">
                                  <Button
                                    size="sm"
                                    onClick={() => handleSaveField("content")}
                                    disabled={saving}
                                    className="rounded-sm bg-green-600 hover:bg-green-700"
                                  >
                                    {saving ? (
                                      <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                      <Save className="w-4 h-4" />
                                    )}
                                  </Button>
                                  <Button
                                    size="sm"
                                    onClick={handleCancelEdit}
                                    disabled={saving}
                                    variant="outline"
                                    className="rounded-sm"
                                  >
                                    <X className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            ) : lesson.content ? (
                              <div className="prose prose-sm max-w-none leading-relaxed">
                                {renderMixedContent(lesson.content)}
                              </div>
                            ) : (
                              <div className="text-center py-8 text-muted-foreground relative">
                                <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
                                <p>No notes available for this lesson yet.</p>
                                {isAdmin && (
                                  <Button
                                    size="sm"
                                    onClick={() => {
                                      setEditingField("content");
                                      setEditValues({
                                        content: "",
                                      });
                                    }}
                                    className="mt-4 rounded-sm"
                                    variant="outline"
                                  >
                                    <Edit className="w-4 h-4 mr-2" />
                                    Add Notes
                                  </Button>
                                )}
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </TabsContent>
                    )}

                    {/* AI Tutor Sub-Tab */}
                    {hasAITutorTab && (
                      <TabsContent value="ai-tutor" className="space-y-4 mt-6">
                        <Card className="rounded-sm">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <MessageCircle className="w-5 h-5 text-[#e27447]" />
                              AI Tutor
                            </CardTitle>
                            <CardDescription>
                              Ask questions about {lesson.title} or request
                              practice problems
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            {/* Messages */}
                            <div className="h-96 overflow-y-auto space-y-3 p-4 bg-gray-50 rounded-sm border border-gray-200">
                              {chatMessages.map((message, index) => (
                                <div
                                  key={index}
                                  className={`flex ${
                                    message.role === "user"
                                      ? "justify-end"
                                      : "justify-start"
                                  }`}
                                >
                                  <div
                                    className={`max-w-[80%] p-3 rounded-sm ${
                                      message.role === "user"
                                        ? "bg-[#e27447] text-white"
                                        : "bg-white border border-gray-200 text-gray-800"
                                    }`}
                                  >
                                    <p className="text-sm leading-relaxed">
                                      {message.content}
                                    </p>
                                    <p
                                      className={`text-xs mt-1 ${
                                        message.role === "user"
                                          ? "text-white/70"
                                          : "text-gray-400"
                                      }`}
                                    >
                                      {message.timestamp.toLocaleTimeString()}
                                    </p>
                                  </div>
                                </div>
                              ))}
                              {isAITyping && (
                                <div className="flex justify-start">
                                  <div className="bg-white border border-gray-200 p-3 rounded-sm">
                                    <p className="text-sm text-gray-500">
                                      AI is typing...
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Input */}
                            <div className="flex gap-2">
                              <Input
                                placeholder="Ask a question about this lesson..."
                                value={currentMessage}
                                onChange={(e) =>
                                  setCurrentMessage(e.target.value)
                                }
                                onKeyPress={(e) =>
                                  e.key === "Enter" && handleSendMessage()
                                }
                                className="rounded-sm"
                              />
                              <Button
                                onClick={handleSendMessage}
                                disabled={!currentMessage.trim() || isAITyping}
                                className="rounded-sm bg-[#e27447] hover:bg-[#e27447]/90"
                              >
                                <Send className="w-4 h-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>
                    )}
                  </Tabs>
                );
              })()}
            </TabsContent>
          )}

          {/* Quiz Tab */}
          {hasQuiz && (
            <TabsContent value="quiz" className="mt-6 space-y-4">
              {lesson.quiz_id ? (
                <QuizPlayer quizId={lesson.quiz_id} />
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Quiz</CardTitle>
                    <CardDescription>
                      Test your understanding with this quiz
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-center py-8">
                      No quiz available for this lesson yet.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          )}
        </Tabs>
      ) : (
        <Card>
          <CardContent className="text-center py-8 text-muted-foreground">
            <p>No lesson content available yet.</p>
          </CardContent>
        </Card>
      )}

      {/* Feedback Section - Suggest Changes */}
      <div className="mt-6 md:mt-8 mb-6">
        <Card className="rounded-sm border-2 border-dashed border-gray-300 bg-gray-50/50">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-[#e27447]/10 rounded-sm flex-shrink-0">
                  <AlertCircle className="w-5 h-5 text-[#e27447]" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#1e293b] text-sm md:text-base">
                    Found an issue?
                  </h4>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Help us improve by reporting mistakes or suggesting changes
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                className="rounded-sm border-[#e27447] text-[#e27447] hover:bg-[#feefea] w-full sm:w-auto text-sm"
                onClick={() => setShowFeedbackModal(true)}
              >
                <Flag className="w-4 h-4 mr-2" />
                Report Issue
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Navigation Buttons - Like CBSE Class 9 */}
      {allLessons.length > 0 && (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between mt-4 gap-3">
          <Button
            variant="outline"
            className="rounded-sm w-full sm:w-auto"
            onClick={getPreviousLesson}
            disabled={
              !allLessons.find(
                (l) => l.lesson_order === (lesson.lesson_order || 0) - 1
              )
            }
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous Lesson
          </Button>
          <Button
            className="bg-[#e27447] hover:bg-[#e27447]/90 rounded-sm w-full sm:w-auto"
            onClick={getNextLesson}
            disabled={
              !allLessons.find(
                (l) => l.lesson_order === (lesson.lesson_order || 0) + 1
              )
            }
          >
            Next Lesson
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}

      {/* Feedback Modal */}
      <Dialog open={showFeedbackModal} onOpenChange={setShowFeedbackModal}>
        <DialogContent className="rounded-sm max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Flag className="w-5 h-5 text-[#e27447]" />
              Report an Issue or Suggest Changes
            </DialogTitle>
            <DialogDescription>
              Help us improve this lesson by reporting mistakes or suggesting
              improvements.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Feedback Type Selection */}
            <div>
              <Label className="mb-2 block">
                What would you like to report?
              </Label>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant={feedbackType === "mistake" ? "coral" : "outline"}
                  className={`rounded-sm ${
                    feedbackType === "mistake"
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : ""
                  }`}
                  onClick={() => setFeedbackType("mistake")}
                >
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Found a Mistake
                </Button>
                <Button
                  variant={feedbackType === "suggestion" ? "coral" : "outline"}
                  className={`rounded-sm ${
                    feedbackType === "suggestion"
                      ? "bg-[#e27447] hover:bg-[#e27447]/90 text-white"
                      : ""
                  }`}
                  onClick={() => setFeedbackType("suggestion")}
                >
                  <Flag className="w-4 h-4 mr-2" />
                  Suggest Changes
                </Button>
              </div>
            </div>

            {/* Feedback Message */}
            <div>
              <Label htmlFor="feedback-message" className="mb-2 block">
                Your feedback *
              </Label>
              <Textarea
                id="feedback-message"
                value={feedbackMessage}
                onChange={(e) => setFeedbackMessage(e.target.value)}
                placeholder="Describe the mistake or your suggestion in detail..."
                className="min-h-[120px] rounded-sm"
                rows={5}
              />
            </div>

            {/* Image Attachment */}
            <div>
              <Label className="mb-2 block">Attach an image (optional)</Label>
              {!feedbackImagePreview ? (
                <div className="border-2 border-dashed border-gray-300 rounded-sm p-4">
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="p-2 bg-gray-100 rounded-sm">
                      <ImageIcon className="w-6 h-6 text-gray-500" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-1">
                        Upload a screenshot or image to help explain your
                        feedback
                      </p>
                      <p className="text-xs text-gray-400">Max size: 10MB</p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      className="rounded-sm"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploadingImage}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Select Image
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="hidden"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="relative border rounded-sm overflow-hidden">
                    <Image
                      src={feedbackImagePreview}
                      alt="Feedback preview"
                      width={800}
                      height={192}
                      className="w-full h-48 object-contain bg-gray-50"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2 rounded-sm"
                      onClick={handleRemoveImage}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {feedbackImage?.name}
                  </p>
                </div>
              )}
            </div>

            <p className="text-xs text-muted-foreground">
              Lesson: <strong>{lesson.title}</strong>
              <br />
              Course: <strong>{courseSlug}</strong>
            </p>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowFeedbackModal(false);
                setFeedbackMessage("");
                setFeedbackType(null);
                setFeedbackImage(null);
                setFeedbackImagePreview(null);
                if (fileInputRef.current) {
                  fileInputRef.current.value = "";
                }
              }}
              className="rounded-sm"
              disabled={submittingFeedback}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmitFeedback}
              disabled={
                !feedbackType || !feedbackMessage.trim() || submittingFeedback
              }
              className="bg-[#e27447] hover:bg-[#e27447]/90 rounded-sm"
            >
              {submittingFeedback ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Submit Feedback
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
