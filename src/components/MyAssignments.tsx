"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/design-system/components/ui/card";
import { Button } from "@/design-system/components/ui/button";
import { Badge } from "@/design-system/components/ui/badge";
import {
  Calendar,
  Clock,
  FileText,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

interface Assignment {
  id: string;
  question_id: string;
  assignment_type: string;
  status: string;
  priority: string;
  due_date?: string;
  notes?: string;
  created_at: string;
  question_bank?: {
    id: string;
    question_text: string;
    difficulty: string;
    subject: string;
    topic: string;
    grade: string;
    board: string;
  };
}

export function MyAssignments() {
  const { user, session } = useAuth();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyAssignments = async () => {
      if (!user || !session) return;

      try {
        const response = await fetch(
          "/api/question-assignments?assigned_to=me",
          {
            headers: {
              Authorization: `Bearer ${session.access_token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch assignments");

        const data = await response.json();
        setAssignments(data.assignments || []);
      } catch (error) {
        console.error("Error fetching assignments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyAssignments();
  }, [user, session]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "assigned":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getAssignmentTypeIcon = (type: string) => {
    switch (type) {
      case "edit":
        return <FileText className="h-4 w-4" />;
      case "review":
        return <CheckCircle className="h-4 w-4" />;
      case "approve":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Question Assignments</CardTitle>
          <CardDescription>
            Questions assigned to you for editing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#e27447] mx-auto mb-2"></div>
            <p className="text-sm text-muted-foreground">
              Loading assignments...
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Question Assignments</CardTitle>
        <CardDescription>
          {assignments.length > 0
            ? `${assignments.length} question${
                assignments.length === 1 ? "" : "s"
              } assigned to you`
            : "No questions assigned to you yet"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {assignments.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">No assignments yet</p>
            <p className="text-sm text-muted-foreground">
              Check back later or contact an admin for assignments.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {assignments.map((assignment) => (
              <div
                key={assignment.id}
                className="border rounded-sm p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getAssignmentTypeIcon(assignment.assignment_type)}
                    <span className="font-medium">
                      Question ID: {assignment.question_id}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getStatusColor(assignment.status)}>
                      {assignment.status.replace("_", " ")}
                    </Badge>
                    <Badge className={getPriorityColor(assignment.priority)}>
                      {assignment.priority}
                    </Badge>
                  </div>
                </div>

                {assignment.question_bank && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600 mb-3">
                    <div>
                      <strong>Subject:</strong>{" "}
                      {assignment.question_bank.subject}
                    </div>
                    <div>
                      <strong>Grade:</strong> {assignment.question_bank.grade}
                    </div>
                    <div>
                      <strong>Difficulty:</strong>{" "}
                      {assignment.question_bank.difficulty}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      Assigned:{" "}
                      {new Date(assignment.created_at).toLocaleDateString()}
                    </span>
                    {assignment.due_date && (
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Due:{" "}
                        {new Date(assignment.due_date).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  <Button size="sm" variant="outline">
                    <Link
                      href={`/question-bank/${assignment.question_id}/edit`}
                    >
                      {assignment.assignment_type === "edit"
                        ? "Edit Question"
                        : assignment.assignment_type === "review"
                        ? "Review Question"
                        : "Approve Question"}
                    </Link>
                  </Button>
                </div>

                {assignment.notes && (
                  <div className="mt-3 p-2 bg-gray-50 rounded-sm">
                    <p className="text-sm text-gray-700">
                      <strong>Notes:</strong> {assignment.notes}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
