"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/app/components-demo/ui/ui-components/button";
import { Textarea } from "@/app/components-demo/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components-demo/ui/ui-components/card";
import { Badge } from "@/app/components-demo/ui/ui-components/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components-demo/ui/select";
import { Label } from "@/app/components-demo/ui/ui-components/label";
import {
  QAStatusBadge,
  QAPriorityBadge,
  QAStatusSelector,
} from "@/components/QAComponents";
import { CheckCircle, Edit, Flag, History, AlertCircle } from "lucide-react";

interface QARecord {
  id: string;
  question_id: string;
  qa_status:
    | "pending"
    | "in_review"
    | "needs_revision"
    | "approved"
    | "rejected"
    | "archived";
  reviewer_id?: string;
  review_date?: string;
  review_notes?: string;
  content_accuracy?: number;
  difficulty_appropriateness?: number;
  clarity_rating?: number;
  solution_quality?: number;
  overall_rating?: number;
  revision_count: number;
  last_revision_date?: string;
  revision_notes?: string;
  is_flagged: boolean;
  flag_reason?: string;
  priority_level: "low" | "medium" | "high" | "urgent";
  qa_tags: string[];
  created_at: string;
  updated_at: string;
}

// QAComment interface removed - comments functionality disabled

interface QAHistory {
  id: string;
  qa_id: string;
  action: string;
  old_value?: string;
  new_value?: string;
  action_by?: string;
  action_reason?: string;
  created_at: string;
}

interface QAManagementProps {
  questionId: string;
  onStatusChange?: (status: string) => void;
}

export default function QAManagement({
  questionId,
  onStatusChange,
}: QAManagementProps) {
  const [qaRecord, setQARecord] = useState<QARecord | null>(null);
  const [history, setHistory] = useState<QAHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form states
  const [reviewNotes, setReviewNotes] = useState("");

  const fetchQAData = useCallback(async () => {
    try {
      setLoading(true);

      // Fetch QA record
      const qaResponse = await fetch(`/api/qa?question_id=${questionId}`);
      if (qaResponse.ok) {
        const qaData = await qaResponse.json();
        if (qaData.qa_records && qaData.qa_records.length > 0) {
          const record = qaData.qa_records[0];
          setQARecord(record);
          setReviewNotes(record.review_notes || "");

          // Fetch history
          const historyResponse = await fetch(
            `/api/qa/history?qa_id=${record.id}`
          );
          if (historyResponse.ok) {
            const historyData = await historyResponse.json();
            setHistory(historyData.history || []);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching QA data:", error);
    } finally {
      setLoading(false);
    }
  }, [questionId]);

  // Fetch QA data
  useEffect(() => {
    fetchQAData();
  }, [questionId, fetchQAData]);

  const updateQAStatus = async (
    newStatus: QARecord["qa_status"],
    notes?: string
  ) => {
    if (!qaRecord) return;

    try {
      setSaving(true);

      const updateData = {
        qa_status: newStatus,
        review_notes: notes || reviewNotes,
        ...(newStatus === "in_review" && {
          review_date: new Date().toISOString(),
        }),
        ...(newStatus === "needs_revision" && {
          revision_count: qaRecord.revision_count + 1,
        }),
        ...(newStatus === "needs_revision" && {
          last_revision_date: new Date().toISOString(),
        }),
        ...(newStatus === "needs_revision" && {
          revision_notes: notes || reviewNotes,
        }),
      };

      const response = await fetch(`/api/qa`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question_id: questionId,
          ...updateData,
        }),
      });

      if (response.ok) {
        const updatedQA = await response.json();
        setQARecord(updatedQA.qa_record);
        await fetchQAData(); // Refresh all data
        onStatusChange?.(newStatus);
      }
    } catch (error) {
      console.error("Error updating QA status:", error);
    } finally {
      setSaving(false);
    }
  };

  // Comments functionality removed - qa_comments table deleted

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Quality Assurance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const createQARecord = async (status: "pending" | "approved" = "pending") => {
    try {
      setSaving(true);

      const response = await fetch(`/api/qa`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question_id: questionId,
          qa_status: status,
          priority_level: "medium",
          review_notes: status === "approved" ? "Pre-approved" : undefined,
          ...(status === "approved" && {
            review_date: new Date().toISOString(),
          }),
        }),
      });

      if (response.ok) {
        const newQA = await response.json();
        setQARecord(newQA.qa_record);
        await fetchQAData(); // Refresh all data
        onStatusChange?.(status);
      }
    } catch (error) {
      console.error("Error creating QA record:", error);
    } finally {
      setSaving(false);
    }
  };

  if (!qaRecord) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Quality Assurance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-500">No QA record found for this question.</p>
          <div className="flex gap-2">
            <Button
              onClick={() => createQARecord("pending")}
              disabled={saving}
              className="flex items-center gap-2"
            >
              <Flag className="w-4 h-4" />
              {saving ? "Creating..." : "Mark for QA"}
            </Button>
            <Button
              variant="outline"
              onClick={() => createQARecord("approved")}
              disabled={saving}
              className="flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              {saving ? "Creating..." : "Mark as Approved"}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* QA Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Quality Assurance Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <QAStatusBadge status={qaRecord.qa_status} size="lg" />
            <QAPriorityBadge priority={qaRecord.priority_level} size="md" />
            {qaRecord.is_flagged && (
              <Badge variant="destructive" className="flex items-center gap-1">
                <Flag className="w-3 h-3" />
                Flagged
              </Badge>
            )}
          </div>

          {qaRecord.revision_count > 0 && (
            <div className="text-sm text-gray-600">
              <strong>Revisions:</strong> {qaRecord.revision_count}
              {qaRecord.last_revision_date && (
                <span>
                  {" "}
                  (Last:{" "}
                  {new Date(qaRecord.last_revision_date).toLocaleDateString()})
                </span>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* QA Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Edit className="w-5 h-5" />
            QA Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Status Change */}
          <div>
            <Label>Change Status</Label>
            <div className="flex items-center gap-2 mt-2">
              <QAStatusSelector
                value={qaRecord.qa_status}
                onValueChange={(status) => updateQAStatus(status)}
                disabled={saving}
              />
              <Button
                onClick={() => updateQAStatus(qaRecord.qa_status, reviewNotes)}
                disabled={saving}
                size="sm"
              >
                Update
              </Button>
            </div>
          </div>

          {/* Review Notes */}
          <div>
            <Label htmlFor="review_notes">Review Notes</Label>
            <Textarea
              id="review_notes"
              value={reviewNotes}
              onChange={(e) => setReviewNotes(e.target.value)}
              placeholder="Add review notes..."
              className="mt-2"
            />
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2 pt-4 border-t">
            <Button
              onClick={() =>
                updateQAStatus("approved", "Approved after review")
              }
              disabled={saving}
              className="flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              Approve
            </Button>
            <Button
              onClick={() => updateQAStatus("needs_revision", "Needs revision")}
              disabled={saving}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Edit className="w-4 h-4" />
              Needs Revision
            </Button>
            <Button
              onClick={() => updateQAStatus("rejected", "Rejected")}
              disabled={saving}
              variant="destructive"
              className="flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4" />
              Reject
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Comments section removed - qa_comments table deleted */}

      {/* History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="w-5 h-5" />
            QA History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {history.map((entry) => (
              <div key={entry.id} className="flex items-center gap-3 text-sm">
                <Badge variant="outline" className="text-xs">
                  {entry.action.replace("_", " ")}
                </Badge>
                <span className="text-gray-600">
                  {entry.old_value && entry.new_value
                    ? `${entry.old_value} → ${entry.new_value}`
                    : entry.action_reason || entry.action}
                </span>
                <span className="text-gray-400 text-xs">
                  {new Date(entry.created_at).toLocaleDateString()}
                </span>
              </div>
            ))}
            {history.length === 0 && (
              <p className="text-gray-500 text-sm">No history available.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
