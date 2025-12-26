"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/design-system/components/ui/button";
import { Input } from "@/design-system/components/ui/input";
import { Textarea } from "@/design-system/components/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/design-system/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/design-system/components/select";
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  FileQuestion,
  CheckSquare,
  HelpCircle,
  Type,
} from "lucide-react";
import { Label } from "@/design-system/components/ui/label";
import { Switch } from "@/design-system/components/switch";
import ImageUpload from "@/components/ImageUpload";
import { RichTextEditor } from "@/components/RichTextEditor";
import { SUBJECTS } from "@/lib/constants/subjects";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/design-system/components/popover";
import { Search, Check, ChevronDown } from "lucide-react";

interface QuestionForm {
  question_number: string;
  question_text: string;
  total_marks: number;
  difficulty: number;
  tags: string[];
  subject: string;
  boards: string[];
  course_types: string[];
  levels: string[];
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

const questionTypes = [
  {
    value: "mcq",
    label: "Multiple Choice Question",
    icon: CheckSquare,
    description: "Question with multiple options where one is correct",
    color: "from-blue-500 to-blue-600",
  },
  {
    value: "subjective",
    label: "Subjective Question",
    icon: FileQuestion,
    description: "Open-ended question requiring detailed written answer",
    color: "from-purple-500 to-purple-600",
  },
  {
    value: "true_false",
    label: "True or False",
    icon: HelpCircle,
    description: "Binary choice question with True or False answers",
    color: "from-green-500 to-green-600",
  },
  {
    value: "fill_blank",
    label: "Fill in the Blank",
    icon: Type,
    description: "Question with missing word or phrase to be filled",
    color: "from-amber-500 to-amber-600",
  },
];

export default function NewQuestionTypePage() {
  const router = useRouter();
  const params = useParams();
  const questionType = params?.type as string;

  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<QuestionForm>({
    question_number: "",
    question_text: "",
    total_marks: 1,
    difficulty: 5,
    tags: [],
    subject: "IBDP Mathematics AA HL",
    boards: ["IBDP"],
    course_types: ["AA"],
    levels: ["Grade 12"],
    grade: "12",
    topic: "",
    subtopic: "",
    question_type: questionType || "subjective",
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

  const [saveError, setSaveError] = useState<string | null>(null);
  const [subjectSearch, setSubjectSearch] = useState("");
  const [subjectOpen, setSubjectOpen] = useState(false);

  // Validate question type on mount
  useEffect(() => {
    const validTypes = questionTypes.map((t) => t.value);
    if (questionType && !validTypes.includes(questionType)) {
      router.push("/question-bank/new");
    } else if (questionType) {
      setFormData((prev) => ({ ...prev, question_type: questionType }));
    }
  }, [questionType, router]);

  const selectedType = questionTypes.find((t) => t.value === questionType);

  const handleSave = async () => {
    setSaving(true);
    setSaveError(null);

    try {
      // Trim image URLs to prevent Next.js errors about trailing spaces
      const dataToSave = {
        ...formData,
        image_url: formData.image_url?.trim() || "",
        solution_image: formData.solution_image?.trim() || "",
      };

      const response = await fetch("/api/question-bank", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSave),
      });

      if (response.ok) {
        const newQuestion = await response.json();
        router.push(`/question-bank/${newQuestion.id}`);
      } else {
        const errorData = await response.json();
        const errorMessage =
          errorData.error || errorData.message || "Failed to create question";
        console.error("API Error:", errorMessage, errorData);
        setSaveError(errorMessage);
        alert(`Error: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error creating question:", error);
      setSaveError(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
      alert("Error creating question. Check console for details.");
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

  // MCQ Options Management
  const addOption = () => {
    const newOption = {
      value: String.fromCharCode(65 + formData.options.length), // A, B, C, D...
      label: "",
    };
    setFormData((prev) => ({
      ...prev,
      options: [...prev.options, newOption],
    }));
  };

  const removeOption = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index),
    }));
  };

  const updateOption = (index: number, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      options: prev.options.map((opt, i) =>
        i === index ? { ...opt, [field]: value } : opt
      ),
    }));
  };

  if (!selectedType) {
    return null; // Will redirect
  }

  const Icon = selectedType.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-emerald-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => router.push("/question-bank/new")}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Create New {selectedType.label}
                </h1>
                <p className="text-muted-foreground mt-1">
                  {selectedType.description}
                </p>
              </div>
            </div>

            <Button
              onClick={handleSave}
              disabled={saving}
              className="bg-primary hover:bg-primary/90"
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? "Creating..." : "Create Question"}
            </Button>
          </div>

          {/* Breadcrumbs */}
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Dashboard</span>
            <span>/</span>
            <button
              onClick={() => router.push("/question-bank")}
              className="hover:text-foreground"
            >
              Question Bank
            </button>
            <span>/</span>
            <button
              onClick={() => router.push("/question-bank/new")}
              className="hover:text-foreground"
            >
              New Question
            </button>
            <span>/</span>
            <span className="text-foreground font-medium">
              {selectedType.label}
            </span>
          </nav>
        </div>

        {/* Error Display */}
        {saveError && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
            <p className="text-red-700 font-medium">Error: {saveError}</p>
            <button
              onClick={() => setSaveError(null)}
              className="text-red-600 hover:text-red-800 text-sm mt-2"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Question Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                      handleInputChange(
                        "total_marks",
                        parseInt(e.target.value)
                      )
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
                      handleInputChange(
                        "difficulty",
                        parseInt(e.target.value)
                      )
                    }
                  />
                </div>

                <div>
                  <Label>Question Type</Label>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border">
                    {Icon && <Icon className="w-4 h-4 text-primary" />}
                    <span className="font-medium">{selectedType.label}</span>
                  </div>
                </div>

                <div>
                  <Label htmlFor="boards">Boards (comma-separated)</Label>
                  <Input
                    id="boards"
                    value={formData.boards.join(", ")}
                    onChange={(e) => {
                      const boards = e.target.value
                        .split(",")
                        .map((b) => b.trim())
                        .filter((b) => b);
                      handleInputChange("boards", boards);
                    }}
                    placeholder="e.g., CBSE, IBDP, ICSE"
                  />
                </div>

                <div>
                  <Label htmlFor="course_types">
                    Course Types (comma-separated)
                  </Label>
                  <Input
                    id="course_types"
                    value={formData.course_types.join(", ")}
                    onChange={(e) => {
                      const types = e.target.value
                        .split(",")
                        .map((t) => t.trim())
                        .filter((t) => t);
                      handleInputChange("course_types", types);
                    }}
                    placeholder="e.g., AA, HL, SL"
                  />
                </div>

                <div>
                  <Label htmlFor="levels">Levels (comma-separated)</Label>
                  <Input
                    id="levels"
                    value={formData.levels.join(", ")}
                    onChange={(e) => {
                      const levels = e.target.value
                        .split(",")
                        .map((l) => l.trim())
                        .filter((l) => l);
                      handleInputChange("levels", levels);
                    }}
                    placeholder="e.g., Grade 9, Grade 10, Grade 11"
                  />
                </div>

                <div>
                  <Label htmlFor="topic">Topic</Label>
                  <Input
                    id="topic"
                    value={formData.topic}
                    onChange={(e) =>
                      handleInputChange("topic", e.target.value)
                    }
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
                  <Label htmlFor="subject">Subject</Label>
                  <Popover open={subjectOpen} onOpenChange={setSubjectOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className="w-full justify-between"
                      >
                        <span className="truncate">
                          {formData.subject || "Select subject..."}
                        </span>
                        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                      <div className="p-2">
                        <div className="relative">
                          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Search subjects..."
                            value={subjectSearch}
                            onChange={(e) => setSubjectSearch(e.target.value)}
                            className="pl-8"
                          />
                        </div>
                      </div>
                      <div className="max-h-[300px] overflow-auto">
                        {SUBJECTS.filter((subject) =>
                          subject
                            .toLowerCase()
                            .includes(subjectSearch.toLowerCase())
                        ).length === 0 ? (
                          <div className="p-4 text-center text-sm text-muted-foreground">
                            No subjects found
                          </div>
                        ) : (
                          SUBJECTS.filter((subject) =>
                            subject
                              .toLowerCase()
                              .includes(subjectSearch.toLowerCase())
                          ).map((subject) => (
                            <div
                              key={subject}
                              className="flex items-center px-2 py-1.5 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground"
                              onClick={() => {
                                handleInputChange("subject", subject);
                                setSubjectOpen(false);
                                setSubjectSearch("");
                              }}
                            >
                              <Check
                                className={`mr-2 h-4 w-4 ${
                                  formData.subject === subject
                                    ? "opacity-100"
                                    : "opacity-0"
                                }`}
                              />
                              {subject}
                            </div>
                          ))
                        )}
                      </div>
                    </PopoverContent>
                  </Popover>
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
                          handleInputChange(
                            "pyq_year",
                            parseInt(e.target.value)
                          )
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
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Question Text */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {Icon && (
                    <div
                      className={`w-8 h-8 bg-gradient-to-br ${selectedType.color} rounded-lg flex items-center justify-center`}
                    >
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                  )}
                  Question Content
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Question Text */}
                <div>
                  <Label htmlFor="question_text">
                    Question Text *
                    {formData.question_type === "fill_blank" && (
                      <span className="text-xs text-muted-foreground ml-2">
                        (Use _____ to indicate blanks)
                      </span>
                    )}
                  </Label>
                  <RichTextEditor
                    content={formData.question_text}
                    onChange={(content) =>
                      handleInputChange("question_text", content)
                    }
                    placeholder={
                      formData.question_type === "mcq"
                        ? "Enter the question stem (e.g., What is the value of x in the equation $2x + 5 = 15$?)"
                        : formData.question_type === "true_false"
                        ? "Enter a statement (e.g., The sum of angles in a triangle is 180°)"
                        : formData.question_type === "fill_blank"
                        ? "Enter the question with _____ for blanks (e.g., The derivative of $x^2$ is _____)"
                        : "Enter the question text with LaTeX math notation..."
                    }
                  />
                </div>

                {/* MCQ Options - Integrated into Question Content */}
                {formData.question_type === "mcq" && (
                  <div className="border-t pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <Label className="text-base font-semibold flex items-center gap-2">
                        <CheckSquare className="w-5 h-5 text-blue-600" />
                        Answer Options
                      </Label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={addOption}
                        className="border-blue-300 text-blue-700 hover:bg-blue-100"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Option
                      </Button>
                    </div>

                    {formData.options.length === 0 ? (
                      <div className="text-center py-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                        <CheckSquare className="w-10 h-10 mx-auto mb-3 text-gray-400" />
                        <p className="text-sm text-muted-foreground mb-3">
                          No options added yet. Click &quot;Add Option&quot; to
                          start.
                        </p>
                        <Button
                          onClick={addOption}
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add First Option
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {formData.options.map(
                          (option: Record<string, unknown>, index) => {
                            const optionValue =
                              typeof option.value === "string"
                                ? option.value
                                : String.fromCharCode(65 + index);
                            const isCorrect =
                              formData.correct_answer === optionValue;
                            return (
                              <div
                                key={index}
                                className={`flex gap-3 items-start p-3 bg-white border-2 rounded-lg transition-all ${
                                  isCorrect
                                    ? "border-green-500 bg-green-50 shadow-sm"
                                    : "border-gray-200 hover:border-blue-300"
                                }`}
                              >
                                {/* Radio button for correct answer */}
                                <div className="flex items-center pt-2">
                                  <input
                                    type="radio"
                                    name="correct_option"
                                    checked={isCorrect}
                                    onChange={() =>
                                      handleInputChange(
                                        "correct_answer",
                                        optionValue
                                      )
                                    }
                                    className="w-5 h-5 text-green-600 focus:ring-green-500 cursor-pointer"
                                    title="Mark as correct answer"
                                  />
                                </div>

                                {/* Option letter/value */}
                                <div className="shrink-0 w-12">
                                  <Label className="text-xs font-semibold text-gray-600 mb-1 block">
                                    Option
                                  </Label>
                                  <Input
                                    value={optionValue}
                                    onChange={(e) =>
                                      updateOption(
                                        index,
                                        "value",
                                        e.target.value
                                      )
                                    }
                                    placeholder="A"
                                    className="h-9 font-bold text-center text-lg"
                                  />
                                </div>

                                {/* Option text */}
                                <div className="flex-1">
                                  <Label className="text-xs font-semibold text-gray-600 mb-1 block">
                                    Option Text
                                  </Label>
                                  <Textarea
                                    value={
                                      typeof option.label === "string"
                                        ? option.label
                                        : ""
                                    }
                                    onChange={(e) =>
                                      updateOption(
                                        index,
                                        "label",
                                        e.target.value
                                      )
                                    }
                                    placeholder="Enter option text (LaTeX supported: use $ for math)"
                                    className="min-h-[70px] resize-none"
                                  />
                                </div>

                                {/* Delete button */}
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => removeOption(index)}
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50 shrink-0 mt-6"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            );
                          }
                        )}
                      </div>
                    )}

                    {formData.options.length > 0 && (
                      <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-xs text-blue-800">
                          <strong>💡 Tip:</strong> Click the radio button (○)
                          next to the correct option to mark it. The correct
                          option will be highlighted in green.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Solution/Explanation */}
                <div className="border-t pt-6">
                  <Label htmlFor="explanation">Solution/Explanation</Label>
                  <Textarea
                    id="explanation"
                    value={formData.explanation}
                    onChange={(e) =>
                      handleInputChange("explanation", e.target.value)
                    }
                    className="min-h-[150px] mt-2"
                    placeholder="Enter the solution or explanation..."
                  />
                </div>

                {/* Correct Answer (for non-MCQ types) */}
                {formData.question_type !== "mcq" && (
                  <div>
                    <Label htmlFor="correct_answer">Correct Answer *</Label>
                    <Input
                      id="correct_answer"
                      value={formData.correct_answer}
                      onChange={(e) =>
                        handleInputChange("correct_answer", e.target.value)
                      }
                      className="mt-2"
                      placeholder={
                        formData.question_type === "true_false"
                          ? "True or False"
                          : formData.question_type === "fill_blank"
                          ? "e.g., 2x"
                          : "Enter the correct answer..."
                      }
                    />
                  </div>
                )}

                {/* Images */}
                <div className="border-t pt-6 space-y-4">
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
                </div>
              </CardContent>
            </Card>

            {/* True/False Helper - Only show for True/False type */}
            {formData.question_type === "true_false" && (
              <Card className="border-2 border-green-200 bg-green-50/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-green-600" />
                    True/False Question
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-sm text-green-800 mb-3">
                      <strong>Instructions:</strong>
                    </p>
                    <ul className="text-xs text-green-700 space-y-1 ml-4 list-disc">
                      <li>
                        Write a clear statement in the Question Text field
                      </li>
                      <li>
                        Enter &quot;True&quot; or &quot;False&quot; in the
                        Correct Answer field
                      </li>
                      <li>
                        No need to add options - they are automatically
                        &quot;True&quot; and &quot;False&quot;
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Fill in the Blank Helper - Only show for Fill Blank type */}
            {formData.question_type === "fill_blank" && (
              <Card className="border-2 border-amber-200 bg-amber-50/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Type className="w-5 h-5 text-amber-600" />
                    Fill in the Blank Question
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <p className="text-sm text-amber-800 mb-3">
                      <strong>Instructions:</strong>
                    </p>
                    <ul className="text-xs text-amber-700 space-y-1 ml-4 list-disc">
                      <li>
                        Use underscores (_____ ) in the Question Text to
                        indicate blanks
                      </li>
                      <li>
                        Example: &quot;The derivative of $x^2$ is _____&quot;
                      </li>
                      <li>
                        Enter the correct answer in the Correct Answer field
                        (e.g., &quot;2x&quot;)
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Subjective Helper - Only show for Subjective type */}
            {formData.question_type === "subjective" && (
              <Card className="border-2 border-purple-200 bg-purple-50/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileQuestion className="w-5 h-5 text-purple-600" />
                    Subjective Question
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <p className="text-sm text-purple-800 mb-3">
                      <strong>Instructions:</strong>
                    </p>
                    <ul className="text-xs text-purple-700 space-y-1 ml-4 list-disc">
                      <li>Write your question with clear instructions</li>
                      <li>
                        Can include multiple parts (a, b, c) for complex
                        questions
                      </li>
                      <li>
                        LaTeX math notation is supported ($...$ for inline,
                        $$...$$ for block)
                      </li>
                      <li>
                        Correct Answer is optional (for reference/grading
                        rubric)
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
