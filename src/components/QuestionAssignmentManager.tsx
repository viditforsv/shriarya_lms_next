"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/design-system/components/ui/button";
import { Input } from "@/design-system/components/ui/input";
import { Label } from "@/design-system/components/ui/label";
import { Textarea } from "@/design-system/components/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/design-system/components/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/design-system/components/ui/card";
import { Badge } from "@/design-system/components/ui/badge";
import { Skeleton } from "@/design-system/components/ui/skeleton";
import {
  UserPlus,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle,
  Edit,
  Eye,
} from "lucide-react";

interface Question {
  id: string;
  question_text: string;
  difficulty: number;
  subject: string;
  topic: string;
  grade: string;
  board: string;
}

interface User {
  id: string;
  email: string;
  role: string;
}

interface Assignment {
  id: string;
  question_id: string;
  assigned_to: string;
  assigned_by: string;
  assignment_type: string;
  status: string;
  priority: string;
  due_date: string;
  notes: string;
  created_at: string;
  updated_at: string;
  question_bank: Question;
  assigned_to_profile: User;
  assigned_by_profile: User;
}

interface QuestionAssignmentManagerProps {
  questionId?: string;
  userId?: string;
}

export default function QuestionAssignmentManager({
  questionId,
  userId,
}: QuestionAssignmentManagerProps) {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAssignForm, setShowAssignForm] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [assignmentType, setAssignmentType] = useState("edit");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");

  // Fetch assignments
  const fetchAssignments = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (questionId) params.append("question_id", questionId);
      if (userId) params.append("assigned_to", userId);

      const response = await fetch(`/api/question-assignments?${params}`);
      if (!response.ok) throw new Error("Failed to fetch assignments");

      const data = await response.json();
      setAssignments(data.assignments);
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  }, [questionId, userId]);

  // Fetch available questions
  const fetchQuestions = async () => {
    try {
      const response = await fetch("/api/question-bank?limit=100");
      if (!response.ok) throw new Error("Failed to fetch questions");

      const data = await response.json();
      setQuestions(data.questions || []);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  // Fetch available users (content managers and admins)
  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/user-profiles");
      if (!response.ok) throw new Error("Failed to fetch users");

      const data = await response.json();
      const contentUsers =
        data.users?.filter(
          (user: User) =>
            user.role === "content_manager" || user.role === "admin"
        ) || [];
      setUsers(contentUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchAssignments(), fetchQuestions(), fetchUsers()]);
      setLoading(false);
    };

    loadData();
  }, [questionId, userId, fetchAssignments]);

  // Create new assignment
  const handleCreateAssignment = async () => {
    if (!selectedQuestion || !selectedUser) {
      alert("Please select both a question and a user");
      return;
    }

    try {
      const response = await fetch("/api/question-assignments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question_id: selectedQuestion,
          assigned_to: selectedUser,
          assignment_type: assignmentType,
          priority,
          due_date: dueDate || null,
          notes,
        }),
      });

      if (!response.ok) throw new Error("Failed to create assignment");

      // Reset form
      setSelectedQuestion("");
      setSelectedUser("");
      setAssignmentType("edit");
      setPriority("medium");
      setDueDate("");
      setNotes("");
      setShowAssignForm(false);

      // Refresh assignments
      await fetchAssignments();
    } catch (error) {
      console.error("Error creating assignment:", error);
      alert("Failed to create assignment");
    }
  };

  // Update assignment status
  const handleUpdateStatus = async (
    assignmentId: string,
    newStatus: string
  ) => {
    try {
      const response = await fetch("/api/question-assignments", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: assignmentId,
          status: newStatus,
        }),
      });

      if (!response.ok) throw new Error("Failed to update assignment");

      await fetchAssignments();
    } catch (error) {
      console.error("Error updating assignment:", error);
      alert("Failed to update assignment");
    }
  };

  // Delete assignment
  const handleDeleteAssignment = async (assignmentId: string) => {
    if (!confirm("Are you sure you want to delete this assignment?")) return;

    try {
      const response = await fetch(
        `/api/question-assignments?id=${assignmentId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Failed to delete assignment");

      await fetchAssignments();
    } catch (error) {
      console.error("Error deleting assignment:", error);
      alert("Failed to delete assignment");
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "assigned":
        return <Clock className="h-4 w-4 text-blue-500" />;
      case "in_progress":
        return <Edit className="h-4 w-4 text-yellow-500" />;
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
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

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Question Assignments</h2>
          <p className="text-gray-600">
            Assign specific questions to users for editing, review, or approval
          </p>
        </div>
        <Button
          onClick={() => setShowAssignForm(!showAssignForm)}
          className="flex items-center gap-2"
        >
          <UserPlus className="h-4 w-4" />
          Assign Question
        </Button>
      </div>

      {/* Assignment Form */}
      {showAssignForm && (
        <Card>
          <CardHeader>
            <CardTitle>Assign Question to User</CardTitle>
            <CardDescription>
              Select a question and assign it to a content manager or admin
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="question">Question</Label>
                <Select
                  value={selectedQuestion}
                  onValueChange={setSelectedQuestion}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a question ID" />
                  </SelectTrigger>
                  <SelectContent>
                    {questions.map((question) => (
                      <SelectItem key={question.id} value={question.id}>
                        Question ID: {question.id}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="user">Assign To</Label>
                <Select value={selectedUser} onValueChange={setSelectedUser}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a user" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.email}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="type">Assignment Type</Label>
                <Select
                  value={assignmentType}
                  onValueChange={setAssignmentType}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="edit">Edit</SelectItem>
                    <SelectItem value="review">Review</SelectItem>
                    <SelectItem value="approve">Approve</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="dueDate">Due Date (Optional)</Label>
                <Input
                  id="dueDate"
                  type="datetime-local"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Add any specific instructions or notes..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleCreateAssignment}>
                Create Assignment
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowAssignForm(false)}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Assignments List */}
      <div className="space-y-4">
        {assignments.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-gray-500">No assignments found</p>
            </CardContent>
          </Card>
        ) : (
          assignments.map((assignment) => (
            <Card key={assignment.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {getStatusIcon(assignment.status)}
                      <Badge className={getPriorityColor(assignment.priority)}>
                        {assignment.priority}
                      </Badge>
                      <Badge variant="outline">
                        {assignment.assignment_type}
                      </Badge>
                    </div>

                    <h3 className="font-semibold mb-2">
                      Question ID: {assignment.question_id}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
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

                    <div className="mt-3 text-sm text-gray-600">
                      <p>
                        <strong>Assigned to:</strong>{" "}
                        {assignment.assigned_to_profile?.email || "Unknown"}
                      </p>
                      <p>
                        <strong>Assigned by:</strong>{" "}
                        {assignment.assigned_by_profile?.email || "Unknown"}
                      </p>
                      {assignment.due_date && (
                        <p className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <strong>Due:</strong>{" "}
                          {new Date(assignment.due_date).toLocaleDateString()}
                        </p>
                      )}
                      {assignment.notes && (
                        <p>
                          <strong>Notes:</strong> {assignment.notes}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 ml-4">
                    <Select
                      value={assignment.status}
                      onValueChange={(value) =>
                        handleUpdateStatus(assignment.id, value)
                      }
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="assigned">Assigned</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        window.open(
                          `/question-bank/${assignment.question_id}`,
                          "_blank"
                        )
                      }
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>

                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteAssignment(assignment.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
