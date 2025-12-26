"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Badge } from "@/design-system/components/ui/badge";
import { cn } from "@/lib/utils";

interface FilterChip {
  key: string;
  label: string;
  value: string | string[];
  category: string;
  onRemove: () => void;
}

interface FilterChipsProps {
  filters: FilterChip[];
  onClearAll?: () => void;
  className?: string;
}

export function FilterChips({ filters, onClearAll, className }: FilterChipsProps) {
  if (filters.length === 0) return null;

  const groupedFilters = filters.reduce((acc, filter) => {
    if (!acc[filter.category]) {
      acc[filter.category] = [];
    }
    acc[filter.category].push(filter);
    return acc;
  }, {} as Record<string, FilterChip[]>);

  const displayValue = (value: string | string[]): string => {
    if (Array.isArray(value)) {
      if (value.length === 0) return "";
      if (value.length === 1) return value[0];
      return `${value.length} selected`;
    }
    return value;
  };

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium text-gray-700">
          Active Filters ({filters.length})
        </div>
        {onClearAll && (
          <button
            type="button"
            onClick={onClearAll}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="space-y-2">
        {Object.entries(groupedFilters).map(([category, categoryFilters]) => (
          <div key={category}>
            <div className="text-xs font-medium text-gray-500 mb-1">
              {category}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {categoryFilters.map((filter) => {
                const value = displayValue(filter.value);
                if (!value) return null;
                return (
                  <Badge
                    key={filter.key}
                    variant="secondary"
                    className="text-xs px-2 py-1 flex items-center gap-1"
                  >
                    <span>
                      {filter.label}: {value}
                    </span>
                    <button
                      type="button"
                      onClick={filter.onRemove}
                      className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

