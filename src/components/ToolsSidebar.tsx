"use client";

import { useState } from "react";
import {
  ChevronRight,
  ChevronDown,
  Calculator,
  FunctionSquare,
  BarChart3,
} from "lucide-react";

interface ToolsSidebarProps {
  selectedTool: string;
  onSelectTool: (toolId: string) => void;
}

const toolsCategories = [
  {
    id: "algebra",
    name: "Algebra",
    icon: FunctionSquare,
    tools: [
      { id: "quadratic", name: "Quadratic Equations" },
      { id: "linear", name: "Linear Equations" },
    ],
  },
  {
    id: "statistics",
    name: "Statistics",
    icon: BarChart3,
    tools: [
      { id: "binomial", name: "Binomial Distribution" },
      { id: "normal", name: "Normal Distribution" },
      { id: "inverse-normal", name: "Inverse Normal Distribution" },
      { id: "poisson", name: "Poisson Distribution" },
    ],
  },
  // Future categories can be added here
  // {
  //   id: "geometry",
  //   name: "Geometry",
  //   icon: Shapes,
  //   tools: []
  // }
];

export function ToolsSidebar({
  selectedTool,
  onSelectTool,
}: ToolsSidebarProps) {
  const [expandedCategory, setExpandedCategory] =
    useState<string>("statistics");

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? "" : categoryId);
  };

  return (
    <div className="w-80 bg-card border-r border-border flex flex-col h-screen sticky top-0">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <h1 className="text-2xl font-bold text-foreground">Free Tools</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Math calculators & solvers
        </p>
      </div>

      {/* Categories */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {toolsCategories.map((category) => {
            const Icon = category.icon;
            const isExpanded = expandedCategory === category.id;
            const hasActiveTool = category.tools.some(
              (tool) => tool.id === selectedTool
            );

            return (
              <div key={category.id} className="space-y-1">
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(category.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 text-left rounded-sm transition-colors ${
                    hasActiveTool && !isExpanded
                      ? "bg-accent/10 text-accent font-medium"
                      : "hover:bg-muted/50 text-foreground"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{category.name}</span>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>

                {/* Tools List */}
                {isExpanded && (
                  <div className="ml-6 space-y-1">
                    {category.tools.map((tool) => {
                      const isActive = tool.id === selectedTool;
                      return (
                        <button
                          key={tool.id}
                          onClick={() => onSelectTool(tool.id)}
                          className={`w-full flex items-center space-x-3 px-4 py-2.5 text-left rounded-sm transition-colors ${
                            isActive
                              ? "bg-accent text-accent-foreground font-medium"
                              : "hover:bg-muted/50 text-muted-foreground"
                          }`}
                        >
                          <Calculator className="w-4 h-4" />
                          <span className="text-sm">{tool.name}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          More tools coming soon
        </p>
      </div>
    </div>
  );
}
