"use client";

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/design-system/components/ui/dialog';
import { Button } from '@/design-system/components/ui/button';
import { Textarea } from '@/design-system/components/ui/textarea';
import { Save, FileText } from 'lucide-react';

interface NotesPanelProps {
  questionId: string;
  initialNote: string;
  onSave: (note: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function NotesPanel({
  questionId,
  initialNote,
  onSave,
  isOpen,
  onClose
}: NotesPanelProps) {
  const [note, setNote] = useState(initialNote);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setNote(initialNote);
    setHasChanges(false);
  }, [questionId, initialNote, isOpen]);

  const handleSave = () => {
    onSave(note);
    setHasChanges(false);
    onClose();
  };

  const handleChange = (value: string) => {
    setNote(value);
    setHasChanges(value !== initialNote);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-gray-700" />
            Notes
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto py-4">
          <Textarea
            value={note}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Add your notes here... You can use LaTeX for math: $x^2$ for inline or $$x^2$$ for display."
            className="min-h-[300px] text-sm resize-none"
          />
          <p className="text-xs text-gray-500 mt-2">
            Tip: Use $...$ for inline math and $$...$$ for display math
          </p>
        </div>

        <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!hasChanges}
            className="bg-gray-900 hover:bg-gray-800"
          >
            <Save className="w-4 h-4 mr-1" />
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

