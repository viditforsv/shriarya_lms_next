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
  section?: string;
  chapter?: string;
  unit_name?: string;
  chapter_name?: string;
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

  // Map lesson order to section and chapter based on course slug
  const getSectionAndChapter = (lessonOrder: number) => {
    // CBSE Class 9 Mapping - Based on actual database lesson orders
    if (courseSlug === "cbse-mathematics-class-9") {
      // Lesson 1: Real Numbers
      if (lessonOrder === 1) {
        return { section: "Number Systems", chapter: "Real Numbers" };
      }
      // Lesson 2: Polynomials
      else if (lessonOrder === 2) {
        return { section: "Algebra", chapter: "Polynomials" };
      }
      // Lesson 3: Coordinate Geometry
      else if (lessonOrder === 3) {
        return {
          section: "Coordinate Geometry",
          chapter: "Coordinate Geometry",
        };
      }
      // Lesson 4: Linear Equations
      else if (lessonOrder === 4) {
        return {
          section: "Algebra",
          chapter: "Linear Equations in Two Variables",
        };
      }
      // Lesson 5: Euclid's Geometry
      else if (lessonOrder === 5) {
        return {
          section: "Geometry",
          chapter: "Introduction to Euclid Geometry",
        };
      }
      // Lesson 6: Lines and Angles
      else if (lessonOrder === 6) {
        return { section: "Geometry", chapter: "Lines and Angles" };
      }
      // Lesson 7: Triangles
      else if (lessonOrder === 7) {
        return { section: "Geometry", chapter: "Triangles" };
      }
      // Lesson 8: Quadrilaterals
      else if (lessonOrder === 8) {
        return { section: "Geometry", chapter: "Quadrilaterals" };
      }
      // Lesson 9: Areas (not in comm_dnd.md structure, but exists in DB)
      else if (lessonOrder === 9) {
        return {
          section: "Geometry",
          chapter: "Areas of Parallelograms and Triangles",
        };
      }
      // Lesson 10: Circles
      else if (lessonOrder === 10) {
        return { section: "Geometry", chapter: "Circles" };
      }
      // Lesson 11: Constructions (not in comm_dnd.md structure, but exists in DB)
      else if (lessonOrder === 11) {
        return { section: "Geometry", chapter: "Constructions" };
      }
      // Lesson 12: Heron's Formula
      else if (lessonOrder === 12) {
        return {
          section: "Mensuration",
          chapter: "Areas of a triangle using Heron's Formula",
        };
      }
      // Lesson 13: Surface Areas and Volumes
      else if (lessonOrder === 13) {
        return { section: "Mensuration", chapter: "Surface Areas and Volumes" };
      }
      // Lesson 14: Statistics
      else if (lessonOrder === 14) {
        return { section: "Statistics", chapter: "Statistics" };
      }
      // Lesson 15: Probability (not in comm_dnd.md structure, but exists in DB)
      else if (lessonOrder === 15) {
        return { section: "Statistics", chapter: "Probability" };
      }
      return { section: "General", chapter: "Other Topics" };
    }

    // CBSE Class 10 Mapping (original)
    if (lessonOrder >= 1 && lessonOrder <= 6) {
      return { section: "Number Systems", chapter: "Real Numbers" };
    } else if (lessonOrder >= 7 && lessonOrder <= 11) {
      return { section: "Algebra", chapter: "Polynomials" };
    } else if (lessonOrder >= 12 && lessonOrder <= 18) {
      return { section: "Algebra", chapter: "Pair of Linear Equations" };
    } else if (lessonOrder >= 19 && lessonOrder <= 25) {
      return { section: "Algebra", chapter: "Quadratic Equations" };
    } else if (lessonOrder >= 26 && lessonOrder <= 31) {
      return { section: "Algebra", chapter: "Arithmetic Progressions" };
    } else if (lessonOrder >= 32 && lessonOrder <= 37) {
      return { section: "Coordinate Geometry", chapter: "Coordinate Geometry" };
    } else if (lessonOrder >= 38 && lessonOrder <= 46) {
      return { section: "Geometry", chapter: "Triangles" };
    } else if (lessonOrder >= 47 && lessonOrder <= 52) {
      return { section: "Geometry", chapter: "Circles" };
    } else if (lessonOrder >= 53 && lessonOrder <= 59) {
      return {
        section: "Trigonometry",
        chapter: "Introduction to Trigonometry",
      };
    } else if (lessonOrder >= 60 && lessonOrder <= 64) {
      return { section: "Trigonometry", chapter: "Trigonometric Identities" };
    } else if (lessonOrder >= 65 && lessonOrder <= 71) {
      return { section: "Trigonometry", chapter: "Heights and Distances" };
    } else if (lessonOrder >= 72 && lessonOrder <= 76) {
      return { section: "Mensuration", chapter: "Areas Related to Circles" };
    } else if (lessonOrder >= 77 && lessonOrder <= 81) {
      return { section: "Mensuration", chapter: "Surface Areas and Volumes" };
    } else if (lessonOrder >= 82 && lessonOrder <= 89) {
      return { section: "Statistics & Probability", chapter: "Statistics" };
    } else if (lessonOrder >= 90 && lessonOrder <= 94) {
      return { section: "Statistics & Probability", chapter: "Probability" };
    }
    return { section: "General", chapter: "Chapter 1" };
  };

  // Group lessons by section and chapter dynamically
  const groupedLessons = lessons.reduce((acc, lesson) => {
    // Use database values if available, otherwise fall back to mapping function
    const section =
      (lesson as any).unit_name ||
      getSectionAndChapter(lesson.lesson_order).section;
    const chapter =
      (lesson as any).chapter_name ||
      getSectionAndChapter(lesson.lesson_order).chapter;

    if (!acc[section]) acc[section] = {};
    if (!acc[section][chapter]) acc[section][chapter] = [];
    acc[section][chapter].push(lesson);
    return acc;
  }, {} as Record<string, Record<string, Lesson[]>>);

  // Auto-expand sections and chapters containing the current lesson
  useEffect(() => {
    if (currentLessonSlug && lessons.length > 0) {
      const currentLesson = lessons.find(
        (lesson) => lesson.slug === currentLessonSlug
      );
      if (currentLesson) {
        // Use database values if available, otherwise fall back to mapping function
        const section =
          (currentLesson as any).unit_name ||
          getSectionAndChapter(currentLesson.lesson_order).section;
        const chapter =
          (currentLesson as any).chapter_name ||
          getSectionAndChapter(currentLesson.lesson_order).chapter;

        setExpandedSections((prev) => new Set([...prev, section]));
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
    const allSections = Object.keys(groupedLessons);
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
          {expandedSections.size === Object.keys(groupedLessons).length ? (
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
        {Object.entries(groupedLessons).map(([sectionKey, chapters]) => (
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
