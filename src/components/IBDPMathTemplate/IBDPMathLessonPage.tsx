"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/app/components-demo/ui/ui-components/card";
import { Button } from "@/app/components-demo/ui/ui-components/button";
import { Badge } from "@/app/components-demo/ui/ui-components/badge";
import { Input } from "@/app/components-demo/ui/ui-components/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components-demo/ui/tabs";
import {
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  BookOpen,
  Search,
  CheckCircle,
  RotateCcw,
  Play,
} from "lucide-react";
import { IBDPQuestionCard } from "./IBDPQuestionCard";
import { IBDPConceptsTab } from "./IBDPConceptsTab";

interface Unit {
  id: string;
  unit_name: string;
  unit_order: number;
  chapters: Chapter[];
}

interface Chapter {
  id: string;
  chapter_name: string;
  chapter_order: number;
  unit_id: string;
  lessons: Lesson[];
}

interface Lesson {
  id: string;
  title: string;
  slug: string;
  lesson_order: number;
  chapter_id: string;
  questions?: Question[];
}

interface Question {
  id: string;
  question_text: string;
  tags: string[];
  marks: number;
  solution?: string;
  difficulty?: number;
}

interface IBDPMathLessonPageProps {
  courseSlug: string;
  currentLessonSlug: string;
  units: Unit[];
  currentLesson: Lesson;
  questions?: Question[];
  unitName?: string;
  chapterName?: string;
  onProgressUpdate?: (lessonId: string, progress: number) => void;
  courseLinks?: {
    subjectGuide?: string;
    formulaBooklet?: string;
    syllabus?: string;
    pastPapers?: string;
  };
}

export function IBDPMathLessonPage({
  courseSlug,
  currentLessonSlug,
  units,
  currentLesson,
  questions = [],
  unitName = "Unit",
  chapterName = "Chapter",
  onProgressUpdate,
  courseLinks = {},
}: IBDPMathLessonPageProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [expandedUnits, setExpandedUnits] = useState<Set<string>>(new Set());
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(
    new Set()
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"questions" | "concepts">(
    "questions"
  );
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(
    new Set()
  );
  const [reviewLaterQuestions, setReviewLaterQuestions] = useState<Set<string>>(
    new Set()
  );
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [lastLesson, setLastLesson] = useState<string | null>(null);

  // Auto-expand current lesson's unit and chapter
  useEffect(() => {
    const currentLesson = units
      .flatMap((u) => u.chapters)
      .flatMap((c) => c.lessons)
      .find((l) => l.slug === currentLessonSlug);

    if (currentLesson) {
      const chapter = units
        .flatMap((u) => u.chapters)
        .find((c) => c.id === currentLesson.chapter_id);

      if (chapter) {
        setExpandedUnits((prev) => new Set([...prev, chapter.unit_id]));
        setExpandedChapters((prev) => new Set([...prev, chapter.id]));
      }
    }
  }, [currentLessonSlug, units]);

  // Load last lesson from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`ibdp-last-lesson-${courseSlug}`);
    if (saved) {
      setLastLesson(saved);
    }
  }, [courseSlug]);

  // Save current lesson as last lesson
  useEffect(() => {
    localStorage.setItem(`ibdp-last-lesson-${courseSlug}`, currentLessonSlug);
  }, [currentLessonSlug, courseSlug]);

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

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(chapterId)) {
        newSet.delete(chapterId);
      } else {
        newSet.add(chapterId);
      }
      return newSet;
    });
  };

  const handleMarkDone = (
    questionId: string,
    timeSpent: number,
    result: "correct" | "incorrect" | "skip"
  ) => {
    setCompletedQuestions((prev) => new Set([...prev, questionId]));

    // TODO: Save to database
    console.log("Question completed:", { questionId, timeSpent, result });

    // Update progress
    const progress = (completedQuestions.size + 1) / questions.length;
    onProgressUpdate?.(currentLesson.id, progress * 100);
  };

  const handleReviewLater = (questionId: string) => {
    setReviewLaterQuestions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });

    // TODO: Save to database
    console.log("Review later toggled:", questionId);
  };

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
    setActiveTab("concepts");
  };

  const filteredUnits = units.map((unit) => ({
    ...unit,
    chapters: unit.chapters.map((chapter) => ({
      ...chapter,
      lessons: chapter.lessons.filter((lesson) =>
        lesson.title.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    })),
  }));

  const lessonProgress =
    questions.length > 0
      ? (completedQuestions.size / questions.length) * 100
      : 0;

  const allTags = Array.from(new Set(questions.flatMap((q) => q.tags)));

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      {!isSidebarCollapsed ? (
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[#1e293b]">
                Navigation
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

            {/* Resume Last Lesson */}
            {lastLesson && lastLesson !== currentLessonSlug && (
              <Link href={`/courses/${courseSlug}/lesson/${lastLesson}`}>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full rounded-sm mb-3 text-[#e27447] border-[#e27447] hover:bg-[#feefea]"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Resume Last Lesson
                </Button>
              </Link>
            )}

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search lessons..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 rounded-sm"
              />
            </div>

            {/* Current Lesson Progress */}
            <div className="mt-3 p-3 bg-[#feefea] rounded-sm border border-[#e27447]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-[#1e293b]">
                  Lesson Progress
                </span>
                <span className="text-sm text-[#e27447] font-semibold">
                  {Math.round(lessonProgress)}%
                </span>
              </div>
              <div className="w-full bg-white rounded-full h-2">
                <div
                  className="bg-[#e27447] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${lessonProgress}%` }}
                />
              </div>
              <div className="flex items-center justify-between mt-2 text-xs text-gray-600">
                <span>
                  <CheckCircle className="w-3 h-3 inline mr-1" />
                  {completedQuestions.size} / {questions.length} done
                </span>
                <span>⏱️ {reviewLaterQuestions.size} to review</span>
              </div>
            </div>
          </div>

          {/* Units List */}
          <div className="flex-1 overflow-y-auto">
            {filteredUnits.map((unit) => (
              <div key={unit.id} className="border-b border-gray-100">
                {/* Unit Header */}
                <div
                  className="p-3 cursor-pointer hover:bg-gray-50 flex items-center justify-between"
                  onClick={() => toggleUnit(unit.id)}
                >
                  <div className="flex items-center gap-2">
                    {expandedUnits.has(unit.id) ? (
                      <ChevronDown className="w-4 h-4 text-[#e27447]" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-[#e27447]" />
                    )}
                    <BookOpen className="w-4 h-4 text-[#e27447]" />
                    <span className="font-medium text-sm text-[#1e293b]">
                      Unit {unit.unit_order}: {unit.unit_name}
                    </span>
                  </div>
                  <Badge variant="secondary" className="rounded-sm text-xs">
                    {unit.chapters.length}
                  </Badge>
                </div>

                {/* Chapters */}
                {expandedUnits.has(unit.id) && (
                  <div className="bg-gray-50/50">
                    {unit.chapters.map((chapter) => (
                      <div key={chapter.id}>
                        {/* Chapter Header */}
                        <div
                          className="p-3 pl-8 cursor-pointer hover:bg-gray-100 flex items-center justify-between"
                          onClick={() => toggleChapter(chapter.id)}
                        >
                          <div className="flex items-center gap-2">
                            {expandedChapters.has(chapter.id) ? (
                              <ChevronDown className="w-4 h-4 text-gray-600" />
                            ) : (
                              <ChevronRight className="w-4 h-4 text-gray-600" />
                            )}
                            <span className="text-sm text-gray-700">
                              {chapter.chapter_order}. {chapter.chapter_name}
                            </span>
                          </div>
                          <Badge
                            variant="outline"
                            className="rounded-sm text-xs"
                          >
                            {chapter.lessons.length}
                          </Badge>
                        </div>

                        {/* Lessons */}
                        {expandedChapters.has(chapter.id) && (
                          <div>
                            {chapter.lessons.map((lesson) => {
                              const isCurrent =
                                lesson.slug === currentLessonSlug;
                              return (
                                <Link
                                  key={lesson.id}
                                  href={`/courses/${courseSlug}/lesson/${lesson.slug}`}
                                  className={`block p-3 pl-16 text-sm hover:bg-[#feefea]/40 transition-colors ${
                                    isCurrent
                                      ? "bg-[#feefea] border-r-2 border-[#e27447] font-medium text-[#e27447]"
                                      : "text-gray-600"
                                  }`}
                                >
                                  <div className="flex items-center gap-2">
                                    {isCurrent && <Play className="w-3 h-3" />}
                                    <span>{lesson.title}</span>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsSidebarCollapsed(false)}
            className="rounded-sm"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-6">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
            <Link href="/courses" className="hover:text-foreground">
              Courses
            </Link>
            <span>/</span>
            <Link
              href={`/courses/${courseSlug}`}
              className="hover:text-foreground"
            >
              {unitName}
            </Link>
            <span>/</span>
            <span className="text-foreground">{currentLesson.title}</span>
          </nav>

          {/* Lesson Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-[#1e293b] mb-2">
              {currentLesson.title}
            </h1>
            <p className="text-muted-foreground">
              {unitName} → {chapterName}
            </p>
          </div>

          {/* Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={(v) => setActiveTab(v as "questions" | "concepts")}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 rounded-sm bg-gray-100 p-1 shadow-sm border border-gray-200">
              <TabsTrigger
                value="questions"
                className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white data-[state=active]:shadow-sm font-medium transition-all duration-200 hover:bg-gray-200 data-[state=inactive]:text-gray-600"
              >
                Questions
                {questions.length > 0 && (
                  <Badge variant="secondary" className="ml-2 rounded-sm">
                    {questions.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger
                value="concepts"
                className="rounded-sm data-[state=active]:bg-[#e27447] data-[state=active]:text-white data-[state=active]:shadow-sm font-medium transition-all duration-200 hover:bg-gray-200 data-[state=inactive]:text-gray-600"
              >
                Concepts & Formula
              </TabsTrigger>
            </TabsList>

            {/* Questions Tab */}
            <TabsContent value="questions" className="mt-6 space-y-6">
              {questions.length > 0 ? (
                questions.map((question) => (
                  <IBDPQuestionCard
                    key={question.id}
                    questionId={question.id}
                    questionText={question.question_text}
                    tags={question.tags}
                    marks={question.marks}
                    solution={question.solution}
                    onMarkDone={handleMarkDone}
                    onReviewLater={handleReviewLater}
                    onTagClick={handleTagClick}
                  />
                ))
              ) : (
                <Card className="rounded-sm">
                  <CardContent className="py-12 text-center">
                    <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      No Questions Available
                    </h3>
                    <p className="text-muted-foreground">
                      Questions for this lesson will be added soon.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Concepts Tab */}
            <TabsContent value="concepts" className="mt-6">
              <IBDPConceptsTab
                unitName={unitName}
                chapterName={chapterName}
                lessonName={currentLesson.title}
                tags={selectedTag ? [selectedTag] : allTags}
                conceptSummary={{
                  title: `Understanding ${currentLesson.title}`,
                  content: `This lesson covers the fundamental concepts of ${currentLesson.title}.`,
                  keyPoints: [
                    "Master the core principles",
                    "Apply concepts to solve problems",
                    "Connect ideas to real-world scenarios",
                  ],
                }}
                formulas={
                  [
                    // TODO: Load from database
                  ]
                }
                recommendedQuestions={
                  [
                    // TODO: Load from database based on performance
                  ]
                }
                courseLinks={courseLinks}
                onQuestionClick={() => {
                  setActiveTab("questions");
                  // Scroll to question
                }}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
