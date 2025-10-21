"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components-demo/ui/ui-components/button";
import { Input } from "@/app/components-demo/ui/ui-components/input";
import { Textarea } from "@/app/components-demo/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components-demo/ui/ui-components/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components-demo/ui/select";
import { ArrowLeft, Save } from "lucide-react";
import { Label } from "@/app/components-demo/ui/ui-components/label";
import { Switch } from "@/app/components-demo/ui/switch";
import ImageUpload from "@/components/ImageUpload";

interface QuestionForm {
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
}

export default function NewQuestionPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<QuestionForm>({
    question_number: "",
    question_text: "",
    total_marks: 1,
    difficulty: 5,
    tags: [],
    subject: "IBDP Mathematics AA HL",
    board: "IBDP",
    grade: "12",
    topic: "",
    subtopic: "",
    question_type: "subjective",
    is_pyq: false,
    pyq_year: new Date().getFullYear(),
    month: "",
    paper_number: 1,
    "Time Zone": "",
    explanation: "",
    correct_answer: "",
    calculator: "",
    solution_steps: [],
    solution_image: "",
    image_url: "",
    mark_allocation: null,
    options: [],
    source: "IBDP",
    paper_type: "",
    year: new Date().getFullYear(),
  });

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch("/api/question-bank", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newQuestion = await response.json();
        router.push(`/question-bank/${newQuestion.id}`);
      } else {
        console.error("Failed to create question");
      }
    } catch (error) {
      console.error("Error creating question:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (
    field: keyof QuestionForm,
    value:
      | string
      | number
      | boolean
      | string[]
      | Record<string, unknown>[]
      | Record<string, unknown>
      | null
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTagsChange = (value: string) => {
    const tags = value
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag);
    setFormData((prev) => ({ ...prev, tags }));
  };

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
                Create New Question
              </h1>
              <p className="text-gray-600 mt-1">
                Add a new question to the IBDP Mathematics AA HL question bank
              </p>
            </div>
          </div>

          <Button onClick={handleSave} disabled={saving}>
            <Save className="w-4 h-4 mr-2" />
            {saving ? "Creating..." : "Create Question"}
          </Button>
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
          <span className="text-gray-900 font-medium">New Question</span>
        </nav>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Question Text */}
          <Card>
            <CardHeader>
              <CardTitle>Question Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="question_text">Question Text *</Label>
                <Textarea
                  id="question_text"
                  value={formData.question_text}
                  onChange={(e) =>
                    handleInputChange("question_text", e.target.value)
                  }
                  className="min-h-[200px]"
                  placeholder="Enter the question text with LaTeX math notation..."
                />
              </div>

              <div>
                <Label htmlFor="explanation">Solution/Explanation</Label>
                <Textarea
                  id="explanation"
                  value={formData.explanation}
                  onChange={(e) =>
                    handleInputChange("explanation", e.target.value)
                  }
                  className="min-h-[150px]"
                  placeholder="Enter the solution or explanation..."
                />
              </div>

              <div>
                <Label htmlFor="correct_answer">Correct Answer</Label>
                <Input
                  id="correct_answer"
                  value={formData.correct_answer}
                  onChange={(e) =>
                    handleInputChange("correct_answer", e.target.value)
                  }
                  placeholder="Enter the correct answer..."
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Question Details */}
          <Card>
            <CardHeader>
              <CardTitle>Question Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="question_number">Question Number</Label>
                <Input
                  id="question_number"
                  value={formData.question_number}
                  onChange={(e) =>
                    handleInputChange("question_number", e.target.value)
                  }
                  placeholder="e.g., 1, 2a, 3b"
                />
              </div>

              <div>
                <Label htmlFor="total_marks">Total Marks</Label>
                <Input
                  id="total_marks"
                  type="number"
                  min="1"
                  value={formData.total_marks}
                  onChange={(e) =>
                    handleInputChange("total_marks", parseInt(e.target.value))
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
                  value={formData.difficulty}
                  onChange={(e) =>
                    handleInputChange("difficulty", parseInt(e.target.value))
                  }
                />
              </div>

              <div>
                <Label htmlFor="question_type">Question Type</Label>
                <Select
                  value={formData.question_type}
                  onValueChange={(value) =>
                    handleInputChange("question_type", value)
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
                  value={formData.topic}
                  onChange={(e) => handleInputChange("topic", e.target.value)}
                  placeholder="e.g., Calculus, Algebra"
                />
              </div>

              <div>
                <Label htmlFor="subtopic">Subtopic</Label>
                <Input
                  id="subtopic"
                  value={formData.subtopic}
                  onChange={(e) =>
                    handleInputChange("subtopic", e.target.value)
                  }
                  placeholder="e.g., Derivatives, Integration"
                />
              </div>

              <div>
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  value={formData.tags.join(", ")}
                  onChange={(e) => handleTagsChange(e.target.value)}
                  placeholder="e.g., calculus, derivatives, limits"
                />
              </div>
            </CardContent>
          </Card>

          {/* Past Year Question Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Past Year Question Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_pyq"
                  checked={formData.is_pyq}
                  onCheckedChange={(checked) =>
                    handleInputChange("is_pyq", checked)
                  }
                />
                <Label htmlFor="is_pyq">This is a Past Year Question</Label>
              </div>

              {formData.is_pyq && (
                <>
                  <div>
                    <Label htmlFor="pyq_year">PYQ Year</Label>
                    <Input
                      id="pyq_year"
                      type="number"
                      value={formData.pyq_year}
                      onChange={(e) =>
                        handleInputChange("pyq_year", parseInt(e.target.value))
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="month">Month</Label>
                    <Select
                      value={formData.month}
                      onValueChange={(value) =>
                        handleInputChange("month", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select month" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="May">May</SelectItem>
                        <SelectItem value="Nov">November</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="paper_number">Paper Number</Label>
                    <Select
                      value={formData.paper_number.toString()}
                      onValueChange={(value) =>
                        handleInputChange("paper_number", parseInt(value))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Paper 1</SelectItem>
                        <SelectItem value="2">Paper 2</SelectItem>
                        <SelectItem value="3">Paper 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="time_zone">Time Zone</Label>
                    <Select
                      value={formData["Time Zone"]}
                      onValueChange={(value) =>
                        handleInputChange("Time Zone", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select time zone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="TZ0">TZ0</SelectItem>
                        <SelectItem value="TZ1">TZ1</SelectItem>
                        <SelectItem value="TZ2">TZ2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Additional Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="calculator">Calculator Policy</Label>
                <Select
                  value={formData.calculator}
                  onValueChange={(value) =>
                    handleInputChange("calculator", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select calculator policy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Calculator Allowed">
                      Calculator Allowed
                    </SelectItem>
                    <SelectItem value="Calculator Not Allowed">
                      Calculator Not Allowed
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <ImageUpload
                label="Question Image"
                value={formData.image_url}
                onChange={(url) => handleInputChange("image_url", url)}
                placeholder="Upload an image for the question"
              />

              <ImageUpload
                label="Solution Image"
                value={formData.solution_image}
                onChange={(url) => handleInputChange("solution_image", url)}
                placeholder="Upload an image for the solution"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
