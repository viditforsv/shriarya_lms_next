"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components-demo/ui/ui-components/card";
import { Badge } from "@/app/components-demo/ui/ui-components/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/app/components-demo/ui/ui-components/collapsible";
import { Play, ChevronRight, ChevronDown, BookOpen, Clock } from "lucide-react";

interface Lesson {
  id: string;
  title: string;
  slug: string;
  lesson_order: number;
  is_preview: boolean;
  content?: string;
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

interface Unit {
  name: string;
  chapters: Chapter[];
}

interface Chapter {
  name: string;
  lessons: Lesson[];
  chapter_order: number;
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

  useEffect(() => {
    const fetchCourseStructure = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch all units with chapters for the course
        const unitsResponse = await fetch(
          `/api/courses/units?course_slug=${courseSlug}`
        );
        if (!unitsResponse.ok) {
          throw new Error("Failed to fetch units");
        }
        const unitsData = await unitsResponse.json();
        const allUnits = unitsData.units || [];

        // Fetch lessons for the course
        const lessonsResponse = await fetch(
          `/api/lessons?course_slug=${courseSlug}`
        );
        if (!lessonsResponse.ok) {
          throw new Error("Failed to fetch lessons");
        }
        const lessonsData = await lessonsResponse.json();
        const lessons: Lesson[] = lessonsData.lessons || [];

        // Group lessons by chapter
        const lessonsByChapter = new Map<string, Lesson[]>();
        lessons.forEach((lesson) => {
          if (lesson.chapter?.id) {
            const chapterId = lesson.chapter.id;
            if (!lessonsByChapter.has(chapterId)) {
              lessonsByChapter.set(chapterId, []);
            }
            lessonsByChapter.get(chapterId)!.push(lesson);
          }
        });

        // Build the complete course structure
        const unitsArray: Unit[] = allUnits
          .sort((a: any, b: any) => a.unit_order - b.unit_order)
          .map((unit: any) => {
            const unitChapters = (unit.chapters || [])
              .sort((a: any, b: any) => a.chapter_order - b.chapter_order)
              .map((chapter: any) => ({
                name: chapter.chapter_name,
                lessons:
                  lessonsByChapter
                    .get(chapter.id)
                    ?.sort((a, b) => a.lesson_order - b.lesson_order) || [],
                chapter_order: chapter.chapter_order,
              }));

            return {
              name: unit.unit_name,
              chapters: unitChapters,
            };
          });

        setUnits(unitsArray);

        // Expand first unit by default
        if (unitsArray.length > 0) {
          setExpandedUnits(new Set([unitsArray[0].name]));
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

  const toggleUnit = (unitName: string) => {
    setExpandedUnits((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(unitName)) {
        newSet.delete(unitName);
      } else {
        newSet.add(unitName);
      }
      return newSet;
    });
  };

  const toggleChapter = (chapterName: string) => {
    setExpandedChapters((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(chapterName)) {
        newSet.delete(chapterName);
      } else {
        newSet.add(chapterName);
      }
      return newSet;
    });
  };

  const handleLessonClick = (lesson: Lesson) => {
    // Navigate to the lesson page
    window.location.href = `/courses/${courseSlug}/lesson/${lesson.slug}`;
  };

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
        const isUnitExpanded = expandedUnits.has(unit.name);
        const totalLessons = unit.chapters.reduce(
          (sum, chapter) => sum + chapter.lessons.length,
          0
        );

        return (
          <Card key={unit.name} className="overflow-hidden">
            <Collapsible
              open={isUnitExpanded}
              onOpenChange={() => toggleUnit(unit.name)}
            >
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <div>
                        <CardTitle className="text-lg">{unit.name}</CardTitle>
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
                        chapter.name
                      );
                      const previewLessons = chapter.lessons.filter(
                        (lesson) => lesson.is_preview
                      ).length;

                      return (
                        <Card
                          key={chapter.name}
                          className="border-l-4 border-l-primary/20"
                        >
                          <Collapsible
                            open={isChapterExpanded}
                            onOpenChange={() => toggleChapter(chapter.name)}
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
                                        {chapter.name}
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
