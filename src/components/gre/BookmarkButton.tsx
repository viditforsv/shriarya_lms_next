"use client";

import { Button } from '@/design-system/components/ui/button';
import { Bookmark, BookmarkCheck } from 'lucide-react';

interface BookmarkButtonProps {
  isBookmarked: boolean;
  onToggle: () => void;
}

export function BookmarkButton({ isBookmarked, onToggle }: BookmarkButtonProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onToggle}
      className={`border-gray-300 ${
        isBookmarked
          ? 'bg-yellow-50 border-yellow-400 text-yellow-700 hover:bg-yellow-100'
          : 'hover:bg-gray-50'
      }`}
      title={isBookmarked ? 'Remove bookmark' : 'Bookmark question'}
    >
      {isBookmarked ? (
        <BookmarkCheck className="w-4 h-4 mr-1 fill-yellow-600" />
      ) : (
        <Bookmark className="w-4 h-4 mr-1" />
      )}
      {isBookmarked ? 'Bookmarked' : 'Bookmark'}
    </Button>
  );
}

