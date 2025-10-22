"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/app/components-demo/ui/ui-components/button";
import { Badge } from "@/app/components-demo/ui/ui-components/badge";
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
  Play,
} from "lucide-react";

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
    unit: {
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
}

export function CollapsibleSidebar({
  currentLessonSlug,
  courseSlug,
  lessons = [],
}: CollapsibleSidebarProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

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

  // Group lessons by unit and chapter from database
  const groupedLessons = lessons.reduce((acc, lesson) => {
    // Use database structure (chapter.unit.unit_name and chapter.chapter_name)
    const unit = lesson.chapter?.unit?.unit_name || "Uncategorized";
    const chapter = lesson.chapter?.chapter_name || "Other";

    if (!acc[unit]) acc[unit] = {};
    if (!acc[unit][chapter]) acc[unit][chapter] = [];
    acc[unit][chapter].push(lesson);
    return acc;
  }, {} as Record<string, Record<string, Lesson[]>>);

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
      if (currentLesson && currentLesson.chapter) {
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
    if (lesson.is_preview) return "preview";
    if (lesson.slug === currentLessonSlug) return "current";
    return "locked";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "current":
        return <Play className="w-4 h-4 text-[#e27447]" />;
      case "preview":
        return <Eye className="w-4 h-4 text-blue-600" />;
      case "locked":
        return <Lock className="w-4 h-4 text-gray-400" />;
      default:
        return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "current":
        return "text-[#e27447] font-semibold";
      case "preview":
        return "text-blue-600";
      case "locked":
        return "text-gray-500";
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
              className="block p-2 hover:bg-[#feefea]/40 rounded-sm transition-colors"
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
    <div className="w-80 bg-white border-r border-[#feefea] flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-[#feefea]">
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

      {/* Course Content Section */}
      <div className="space-y-4 flex-1 overflow-y-auto">
        {Object.entries(sortedGroupedLessons).map(([sectionKey, chapters]) => (
          <div
            key={sectionKey}
            className="border-b border-[#feefea] last:border-b-0"
          >
            {/* Section Header */}
            <div
              className="flex items-center justify-between p-3 cursor-pointer hover:bg-[#feefea]/50 transition-colors"
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
                        className="flex items-center justify-between p-3 pl-8 cursor-pointer hover:bg-[#feefea]/30 transition-colors"
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
                                  className={`flex items-center justify-between p-3 pl-16 hover:bg-[#feefea]/40 transition-colors ${
                                    isCurrent
                                      ? "bg-[#feefea]/60 border-r-2 border-[#e27447]"
                                      : ""
                                  }`}
                                >
                                  <div className="flex items-center space-x-3">
                                    {getStatusIcon(status)}
                                    <div className="flex-1 min-w-0">
                                      <p
                                        className={`text-sm ${getStatusColor(
                                          status
                                        )} truncate`}
                                      >
                                        {lesson.topic_number
                                          ? `${lesson.topic_number}: `
                                          : ""}
                                        {lesson.title}
                                      </p>
                                      <div className="flex items-center space-x-2 mt-1">
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
