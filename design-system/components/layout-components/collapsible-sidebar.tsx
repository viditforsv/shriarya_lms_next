"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/design-system/components/ui/button";
import { Badge } from "@/design-system/components/ui/badge";
import { Input } from "@/design-system/components/ui/input";
import {
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  BookOpen,
  FileText,
  CheckCircle,
  Clock,
  Eye,
  Lock,
  Unlock,
  Play,
  Search,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface Lesson {
  id: string;
  title: string;
  slug: string;
  lesson_order: number;
  is_preview: boolean;
  topic_number?: string;
  chapter_id?: string;
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

interface CollapsibleSidebarProps {
  currentLessonSlug?: string;
  courseSlug: string;
  lessons?: Lesson[];
  isEnrolled?: boolean;
  completedLessonIds?: Set<string>;
  courseId?: string;
}

export function CollapsibleSidebar({
  currentLessonSlug,
  courseSlug,
  lessons = [],
  isEnrolled = false,
  completedLessonIds = new Set(),
  courseId,
}: CollapsibleSidebarProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [courseProgress, setCourseProgress] = useState({
    completed: 0,
    total: 0,
    percentage: 0,
  });
  const { user } = useAuth();

  // Initialize expanded sections from localStorage
  const [expandedSections, setExpandedSections] = useState<Set<string>>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(
          `sidebar-expanded-sections-${courseSlug}`
        );
        return saved ? new Set(JSON.parse(saved)) : new Set();
      } catch {
        return new Set();
      }
    }
    return new Set();
  });

  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(
          `sidebar-expanded-chapters-${courseSlug}`
        );
        return saved ? new Set(JSON.parse(saved)) : new Set();
      } catch {
        return new Set();
      }
    }
    return new Set();
  });

  // Fetch course progress dynamically
  useEffect(() => {
    const fetchCourseProgress = async () => {
      if (!user || !courseId) {
        setCourseProgress({
          completed: 0,
          total: lessons.length,
          percentage: 0,
        });
        return;
      }

      try {
        const supabase = createClient();

        // Get total lessons count
        const total = lessons.length || 0;

        // Get completed lessons count
        const { count: completedCount, error } = await supabase
          .from("user_progress")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id)
          .eq("course_id", courseId)
          .eq("is_completed", true);

        if (error) {
          console.error("Error fetching course progress:", error);
          return;
        }

        const completed = completedCount || 0;
        const percentage =
          total > 0 ? Math.round((completed / total) * 100) : 0;

        setCourseProgress({ completed, total, percentage });
      } catch (error) {
        console.error("Error fetching course progress:", error);
      }
    };

    fetchCourseProgress();
  }, [user, courseId, lessons.length, completedLessonIds.size]);

  // Filter lessons based on search query
  const filteredLessons = lessons.filter((lesson) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      lesson.title.toLowerCase().includes(query) ||
      lesson.chapter?.chapter_name?.toLowerCase().includes(query) ||
      lesson.chapter?.unit?.unit_name?.toLowerCase().includes(query) ||
      lesson.topic_number?.toString().includes(query)
    );
  });

  // Group lessons by unit and chapter from database
  const groupedLessons = filteredLessons.reduce((acc, lesson) => {
    // Use database structure (chapter.unit.unit_name and chapter.chapter_name)
    const unit = lesson.chapter?.unit?.unit_name || "Uncategorized";
    const chapter = lesson.chapter?.chapter_name || "Other";

    if (!acc[unit]) acc[unit] = {};
    if (!acc[unit][chapter]) acc[unit][chapter] = [];
    acc[unit][chapter].push(lesson);
    return acc;
  }, {} as Record<string, Record<string, Lesson[]>>);

  // Debug logging to check lesson data structure
  console.log("📋 CollapsibleSidebar - Lessons data:", {
    totalLessons: lessons.length,
    filteredLessons: filteredLessons.length,
    sampleLesson: filteredLessons[0]
      ? {
          title: filteredLessons[0].title,
          chapter: filteredLessons[0].chapter,
          hasChapter: !!filteredLessons[0].chapter,
          hasUnit: !!filteredLessons[0].chapter?.unit,
        }
      : "No lessons",
    groupedLessons,
  });

  // Sort units and chapters by their order
  const sortedGroupedLessons = Object.keys(groupedLessons)
    .sort((a, b) => {
      const lessonA = lessons.find((l) => l.chapter?.unit?.unit_name === a);
      const lessonB = lessons.find((l) => l.chapter?.unit?.unit_name === b);
      return (
        (lessonA?.chapter?.unit?.unit_order || 999) -
        (lessonB?.chapter?.unit?.unit_order || 999)
      );
    })
    .reduce((acc, unitKey) => {
      const chapters = groupedLessons[unitKey];
      const sortedChapters = Object.keys(chapters)
        .sort((a, b) => {
          const lessonA = lessons.find(
            (l) =>
              l.chapter?.chapter_name === a &&
              l.chapter?.unit?.unit_name === unitKey
          );
          const lessonB = lessons.find(
            (l) =>
              l.chapter?.chapter_name === b &&
              l.chapter?.unit?.unit_name === unitKey
          );
          return (
            (lessonA?.chapter?.chapter_order || 999) -
            (lessonB?.chapter?.chapter_order || 999)
          );
        })
        .reduce((chapterAcc, chapterKey) => {
          chapterAcc[chapterKey] = chapters[chapterKey];
          return chapterAcc;
        }, {} as Record<string, Lesson[]>);

      acc[unitKey] = sortedChapters;
      return acc;
    }, {} as Record<string, Record<string, Lesson[]>>);

  // Auto-expand units and chapters containing the current lesson
  useEffect(() => {
    if (currentLessonSlug && lessons.length > 0) {
      const currentLesson = lessons.find(
        (lesson) => lesson.slug === currentLessonSlug
      );
      if (currentLesson && currentLesson.chapter && currentLesson.chapter.unit) {
        const unit = currentLesson.chapter.unit.unit_name;
        const chapter = currentLesson.chapter.chapter_name;

        setExpandedSections((prev) => new Set([...prev, unit]));
        setExpandedChapters((prev) => new Set([...prev, chapter]));
      }
    }
  }, [currentLessonSlug, lessons]);

  // Save expanded state to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        `sidebar-expanded-sections-${courseSlug}`,
        JSON.stringify([...expandedSections])
      );
      localStorage.setItem(
        `sidebar-expanded-chapters-${courseSlug}`,
        JSON.stringify([...expandedChapters])
      );
    }
  }, [expandedSections, expandedChapters, courseSlug]);

  const toggleSection = (sectionKey: string) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(sectionKey)) {
        newSet.delete(sectionKey);
      } else {
        newSet.add(sectionKey);
      }
      return newSet;
    });
  };

  const toggleChapter = (chapterKey: string) => {
    setExpandedChapters((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(chapterKey)) {
        newSet.delete(chapterKey);
      } else {
        newSet.add(chapterKey);
      }
      return newSet;
    });
  };

  const toggleAllSections = () => {
    const allSections = Object.keys(sortedGroupedLessons);
    if (expandedSections.size === allSections.length) {
      setExpandedSections(new Set());
    } else {
      setExpandedSections(new Set(allSections));
    }
  };

  const getLessonStatus = (lesson: Lesson) => {
    // Check if lesson is completed first
    if (completedLessonIds.has(lesson.id)) return "completed";
    if (lesson.is_preview) return "preview";
    if (lesson.slug === currentLessonSlug) return "current";
    // If student is enrolled, show as unlocked instead of locked
    if (isEnrolled) return "unlocked";
    return "locked";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "current":
        return <Play className="w-4 h-4 text-[#e27447]" />;
      case "preview":
        return <Eye className="w-4 h-4 text-blue-600" />;
      case "locked":
        return <Lock className="w-4 h-4 text-gray-400" />;
      case "unlocked":
        return <Unlock className="w-4 h-4 text-gray-600" />;
      default:
        return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-700 font-medium";
      case "current":
        return "text-[#e27447] font-semibold";
      case "preview":
        return "text-blue-600";
      case "locked":
        return "text-gray-500";
      case "unlocked":
        return "text-gray-700";
      default:
        return "text-gray-600";
    }
  };

  if (isSidebarCollapsed) {
    return (
      <div className="w-16 bg-white border-r border-[#feefea] flex flex-col items-center py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsSidebarCollapsed(false)}
          className="mb-4 rounded-sm"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
        <div className="space-y-2">
          {lessons.slice(0, 5).map((lesson) => (
            <Link
              key={lesson.id}
              href={`/courses/${courseSlug}/lesson/${lesson.slug}`}
              className="block p-2 hover:bg-primary/10/40 rounded-sm transition-colors"
              title={lesson.title}
            >
              {getLessonStatus(lesson) === "current" ? (
                <Play className="w-4 h-4 text-[#e27447]" />
              ) : (
                <FileText className="w-4 h-4 text-gray-500" />
              )}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-white border-r border-[#feefea] flex flex-col h-screen overflow-hidden">
      {/* Header - Fixed */}
      <div className="p-4 border-b border-[#feefea] flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[#1e293b]">
            Course Content
          </h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsSidebarCollapsed(true)}
            className="rounded-sm"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search lessons..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 rounded-sm"
          />
        </div>

        {/* Course Progress Meter */}
        {user && isEnrolled && (
          <div className="mb-3 p-3 bg-primary/10 rounded-sm border border-primary">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-[#1e293b]">
                Course Progress
              </span>
              <span className="text-sm text-[#e27447] font-semibold">
                {courseProgress.percentage}%
              </span>
            </div>
            <div className="w-full bg-white rounded-full h-2 mb-2">
              <div
                className="bg-[#e27447] h-2 rounded-full transition-all duration-300"
                style={{ width: `${courseProgress.percentage}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-gray-600">
              <span>
                <CheckCircle className="w-3 h-3 inline mr-1 text-green-600" />
                {courseProgress.completed} / {courseProgress.total} completed
              </span>
            </div>
          </div>
        )}

        <Button
          variant="outline"
          size="sm"
          onClick={toggleAllSections}
          className="w-full rounded-sm"
        >
          {expandedSections.size ===
          Object.keys(sortedGroupedLessons).length ? (
            <>
              <ChevronUp className="w-4 h-4 mr-2" />
              Collapse All
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4 mr-2" />
              Expand All
            </>
          )}
        </Button>
      </div>

      {/* Course Content Section - Scrollable */}
      <div className="flex-1 overflow-y-auto space-y-4 p-4">
        {Object.entries(sortedGroupedLessons).map(([sectionKey, chapters]) => (
          <div
            key={sectionKey}
            className="border-b border-[#feefea] last:border-b-0"
          >
            {/* Section Header */}
            <div
              className="flex items-center justify-between p-3 cursor-pointer hover:bg-primary/10/50 transition-colors"
              onClick={() => toggleSection(sectionKey)}
            >
              <div className="flex items-center space-x-2">
                {expandedSections.has(sectionKey) ? (
                  <ChevronDown className="w-4 h-4 text-[#e27447]" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-[#e27447]" />
                )}
                <BookOpen className="w-4 h-4 text-[#e27447]" />
                <span className="font-medium text-[#1e293b]">{sectionKey}</span>
              </div>
              <Badge variant="secondary" className="rounded-sm">
                {Object.values(chapters).flat().length}
              </Badge>
            </div>

            {/* Chapters */}
            {expandedSections.has(sectionKey) && (
              <div className="bg-white/50">
                {Object.entries(chapters).map(
                  ([chapterKey, chapterLessons]) => (
                    <div key={chapterKey}>
                      {/* Chapter Header */}
                      <div
                        className="flex items-center justify-between p-3 pl-8 cursor-pointer hover:bg-primary/10/30 transition-colors"
                        onClick={() => toggleChapter(chapterKey)}
                      >
                        <div className="flex items-center space-x-2">
                          {expandedChapters.has(chapterKey) ? (
                            <ChevronDown className="w-4 h-4 text-gray-600" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-gray-600" />
                          )}
                          <FileText className="w-4 h-4 text-gray-600" />
                          <span className="font-medium text-gray-700">
                            {chapterKey}
                          </span>
                        </div>
                        <Badge variant="outline" className="rounded-sm">
                          {chapterLessons.length}
                        </Badge>
                      </div>

                      {/* Lessons */}
                      {expandedChapters.has(chapterKey) && (
                        <div className="bg-gray-50/50">
                          {chapterLessons
                            .sort((a, b) => a.lesson_order - b.lesson_order)
                            .map((lesson) => {
                              const status = getLessonStatus(lesson);
                              const isCurrent =
                                lesson.slug === currentLessonSlug;

                              return (
                                <Link
                                  key={lesson.id}
                                  href={`/courses/${courseSlug}/lesson/${lesson.slug}`}
                                  className={`block p-3 pl-16 transition-colors ${
                                    status === "completed"
                                      ? "bg-green-50/50 hover:bg-green-100"
                                      : isCurrent
                                      ? "bg-primary/10/60 border-r-2 border-primary hover:bg-primary/10/80"
                                      : "hover:bg-primary/10/40"
                                  }`}
                                >
                                  <div className="flex items-start space-x-3">
                                    <div className="shrink-0 mt-0.5">
                                      {getStatusIcon(status)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p
                                        className={`text-sm ${getStatusColor(
                                          status
                                        )} leading-tight break-words`}
                                      >
                                        {lesson.topic_number
                                          ? `${lesson.topic_number}: `
                                          : ""}
                                        {lesson.title}
                                      </p>
                                      <div className="flex items-center space-x-2 mt-1 flex-wrap gap-1">
                                        <span className="text-xs text-gray-500">
                                          Lesson {lesson.lesson_order}
                                        </span>
                                        {lesson.is_preview && (
                                          <Badge
                                            variant="secondary"
                                            className="rounded-sm text-xs"
                                          >
                                            Preview
                                          </Badge>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </Link>
                              );
                            })}
                        </div>
                      )}
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
