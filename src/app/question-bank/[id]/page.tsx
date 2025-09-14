"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/app/components-demo/ui/ui-components/button";
import { Input } from "@/app/components-demo/ui/ui-components/input";
import { Textarea } from "@/app/components-demo/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components-demo/ui/ui-components/card";
import { Badge } from "@/app/components-demo/ui/ui-components/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components-demo/ui/select";
import { Label } from "@/app/components-demo/ui/ui-components/label";
import { Switch } from "@/app/components-demo/ui/switch";
import { ArrowLeft, Save, Edit, Trash2, Copy } from "lucide-react";
import { Skeleton } from "@/app/components-demo/ui/ui-components/skeleton";
import { renderMixedContent } from "@/components/MathRenderer";
import QAManagement from "@/components/QAManagement";

interface Question {
  id: string;
  question_number: string;
  question_text: string;
  total_marks: number;
  difficulty: number;
  tags: string[];
  subject: string;
  board: string;
  grade: string;
  topic: string;
  subtopic: string;
  question_type: string;
  is_pyq: boolean;
  pyq_year: number;
  month: string;
  paper_number: number;
  "Time Zone": string;
  explanation: string;
  correct_answer: string;
  calculator: string;
  solution_steps: string[];
  solution_image: string;
  image_url: string;
  mark_allocation: Record<string, unknown> | null;
  options: Record<string, unknown>[];
  source: string;
  paper_type: string;
  year: number;
  created_at: string;
  updated_at: string;
}

export default function QuestionDetailPage() {
  const router = useRouter();
  const params = useParams();
  const questionId = params.id as string;

  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);

  // Check if we're in edit mode after component mounts (client-side only)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const editModeFromUrl = window.location.pathname.includes("/edit");
      setEditMode(editModeFromUrl);
    }
  }, []);

  const fetchQuestion = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/question-bank/${questionId}`);
      if (response.ok) {
        const data = await response.json();
        setQuestion(data);
      } else {
        console.error("Failed to fetch question");
        router.push("/question-bank");
      }
    } catch (error) {
      console.error("Error fetching question:", error);
      router.push("/question-bank");
    } finally {
      setLoading(false);
    }
  }, [questionId, router]);

  useEffect(() => {
    if (questionId) {
      fetchQuestion();
    }
  }, [questionId, fetchQuestion]);

  const handleSave = async () => {
    if (!question) return;

    setSaving(true);
    try {
      const response = await fetch(`/api/question-bank/${questionId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(question),
      });

      if (response.ok) {
        setEditMode(false);
        router.push(`/question-bank/${questionId}`);
      } else {
        console.error("Failed to save question");
      }
    } catch (error) {
      console.error("Error saving question:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this question?")) return;

    try {
      const response = await fetch(`/api/question-bank/${questionId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.push("/question-bank");
      } else {
        console.error("Failed to delete question");
      }
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  const handleDuplicate = async () => {
    if (!question) return;

    try {
      const duplicateQuestion = {
        ...question,
        id: undefined,
        question_number: `${question.question_number} (Copy)`,
        created_at: undefined,
        updated_at: undefined,
      };

      const response = await fetch("/api/question-bank", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(duplicateQuestion),
      });

      if (response.ok) {
        const newQuestion = await response.json();
        router.push(`/question-bank/${newQuestion.id}`);
      } else {
        console.error("Failed to duplicate question");
      }
    } catch (error) {
      console.error("Error duplicating question:", error);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Skeleton className="h-8 w-64 mb-4" />
          <Skeleton className="h-4 w-96" />
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-32 w-full mb-4" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Question Not Found
          </h1>
          <Button onClick={() => router.push("/question-bank")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Question Bank
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => router.push("/question-bank")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Question {question.question_number || `Q${question.id.slice(-6).toUpperCase()}`}
              </h1>
              <p className="text-gray-600 mt-1">
                {question.total_marks} marks • {question.question_type} •
                Difficulty: {question.difficulty}/10
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {!editMode && (
              <>
                <Button variant="outline" onClick={() => setEditMode(true)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline" onClick={handleDuplicate}>
                  <Copy className="w-4 h-4 mr-2" />
                  Duplicate
                </Button>
                <Button
                  variant="outline"
                  onClick={handleDelete}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </>
            )}
            {editMode && (
              <>
                <Button variant="outline" onClick={() => setEditMode(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={saving}>
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? "Saving..." : "Save"}
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500">
          <span>Dashboard</span>
          <span>/</span>
          <button
            onClick={() => router.push("/question-bank")}
            className="hover:text-gray-700"
          >
            Question Bank
          </button>
          <span>/</span>
          <span className="text-gray-900 font-medium">
            Question {question.question_number || `Q${question.id.slice(-6).toUpperCase()}`}
          </span>
        </nav>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Question Text */}
          <Card>
            <CardHeader>
              <CardTitle>Question</CardTitle>
            </CardHeader>
            <CardContent>
              {editMode ? (
                <Textarea
                  value={question.question_text || ""}
                  onChange={(e) =>
                    setQuestion({ ...question, question_text: e.target.value })
                  }
                  className="min-h-[200px]"
                  placeholder="Enter question text..."
                />
              ) : (
                <div className="prose max-w-none">
                  {renderMixedContent(question.question_text)}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Solution */}
          {question.explanation && (
            <Card>
              <CardHeader>
                <CardTitle>Solution</CardTitle>
              </CardHeader>
              <CardContent>
                {editMode ? (
                  <Textarea
                    value={question.explanation || ""}
                    onChange={(e) =>
                      setQuestion({ ...question, explanation: e.target.value })
                    }
                    className="min-h-[200px]"
                    placeholder="Enter solution..."
                  />
                ) : (
                  <div className="prose max-w-none">
                    {renderMixedContent(question.explanation)}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Solution Steps */}
          {question.solution_steps && question.solution_steps.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Solution Steps</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {question.solution_steps.map((step, index) => (
                    <div
                      key={index}
                      className="border-l-4 border-blue-200 pl-4"
                    >
                      <div className="prose max-w-none">
                        {renderMixedContent(step)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Question Details */}
          <Card>
            <CardHeader>
              <CardTitle>Question Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {editMode ? (
                <>
                  <div>
                    <Label htmlFor="question_number">Question Number</Label>
                    <Input
                      id="question_number"
                      value={question.question_number || ""}
                      onChange={(e) =>
                        setQuestion({
                          ...question,
                          question_number: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="total_marks">Total Marks</Label>
                    <Input
                      id="total_marks"
                      type="number"
                      value={question.total_marks || ""}
                      onChange={(e) =>
                        setQuestion({
                          ...question,
                          total_marks: parseInt(e.target.value) || 0,
                        })
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="difficulty">Difficulty (1-10)</Label>
                    <Input
                      id="difficulty"
                      type="number"
                      min="1"
                      max="10"
                      value={question.difficulty || ""}
                      onChange={(e) =>
                        setQuestion({
                          ...question,
                          difficulty: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="question_type">Question Type</Label>
                    <Select
                      value={question.question_type}
                      onValueChange={(value) =>
                        setQuestion({ ...question, question_type: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mcq">Multiple Choice</SelectItem>
                        <SelectItem value="subjective">Subjective</SelectItem>
                        <SelectItem value="true_false">True/False</SelectItem>
                        <SelectItem value="fill_blank">
                          Fill in the Blank
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="topic">Topic</Label>
                    <Input
                      id="topic"
                      value={question.topic || ""}
                      onChange={(e) =>
                        setQuestion({ ...question, topic: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="subtopic">Subtopic</Label>
                    <Input
                      id="subtopic"
                      value={question.subtopic || ""}
                      onChange={(e) =>
                        setQuestion({ ...question, subtopic: e.target.value })
                      }
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="is_pyq"
                      checked={question.is_pyq}
                      onCheckedChange={(checked) =>
                        setQuestion({ ...question, is_pyq: checked })
                      }
                    />
                    <Label htmlFor="is_pyq">Past Year Question</Label>
                  </div>

                  {question.is_pyq && (
                    <>
                      <div>
                        <Label htmlFor="pyq_year">PYQ Year</Label>
                        <Input
                          id="pyq_year"
                          type="number"
                          value={question.pyq_year || ""}
                          onChange={(e) =>
                            setQuestion({
                              ...question,
                              pyq_year: parseInt(e.target.value),
                            })
                          }
                        />
                      </div>

                      <div>
                        <Label htmlFor="month">Month</Label>
                        <Input
                          id="month"
                          value={question.month || ""}
                          onChange={(e) =>
                            setQuestion({ ...question, month: e.target.value })
                          }
                        />
                      </div>

                      <div>
                        <Label htmlFor="paper_number">Paper Number</Label>
                        <Input
                          id="paper_number"
                          type="number"
                          value={question.paper_number || ""}
                          onChange={(e) =>
                            setQuestion({
                              ...question,
                              paper_number: parseInt(e.target.value),
                            })
                          }
                        />
                      </div>
                    </>
                  )}

                  <div>
                    <Label htmlFor="tags">Chapter Tags</Label>
                    <Textarea
                      id="tags"
                      value={(() => {
                        // Handle different tag formats for display in edit mode
                        if (!question.tags) return "";

                        if (Array.isArray(question.tags)) {
                          return question.tags.join(", ");
                        } else if (typeof question.tags === "string") {
                          // If it's a single string, split it and rejoin for editing
                          return (question.tags as string)
                            .split(/[,;|]/)
                            .map((tag) => tag.trim())
                            .join(", ");
                        }

                        return "";
                      })()}
                      onChange={(e) =>
                        setQuestion({
                          ...question,
                          tags: e.target.value
                            .split(",")
                            .map((tag) => tag.trim())
                            .filter((tag) => tag.length > 0),
                        })
                      }
                      placeholder="Enter chapter tags separated by commas (e.g., Complex numbers, Polynomials)"
                      className="min-h-[80px]"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Separate multiple chapter tags with commas
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Question Number:</span>
                    <span className="font-medium">
                      {question.question_number || "N/A"}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Marks:</span>
                    <span className="font-medium">{question.total_marks}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Difficulty:</span>
                    <Badge className="bg-blue-100 text-blue-800">
                      {question.difficulty}/10
                    </Badge>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-medium capitalize">
                      {question.question_type}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Topic:</span>
                    <span className="font-medium">
                      {question.topic || "N/A"}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtopic:</span>
                    <span className="font-medium">
                      {question.subtopic || "N/A"}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Past Year Question:</span>
                    <Badge
                      className={
                        question.is_pyq
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }
                    >
                      {question.is_pyq ? "Yes" : "No"}
                    </Badge>
                  </div>

                  {question.is_pyq && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-600">PYQ Year:</span>
                        <span className="font-medium">{question.pyq_year}</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-gray-600">Month:</span>
                        <span className="font-medium">{question.month}</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-gray-600">Paper:</span>
                        <span className="font-medium">
                          {question.paper_number}
                        </span>
                      </div>
                    </>
                  )}
                </>
              )}
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle>Chapter Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {(() => {
                  // Handle different tag formats from database
                  let tagsArray: string[] = [];

                  if (question.tags) {
                    if (Array.isArray(question.tags)) {
                      // Already an array
                      tagsArray = question.tags;
                    } else if (typeof question.tags === "string") {
                      // Single string - split by common separators
                      tagsArray = (question.tags as string)
                        .split(/[,;|]/)
                        .map((tag) => tag.trim())
                        .filter((tag) => tag.length > 0);
                    }
                  }

                  return tagsArray.length > 0 ? (
                    tagsArray.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-sm"
                      >
                        {tag}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-gray-500 text-sm">
                      No chapter tags assigned
                    </span>
                  );
                })()}
              </div>
            </CardContent>
          </Card>

          {/* Metadata */}
          <Card>
            <CardHeader>
              <CardTitle>Metadata</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subject:</span>
                <span className="font-medium">{question.subject}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Board:</span>
                <span className="font-medium">{question.board}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Grade:</span>
                <span className="font-medium">{question.grade}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Created:</span>
                <span className="font-medium text-sm">
                  {new Date(question.created_at).toLocaleDateString()}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Updated:</span>
                <span className="font-medium text-sm">
                  {new Date(question.updated_at).toLocaleDateString()}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* QA Management Section */}
      <div className="mt-8">
        <QAManagement
          questionId={questionId}
          onStatusChange={() => {
            // Refresh question data when QA status changes
            fetchQuestion();
          }}
        />
      </div>
    </div>
  );
}
