"use client";

import { useState } from "react";
import { Button } from "@/design-system/components/ui/button";
import { Input } from "@/design-system/components/ui/input";
import { Label } from "@/design-system/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/design-system/components/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/design-system/components/ui/card";
import { Plus, Trash2, Filter, X, RotateCcw, Save } from "lucide-react";

// Types for advanced filtering
type FilterValue = string | number | boolean | string[] | null;

interface FilterCondition {
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
  value: FilterValue;
  logic?: "AND" | "OR";
}

interface FilterGroup {
  conditions: FilterCondition[];
  logic: "AND" | "OR";
}

type AdvancedFilter = FilterCondition | FilterGroup;

interface AdvancedFilterBuilderProps {
  onFiltersChange: (filters: AdvancedFilter[]) => void;
  onClose: () => void;
}

const AVAILABLE_FIELDS = [
  { value: "difficulty", label: "Difficulty" },
  { value: "subject", label: "Subject" },
  { value: "question_type", label: "Question Type" },
  { value: "board", label: "Board" },
  { value: "grade", label: "Grade" },
  { value: "topic", label: "Topic" },
  { value: "is_pyq", label: "Is PYQ" },
  { value: "pyq_year", label: "PYQ Year" },
  { value: "month", label: "Month" },
  { value: "paper_number", label: "Paper Number" },
  { value: "total_marks", label: "Total Marks" },
];

const OPERATORS = [
  { value: "eq", label: "Equals", description: "Field equals value" },
  {
    value: "neq",
    label: "Not Equals",
    description: "Field does not equal value",
  },
  {
    value: "gt",
    label: "Greater Than",
    description: "Field is greater than value",
  },
  {
    value: "gte",
    label: "Greater Than or Equal",
    description: "Field is greater than or equal to value",
  },
  { value: "lt", label: "Less Than", description: "Field is less than value" },
  {
    value: "lte",
    label: "Less Than or Equal",
    description: "Field is less than or equal to value",
  },
  {
    value: "in",
    label: "In",
    description: "Field is in list of values (comma-separated)",
  },
  {
    value: "nin",
    label: "Not In",
    description: "Field is not in list of values (comma-separated)",
  },
  {
    value: "like",
    label: "Contains",
    description: "Field contains value (case-sensitive)",
  },
  {
    value: "ilike",
    label: "Contains (Ignore Case)",
    description: "Field contains value (case-insensitive)",
  },
  { value: "is", label: "Is", description: "Field is null/not null" },
  { value: "not", label: "Is Not", description: "Field is not null/not null" },
];

export default function AdvancedFilterBuilder({
  onFiltersChange,
  onClose,
}: AdvancedFilterBuilderProps) {
  const [filters, setFilters] = useState<AdvancedFilter[]>([]);
  const [showAddCondition, setShowAddCondition] = useState(false);
  const [newCondition, setNewCondition] = useState<FilterCondition>({
    field: "difficulty",
    operator: "eq",
    value: "",
  });

  const addCondition = () => {
    if (newCondition.value !== "") {
      setFilters([...filters, newCondition]);
      setNewCondition({
        field: "difficulty",
        operator: "eq",
        value: "",
      });
      setShowAddCondition(false);
    }
  };

  const removeCondition = (index: number) => {
    setFilters(filters.filter((_, i) => i !== index));
  };

  const updateCondition = (
    index: number,
    field: keyof FilterCondition,
    value: FilterValue
  ) => {
    const updatedFilters = [...filters];
    if (updatedFilters[index] && !("conditions" in updatedFilters[index])) {
      const condition = updatedFilters[index] as FilterCondition;
      (condition as unknown as Record<string, FilterValue>)[field] = value;
      setFilters(updatedFilters);
    }
  };

  const applyFilters = () => {
    onFiltersChange(filters);
    onClose();
  };

  const clearFilters = () => {
    setFilters([]);
    setNewCondition({
      field: "difficulty",
      operator: "eq",
      value: "",
    });
  };

  const getFieldValueType = (field: string) => {
    switch (field) {
      case "difficulty":
      case "pyq_year":
      case "paper_number":
      case "total_marks":
        return "number";
      case "is_pyq":
        return "boolean";
      case "subject":
        return "select";
      case "question_type":
        return "select";
      case "board":
        return "select";
      case "grade":
        return "select";
      default:
        return "text";
    }
  };

  const getFieldOptions = (field: string) => {
    switch (field) {
      case "subject":
        return [
          "IBDP Mathematics AA HL",
          "IBDP Mathematics AI HL",
          "IBDP Mathematics AA SL",
          "IBDP Mathematics AI SL",
          "CBSE Mathematics",
          "ICSE Mathematics",
          "IGCSE Mathematics",
        ];
      case "question_type":
        return ["MCQ", "Short Answer", "Long Answer", "Numerical"];
      case "board":
        return ["IBDP", "CBSE", "ICSE", "IGCSE", "A-Levels", "SAT", "ACT"];
      case "grade":
        return ["9", "10", "11", "12", "13"];
      default:
        return [];
    }
  };

  const renderValueInput = (
    field: string,
    value: FilterValue,
    onChange: (value: FilterValue) => void
  ) => {
    const fieldType = getFieldValueType(field);

    switch (fieldType) {
      case "number":
        return (
          <Input
            type="number"
            value={typeof value === "number" ? value : ""}
            onChange={(e) =>
              onChange(e.target.value ? parseInt(e.target.value) : "")
            }
            placeholder="Enter number"
          />
        );
      case "boolean":
        return (
          <Select
            value={value?.toString() || ""}
            onValueChange={(val) => onChange(val === "true")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select boolean value" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">True</SelectItem>
              <SelectItem value="false">False</SelectItem>
            </SelectContent>
          </Select>
        );
      case "select": {
        const options = getFieldOptions(field);
        return (
          <Select value={typeof value === "string" ? value : ""} onValueChange={onChange}>
            <SelectTrigger>
              <SelectValue placeholder={`Select ${field}`} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      }
      default:
        return (
          <Input
            type="text"
            value={typeof value === "string" ? value : ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter value"
          />
        );
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Advanced Filter Builder
            </CardTitle>
            <CardDescription>
              Create complex filter conditions with logical operators
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Filters */}
        {filters.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                Current Filters ({filters.length})
              </h3>
              <Button variant="outline" size="sm" onClick={clearFilters}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            </div>

            <div className="space-y-2">
              {filters.map((filter, index) => {
                if ("conditions" in filter) {
                  // Handle filter group (not implemented in this simple version)
                  return null;
                } else {
                  const condition = filter as FilterCondition;

                  return (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-3 border rounded-lg bg-gray-50"
                    >
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <Label className="text-sm font-medium">Field</Label>
                          <Select
                            value={condition.field}
                            onValueChange={(value) =>
                              updateCondition(index, "field", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {AVAILABLE_FIELDS.map((field) => (
                                <SelectItem
                                  key={field.value}
                                  value={field.value}
                                >
                                  {field.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label className="text-sm font-medium">
                            Operator
                          </Label>
                          <Select
                            value={condition.operator}
                            onValueChange={(value) =>
                              updateCondition(index, "operator", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {OPERATORS.map((op) => (
                                <SelectItem key={op.value} value={op.value}>
                                  <div>
                                    <div className="font-medium">
                                      {op.label}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      {op.description}
                                    </div>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="md:col-span-2">
                          <Label className="text-sm font-medium">Value</Label>
                          {renderValueInput(
                            condition.field,
                            condition.value,
                            (value) => updateCondition(index, "value", value)
                          )}
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeCondition(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        )}

        {/* Add New Condition */}
        <div className="space-y-4">
          {!showAddCondition ? (
            <Button
              onClick={() => setShowAddCondition(true)}
              className="w-full"
              variant="outline"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Filter Condition
            </Button>
          ) : (
            <div className="p-4 border rounded-lg bg-blue-50">
              <h4 className="font-medium mb-4">Add New Filter Condition</h4>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <Label className="text-sm font-medium">Field</Label>
                  <Select
                    value={newCondition.field}
                    onValueChange={(value) =>
                      setNewCondition({ ...newCondition, field: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {AVAILABLE_FIELDS.map((field) => (
                        <SelectItem key={field.value} value={field.value}>
                          {field.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium">Operator</Label>
                  <Select
                    value={newCondition.operator}
                    onValueChange={(value) =>
                      setNewCondition({
                        ...newCondition,
                        operator: value as FilterCondition["operator"],
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {OPERATORS.map((op) => (
                        <SelectItem key={op.value} value={op.value}>
                          <div>
                            <div className="font-medium">{op.label}</div>
                            <div className="text-xs text-gray-500">
                              {op.description}
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-2">
                  <Label className="text-sm font-medium">Value</Label>
                  {renderValueInput(
                    newCondition.field,
                    newCondition.value,
                    (value) => setNewCondition({ ...newCondition, value })
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={addCondition} size="sm">
                  Add Condition
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAddCondition(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Example Usage */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-2">Example Usage:</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <p>
              • <strong>Difficulty of 9 OR difficulty of not 8:</strong> Add two
              conditions: &quot;difficulty equals 9&quot; and &quot;difficulty
              not equals 8&quot;
            </p>
            <p>
              • <strong>Questions with marks greater than 5:</strong> Add
              condition: &quot;total_marks greater than 5&quot;
            </p>
            <p>
              • <strong>PYQ from years 2020-2023:</strong> Add condition:
              &quot;pyq_year in 2020,2021,2022,2023&quot;
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={applyFilters} disabled={filters.length === 0}>
            <Save className="h-4 w-4 mr-2" />
            Apply Filters ({filters.length})
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
