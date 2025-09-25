"use client";

import { useState } from "react";
import { Button } from "@/app/components-demo/ui/ui-components/button";
import { Input } from "@/app/components-demo/ui/ui-components/input";
import { Label } from "@/app/components-demo/ui/ui-components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components-demo/ui/select";
import { Badge } from "@/app/components-demo/ui/ui-components/badge";
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  X,
} from "lucide-react";
import {
  useAdvancedFilterPlugin,
  FilterPluginUI,
} from "@/lib/filters/AdvancedFilterPlugin";
import { questionBankFilterConfig } from "@/lib/filters/configs/QuestionBankFilterConfig";

interface FilterSidebarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterPlugin: ReturnType<typeof useAdvancedFilterPlugin>;
  onFiltersChange: () => void;
  hasActiveFilters: () => boolean;
  clearAllFilters: () => void;
  className?: string;
}

export default function FilterSidebar({
  searchTerm,
  onSearchChange,
  filterPlugin,
  onFiltersChange,
  hasActiveFilters,
  clearAllFilters,
  className = "",
}: FilterSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  if (isCollapsed) {
    return (
      <div
        className={`w-12 bg-white border-r border-gray-200 min-h-screen transition-all duration-300 ${className}`}
      >
        <div className="p-2">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleCollapse}
            className="rounded-sm p-2 w-full mb-4"
            title="Open filters"
          >
            <Filter className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={clearAllFilters}
            className="rounded-sm p-2 w-full"
            title="Reset all filters"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`w-80 bg-white border-r border-gray-200 min-h-screen transition-all duration-300 ${className}`}
    >
      <div className="p-4">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[#1e293b] flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filters
            </h2>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleCollapse}
              className="rounded-sm p-2"
              title="Close sidebar (⌘\)"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 rounded-sm"
            />
          </div>
        </div>

        {/* Advanced Filter Button */}
        <div className="mb-4">
          <FilterPluginUI plugin={filterPlugin} />
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters() && (
          <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-800">
                Active Filters ({filterPlugin.getActiveFilterCount()})
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={clearAllFilters}
                className="text-blue-600 border-blue-300 hover:bg-blue-100 rounded-sm"
              >
                <RotateCcw className="w-3 h-3 mr-1" />
                Reset
              </Button>
            </div>

            <div className="space-y-2">
              {searchTerm && (
                <Badge
                  variant="secondary"
                  className="flex items-center gap-1 w-fit"
                >
                  Search: "{searchTerm}"
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-red-600"
                    onClick={() => onSearchChange("")}
                  />
                </Badge>
              )}

              {filterPlugin.advancedFilters.length > 0
                ? filterPlugin.advancedFilters.map((filter, index) => {
                    const condition = filter as any;
                    const operatorInfo = {
                      eq: "=",
                      neq: "≠",
                      gt: ">",
                      gte: "≥",
                      lt: "<",
                      lte: "≤",
                      in: "in",
                      nin: "not in",
                      like: "contains",
                      ilike: "contains (i)",
                      is: "is",
                      not: "is not",
                    };

                    return (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="flex items-center gap-1 w-fit"
                      >
                        {condition.field}{" "}
                        {(operatorInfo as any)[condition.operator]}{" "}
                        {condition.value}
                        <X
                          className="w-3 h-3 cursor-pointer hover:text-red-600"
                          onClick={() => {
                            const newFilters =
                              filterPlugin.advancedFilters.filter(
                                (_, i) => i !== index
                              );
                            filterPlugin.handleAdvancedFiltersChange(
                              newFilters
                            );
                          }}
                        />
                      </Badge>
                    );
                  })
                : Object.entries(filterPlugin.legacyFilters).map(
                    ([key, value]) => {
                      if (!value || value === "") return null;
                      return (
                        <Badge
                          key={key}
                          variant="secondary"
                          className="flex items-center gap-1 w-fit"
                        >
                          {key.replace("_", " ")}: {value}
                          <X
                            className="w-3 h-3 cursor-pointer hover:text-red-600"
                            onClick={() =>
                              filterPlugin.handleLegacyFilterChange(key, "")
                            }
                          />
                        </Badge>
                      );
                    }
                  )}
            </div>
          </div>
        )}

        {/* Filter Form */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            Quick Filters
          </h3>

          {/* Subject */}
          <div className="space-y-2">
            <Label htmlFor="subject" className="text-sm">
              Subject
            </Label>
            <Select
              value={filterPlugin.legacyFilters.subject || "any"}
              onValueChange={(value) =>
                filterPlugin.handleLegacyFilterChange(
                  "subject",
                  value === "any" ? "" : value
                )
              }
            >
              <SelectTrigger className="rounded-sm">
                <SelectValue placeholder="Any subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Subject</SelectItem>
                <SelectItem value="IBDP Mathematics AA HL">
                  IBDP Mathematics AA HL
                </SelectItem>
                <SelectItem value="IBDP Mathematics AI HL">
                  IBDP Mathematics AI HL
                </SelectItem>
                <SelectItem value="IBDP Mathematics AA SL">
                  IBDP Mathematics AA SL
                </SelectItem>
                <SelectItem value="IBDP Mathematics AI SL">
                  IBDP Mathematics AI SL
                </SelectItem>
                <SelectItem value="CBSE Mathematics">
                  CBSE Mathematics
                </SelectItem>
                <SelectItem value="ICSE Mathematics">
                  ICSE Mathematics
                </SelectItem>
                <SelectItem value="IGCSE Mathematics">
                  IGCSE Mathematics
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Difficulty */}
          <div className="space-y-2">
            <Label htmlFor="difficulty" className="text-sm">
              Difficulty
            </Label>
            <Select
              value={filterPlugin.legacyFilters.difficulty || "any"}
              onValueChange={(value) =>
                filterPlugin.handleLegacyFilterChange(
                  "difficulty",
                  value === "any" ? "" : value
                )
              }
            >
              <SelectTrigger className="rounded-sm">
                <SelectValue placeholder="Any difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Difficulty</SelectItem>
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
          </div>

          {/* Question Type */}
          <div className="space-y-2">
            <Label htmlFor="question_type" className="text-sm">
              Question Type
            </Label>
            <Select
              value={filterPlugin.legacyFilters.question_type || "any"}
              onValueChange={(value) =>
                filterPlugin.handleLegacyFilterChange(
                  "question_type",
                  value === "any" ? "" : value
                )
              }
            >
              <SelectTrigger className="rounded-sm">
                <SelectValue placeholder="Any type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Type</SelectItem>
                <SelectItem value="MCQ">Multiple Choice</SelectItem>
                <SelectItem value="Short Answer">Short Answer</SelectItem>
                <SelectItem value="Long Answer">Long Answer</SelectItem>
                <SelectItem value="Numerical">Numerical</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Board */}
          <div className="space-y-2">
            <Label htmlFor="board" className="text-sm">
              Board
            </Label>
            <Select
              value={filterPlugin.legacyFilters.board || "any"}
              onValueChange={(value) =>
                filterPlugin.handleLegacyFilterChange(
                  "board",
                  value === "any" ? "" : value
                )
              }
            >
              <SelectTrigger className="rounded-sm">
                <SelectValue placeholder="Any board" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Board</SelectItem>
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

          {/* Grade */}
          <div className="space-y-2">
            <Label htmlFor="grade" className="text-sm">
              Grade
            </Label>
            <Select
              value={filterPlugin.legacyFilters.grade || "any"}
              onValueChange={(value) =>
                filterPlugin.handleLegacyFilterChange(
                  "grade",
                  value === "any" ? "" : value
                )
              }
            >
              <SelectTrigger className="rounded-sm">
                <SelectValue placeholder="Any grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Grade</SelectItem>
                <SelectItem value="9">Grade 9</SelectItem>
                <SelectItem value="10">Grade 10</SelectItem>
                <SelectItem value="11">Grade 11</SelectItem>
                <SelectItem value="12">Grade 12</SelectItem>
                <SelectItem value="13">Grade 13</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* QA Status */}
          <div className="space-y-2">
            <Label htmlFor="qa_status" className="text-sm">
              QA Status
            </Label>
            <Select
              value={filterPlugin.legacyFilters.qa_status || "any"}
              onValueChange={(value) =>
                filterPlugin.handleLegacyFilterChange(
                  "qa_status",
                  value === "any" ? "" : value
                )
              }
            >
              <SelectTrigger className="rounded-sm">
                <SelectValue placeholder="Any status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Status</SelectItem>
                <SelectItem value="pending">Pending Review</SelectItem>
                <SelectItem value="in_review">In Review</SelectItem>
                <SelectItem value="needs_revision">Needs Revision</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Is PYQ */}
          <div className="space-y-2">
            <Label htmlFor="is_pyq" className="text-sm">
              Question Source
            </Label>
            <Select
              value={filterPlugin.legacyFilters.is_pyq || "any"}
              onValueChange={(value) =>
                filterPlugin.handleLegacyFilterChange(
                  "is_pyq",
                  value === "any" ? "" : value
                )
              }
            >
              <SelectTrigger className="rounded-sm">
                <SelectValue placeholder="Any source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Source</SelectItem>
                <SelectItem value="true">Past Year Questions</SelectItem>
                <SelectItem value="false">Practice Questions</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* PYQ Year */}
          <div className="space-y-2">
            <Label htmlFor="pyq_year" className="text-sm">
              PYQ Year
            </Label>
            <Input
              placeholder="e.g., 2022"
              value={filterPlugin.legacyFilters.pyq_year || ""}
              onChange={(e) =>
                filterPlugin.handleLegacyFilterChange(
                  "pyq_year",
                  e.target.value
                )
              }
              type="number"
              className="rounded-sm"
            />
          </div>

          {/* Month */}
          <div className="space-y-2">
            <Label htmlFor="month" className="text-sm">
              Month
            </Label>
            <Select
              value={filterPlugin.legacyFilters.month || "any"}
              onValueChange={(value) =>
                filterPlugin.handleLegacyFilterChange(
                  "month",
                  value === "any" ? "" : value
                )
              }
            >
              <SelectTrigger className="rounded-sm">
                <SelectValue placeholder="Any month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Month</SelectItem>
                <SelectItem value="January">January</SelectItem>
                <SelectItem value="February">February</SelectItem>
                <SelectItem value="March">March</SelectItem>
                <SelectItem value="April">April</SelectItem>
                <SelectItem value="May">May</SelectItem>
                <SelectItem value="June">June</SelectItem>
                <SelectItem value="July">July</SelectItem>
                <SelectItem value="August">August</SelectItem>
                <SelectItem value="September">September</SelectItem>
                <SelectItem value="October">October</SelectItem>
                <SelectItem value="November">November</SelectItem>
                <SelectItem value="December">December</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Paper Number */}
          <div className="space-y-2">
            <Label htmlFor="paper_number" className="text-sm">
              Paper Number
            </Label>
            <Input
              placeholder="e.g., 1, 2, 3"
              value={filterPlugin.legacyFilters.paper_number || ""}
              onChange={(e) =>
                filterPlugin.handleLegacyFilterChange(
                  "paper_number",
                  e.target.value
                )
              }
              type="number"
              className="rounded-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
