"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/design-system/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/design-system/components/ui/card";
import { Badge } from "@/design-system/components/ui/badge";
import {
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  Eye,
  Clock,
  BookOpen,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/design-system/components/dialog";

interface Quiz {
  id: string;
  title: string;
  difficulty: string;
  time_limit: number;
  created_at: string;
  lesson_id: string | null;
  courses_lessons?: {
    id: string;
    title: string;
    lesson_code: string;
  };
}

export default function QuizManagerPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchQuizzes();

    // Check if quiz was just created
    const created = searchParams.get("created");
    if (created) {
      // Show success message
      setTimeout(() => {
        router.replace("/admin/quiz-manager");
      }, 3000);
    }
  }, [searchParams, router]);

  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/quizzes");
      if (response.ok) {
        const data = await response.json();
        setQuizzes(data.quizzes || []);
      }
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedQuiz) return;

    setDeleting(true);
    try {
      const response = await fetch(`/api/quizzes?id=${selectedQuiz.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setQuizzes(quizzes.filter((q) => q.id !== selectedQuiz.id));
        setShowDeleteDialog(false);
        setSelectedQuiz(null);
      }
    } catch (error) {
      console.error("Error deleting quiz:", error);
    } finally {
      setDeleting(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-emerald-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/admin">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Admin
            </Button>
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Quiz Manager
              </h1>
              <p className="text-lg text-muted-foreground">
                View and manage all quizzes
              </p>
            </div>
            <Link href="/admin/quiz-creator">
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Create New Quiz
              </Button>
            </Link>
          </div>
        </div>

        {/* Success Message */}
        {searchParams.get("created") && (
          <div className="mb-6 p-4 bg-primary/10 border-l-4 border-primary rounded-lg">
            <p className="text-primary font-medium">
              <CheckCircle className="inline w-5 h-5 mr-2" />
              Quiz created successfully!
            </p>
          </div>
        )}

        {/* Quizzes Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : quizzes.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No quizzes yet</h3>
              <p className="text-muted-foreground mb-6">
                Create your first quiz to get started
              </p>
              <Link href="/admin/quiz-creator">
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Quiz
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <Card
                key={quiz.id}
                className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">
                        {quiz.title}
                      </CardTitle>
                      {quiz.courses_lessons && (
                        <CardDescription>
                          {quiz.courses_lessons.lesson_code}:{" "}
                          {quiz.courses_lessons.title}
                        </CardDescription>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {/* Metadata */}
                    <div className="flex flex-wrap gap-2">
                      <Badge
                        className={getDifficultyColor(quiz.difficulty || "")}
                      >
                        {quiz.difficulty || "Medium"}
                      </Badge>
                      {quiz.time_limit && (
                        <Badge variant="outline">
                          <Clock className="w-3 h-3 mr-1" />
                          {quiz.time_limit} min
                        </Badge>
                      )}
                    </div>

                    {/* Created Date */}
                    <p className="text-sm text-muted-foreground">
                      Created: {new Date(quiz.created_at).toLocaleDateString()}
                    </p>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Link
                        href={`/admin/quiz-preview/${quiz.id}`}
                        className="flex-1"
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                          Preview
                      </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => {
                          // TODO: Implement edit quiz
                          router.push(`/admin/quiz-editor/${quiz.id}`);
                        }}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedQuiz(quiz);
                          setShowDeleteDialog(true);
                        }}
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Delete Confirmation Dialog */}
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Quiz</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete &quot;{selectedQuiz?.title}
                &quot;? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end gap-3 mt-4">
              <Button
                variant="outline"
                onClick={() => setShowDeleteDialog(false)}
                disabled={deleting}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete Quiz"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
