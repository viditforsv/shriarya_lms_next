"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/app/components-demo/ui/ui-components/button";
import { Input } from "@/app/components-demo/ui/ui-components/input";
import { Textarea } from "@/app/components-demo/ui/textarea";
import { Badge } from "@/app/components-demo/ui/ui-components/badge";
import { Label } from "@/app/components-demo/ui/ui-components/label";
import { ArrowLeft, Save, Edit, Trash2, Copy } from "lucide-react";
import { Skeleton } from "@/app/components-demo/ui/ui-components/skeleton";
import { renderMultiPartQuestion } from "@/components/MathRenderer";
import QAManagement from "@/components/QAManagement";
import { QAStatusBadge, QAPriorityBadge } from "@/components/QAComponents";
import ImageDisplay from "@/components/ImageDisplay";
import ImageUpload from "@/components/ImageUpload";

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
  pyq_year: number | null;
  month: string;
  paper_number: number | null;
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
  human_readable_id?: string;
  question_display_number?: number;
  // QA fields
  qa_status?:
    | "pending"
    | "in_review"
    | "needs_revision"
    | "approved"
    | "rejected"
    | "archived";
  qa_priority?: "low" | "medium" | "high" | "urgent";
  qa_flagged?: boolean;
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
    if (!questionId) return;

    setLoading(true);
    try {
      // Fetch question data
      const response = await fetch(`/api/question-bank/${questionId}`);
      if (response.ok) {
        const data = await response.json();

        // Fetch QA data
        try {
          console.log("🔄 Parent: Fetching QA data for question:", questionId);
          const cacheBuster = `&_t=${Date.now()}`;
          const qaResponse = await fetch(
            `/api/qa?question_id=${questionId}${cacheBuster}`,
            {
              cache: "no-store",
              headers: {
                "Cache-Control": "no-cache",
              },
            }
          );
          if (qaResponse.ok) {
            const qaData = await qaResponse.json();
            console.log("📥 Parent: QA data received:", qaData);
            if (qaData.qa_records && qaData.qa_records.length > 0) {
              const qaRecord = qaData.qa_records[0];
              data.qa_status = qaRecord.qa_status;
              data.qa_priority = qaRecord.priority_level;
              data.qa_flagged = qaRecord.is_flagged;
              console.log(
                "✅ Parent: Updated question with QA status:",
                qaRecord.qa_status
              );
            } else {
              console.log("⚠️ Parent: No QA records found");
            }
          } else {
            console.error("❌ Parent: QA fetch failed:", qaResponse.status);
          }
        } catch (qaError) {
          console.error("❌ Parent: Error fetching QA data:", qaError);
        }

        setQuestion(data);
      } else {
        // Check if response is JSON before trying to parse
        const contentType = response.headers.get("content-type");
        let errorData = {};

        if (contentType && contentType.includes("application/json")) {
          try {
            errorData = await response.json();
          } catch (e) {
            console.error("Failed to parse error response as JSON:", e);
          }
        } else {
          // Response is HTML or other format, get text instead
          try {
            const errorText = await response.text();
            console.error("Non-JSON error response:", errorText);
          } catch (e) {
            console.error("Failed to read error response:", e);
          }
        }

        console.error(
          "Failed to fetch question:",
          response.status,
          response.statusText,
          errorData
        );
      }
    } catch (error) {
      console.error("Error fetching question:", error);
    } finally {
      setLoading(false);
    }
  }, [questionId]);

  useEffect(() => {
    if (questionId) {
      fetchQuestion();
    }
  }, [questionId, fetchQuestion]);

  const handleSave = async () => {
    if (!question) return;

    setSaving(true);
    try {
      // Remove QA fields before sending to question-bank API
      const {
        qa_status: _,
        qa_priority: __,
        qa_flagged: ___,
        ...questionData
      } = question;

      const response = await fetch(`/api/question-bank/${questionId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(questionData),
      });

      if (response.ok) {
        setEditMode(false);
        router.push(`/question-bank/${questionId}`);
      } else {
        // Check if response is JSON before trying to parse
        const contentType = response.headers.get("content-type");
        let errorData = {};

        if (contentType && contentType.includes("application/json")) {
          try {
            errorData = await response.json();
          } catch (e) {
            console.error("Failed to parse error response as JSON:", e);
          }
        } else {
          // Response is HTML or other format, get text instead
          try {
            const errorText = await response.text();
            console.error("Non-JSON error response:", errorText);
          } catch (e) {
            console.error("Failed to read error response:", e);
          }
        }

        console.error(
          "Failed to save question:",
          response.status,
          response.statusText,
          errorData
        );
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
        // Check if response is JSON before trying to parse
        const contentType = response.headers.get("content-type");
        let errorData = {};

        if (contentType && contentType.includes("application/json")) {
          try {
            errorData = await response.json();
          } catch (e) {
            console.error("Failed to parse error response as JSON:", e);
          }
        } else {
          // Response is HTML or other format, get text instead
          try {
            const errorText = await response.text();
            console.error("Non-JSON error response:", errorText);
          } catch (e) {
            console.error("Failed to read error response:", e);
          }
        }

        console.error(
          "Failed to delete question:",
          response.status,
          response.statusText,
          errorData
        );
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
        // Check if response is JSON before trying to parse
        const contentType = response.headers.get("content-type");
        let errorData = {};

        if (contentType && contentType.includes("application/json")) {
          try {
            errorData = await response.json();
          } catch (e) {
            console.error("Failed to parse error response as JSON:", e);
          }
        } else {
          // Response is HTML or other format, get text instead
          try {
            const errorText = await response.text();
            console.error("Non-JSON error response:", errorText);
          } catch (e) {
            console.error("Failed to read error response:", e);
          }
        }

        console.error(
          "Failed to duplicate question:",
          response.status,
          response.statusText,
          errorData
        );
      }
    } catch (error) {
      console.error("Error duplicating question:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <Skeleton className="h-8 w-64 mb-4" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="p-6">
          <Skeleton className="h-32 w-full mb-4" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
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
                {question.human_readable_id ||
                  (() => {
                    const board =
                      question.board === "IBDP" ? "IBDP" : question.board;
                    const subject =
                      question.subject === "HL"
                        ? "aahl"
                        : question.subject.toLowerCase();
                    const type = question.is_pyq ? "pyq" : "prac";

                    let number;
                    if (question.question_number) {
                      number = String(question.question_number).padStart(
                        4,
                        "0"
                      );
                    } else {
                      number = question.id.slice(-4).toUpperCase();
                    }

                    return `${board}_${subject}_${type}_${number}`;
                  })()}
              </h1>
              <p className="text-gray-600 mt-1">
                {question.total_marks} marks • {question.question_type} •
                Difficulty: {question.difficulty}/10
              </p>
              <div className="flex items-center gap-2 mt-2">
                {question.qa_status && (
                  <QAStatusBadge status={question.qa_status} size="sm" />
                )}
                {question.qa_priority && (
                  <QAPriorityBadge priority={question.qa_priority} size="sm" />
                )}
                {question.qa_flagged && (
                  <Badge variant="destructive" className="text-xs">
                    Flagged
                  </Badge>
                )}
              </div>
              <p className="text-sm text-gray-400 mt-1">
                UUID: {question.id.slice(0, 8)}...
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
            {question.human_readable_id ||
              (() => {
                const board =
                  question.board === "IBDP" ? "IBDP" : question.board;
                const subject =
                  question.subject === "HL"
                    ? "aahl"
                    : question.subject.toLowerCase();
                const type = question.is_pyq ? "pyq" : "prac";

                let number;
                if (question.question_number) {
                  number = String(question.question_number).padStart(4, "0");
                } else {
                  number = question.id.slice(-4).toUpperCase();
                }

                return `${board}_${subject}_${type}_${number}`;
              })()}
          </span>
        </nav>
      </div>

      {/* Sidebar Content - Moved Above */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {/* Question Details */}
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-gray-900">
              Question Details
            </h3>
            {editMode ? (
              <div className="space-y-2">
                <div>
                  <Label htmlFor="question_number" className="text-sm">
                    Question Number
                  </Label>
                  <Input
                    id="question_number"
                    value={question.question_number || ""}
                    onChange={(e) =>
                      setQuestion({
                        ...question,
                        question_number: e.target.value,
                      })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="total_marks" className="text-sm">
                    Total Marks
                  </Label>
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
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="difficulty" className="text-sm">
                    Difficulty (1-10)
                  </Label>
                  <Input
                    id="difficulty"
                    type="number"
                    min="1"
                    max="10"
                    value={question.difficulty || ""}
                    onChange={(e) =>
                      setQuestion({
                        ...question,
                        difficulty: parseInt(e.target.value) || 1,
                      })
                    }
                    className="mt-1"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-1 text-sm">
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
                  <span className="font-medium">{question.difficulty}/10</span>
                </div>
              </div>
            )}
          </div>

          {/* Subject & Board */}
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-gray-900">
              Subject & Board
            </h3>
            {editMode ? (
              <div className="space-y-2">
                <div>
                  <Label htmlFor="subject" className="text-sm">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    value={question.subject || ""}
                    onChange={(e) =>
                      setQuestion({ ...question, subject: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="board" className="text-sm">
                    Board
                  </Label>
                  <Input
                    id="board"
                    value={question.board || ""}
                    onChange={(e) =>
                      setQuestion({ ...question, board: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subject:</span>
                  <span className="font-medium">{question.subject}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Board:</span>
                  <span className="font-medium">{question.board}</span>
                </div>
              </div>
            )}
          </div>

          {/* Grade & Topic */}
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-gray-900">
              Grade & Topic
            </h3>
            {editMode ? (
              <div className="space-y-2">
                <div>
                  <Label htmlFor="grade" className="text-sm">
                    Grade
                  </Label>
                  <Input
                    id="grade"
                    value={question.grade || ""}
                    onChange={(e) =>
                      setQuestion({ ...question, grade: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="topic" className="text-sm">
                    Topic
                  </Label>
                  <Input
                    id="topic"
                    value={question.topic || ""}
                    onChange={(e) =>
                      setQuestion({ ...question, topic: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Grade:</span>
                  <span className="font-medium">{question.grade}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Topic:</span>
                  <span className="font-medium">{question.topic}</span>
                </div>
              </div>
            )}
          </div>

          {/* Chapter Tags */}
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-gray-900">
              Chapter Tags
            </h3>
            {editMode ? (
              <div>
                <Label htmlFor="tags" className="text-sm">
                  Chapter Tags
                </Label>
                <Textarea
                  id="tags"
                  value={(() => {
                    if (!question.tags) return "";
                    if (Array.isArray(question.tags)) {
                      return question.tags.join(", ");
                    } else if (typeof question.tags === "string") {
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
                  placeholder="Enter chapter tags separated by commas"
                  className="mt-1 min-h-[60px] text-sm"
                />
              </div>
            ) : (
              <div className="text-sm">
                {(() => {
                  let tagsArray: string[] = [];
                  if (question.tags) {
                    if (Array.isArray(question.tags)) {
                      tagsArray = question.tags;
                    } else if (typeof question.tags === "string") {
                      tagsArray = (question.tags as string)
                        .split(/[,;|]/)
                        .map((tag) => tag.trim())
                        .filter((tag) => tag.length > 0);
                    }
                  }
                  return tagsArray.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {tagsArray.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <span className="text-gray-500 text-xs">
                      No chapter tags assigned
                    </span>
                  );
                })()}
              </div>
            )}
          </div>

          {/* Paper Information */}
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-gray-900">
              Paper Information
            </h3>
            {editMode ? (
              <div className="space-y-2">
                <div>
                  <Label htmlFor="pyq_year" className="text-sm">
                    PYQ Year
                  </Label>
                  <Input
                    id="pyq_year"
                    type="number"
                    value={question.pyq_year || ""}
                    onChange={(e) =>
                      setQuestion({
                        ...question,
                        pyq_year: e.target.value
                          ? parseInt(e.target.value)
                          : null,
                      })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="month" className="text-sm">
                    Month
                  </Label>
                  <Input
                    id="month"
                    value={question.month || ""}
                    onChange={(e) =>
                      setQuestion({ ...question, month: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="paper_number" className="text-sm">
                    Paper Number
                  </Label>
                  <Input
                    id="paper_number"
                    type="number"
                    value={question.paper_number || ""}
                    onChange={(e) =>
                      setQuestion({
                        ...question,
                        paper_number: e.target.value
                          ? parseInt(e.target.value)
                          : null,
                      })
                    }
                    className="mt-1"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">PYQ Year:</span>
                  <span className="font-medium">
                    {question.pyq_year || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Month:</span>
                  <span className="font-medium">{question.month || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Paper Number:</span>
                  <span className="font-medium">
                    {question.paper_number || "N/A"}
                  </span>
                </div>
                {question.is_pyq && (
                  <div className="mt-2">
                    <Badge className="bg-blue-100 text-blue-800 text-xs">
                      Past Year Question
                    </Badge>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Side-by-Side Editing and Rendering */}
      <div className="flex h-screen">
        {/* Left Side - Editing */}
        <div className="flex-1 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-3 text-gray-900">
              Edit Question
            </h2>

            {/* Question Text */}
            <div className="mb-4">
              <Label htmlFor="question_text" className="text-sm font-medium">
                Question Text
              </Label>
              <Textarea
                id="question_text"
                value={question.question_text || ""}
                onChange={(e) =>
                  setQuestion({ ...question, question_text: e.target.value })
                }
                className="mt-2 min-h-[200px]"
                placeholder="Enter question text..."
              />
            </div>

            {/* Solution */}
            {question.explanation && (
              <div className="mb-6">
                <Label htmlFor="explanation" className="text-sm font-medium">
                  Solution
                </Label>
                <Textarea
                  id="explanation"
                  value={question.explanation || ""}
                  onChange={(e) =>
                    setQuestion({ ...question, explanation: e.target.value })
                  }
                  className="mt-2 min-h-[200px]"
                  placeholder="Enter solution..."
                />
              </div>
            )}

            {/* Solution Steps */}
            {question.solution_steps && question.solution_steps.length > 0 && (
              <div className="mb-6">
                <Label className="text-sm font-medium">Solution Steps</Label>
                <div className="mt-2 space-y-3">
                  {question.solution_steps.map((step, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded p-3"
                    >
                      <Label
                        htmlFor={`step_${index}`}
                        className="text-xs text-gray-600"
                      >
                        Step {index + 1}
                      </Label>
                      <Textarea
                        id={`step_${index}`}
                        value={step}
                        onChange={(e) => {
                          const newSteps = [...question.solution_steps];
                          newSteps[index] = e.target.value;
                          setQuestion({
                            ...question,
                            solution_steps: newSteps,
                          });
                        }}
                        className="mt-1 min-h-[100px]"
                        placeholder={`Enter step ${index + 1}...`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Image Upload Fields */}
            <div className="mb-6 space-y-4">
              <ImageUpload
                label="Question Image"
                value={question.image_url || ""}
                onChange={(url) => setQuestion({ ...question, image_url: url })}
                placeholder="Upload an image for the question"
              />

              <ImageUpload
                label="Solution Image"
                value={question.solution_image || ""}
                onChange={(url) =>
                  setQuestion({ ...question, solution_image: url })
                }
                placeholder="Upload an image for the solution"
              />
            </div>
          </div>
        </div>

        {/* Right Side - Rendering */}
        <div className="flex-1 bg-gray-50 overflow-y-auto">
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-3 text-gray-900">
              Live Preview
            </h2>

            {/* Question Preview */}
            <div className="mb-4 bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="font-medium mb-2 text-gray-900">Question</h3>

              {/* Question Image */}
              {question.image_url && (
                <div className="mb-4">
                  <ImageDisplay
                    src={question.image_url}
                    alt="Question diagram"
                    caption="Question diagram"
                    maxWidth={600}
                    maxHeight={400}
                  />
                </div>
              )}

              <div className="prose max-w-none">
                {renderMultiPartQuestion(question.question_text)}
              </div>
            </div>

            {/* Solution Preview */}
            {question.explanation && (
              <div className="mb-4 bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="font-medium mb-2 text-gray-900">Solution</h3>

                {/* Solution Image */}
                {question.solution_image && (
                  <div className="mb-4">
                    <ImageDisplay
                      src={question.solution_image}
                      alt="Solution diagram"
                      caption="Solution diagram"
                      maxWidth={600}
                      maxHeight={400}
                    />
                  </div>
                )}

                <div className="prose max-w-none">
                  {renderMultiPartQuestion(question.explanation)}
                </div>
              </div>
            )}

            {/* Solution Steps Preview */}
            {question.solution_steps && question.solution_steps.length > 0 && (
              <div className="mb-4 bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="font-medium mb-2 text-gray-900">
                  Solution Steps
                </h3>
                <div className="space-y-4">
                  {question.solution_steps.map((step, index) => (
                    <div
                      key={index}
                      className="border-l-4 border-blue-200 pl-4"
                    >
                      <div className="prose max-w-none">
                        {renderMultiPartQuestion(step)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* QA Management Section */}
      <div className="bg-white border-t border-gray-200 px-6 py-4">
        <QAManagement
          questionId={questionId}
          onStatusChange={async (newStatus) => {
            console.log(
              "🔄 QA status changed to:",
              newStatus,
              "- refreshing question data"
            );
            // Update local state immediately for optimistic UI
            if (question) {
              setQuestion({
                ...question,
                qa_status: newStatus as Question["qa_status"],
              });
            }
            // Then fetch fresh data from server
            await fetchQuestion();
          }}
        />
      </div>
    </div>
  );
}
