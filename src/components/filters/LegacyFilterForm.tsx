"use client";

import { Label } from "@/design-system/components/ui/label";
import { Input } from "@/design-system/components/ui/input";
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
  CardHeader,
  CardTitle,
} from "@/design-system/components/ui/card";
import { Filter } from "lucide-react";

type FilterField = {
  value: string;
  label: string;
  type?: "text" | "number" | "boolean" | "select";
  options?: string[];
};

interface LegacyFilterFormProps {
  filters: Record<string, string>;
  onFilterChange: (key: string, value: string) => void;
  availableFields: FilterField[];
  className?: string;
}

export default function LegacyFilterForm({
  filters,
  onFilterChange,
  availableFields,
  className = "",
}: LegacyFilterFormProps) {
  const renderFieldInput = (field: FilterField) => {
    const value = filters[field.value] || "";

    switch (field.type) {
      case "number":
        return (
          <Input
            type="number"
            value={value}
            onChange={(e) => onFilterChange(field.value, e.target.value)}
            placeholder={`Enter ${field.label.toLowerCase()}`}
          />
        );
      case "boolean":
        return (
          <Select
            value={value}
            onValueChange={(val) => onFilterChange(field.value, val)}
          >
            <SelectTrigger>
              <SelectValue
                placeholder={`Select ${field.label.toLowerCase()}`}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">True</SelectItem>
              <SelectItem value="false">False</SelectItem>
            </SelectContent>
          </Select>
        );
      case "select":
        return (
          <Select
            value={value}
            onValueChange={(val) => onFilterChange(field.value, val)}
          >
            <SelectTrigger>
              <SelectValue
                placeholder={`Select ${field.label.toLowerCase()}`}
              />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option: string) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      default:
        return (
          <Input
            type="text"
            value={value}
            onChange={(e) => onFilterChange(field.value, e.target.value)}
            placeholder={`Enter ${field.label.toLowerCase()}`}
          />
        );
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Simple Filters
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableFields.map((field) => (
            <div key={field.value} className="space-y-2">
              <Label htmlFor={field.value}>{field.label}</Label>
              {renderFieldInput(field)}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
