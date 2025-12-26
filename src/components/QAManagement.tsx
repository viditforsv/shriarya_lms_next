"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/design-system/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/design-system/components/ui/card";
import { CheckCircle, Edit, AlertCircle, Flag } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

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

interface QAManagementProps {
  questionId: string;
  onStatusChange?: (status: string) => void;
}

export default function QAManagement({
  questionId,
  onStatusChange,
}: QAManagementProps) {
  const { user, session } = useAuth();
  const [qaRecord, setQARecord] = useState<QARecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const fetchQAData = useCallback(async () => {
    try {
      setLoading(true);
      console.log("🔄 Fetching QA data for question:", questionId);

      // Fetch QA record with cache busting
      const cacheBuster = `&_t=${Date.now()}`;
      const qaResponse = await fetch(
        `/api/qa?question_id=${questionId}${cacheBuster}`,
        {
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache",
          },
        }
      );
      console.log("📡 QA fetch response status:", qaResponse.status);

      if (qaResponse.ok) {
        const qaData = await qaResponse.json();
        console.log("📥 QA fetch response data:", qaData);

        if (qaData.qa_records && qaData.qa_records.length > 0) {
          const record = qaData.qa_records[0];
          console.log("✅ Setting QA record:", record);
          setQARecord(record);
        } else {
          console.log("⚠️ No QA records found, setting to null");
          setQARecord(null);
        }
      } else {
        console.error(
          "❌ QA fetch failed:",
          qaResponse.status,
          qaResponse.statusText
        );
        setQARecord(null);
      }
    } catch (error) {
      console.error("❌ Error fetching QA data:", error);
      setQARecord(null);
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
    console.log("🚀 updateQAStatus FUNCTION CALLED!");
    console.log("updateQAStatus called with:", {
      newStatus,
      notes,
      qaRecord,
      questionId,
      currentUserId: user?.id,
    });

    if (!qaRecord) {
      console.log(
        "⚠️ No QA record found, creating a new one before updating..."
      );
      await createQARecord(newStatus, notes);
      return;
    }

    if (!user?.id) {
      setNotification({
        type: "error",
        message: "You must be logged in to approve questions",
      });
      setTimeout(() => setNotification(null), 5000);
      console.error("❌ No user ID found - user not logged in");
      console.error("❌ User object:", user);
      return;
    }

    console.log("✅ User authenticated:", {
      userId: user.id,
      email: user.email,
      role: user.user_metadata?.role || "unknown",
    });

    try {
      setSaving(true);

      const updateData = {
        qa_status: newStatus,
        review_notes: notes,
        ...((newStatus === "in_review" || newStatus === "approved") && {
          review_date: new Date().toISOString(),
        }),
        ...(newStatus === "needs_revision" && {
          revision_count: (qaRecord.revision_count || 0) + 1,
          last_revision_date: new Date().toISOString(),
          revision_notes: notes,
        }),
      };

      const requestBody = {
        question_id: questionId,
        reviewer_id: user?.id, // Pass current user ID as reviewer
        ...updateData,
      };

      console.log("Sending API request with reviewer_id:", user?.id);
      console.log("Full request body:", requestBody);
      console.log("Request headers:", {
        "Content-Type": "application/json",
        ...(session?.access_token && {
          Authorization: `Bearer ${session.access_token}`,
        }),
      });

      let response;
      try {
        const apiUrl = `/api/qa`;
        console.log("🌐 Making request to:", apiUrl);
        console.log("🌐 Full URL would be:", window.location.origin + apiUrl);

        response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(session?.access_token && {
              Authorization: `Bearer ${session.access_token}`,
            }),
          },
          body: JSON.stringify(requestBody),
        });
        console.log("✅ Fetch request completed successfully");
      } catch (fetchError) {
        console.error("❌ Fetch request failed:", fetchError);
        throw fetchError;
      }

      console.log("API response status:", response.status);

      if (response.ok) {
        const updatedQA = await response.json();
        console.log("✅ API Success - Updated QA record:", updatedQA);

        // Update local state first
        setQARecord(updatedQA.qa_record);

        // Notify parent component to refresh
        onStatusChange?.(newStatus);

        // Show success notification
        setNotification({
          type: "success",
          message: `Successfully updated status to: ${newStatus}`,
        });
        setTimeout(() => setNotification(null), 5000);

        // Refresh data from server to ensure consistency
        await fetchQAData();
      } else {
        const errorData = await response.json();
        console.error("❌ API Error Response:", errorData);
        setNotification({
          type: "error",
          message: `Failed to update status: ${
            errorData.error || "Unknown error"
          }`,
        });
        setTimeout(() => setNotification(null), 5000);
      }
    } catch (error) {
      console.error("❌ Unexpected error updating QA status:", error);
      setNotification({
        type: "error",
        message: `Unexpected error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      });
      setTimeout(() => setNotification(null), 5000);
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

  const createQARecord = async (
    status: QARecord["qa_status"] = "pending",
    notes?: string
  ) => {
    try {
      setSaving(true);
      console.log("🆕 Creating new QA record with status:", status);

      const response = await fetch(`/api/qa`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(session?.access_token && {
            Authorization: `Bearer ${session.access_token}`,
          }),
        },
        body: JSON.stringify({
          question_id: questionId,
          qa_status: status,
          reviewer_id: user?.id, // Pass current user ID as reviewer
          priority_level: "medium",
          review_notes:
            notes ||
            (status === "approved" ? "Pre-approved" : "Auto-created QA record"),
          ...(status === "approved" && {
            review_date: new Date().toISOString(),
          }),
        }),
      });

      if (response.ok) {
        const newQA = await response.json();
        console.log("✅ QA record created successfully:", newQA);

        // Update local state first
        setQARecord(newQA.qa_record);

        // Notify parent component to refresh
        onStatusChange?.(status);

        // Show success notification
        setNotification({
          type: "success",
          message: `Successfully created and set status to: ${status}`,
        });
        setTimeout(() => setNotification(null), 5000);

        // Refresh data from server to ensure consistency
        await fetchQAData();
      } else {
        const errorData = await response.json();
        console.error("❌ Failed to create QA record:", errorData);
        setNotification({
          type: "error",
          message: `Failed to create QA record: ${
            errorData.error || "Unknown error"
          }`,
        });
        setTimeout(() => setNotification(null), 5000);
      }
    } catch (error) {
      console.error("❌ Error creating QA record:", error);
      setNotification({
        type: "error",
        message: `Error creating QA record: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      });
      setTimeout(() => setNotification(null), 5000);
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          Quality Assurance
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Notification Banner */}
        {notification && (
          <div
            className={`mb-4 p-3 rounded-sm text-sm ${
              notification.type === "success"
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            <div className="flex items-center gap-2">
              {notification.type === "success" ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <AlertCircle className="w-4 h-4" />
              )}
              <span>{notification.message}</span>
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <Button
            onClick={() => {
              console.log("🖱️ APPROVE BUTTON CLICKED!");
              updateQAStatus("approved", "Approved after review");
            }}
            disabled={saving}
            className="flex items-center gap-2"
          >
            <CheckCircle className="w-4 h-4" />
            {saving ? "Saving..." : "Approve"}
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
  );
}
