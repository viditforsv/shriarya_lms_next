"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/design-system/components/ui/button";
import { Input } from "@/design-system/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/design-system/components/ui/card";
import { Badge } from "@/design-system/components/ui/badge";
import { Label } from "@/design-system/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/design-system/components/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/design-system/components/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/design-system/components/popover";
import {
  Search,
  Plus,
  X,
  Loader2,
  BookOpen,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Check,
  ChevronDown,
} from "lucide-react";
import { Checkbox } from "@/design-system/components/ui/checkbox";
import { renderMultiPartQuestion } from "@/components/MathRenderer";
import Link from "next/link";

interface Question {
  id: string;
  question_text: string;
  difficulty: number;
  question_type: string;
  subject: string;
  topic: string;
  subtopic: string;
  tags: string[];
  total_marks: number;
  boards: string[];
  course_types: string[];
  levels: string[];
  grade: string;
  is_pyq: boolean;
}

interface Lesson {
  id: string;
  title: string;
  lesson_code: string;
  topic_id: string;
  course_id: string;
}

interface Course {
  id: string;
  title: string;
  slug?: string;
  description?: string;
}

interface QuizFormData {
  title: string;
  lesson_id: string | null;
  difficulty: string;
  time_limit: number | null;
}

export default function QuizCreatorPage() {
  const router = useRouter();

  // Quiz form state
  const [quizForm, setQuizForm] = useState<QuizFormData>({
    title: "",
    lesson_id: null,
    difficulty: "medium",
    time_limit: 30,
  });

  // Question selection state
  const [selectedQuestions, setSelectedQuestions] = useState<Set<string>>(
    new Set()
  );
  const [questions, setQuestions] = useState<Question[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);

  // Filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("any");
  const [difficultyFilter, setDifficultyFilter] = useState("any");
  const [questionTypeFilter, setQuestionTypeFilter] = useState("any");
  const [topicFilter, setTopicFilter] = useState("");
  const [courseFilter, setCourseFilter] = useState("any");

  // Lesson search state
  const [lessonSearch, setLessonSearch] = useState("");
  const [lessonPopoverOpen, setLessonPopoverOpen] = useState(false);

  // Pagination state
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // UI state
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Available filter options
  const [filterOptions, setFilterOptions] = useState({
    subjects: [] as string[],
    difficulties: [] as number[],
    questionTypes: [] as string[],
  });

  // Fetch courses, lessons, and filter options
  useEffect(() => {
    fetchCourses();
    fetchFilterOptions();
  }, []);

  // Fetch lessons when course is selected
  useEffect(() => {
    if (courseFilter && courseFilter !== "any") {
      fetchLessons(courseFilter);
    } else {
      setLessons([]);
    }
    // Reset lesson selection and search when course changes
    setQuizForm({ ...quizForm, lesson_id: null });
    setLessonSearch("");
    setLessonPopoverOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseFilter]);

  // Fetch questions with filters
  useEffect(() => {
    fetchQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    page,
    searchTerm,
    subjectFilter,
    difficultyFilter,
    questionTypeFilter,
    topicFilter,
  ]);

  const fetchCourses = async () => {
    try {
      const response = await fetch("/api/courses");
      if (response.ok) {
        const data = await response.json();
        setCourses(data.courses || []);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const fetchLessons = async (courseId: string) => {
    try {
      const response = await fetch(
        `/api/lessons?course_id=${courseId}&limit=1000`
      );
      if (response.ok) {
        const data = await response.json();
        setLessons(data.lessons || []);
      }
    } catch (error) {
      console.error("Error fetching lessons:", error);
    }
  };

  const fetchFilterOptions = async () => {
    try {
      const response = await fetch("/api/question-bank/filters");
      if (response.ok) {
        const data = await response.json();
        setFilterOptions({
          subjects: data.subjects || [],
          difficulties: data.difficulties || [],
          questionTypes: data.question_types || [],
        });
      }
    } catch (error) {
      console.error("Error fetching filter options:", error);
    }
  };

  const fetchQuestions = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("page", page.toString());
      params.set("limit", limit.toString());

      if (searchTerm) params.set("search", searchTerm);
      if (subjectFilter !== "any") params.set("subject", subjectFilter);
      if (difficultyFilter !== "any")
        params.set("difficulty", difficultyFilter);
      if (questionTypeFilter !== "any")
        params.set("question_type", questionTypeFilter);
      if (topicFilter) params.set("topic", topicFilter);

      const response = await fetch(`/api/question-bank?${params}`);
      if (response.ok) {
        const data = await response.json();
        setQuestions(data.questions || []);
        setTotalQuestions(data.total || 0);
        setTotalPages(data.totalPages || 0);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
      setError("Failed to load questions");
    } finally {
      setLoading(false);
    }
  }, [
    page,
    limit,
    searchTerm,
    subjectFilter,
    difficultyFilter,
    questionTypeFilter,
    topicFilter,
  ]);

  const handleQuestionToggle = (questionId: string) => {
    const newSelected = new Set(selectedQuestions);
    if (newSelected.has(questionId)) {
      newSelected.delete(questionId);
    } else {
      newSelected.add(questionId);
    }
    setSelectedQuestions(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedQuestions.size === questions.length) {
      setSelectedQuestions(new Set());
    } else {
      setSelectedQuestions(new Set(questions.map((q) => q.id)));
    }
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSubjectFilter("any");
    setDifficultyFilter("any");
    setQuestionTypeFilter("any");
    setTopicFilter("");
    setPage(1);
  };

  const handleSaveQuiz = async () => {
    if (!quizForm.title) {
      setError("Please enter a quiz title");
      return;
    }

    if (selectedQuestions.size === 0) {
      setError("Please select at least one question");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const response = await fetch("/api/quizzes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...quizForm,
          question_ids: Array.from(selectedQuestions),
        }),
      });

      if (response.ok) {
        const quiz = await response.json();
        router.push(`/admin/quiz-manager?created=${quiz.id}`);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to create quiz");
      }
    } catch (error) {
      console.error("Error creating quiz:", error);
      setError("Failed to create quiz");
    } finally {
      setSaving(false);
    }
  };

  const selectedQuestionsArray = questions.filter((q) =>
    selectedQuestions.has(q.id)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-emerald-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/admin">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Admin
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Create New Quiz
          </h1>
          <p className="text-lg text-muted-foreground">
            Build a quiz by selecting questions from the question bank
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
            <p className="text-red-700 font-medium">{error}</p>
            <button
              onClick={() => setError(null)}
              className="text-red-600 hover:text-red-800 text-sm mt-2"
            >
              Dismiss
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Quiz Form */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Quiz Details</CardTitle>
                <CardDescription>Configure your quiz settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Quiz Title */}
                <div className="space-y-2">
                  <Label htmlFor="quiz-title">
                    Quiz Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="quiz-title"
                    placeholder="e.g., Arithmetic Basics Quiz"
                    value={quizForm.title}
                    onChange={(e) =>
                      setQuizForm({ ...quizForm, title: e.target.value })
                    }
                  />
                </div>

                {/* Course Selection */}
                <div className="space-y-2">
                  <Label htmlFor="course">Course</Label>
                  <Select value={courseFilter} onValueChange={setCourseFilter}>
                    <SelectTrigger id="course">
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any Course</SelectItem>
                      {courses.map((course) => (
                        <SelectItem key={course.id} value={course.id}>
                          {course.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Lesson Selection */}
                {courseFilter && courseFilter !== "any" && (
                  <div className="space-y-2">
                    <Label htmlFor="lesson">Lesson (Optional)</Label>
                    <Popover open={lessonPopoverOpen} onOpenChange={setLessonPopoverOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          className="w-full justify-between"
                          id="lesson"
                        >
                          <span className="truncate">
                            {(() => {
                              if (!quizForm.lesson_id) return "No Lesson";
                              const selectedLesson = lessons.find(
                                (l) => l.id === quizForm.lesson_id
                              );
                              return selectedLesson
                                ? `${selectedLesson.lesson_code}: ${selectedLesson.title}`
                                : "Select lesson...";
                            })()}
                          </span>
                          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                        <div className="p-2">
                          <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="Search lessons..."
                              value={lessonSearch}
                              onChange={(e) => setLessonSearch(e.target.value)}
                              className="pl-8"
                            />
                          </div>
                        </div>
                        <div className="max-h-[300px] overflow-auto">
                          {lessons
                            .filter((lesson) =>
                              `${lesson.lesson_code} ${lesson.title}`
                                .toLowerCase()
                                .includes(lessonSearch.toLowerCase())
                            )
                            .length === 0 ? (
                            <div className="p-4 text-center text-sm text-muted-foreground">
                              No lessons found
                            </div>
                          ) : (
                            <>
                              <div
                                className="flex items-center px-2 py-1.5 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground"
                                onClick={() => {
                                  setQuizForm({ ...quizForm, lesson_id: null });
                                  setLessonPopoverOpen(false);
                                  setLessonSearch("");
                                }}
                              >
                                <Check
                                  className={`mr-2 h-4 w-4 ${
                                    !quizForm.lesson_id
                                      ? "opacity-100"
                                      : "opacity-0"
                                  }`}
                                />
                                No Lesson
                              </div>
                              {lessons
                                .filter((lesson) =>
                                  `${lesson.lesson_code} ${lesson.title}`
                                    .toLowerCase()
                                    .includes(lessonSearch.toLowerCase())
                                )
                                .map((lesson) => (
                                  <div
                                    key={lesson.id}
                                    className="flex items-center px-2 py-1.5 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground"
                                    onClick={() => {
                        setQuizForm({
                          ...quizForm,
                                        lesson_id: lesson.id,
                                      });
                                      setLessonPopoverOpen(false);
                                      setLessonSearch("");
                                    }}
                                  >
                                    <Check
                                      className={`mr-2 h-4 w-4 ${
                                        quizForm.lesson_id === lesson.id
                                          ? "opacity-100"
                                          : "opacity-0"
                                      }`}
                                    />
                            {lesson.lesson_code}: {lesson.title}
                                  </div>
                        ))}
                            </>
                          )}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                )}

                {/* Difficulty */}
                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty</Label>
                  <Select
                    value={quizForm.difficulty}
                    onValueChange={(value) =>
                      setQuizForm({ ...quizForm, difficulty: value })
                    }
                  >
                    <SelectTrigger id="difficulty">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Time Limit */}
                <div className="space-y-2">
                  <Label htmlFor="time-limit">Time Limit (minutes)</Label>
                  <Input
                    id="time-limit"
                    type="number"
                    min="1"
                    placeholder="30"
                    value={quizForm.time_limit || ""}
                    onChange={(e) =>
                      setQuizForm({
                        ...quizForm,
                        time_limit: e.target.value
                          ? parseInt(e.target.value)
                          : null,
                      })
                    }
                  />
                </div>

                {/* Selected Questions Count */}
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">
                      Selected Questions
                    </span>
                    <Badge variant="secondary">{selectedQuestions.size}</Badge>
                  </div>
                  {selectedQuestions.size > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => setShowPreview(true)}
                    >
                      Preview Selected
                    </Button>
                  )}
                </div>

                {/* Save Button */}
                <Button
                  className="w-full bg-primary hover:bg-primary/90"
                  onClick={handleSaveQuiz}
                  disabled={saving || selectedQuestions.size === 0}
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating Quiz...
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-2" />
                      Create Quiz
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Question Selection */}
          <div className="lg:col-span-2 space-y-6">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Search & Filter Questions</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleClearFilters}
                  >
                    Clear Filters
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search questions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Quick Filters */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Subject</Label>
                    <Select
                      value={subjectFilter}
                      onValueChange={setSubjectFilter}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any Subject</SelectItem>
                        {filterOptions.subjects.map((subject) => (
                          <SelectItem key={subject} value={subject}>
                            {subject}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Difficulty</Label>
                    <Select
                      value={difficultyFilter}
                      onValueChange={setDifficultyFilter}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any Difficulty</SelectItem>
                        {filterOptions.difficulties.map((diff) => (
                          <SelectItem key={diff} value={diff.toString()}>
                            Level {diff}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Question Type</Label>
                    <Select
                      value={questionTypeFilter}
                      onValueChange={setQuestionTypeFilter}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any Type</SelectItem>
                        {filterOptions.questionTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Topic</Label>
                    <Input
                      placeholder="Filter by topic"
                      value={topicFilter}
                      onChange={(e) => setTopicFilter(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Question List */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Available Questions</CardTitle>
                    <CardDescription>
                      {totalQuestions} questions found
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleSelectAll}>
                    {selectedQuestions.size === questions.length
                      ? "Deselect All"
                      : "Select All"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
                    <p className="text-muted-foreground">
                      Loading questions...
                    </p>
                  </div>
                ) : questions.length === 0 ? (
                  <div className="text-center py-12">
                    <BookOpen className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <p className="text-muted-foreground">
                      No questions found with current filters
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {questions.map((question) => (
                      <div
                        key={question.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          selectedQuestions.has(question.id)
                            ? "border-primary bg-primary/5"
                            : "border-gray-200 hover:border-primary/50"
                        }`}
                        onClick={() => handleQuestionToggle(question.id)}
                      >
                        <div className="flex items-start gap-3">
                          <Checkbox
                            checked={selectedQuestions.has(question.id)}
                            onCheckedChange={() =>
                              handleQuestionToggle(question.id)
                            }
                          />
                          <div className="flex-1 min-w-0">
                            <div className="prose prose-sm max-w-none mb-2">
                              {renderMultiPartQuestion(question.question_text)}
                            </div>
                            <div className="flex flex-wrap gap-2">
                              <Badge variant="outline" className="text-xs">
                                {question.question_type}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                Difficulty: {question.difficulty}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {question.total_marks} marks
                              </Badge>
                              {question.topic && (
                                <Badge variant="secondary" className="text-xs">
                                  {question.topic}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {!loading && totalPages > 1 && (
                  <div className="flex items-center justify-between mt-6 pt-4 border-t">
                    <p className="text-sm text-muted-foreground">
                      Page {page} of {totalPages}
                    </p>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Previous
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage(page + 1)}
                        disabled={page === totalPages}
                      >
                        Next
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Preview Dialog */}
        <Dialog open={showPreview} onOpenChange={setShowPreview}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                Selected Questions ({selectedQuestionsArray.length})
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              {selectedQuestionsArray.map((question, index) => (
                <Card key={question.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-sm">
                        Question {index + 1}
                      </CardTitle>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuestionToggle(question.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-sm max-w-none mb-3">
                      {renderMultiPartQuestion(question.question_text)}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">{question.question_type}</Badge>
                      <Badge variant="outline">
                        Difficulty: {question.difficulty}
                      </Badge>
                      <Badge variant="outline">
                        {question.total_marks} marks
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
