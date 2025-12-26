"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/design-system/components/ui/card";
import { Button } from "@/design-system/components/ui/button";
import { Badge } from "@/design-system/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/design-system/components/tabs";
import { Input } from "@/design-system/components/ui/input";
import {
  BookOpen,
  MessageCircle,
  Send,
  Lightbulb,
  FileText,
  TrendingUp,
  ExternalLink,
  Download,
} from "lucide-react";
import { renderMixedContent } from "@/components/MathRenderer";

interface Formula {
  id: string;
  title: string;
  formula: string;
  description?: string;
}

interface ConceptSummary {
  title: string;
  content: string;
  keyPoints?: string[];
}

interface RecommendedQuestion {
  id: string;
  text: string;
  tags: string[];
  difficulty: number;
}

interface IBDPConceptsTabProps {
  unitName: string;
  chapterName: string;
  lessonName: string;
  tags?: string[];
  conceptSummary?: ConceptSummary;
  formulas?: Formula[];
  recommendedQuestions?: RecommendedQuestion[];
  onQuestionClick?: (questionId: string) => void;
  courseLinks?: {
    subjectGuide?: string;
    formulaBooklet?: string;
    syllabus?: string;
    pastPapers?: string;
  };
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export function IBDPConceptsTab({
  unitName,
  chapterName,
  lessonName,
  tags = [],
  conceptSummary,
  formulas = [],
  recommendedQuestions = [],
  onQuestionClick,
  courseLinks = {},
}: IBDPConceptsTabProps) {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: `Hello! I'm your IBDP Math AI Tutor. I'm here to help you with ${lessonName} in ${chapterName}. Ask me anything about ${tags.join(
        ", "
      )} or request practice questions!`,
      timestamp: new Date(),
    },
  ]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isAITyping, setIsAITyping] = useState(false);

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      role: "user",
      content: currentMessage,
      timestamp: new Date(),
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setCurrentMessage("");
    setIsAITyping(true);

    // Simulate AI response (replace with actual API call later)
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        role: "assistant",
        content: `I understand you're asking about "${currentMessage}". This is related to ${
          tags[0] || "the current topic"
        }. Here's a helpful explanation... [AI response would go here]`,
        timestamp: new Date(),
      };
      setChatMessages((prev) => [...prev, aiMessage]);
      setIsAITyping(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Context Badge */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <BookOpen className="w-4 h-4" />
        <span>
          {unitName} → {chapterName} → {lessonName}
        </span>
      </div>

      <Tabs defaultValue="concepts" className="w-full">
        <TabsList className="grid w-full grid-cols-4 rounded-sm bg-gray-100 p-1 shadow-sm border border-gray-200">
          <TabsTrigger
            value="concepts"
            className="rounded-sm data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-sm font-medium transition-all duration-200 hover:bg-gray-200 data-[state=inactive]:text-gray-600"
          >
            Concepts
          </TabsTrigger>
          <TabsTrigger
            value="formulas"
            className="rounded-sm data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-sm font-medium transition-all duration-200 hover:bg-gray-200 data-[state=inactive]:text-gray-600"
          >
            Formulas
          </TabsTrigger>
          <TabsTrigger
            value="resources"
            className="rounded-sm data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-sm font-medium transition-all duration-200 hover:bg-gray-200 data-[state=inactive]:text-gray-600"
          >
            Resources
          </TabsTrigger>
          <TabsTrigger
            value="ai-tutor"
            className="rounded-sm data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-sm font-medium transition-all duration-200 hover:bg-gray-200 data-[state=inactive]:text-gray-600"
          >
            AI Tutor
          </TabsTrigger>
        </TabsList>

        {/* Concepts Tab */}
        <TabsContent value="concepts" className="space-y-4 mt-6">
          {conceptSummary && (
            <Card className="rounded-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-[#e27447]" />
                  {conceptSummary.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-base leading-relaxed text-gray-700">
                  {renderMixedContent(conceptSummary.content)}
                </div>

                {conceptSummary.keyPoints &&
                  conceptSummary.keyPoints.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-sm text-[#1e293b] mb-2">
                        Key Points:
                      </h4>
                      <ul className="space-y-2">
                        {conceptSummary.keyPoints.map((point, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-sm text-gray-700"
                          >
                            <span className="text-[#e27447] font-bold mt-1">
                              •
                            </span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
              </CardContent>
            </Card>
          )}

          {/* Tags */}
          {tags.length > 0 && (
            <Card className="rounded-sm">
              <CardHeader>
                <CardTitle className="text-base">Related Topics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="rounded-sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Formulas Tab */}
        <TabsContent value="formulas" className="space-y-4 mt-6">
          {formulas.length > 0 ? (
            formulas.map((formula) => (
              <Card key={formula.id} className="rounded-sm">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#e27447]" />
                    {formula.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-4 bg-gray-50 rounded-sm border border-gray-200">
                    <div className="text-xl">
                      {renderMixedContent(formula.formula)}
                    </div>
                  </div>
                  {formula.description && (
                    <p className="text-sm text-gray-600">
                      {formula.description}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="rounded-sm">
              <CardContent className="py-8 text-center text-muted-foreground">
                <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>No formulas available for this lesson yet.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Resources Tab */}
        <TabsContent value="resources" className="space-y-4 mt-6">
          <Card className="rounded-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#e27447]" />
                Course Resources
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Official IBDP documents and study materials
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Subject Guide */}
              {courseLinks.subjectGuide && (
                <div className="p-4 border border-gray-200 rounded-sm hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-sm">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#1e293b]">
                          Subject Guide
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Official IBDP Mathematics Subject Guide
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          window.open(courseLinks.subjectGuide, "_blank")
                        }
                        className="rounded-sm"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const link = document.createElement("a");
                          link.href = courseLinks.subjectGuide!;
                          link.download = "IBDP_Mathematics_Subject_Guide.pdf";
                          link.click();
                        }}
                        className="rounded-sm"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Formula Booklet */}
              {courseLinks.formulaBooklet && (
                <div className="p-4 border border-gray-200 rounded-sm hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-sm">
                        <FileText className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#1e293b]">
                          Formula Booklet
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Official IBDP Mathematics Formula Booklet
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          window.open(courseLinks.formulaBooklet, "_blank")
                        }
                        className="rounded-sm"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const link = document.createElement("a");
                          link.href = courseLinks.formulaBooklet!;
                          link.download =
                            "IBDP_Mathematics_Formula_Booklet.pdf";
                          link.click();
                        }}
                        className="rounded-sm"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Syllabus */}
              {courseLinks.syllabus && (
                <div className="p-4 border border-gray-200 rounded-sm hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-orange-100 rounded-sm">
                        <BookOpen className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#1e293b]">
                          Syllabus
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Complete course syllabus and learning objectives
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        window.open(courseLinks.syllabus, "_blank")
                      }
                      className="rounded-sm"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View
                    </Button>
                  </div>
                </div>
              )}

              {/* Past Papers */}
              {courseLinks.pastPapers && (
                <div className="p-4 border border-gray-200 rounded-sm hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 rounded-sm">
                        <FileText className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#1e293b]">
                          Past Papers
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Previous IBDP Mathematics examination papers
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        window.open(courseLinks.pastPapers, "_blank")
                      }
                      className="rounded-sm"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View
                    </Button>
                  </div>
                </div>
              )}

              {/* No resources message */}
              {!courseLinks.subjectGuide &&
                !courseLinks.formulaBooklet &&
                !courseLinks.syllabus &&
                !courseLinks.pastPapers && (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p>No course resources available yet.</p>
                  </div>
                )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Tutor Tab */}
        <TabsContent value="ai-tutor" className="space-y-4 mt-6">
          {/* Chat Area */}
          <Card className="rounded-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-[#e27447]" />
                AI Math Tutor
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Ask questions about {tags.join(", ")} or request practice
                problems
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Messages */}
              <div className="h-96 overflow-y-auto space-y-3 p-4 bg-gray-50 rounded-sm border border-gray-200">
                {chatMessages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-sm ${
                        message.role === "user"
                          ? "bg-[#e27447] text-white"
                          : "bg-white border border-gray-200 text-gray-800"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">
                        {message.content}
                      </p>
                      <p
                        className={`text-xs mt-1 ${
                          message.role === "user"
                            ? "text-white/70"
                            : "text-gray-400"
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
                {isAITyping && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-200 p-3 rounded-sm">
                      <p className="text-sm text-gray-500">AI is typing...</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="flex gap-2">
                <Input
                  placeholder="Ask a question about this topic..."
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="rounded-sm"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!currentMessage.trim() || isAITyping}
                  className="rounded-sm bg-[#e27447] hover:bg-[#e27447]/90"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recommended Questions */}
          {recommendedQuestions.length > 0 && (
            <Card className="rounded-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#e27447]" />
                  Recommended Practice Questions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recommendedQuestions.map((question) => (
                  <div
                    key={question.id}
                    className="p-3 border border-gray-200 rounded-sm hover:bg-gray-100/50 transition-colors cursor-pointer"
                    onClick={() => onQuestionClick?.(question.id)}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <p className="text-sm text-gray-700 mb-2">
                          {question.text}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {question.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="rounded-sm text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Badge variant="secondary" className="rounded-sm">
                        Difficulty: {question.difficulty}/10
                      </Badge>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="mt-3 rounded-sm"
                    >
                      Try Now
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
