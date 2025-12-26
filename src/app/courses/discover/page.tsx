"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/design-system/components/ui/card";
import { Button } from "@/design-system/components/ui/button";
import { Badge } from "@/design-system/components/ui/badge";
import { Input } from "@/design-system/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/design-system/components/select";
import {
  Search,
  Filter,
  BookOpen,
  Clock,
  Users,
  Star,
  Grid3X3,
  List,
  SortAsc,
  SortDesc,
} from "lucide-react";
// import { getAllCourses } from '@/lib/course-config'
// import { CourseConfig } from '@/lib/course-config'

// API-based course interface
interface CourseConfig {
  id: string;
  slug: string;
  title: string;
  description: string;
  instructor_id?: string;
  created_at: string;
  updated_at: string;
  status: string;
  price: number;
  curriculum?: string;
  subject?: string;
  grade?: string;
  level?: string;
  duration?: string;
  lessons?: number;
  thumbnail?: string;
  features?: string[];
  prerequisites?: string[];
  learningOutcomes?: string[];
  tags?: string[];
  profiles?: unknown;
}

interface FilterState {
  search: string;
  curriculum: string;
  subject: string;
  grade: string;
  level: string;
  priceType: string;
  sortBy: string;
  sortOrder: "asc" | "desc";
  viewMode: "grid" | "list";
}

export default function CourseDiscoveryPage() {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    curriculum: "all",
    subject: "all",
    grade: "all",
    level: "all",
    priceType: "all",
    sortBy: "popularity",
    sortOrder: "desc",
    viewMode: "grid",
  });

  // Handle URL parameters for pre-selecting filters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const curriculum = urlParams.get("curriculum");

    if (curriculum) {
      setFilters((prev) => ({
        ...prev,
        curriculum: curriculum,
      }));
    }
  }, []);

  const [showFilters, setShowFilters] = useState(false);
  const [courses, setCourses] = useState<CourseConfig[]>([]);

  // Get all courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        console.log("Fetching courses from API...");
        const response = await fetch("/api/courses");
        
        console.log("Response received:", {
          status: response.status,
          statusText: response.statusText,
          ok: response.ok,
          headers: Object.fromEntries(response.headers.entries()),
        });
        
        if (response.ok) {
          const contentType = response.headers.get("content-type");
          console.log("Content-Type:", contentType);
          
          if (contentType && contentType.includes("application/json")) {
            const data = await response.json();
            console.log("Courses data:", data);
            setCourses(data.courses || []);
          } else {
            const text = await response.text();
            console.error("Unexpected content type. Response:", text.substring(0, 200));
            setCourses([]);
          }
        } else {
          // Try to get error details from response
          const contentType = response.headers.get("content-type");
          let errorData: Record<string, unknown> = {};
          let errorText = "";
          
          console.log("Error response content-type:", contentType);
          
          try {
            if (contentType && contentType.includes("application/json")) {
              errorText = await response.text();
              if (errorText) {
                try {
                  errorData = JSON.parse(errorText);
                } catch (parseError) {
                  console.error("Failed to parse JSON:", parseError);
                  errorData = { error: errorText, raw: errorText };
                }
              }
            } else {
              // Try to read as text for non-JSON responses
              errorText = await response.text();
              errorData = { 
                error: errorText || `HTTP ${response.status}: ${response.statusText}`,
                raw: errorText 
              };
            }
          } catch (readError) {
            console.error("Could not read error response:", readError);
            errorData = { 
              error: `HTTP ${response.status}: ${response.statusText}`,
              readError: readError instanceof Error ? readError.message : String(readError)
            };
          }
          
          console.error("Failed to fetch courses:", {
            status: response.status,
            statusText: response.statusText,
            contentType,
            error: errorData.error || errorData.message || "Unknown error",
            details: errorData.details,
            hint: errorData.hint,
            code: errorData.code,
            fullError: errorData,
            rawResponse: errorText || "No response body",
          });
          setCourses([]);
        }
      } catch (error) {
        // Network error or fetch failed entirely
        console.error("Network error fetching courses:", {
          error,
          name: error instanceof Error ? error.name : "Unknown",
          message: error instanceof Error ? error.message : "Unknown error",
          stack: error instanceof Error ? error.stack : undefined,
        });
        setCourses([]);
      }
    };

    fetchCourses();
  }, []);

  // Get unique values for filter options
  const filterOptions = useMemo(() => {
    // Use actual database fields, with fallback to hardcoded logic for backward compatibility
    const curricula = [
      ...new Set(
        courses
          .map((c) => {
            if (c.curriculum) return c.curriculum;
            // Fallback to slug-based detection
            if (c.slug.includes("cbse")) return "CBSE";
            if (c.slug.includes("ibdp")) return "IBDP";
            if (c.slug.includes("icse")) return "ICSE";
            if (c.slug.includes("igcse")) return "IGCSE";
            if (c.slug.includes("gmat")) return "GMAT";
            if (c.slug.includes("sat")) return "SAT";
            return "Other";
          })
          .filter(Boolean)
      ),
    ];

    const subjects = [
      ...new Set(
        courses
          .map((c) => {
            if (c.subject) return c.subject;
            // Fallback to title-based detection
            if (c.title.toLowerCase().includes("mathematics"))
              return "Mathematics";
            if (c.title.toLowerCase().includes("physics")) return "Physics";
            if (c.title.toLowerCase().includes("chemistry")) return "Chemistry";
            return "Other";
          })
          .filter(Boolean)
      ),
    ];

    const grades = [
      ...new Set(
        courses
          .map((c) => {
            if (c.grade) return c.grade;
            // Fallback to slug-based detection
            if (c.slug.includes("class-10")) return "Class 10";
            if (c.slug.includes("class-11")) return "Class 11";
            if (c.slug.includes("class-12")) return "Class 12";
            if (c.slug.includes("hl")) return "Higher Level";
            return null; // Return null for unknown grades instead of "Other"
          })
          .filter((grade) => grade !== null && grade !== "Other") // Filter out null and "Other"
      ),
    ];

    const levels = [
      ...new Set(
        courses
          .map((c) => {
            if (c.level) return c.level;
            // Fallback to slug-based detection
            if (c.slug.includes("hl")) return "Higher Level";
            if (c.slug.includes("sl")) return "Standard Level";
            return null; // Return null for unknown levels
          })
          .filter((level) => level !== null && level !== undefined) // Filter out null and undefined
      ),
    ];

    return { curricula, subjects, grades, levels };
  }, [courses]);

  // Filter and sort courses
  const filteredCourses = useMemo(() => {
    const filtered = courses.filter((course) => {
      // Show published and draft courses to all users
      // Draft courses will be shown as "upcoming"
      if (course.status === "archived") {
        return false;
      }

      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const matchesSearch =
          course.title.toLowerCase().includes(searchTerm) ||
          course.description.toLowerCase().includes(searchTerm) ||
          course.slug.toLowerCase().includes(searchTerm);
        if (!matchesSearch) return false;
      }

      // Curriculum filter
      if (filters.curriculum !== "all") {
        const courseCurriculum =
          course.curriculum ||
          (course.slug.includes("cbse")
            ? "CBSE"
            : course.slug.includes("ibdp")
            ? "IBDP"
            : course.slug.includes("icse")
            ? "ICSE"
            : course.slug.includes("igcse")
            ? "IGCSE"
            : course.slug.includes("gmat")
            ? "GMAT"
            : course.slug.includes("sat")
            ? "SAT"
            : "Other");
        if (courseCurriculum !== filters.curriculum) {
          return false;
        }
      }

      // Subject filter
      if (filters.subject !== "all") {
        const courseSubject =
          course.subject ||
          (course.title.toLowerCase().includes("mathematics")
            ? "Mathematics"
            : course.title.toLowerCase().includes("physics")
            ? "Physics"
            : course.title.toLowerCase().includes("chemistry")
            ? "Chemistry"
            : "Other");
        if (courseSubject !== filters.subject) {
          return false;
        }
      }

      // Grade filter
      if (filters.grade !== "all") {
        const courseGrade =
          course.grade ||
          (course.slug.includes("class-10")
            ? "Class 10"
            : course.slug.includes("class-11")
            ? "Class 11"
            : course.slug.includes("class-12")
            ? "Class 12"
            : course.slug.includes("hl")
            ? "Higher Level"
            : "Other");
        if (courseGrade !== filters.grade) {
          return false;
        }
      }

      // Level filter
      if (filters.level !== "all") {
        const courseLevel =
          course.level ||
          (course.slug.includes("hl")
            ? "Higher Level"
            : course.slug.includes("sl")
            ? "Standard Level"
            : "Standard");
        if (courseLevel !== filters.level) {
          return false;
        }
      }

      // Price filter
      if (filters.priceType === "free" && course.price > 0) {
        return false;
      }
      if (filters.priceType === "paid" && course.price === 0) {
        return false;
      }

      return true;
    });

    // Sort courses
    filtered.sort((a, b) => {
      let comparison = 0;

      switch (filters.sortBy) {
        case "title":
          comparison = a.title.localeCompare(b.title);
          break;
        case "price":
          comparison = a.price - b.price;
          break;
        case "duration":
          // API doesn't have duration, use created_at as fallback
          comparison =
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
          break;
        case "popularity":
          // API doesn't have enrollment count, use created_at as fallback
          comparison =
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
          break;
        case "rating":
          // API doesn't have rating, use created_at as fallback
          comparison =
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
          break;
        case "newest":
          comparison =
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
          break;
        default:
          comparison = 0;
      }

      return filters.sortOrder === "asc" ? comparison : -comparison;
    });

    return filtered;
  }, [courses, filters]);

  const updateFilter = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      curriculum: "all",
      subject: "all",
      grade: "all",
      level: "all",
      priceType: "all",
      sortBy: "popularity",
      sortOrder: "desc",
      viewMode: "grid",
    });
  };

  const activeFiltersCount = Object.entries(filters).filter(
    ([key, value]) =>
      value !== "all" &&
      value !== "desc" &&
      value !== "grid" &&
      value !== "list" &&
      value !== "" &&
      key !== "sortBy"
  ).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-white to-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Discover Courses
              </h1>
              <p className="text-muted-foreground">
                Find the perfect course for your learning journey
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
              <div className="flex items-center border rounded-md">
                <Button
                  variant={filters.viewMode === "grid" ? "primary" : "outline"}
                  size="sm"
                  onClick={() => updateFilter("viewMode", "grid")}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={filters.viewMode === "list" ? "primary" : "outline"}
                  size="sm"
                  onClick={() => updateFilter("viewMode", "list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search courses by title, subject, or keywords..."
              value={filters.search}
              onChange={(e) => updateFilter("search", e.target.value)}
              className="pl-10 bg-white border-gray-200 shadow-sm focus:border-accent focus:ring-accent"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className={`w-80 ${showFilters ? "block" : "hidden lg:block"}`}>
            <Card className="sticky top-8">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Filters</CardTitle>
                  <Button variant="outline" size="sm" onClick={clearFilters}>
                    Clear All
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Curriculum Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Curriculum
                  </label>
                  <Select
                    value={filters.curriculum}
                    onValueChange={(value) => updateFilter("curriculum", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Curricula</SelectItem>
                      {filterOptions.curricula.map((curriculum) => (
                        <SelectItem key={curriculum} value={curriculum}>
                          {curriculum}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Subject Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Subject
                  </label>
                  <Select
                    value={filters.subject}
                    onValueChange={(value) => updateFilter("subject", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Subjects</SelectItem>
                      {filterOptions.subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Grade Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Grade
                  </label>
                  <Select
                    value={filters.grade}
                    onValueChange={(value) => updateFilter("grade", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Grades</SelectItem>
                      {filterOptions.grades.map((grade) => (
                        <SelectItem key={grade} value={grade || ""}>
                          {grade}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Level Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Level
                  </label>
                  <Select
                    value={filters.level}
                    onValueChange={(value) => updateFilter("level", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      {filterOptions.levels.map((level) => (
                        <SelectItem key={level} value={level || ""}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Price
                  </label>
                  <Select
                    value={filters.priceType}
                    onValueChange={(value) => updateFilter("priceType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Courses</SelectItem>
                      <SelectItem value="free">Free Courses</SelectItem>
                      <SelectItem value="paid">Paid Courses</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Sort Options */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Sort By
                  </label>
                  <Select
                    value={filters.sortBy}
                    onValueChange={(value) => updateFilter("sortBy", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popularity">Popularity</SelectItem>
                      <SelectItem value="rating">Rating</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="title">Title</SelectItem>
                      <SelectItem value="price">Price</SelectItem>
                      <SelectItem value="duration">Duration</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    updateFilter(
                      "sortOrder",
                      filters.sortOrder === "asc" ? "desc" : "asc"
                    )
                  }
                  className="w-full"
                >
                  {filters.sortOrder === "asc" ? (
                    <SortAsc className="w-4 h-4 mr-2" />
                  ) : (
                    <SortDesc className="w-4 h-4 mr-2" />
                  )}
                  {filters.sortOrder === "asc" ? "Ascending" : "Descending"}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Course Results */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold">
                  {filteredCourses.length} Course
                  {filteredCourses.length !== 1 ? "s" : ""} Found
                </h2>
                {activeFiltersCount > 0 && (
                  <p className="text-sm text-muted-foreground">
                    Filtered by {activeFiltersCount} criteria
                  </p>
                )}
              </div>
            </div>

            {/* Course Grid/List */}
            {filteredCourses.length === 0 ? (
              <Card className="p-12 text-center">
                <div className="max-w-md mx-auto">
                  <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    No courses found
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filters or search terms
                  </p>
                  <Button onClick={clearFilters}>Clear Filters</Button>
                </div>
              </Card>
            ) : (
              <div
                className={
                  filters.viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "space-y-4"
                }
              >
                {filteredCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    viewMode={filters.viewMode}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface CourseCardProps {
  course: CourseConfig;
  viewMode: "grid" | "list";
}

interface CourseConfigWithThumbnail extends CourseConfig {
  thumbnail_url?: string;
}

// Helper function to get thumbnail URL with fallback
function getThumbnailUrl(course: CourseConfig): string {
  // Check both thumbnail and thumbnail_url fields (API inconsistency)
  const courseWithThumbnail = course as CourseConfigWithThumbnail;
  const thumbnailUrl = course.thumbnail || courseWithThumbnail.thumbnail_url;

  // If course has a thumbnail, use it
  if (thumbnailUrl && thumbnailUrl !== "/images/courses/default.jpg") {
    // If it's a Bunny CDN URL, use the CDN proxy
    if (thumbnailUrl.includes("shrividhyaclasses.b-cdn.net")) {
      return `/api/cdn-proxy?url=${encodeURIComponent(thumbnailUrl)}`;
    }
    return thumbnailUrl;
  }

  // Generate thumbnail based on curriculum and subject
  const curriculum =
    course.curriculum ||
    (course.slug.includes("cbse")
      ? "CBSE"
      : course.slug.includes("ibdp")
      ? "IBDP"
      : "OTHER");
  const subject =
    course.subject ||
    (course.title.toLowerCase().includes("mathematics")
      ? "MATHEMATICS"
      : "OTHER");

  // Return a placeholder gradient for now - you can replace these with actual thumbnail URLs
  return `data:image/svg+xml;base64,${Buffer.from(
    `
    <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#3bb273;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#d1653a;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#grad)" />
      <text x="200" y="150" font-family="Arial, sans-serif" font-size="24" fill="white" text-anchor="middle" dominant-baseline="middle">${curriculum} ${subject}</text>
    </svg>
  `
  ).toString("base64")}`;
}

function CourseCard({ course, viewMode }: CourseCardProps) {
  const thumbnailUrl = getThumbnailUrl(course);

  if (viewMode === "list") {
    return (
      <Link href={`/courses/${course.slug}`} className="block">
        <Card className="">
          <CardContent className="p-6">
            <div className="flex gap-6">
              <div className="w-64 h-32 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden relative">
                {thumbnailUrl.startsWith("data:") || thumbnailUrl.includes("/api/cdn-proxy") ? (
                  // Use regular img tag for data URIs and proxy URLs (Next.js Image doesn't support query strings in local patterns)
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={thumbnailUrl}
                    alt={`${course.title} thumbnail`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to gradient if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = "flex";
                    }}
                  />
                ) : (
                  <Image
                    src={thumbnailUrl}
                    alt={`${course.title} thumbnail`}
                    width={256}
                    height={128}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to gradient if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = "flex";
                    }}
                  />
                )}
                <div
                  className="w-full h-full bg-gradient-to-br from-primary to-emerald-600 rounded-lg flex items-center justify-center absolute inset-0"
                  style={{ display: "none" }}
                >
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <div className="mb-2">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">
                      {course.title}
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge
                        variant={course.price === 0 ? "secondary" : "default"}
                      >
                        {course.price === 0 ? "Free" : `₹${course.price}`}
                      </Badge>
                      {course.status === "draft" && (
                        <Badge
                          variant="outline"
                          className="border-blue-500 text-blue-700 bg-blue-50"
                        >
                          Upcoming
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {course.description}
                    </p>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>
                        Created:{" "}
                        {new Date(course.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span className="capitalize">{course.status}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Star className="w-4 h-4" />
                    <span>
                      {course.price === 0 ? "Free Course" : "Paid Course"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-xs">
                      {course.curriculum ||
                        (course.slug.includes("cbse")
                          ? "CBSE"
                          : course.slug.includes("ibdp")
                          ? "IBDP"
                          : course.slug.includes("icse")
                          ? "ICSE"
                          : course.slug.includes("igcse")
                          ? "IGCSE"
                          : course.slug.includes("gmat")
                          ? "GMAT"
                          : course.slug.includes("sat")
                          ? "SAT"
                          : "Other")}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {course.subject ||
                        (course.title.toLowerCase().includes("mathematics")
                          ? "Mathematics"
                          : "Other")}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {course.price === 0 ? "Free" : "Paid"}
                    </Badge>
                  </div>
                  <Button size="sm">View Course</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={`/courses/${course.slug}`} className="block">
        <Card className="">
        <CardHeader className="pb-4">
          <div className="w-full h-32 rounded-lg flex items-center justify-center mb-4 overflow-hidden relative">
            {thumbnailUrl.startsWith("data:") || thumbnailUrl.includes("/api/cdn-proxy") ? (
              // Use regular img tag for data URIs and proxy URLs (Next.js Image doesn't support query strings in local patterns)
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={thumbnailUrl}
                alt={`${course.title} thumbnail`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to gradient if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = "flex";
                }}
              />
            ) : (
              <Image
                src={thumbnailUrl}
                alt={`${course.title} thumbnail`}
                width={400}
                height={128}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to gradient if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = "flex";
                }}
              />
            )}
            <div
              className="w-full h-full bg-gradient-to-br from-primary to-emerald-600 rounded-lg flex items-center justify-center absolute inset-0"
              style={{ display: "none" }}
            >
              <BookOpen className="w-12 h-12 text-white" />
            </div>
          </div>
          <div className="mb-2">
            <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors mb-2">
              {course.title}
            </CardTitle>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant={course.price === 0 ? "secondary" : "default"}>
                {course.price === 0 ? "Free" : `₹${course.price}`}
              </Badge>
              {course.status === "draft" && (
                <Badge
                  variant="outline"
                  className="border-blue-500 text-blue-700 bg-blue-50"
                >
                  Upcoming
                </Badge>
              )}
            </div>
          </div>
          <CardDescription className="line-clamp-3">
            {course.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-4">
            {/* Course Info */}
            <div className="space-y-2">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>
                    Created: {new Date(course.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span className="capitalize">{course.status}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Star className="w-4 h-4" />
                <span>
                  {course.price === 0 ? "Free Course" : "Paid Course"}
                </span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2"></div>

            {/* Action Button */}
            <Button className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
              View Course
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
