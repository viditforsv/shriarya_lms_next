"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components-demo/ui/ui-components/card";
import { Button } from "@/app/components-demo/ui/ui-components/button";
import { Badge } from "@/app/components-demo/ui/ui-components/badge";
import { BookOpen, Eye, EyeOff } from "lucide-react";
import { renderMixedContent } from "@/components/MathRenderer";

interface Question {
  id: string;
  subject: string;
  grade: string;
  topic: string;
  subtopic: string;
  tags: string[];
  question_text: string;
  image_url?: string;
  question_type: "mcq" | "subjective" | "numerical" | "true_false";
  options?: string[];
  correct_answers?: string[];
  correct_answer?: string; // For database compatibility
  explanation?: string;
  solution_steps?: Array<{
    step: number;
    text: string;
  }>;
  solution_image?: string;
  difficulty: number;
  // Flexible content structure
  question_content?: {
    metadata: {
      question_number?: string;
      total_marks?: number;
      title?: string;
      description?: string;
    };
    sections: Array<{
      type: "text" | "image" | "sub_questions" | "mcq_options";
      content?:
        | string
        | Array<{
            part: string;
            text: string;
            marks: number;
            type: string;
          }>;
      media_id?: string;
      caption?: string;
      order: number;
    }>;
  };
  media_attachments?: Array<{
    id: string;
    type: "image" | "video" | "audio";
    url: string;
    alt_text?: string;
    caption?: string;
    order: number;
  }>;
  solution_content?: {
    metadata: {
      total_steps?: number;
      difficulty?: string;
    };
    sections: Array<{
      type: "step" | "image" | "text";
      step_number?: number;
      title?: string;
      content?: string;
      explanation?: string;
      media_id?: string;
      order: number;
    }>;
  };
}

export default function SampleQuestionPage() {
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [showSolution, setShowSolution] = useState(false);
  const [question, setQuestion] = useState<Question | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Helper function to get media by ID
  const getMediaById = (mediaId: string) => {
    return question?.media_attachments?.find((media) => media.id === mediaId);
  };

  // Helper function to render question sections
  const renderQuestionSections = () => {
    if (!question?.question_content?.sections) {
      // Fallback to old structure
      return (
        <>
          <div className="prose prose-lg max-w-none">
            <div className="text-[#1e293b] leading-relaxed text-lg">
              {renderMixedContent(question?.question_text || "")}
            </div>
          </div>
          {question?.image_url && (
            <div className="flex justify-center">
              <div className="border rounded-sm p-4 bg-white">
                <img
                  src={`/api/cdn-proxy?url=${encodeURIComponent(
                    question?.image_url || ""
                  )}`}
                  alt="Question diagram"
                  className="max-w-full h-auto rounded-sm"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            </div>
          )}
        </>
      );
    }

    return question.question_content.sections
      .sort((a, b) => a.order - b.order)
      .map((section, index) => {
        switch (section.type) {
          case "text":
            return (
              <div key={index} className="prose prose-lg max-w-none">
                <div className="text-[#1e293b] leading-relaxed text-lg">
                  {renderMixedContent((section.content as string) || "")}
                </div>
              </div>
            );

          case "image":
            const media = getMediaById(section.media_id || "");
            if (!media) return null;
            return (
              <div key={index} className="flex justify-center">
                <div className="border rounded-sm p-4 bg-white">
                  <img
                    src={`/api/cdn-proxy?url=${encodeURIComponent(media.url)}`}
                    alt={
                      media.alt_text || section.caption || "Question diagram"
                    }
                    className="max-w-full h-auto rounded-sm"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  {section.caption && (
                    <p className="text-center text-sm text-gray-600 mt-2">
                      {section.caption}
                    </p>
                  )}
                </div>
              </div>
            );

          case "sub_questions":
            if (!section.content || !Array.isArray(section.content))
              return null;
            return (
              <div key={index} className="space-y-3">
                {section.content.map((subQ, subIndex) => (
                  <div
                    key={subIndex}
                    className="flex items-start justify-between space-x-4"
                  >
                    <div className="flex items-start space-x-3 flex-1">
                      <span className="font-semibold text-[#1e293b] text-lg">
                        ({subQ.part})
                      </span>
                      <div className="text-[#1e293b] leading-relaxed flex-1">
                        {renderMixedContent(subQ.text)}
                      </div>
                    </div>
                    <Badge className="bg-gray-600 text-white rounded-sm text-xs whitespace-nowrap">
                      [{subQ.marks}]
                    </Badge>
                  </div>
                ))}
              </div>
            );

          default:
            return null;
        }
      });
  };

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/question-bank/sample");
        if (!response.ok) {
          throw new Error("Failed to fetch question");
        }
        const data = await response.json();
        setQuestion(data.question);
      } catch (err) {
        console.error("Error fetching question:", err);
        setError("Failed to load question");
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestion();
  }, []);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">
              Loading Question...
            </h1>
            <p className="text-gray-600">
              Please wait while we fetch the question
            </p>
          </div>
          <Card className="rounded-sm">
            <CardContent className="p-8">
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error || !question) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">
              Error Loading Question
            </h1>
            <p className="text-gray-600">{error || "Question not found"}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8">
      <div className="max-w-4xl mx-auto px-4 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-[#1e293b] font-dm-sans">
            {question.question_content?.metadata?.question_number
              ? `Question ${question.question_content.metadata.question_number}`
              : "Sample Question"}
          </h1>
          <p className="text-slate-600">
            IBDP Mathematics AA HL - Functions
            {question.question_content?.metadata?.total_marks &&
              question.question_content.metadata.total_marks > 0 && (
                <span className="ml-2 font-semibold text-[#e27447]">
                  [{question.question_content.metadata.total_marks} marks]
                </span>
              )}
          </p>
        </div>

        {/* Question Card */}
        <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200 rounded-sm">
          <CardHeader className="pb-4">
            {/* Tags/Badges at the top */}
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className="bg-[#e27447] text-white rounded-sm">
                {question.question_type.charAt(0).toUpperCase() +
                  question.question_type.slice(1)}
              </Badge>
              <Badge variant="outline" className="rounded-sm">
                Difficulty: {question.difficulty}/10
              </Badge>
              <Badge variant="outline" className="rounded-sm">
                {question.grade}
              </Badge>
              <Badge variant="outline" className="rounded-sm">
                {question.topic}
              </Badge>
            </div>

            <div className="flex items-center space-x-3">
              <BookOpen className="h-5 w-5 text-[#1e293b]" />
              <div>
                <CardTitle className="text-xl text-[#1e293b] font-dm-sans">
                  {question.subtopic}
                </CardTitle>
                <CardDescription className="text-slate-600">
                  IBDP Mathematics AA HL
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Flexible Question Content */}
            {renderQuestionSections()}

            {/* Answer Section - Conditional based on question type */}
            {question.question_type === "mcq" &&
              question.options &&
              question.options.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-[#1e293b]">
                    Choose your answer:
                  </h3>
                  <div className="space-y-3">
                    {question.options.map((option, index) => {
                      const optionLetter = String.fromCharCode(65 + index);
                      const isSelected = selectedAnswer === optionLetter;

                      const getOptionStyle = () => {
                        if (isSelected) {
                          return "bg-blue-50 border-blue-500 text-blue-900";
                        }
                        return "bg-gray-50 border-gray-200 hover:bg-gray-100";
                      };

                      return (
                        <button
                          key={index}
                          onClick={() => handleAnswerSelect(optionLetter)}
                          className={`w-full text-left p-4 rounded-sm border-2 transition-all duration-200 flex items-center justify-between cursor-pointer ${getOptionStyle()}`}
                        >
                          <div className="flex items-center space-x-3 w-full">
                            <div
                              className={`w-8 h-8 rounded-sm flex items-center justify-center text-sm font-medium ${
                                isSelected
                                  ? "bg-blue-500 text-white"
                                  : "bg-gray-200 text-gray-700"
                              }`}
                            >
                              {optionLetter}
                            </div>
                            <div className="flex-1 text-left text-base leading-relaxed">
                              {renderMixedContent(option)}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

            {/* Action Buttons */}
            <div className="flex items-center space-x-3 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSolution(!showSolution)}
                className="rounded-sm"
              >
                {showSolution ? (
                  <EyeOff className="h-4 w-4 mr-2" />
                ) : (
                  <Eye className="h-4 w-4 mr-2" />
                )}
                {showSolution ? "Hide" : "Show"} Solution
              </Button>
            </div>

            {/* Result */}
            {/* Result section removed - will be handled by separate template */}

            {/* Solution Steps */}
            {showSolution && question.solution_steps && (
              <div className="mt-6 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-[#1e293b] mb-4">
                    Solution Steps
                  </h3>
                  <div className="space-y-3">
                    {question.solution_steps.map((step, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-3 p-3 bg-slate-50 rounded-sm"
                      >
                        <div className="w-8 h-8 bg-[#1e293b] text-white rounded-sm flex items-center justify-center text-sm font-medium">
                          {step.step}
                        </div>
                        <div className="flex-1 text-[#1e293b]">
                          {renderMixedContent(step.text)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {question.solution_image && (
                  <div className="flex justify-center">
                    <div className="border rounded-sm p-4 bg-white">
                      <img
                        src={`/api/cdn-proxy?url=${encodeURIComponent(
                          question.solution_image
                        )}`}
                        alt="Solution diagram"
                        className="max-w-full h-auto rounded-sm"
                        onError={(e) => {
                          // Hide image if it fails to load
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
