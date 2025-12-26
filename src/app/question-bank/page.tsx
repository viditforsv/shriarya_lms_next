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
import { Button } from "@/design-system/components/ui/button";
import { Input } from "@/design-system/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
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
  DialogTrigger,
} from "@/design-system/components/dialog";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Search,
  Filter,
  Eye,
  Edit,
  Plus,
  X,
} from "lucide-react";
import { QAStatusBadge, QAPriorityBadge } from "@/components/QAComponents";
import { Skeleton } from "@/design-system/components/ui/skeleton";
import { renderMultiPartQuestion } from "@/components/MathRenderer";
import { MultiSelect } from "@/components/MultiSelect";
import { TopicAutocomplete } from "@/components/TopicAutocomplete";
import { DifficultyRangeSlider } from "@/components/DifficultyRangeSlider";
import { FilterChips } from "@/components/FilterChips";
import { TagInput } from "@/components/TagInput";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/design-system/components/ui/collapsible";
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
  sections_by_board: Record<string, string[]>; // Sections grouped by board
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
    sections_by_board: {},
    has_pyq: false,
    has_practice: false,
    qa_statuses: [],
    priority_levels: [],
  });

  // Filter loading state
  const [loadingFilters, setLoadingFilters] = useState(true);

  // Mobile filter sidebar state
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // ===== FILTER STATE MANAGEMENT =====

  // Simple filters state - stores current filter selections
  // Arrays for multi-select, empty array = no filter
  // Single values for other filters, "any" or empty = no filter
  const [simpleFilters, setSimpleFilters] = useState({
    boards: [] as string[], // Educational board filter (multi-select)
    course_types: [] as string[], // Course type filter (multi-select)
    levels: [] as string[], // Academic level filter (multi-select)
    subject: [] as string[], // Subject area filter (multi-select)
    topic: "", // Topic filter (text-based, empty string = no filter)
    tags: [] as string[], // Tags filter (array, empty array = no filter)
    section: [] as string[], // Section filter (multi-select, depends on board selection)
    difficulty_min: null as number | null, // Difficulty min (range)
    difficulty_max: null as number | null, // Difficulty max (range)
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

      // Add simple filters - handle arrays and single values
      // Multi-select filters (arrays)
      if (simpleFilters.boards.length > 0) {
        params.append("boards", simpleFilters.boards.join(","));
      }
      if (simpleFilters.course_types.length > 0) {
        params.append("course_types", simpleFilters.course_types.join(","));
      }
      if (simpleFilters.levels.length > 0) {
        params.append("levels", simpleFilters.levels.join(","));
      }
      if (simpleFilters.subject.length > 0) {
        params.append("subject", simpleFilters.subject.join(","));
      }
      if (simpleFilters.tags.length > 0) {
        params.append("tags", simpleFilters.tags.join(","));
      }
      
      // Single value filters
      if (simpleFilters.topic) {
        params.append("topic", simpleFilters.topic);
      }
      if (simpleFilters.section.length > 0) {
        params.append("section", simpleFilters.section.join(","));
      }
      if (simpleFilters.difficulty_min !== null) {
        params.append("difficulty_min", simpleFilters.difficulty_min.toString());
      }
      if (simpleFilters.difficulty_max !== null) {
        params.append("difficulty_max", simpleFilters.difficulty_max.toString());
      }
      if (simpleFilters.question_type && simpleFilters.question_type !== "any") {
        params.append("question_type", simpleFilters.question_type);
      }
      if (simpleFilters.is_pyq && simpleFilters.is_pyq !== "any") {
        params.append("is_pyq", simpleFilters.is_pyq);
      }
      if (simpleFilters.qa_status && simpleFilters.qa_status !== "any") {
        params.append("qa_status", simpleFilters.qa_status);
      }
      if (simpleFilters.priority_level && simpleFilters.priority_level !== "any") {
        params.append("priority_level", simpleFilters.priority_level);
      }
      if (simpleFilters.is_flagged && simpleFilters.is_flagged !== "any") {
        params.append("is_flagged", simpleFilters.is_flagged);
      }

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
            // Check for "Too many results" error
            if (errorData.error === "Too many results" && errorData.message) {
              errorMessage = errorData.message;
            } else {
              errorMessage = errorData.error || errorMessage;
              if (errorData.details) {
                errorMessage += `: ${errorData.details}`;
              }
            }
            // Enhanced error logging - log each property separately for better visibility
            console.error("=== API ERROR ===");
            console.error("Status:", response.status);
            console.error("Status Text:", response.statusText);
            console.error("Error Data:", errorData);
            console.error("Error Message:", errorData.error);
            console.error("Error Details:", errorData.details);
            console.error("Error Hint:", errorData.hint);
            console.error("Error Code:", errorData.code);
            console.error("Full Error Object:", JSON.stringify(errorData, null, 2));
            console.error("Request URL:", response.url);
            console.error("Request Params:", {
              page: pagination.page,
              limit: pagination.limit,
              search: searchTerm,
              filters: simpleFilters,
            });
            console.error("=================");
          } catch (e) {
            console.error("Failed to parse error response as JSON:", e);
            console.error("Response status:", response.status);
            console.error("Response statusText:", response.statusText);
          }
        } else {
          // Response is HTML or other format, get text instead
          try {
            const errorText = await response.text();
            console.error("Non-JSON error response:", {
              status: response.status,
              statusText: response.statusText,
              contentType,
              text: errorText.substring(0, 500), // First 500 chars
            });
            errorMessage = `Server error (${response.status}): ${response.statusText}`;
          } catch (e) {
            console.error("Failed to read error response:", e);
            errorMessage = `Failed to fetch questions (Status: ${response.status})`;
          }
        }
        
        // Always log the full response for debugging
        console.error("=== FULL ERROR RESPONSE ===");
        console.error("Status:", response.status);
        console.error("Status Text:", response.statusText);
        console.error("URL:", response.url);
        console.error("Headers:", Object.fromEntries(response.headers.entries()));
        console.error("===========================");

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
   * Handles both array and single value filters.
   * Also clears section when boards change.
   */
  const handleSimpleFilterChange = (key: string, value: string | string[] | number | null) => {
    setSimpleFilters((prev) => {
      const newFilters = {
        ...prev,
        [key]: value,
      };
      
      // Clear section if boards are cleared or changed
      if (key === "boards") {
        const newBoards = value as string[];
        // If boards are cleared, clear all sections
        if (newBoards.length === 0) {
          newFilters.section = [];
        } else {
          // Filter out sections that are no longer valid for selected boards
          const validSections = new Set<string>();
          newBoards.forEach((board) => {
            const sections = filterOptions.sections_by_board[board] || [];
            sections.forEach((section) => validSections.add(section));
          });
          // Keep only sections that are still valid
          newFilters.section = prev.section.filter((section) =>
            validSections.has(section)
          );
        }
      }
      
      return newFilters;
    });
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
      boards: [],
      course_types: [],
      levels: [],
      subject: [],
      topic: "",
      tags: [],
      section: [],
      difficulty_min: null,
      difficulty_max: null,
      question_type: "any",
      is_pyq: "any",
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
    const hasSimpleFilters = 
      simpleFilters.boards.length > 0 ||
      simpleFilters.course_types.length > 0 ||
      simpleFilters.levels.length > 0 ||
      simpleFilters.subject.length > 0 ||
      simpleFilters.tags.length > 0 ||
      simpleFilters.topic !== "" ||
      simpleFilters.section.length > 0 ||
      simpleFilters.difficulty_min !== null ||
      simpleFilters.difficulty_max !== null ||
      simpleFilters.question_type !== "any" ||
      simpleFilters.is_pyq !== "any" ||
      simpleFilters.qa_status !== "any" ||
      simpleFilters.priority_level !== "any" ||
      simpleFilters.is_flagged !== "any";
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
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-6 gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Question Bank
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Manage and browse {pagination.total} Mathematics questions
              </p>
            </div>
            {/* Add Question Button */}
            <Button
              onClick={() => router.push("/question-bank/new")}
              className="bg-orange-600 hover:bg-orange-700 text-white rounded-sm w-full sm:w-auto"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Question
            </Button>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT LAYOUT */}
      <div className="flex flex-col lg:flex-row">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden bg-white border-b border-gray-200 p-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
          >
            <Filter className="w-4 h-4 mr-2" />
            {showMobileFilters ? "Hide Filters" : "Show Filters"}
          </Button>
        </div>

        {/* FILTER SIDEBAR */}
        <div
          className={`
          w-full lg:w-80 bg-white border-r border-gray-200 p-4 lg:min-h-screen overflow-y-auto
          ${showMobileFilters ? "block" : "hidden lg:block"}
        `}
        >
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

            {/* FILTER CHIPS */}
            {hasActiveFilters() && (
              <FilterChips
                filters={[
                  ...(searchTerm
                    ? [
                        {
                          key: "search",
                          label: "Search",
                          value: searchTerm,
                          category: "Search",
                          onRemove: () => handleSearch(""),
                        },
                      ]
                    : []),
                  ...simpleFilters.boards.map((board) => ({
                    key: `board-${board}`,
                    label: "Board",
                    value: board,
                    category: "Quick Filters",
                    onRemove: () =>
                      handleSimpleFilterChange(
                        "boards",
                        simpleFilters.boards.filter((b) => b !== board)
                      ),
                  })),
                  ...simpleFilters.course_types.map((ct) => ({
                    key: `course_type-${ct}`,
                    label: "Course Type",
                    value: ct,
                    category: "Quick Filters",
                    onRemove: () =>
                      handleSimpleFilterChange(
                        "course_types",
                        simpleFilters.course_types.filter((c) => c !== ct)
                      ),
                  })),
                  ...simpleFilters.levels.map((level) => ({
                    key: `level-${level}`,
                    label: "Level",
                    value: level,
                    category: "Quick Filters",
                    onRemove: () =>
                      handleSimpleFilterChange(
                        "levels",
                        simpleFilters.levels.filter((l) => l !== level)
                      ),
                  })),
                  ...simpleFilters.subject.map((subj) => ({
                    key: `subject-${subj}`,
                    label: "Subject",
                    value: subj,
                    category: "Quick Filters",
                    onRemove: () =>
                      handleSimpleFilterChange(
                        "subject",
                        simpleFilters.subject.filter((s) => s !== subj)
                      ),
                  })),
                  ...simpleFilters.tags.map((tag) => ({
                    key: `tag-${tag}`,
                    label: "Tag",
                    value: tag,
                    category: "Quick Filters",
                    onRemove: () =>
                      handleSimpleFilterChange(
                        "tags",
                        simpleFilters.tags.filter((t) => t !== tag)
                      ),
                  })),
                  ...(simpleFilters.topic
                    ? [
                        {
                          key: "topic",
                          label: "Topic",
                          value: simpleFilters.topic,
                          category: "Quick Filters",
                          onRemove: () => handleSimpleFilterChange("topic", ""),
                        },
                      ]
                    : []),
                  ...(simpleFilters.section.length > 0
                    ? simpleFilters.section.map((section) => ({
                        key: `section-${section}`,
                        label: "Section",
                        value: section,
                        category: "Quick Filters",
                        onRemove: () =>
                          handleSimpleFilterChange(
                            "section",
                            simpleFilters.section.filter((s) => s !== section)
                          ),
                      }))
                    : []),
                  ...(simpleFilters.difficulty_min !== null ||
                  simpleFilters.difficulty_max !== null
                    ? [
                        {
                          key: "difficulty",
                          label: "Difficulty",
                          value: `${simpleFilters.difficulty_min ?? 1}-${simpleFilters.difficulty_max ?? 10}`,
                          category: "Other Filters",
                          onRemove: () => {
                            handleSimpleFilterChange("difficulty_min", null);
                            handleSimpleFilterChange("difficulty_max", null);
                          },
                        },
                      ]
                    : []),
                  ...(simpleFilters.question_type !== "any"
                    ? [
                        {
                          key: "question_type",
                          label: "Question Type",
                          value: simpleFilters.question_type,
                          category: "Other Filters",
                          onRemove: () =>
                            handleSimpleFilterChange("question_type", "any"),
                        },
                      ]
                    : []),
                  ...(simpleFilters.is_pyq !== "any"
                    ? [
                        {
                          key: "is_pyq",
                          label: "PYQ",
                          value: simpleFilters.is_pyq === "true" ? "PYQ Only" : "Practice Only",
                          category: "Other Filters",
                          onRemove: () =>
                            handleSimpleFilterChange("is_pyq", "any"),
                        },
                      ]
                    : []),
                  ...(simpleFilters.qa_status !== "any"
                    ? [
                        {
                          key: "qa_status",
                          label: "QA Status",
                          value: simpleFilters.qa_status,
                          category: "Quality Assurance",
                          onRemove: () =>
                            handleSimpleFilterChange("qa_status", "any"),
                        },
                      ]
                    : []),
                  ...(simpleFilters.priority_level !== "any"
                    ? [
                        {
                          key: "priority_level",
                          label: "Priority",
                          value: simpleFilters.priority_level,
                          category: "Quality Assurance",
                          onRemove: () =>
                            handleSimpleFilterChange("priority_level", "any"),
                        },
                      ]
                    : []),
                  ...(simpleFilters.is_flagged !== "any"
                    ? [
                        {
                          key: "is_flagged",
                          label: "Flagged",
                          value: simpleFilters.is_flagged === "true" ? "Flagged" : "Not Flagged",
                          category: "Quality Assurance",
                          onRemove: () =>
                            handleSimpleFilterChange("is_flagged", "any"),
                        },
                      ]
                    : []),
                ]}
                onClearAll={clearAllFilters}
              />
            )}

            {/* QUICK FILTERS SECTION */}
            <Collapsible defaultOpen={true}>
              <CollapsibleTrigger className="w-full">
                <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-700">
                    Quick Filters
                  </h3>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-3 pt-3">
                {/* 1. Board */}
                <div>
                  <MultiSelect
                    options={filterOptions.boards}
                    selected={simpleFilters.boards}
                    onChange={(selected) =>
                      handleSimpleFilterChange("boards", selected)
                    }
                    placeholder="Select boards..."
                    searchPlaceholder="Search boards..."
                    disabled={loadingFilters}
                    label="Board"
                  />
                </div>

                {/* 2. Subject */}
                <div>
                  <MultiSelect
                    options={filterOptions.subjects}
                    selected={simpleFilters.subject}
                    onChange={(selected) =>
                      handleSimpleFilterChange("subject", selected)
                    }
                    placeholder="Select subjects..."
                    searchPlaceholder="Search subjects..."
                    disabled={loadingFilters}
                    label="Subject"
                  />
                </div>

                {/* 3. Course Type */}
                <div>
                  <MultiSelect
                    options={filterOptions.course_types}
                    selected={simpleFilters.course_types}
                    onChange={(selected) =>
                      handleSimpleFilterChange("course_types", selected)
                    }
                    placeholder="Select course types..."
                    searchPlaceholder="Search course types..."
                    disabled={loadingFilters}
                    label="Course Type"
                  />
                </div>

                {/* 4. Level */}
                <div>
                  <MultiSelect
                    options={filterOptions.levels}
                    selected={simpleFilters.levels}
                    onChange={(selected) =>
                      handleSimpleFilterChange("levels", selected)
                    }
                    placeholder="Select levels..."
                    searchPlaceholder="Search levels..."
                    disabled={loadingFilters}
                    label="Level"
                  />
                </div>

                {/* 5. Section (depends on board selection) */}
                <div>
                  <MultiSelect
                    options={(() => {
                      // Get unique sections from all selected boards
                      const allSections = new Set<string>();
                      simpleFilters.boards.forEach((board) => {
                        const sections = filterOptions.sections_by_board[board] || [];
                        sections.forEach((section) => allSections.add(section));
                      });
                      return Array.from(allSections).sort();
                    })()}
                    selected={simpleFilters.section}
                    onChange={(selected) =>
                      handleSimpleFilterChange("section", selected)
                    }
                    placeholder={
                      simpleFilters.boards.length === 0
                        ? "Select board first"
                        : "Select sections..."
                    }
                    searchPlaceholder="Search sections..."
                    disabled={loadingFilters || simpleFilters.boards.length === 0}
                    label="Section"
                  />
                  {simpleFilters.boards.length === 0 && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Select a board to see sections
                    </p>
                  )}
                </div>

                {/* 6. Topic */}
                <div>
                  <TopicAutocomplete
                    value={simpleFilters.topic}
                    onChange={(value) => handleSimpleFilterChange("topic", value)}
                    suggestions={filterOptions.topics}
                    placeholder="Enter topic..."
                    disabled={loadingFilters}
                    label="Topic"
                  />
                </div>

                {/* 7. Tags */}
                <div>
                  <Label className="text-xs text-gray-600 mb-1 block">Tags</Label>
                  <TagInput
                    tags={simpleFilters.tags}
                    onChange={(tags) => handleSimpleFilterChange("tags", tags)}
                    placeholder="Add tags..."
                    maxTags={10}
                  />
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* OTHER FILTERS SECTION */}
            <Collapsible defaultOpen={true}>
              <CollapsibleTrigger className="w-full">
                <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-700">
                    Other Filters
                  </h3>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-3 pt-3">
                {/* Difficulty */}
                <div>
                  <DifficultyRangeSlider
                    min={simpleFilters.difficulty_min}
                    max={simpleFilters.difficulty_max}
                    onChange={(min, max) => {
                      handleSimpleFilterChange("difficulty_min", min);
                      handleSimpleFilterChange("difficulty_max", max);
                    }}
                    disabled={loadingFilters}
                    label="Difficulty"
                  />
                </div>

                {/* Question Type */}
                <div>
                  <Label className="text-xs text-gray-600 mb-1 block">Question Type</Label>
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
                <div>
                  <Label className="text-xs text-gray-600 mb-1 block">
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
              </CollapsibleContent>
            </Collapsible>

            {/* QUALITY ASSURANCE FILTERS SECTION */}
            <Collapsible defaultOpen={true}>
              <CollapsibleTrigger className="w-full">
                <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-700">
                    Quality Assurance
                  </h3>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-3 pt-3">

                {/* QA Status */}
                <div>
                  <Label className="text-xs text-gray-600 mb-1 block">QA Status</Label>
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
                <div>
                  <Label className="text-xs text-gray-600 mb-1 block">Priority Level</Label>
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
                <div>
                  <Label className="text-xs text-gray-600 mb-1 block">Flagged Status</Label>
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
              </CollapsibleContent>
            </Collapsible>

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
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
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
                    <span className="text-gray-400 ml-1 hidden sm:inline">
                      (from {totalQuestions} total questions)
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 hidden sm:inline">
                  Show:
                </span>
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
                    className=""
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
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full sm:w-auto"
                            onClick={() =>
                              window.open(
                                `/question-bank/${question.id}`,
                                "_blank"
                              )
                            }
                          >
                            <Eye className="w-4 h-4 sm:mr-2" />
                            <span className="hidden sm:inline">View</span>
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full sm:w-auto"
                            onClick={() =>
                              window.open(
                                `/question-bank/${question.id}/edit`,
                                "_blank"
                              )
                            }
                          >
                            <Edit className="w-4 h-4 sm:mr-2" />
                            <span className="hidden sm:inline">Edit</span>
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
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => goToPage(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  className="w-full sm:w-auto"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                <div className="hidden sm:flex items-center space-x-1">
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

                {/* Mobile page indicator */}
                <div className="sm:hidden text-sm text-gray-600">
                  Page {pagination.page} of {pagination.totalPages}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => goToPage(pagination.page + 1)}
                  disabled={pagination.page === pagination.totalPages}
                  className="w-full sm:w-auto"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
