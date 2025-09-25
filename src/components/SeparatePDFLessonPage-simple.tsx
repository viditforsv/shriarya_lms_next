"use client";

import React from "react";

interface PDFAssignment {
  id: string;
  title: string;
  description: string;
  pdfUrl: string;
  dueDate: string;
  maxMarks: number;
  instructions: string;
  isCompleted?: boolean;
  submittedAt?: string;
  submittedFile?: string;
}

interface SeparatePDFLessonPageProps {
  courseSlug: string;
  assignmentId: string;
  assignments: PDFAssignment[];
}

export function SeparatePDFLessonPage({
  courseSlug,
  assignmentId,
  assignments,
}: SeparatePDFLessonPageProps) {
  const currentAssignment = assignments.find((a) => a.id === assignmentId);

  if (!currentAssignment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Assignment Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The requested assignment could not be found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">{currentAssignment.title}</h1>
        <p className="text-lg text-gray-600 mb-4">
          {currentAssignment.description}
        </p>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Assignment Details</h2>
          <p>
            <strong>Due Date:</strong> {currentAssignment.dueDate}
          </p>
          <p>
            <strong>Max Marks:</strong> {currentAssignment.maxMarks}
          </p>
          <p>
            <strong>Instructions:</strong> {currentAssignment.instructions}
          </p>
        </div>
      </div>
    </div>
  );
}
