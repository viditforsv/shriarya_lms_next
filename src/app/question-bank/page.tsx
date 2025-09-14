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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components-demo/ui/select";
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
  created_at: string;
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
  qa_overall_rating?: number;
}

interface QuestionBankResponse {
  questions: Question[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export default function QuestionBankPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    subject: "",
    difficulty: "",
    question_type: "",
    board: "",
    grade: "",
    topic: "",
    is_pyq: "",
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const fetchQuestions = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        ...(searchTerm && { search: searchTerm }),
        ...(filters.subject && { subject: filters.subject }),
        ...(filters.difficulty && { difficulty: filters.difficulty }),
        ...(filters.question_type && { question_type: filters.question_type }),
        ...(filters.board && { board: filters.board }),
        ...(filters.grade && { grade: filters.grade }),
        ...(filters.topic && { topic: filters.topic }),
        ...(filters.is_pyq && { is_pyq: filters.is_pyq }),
      });

      const response = await fetch(`/api/question-bank?${params}`);
      const data: QuestionBankResponse = await response.json();

      setQuestions(data.questions);
      setPagination({
        page: data.page,
        limit: data.limit,
        total: data.total,
        totalPages: data.totalPages,
      });
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit, searchTerm, filters]);

  useEffect(() => {
    fetchQuestions();
  }, [pagination.page, pagination.limit, searchTerm, filters, fetchQuestions]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleFilterChange = (key: string, value: string) => {
    // If the value is empty or undefined, clear the filter
    const filterValue = value && value !== "" ? value : "";
    setFilters((prev) => ({ ...prev, [key]: filterValue }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const clearFilters = () => {
    setFilters({
      subject: "",
      difficulty: "",
      question_type: "",
      board: "",
      grade: "",
      topic: "",
      is_pyq: "",
    });
    setSearchTerm("");
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  // Check if any filters are active
  const hasActiveFilters = () => {
    return (
      searchTerm ||
      Object.values(filters).some((value) => value && value !== "")
    );
  };

  // Get count of active filters
  const getActiveFilterCount = () => {
    let count = 0;
    if (searchTerm) count++;
    Object.values(filters).forEach((value) => {
      if (value && value !== "") count++;
    });
    return count;
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

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Question Bank</h1>
            <p className="text-gray-600 mt-2">
              Manage and browse {pagination.total} IBDP Mathematics AA HL
              questions
            </p>
          </div>
          <Button onClick={() => router.push("/question-bank/new")}>
            <Plus className="w-4 h-4 mr-2" />
            Add Question
          </Button>
        </div>

        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500">
          <span>Dashboard</span>
          <span>/</span>
          <span className="text-gray-900 font-medium">Question Bank</span>
        </nav>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Search & Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select
              value={filters.difficulty || undefined}
              onValueChange={(value) => handleFilterChange("difficulty", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 - Very Easy</SelectItem>
                <SelectItem value="2">2 - Easy</SelectItem>
                <SelectItem value="3">3 - Easy-Medium</SelectItem>
                <SelectItem value="4">4 - Medium</SelectItem>
                <SelectItem value="5">5 - Medium-Hard</SelectItem>
                <SelectItem value="6">6 - Hard</SelectItem>
                <SelectItem value="7">7 - Very Hard</SelectItem>
                <SelectItem value="8">8 - Expert</SelectItem>
                <SelectItem value="9">9 - Master</SelectItem>
                <SelectItem value="10">10 - Legendary</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.question_type || undefined}
              onValueChange={(value) =>
                handleFilterChange("question_type", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Question Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mcq">Multiple Choice</SelectItem>
                <SelectItem value="subjective">Subjective</SelectItem>
                <SelectItem value="true_false">True/False</SelectItem>
                <SelectItem value="fill_blank">Fill in the Blank</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.is_pyq || undefined}
              onValueChange={(value) => handleFilterChange("is_pyq", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Question Source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Past Year Questions</SelectItem>
                <SelectItem value="false">Practice Questions</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Additional Filters Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <Select
              value={filters.board || undefined}
              onValueChange={(value) => handleFilterChange("board", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Board" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="IBDP">IBDP</SelectItem>
                <SelectItem value="CBSE">CBSE</SelectItem>
                <SelectItem value="ICSE">ICSE</SelectItem>
                <SelectItem value="IGCSE">IGCSE</SelectItem>
                <SelectItem value="A-Levels">A-Levels</SelectItem>
                <SelectItem value="SAT">SAT</SelectItem>
                <SelectItem value="ACT">ACT</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.subject || undefined}
              onValueChange={(value) => handleFilterChange("subject", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="IBDP Mathematics AA HL">IBDP Mathematics AA HL</SelectItem>
                <SelectItem value="IBDP Mathematics AI HL">IBDP Mathematics AI HL</SelectItem>
                <SelectItem value="IBDP Mathematics AA SL">IBDP Mathematics AA SL</SelectItem>
                <SelectItem value="IBDP Mathematics AI SL">IBDP Mathematics AI SL</SelectItem>
                <SelectItem value="CBSE Mathematics">CBSE Mathematics</SelectItem>
                <SelectItem value="ICSE Mathematics">ICSE Mathematics</SelectItem>
                <SelectItem value="IGCSE Mathematics">IGCSE Mathematics</SelectItem>
                <SelectItem value="A-Level Mathematics">A-Level Mathematics</SelectItem>
                <SelectItem value="SAT Mathematics">SAT Mathematics</SelectItem>
                <SelectItem value="ACT Mathematics">ACT Mathematics</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.grade || undefined}
              onValueChange={(value) => handleFilterChange("grade", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="9">Grade 9</SelectItem>
                <SelectItem value="10">Grade 10</SelectItem>
                <SelectItem value="11">Grade 11</SelectItem>
                <SelectItem value="12">Grade 12</SelectItem>
                <SelectItem value="13">Grade 13</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.topic || undefined}
              onValueChange={(value) => handleFilterChange("topic", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Topic" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Algebra">Algebra</SelectItem>
                <SelectItem value="Functions">Functions</SelectItem>
                <SelectItem value="Trigonometry">Trigonometry</SelectItem>
                <SelectItem value="Statistics">Statistics</SelectItem>
                <SelectItem value="Probability">Probability</SelectItem>
                <SelectItem value="Calculus">Calculus</SelectItem>
                <SelectItem value="Geometry">Geometry</SelectItem>
                <SelectItem value="Number Theory">Number Theory</SelectItem>
                <SelectItem value="Complex Numbers">Complex Numbers</SelectItem>
                <SelectItem value="Sequences and Series">Sequences and Series</SelectItem>
                <SelectItem value="Vectors">Vectors</SelectItem>
                <SelectItem value="Matrices">Matrices</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters() && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">
                    Active Filters ({getActiveFilterCount()})
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearFilters}
                  className="text-blue-600 border-blue-300 hover:bg-blue-100"
                >
                  <RotateCcw className="w-3 h-3 mr-1" />
                  Reset All
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {searchTerm && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Search: &quot;{searchTerm}&quot;
                    <X
                      className="w-3 h-3 cursor-pointer hover:text-red-600"
                      onClick={() => setSearchTerm("")}
                    />
                  </Badge>
                )}
                {Object.entries(filters).map(([key, value]) => {
                  if (!value || value === "") return null;
                  return (
                    <Badge key={key} variant="secondary" className="flex items-center gap-1">
                      {key.replace('_', ' ')}: {value}
                      <X
                        className="w-3 h-3 cursor-pointer hover:text-red-600"
                        onClick={() => handleFilterChange(key, "")}
                      />
                    </Badge>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              {hasActiveFilters() ? (
                <Button 
                  variant="outline" 
                  onClick={clearFilters}
                  className="flex items-center gap-2 text-orange-600 border-orange-300 hover:bg-orange-50"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset Filters
                </Button>
              ) : (
                <div className="text-sm text-gray-500 flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  No filters applied
                </div>
              )}

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
                  <SelectTrigger className="w-20">
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

            <div className="text-sm text-gray-500">
              Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
              {Math.min(pagination.page * pagination.limit, pagination.total)}{" "}
              of {pagination.total} questions
            </div>
          </div>
        </CardContent>
      </Card>

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
          {questions.map((question) => (
            <Card
              key={question.id}
              className="hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">
                      Question {question.question_number || `Q${question.id.slice(-6).toUpperCase()}`}
                    </CardTitle>
                    <p className="text-sm text-gray-500 mt-1">
                      {question.total_marks} marks • {question.question_type}
                    </p>
                  </div>
                  <Badge className={getDifficultyColor(question.difficulty)}>
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
                    <Badge key={index} variant="secondary" className="text-xs">
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
                  {question.qa_status && (
                    <QAStatusBadge status={question.qa_status} size="sm" />
                  )}
                  {question.qa_priority && (
                    <QAPriorityBadge
                      priority={question.qa_priority}
                      size="sm"
                    />
                  )}
                  {question.qa_flagged && (
                    <Badge
                      variant="destructive"
                      className="text-xs bg-red-100 text-red-800"
                    >
                      ⚠️ Flagged
                    </Badge>
                  )}
                  {question.qa_overall_rating && (
                    <Badge variant="outline" className="text-xs">
                      ⭐ {question.qa_overall_rating.toFixed(1)}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    {question.is_pyq && (
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                        PYQ {question.pyq_year}
                      </span>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        router.push(`/question-bank/${question.id}`)
                      }
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        router.push(`/question-bank/${question.id}/edit`)
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
  );
}
