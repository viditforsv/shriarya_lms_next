"use client";

import React, { useState, KeyboardEvent } from "react";
import { X, Plus } from "lucide-react";

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  maxTags?: number;
}

export function TagInput({
  tags,
  onChange,
  placeholder = "Add tags...",
  maxTags = 10,
}: TagInputProps) {
  const [inputValue, setInputValue] = useState("");

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !tags.includes(trimmedTag) && tags.length < maxTags) {
      onChange([...tags, trimmedTag]);
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      if (inputValue.trim()) {
        addTag(inputValue);
        setInputValue("");
      }
    } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
      removeTag(tags[tags.length - 1]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, ""); // Remove commas as user types
    setInputValue(value);
  };

  const handleInputBlur = () => {
    if (inputValue.trim()) {
      addTag(inputValue);
      setInputValue("");
    }
  };

  return (
    <div className="w-full">
      {/* Tags Container */}
      <div className="flex flex-wrap gap-2 mb-3 min-h-[40px]">
        {tags.map((tag, index) => (
          <TagPill
            key={`${tag}-${index}`}
            tag={tag}
            onRemove={() => removeTag(tag)}
          />
        ))}
        {tags.length === 0 && (
          <div className="text-sm text-muted-foreground italic">
            No tags added yet
          </div>
        )}
      </div>

      {/* Input Container */}
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={handleInputBlur}
          placeholder={placeholder}
          disabled={tags.length >= maxTags}
          className={`
            w-full px-4 py-2 rounded-full border-0 outline-none transition-all duration-200
            bg-gradient-to-br from-gray-50 to-gray-100
            shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1),inset_-2px_-2px_4px_rgba(255,255,255,0.8)]
            hover:shadow-[inset_2px_2px_6px_rgba(0,0,0,0.12),inset_-2px_-2px_6px_rgba(255,255,255,0.9)]
            focus:shadow-[inset_2px_2px_6px_rgba(0,0,0,0.15),inset_-2px_-2px_6px_rgba(255,255,255,0.95)]
            disabled:opacity-50 disabled:cursor-not-allowed
            text-sm
          `}
        />
        {tags.length < maxTags && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Plus className="w-4 h-4 text-gray-400" />
          </div>
        )}
      </div>

      {/* Helper Text */}
      <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
        <span>Press Enter or comma to add tags</span>
        <span>
          {tags.length}/{maxTags} tags
        </span>
      </div>
    </div>
  );
}

interface TagPillProps {
  tag: string;
  onRemove: () => void;
}

function TagPill({ tag, onRemove }: TagPillProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`
        inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium
        transition-all duration-200 cursor-pointer select-none
        ${
          isHovered
            ? "shadow-[4px_4px_8px_rgba(147,51,234,0.3),-2px_-2px_4px_rgba(255,255,255,0.8)] bg-gradient-to-br from-purple-400 to-purple-500 text-white"
            : "shadow-[2px_2px_4px_rgba(0,0,0,0.1),-1px_-1px_2px_rgba(255,255,255,0.8)] bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700"
        }
        hover:shadow-[4px_4px_8px_rgba(147,51,234,0.3),-2px_-2px_4px_rgba(255,255,255,0.8)]
        hover:bg-gradient-to-br hover:from-purple-400 hover:to-purple-500 hover:text-white
        active:shadow-[inset_1px_1px_2px_rgba(0,0,0,0.2),inset_-1px_-1px_2px_rgba(255,255,255,0.8)]
        active:scale-95
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onRemove}
    >
      <span>{tag}</span>
      <button
        className={`
          ml-1 rounded-full p-0.5 transition-all duration-200
          ${
            isHovered
              ? "hover:bg-white/20 text-white"
              : "hover:bg-gray-300 text-gray-500"
          }
        `}
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  );
}
