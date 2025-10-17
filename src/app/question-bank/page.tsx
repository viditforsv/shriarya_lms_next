"use client";

/**
 * QUESTION BANK PAGE - Guidelines and Architecture
 * ================================================
 *
 * This page provides a comprehensive interface for browsing, filtering, and managing
 * mathematics questions in the ShriArya LMS system.
 *
 * SIDEBAR FUNCTIONALITY GUIDELINES:
 * ================================
 *
 * 1. SEARCH FUNCTIONALITY:
 *    - Supports text search across question content, tags, topics, and human-readable IDs
 *    - Handles UUID patterns and human-readable ID patterns automatically
 *    - Real-time search with debouncing to prevent excessive API calls
 *
 * 2. QUICK FILTERS SECTION:
 *    - Board: Filter by educational board (CBSE, IBDP, ICSE, etc.)
 *    - Course Type: Filter by course type (AA, HL, SL, etc.)
 *    - Level: Filter by academic level (Grade 9, Grade 10, etc.)
 *    - Subject: Filter by subject area (Mathematics, Physics, etc.)
 *    - Topic: Text-based topic filtering with partial matching
 *    - Tags: Comma-separated tag filtering with overlap matching
 *    - Difficulty: Numeric difficulty rating (1-10 scale)
 *    - Question Type: Filter by question format (MCQ, Short Answer, etc.)
 *    - PYQ Filter: Toggle between Past Year Questions and Practice Questions
 *
 * 3. QUALITY ASSURANCE FILTERS:
 *    - QA Status: Filter by review status (pending, approved, rejected, etc.)
 *    - Priority Level: Filter by QA priority (low, medium, high, urgent)
 *    - Flagged Status: Filter by flagged questions requiring attention
 *
 *    ⚠️ CRITICAL CONSTRAINT: Supabase has a 1000-row limit per query
 *       - QA filtering must fetch limited data (currently set to 2000 max)
 *       - Deduplication happens in-memory after fetching
 *       - If we exceed limits, we need to implement pagination for QA data fetching
 *
 * 4. ADVANCED FILTERS:
 *    - Currently disabled due to build issues
 *    - Future: Complex query builder for advanced filtering combinations
 *
 * 5. FILTER MANAGEMENT:
 *    - Clear All Filters: Reset all filters to default state
 *    - Active Filters Summary: Shows currently applied filters
 *    - Filter persistence: Maintains filter state during navigation
 *
 * MAIN CONTENT AREA:
 * ==================
 * - Displays questions in responsive grid layout (1-3 columns based on screen size)
 * - Shows question preview with math rendering
 * - Displays QA status badges and metadata
 * - Provides quick actions (View, Edit) for each question
 * - Implements pagination for large question sets
 *
 * PERFORMANCE CONSIDERATIONS & CONSTRAINTS:
 * ==========================================
 *
 * ⚠️ **CRITICAL: Supabase 1000-Row Query Limit**
 * This is the most important constraint affecting our implementation:
 *
 * 1. **Problem**: Supabase limits each query to 1000 rows
 *    - When filtering by QA status (e.g., "pending"), we may have 10,000+ questions
 *    - Direct filtering would hit this limit and cause "Bad Request" errors
 *
 * 2. **Current Solution** (implemented in /api/question-bank/route.ts):
 *    a. Fetch up to 2000 QA records (ordered by updated_at DESC)
 *    b. Deduplicate in-memory to get latest QA per question
 *    c. Apply status filters AFTER deduplication
 *    d. Use filtered question IDs to fetch actual question data
 *
 * 3. **Trade-offs**:
 *    ✅ Avoids hitting the 1000-row limit
 *    ✅ Ensures we only show latest QA status per question
 *    ⚠️ May not capture all questions if there are 2000+ unique questions with QA records
 *    ⚠️ If this becomes an issue, we need to implement:
 *       - Pagination for QA data fetching
 *       - Server-side aggregation/materialized views
 *       - Separate QA status cache table
 *
 * 4. **Other Optimizations**:
 *    - Uses efficient API filtering to reduce data transfer
 *    - Implements pagination to handle large question sets (10 per page default)
 *    - Caches filter options to reduce API calls
 *    - Optimized QA status filtering with in-memory deduplication
 */

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
  X,
} from "lucide-react";
import { QAStatusBadge, QAPriorityBadge } from "@/components/QAComponents";
import { Skeleton } from "@/app/components-demo/ui/ui-components/skeleton";
import { renderMultiPartQuestion } from "@/components/MathRenderer";
// import QuestionBankQueryBuilder from "@/components/QuestionBankQueryBuilder";

/**
 * Question Interface - Represents a single question in the question bank
 * Includes all metadata, content, and QA information
 */
interface Question {
  id: string; // Unique identifier (UUID)
  question_number: string; // Human-readable question number
  question_text: string; // Main question content (LaTeX supported)
  total_marks: number; // Total marks for the question
  difficulty: number; // Difficulty rating (1-10 scale)
  tags: string[]; // Array of topic tags
  subject: string; // Subject area (e.g., "Mathematics")
  boards: string[]; // Educational boards (CBSE, IBDP, etc.)
  course_types: string[]; // Course types (AA, HL, SL, etc.)
  levels: string[]; // Academic levels (Grade 9, Grade 10, etc.)
  relevance: string[]; // Relevance tags
  grade: string; // Grade level
  topic: string; // Main topic
  subtopic: string; // Subtopic
  question_type: string; // Type of question (MCQ, Short Answer, etc.)
  is_pyq: boolean; // Whether this is a Past Year Question
  pyq_year: number; // Year of the past year question
  month: string; // Month of the exam
  paper_number: number; // Paper number
  created_at: string; // Creation timestamp
  human_readable_id?: string; // Human-readable identifier
  question_display_number?: number; // Display number
  // QA (Quality Assurance) fields - latest QA record for this question
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

/**
 * API Response Interface - Response structure from the question bank API
 */
interface QuestionBankResponse {
  questions: Question[]; // Array of questions for current page
  total: number; // Total number of questions matching current filters
  totalQuestions: number; // Total questions in database (unfiltered)
  page: number; // Current page number
  limit: number; // Number of questions per page
  totalPages: number; // Total number of pages
}

/**
 * Filter Options Interface - Available filter options fetched from API
 * Used to populate dropdown menus in the sidebar
 */
interface FilterOptions {
  boards: string[]; // Available educational boards
  course_types: string[]; // Available course types
  levels: string[]; // Available academic levels
  subjects: string[]; // Available subjects
  topics: string[]; // Available topics
  difficulties: number[]; // Available difficulty levels
  question_types: string[]; // Available question types
  grades: string[]; // Available grades
  has_pyq: boolean; // Whether PYQ questions exist
  has_practice: boolean; // Whether practice questions exist
  qa_statuses: string[]; // Available QA statuses
  priority_levels: string[]; // Available priority levels
}

/**
 * MAIN QUESTION BANK PAGE COMPONENT
 * =================================
 *
 * This component provides the complete question bank interface with:
 * - Left sidebar with comprehensive filtering options
 * - Main content area with question grid and pagination
 * - Search functionality with real-time filtering
 * - QA status management and display
 */
export default function QuestionBankPage() {
  const router = useRouter();

  // ===== CORE STATE MANAGEMENT =====

  // Question data and loading states
  const [questions, setQuestions] = useState<Question[]>([]); // Current page questions
  const [loading, setLoading] = useState(true); // Loading state for questions
  const [error, setError] = useState<string | null>(null); // Error state

  // Search functionality
  const [searchTerm, setSearchTerm] = useState(""); // Current search term

  // Pagination state
  const [pagination, setPagination] = useState({
    page: 1, // Current page number
    limit: 10, // Questions per page
    total: 0, // Total questions matching filters
    totalPages: 0, // Total number of pages
  });

  // Additional pagination data
  const [totalQuestions, setTotalQuestions] = useState(0); // Total questions in database

  // Advanced filtering (currently disabled)
  const [advancedQuery, setAdvancedQuery] = useState<Record<
    string,
    unknown
  > | null>(null);

  // Filter options fetched from API
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    boards: [],
    course_types: [],
    levels: [],
    subjects: [],
    topics: [],
    difficulties: [],
    question_types: [],
    grades: [],
    has_pyq: false,
    has_practice: false,
    qa_statuses: [],
    priority_levels: [],
  });

  // Filter loading state
  const [loadingFilters, setLoadingFilters] = useState(true);

  // ===== FILTER STATE MANAGEMENT =====

  // Simple filters state - stores current filter selections
  // "any" means no filter applied, specific values filter by that criteria
  const [simpleFilters, setSimpleFilters] = useState({
    boards: "any", // Educational board filter
    course_types: "any", // Course type filter (AA, HL, SL, etc.)
    levels: "any", // Academic level filter
    subject: "any", // Subject area filter
    topic: "", // Topic filter (text-based, empty string = no filter)
    tags: "", // Tags filter (comma-separated, empty string = no filter)
    difficulty: "any", // Difficulty rating filter
    question_type: "any", // Question type filter
    is_pyq: "any", // PYQ filter: "pyq", "practice", "any"
    qa_status: "any", // QA status filter
    priority_level: "any", // QA priority level filter
    is_flagged: "any", // Flagged status filter
  });

  /**
   * FETCH QUESTIONS FUNCTION
   * ========================
   *
   * Fetches questions from the API based on current filters and pagination.
   * Handles search terms, simple filters, and advanced queries.
   * Updates the questions state and pagination information.
   */
  const fetchQuestions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Build base query parameters
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        ...(searchTerm && { search: searchTerm }), // Only add search if not empty
      });

      // Add simple filters - only include non-empty, non-"any" values
      Object.entries(simpleFilters).forEach(([key, value]) => {
        if (value && value !== "any") {
          params.append(key, value);
        }
      });

      // Add advanced query if available (currently disabled)
      if (advancedQuery) {
        params.append("advanced_filters", JSON.stringify(advancedQuery));
      }

      // Make API request to question-bank endpoint
      const response = await fetch(`/api/question-bank?${params}`);

      if (response.ok) {
        // Success: Parse response and update state
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
        // Error: Handle different response types
        // Check if response is JSON before trying to parse
        const contentType = response.headers.get("content-type");
        let errorMessage = "Failed to fetch questions";

        if (contentType && contentType.includes("application/json")) {
          try {
            const errorData = await response.json();
            errorMessage = errorData.error || errorMessage;
            if (errorData.details) {
              errorMessage += `: ${errorData.details}`;
            }
            console.error("API Error:", errorData);
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

        setError(errorMessage);
        setQuestions([]);
        setPagination({
          page: 1,
          limit: pagination.limit,
          total: 0,
          totalPages: 0,
        });
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
      setError(
        `Network error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
      setQuestions([]);
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

  /**
   * FETCH FILTER OPTIONS EFFECT
   * ===========================
   *
   * Fetches available filter options from the API on component mount.
   * This populates the dropdown menus in the sidebar with valid options.
   * Runs only once when the component mounts.
   */
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        setLoadingFilters(true);
        // Fetch available filter options from API
        const response = await fetch("/api/question-bank/filters");
        if (response.ok) {
          const data = await response.json();
          setFilterOptions(data);
        }
      } catch (error) {
        console.error("Error fetching filter options:", error);
      } finally {
        setLoadingFilters(false);
      }
    };

    fetchFilterOptions();
  }, []);

  /**
   * FETCH QUESTIONS EFFECT
   * =====================
   *
   * Triggers question fetching whenever dependencies change.
   * Dependencies include pagination, search term, filters, and advanced query.
   */
  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  /**
   * SEARCH HANDLER
   * ==============
   *
   * Updates search term and resets pagination to page 1.
   * This ensures search results start from the first page.
   */
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  /**
   * SIMPLE FILTER CHANGE HANDLER
   * ============================
   *
   * Updates a specific filter value and resets pagination to page 1.
   * This ensures filtered results start from the first page.
   */
  const handleSimpleFilterChange = (key: string, value: string) => {
    setSimpleFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  /**
   * CLEAR ALL FILTERS FUNCTION
   * ===========================
   *
   * Resets all filters to their default state and resets pagination.
   * This provides a quick way to clear all applied filters.
   */
  const clearAllFilters = () => {
    // Reset all filters to default values
    setSimpleFilters({
      difficulty: "any",
      boards: "any",
      course_types: "any",
      levels: "any",
      question_type: "any",
      is_pyq: "any",
      subject: "any",
      topic: "",
      tags: "",
      qa_status: "any",
      priority_level: "any",
      is_flagged: "any",
    });
    setAdvancedQuery(null); // Clear advanced query
    setSearchTerm(""); // Clear search term
    setPagination((prev) => ({ ...prev, page: 1 })); // Reset to first page
  };

  /**
   * CHECK ACTIVE FILTERS FUNCTION
   * =============================
   *
   * Determines if any filters are currently active.
   * Used to show/hide the "Clear All Filters" button.
   */
  const hasActiveFilters = () => {
    const hasSimpleFilters = Object.values(simpleFilters).some(
      (value) => value !== "any"
    );
    return searchTerm || hasSimpleFilters || advancedQuery;
  };

  /**
   * PAGINATION HANDLER
   * ==================
   *
   * Updates the current page number for pagination.
   */
  const goToPage = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  /**
   * TEXT TRUNCATION UTILITY
   * =======================
   *
   * Truncates text to specified length and adds ellipsis.
   * Used for question preview text in the grid.
   */
  const truncateText = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  /**
   * DIFFICULTY COLOR UTILITY
   * ========================
   *
   * Returns appropriate color classes based on difficulty level.
   * Green: Easy (1-3), Yellow: Medium (4-6), Red: Hard (7-10)
   */
  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 3) return "bg-green-100 text-green-800";
    if (difficulty <= 6) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  /**
   * HUMAN READABLE ID GENERATOR
   * ===========================
   *
   * Generates or retrieves human-readable ID for question display.
   * Uses database-stored ID if available, otherwise generates one.
   */
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

  /**
   * MAIN RENDER SECTION
   * ===================
   *
   * Renders the complete question bank interface with:
   * - Header with title and add question button
   * - Left sidebar with filters
   * - Main content area with question grid
   * - Pagination controls
   */
  return (
    <div className="min-h-screen bg-gray-50">
      {/* PAGE HEADER */}
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
            {/* Add Question Button */}
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

      {/* MAIN CONTENT LAYOUT */}
      <div className="flex">
        {/* FILTER SIDEBAR */}
        <div className="w-80 bg-white border-r border-gray-200 p-4">
          <div className="space-y-4">
            {/* SEARCH SECTION */}
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

            {/* QUICK FILTERS SECTION */}
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
                  disabled={loadingFilters}
                >
                  <SelectTrigger className="h-8 rounded-sm">
                    <SelectValue
                      placeholder={loadingFilters ? "Loading..." : "Any board"}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any board</SelectItem>
                    {filterOptions.boards.map((board) => (
                      <SelectItem key={board} value={board}>
                        {board}
                      </SelectItem>
                    ))}
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
                  disabled={loadingFilters}
                >
                  <SelectTrigger className="h-8 rounded-sm">
                    <SelectValue
                      placeholder={
                        loadingFilters ? "Loading..." : "Any course type"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any course type</SelectItem>
                    {filterOptions.course_types.map((courseType) => (
                      <SelectItem key={courseType} value={courseType}>
                        {courseType}
                      </SelectItem>
                    ))}
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
                  disabled={loadingFilters}
                >
                  <SelectTrigger className="h-8 rounded-sm">
                    <SelectValue
                      placeholder={loadingFilters ? "Loading..." : "Any level"}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any level</SelectItem>
                    {filterOptions.levels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* 4. Subject */}
              <div className="mb-3">
                <Label className="text-xs text-gray-600">Subject</Label>
                <Select
                  value={simpleFilters.subject}
                  onValueChange={(value) =>
                    handleSimpleFilterChange("subject", value)
                  }
                  disabled={loadingFilters}
                >
                  <SelectTrigger className="h-8 rounded-sm">
                    <SelectValue
                      placeholder={
                        loadingFilters ? "Loading..." : "Any subject"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any subject</SelectItem>
                    {filterOptions.subjects.map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject.charAt(0).toUpperCase() + subject.slice(1)}
                      </SelectItem>
                    ))}
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
                  disabled={loadingFilters}
                >
                  <SelectTrigger className="h-8 rounded-sm">
                    <SelectValue
                      placeholder={
                        loadingFilters ? "Loading..." : "Any difficulty"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any difficulty</SelectItem>
                    {filterOptions.difficulties.map((diff) => (
                      <SelectItem key={diff} value={diff.toString()}>
                        {diff} / 10
                      </SelectItem>
                    ))}
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
                  disabled={loadingFilters}
                >
                  <SelectTrigger className="h-8 rounded-sm">
                    <SelectValue
                      placeholder={loadingFilters ? "Loading..." : "Any type"}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any type</SelectItem>
                    {filterOptions.question_types.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type.charAt(0).toUpperCase() +
                          type.slice(1).replace("_", " ")}
                      </SelectItem>
                    ))}
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
                  disabled={loadingFilters}
                >
                  <SelectTrigger className="h-8 rounded-sm">
                    <SelectValue
                      placeholder={loadingFilters ? "Loading..." : "Any"}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    {filterOptions.has_pyq && (
                      <SelectItem value="true">PYQ Only</SelectItem>
                    )}
                    {filterOptions.has_practice && (
                      <SelectItem value="false">Practice Only</SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* QUALITY ASSURANCE FILTERS SECTION */}
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
                  disabled={loadingFilters}
                >
                  <SelectTrigger className="h-8 rounded-sm">
                    <SelectValue
                      placeholder={loadingFilters ? "Loading..." : "Any status"}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any status</SelectItem>
                    {filterOptions.qa_statuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status.charAt(0).toUpperCase() +
                          status.slice(1).replace("_", " ")}
                      </SelectItem>
                    ))}
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
                  disabled={loadingFilters}
                >
                  <SelectTrigger className="h-8 rounded-sm">
                    <SelectValue
                      placeholder={
                        loadingFilters ? "Loading..." : "Any priority"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any priority</SelectItem>
                    {filterOptions.priority_levels.map((priority) => (
                      <SelectItem key={priority} value={priority}>
                        {priority.charAt(0).toUpperCase() + priority.slice(1)}
                      </SelectItem>
                    ))}
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

            {/* ADVANCED FILTERS SECTION (Currently Disabled) */}
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
                  {/* Advanced Query Builder Component - Currently Disabled
                      This would provide complex filtering capabilities
                      <QuestionBankQueryBuilder
                        onQueryChange={(query) => {
                          setAdvancedQuery(query);
                          setPagination((prev) => ({ ...prev, page: 1 }));
                        }}
                        initialQuery={advancedQuery}
                      /> */}
                  <div className="p-8 text-center text-muted-foreground">
                    Query Builder temporarily disabled due to build issues
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Clear Filters */}
            {/* CLEAR ALL FILTERS BUTTON */}
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

            {/* ACTIVE FILTERS SUMMARY */}
            {hasActiveFilters() && (
              <div className="text-sm text-gray-600">
                <div className="font-medium mb-1">Active Filters:</div>
                {searchTerm && (
                  <div className="text-xs">
                    • Search: &quot;{searchTerm}&quot;
                  </div>
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

        {/* MAIN CONTENT AREA */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* BREADCRUMB NAVIGATION */}
            <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
              <span>Dashboard</span>
              <span>/</span>
              <span className="text-gray-900 font-medium">Question Bank</span>
            </nav>

            {/* ERROR MESSAGE DISPLAY */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-sm">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <X className="h-5 w-5 text-red-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      Error Loading Questions
                    </h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>{error}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

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

            {/* QUESTIONS GRID */}
            {loading ? (
              // Loading skeleton grid
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
              // Actual questions grid
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
                        <div className="text-gray-700 text-sm leading-relaxed">
                          {renderMultiPartQuestion(
                            truncateText(question.question_text)
                          )}
                        </div>
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

            {/* PAGINATION CONTROLS */}
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
