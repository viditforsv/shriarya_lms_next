"use client";

import * as React from "react";
import { Label } from "@/design-system/components/ui/label";
import { Input } from "@/design-system/components/ui/input";
import { cn } from "@/lib/utils";

interface DifficultyRangeSliderProps {
  min: number | null;
  max: number | null;
  onChange: (min: number | null, max: number | null) => void;
  disabled?: boolean;
  className?: string;
  label?: string;
}

export function DifficultyRangeSlider({
  min,
  max,
  onChange,
  disabled = false,
  className,
  label,
}: DifficultyRangeSliderProps) {
  const [minValue, setMinValue] = React.useState<number>(min ?? 1);
  const [maxValue, setMaxValue] = React.useState<number>(max ?? 10);

  React.useEffect(() => {
    if (min !== null) setMinValue(min);
    if (max !== null) setMaxValue(max);
  }, [min, max]);

  const handleMinChange = (value: number) => {
    const newMin = Math.max(1, Math.min(value, maxValue - 1));
    setMinValue(newMin);
    onChange(newMin, maxValue);
  };

  const handleMaxChange = (value: number) => {
    const newMax = Math.min(10, Math.max(value, minValue + 1));
    setMaxValue(newMax);
    onChange(minValue, newMax);
  };

  const handleSliderChange = (type: "min" | "max", value: number, e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (type === "min") {
      handleMinChange(value);
    } else {
      handleMaxChange(value);
    }
  };

  const clearRange = () => {
    setMinValue(1);
    setMaxValue(10);
    onChange(null, null);
  };

  const hasActiveFilter = min !== null || max !== null;

  return (
    <div className={cn("w-full space-y-3", className)}>
      {label && (
        <div className="flex items-center justify-between">
          <Label className="text-xs text-gray-600">{label}</Label>
          {hasActiveFilter && (
            <button
              type="button"
              onClick={clearRange}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Clear
            </button>
          )}
        </div>
      )}
      
      <div className="space-y-2">
        {/* Slider Track */}
        <div className="relative h-2 bg-gray-200 rounded-full">
          <div
            className="absolute h-2 bg-primary rounded-full"
            style={{
              left: `${((minValue - 1) / 9) * 100}%`,
              width: `${((maxValue - minValue) / 9) * 100}%`,
            }}
          />
          <input
            type="range"
            min={1}
            max={10}
            value={minValue}
            onChange={(e) => handleSliderChange("min", parseInt(e.target.value), e)}
            disabled={disabled}
            className="absolute top-0 left-0 w-full h-2 opacity-0 cursor-pointer z-10"
            style={{ zIndex: 2 }}
          />
          <input
            type="range"
            min={1}
            max={10}
            value={maxValue}
            onChange={(e) => handleSliderChange("max", parseInt(e.target.value), e)}
            disabled={disabled}
            className="absolute top-0 left-0 w-full h-2 opacity-0 cursor-pointer z-10"
            style={{ zIndex: 3 }}
          />
        </div>

        {/* Min/Max Inputs */}
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <Label className="text-xs text-gray-500 mb-1 block">Min</Label>
            <Input
              type="number"
              min={1}
              max={maxValue - 1}
              value={minValue}
              onChange={(e) => {
                const val = parseInt(e.target.value) || 1;
                handleMinChange(val);
              }}
              disabled={disabled}
              className="h-8 text-sm"
            />
          </div>
          <div className="pt-5 text-gray-400">-</div>
          <div className="flex-1">
            <Label className="text-xs text-gray-500 mb-1 block">Max</Label>
            <Input
              type="number"
              min={minValue + 1}
              max={10}
              value={maxValue}
              onChange={(e) => {
                const val = parseInt(e.target.value) || 10;
                handleMaxChange(val);
              }}
              disabled={disabled}
              className="h-8 text-sm"
            />
          </div>
        </div>

        {/* Display Range */}
        <div className="text-xs text-center text-gray-500">
          {minValue} - {maxValue} / 10
        </div>
      </div>
    </div>
  );
}

