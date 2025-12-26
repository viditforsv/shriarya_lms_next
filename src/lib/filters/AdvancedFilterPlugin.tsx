"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/design-system/components/ui/button";
import { Badge } from "@/design-system/components/ui/badge";
import { X, Filter, RotateCcw } from "lucide-react";
import AdvancedFilterBuilder from "@/components/AdvancedFilterBuilder";

// Core filter types
export interface FilterCondition {
  field: string;
  operator:
    | "eq"
    | "neq"
    | "gt"
    | "gte"
    | "lt"
    | "lte"
    | "in"
    | "nin"
    | "like"
    | "ilike"
    | "is"
    | "not";
  value: unknown;
  logic?: "AND" | "OR";
}

export interface FilterGroup {
  conditions: FilterCondition[];
  logic: "AND" | "OR";
}

export type AdvancedFilter = FilterCondition | FilterGroup;

// Plugin configuration interface
export interface FilterPluginConfig {
  // API endpoint for filtering
  apiEndpoint: string;

  // Available fields for filtering
  availableFields: Array<{
    value: string;
    label: string;
    type?: "text" | "number" | "boolean" | "select";
    options?: string[];
  }>;

  // Legacy filters (for backward compatibility)
  legacyFilters?: Record<string, string>;

  // Callbacks
  onFiltersChange?: (filters: AdvancedFilter[]) => void;
  onLegacyFiltersChange?: (filters: Record<string, string>) => void;

  // UI customization
  showAdvancedButton?: boolean;
  showLegacyFilters?: boolean;
  showActiveFilters?: boolean;
  customFilterDisplay?: (filters: AdvancedFilter[]) => React.ReactNode;

  // API request customization
  buildRequestParams?: (
    advancedFilters: AdvancedFilter[],
    legacyFilters: Record<string, string>
  ) => Record<string, string | number | boolean>;

  // Preview functionality
  enablePreview?: boolean;
  onPreviewChange?: (count: number) => void;
}

// Plugin hook
export function useAdvancedFilterPlugin(config: FilterPluginConfig) {
  const [advancedFilters, setAdvancedFilters] = useState<AdvancedFilter[]>([]);
  const [legacyFilters, setLegacyFilters] = useState<Record<string, string>>(
    config.legacyFilters || {}
  );
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [previewCount, setPreviewCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // Handle advanced filter changes
  const handleAdvancedFiltersChange = useCallback(
    (filters: AdvancedFilter[]) => {
      setAdvancedFilters(filters);
      config.onFiltersChange?.(filters);

      // Clear legacy filters when using advanced filters
      if (filters.length > 0) {
        setLegacyFilters({});
        config.onLegacyFiltersChange?.({});
      }
    },
    [config]
  );

  // Handle legacy filter changes
  const handleLegacyFilterChange = useCallback(
    (key: string, value: string) => {
      const newLegacyFilters = {
        ...legacyFilters,
        [key]: value || "",
      };

      // Don't remove empty values - keep the structure for the form
      setLegacyFilters(newLegacyFilters);

      // Only call the callback with non-empty values for API calls
      const apiFilters = { ...newLegacyFilters };
      Object.keys(apiFilters).forEach((k) => {
        if (!apiFilters[k] || apiFilters[k] === "") {
          delete apiFilters[k];
        }
      });

      config.onLegacyFiltersChange?.(apiFilters);

      // Clear advanced filters when using legacy filters with actual values
      if (Object.keys(apiFilters).length > 0) {
        setAdvancedFilters([]);
        config.onFiltersChange?.([]);
      }
    },
    [legacyFilters, config]
  );

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    setAdvancedFilters([]);
    setLegacyFilters(config.legacyFilters || {});
    setPreviewCount(0);
    config.onFiltersChange?.([]);
    config.onLegacyFiltersChange?.(config.legacyFilters || {});
  }, [config]);

  // Preview functionality
  const previewFilters = useCallback(async () => {
    if (!config.enablePreview) return;

    setLoading(true);
    try {
      const requestParams = config.buildRequestParams
        ? config.buildRequestParams(advancedFilters, legacyFilters)
        : {
            ...(advancedFilters.length > 0 && {
              advanced_filters: JSON.stringify(advancedFilters),
            }),
            ...legacyFilters,
            preview: true,
            limit: 1,
          };

      const params = new URLSearchParams();
      Object.entries(requestParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          params.append(key, value.toString());
        }
      });

      const response = await fetch(`${config.apiEndpoint}?${params}`);
      if (response.ok) {
        const data = await response.json();
        const count = data.count || data.total || 0;
        setPreviewCount(count);
        config.onPreviewChange?.(count);
      }
    } catch (error) {
      console.error("Error previewing filters:", error);
    } finally {
      setLoading(false);
    }
  }, [advancedFilters, legacyFilters, config]);

  // Auto-preview when filters change
  useEffect(() => {
    if (config.enablePreview) {
      previewFilters();
    }
  }, [advancedFilters, legacyFilters, previewFilters, config.enablePreview]);

  // Check if any filters are active
  const hasActiveFilters = () => {
    return advancedFilters.length > 0 || Object.keys(legacyFilters).length > 0;
  };

  // Get active filter count
  const getActiveFilterCount = () => {
    return advancedFilters.length + Object.keys(legacyFilters).length;
  };

  return {
    // State
    advancedFilters,
    legacyFilters,
    showAdvancedFilters,
    previewCount,
    loading,

    // Actions
    setShowAdvancedFilters,
    handleAdvancedFiltersChange,
    handleLegacyFilterChange,
    clearAllFilters,
    previewFilters,

    // Utilities
    hasActiveFilters,
    getActiveFilterCount,

    // Configuration
    config,
  };
}

// Plugin UI Component
export interface FilterPluginUIProps {
  plugin: ReturnType<typeof useAdvancedFilterPlugin>;
  className?: string;
}

export function FilterPluginUI({
  plugin,
  className = "",
}: FilterPluginUIProps) {
  const {
    advancedFilters,
    legacyFilters,
    showAdvancedFilters,
    previewCount,
    loading,
    setShowAdvancedFilters,
    handleAdvancedFiltersChange,
    clearAllFilters,
    hasActiveFilters,
    getActiveFilterCount,
    config,
  } = plugin;

  if (
    !config.showAdvancedButton &&
    !config.showLegacyFilters &&
    !config.showActiveFilters
  ) {
    return null;
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Advanced Filter Button */}
      {config.showAdvancedButton && (
        <Button
          variant="outline"
          onClick={() => setShowAdvancedFilters(true)}
          className="flex items-center gap-2 text-blue-600 border-blue-300 hover:bg-blue-50"
        >
          <Filter className="w-4 h-4" />
          Advanced Filters
        </Button>
      )}

      {/* Active Filters Display */}
      {config.showActiveFilters && hasActiveFilters() && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
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
              onClick={clearAllFilters}
              className="text-blue-600 border-blue-300 hover:bg-blue-100"
            >
              <RotateCcw className="w-3 h-3 mr-1" />
              Reset All
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {advancedFilters.length > 0
              ? config.customFilterDisplay
                ? config.customFilterDisplay(advancedFilters)
                : advancedFilters.map((filter, index) => {
                    const condition = filter as FilterCondition;
                    const operatorInfo: Record<string, string> = {
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
                        className="flex items-center gap-1"
                      >
                        {condition.field} {operatorInfo[condition.operator]}{" "}
                        {String(condition.value)}
                        <X
                          className="w-3 h-3 cursor-pointer hover:text-red-600"
                          onClick={() => {
                            const newFilters = advancedFilters.filter(
                              (_, i) => i !== index
                            );
                            handleAdvancedFiltersChange(newFilters);
                          }}
                        />
                      </Badge>
                    );
                  })
              : Object.entries(legacyFilters).map(([key, value]) => {
                  if (!value || value === "") return null;
                  return (
                    <Badge
                      key={key}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {key.replace("_", " ")}: {value}
                      <X
                        className="w-3 h-3 cursor-pointer hover:text-red-600"
                        onClick={() => plugin.handleLegacyFilterChange(key, "")}
                      />
                    </Badge>
                  );
                })}
          </div>
        </div>
      )}

      {/* Preview Display */}
      {config.enablePreview && hasActiveFilters() && (
        <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2">
            {loading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600" />
            ) : (
              <div className="h-4 w-4 bg-green-600 rounded-full" />
            )}
            <span className="text-sm font-medium text-green-800">
              {loading
                ? "Counting..."
                : `${previewCount} questions match the filters`}
            </span>
          </div>
        </div>
      )}

      {/* Advanced Filter Builder Modal */}
      {showAdvancedFilters && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <AdvancedFilterBuilder
              onFiltersChange={handleAdvancedFiltersChange}
              onClose={() => setShowAdvancedFilters(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// Utility function to create filter configurations
export function createFilterConfig(
  config: Partial<FilterPluginConfig>
): FilterPluginConfig {
  return {
    showAdvancedButton: true,
    showLegacyFilters: true,
    showActiveFilters: true,
    enablePreview: false,
    apiEndpoint: config.apiEndpoint || "/api/question-bank",
    buildRequestParams: (advancedFilters, legacyFilters) => ({
      ...(advancedFilters.length > 0 && {
        advanced_filters: JSON.stringify(advancedFilters),
      }),
      ...legacyFilters,
    }),
    availableFields: [],
    ...config,
  };
}
