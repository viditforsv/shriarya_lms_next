"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/design-system/components/ui/button";
import { Badge } from "@/design-system/components/ui/badge";
import { Progress } from "@/design-system/components/ui/progress";
import {
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  BookOpen,
  FileText,
  CheckCircle,
  Lock,
  Unlock,
  Play,
  Download,
} from "lucide-react";

interface Assignment {
  id: string;
  title: string;
  pdfUrl: string;
  dueDate: string;
  maxMarks: number;
  description: string;
  instructions: string;
  isCompleted?: boolean;
  submittedAt?: string;
  submittedFile?: string;
}

interface PDFAssignmentSidebarProps {
  currentAssignmentId?: string;
  courseSlug: string;
  assignments?: Assignment[];
  courseTitle?: string;
  overallProgress?: number;
  isEnrolled?: boolean;
}

export function PDFAssignmentSidebar({
  currentAssignmentId,
  courseSlug,
  assignments = [],
  courseTitle = "PDF Assignments",
  overallProgress = 0,
  isEnrolled = false,
}: PDFAssignmentSidebarProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Initialize expanded sections from localStorage
  const [expandedSections, setExpandedSections] = useState<Set<string>>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(
          `pdf-sidebar-expanded-sections-${courseSlug}`
        );
        return saved ? new Set(JSON.parse(saved)) : new Set(["Unit 1"]);
      } catch {
        return new Set(["Unit 1"]);
      }
    }
    return new Set(["Unit 1"]);
  });

  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(
          `pdf-sidebar-expanded-chapters-${courseSlug}`
        );
        return saved ? new Set(JSON.parse(saved)) : new Set();
      } catch {
        return new Set();
      }
    }
    return new Set();
  });

  // Map assignment to section and chapter based on CBSE Class 9 syllabus
  const getSectionAndChapter = (assignmentId: string) => {
    const assignmentMap: Record<string, { section: string; chapter: string }> =
      {
        "assignment-1": { section: "Unit 1", chapter: "Number Systems" },
        "assignment-2": { section: "Unit 2", chapter: "Polynomials" },
        "assignment-3": { section: "Unit 3", chapter: "Coordinate Geometry" },
        "assignment-4": { section: "Unit 4", chapter: "Linear Equations" },
        "assignment-5": { section: "Unit 5", chapter: "Euclid's Geometry" },
        "assignment-6": { section: "Unit 6", chapter: "Lines and Angles" },
        "assignment-7": { section: "Unit 7", chapter: "Triangles" },
        "assignment-8": { section: "Unit 8", chapter: "Quadrilaterals" },
        "assignment-9": { section: "Unit 9", chapter: "Areas" },
        "assignment-10": { section: "Unit 10", chapter: "Circles" },
        "assignment-11": { section: "Unit 11", chapter: "Constructions" },
        "assignment-12": { section: "Unit 12", chapter: "Heron's Formula" },
        "assignment-13": { section: "Unit 13", chapter: "Surface Areas" },
        "assignment-14": { section: "Unit 14", chapter: "Data Analysis" },
        "assignment-15": {
          section: "Unit 15",
          chapter: "Chance and Likelihood",
        },
      };

    return (
      assignmentMap[assignmentId] || {
        section: "General",
        chapter: "Assignment",
      }
    );
  };

  // Group assignments by section and chapter
  const groupedAssignments = assignments.reduce((acc, assignment) => {
    const { section, chapter } = getSectionAndChapter(assignment.id);

    if (!acc[section]) acc[section] = {};
    if (!acc[section][chapter]) acc[section][chapter] = [];
    acc[section][chapter].push(assignment);
    return acc;
  }, {} as Record<string, Record<string, Assignment[]>>);

  // Auto-expand sections and chapters containing the current assignment
  useEffect(() => {
    if (currentAssignmentId && assignments.length > 0) {
      const { section, chapter } = getSectionAndChapter(currentAssignmentId);

      setExpandedSections((prev) => new Set([...prev, section]));
      setExpandedChapters((prev) => new Set([...prev, chapter]));
    }
  }, [currentAssignmentId, assignments]);

  // Save expanded state to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        `pdf-sidebar-expanded-sections-${courseSlug}`,
        JSON.stringify([...expandedSections])
      );
      localStorage.setItem(
        `pdf-sidebar-expanded-chapters-${courseSlug}`,
        JSON.stringify([...expandedChapters])
      );
    }
  }, [expandedSections, expandedChapters, courseSlug]);

  const toggleSection = (sectionKey: string) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(sectionKey)) {
        newSet.delete(sectionKey);
      } else {
        newSet.add(sectionKey);
      }
      return newSet;
    });
  };

  const toggleChapter = (chapterKey: string) => {
    setExpandedChapters((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(chapterKey)) {
        newSet.delete(chapterKey);
      } else {
        newSet.add(chapterKey);
      }
      return newSet;
    });
  };

  const toggleAllSections = () => {
    const allSections = Object.keys(groupedAssignments);
    if (expandedSections.size === allSections.length) {
      setExpandedSections(new Set());
    } else {
      setExpandedSections(new Set(allSections));
    }
  };

  const getAssignmentStatus = (assignment: Assignment) => {
    if (assignment.id === currentAssignmentId) return "current";
    if (assignment.isCompleted) return "completed";
    return "pending";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "current":
        return <Play className="w-4 h-4 text-[#e27447]" />;
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "pending":
        // Show unlocked icon if student is enrolled, otherwise lock icon
        return isEnrolled ? (
          <Unlock className="w-4 h-4 text-gray-600" />
        ) : (
          <Lock className="w-4 h-4 text-gray-400" />
        );
      default:
        return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "current":
        return "text-[#e27447] font-semibold";
      case "completed":
        return "text-green-600";
      case "pending":
        return "text-gray-500";
      default:
        return "text-gray-600";
    }
  };

  const completedAssignments = assignments.filter((a) => a.isCompleted).length;
  const totalAssignments = assignments.length;

  if (isSidebarCollapsed) {
    return (
      <div className="w-16 bg-white border-r border-[#feefea] flex flex-col items-center py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsSidebarCollapsed(false)}
          className="mb-4 rounded-sm"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
        <div className="space-y-2">
          {assignments.slice(0, 5).map((assignment) => (
            <Link
              key={assignment.id}
              href={`/courses/${courseSlug}/pdf-assignment/${assignment.id}`}
              className="block p-2 hover:bg-[#feefea]/40 rounded-sm transition-colors"
              title={assignment.title}
            >
              {getAssignmentStatus(assignment) === "current" ? (
                <Play className="w-4 h-4 text-[#e27447]" />
              ) : assignment.isCompleted ? (
                <CheckCircle className="w-4 h-4 text-green-600" />
              ) : (
                <FileText className="w-4 h-4 text-gray-500" />
              )}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-white border-r border-[#feefea] flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-[#feefea]">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-[#1e293b] truncate">
            {courseTitle}
          </h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsSidebarCollapsed(true)}
            className="rounded-sm"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
        </div>

        {/* Progress Section */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Assignment Progress</span>
            <span className="font-medium text-[#1e293b]">
              {overallProgress}%
            </span>
          </div>
          <Progress value={overallProgress} className="h-2" />
          <div className="text-xs text-gray-500">
            {completedAssignments} of {totalAssignments} assignments completed
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={toggleAllSections}
          className="w-full rounded-sm"
        >
          {expandedSections.size === Object.keys(groupedAssignments).length ? (
            <>
              <ChevronUp className="w-4 h-4 mr-2" />
              Collapse All
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4 mr-2" />
              Expand All
            </>
          )}
        </Button>
      </div>

      {/* Course Content Section */}
      <div className="space-y-4 flex-1 overflow-y-auto">
        {Object.entries(groupedAssignments).map(([sectionKey, chapters]) => (
          <div
            key={sectionKey}
            className="border-b border-[#feefea] last:border-b-0"
          >
            {/* Section Header */}
            <div
              className="flex items-center justify-between p-3 cursor-pointer hover:bg-[#feefea]/50 transition-colors"
              onClick={() => toggleSection(sectionKey)}
            >
              <div className="flex items-center space-x-2">
                {expandedSections.has(sectionKey) ? (
                  <ChevronDown className="w-4 h-4 text-[#e27447]" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-[#e27447]" />
                )}
                <BookOpen className="w-4 h-4 text-[#e27447]" />
                <span className="font-medium text-[#1e293b]">{sectionKey}</span>
              </div>
              <Badge variant="secondary" className="rounded-sm">
                {Object.values(chapters).flat().length}
              </Badge>
            </div>

            {/* Chapters */}
            {expandedSections.has(sectionKey) && (
              <div className="bg-white/50">
                {Object.entries(chapters).map(
                  ([chapterKey, chapterAssignments]) => (
                    <div key={chapterKey}>
                      {/* Chapter Header */}
                      <div
                        className="flex items-center justify-between p-3 pl-8 cursor-pointer hover:bg-[#feefea]/30 transition-colors"
                        onClick={() => toggleChapter(chapterKey)}
                      >
                        <div className="flex items-center space-x-2">
                          {expandedChapters.has(chapterKey) ? (
                            <ChevronDown className="w-4 h-4 text-gray-600" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-gray-600" />
                          )}
                          <FileText className="w-4 h-4 text-gray-600" />
                          <span className="font-medium text-gray-700">
                            {chapterKey}
                          </span>
                        </div>
                        <Badge variant="outline" className="rounded-sm">
                          {chapterAssignments.length}
                        </Badge>
                      </div>

                      {/* Assignments */}
                      {expandedChapters.has(chapterKey) && (
                        <div className="bg-gray-50/50">
                          {chapterAssignments.map((assignment) => {
                            const status = getAssignmentStatus(assignment);
                            const isCurrent =
                              assignment.id === currentAssignmentId;

                            return (
                              <Link
                                key={assignment.id}
                                href={`/courses/${courseSlug}/pdf-assignment/${assignment.id}`}
                                className={`flex items-center justify-between p-3 pl-16 hover:bg-[#feefea]/40 transition-colors ${
                                  isCurrent
                                    ? "bg-[#feefea]/60 border-r-2 border-[#e27447]"
                                    : ""
                                }`}
                              >
                                <div className="flex items-center space-x-3">
                                  {getStatusIcon(status)}
                                  <div className="flex-1 min-w-0">
                                    <p
                                      className={`text-sm ${getStatusColor(
                                        status
                                      )} truncate`}
                                    >
                                      {assignment.title}
                                    </p>
                                    <div className="flex items-center space-x-2 mt-1">
                                      <span className="text-xs text-gray-500">
                                        {assignment.maxMarks} marks
                                      </span>
                                      {assignment.isCompleted && (
                                        <Badge
                                          variant="secondary"
                                          className="rounded-sm text-xs"
                                        >
                                          Completed
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="p-1 h-6 w-6"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      window.open(assignment.pdfUrl, "_blank");
                                    }}
                                    title="Download PDF"
                                  >
                                    <Download className="w-3 h-3" />
                                  </Button>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
