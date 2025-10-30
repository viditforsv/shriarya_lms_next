"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components-demo/ui/ui-components/card";
import { Button } from "@/app/components-demo/ui/ui-components/button";
import { Badge } from "@/app/components-demo/ui/ui-components/badge";
import { Input } from "@/app/components-demo/ui/ui-components/input";
import { Breadcrumb } from "@/app/components-demo/ui/breadcrumb";
import {
  Plus,
  ChevronRight,
  ChevronDown,
  FileText,
  Edit,
  Trash2,
  BookOpen,
  ListChecks,
  CheckCircle,
  GripVertical,
} from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

interface QuestionType {
  id: string;
  name: string;
  description: string;
  count?: number;
  exampleQuestion?: {
    question: string;
    options?: string[];
    answer?: string;
  };
}

const DEFAULT_QUESTION_TYPES: QuestionType[] = [
  {
    id: "1",
    name: "Multiple Choice (MCQ)",
    description:
      "Questions with multiple options where students select one correct answer",
    count: 150,
    exampleQuestion: {
      question: "What is the derivative of f(x) = x² + 3x + 5?",
      options: ["2x + 3", "2x + 3x", "x² + 3", "3x + 5"],
      answer: "2x + 3",
    },
  },
  {
    id: "2",
    name: "Subjective/Short Answer",
    description: "Open-ended questions requiring written responses",
    count: 234,
    exampleQuestion: {
      question:
        "Explain the concept of limits in calculus with a practical example.",
      answer:
        "A limit describes the value that a function approaches as the input approaches a particular point. For example, as x approaches 0, the limit of sin(x)/x is 1.",
    },
  },
  {
    id: "3",
    name: "True/False",
    description: "Binary questions with true or false answers",
    count: 45,
    exampleQuestion: {
      question: "The derivative of a constant function is always zero.",
      options: ["True", "False"],
      answer: "True",
    },
  },
  {
    id: "4",
    name: "Fill in the Blank",
    description: "Questions requiring students to fill in missing information",
    count: 89,
    exampleQuestion: {
      question:
        "The Pythagorean theorem states that in a right triangle, a² + b² = _____",
      answer: "c²",
    },
  },
  {
    id: "5",
    name: "Match the Following",
    description:
      "Questions where students match items from two columns using dropdowns",
    count: 67,
    exampleQuestion: {
      question: "Match the following theorems with their applications:",
      options: [
        "Intermediate Value Theorem",
        "Mean Value Theorem",
        "L'Hospital's Rule",
      ],
      answer:
        "Evaluate limits of indeterminate forms → L'Hospital's Rule\nFind roots of continuous functions → Intermediate Value Theorem\nAnalyze function behavior over intervals → Mean Value Theorem",
    },
  },
  {
    id: "6",
    name: "Numerical",
    description:
      "Questions requiring numerical answers with accepted error margin",
    count: 0,
    exampleQuestion: {
      question: "Calculate the value of ∫₀¹ x² dx (accept answers within ±0.1)",
      answer: "0.333",
    },
  },
  {
    id: "7",
    name: "Ordering/Sequencing",
    description: "Questions where students arrange items in correct order",
    count: 0,
    exampleQuestion: {
      question:
        "Arrange the steps to solve a quadratic equation in the correct order:",
      options: [
        "Identify a, b, c coefficients",
        "Calculate discriminant: b² - 4ac",
        "Apply quadratic formula: x = (-b ± √D) / 2a",
        "Simplify and check solution",
      ],
      answer:
        "1. Identify coefficients\n2. Calculate discriminant\n3. Apply formula\n4. Simplify and check",
    },
  },
  {
    id: "8",
    name: "Multi-Select",
    description: "Questions where students can select multiple correct answers",
    count: 0,
    exampleQuestion: {
      question:
        "Which of the following are differentiable functions? (Select all that apply)",
      options: [
        "Polynomial functions",
        "Absolute value function |x|",
        "Exponential functions",
        "Step functions",
      ],
      answer: "Polynomial functions, Exponential functions",
    },
  },
];

// Draggable Item Component
function DraggableItem({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`cursor-grab active:cursor-grabbing ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      {children}
    </div>
  );
}

// Droppable Area Component
function DroppableArea({
  id,
  children,
  matched = false,
}: {
  id: string;
  children: React.ReactNode;
  matched?: boolean;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`p-3 border-2 rounded-sm transition-all ${
        isOver
          ? "border-blue-500 bg-blue-50"
          : matched
          ? "border-green-500 bg-green-50"
          : "border-gray-300"
      }`}
    >
      {children}
    </div>
  );
}

export default function QuestionTypesPage() {
  const [questionTypes, setQuestionTypes] = useState<QuestionType[]>(
    DEFAULT_QUESTION_TYPES
  );
  const [selectedType, setSelectedType] = useState<string>("1");
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["all"])
  );
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, string | string[]>
  >({});
  const [showAnswer, setShowAnswer] = useState<Record<string, boolean>>({});
  const leftItems = [
    { id: "left-1", text: "Evaluate limits of indeterminate forms" },
    { id: "left-2", text: "Find roots of continuous functions" },
    { id: "left-3", text: "Analyze function behavior over intervals" },
  ];

  const rightItems = [
    { id: "right-1", text: "L'Hospital's Rule" },
    { id: "right-2", text: "Intermediate Value Theorem" },
    { id: "right-3", text: "Mean Value Theorem" },
  ];

  const [matches, setMatches] = useState<Record<string, string>>({});
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(useSensor(PointerSensor));

  // Correct answers mapping
  const correctMatches: Record<string, string> = {
    "left-1": "right-1", // Evaluate limits → L'Hospital's Rule
    "left-2": "right-2", // Find roots → Intermediate Value Theorem
    "left-3": "right-3", // Analyze behavior → Mean Value Theorem
  };

  const selectedQuestionType = questionTypes.find(
    (type) => type.id === selectedType
  );

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const handleAdd = () => {
    if (!formData.name.trim()) return;

    const newType: QuestionType = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description || "",
      count: 0,
    };

    setQuestionTypes([...questionTypes, newType]);
    setFormData({ name: "", description: "" });
    setIsAdding(false);
  };

  const handleEdit = () => {
    if (!formData.name.trim() || !editingId) return;

    setQuestionTypes(
      questionTypes.map((type) =>
        type.id === editingId
          ? { ...type, name: formData.name, description: formData.description }
          : type
      )
    );

    setFormData({ name: "", description: "" });
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this question type?")) {
      setQuestionTypes(questionTypes.filter((type) => type.id !== id));
      if (selectedType === id && questionTypes.length > 1) {
        setSelectedType(questionTypes[0].id);
      }
    }
  };

  const handleAnswerSelect = (
    questionId: string,
    answer: string | string[]
  ) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answer,
    });
  };

  const handleCheckAnswer = (questionId: string) => {
    setShowAnswer({
      ...showAnswer,
      [questionId]: true,
    });
  };

  const isAnswerCorrect = (questionId: string) => {
    const selected = selectedAnswers[questionId];
    const question = questionTypes.find((q) => q.id === questionId);
    if (!question?.exampleQuestion) return false;

    return (
      selected === question.exampleQuestion.answer ||
      (typeof selected === "string" &&
        question.exampleQuestion.answer?.includes(selected))
    );
  };

  const handleDragStart = (event: DragEndEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    // If dragging from left column to right column, create a match
    if (
      active.id.toString().startsWith("left-") &&
      over.id.toString().startsWith("right-")
    ) {
      setMatches({
        ...matches,
        [active.id.toString()]: over.id.toString(),
      });
    }
  };

  const isItemMatched = (itemId: string) => {
    return (
      Object.keys(matches).includes(itemId) ||
      Object.values(matches).includes(itemId)
    );
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <div className="w-80 bg-card border-r border-border flex flex-col sticky top-0">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold text-foreground">
              Question Types
            </h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Manage question categories
          </p>
        </div>

        {/* Types List */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            <div className="space-y-1">
              {questionTypes.map((type) => {
                const isActive = type.id === selectedType;
                return (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-sm transition-colors ${
                      isActive
                        ? "bg-[#e27447] text-white font-medium"
                        : "hover:bg-muted/50 text-foreground"
                    }`}
                  >
                    <ListChecks className="w-4 h-4" />
                    <div className="flex-1">
                      <div className="font-medium">{type.name}</div>
                      <div className="text-xs opacity-70">
                        {type.count || 0} questions
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <Button
            className="w-full bg-[#e27447] hover:bg-[#d1653a]"
            onClick={() => setIsAdding(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Type
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto px-8 py-8">
          {/* Breadcrumbs */}
          <div className="mb-6">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Admin", href: "/admin/site-administration" },
                { label: "Question Types", isActive: true },
              ]}
            />
          </div>

          {/* Add New Type Form */}
          {isAdding && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Add New Question Type</CardTitle>
                <CardDescription>
                  Create a new question type for your question bank
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Type Name
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g., Essay Question"
                    className="rounded-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Describe this question type..."
                    className="w-full px-3 py-2 border rounded-sm resize-none"
                    rows={3}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleAdd}>Add Type</Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsAdding(false);
                      setFormData({ name: "", description: "" });
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Selected Type Details */}
          {selectedQuestionType && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-foreground">
                    {selectedQuestionType.name}
                  </h1>
                  <p className="text-muted-foreground mt-2">
                    {selectedQuestionType.description}
                  </p>
                </div>
                <Badge className="bg-blue-100 text-blue-700 border-blue-300 text-lg px-4 py-2">
                  {selectedQuestionType.count || 0} questions
                </Badge>
              </div>

              {editingId === selectedQuestionType.id ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Edit Question Type</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Type Name
                      </label>
                      <Input
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="Type name"
                        className="rounded-sm"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Description
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                        placeholder="Description"
                        className="w-full px-3 py-2 border rounded-sm resize-none"
                        rows={3}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleEdit}>Save Changes</Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setEditingId(null);
                          setFormData({ name: "", description: "" });
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {selectedQuestionType.description}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Example Question */}
                  {selectedQuestionType.exampleQuestion && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Example Question</CardTitle>
                        <CardDescription>
                          Preview of how this question type looks
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="p-4 bg-muted rounded-sm">
                          <p className="font-medium mb-3">
                            {selectedQuestionType.exampleQuestion.question}
                          </p>

                          {/* Fill in the Blank Input */}
                          {selectedQuestionType.id === "4" && (
                            <div className="space-y-3">
                              <Input
                                value={
                                  (selectedAnswers[selectedType] as string) ||
                                  ""
                                }
                                onChange={(e) =>
                                  handleAnswerSelect(
                                    selectedType,
                                    e.target.value
                                  )
                                }
                                placeholder="Enter your answer"
                                className="rounded-sm"
                                disabled={showAnswer[selectedType]}
                              />
                            </div>
                          )}

                          {/* Numerical Input */}
                          {selectedQuestionType.id === "6" && (
                            <div className="space-y-3">
                              <Input
                                type="number"
                                step="0.001"
                                value={
                                  (selectedAnswers[selectedType] as string) ||
                                  ""
                                }
                                onChange={(e) =>
                                  handleAnswerSelect(
                                    selectedType,
                                    e.target.value
                                  )
                                }
                                placeholder="Enter numerical value"
                                className="rounded-sm"
                                disabled={showAnswer[selectedType]}
                              />
                              <p className="text-xs text-muted-foreground">
                                Acceptable range: Answer ± 0.1
                              </p>
                            </div>
                          )}

                          {/* Multi-Select Checkboxes */}
                          {selectedQuestionType.id === "8" &&
                            selectedQuestionType.exampleQuestion.options && (
                              <div className="space-y-2">
                                {selectedQuestionType.exampleQuestion.options.map(
                                  (option, idx) => {
                                    const selectedAnswersArray =
                                      (selectedAnswers[
                                        selectedType
                                      ] as string[]) || [];
                                    const isSelected =
                                      selectedAnswersArray.includes(option);

                                    return (
                                      <label
                                        key={idx}
                                        className="flex items-center space-x-3 p-3 border rounded-sm cursor-pointer hover:bg-gray-50 transition-all"
                                      >
                                        <input
                                          type="checkbox"
                                          checked={isSelected}
                                          onChange={(e) => {
                                            const currentAnswers =
                                              selectedAnswersArray;
                                            if (e.target.checked) {
                                              handleAnswerSelect(selectedType, [
                                                ...currentAnswers,
                                                option,
                                              ]);
                                            } else {
                                              handleAnswerSelect(
                                                selectedType,
                                                currentAnswers.filter(
                                                  (ans) => ans !== option
                                                )
                                              );
                                            }
                                          }}
                                          disabled={showAnswer[selectedType]}
                                          className="w-4 h-4"
                                        />
                                        <span className="flex-1 text-sm">
                                          {option}
                                        </span>
                                      </label>
                                    );
                                  }
                                )}
                              </div>
                            )}

                          {/* Match the Following - Moodle Style */}
                          {selectedQuestionType.id === "5" && (
                            <div className="space-y-4">
                              <p className="text-sm text-muted-foreground mb-3">
                                Match each theorem with its application
                              </p>
                              <div className="max-w-3xl">
                                {leftItems.map((leftItem, idx) => {
                                  const matchId = matches[leftItem.id] || "";
                                  const matchedRight = rightItems.find(
                                    (r) => r.id === matchId
                                  );
                                  const hasMatch = matchId !== "";

                                  return (
                                    <div
                                      key={leftItem.id}
                                      className="flex items-center gap-4 py-3 border-b last:border-b-0"
                                    >
                                      {/* Left Column - Label */}
                                      <div className="flex items-center space-x-3 min-w-[280px]">
                                        <span className="font-semibold text-gray-600 w-6">
                                          {String.fromCharCode(65 + idx)}.
                                        </span>
                                        <span className="flex-1 text-sm">
                                          {leftItem.text}
                                        </span>
                                      </div>

                                      {/* Middle - Dropdown */}
                                      <div className="flex-1 relative">
                                        <select
                                          value={matchId}
                                          onChange={(e) => {
                                            const newMatch = e.target.value;
                                            setMatches((prev) => {
                                              // Remove any existing match for this left item
                                              const updated = { ...prev };
                                              delete updated[leftItem.id];

                                              // Remove any other left item that was matched to this right item
                                              Object.keys(updated).forEach(
                                                (key) => {
                                                  if (
                                                    updated[key] === newMatch
                                                  ) {
                                                    delete updated[key];
                                                  }
                                                }
                                              );

                                              // Add new match
                                              if (newMatch) {
                                                updated[leftItem.id] = newMatch;
                                              }

                                              return updated;
                                            });
                                          }}
                                          className={`w-full px-3 py-2 border-2 rounded-sm focus:outline-none transition-all ${
                                            hasMatch && showAnswer[selectedType]
                                              ? "border-green-500 bg-green-50"
                                              : "border-gray-300 focus:border-blue-500"
                                          }`}
                                        >
                                          <option value="">
                                            Select a Match
                                          </option>
                                          {rightItems.map((rightItem) => (
                                            <option
                                              key={rightItem.id}
                                              value={rightItem.id}
                                            >
                                              {rightItem.text}
                                            </option>
                                          ))}
                                        </select>
                                        {hasMatch &&
                                          showAnswer[selectedType] && (
                                            <CheckCircle className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 text-green-600 pointer-events-none" />
                                          )}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          {/* Interactive MCQ Options */}
                          {selectedQuestionType.exampleQuestion.options &&
                            selectedQuestionType.id !== "4" && (
                              <div className="space-y-2">
                                {selectedQuestionType.exampleQuestion.options.map(
                                  (option, idx) => {
                                    const isSelected =
                                      selectedAnswers[selectedType] === option;
                                    const isCorrect =
                                      showAnswer[selectedType] &&
                                      option ===
                                        selectedQuestionType.exampleQuestion
                                          ?.answer;
                                    const isWrong =
                                      showAnswer[selectedType] &&
                                      isSelected &&
                                      !isCorrect;

                                    return (
                                      <button
                                        key={idx}
                                        onClick={() =>
                                          !showAnswer[selectedType] &&
                                          handleAnswerSelect(
                                            selectedType,
                                            option
                                          )
                                        }
                                        disabled={showAnswer[selectedType]}
                                        className={`w-full flex items-center space-x-2 p-3 border rounded-sm transition-all cursor-pointer ${
                                          isSelected
                                            ? "bg-blue-50 border-blue-500"
                                            : "hover:bg-gray-50"
                                        } ${
                                          isCorrect
                                            ? "bg-green-50 border-green-500"
                                            : ""
                                        } ${
                                          isWrong
                                            ? "bg-red-50 border-red-500"
                                            : ""
                                        } ${
                                          showAnswer[selectedType]
                                            ? "cursor-not-allowed"
                                            : ""
                                        }`}
                                      >
                                        <div
                                          className={`w-6 h-6 flex items-center justify-center border-2 rounded-sm text-sm font-medium ${
                                            isSelected || isCorrect
                                              ? "bg-[#e27447] border-[#e27447] text-white"
                                              : "border-[#e27447] text-[#e27447]"
                                          }`}
                                        >
                                          {String.fromCharCode(65 + idx)}
                                        </div>
                                        <span className="flex-1 text-left">
                                          {option}
                                        </span>
                                        {showAnswer[selectedType] &&
                                          isCorrect && (
                                            <CheckCircle className="w-5 h-5 text-green-600" />
                                          )}
                                        {showAnswer[selectedType] &&
                                          isWrong && (
                                            <span className="text-red-600 text-sm">
                                              ✗
                                            </span>
                                          )}
                                      </button>
                                    );
                                  }
                                )}
                              </div>
                            )}

                          {/* Action Buttons */}
                          <div className="mt-4 flex gap-2">
                            {selectedAnswers[selectedType] &&
                              !showAnswer[selectedType] && (
                                <Button
                                  onClick={() =>
                                    handleCheckAnswer(selectedType)
                                  }
                                  className="bg-[#e27447] hover:bg-[#d1653a]"
                                >
                                  Check Answer
                                </Button>
                              )}
                            <Button
                              variant="outline"
                              onClick={() => {
                                setSelectedAnswers({
                                  ...selectedAnswers,
                                  [selectedType]: "",
                                });
                                setShowAnswer({
                                  ...showAnswer,
                                  [selectedType]: false,
                                });
                              }}
                            >
                              Reset
                            </Button>
                          </div>

                          {/* Answer Display */}
                          {showAnswer[selectedType] &&
                            selectedQuestionType.exampleQuestion.answer && (
                              <div
                                className={`mt-4 p-3 border rounded-sm ${
                                  isAnswerCorrect(selectedType)
                                    ? "bg-green-50 border-green-200"
                                    : "bg-red-50 border-red-200"
                                }`}
                              >
                                <p
                                  className={`text-sm font-medium mb-1 ${
                                    isAnswerCorrect(selectedType)
                                      ? "text-green-800"
                                      : "text-red-800"
                                  }`}
                                >
                                  {isAnswerCorrect(selectedType)
                                    ? "✓ Correct!"
                                    : "✗ Incorrect"}
                                </p>
                                <p className="text-sm text-green-700 whitespace-pre-line">
                                  <span className="font-medium">
                                    Correct Answer:{" "}
                                  </span>
                                  {selectedQuestionType.exampleQuestion.answer}
                                </p>
                              </div>
                            )}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setEditingId(selectedQuestionType.id);
                        setFormData({
                          name: selectedQuestionType.name,
                          description: selectedQuestionType.description,
                        });
                      }}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleDelete(selectedQuestionType.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                    <Button variant="outline" className="ml-auto">
                      <BookOpen className="w-4 h-4 mr-2" />
                      View Questions ({selectedQuestionType.count || 0})
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
