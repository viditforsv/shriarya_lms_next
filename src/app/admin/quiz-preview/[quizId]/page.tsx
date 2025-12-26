"use client";

import { useParams } from "next/navigation";
import { Button } from "@/design-system/components/ui/button";
import { QuizPlayer } from "@/components/QuizPlayer";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function QuizPreviewPage() {
  const params = useParams();
  const quizId = params.quizId as string;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-emerald-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <Link href="/admin/quiz-manager">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Quiz Manager
            </Button>
          </Link>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg mb-6">
            <h2 className="text-lg font-semibold text-blue-900 mb-1">
              Quiz Preview Mode
            </h2>
            <p className="text-sm text-blue-700">
              This is how students will see and interact with this quiz. You can
              test all features including answer selection, feedback, and
              scoring.
            </p>
          </div>
        </div>

        {/* Quiz Player */}
        <QuizPlayer quizId={quizId} />
      </div>
    </div>
  );
}

