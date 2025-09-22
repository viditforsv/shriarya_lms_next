"use client";

import { useState, useEffect } from "react";
import { Button } from "@/app/components-demo/ui/ui-components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components-demo/ui/ui-components/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components-demo/ui/select";
import { Input } from "@/app/components-demo/ui/ui-components/input";
import { Label } from "@/app/components-demo/ui/ui-components/label";
import { Textarea } from "@/app/components-demo/ui/textarea";
import { Badge } from "@/app/components-demo/ui/ui-components/badge";
import { Loader2, Users, Filter, CheckCircle } from "lucide-react";
import {
  useAdvancedFilterPlugin,
  FilterPluginUI,
} from "@/lib/filters/AdvancedFilterPlugin";
import { bulkAssignmentFilterConfig } from "@/lib/filters/configs/BulkAssignmentFilterConfig";
import LegacyFilterForm from "@/components/filters/LegacyFilterForm";

interface User {
  id: string;
  email: string;
  role: string;
}

interface BulkAssignmentFilters {
  subject?: string;
  difficulty?: string;
  question_type?: string;
  board?: string;
  grade?: string;
  topic?: string;
  is_pyq?: boolean;
  pyq_year?: string;
  month?: string;
  paper_number?: string;
  qa_status?: string;
}

export default function BulkAssignmentManager() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [assigning, setAssigning] = useState(false);
  const [lastAssignment, setLastAssignment] = useState<any>(null);

  // Form state
  const [selectedUser, setSelectedUser] = useState("");
  const [assignmentType, setAssignmentType] = useState("edit");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");
  const [maxQuestions, setMaxQuestions] = useState(100);

  // Initialize the filter plugin
  const filterPlugin = useAdvancedFilterPlugin({
    ...bulkAssignmentFilterConfig,
    showLegacyFilters: true,
    showAdvancedButton: true,
    showActiveFilters: true,
    onPreviewChange: (count) => {
      // Preview count is handled by the plugin
    },
  });

  // Available filter options - updated to match actual database values
  const subjects = ["HL"]; // Based on actual database content
  const difficulties = ["1", "2", "3", "4", "5"];
  const questionTypes = ["MCQ", "Short Answer", "Long Answer", "Numerical"];
  const boards = ["IBDP"]; // Based on actual database content
  const grades = ["12"]; // Based on actual database content
  const qaStatuses = ["pending", "reviewed", "approved", "rejected"];

  useEffect(() => {
    fetchUsers();
  }, []);

  // Auto-preview when user is selected or filters change
  useEffect(() => {
    if (selectedUser) {
      previewAssignment();
    }
  }, [selectedUser, filterPlugin.advancedFilters, filterPlugin.legacyFilters]);

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

  const previewAssignment = async () => {
    // Only require a user to be selected, not active filters
    // If no filters are set, show all questions
    if (!selectedUser) {
      return;
    }

    setLoading(true);
    try {
      // Create a preview request to count matching questions
      const requestBody: any = {
        assigned_to: selectedUser,
        max_questions: 1, // Just to get count
        preview: true,
      };

      // Use the filter plugin to build request parameters
      if (filterPlugin.advancedFilters.length > 0) {
        requestBody.advanced_filters = filterPlugin.advancedFilters;
      } else if (Object.keys(filterPlugin.legacyFilters).length > 0) {
        requestBody.filters = filterPlugin.legacyFilters;
      }

      const response = await fetch("/api/question-assignments/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data = await response.json();
        // Preview count is now handled by the filter plugin
        filterPlugin.config.onPreviewChange?.(data.count || 0);
      } else {
        console.error("Preview request failed");
        filterPlugin.config.onPreviewChange?.(0);
      }
    } catch (error) {
      console.error("Error previewing assignment:", error);
      filterPlugin.config.onPreviewChange?.(0);
    } finally {
      setLoading(false);
    }
  };

  const handleBulkAssign = async () => {
    if (!selectedUser) {
      alert("Please select a user");
      return;
    }

    setAssigning(true);
    try {
      const requestBody: any = {
        assigned_to: selectedUser,
        assignment_type: assignmentType,
        priority,
        due_date: dueDate || null,
        notes:
          notes ||
          `Bulk assignment - ${
            filterPlugin.advancedFilters.length > 0
              ? "advanced filters"
              : Object.keys(filterPlugin.legacyFilters).join(", ")
          }`,
        max_questions: maxQuestions,
      };

      // Use the filter plugin to build request parameters
      if (filterPlugin.advancedFilters.length > 0) {
        requestBody.advanced_filters = filterPlugin.advancedFilters;
      } else if (Object.keys(filterPlugin.legacyFilters).length > 0) {
        requestBody.filters = filterPlugin.legacyFilters;
      }

      const response = await fetch("/api/question-assignments/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) throw new Error("Failed to create bulk assignment");

      const data = await response.json();
      setLastAssignment(data);

      // Reset form
      setSelectedUser("");
      filterPlugin.clearAllFilters();
      setDueDate("");
      setNotes("");

      alert(`Successfully assigned ${data.assigned_count} questions!`);
    } catch (error) {
      console.error("Error creating bulk assignment:", error);
      alert("Failed to create bulk assignment");
    } finally {
      setAssigning(false);
    }
  };

  // Clear all filters function
  const clearAllFilters = () => {
    filterPlugin.clearAllFilters();
  };

  // Compute active filters for UI logic
  const activeFilters = Object.entries(filterPlugin.legacyFilters).filter(
    ([, value]) => value !== undefined && value !== ""
  );

  // Check if any filters are active
  const hasActiveFilters = () => {
    return filterPlugin.hasActiveFilters();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Bulk Question Assignment
          </CardTitle>
          <CardDescription>
            Assign multiple questions at once using smart filters
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* User Selection */}
          <div className="space-y-2">
            <Label htmlFor="user">Assign to User</Label>
            <Select value={selectedUser} onValueChange={setSelectedUser}>
              <SelectTrigger>
                <SelectValue placeholder="Select a content manager" />
              </SelectTrigger>
              <SelectContent>
                {users.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.email} ({user.role})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Assignment Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="assignment-type">Assignment Type</Label>
              <Select value={assignmentType} onValueChange={setAssignmentType}>
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

            <div className="space-y-2">
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

            <div className="space-y-2">
              <Label htmlFor="max-questions">Max Questions</Label>
              <Input
                id="max-questions"
                type="number"
                value={maxQuestions}
                onChange={(e) =>
                  setMaxQuestions(parseInt(e.target.value) || 100)
                }
                min="1"
                max="500"
              />
            </div>
          </div>

          {/* Optional Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="due-date">Due Date (Optional)</Label>
              <Input
                id="due-date"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add notes for this bulk assignment..."
              />
            </div>
          </div>

          {/* Filters */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Question Filters
            </h3>

            {/* Filter Plugin UI */}
            <FilterPluginUI plugin={filterPlugin} />

            {/* Legacy Filter Form - Always show for bulk assignments */}
            <LegacyFilterForm
              filters={filterPlugin.legacyFilters}
              onFilterChange={filterPlugin.handleLegacyFilterChange}
              availableFields={filterPlugin.config.availableFields}
            />
          </div>

          {/* Preview and Actions */}
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2">
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <CheckCircle className="h-4 w-4 text-green-600" />
              )}
              <span className="font-medium">
                {filterPlugin.previewCount > 0
                  ? `${filterPlugin.previewCount} questions will be assigned`
                  : "No questions match the current filters"}
              </span>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={previewAssignment}
                disabled={loading || !selectedUser}
              >
                Preview
              </Button>
              <Button
                onClick={handleBulkAssign}
                disabled={
                  assigning || !selectedUser || filterPlugin.previewCount === 0
                }
              >
                {assigning ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Assigning...
                  </>
                ) : (
                  `Assign ${filterPlugin.previewCount} Questions`
                )}
              </Button>
            </div>
          </div>

          {/* Last Assignment Result */}
          {lastAssignment && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">
                Assignment Complete!
              </h4>
              <p className="text-green-700">
                Successfully assigned {lastAssignment.assigned_count} questions
                to {users.find((u) => u.id === selectedUser)?.email}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
