"use client";

import * as React from "react";
import { Input } from "@/design-system/components/ui/input";
import { Label } from "@/design-system/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/design-system/components/popover";
import { cn } from "@/lib/utils";

interface TopicAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  suggestions: string[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  label?: string;
}

export function TopicAutocomplete({
  value,
  onChange,
  suggestions,
  placeholder = "Enter topic...",
  disabled = false,
  className,
  label,
}: TopicAutocompleteProps) {
  const [open, setOpen] = React.useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (value && suggestions.length > 0) {
      const filtered = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered.slice(0, 10)); // Limit to 10 suggestions
      setOpen(filtered.length > 0 && value.length > 0);
    } else {
      setFilteredSuggestions([]);
      setOpen(false);
    }
  }, [value, suggestions]);

  const handleSelect = (suggestion: string) => {
    onChange(suggestion);
    setOpen(false);
  };

  return (
    <div className={cn("w-full relative", className)}>
      {label && (
        <Label className="text-xs text-gray-600 mb-1 block">{label}</Label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            className="h-8 rounded-sm"
            onFocus={() => {
              if (filteredSuggestions.length > 0) setOpen(true);
            }}
          />
        </PopoverTrigger>
        {filteredSuggestions.length > 0 && (
          <PopoverContent
            className="w-[var(--radix-popover-trigger-width)] p-0"
            align="start"
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <div className="max-h-[200px] overflow-auto">
              {filteredSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="px-3 py-2 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground"
                  onClick={() => handleSelect(suggestion)}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          </PopoverContent>
        )}
      </Popover>
    </div>
  );
}

