"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/design-system/components/ui/card";
import { Badge } from "@/design-system/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/design-system/components/ui/collapsible";
import { Play, ChevronRight, ChevronDown, BookOpen, Clock } from "lucide-react";

interface Lesson {
  id: string;
  title: string;
  slug: string;
  lesson_order: number;
  is_preview: boolean;
  content: string;
  chapter: {
    id: string;
    chapter_name: string;
    chapter_order: number;
    unit?: {
      id: string;
      unit_name: string;
      unit_order: number;
    };
  } | null;
}

interface Chapter {
  id: string;
  chapter_name: string;
  chapter_order: number;
  lessons: Lesson[];
}

interface Unit {
  id: string;
  unit_name: string;
  unit_order: number;
  chapters: Chapter[];
}

interface IBDPCourseStructureProps {
  courseSlug: string;
}

export function IBDPCourseStructure({ courseSlug }: IBDPCourseStructureProps) {
  const [units, setUnits] = useState<Unit[]>([]);
  const [expandedUnits, setExpandedUnits] = useState<Set<string>>(new Set());
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(
    new Set()
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCourseStructure = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const unitsResponse = await fetch(
        `/api/courses/units?course_slug=${courseSlug}`
      );
      if (!unitsResponse.ok) throw new Error("Failed to fetch units");

      const unitsData = await unitsResponse.json();
      const allUnits: Unit[] = unitsData.units || [];

      const lessonsResponse = await fetch(
        `/api/lessons?course_slug=${courseSlug}`
      );
      if (!lessonsResponse.ok) throw new Error("Failed to fetch lessons");

      const lessonsData = await lessonsResponse.json();
      const lessons: Lesson[] = lessonsData.lessons || [];

      // Group lessons by chapter
      const lessonsByChapter = new Map<string, Lesson[]>();
      lessons.forEach((lesson) => {
        const chapterId = lesson.chapter?.id;
        if (chapterId) {
          if (!lessonsByChapter.has(chapterId)) {
            lessonsByChapter.set(chapterId, []);
          }
          lessonsByChapter.get(chapterId)!.push(lesson);
        }
      });

      // Build complete structure
      const unitsArray: Unit[] = allUnits
        .sort((a, b) => a.unit_order - b.unit_order)
        .map((unit) => ({
          ...unit,
          chapters: (unit.chapters || [])
            .sort((a, b) => a.chapter_order - b.chapter_order)
            .map((chapter) => ({
              ...chapter,
              lessons:
                lessonsByChapter
                  .get(chapter.id)
                  ?.sort((a, b) => a.lesson_order - b.lesson_order) || [],
            })),
        }));

      setUnits(unitsArray);

      if (unitsArray.length > 0) {
        setExpandedUnits(new Set([unitsArray[0].unit_name]));
      }
    } catch (err) {
      console.error("Error fetching course structure:", err);
      setError("Failed to load course structure");
    } finally {
      setIsLoading(false);
    }
  }, [courseSlug]);

  useEffect(() => {
    fetchCourseStructure();
  }, [fetchCourseStructure]);

  const toggleUnit = useCallback((unitName: string) => {
    setExpandedUnits((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(unitName)) {
        newSet.delete(unitName);
      } else {
        newSet.add(unitName);
      }
      return newSet;
    });
  }, []);

  const toggleChapter = useCallback((chapterName: string) => {
    setExpandedChapters((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(chapterName)) {
        newSet.delete(chapterName);
      } else {
        newSet.add(chapterName);
      }
      return newSet;
    });
  }, []);

  const handleLessonClick = useCallback(
    (lesson: Lesson) => {
      window.location.href = `/courses/${courseSlug}/lesson/${lesson.slug}`;
    },
    [courseSlug]
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading course structure...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {units.map((unit) => {
        const isUnitExpanded = expandedUnits.has(unit.unit_name);
        const totalLessons = unit.chapters.reduce(
          (sum, chapter) => sum + chapter.lessons.length,
          0
        );

        return (
          <Card key={unit.id} className="overflow-hidden">
            <Collapsible
              open={isUnitExpanded}
              onOpenChange={() => toggleUnit(unit.unit_name)}
            >
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <div>
                        <CardTitle className="text-lg">
                          {unit.unit_name}
                        </CardTitle>
                        <CardDescription>
                          {unit.chapters.length} chapters • {totalLessons}{" "}
                          lessons
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="text-xs">
                        {totalLessons} lessons
                      </Badge>
                      {isUnitExpanded ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </div>
                  </div>
                </CardHeader>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    {unit.chapters.map((chapter) => {
                      const isChapterExpanded = expandedChapters.has(
                        chapter.chapter_name
                      );
                      const previewLessons = chapter.lessons.filter(
                        (lesson) => lesson.is_preview
                      ).length;

                      return (
                        <Card
                          key={chapter.id}
                          className="border-l-4 border-l-primary/20"
                        >
                          <Collapsible
                            open={isChapterExpanded}
                            onOpenChange={() =>
                              toggleChapter(chapter.chapter_name)
                            }
                          >
                            <CollapsibleTrigger asChild>
                              <CardHeader className="cursor-pointer hover:bg-muted/30 transition-colors py-3">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-2">
                                    <ChevronRight
                                      className={`h-4 w-4 transition-transform ${
                                        isChapterExpanded ? "rotate-90" : ""
                                      }`}
                                    />
                                    <div>
                                      <CardTitle className="text-base">
                                        {chapter.chapter_name}
                                      </CardTitle>
                                      <CardDescription className="text-sm">
                                        {chapter.lessons.length} lessons
                                        {previewLessons > 0 && (
                                          <span className="ml-2 text-green-600">
                                            • {previewLessons} preview
                                          </span>
                                        )}
                                      </CardDescription>
                                    </div>
                                  </div>
                                  <Badge variant="outline" className="text-xs">
                                    {chapter.lessons.length}
                                  </Badge>
                                </div>
                              </CardHeader>
                            </CollapsibleTrigger>

                            <CollapsibleContent>
                              <CardContent className="pt-0">
                                <div className="space-y-2">
                                  {chapter.lessons.length > 0 ? (
                                    chapter.lessons.map((lesson) => (
                                      <div
                                        key={lesson.id}
                                        className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer group"
                                        onClick={() =>
                                          handleLessonClick(lesson)
                                        }
                                      >
                                        <div className="flex items-center space-x-3">
                                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-medium">
                                            {lesson.lesson_order}
                                          </div>
                                          <div>
                                            <h4 className="font-medium text-sm group-hover:text-primary transition-colors">
                                              {lesson.title}
                                            </h4>
                                            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                                              <Clock className="h-3 w-3" />
                                              <span>45 min</span>
                                              {lesson.is_preview && (
                                                <Badge
                                                  variant="secondary"
                                                  className="text-xs"
                                                >
                                                  Preview
                                                </Badge>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                          <Play className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                        </div>
                                      </div>
                                    ))
                                  ) : (
                                    <div className="p-4 text-center text-muted-foreground">
                                      <p className="text-sm">
                                        No lessons available yet
                                      </p>
                                      <p className="text-xs mt-1">
                                        Content coming soon
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </CardContent>
                            </CollapsibleContent>
                          </Collapsible>
                        </Card>
                      );
                    })}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        );
      })}
    </div>
  );
}
