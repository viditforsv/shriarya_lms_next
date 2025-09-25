"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components-demo/ui/ui-components/button";
import { Input } from "@/app/components-demo/ui/ui-components/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components-demo/ui/ui-components/card";
import { Badge } from "@/app/components-demo/ui/ui-components/badge";
import { Label } from "@/app/components-demo/ui/ui-components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components-demo/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components-demo/ui/dialog";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  Eye,
  Edit,
  Plus,
  RotateCcw,
  X,
} from "lucide-react";
import { QAStatusBadge, QAPriorityBadge } from "@/components/QAComponents";
import { Skeleton } from "@/app/components-demo/ui/ui-components/skeleton";
import QuestionBankQueryBuilder from "@/components/QuestionBankQueryBuilder";

interface Question {
  id: string;
  question_number: string;
  question_text: string;
  total_marks: number;
  difficulty: number;
  tags: string[];
  subject: string;
  boards: string[]; // Changed from board (string) to boards (array)
  course_types: string[]; // Added
  levels: string[]; // Added
  relevance: string[]; // Added
  grade: string;
  topic: string;
  subtopic: string;
  question_type: string;
  is_pyq: boolean;
  pyq_year: number;
  month: string;
  paper_number: number;
  created_at: string;
  human_readable_id?: string;
  question_display_number?: number;
  // QA fields
  qa_questions?: {
    qa_status?:
      | "pending"
      | "in_review"
      | "needs_revision"
      | "approved"
      | "rejected"
      | "archived";
    priority_level?: "low" | "medium" | "high" | "urgent";
    is_flagged?: boolean;
    overall_rating?: number;
  }[];
}

interface QuestionBankResponse {
  questions: Question[];
  total: number;
  totalQuestions: number;
  page: number;
  limit: number;
  totalPages: number;
}

export default function QuestionBankPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [advancedQuery, setAdvancedQuery] = useState<any>(null);

  // Simple filters state
  const [simpleFilters, setSimpleFilters] = useState({
    boards: "any",
    course_types: "any",
    levels: "any",
    subject: "any",
    topic: "",
    tags: "",
    difficulty: "any",
    question_type: "any",
    is_pyq: "any",
    qa_status: "any",
    priority_level: "any",
    is_flagged: "any",
  });

  const fetchQuestions = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        ...(searchTerm && { search: searchTerm }),
      });

      // Add simple filters
      Object.entries(simpleFilters).forEach(([key, value]) => {
        if (value && value !== "any") {
          params.append(key, value);
        }
      });

      // Add advanced query if available
      if (advancedQuery) {
        params.append("advanced_filters", JSON.stringify(advancedQuery));
      }

      const response = await fetch(`/api/question-bank?${params}`);

      if (response.ok) {
        const data: QuestionBankResponse = await response.json();
        setQuestions(data.questions);
        setPagination({
          page: data.page,
          limit: data.limit,
          total: data.total,
          totalPages: data.totalPages,
        });
        setTotalQuestions(data.totalQuestions || data.total);
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
          "Failed to fetch questions:",
          response.status,
          response.statusText,
          errorData
        );
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setLoading(false);
    }
  }, [
    pagination.page,
    pagination.limit,
    searchTerm,
    simpleFilters,
    advancedQuery,
  ]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleSimpleFilterChange = (key: string, value: string) => {
    setSimpleFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const clearAllFilters = () => {
    setSimpleFilters({
      difficulty: "any",
      boards: "any",
      course_types: "any",
      levels: "any",
      question_type: "any",
      is_pyq: "any",
      subject: "any",
      qa_status: "any",
      priority_level: "any",
      is_flagged: "any",
    });
    setAdvancedQuery(null);
    setSearchTerm("");
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  // Check if any filters are active
  const hasActiveFilters = () => {
    const hasSimpleFilters = Object.values(simpleFilters).some(
      (value) => value !== "any"
    );
    return searchTerm || hasSimpleFilters || advancedQuery;
  };

  const goToPage = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  const truncateText = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 3) return "bg-green-100 text-green-800";
    if (difficulty <= 6) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  // Get human-readable ID for display (use database-stored or fallback to generation)
  const getHumanReadableId = (question: Question, index?: number) => {
    // Use database-stored human-readable ID if available
    if (question.human_readable_id) {
      return question.human_readable_id;
    }

    // Fallback to generation for backward compatibility
    const board =
      question.boards && question.boards.length > 0
        ? question.boards[0]
        : "IBDP";
    const courseType =
      question.course_types && question.course_types.length > 0
        ? question.course_types[0]
        : "AA";
    const level =
      question.levels && question.levels.length > 0 ? question.levels[0] : "HL";
    const subject = question.subject?.toLowerCase() || "mathematics";
    const type = question.is_pyq ? "pyq" : "prac";

    let number;
    if (question.question_number && question.question_number !== "na") {
      number = String(question.question_number).padStart(4, "0");
    } else if (index !== undefined) {
      number = String(index + 1).padStart(4, "0");
    } else {
      number = question.id.slice(-4).toUpperCase();
    }

    return `${board}_${courseType.toLowerCase()}_${level.toLowerCase()}_${type}_${number}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Question Bank
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Manage and browse {pagination.total} Mathematics questions
              </p>
            </div>
            <Button
              onClick={() => router.push("/question-bank/new")}
              className="bg-orange-600 hover:bg-orange-700 text-white rounded-sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Question
            </Button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Filter Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 p-4">
          <div className="space-y-4">
            {/* Search */}
            <div>
              <Label
                htmlFor="search"
                className="text-sm font-medium text-gray-700"
              >
                Search Questions
              </Label>
              <div className="relative mt-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  type="text"
                  placeholder="Search by question text..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10 rounded-sm"
                />
              </div>
            </div>

            {/* Simple Filters */}
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Quick Filters
              </h3>

              {/* 1. Board */}
              <div className="mb-3">
                <Label className="text-xs text-gray-600">Board</Label>
                <Select
                  value={simpleFilters.boards}
                  onValueChange={(value) =>
                    handleSimpleFilterChange("boards", value)
                  }
                >
                  <SelectTrigger className="h-8 rounded-sm">
                    <SelectValue placeholder="Any board" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any board</SelectItem>
                    <SelectItem value="IBDP">IBDP</SelectItem>
                    <SelectItem value="CBSE">CBSE</SelectItem>
                    <SelectItem value="ICSE">ICSE</SelectItem>
                    <SelectItem value="IGCSE">IGCSE</SelectItem>
                    <SelectItem value="A-Levels">A-Levels</SelectItem>
                    <SelectItem value="SAT">SAT</SelectItem>
                    <SelectItem value="ACT">ACT</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 2. Course Type */}
              <div className="mb-3">
                <Label className="text-xs text-gray-600">Course Type</Label>
                <Select
                  value={simpleFilters.course_types}
                  onValueChange={(value) =>
                    handleSimpleFilterChange("course_types", value)
                  }
                >
                  <SelectTrigger className="h-8 rounded-sm">
                    <SelectValue placeholder="Any course type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any course type</SelectItem>
                    <SelectItem value="AA">AA</SelectItem>
                    <SelectItem value="AI">AI</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 3. Level */}
              <div className="mb-3">
                <Label className="text-xs text-gray-600">Level</Label>
                <Select
                  value={simpleFilters.levels}
                  onValueChange={(value) =>
                    handleSimpleFilterChange("levels", value)
                  }
                >
                  <SelectTrigger className="h-8 rounded-sm">
                    <SelectValue placeholder="Any level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any level</SelectItem>
                    <SelectItem value="SL">SL</SelectItem>
                    <SelectItem value="HL">HL</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 4. Section */}
              <div className="mb-3">
                <Label className="text-xs text-gray-600">Section</Label>
                <Select
                  value={simpleFilters.subject}
                  onValueChange={(value) =>
                    handleSimpleFilterChange("subject", value)
                  }
                >
                  <SelectTrigger className="h-8 rounded-sm">
                    <SelectValue placeholder="Any section" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any section</SelectItem>
                    <SelectItem value="mathematics">Mathematics</SelectItem>
                    <SelectItem value="physics">Physics</SelectItem>
                    <SelectItem value="chemistry">Chemistry</SelectItem>
                    <SelectItem value="biology">Biology</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="history">History</SelectItem>
                    <SelectItem value="geography">Geography</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 5. Topic */}
              <div className="mb-3">
                <Label className="text-xs text-gray-600">Topic</Label>
                <Input
                  placeholder="Enter topic..."
                  value={simpleFilters.topic || ""}
                  onChange={(e) =>
                    handleSimpleFilterChange("topic", e.target.value)
                  }
                  className="h-8 rounded-sm"
                />
              </div>

              {/* 6. Tags */}
              <div className="mb-3">
                <Label className="text-xs text-gray-600">Tags</Label>
                <Input
                  placeholder="Enter tags (comma-separated)..."
                  value={simpleFilters.tags || ""}
                  onChange={(e) =>
                    handleSimpleFilterChange("tags", e.target.value)
                  }
                  className="h-8 rounded-sm"
                />
              </div>

              {/* Other Filters */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                <h4 className="text-xs font-medium text-gray-600 mb-3">
                  Other Filters
                </h4>
              </div>

              {/* Difficulty */}
              <div className="mb-3">
                <Label className="text-xs text-gray-600">Difficulty</Label>
                <Select
                  value={simpleFilters.difficulty}
                  onValueChange={(value) =>
                    handleSimpleFilterChange("difficulty", value)
                  }
                >
                  <SelectTrigger className="h-8 rounded-sm">
                    <SelectValue placeholder="Any difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any difficulty</SelectItem>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="6">6</SelectItem>
                    <SelectItem value="7">7</SelectItem>
                    <SelectItem value="8">8</SelectItem>
                    <SelectItem value="9">9</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Question Type */}
              <div className="mb-3">
                <Label className="text-xs text-gray-600">Question Type</Label>
                <Select
                  value={simpleFilters.question_type}
                  onValueChange={(value) =>
                    handleSimpleFilterChange("question_type", value)
                  }
                >
                  <SelectTrigger className="h-8 rounded-sm">
                    <SelectValue placeholder="Any type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any type</SelectItem>
                    <SelectItem value="mcq">MCQ</SelectItem>
                    <SelectItem value="subjective">Subjective</SelectItem>
                    <SelectItem value="true_false">True/False</SelectItem>
                    <SelectItem value="fill_blank">
                      Fill in the Blank
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* PYQ Filter */}
              <div className="mb-3">
                <Label className="text-xs text-gray-600">
                  Previous Year Question
                </Label>
                <Select
                  value={simpleFilters.is_pyq}
                  onValueChange={(value) =>
                    handleSimpleFilterChange("is_pyq", value)
                  }
                >
                  <SelectTrigger className="h-8 rounded-sm">
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="true">PYQ Only</SelectItem>
                    <SelectItem value="false">Practice Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* QA Status Filters */}
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Quality Assurance
              </h3>

              {/* QA Status */}
              <div className="mb-3">
                <Label className="text-xs text-gray-600">QA Status</Label>
                <Select
                  value={simpleFilters.qa_status}
                  onValueChange={(value) =>
                    handleSimpleFilterChange("qa_status", value)
                  }
                >
                  <SelectTrigger className="h-8 rounded-sm">
                    <SelectValue placeholder="Any status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in_review">In Review</SelectItem>
                    <SelectItem value="needs_revision">
                      Needs Revision
                    </SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Priority Level */}
              <div className="mb-3">
                <Label className="text-xs text-gray-600">Priority Level</Label>
                <Select
                  value={simpleFilters.priority_level}
                  onValueChange={(value) =>
                    handleSimpleFilterChange("priority_level", value)
                  }
                >
                  <SelectTrigger className="h-8 rounded-sm">
                    <SelectValue placeholder="Any priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any priority</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Flagged Status */}
              <div className="mb-3">
                <Label className="text-xs text-gray-600">Flagged Status</Label>
                <Select
                  value={simpleFilters.is_flagged}
                  onValueChange={(value) =>
                    handleSimpleFilterChange("is_flagged", value)
                  }
                >
                  <SelectTrigger className="h-8 rounded-sm">
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="true">Flagged Only</SelectItem>
                    <SelectItem value="false">Not Flagged</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Advanced Query Builder Modal */}
            <div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full rounded-sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Advanced Filters
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Advanced Query Builder</DialogTitle>
                  </DialogHeader>
                  <QuestionBankQueryBuilder
                    onQueryChange={(query) => {
                      setAdvancedQuery(query);
                      setPagination((prev) => ({ ...prev, page: 1 }));
                    }}
                    initialQuery={advancedQuery}
                  />
                </DialogContent>
              </Dialog>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters() && (
              <div>
                <Button
                  variant="outline"
                  onClick={clearAllFilters}
                  className="w-full rounded-sm text-red-600 border-red-300 hover:bg-red-50"
                >
                  <X className="h-4 w-4 mr-2" />
                  Clear All Filters
                </Button>
              </div>
            )}

            {/* Active Filters Summary */}
            {hasActiveFilters() && (
              <div className="text-sm text-gray-600">
                <div className="font-medium mb-1">Active Filters:</div>
                {searchTerm && (
                  <div className="text-xs">• Search: "{searchTerm}"</div>
                )}
                {Object.entries(simpleFilters).map(
                  ([key, value]) =>
                    value &&
                    value !== "any" && (
                      <div key={key} className="text-xs">
                        • {key.replace("_", " ")}: {value}
                      </div>
                    )
                )}
                {advancedQuery && (
                  <div className="text-xs">• Advanced Query Active</div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
              <span>Dashboard</span>
              <span>/</span>
              <span className="text-gray-900 font-medium">Question Bank</span>
            </nav>

            {/* Results Summary */}
            <div className="mb-6 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-600">
                  Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
                  {Math.min(
                    pagination.page * pagination.limit,
                    pagination.total
                  )}{" "}
                  of {pagination.total} {hasActiveFilters() ? "filtered " : ""}
                  questions
                  {hasActiveFilters() && totalQuestions > pagination.total && (
                    <span className="text-gray-400 ml-1">
                      (from {totalQuestions} total questions)
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Show:</span>
                <Select
                  value={pagination.limit.toString()}
                  onValueChange={(value) => {
                    setPagination((prev) => ({
                      ...prev,
                      limit: parseInt(value),
                      page: 1,
                    }));
                  }}
                >
                  <SelectTrigger className="w-20 rounded-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="15">15</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                  </SelectContent>
                </Select>
                <span className="text-sm text-gray-600">per page</span>
              </div>
            </div>

            {/* Questions Grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i}>
                    <CardHeader>
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-20 w-full mb-4" />
                      <div className="flex space-x-2">
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="h-6 w-20" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {questions.map((question, index) => (
                  <Card
                    key={question.id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">
                            {getHumanReadableId(question, index)}
                          </CardTitle>
                          <p className="text-sm text-gray-500 mt-1">
                            {question.total_marks} marks •{" "}
                            {question.question_type}
                          </p>
                          {/* Paper Information */}
                          {(question.pyq_year ||
                            question.month ||
                            question.paper_number) && (
                            <p className="text-xs text-gray-500 mt-1">
                              {question.pyq_year &&
                                `Year: ${question.pyq_year}`}
                              {question.month && ` • Month: ${question.month}`}
                              {question.paper_number &&
                                ` • Paper: ${question.paper_number}`}
                            </p>
                          )}
                          <p className="text-xs text-gray-400 mt-1">
                            UUID: {question.id.slice(0, 8)}...
                          </p>
                        </div>
                        <Badge
                          className={getDifficultyColor(question.difficulty)}
                        >
                          {question.difficulty}/10
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {truncateText(question.question_text)}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {(question.tags || []).slice(0, 3).map((tag, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                        {(question.tags || []).length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{(question.tags || []).length - 3} more
                          </Badge>
                        )}
                      </div>

                      {/* QA Status Display */}
                      <div className="flex items-center gap-2 mb-4">
                        {question.qa_questions &&
                          question.qa_questions.length > 0 && (
                            <>
                              <QAStatusBadge
                                status={
                                  question.qa_questions[0].qa_status ||
                                  "pending"
                                }
                                size="sm"
                              />
                              {question.qa_questions[0].priority_level && (
                                <QAPriorityBadge
                                  priority={
                                    question.qa_questions[0].priority_level
                                  }
                                  size="sm"
                                />
                              )}
                              {question.qa_questions[0].is_flagged && (
                                <Badge
                                  variant="destructive"
                                  className="text-xs bg-red-100 text-red-800"
                                >
                                  ⚠️ Flagged
                                </Badge>
                              )}
                              {question.qa_questions[0].overall_rating && (
                                <Badge variant="outline" className="text-xs">
                                  ⭐{" "}
                                  {question.qa_questions[0].overall_rating.toFixed(
                                    1
                                  )}
                                </Badge>
                              )}
                            </>
                          )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {question.is_pyq && (
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                              PYQ {question.pyq_year || "N/A"}
                            </span>
                          )}
                          {question.boards && question.boards.length > 0 && (
                            <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                              {question.boards.join(", ")}
                            </span>
                          )}
                          {question.course_types &&
                            question.course_types.length > 0 && (
                              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
                                {question.course_types.join(", ")}
                              </span>
                            )}
                          {question.levels && question.levels.length > 0 && (
                            <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-xs">
                              {question.levels.join(", ")}
                            </span>
                          )}
                          {question.relevance &&
                            question.relevance.length > 0 && (
                              <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">
                                {question.relevance.join(", ")}
                              </span>
                            )}
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              window.open(
                                `/question-bank/${question.id}`,
                                "_blank"
                              )
                            }
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              window.open(
                                `/question-bank/${question.id}/edit`,
                                "_blank"
                              )
                            }
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 mt-8">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => goToPage(pagination.page - 1)}
                  disabled={pagination.page === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>

                <div className="flex items-center space-x-1">
                  {(() => {
                    const totalPages = pagination.totalPages;
                    const currentPage = pagination.page;
                    const pages = [];

                    // Always show first page
                    if (totalPages > 0) {
                      pages.push(1);
                    }

                    // Show pages around current page
                    const start = Math.max(2, currentPage - 1);
                    const end = Math.min(totalPages - 1, currentPage + 1);

                    // Add ellipsis if there's a gap
                    if (start > 2) {
                      pages.push("...");
                    }

                    // Add pages around current page
                    for (let i = start; i <= end; i++) {
                      if (i !== 1 && i !== totalPages) {
                        pages.push(i);
                      }
                    }

                    // Add ellipsis if there's a gap
                    if (end < totalPages - 1) {
                      pages.push("...");
                    }

                    // Always show last page (if more than 1 page)
                    if (totalPages > 1) {
                      pages.push(totalPages);
                    }

                    return pages.map((page, index) =>
                      page === "..." ? (
                        <span
                          key={`ellipsis-${index}`}
                          className="px-2 text-gray-500"
                        >
                          ...
                        </span>
                      ) : (
                        <Button
                          key={page}
                          variant={currentPage === page ? "primary" : "outline"}
                          size="sm"
                          onClick={() => goToPage(page as number)}
                        >
                          {page}
                        </Button>
                      )
                    );
                  })()}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => goToPage(pagination.page + 1)}
                  disabled={pagination.page === pagination.totalPages}
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
