"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
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
  ArrowLeft,
  Loader2,
  Save,
  X,
  Plus,
  GripVertical,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { renderMultiPartQuestion } from "@/components/MathRenderer";
import { Checkbox } from "@/design-system/components/ui/checkbox";

interface Quiz {
  id: string;
  title: string;
  difficulty: string;
  time_limit: number | null;
  lesson_id: string | null;
  courses_lessons?: {
    id: string;
    title: string;
    lesson_code: string;
  };
}

interface QuizQuestion {
  id: string;
  question_order: number;
  question_bank: {
    id: string;
    question_text: string;
    difficulty: number;
    question_type: string;
    total_marks: number;
    topic: string;
    subtopic: string;
  };
}

interface Question {
  id: string;
  question_text: string;
  difficulty: number;
  question_type: string;
  total_marks: number;
  topic: string;
  subtopic: string;
  tags: string[];
}

interface Course {
  id: string;
  title: string;
}

interface Lesson {
  id: string;
  title: string;
  lesson_code: string;
  course_id?: string;
}

export default function QuizEditorPage() {
  const router = useRouter();
  const params = useParams();
  const quizId = params.quizId as string;

  // Quiz state
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Add questions state
  const [showAddQuestions, setShowAddQuestions] = useState(false);
  const [availableQuestions, setAvailableQuestions] = useState<Question[]>([]);
  const [selectedNewQuestions, setSelectedNewQuestions] = useState<Set<string>>(
    new Set()
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingQuestions, setLoadingQuestions] = useState(false);

  const fetchQuiz = useCallback(async () => {
    try {
      const response = await fetch(`/api/quizzes?id=${quizId}`);
      if (response.ok) {
        const data = await response.json();
        if (data.quizzes && data.quizzes.length > 0) {
          const quizData = data.quizzes[0];
          setQuiz(quizData);

          // If quiz has a lesson, get the lesson details to find course_id
          if (quizData.lesson_id) {
            const lessonResponse = await fetch(
              `/api/lessons/${quizData.lesson_id}`
            );
            if (lessonResponse.ok) {
              const lessonData = await lessonResponse.json();
              if (lessonData.lesson) {
                setSelectedCourseId(lessonData.lesson.course_id);
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("Error fetching quiz:", error);
      setError("Failed to load quiz");
    } finally {
      setLoading(false);
    }
  }, [quizId]);

  const fetchCourses = useCallback(async () => {
    try {
      const response = await fetch("/api/courses");
      if (response.ok) {
        const data = await response.json();
        setCourses(data.courses || []);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  }, []);

  const fetchLessons = useCallback(async (courseId: string) => {
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
  }, []);

  const fetchQuizQuestions = useCallback(async () => {
    try {
      const response = await fetch(`/api/quizzes/${quizId}/questions`);
      if (response.ok) {
        const data = await response.json();
        setQuizQuestions(data.questions || []);
      }
    } catch (error) {
      console.error("Error fetching quiz questions:", error);
    }
  }, [quizId]);

  const fetchAvailableQuestions = useCallback(async () => {
    setLoadingQuestions(true);
    try {
      const params = new URLSearchParams();
      params.set("page", "1");
      params.set("limit", "50");
      if (searchTerm) params.set("search", searchTerm);

      const response = await fetch(`/api/question-bank?${params}`);
      if (response.ok) {
        const data = await response.json();
        // Filter out questions already in quiz
        const existingIds = new Set(
          quizQuestions.map((q) => q.question_bank.id)
        );
        const filtered = (data.questions || []).filter(
          (q: Question) => !existingIds.has(q.id)
        );
        setAvailableQuestions(filtered);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setLoadingQuestions(false);
    }
  }, [searchTerm, quizQuestions]);

  useEffect(() => {
    if (quizId) {
      fetchQuiz();
      fetchQuizQuestions();
      fetchCourses();
    }
  }, [quizId, fetchQuiz, fetchQuizQuestions, fetchCourses]);

  // Fetch lessons when course is selected
  useEffect(() => {
    if (selectedCourseId) {
      fetchLessons(selectedCourseId);
    } else {
      setLessons([]);
    }
  }, [selectedCourseId, fetchLessons]);

  useEffect(() => {
    if (showAddQuestions) {
      fetchAvailableQuestions();
    }
  }, [showAddQuestions, fetchAvailableQuestions]);

  const handleSaveQuiz = async () => {
    if (!quiz) return;

    setSaving(true);
    setError(null);

    try {
      const response = await fetch("/api/quizzes", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: quiz.id,
          title: quiz.title,
          difficulty: quiz.difficulty,
          time_limit: quiz.time_limit,
          lesson_id: quiz.lesson_id,
        }),
      });

      if (response.ok) {
        router.push("/admin/quiz-manager?updated=true");
      } else {
        setError("Failed to update quiz");
      }
    } catch (error) {
      console.error("Error updating quiz:", error);
      setError("Failed to update quiz");
    } finally {
      setSaving(false);
    }
  };

  const handleAddQuestions = async () => {
    if (selectedNewQuestions.size === 0) return;

    try {
      const response = await fetch(`/api/quizzes/${quizId}/questions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question_ids: Array.from(selectedNewQuestions),
        }),
      });

      if (response.ok) {
        await fetchQuizQuestions();
        setShowAddQuestions(false);
        setSelectedNewQuestions(new Set());
      }
    } catch (error) {
      console.error("Error adding questions:", error);
      setError("Failed to add questions");
    }
  };

  const handleRemoveQuestion = async (questionId: string) => {
    if (!confirm("Remove this question from the quiz?")) return;

    try {
      const response = await fetch(
        `/api/quizzes/${quizId}/questions?question_id=${questionId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setQuizQuestions(
          quizQuestions.filter((q) => q.question_bank.id !== questionId)
        );
      }
    } catch (error) {
      console.error("Error removing question:", error);
      setError("Failed to remove question");
    }
  };

  const handleQuestionToggle = (questionId: string) => {
    const newSelected = new Set(selectedNewQuestions);
    if (newSelected.has(questionId)) {
      newSelected.delete(questionId);
    } else {
      newSelected.add(questionId);
    }
    setSelectedNewQuestions(newSelected);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-emerald-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-emerald-50">
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-red-600">Quiz not found</p>
          <div className="text-center mt-4">
            <Link href="/admin/quiz-manager">
              <Button>Back to Quiz Manager</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-emerald-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/admin/quiz-manager">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Quiz Manager
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-foreground mb-2">Edit Quiz</h1>
          <p className="text-lg text-muted-foreground">
            Update quiz details and manage questions
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Quiz Details */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Quiz Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Quiz Title</Label>
                  <Input
                    id="title"
                    value={quiz.title}
                    onChange={(e) =>
                      setQuiz({ ...quiz, title: e.target.value })
                    }
                  />
                </div>

                {/* Difficulty */}
                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty</Label>
                  <Select
                    value={quiz.difficulty || "medium"}
                    onValueChange={(value) =>
                      setQuiz({ ...quiz, difficulty: value })
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
                    value={quiz.time_limit || ""}
                    onChange={(e) =>
                      setQuiz({
                        ...quiz,
                        time_limit: e.target.value
                          ? parseInt(e.target.value)
                          : null,
                      })
                    }
                  />
                </div>

                {/* Course Selection */}
                <div className="space-y-2 pt-4 border-t">
                  <Label htmlFor="course">Course</Label>
                  <Select
                    value={selectedCourseId || "none"}
                    onValueChange={(value) => {
                      setSelectedCourseId(value === "none" ? "" : value);
                      // Clear lesson selection when course changes
                      setQuiz({ ...quiz, lesson_id: null });
                    }}
                  >
                    <SelectTrigger id="course">
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No Course</SelectItem>
                      {courses.map((course) => (
                        <SelectItem key={course.id} value={course.id}>
                          {course.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Lesson Selection */}
                {selectedCourseId && selectedCourseId !== "none" && (
                  <div className="space-y-2">
                    <Label htmlFor="lesson">Lesson (Optional)</Label>
                    <Select
                      value={quiz.lesson_id || "none"}
                      onValueChange={(value) =>
                        setQuiz({
                          ...quiz,
                          lesson_id: value === "none" ? null : value,
                        })
                      }
                    >
                      <SelectTrigger id="lesson">
                        <SelectValue placeholder="Select lesson" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No Lesson</SelectItem>
                        {lessons.map((lesson) => (
                          <SelectItem key={lesson.id} value={lesson.id}>
                            {lesson.lesson_code}: {lesson.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {quiz.lesson_id && (
                      <p className="text-xs text-muted-foreground">
                        Quiz will be linked to this lesson
                      </p>
                    )}
                  </div>
                )}

                {/* Save Button */}
                <Button
                  className="w-full bg-primary hover:bg-primary/90"
                  onClick={handleSaveQuiz}
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Questions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Questions List */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Quiz Questions</CardTitle>
                    <CardDescription>
                      {quizQuestions.length} question(s)
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAddQuestions(!showAddQuestions)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Questions
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {quizQuestions.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No questions in this quiz yet. Click &quot;Add
                    Questions&quot; to get started.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {quizQuestions.map((quizQuestion, index) => (
                      <div
                        key={quizQuestion.id}
                        className="p-4 border rounded-lg bg-white"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex items-center gap-2">
                            <GripVertical className="w-4 h-4 text-muted-foreground cursor-move" />
                            <Badge variant="outline">{index + 1}</Badge>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="prose prose-sm max-w-none mb-2">
                              {renderMultiPartQuestion(
                                quizQuestion.question_bank.question_text
                              )}
                            </div>
                            <div className="flex flex-wrap gap-2">
                              <Badge variant="outline" className="text-xs">
                                {quizQuestion.question_bank.question_type}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                Difficulty:{" "}
                                {quizQuestion.question_bank.difficulty}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {quizQuestion.question_bank.total_marks} marks
                              </Badge>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleRemoveQuestion(
                                quizQuestion.question_bank.id
                              )
                            }
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Add Questions Panel */}
            {showAddQuestions && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Add Questions</CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowAddQuestions(false)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Search */}
                  <div className="mb-4">
                    <Input
                      placeholder="Search questions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  {/* Questions List */}
                  {loadingQuestions ? (
                    <div className="text-center py-8">
                      <Loader2 className="w-6 h-6 animate-spin mx-auto text-primary" />
                    </div>
                  ) : availableQuestions.length === 0 ? (
                    <p className="text-center py-8 text-muted-foreground">
                      No more questions available
                    </p>
                  ) : (
                    <>
                      <div className="space-y-3 max-h-96 overflow-y-auto mb-4">
                        {availableQuestions.map((question) => (
                          <div
                            key={question.id}
                            className={`p-3 border rounded-lg cursor-pointer transition-all ${
                              selectedNewQuestions.has(question.id)
                                ? "border-primary bg-primary/5"
                                : "border-gray-200 hover:border-primary/50"
                            }`}
                            onClick={() => handleQuestionToggle(question.id)}
                          >
                            <div className="flex items-start gap-3">
                              <Checkbox
                                checked={selectedNewQuestions.has(question.id)}
                                onCheckedChange={() =>
                                  handleQuestionToggle(question.id)
                                }
                              />
                              <div className="flex-1 min-w-0">
                                <div className="prose prose-sm max-w-none mb-2">
                                  {renderMultiPartQuestion(
                                    question.question_text
                                  )}
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  <Badge variant="outline" className="text-xs">
                                    {question.question_type}
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    Difficulty: {question.difficulty}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Add Button */}
                      <Button
                        className="w-full"
                        onClick={handleAddQuestions}
                        disabled={selectedNewQuestions.size === 0}
                      >
                        Add {selectedNewQuestions.size} Question(s)
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
