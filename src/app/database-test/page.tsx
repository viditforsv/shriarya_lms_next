"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components-demo/ui/ui-components/card";
import { Button } from "@/app/components-demo/ui/ui-components/button";
import { Input } from "@/app/components-demo/ui/ui-components/input";
import { Badge } from "@/app/components-demo/ui/ui-components/badge";
import {
  Database,
  Search,
  BarChart3,
  Filter,
  RefreshCw,
  Eye,
} from "lucide-react";

interface QuestionData {
  id: string;
  question_text: string;
  difficulty: number;
  question_type: string;
  subject: string;
  board: string;
  grade: string;
  topic: string;
  tags: string[];
  is_pyq: boolean;
  total_marks: number;
  pyq_year?: string;
  month?: string;
  paper_number?: string;
  created_at: string;
  human_readable_id?: string;
}

interface DatabaseStats {
  total: number;
  byDifficulty: Record<number, number>;
  byType: Record<string, number>;
  byBoard: Record<string, number>;
  bySubject: Record<string, number>;
  pyqCount: number;
  practiceCount: number;
}

export default function DatabaseTestPage() {
  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [stats, setStats] = useState<DatabaseStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = async (
    action: string,
    params: Record<string, string> = {}
  ) => {
    setLoading(true);
    setError(null);

    try {
      const searchParams = new URLSearchParams({
        action,
        page: currentPage.toString(),
        limit: "10",
        ...params,
      });

      const response = await fetch(
        `/api/database/question-bank?${searchParams}`
      );
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Failed to fetch data");
      }

      if (action === "list") {
        setQuestions(result.data.data || []);
      } else if (action === "stats") {
        setStats(result.data);
      } else {
        setQuestions(result.data || []);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      fetchData("search", { q: searchTerm });
    } else {
      fetchData("list");
    }
  };

  const handleGetStats = () => {
    fetchData("stats");
  };

  const handleGetAll = () => {
    setSearchTerm("");
    fetchData("list");
  };

  useEffect(() => {
    fetchData("list");
  }, [currentPage]);

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 3) return "bg-green-100 text-green-800";
    if (difficulty <= 6) return "bg-yellow-100 text-yellow-800";
    if (difficulty <= 8) return "bg-orange-100 text-orange-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Database className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              Question Bank Database Access
            </h1>
          </div>
          <p className="text-gray-600">
            Direct access to the question_bank table in Supabase
          </p>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                Search Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  placeholder="Search by text, ID, or content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
                <Button onClick={handleSearch} disabled={loading}>
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Database Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                onClick={handleGetStats}
                disabled={loading}
                className="w-full"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Get Stats
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RefreshCw className="w-5 h-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button
                  onClick={handleGetAll}
                  disabled={loading}
                  className="w-full"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Get All Questions
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Statistics Display */}
        {stats && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Database Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {stats.total}
                  </div>
                  <div className="text-sm text-gray-600">Total Questions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {stats.pyqCount}
                  </div>
                  <div className="text-sm text-gray-600">PYQ Questions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {stats.practiceCount}
                  </div>
                  <div className="text-sm text-gray-600">
                    Practice Questions
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {Object.keys(stats.byBoard).length}
                  </div>
                  <div className="text-sm text-gray-600">Boards</div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">By Difficulty</h4>
                  <div className="space-y-1">
                    {Object.entries(stats.byDifficulty)
                      .sort(([a], [b]) => parseInt(a) - parseInt(b))
                      .map(([difficulty, count]) => (
                        <div
                          key={difficulty}
                          className="flex justify-between text-sm"
                        >
                          <span>Level {difficulty}</span>
                          <span className="font-medium">{count}</span>
                        </div>
                      ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">By Board</h4>
                  <div className="space-y-1">
                    {Object.entries(stats.byBoard).map(([board, count]) => (
                      <div key={board} className="flex justify-between text-sm">
                        <span>{board}</span>
                        <span className="font-medium">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">By Type</h4>
                  <div className="space-y-1">
                    {Object.entries(stats.byType).map(([type, count]) => (
                      <div key={type} className="flex justify-between text-sm">
                        <span>{type}</span>
                        <span className="font-medium">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Error Display */}
        {error && (
          <Card className="mb-8 border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <div className="text-red-800">
                <strong>Error:</strong> {error}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Questions Display */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Questions ({questions.length})</span>
              {loading && <RefreshCw className="w-5 h-5 animate-spin" />}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {questions.length === 0 && !loading ? (
              <div className="text-center py-8 text-gray-500">
                No questions found. Try searching or getting all questions.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {questions.map((question) => (
                  <Card
                    key={question.id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">
                            {question.human_readable_id ||
                              question.id.slice(0, 8)}
                          </CardTitle>
                          <p className="text-sm text-gray-500 mt-1">
                            {question.total_marks} marks •{" "}
                            {question.question_type}
                          </p>
                        </div>
                        <Badge
                          className={getDifficultyColor(question.difficulty)}
                        >
                          {question.difficulty}/10
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                        {question.question_text.substring(0, 150)}...
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="outline" className="text-xs">
                          {question.board}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {question.subject}
                        </Badge>
                        {question.is_pyq && (
                          <Badge variant="secondary" className="text-xs">
                            PYQ {question.pyq_year}
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-500">
                          Created:{" "}
                          {new Date(question.created_at).toLocaleDateString()}
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            window.open(
                              `/question-bank/${question.id}`,
                              "_blank"
                            )
                          }
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1 || loading}
            >
              Previous
            </Button>
            <Button variant="outline" disabled>
              Page {currentPage}
            </Button>
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={loading}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
