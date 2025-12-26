"use client";

import { Badge } from "@/design-system/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/design-system/components/select";
import { Flag, CheckCircle, XCircle, Clock, Edit, Archive } from "lucide-react";

export type QAStatus =
  | "pending"
  | "in_review"
  | "needs_revision"
  | "approved"
  | "rejected"
  | "archived";

interface QAStatusBadgeProps {
  status: QAStatus;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
}

export function QAStatusBadge({
  status,
  size = "md",
  showIcon = true,
}: QAStatusBadgeProps) {
  const statusConfig = {
    pending: {
      label: "Pending Review",
      variant: "secondary" as const,
      icon: Clock,
      className: "bg-yellow-100 text-yellow-800 border-yellow-200",
    },
    in_review: {
      label: "In Review",
      variant: "secondary" as const,
      icon: Edit,
      className: "bg-blue-100 text-blue-800 border-blue-200",
    },
    needs_revision: {
      label: "Needs Revision",
      variant: "destructive" as const,
      icon: Edit,
      className: "bg-orange-100 text-orange-800 border-orange-200",
    },
    approved: {
      label: "Approved",
      variant: "default" as const,
      icon: CheckCircle,
      className: "bg-green-100 text-green-800 border-green-200",
    },
    rejected: {
      label: "Rejected",
      variant: "destructive" as const,
      icon: XCircle,
      className: "bg-red-100 text-red-800 border-red-200",
    },
    archived: {
      label: "Archived",
      variant: "outline" as const,
      icon: Archive,
      className: "bg-gray-100 text-gray-800 border-gray-200",
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  const sizeClasses = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-2",
  };

  return (
    <Badge
      variant={config.variant}
      className={`${config.className} ${sizeClasses[size]} flex items-center gap-1`}
    >
      {showIcon && <Icon className="w-3 h-3" />}
      {config.label}
    </Badge>
  );
}

interface QAStatusSelectorProps {
  value: QAStatus;
  onValueChange: (value: QAStatus) => void;
  disabled?: boolean;
}

export function QAStatusSelector({
  value,
  onValueChange,
  disabled = false,
}: QAStatusSelectorProps) {
  const statuses: { value: QAStatus; label: string }[] = [
    { value: "pending", label: "Pending Review" },
    { value: "in_review", label: "In Review" },
    { value: "needs_revision", label: "Needs Revision" },
    { value: "approved", label: "Approved" },
    { value: "rejected", label: "Rejected" },
    { value: "archived", label: "Archived" },
  ];

  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger className="w-48">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {statuses.map((status) => (
          <SelectItem key={status.value} value={status.value}>
            <div className="flex items-center gap-2">
              <QAStatusBadge status={status.value} size="sm" showIcon={true} />
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

interface QAPriorityBadgeProps {
  priority: "low" | "medium" | "high" | "urgent";
  size?: "sm" | "md" | "lg";
}

export function QAPriorityBadge({
  priority,
  size = "sm",
}: QAPriorityBadgeProps) {
  const priorityConfig = {
    low: {
      label: "Low",
      className: "bg-gray-100 text-gray-800 border-gray-200",
    },
    medium: {
      label: "Medium",
      className: "bg-blue-100 text-blue-800 border-blue-200",
    },
    high: {
      label: "High",
      className: "bg-orange-100 text-orange-800 border-orange-200",
    },
    urgent: {
      label: "Urgent",
      className: "bg-red-100 text-red-800 border-red-200",
    },
  };

  const config = priorityConfig[priority];
  const sizeClasses = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-2",
  };

  return (
    <Badge
      variant="outline"
      className={`${config.className} ${sizeClasses[size]} flex items-center gap-1`}
    >
      {priority === "urgent" && <Flag className="w-3 h-3" />}
      {config.label}
    </Badge>
  );
}

interface QARatingDisplayProps {
  ratings: {
    content_accuracy?: number;
    difficulty_appropriateness?: number;
    clarity_rating?: number;
    solution_quality?: number;
  };
  overallRating?: number;
}

export function QARatingDisplay({
  ratings,
  overallRating,
}: QARatingDisplayProps) {
  const ratingLabels = {
    content_accuracy: "Content Accuracy",
    difficulty_appropriateness: "Difficulty",
    clarity_rating: "Clarity",
    solution_quality: "Solution Quality",
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return "text-green-600";
    if (rating >= 3) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-2">
      {Object.entries(ratings).map(([key, value]) => (
        <div key={key} className="flex items-center justify-between text-sm">
          <span className="text-gray-600">
            {ratingLabels[key as keyof typeof ratingLabels]}:
          </span>
          <span className={`font-medium ${getRatingColor(value || 0)}`}>
            {value ? `${value}/5` : "Not rated"}
          </span>
        </div>
      ))}
      {overallRating && (
        <div className="border-t pt-2 mt-2">
          <div className="flex items-center justify-between text-sm font-medium">
            <span>Overall Rating:</span>
            <span className={`${getRatingColor(overallRating)}`}>
              {overallRating.toFixed(1)}/5
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
