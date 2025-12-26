"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight, ChevronDown, BookOpen } from "lucide-react";
import { Badge } from "@/design-system/components/ui/badge";

interface Lesson {
  id: string;
  slug: string;
  title: string;
  lesson_order: number;
  is_preview: boolean;
  topic_number?: string;
  topic_badge?: string;
  topic_id?: string;
  chapter?: {
    id: string;
    chapter_name: string;
    chapter_order: number;
  };
  topic?: {
    id: string;
    topic_name: string;
    topic_order: number;
    topic_number?: string;
    chapter_id: string;
  };
}

interface Chapter {
  id: string;
  chapter_name: string;
  chapter_order: number;
  unit_id: string;
}

interface Unit {
  id: string;
  unit_name: string;
  unit_order: number;
}

interface UnifiedCourseStructureProps {
  courseSlug: string;
  showTopicNumbers?: boolean;
  currentLessonSlug?: string;
  onLessonClick?: (lessonSlug: string) => void;
}

export function UnifiedCourseStructure({
  courseSlug,
  showTopicNumbers = true,
  currentLessonSlug,
  onLessonClick,
}: UnifiedCourseStructureProps) {
  const [units, setUnits] = useState<Unit[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [expandedUnits, setExpandedUnits] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourseStructure = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch units
        const unitsResponse = await fetch(
          `/api/courses/units?course_slug=${courseSlug}`
        );
        if (!unitsResponse.ok) {
          throw new Error("Failed to fetch units");
        }
        const unitsData = await unitsResponse.json();
        const allUnits = unitsData.units || [];
        setUnits(allUnits);

        // Fetch chapters
        const chaptersResponse = await fetch(
          `/api/courses/chapters?course_slug=${courseSlug}`
        );
        if (chaptersResponse.ok) {
          const chaptersData = await chaptersResponse.json();
          setChapters(chaptersData.chapters || []);
        }

        // Fetch lessons with topic_number (fetch all lessons, no pagination)
        const lessonsResponse = await fetch(
          `/api/lessons?course_slug=${courseSlug}&limit=1000`
        );
        if (!lessonsResponse.ok) {
          throw new Error("Failed to fetch lessons");
        }
        interface LessonData {
          id: string;
          slug: string;
          title: string;
          lesson_order: number;
          is_preview: boolean;
          topic_number?: string;
          topic_badge?: string;
          topic_id?: string;
          chapter?: {
            id: string;
            chapter_name: string;
            chapter_order: number;
          };
          topic?: {
            id: string;
            topic_name: string;
            topic_order: number;
            topic_number?: string;
            chapter_id: string;
          };
          [key: string]: unknown;
        }

        const lessonsData = await lessonsResponse.json();
        const allLessons: Lesson[] = (lessonsData.lessons || []).map(
          (lesson: LessonData) => ({
            id: lesson.id,
            slug: lesson.slug,
            title: lesson.title,
            lesson_order: lesson.lesson_order,
            is_preview: lesson.is_preview,
            topic_number: lesson.topic_number,
            topic_badge: lesson.topic_badge,
            topic_id: lesson.topic_id,
            chapter: lesson.chapter,
            topic: lesson.topic,
          })
        );
        setLessons(allLessons);

        // Expand first unit by default
        if (allUnits.length > 0) {
          setExpandedUnits(new Set([allUnits[0].id]));
        }
      } catch (err) {
        console.error("Error fetching course structure:", err);
        setError("Failed to load course structure");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourseStructure();
  }, [courseSlug]);

  const toggleUnit = (unitId: string) => {
    setExpandedUnits((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(unitId)) {
        newSet.delete(unitId);
      } else {
        newSet.add(unitId);
      }
      return newSet;
    });
  };

  const handleLessonClick = (lessonSlug: string) => {
    if (onLessonClick) {
      onLessonClick(lessonSlug);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#e27447]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>{error}</p>
      </div>
    );
  }

  if (units.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>No course structure available yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {units
        .sort((a, b) => a.unit_order - b.unit_order)
        .map((unit, unitIndex) => {
          const isExpanded = expandedUnits.has(unit.id);

          // Get chapters for this unit
          const unitChapters = chapters
            .filter((chapter) => chapter.unit_id === unit.id)
            .sort((a, b) => a.chapter_order - b.chapter_order);

          // Get lessons for this unit (through chapters)
          const unitLessons = lessons.filter((lesson) =>
            unitChapters.some((chapter) => chapter.id === lesson.chapter?.id)
          );

          return (
            <div key={unit.id} className="border rounded-sm">
              {/* Unit Header */}
              <div
                className="p-4 cursor-pointer hover:bg-gray-50 flex justify-between items-center"
                onClick={() => toggleUnit(unit.id)}
              >
                <div>
                  <span className="font-semibold text-lg">
                    {unitIndex + 1}. {unit.unit_name}
                  </span>
                  <span className="text-sm text-muted-foreground ml-2">
                    ({unitChapters.length}{" "}
                    {unitChapters.length === 1 ? "chapter" : "chapters"}
                    {unitLessons.length > 0 && (
                      <span className="ml-1">
                        • {unitLessons.length}{" "}
                        {unitLessons.length === 1 ? "lesson" : "lessons"}
                      </span>
                    )}
                    )
                  </span>
                </div>
                {isExpanded ? (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                )}
              </div>

              {/* Chapters and Lessons */}
              {isExpanded && (
                <div className="border-t">
                  {unitChapters.map((chapter) => {
                    const chapterLessons = lessons
                      .filter((lesson) => lesson.chapter?.id === chapter.id)
                      .sort((a, b) => a.lesson_order - b.lesson_order);

                    if (chapterLessons.length === 0) {
                      return null;
                    }

                    return (
                      <div
                        key={chapter.id}
                        className="border-b last:border-b-0"
                      >
                        {/* Chapter Header */}
                        <div className="p-3 pl-8 bg-gray-50">
                          <div className="font-semibold text-gray-800 flex items-center space-x-2">
                            <BookOpen className="w-4 h-4 text-[#e27447]" />
                            <span>{chapter.chapter_name}</span>
                          </div>
                          <div className="text-xs text-muted-foreground mt-0.5">
                            {chapterLessons.length}{" "}
                            {chapterLessons.length === 1 ? "lesson" : "lessons"}
                          </div>
                        </div>

                        {/* Lessons List */}
                        <div className="pl-12">
                          {chapterLessons.map((lesson) => {
                            const isCurrentLesson =
                              currentLessonSlug === lesson.slug;
                            const lessonUrl = `/courses/${courseSlug}/lesson/${lesson.slug}`;

                            return (
                              <Link
                                key={lesson.id}
                                href={lessonUrl}
                                onClick={(e) => {
                                  if (onLessonClick) {
                                    e.preventDefault();
                                    handleLessonClick(lesson.slug);
                                  }
                                }}
                                className={`flex items-center justify-between p-3 border-b last:border-b-0 transition-colors ${
                                  isCurrentLesson
                                    ? "bg-[#feefea] border-l-4 border-l-[#e27447]"
                                    : "hover:bg-gray-50"
                                }`}
                              >
                                <div className="flex items-center space-x-3 flex-1">
                                  <div
                                    className={`flex items-center justify-center w-6 h-6 rounded-sm text-xs font-medium flex-shrink-0 ${
                                      isCurrentLesson
                                        ? "bg-[#e27447] text-white"
                                        : "bg-gray-100 text-gray-600"
                                    }`}
                                  >
                                    {lesson.lesson_order}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div
                                      className={`text-sm font-medium truncate ${
                                        isCurrentLesson
                                          ? "text-[#e27447]"
                                          : "text-gray-700"
                                      }`}
                                    >
                                      {lesson.title}
                                      {showTopicNumbers &&
                                        lesson.topic_number && (
                                          <span className="ml-2 text-xs text-muted-foreground font-normal">
                                            [
                                            {lesson.topic_badge ||
                                              `Topic ${lesson.topic_number}`}
                                            ]
                                          </span>
                                        )}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-1">
                                  {lesson.is_preview && (
                                    <Badge
                                      variant="secondary"
                                      className="text-xs bg-blue-100 text-blue-700"
                                    >
                                      Preview
                                    </Badge>
                                  )}
                                  {isCurrentLesson && (
                                    <div className="w-2 h-2 bg-[#e27447] rounded-full"></div>
                                  )}
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
}
