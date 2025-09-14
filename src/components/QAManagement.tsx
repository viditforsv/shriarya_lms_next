"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/app/components-demo/ui/ui-components/button";
import { Input } from "@/app/components-demo/ui/ui-components/input";
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
import { Switch } from "@/app/components-demo/ui/switch";
import {
  QAStatusBadge,
  QAPriorityBadge,
  QAStatusSelector,
} from "@/components/QAComponents";
import {
  CheckCircle,
  Edit,
  Flag,
  MessageSquare,
  History,
  Star,
  AlertCircle,
} from "lucide-react";

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

interface QAComment {
  id: string;
  qa_id: string;
  commenter_id: string;
  comment_text: string;
  comment_type:
    | "general"
    | "content"
    | "solution"
    | "formatting"
    | "difficulty"
    | "other";
  is_resolved: boolean;
  created_at: string;
  updated_at: string;
}

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
  const [comments, setComments] = useState<QAComment[]>([]);
  const [history, setHistory] = useState<QAHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form states
  const [reviewNotes, setReviewNotes] = useState("");
  const [newComment, setNewComment] = useState("");
  const [commentType, setCommentType] = useState<
    "general" | "content" | "solution" | "formatting" | "difficulty" | "other"
  >("general");
  const [ratings, setRatings] = useState({
    content_accuracy: 0,
    difficulty_appropriateness: 0,
    clarity_rating: 0,
    solution_quality: 0,
  });
  const [flagReason, setFlagReason] = useState("");

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
          setRatings({
            content_accuracy: record.content_accuracy || 0,
            difficulty_appropriateness: record.difficulty_appropriateness || 0,
            clarity_rating: record.clarity_rating || 0,
            solution_quality: record.solution_quality || 0,
          });
          setFlagReason(record.flag_reason || "");

          // Fetch comments
          const commentsResponse = await fetch(
            `/api/qa/comments?qa_id=${record.id}`
          );
          if (commentsResponse.ok) {
            const commentsData = await commentsResponse.json();
            setComments(commentsData.comments || []);
          }

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
        reviewer_id: "a2b1d35e-453b-4bc6-b68a-d9e370410459", // Current user ID
        ...(ratings.content_accuracy > 0 && { ratings }),
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

  const addComment = async () => {
    if (!qaRecord || !newComment.trim()) return;

    try {
      setSaving(true);

      const response = await fetch("/api/qa/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          qa_id: qaRecord.id,
          commenter_id: "a2b1d35e-453b-4bc6-b68a-d9e370410459", // Current user ID
          comment_text: newComment,
          comment_type: commentType,
        }),
      });

      if (response.ok) {
        setNewComment("");
        await fetchQAData(); // Refresh comments
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setSaving(false);
    }
  };

  const toggleFlag = async () => {
    if (!qaRecord) return;

    try {
      setSaving(true);

      const response = await fetch(`/api/qa`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question_id: questionId,
          is_flagged: !qaRecord.is_flagged,
          flag_reason: flagReason,
        }),
      });

      if (response.ok) {
        const updatedQA = await response.json();
        setQARecord(updatedQA.qa_record);
        await fetchQAData();
      }
    } catch (error) {
      console.error("Error toggling flag:", error);
    } finally {
      setSaving(false);
    }
  };

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

  if (!qaRecord) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Quality Assurance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">No QA record found for this question.</p>
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
            {qaRecord.overall_rating && (
              <Badge variant="outline" className="flex items-center gap-1">
                <Star className="w-3 h-3" />
                {qaRecord.overall_rating.toFixed(1)}/5
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

          {/* Quality Ratings */}
          <div>
            <Label>Quality Ratings (1-5)</Label>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <Label htmlFor="content_accuracy">Content Accuracy</Label>
                <Input
                  id="content_accuracy"
                  type="number"
                  min="1"
                  max="5"
                  value={ratings.content_accuracy || ""}
                  onChange={(e) =>
                    setRatings((prev) => ({
                      ...prev,
                      content_accuracy: parseInt(e.target.value) || 0,
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="difficulty">Difficulty Appropriateness</Label>
                <Input
                  id="difficulty"
                  type="number"
                  min="1"
                  max="5"
                  value={ratings.difficulty_appropriateness || ""}
                  onChange={(e) =>
                    setRatings((prev) => ({
                      ...prev,
                      difficulty_appropriateness: parseInt(e.target.value) || 0,
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="clarity">Clarity</Label>
                <Input
                  id="clarity"
                  type="number"
                  min="1"
                  max="5"
                  value={ratings.clarity_rating || ""}
                  onChange={(e) =>
                    setRatings((prev) => ({
                      ...prev,
                      clarity_rating: parseInt(e.target.value) || 0,
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="solution">Solution Quality</Label>
                <Input
                  id="solution"
                  type="number"
                  min="1"
                  max="5"
                  value={ratings.solution_quality || ""}
                  onChange={(e) =>
                    setRatings((prev) => ({
                      ...prev,
                      solution_quality: parseInt(e.target.value) || 0,
                    }))
                  }
                />
              </div>
            </div>
          </div>

          {/* Flagging */}
          <div>
            <div className="flex items-center gap-2">
              <Switch
                checked={qaRecord.is_flagged}
                onCheckedChange={toggleFlag}
                disabled={saving}
              />
              <Label>Flag this question</Label>
            </div>
            {qaRecord.is_flagged && (
              <div className="mt-2">
                <Label htmlFor="flag_reason">Flag Reason</Label>
                <Textarea
                  id="flag_reason"
                  value={flagReason}
                  onChange={(e) => setFlagReason(e.target.value)}
                  placeholder="Reason for flagging..."
                  className="mt-2"
                />
              </div>
            )}
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

      {/* Comments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Comments & Feedback
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Add Comment */}
          <div className="space-y-2">
            <div className="flex gap-2">
              <Select
                value={commentType}
                onValueChange={(
                  value:
                    | "general"
                    | "content"
                    | "solution"
                    | "formatting"
                    | "difficulty"
                    | "other"
                ) => setCommentType(value)}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="content">Content</SelectItem>
                  <SelectItem value="solution">Solution</SelectItem>
                  <SelectItem value="formatting">Formatting</SelectItem>
                  <SelectItem value="difficulty">Difficulty</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <Textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1"
              />
              <Button
                onClick={addComment}
                disabled={saving || !newComment.trim()}
              >
                Add
              </Button>
            </div>
          </div>

          {/* Comments List */}
          <div className="space-y-3">
            {comments.map((comment) => (
              <div key={comment.id} className="border rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="text-xs">
                    {comment.comment_type}
                  </Badge>
                  <span className="text-xs text-gray-500">
                    {new Date(comment.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm">{comment.comment_text}</p>
              </div>
            ))}
            {comments.length === 0 && (
              <p className="text-gray-500 text-sm">No comments yet.</p>
            )}
          </div>
        </CardContent>
      </Card>

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
