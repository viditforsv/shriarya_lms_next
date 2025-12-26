"use client";

import Image from "next/image";
import { useCallback } from "react";
import { AdminOnly } from "@/design-system/components/form-components/RoleGuard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/design-system/components/ui/card";
import { Button } from "@/design-system/components/ui/button";
import { Badge } from "@/design-system/components/ui/badge";
import { Breadcrumb } from "@/design-system/components/breadcrumb";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/design-system/components/dialog";
import {
  Flag,
  AlertCircle,
  MessageSquare,
  Image as ImageIcon,
  Eye,
  CheckCircle2,
  Search,
  Filter,
  Loader2,
  ExternalLink,
} from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Feedback {
  id: string;
  lesson_id: string;
  lesson_slug: string;
  course_slug: string;
  user_id: string | null;
  feedback_type: "mistake" | "suggestion";
  message: string;
  image_url: string | null;
  status: "pending" | "reviewed" | "resolved" | "dismissed";
  admin_notes: string | null;
  reviewed_by: string | null;
  reviewed_at: string | null;
  created_at: string;
  updated_at: string;
  profiles?: {
    id: string;
    full_name: string | null;
    email: string | null;
  } | null;
}

interface FeedbackStats {
  total: number;
  pending: number;
  reviewed: number;
  resolved: number;
  mistakes: number;
  suggestions: number;
}

export default function LessonFeedbackPage() {
  // const { profile } = useAuth();
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [stats, setStats] = useState<FeedbackStats>({
    total: 0,
    pending: 0,
    reviewed: 0,
    resolved: 0,
    mistakes: 0,
    suggestions: 0,
  });
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterCourse, setFilterCourse] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);
  const [adminNotes, setAdminNotes] = useState("");
  const [updateStatus, setUpdateStatus] = useState<string>("");
  const [updating, setUpdating] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (fetchFeedback) {
      fetchFeedback();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterStatus, filterType, filterCourse, page]);

  const fetchFeedback = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "50",
      });
      if (filterStatus !== "all") params.append("status", filterStatus);
      if (filterType !== "all") params.append("feedback_type", filterType);
      if (filterCourse) params.append("course_slug", filterCourse);

      const response = await fetch(
        `/api/admin/lesson-feedback?${params.toString()}`
      );
      if (response.ok) {
        const data = await response.json();
        setFeedback(data.feedback || []);
        setTotalPages(data.totalPages || 1);
        calculateStats(data.feedback || []);
      }
    } catch (error) {
      console.error("Error fetching feedback:", error);
    } finally {
      setLoading(false);
    }
  }, [filterStatus, filterType, filterCourse, page]);

  const calculateStats = (feedbackList: Feedback[]) => {
    const newStats: FeedbackStats = {
      total: feedbackList.length,
      pending: 0,
      reviewed: 0,
      resolved: 0,
      mistakes: 0,
      suggestions: 0,
    };

    feedbackList.forEach((item) => {
      if (item.status === "pending") newStats.pending++;
      if (item.status === "reviewed") newStats.reviewed++;
      if (item.status === "resolved") newStats.resolved++;
      if (item.feedback_type === "mistake") newStats.mistakes++;
      if (item.feedback_type === "suggestion") newStats.suggestions++;
    });

    setStats(newStats);
  };

  const handleOpenModal = (item: Feedback) => {
    setSelectedFeedback(item);
    setAdminNotes(item.admin_notes || "");
    setUpdateStatus(item.status);
    setShowModal(true);
  };

  const handleUpdateFeedback = async () => {
    if (!selectedFeedback) return;

    setUpdating(true);
    try {
      const response = await fetch("/api/admin/lesson-feedback", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: selectedFeedback.id,
          status: updateStatus,
          admin_notes: adminNotes,
        }),
      });

      if (response.ok) {
        await fetchFeedback();
        setShowModal(false);
        setSelectedFeedback(null);
      } else {
        const data = await response.json();
        alert(`Error: ${data.error || "Failed to update feedback"}`);
      }
    } catch (error) {
      console.error("Error updating feedback:", error);
      alert("Failed to update feedback");
    } finally {
      setUpdating(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<
      string,
      "default" | "secondary" | "destructive" | "outline"
    > = {
      pending: "default",
      reviewed: "secondary",
      resolved: "outline",
      dismissed: "destructive",
    };

    const colors: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      reviewed: "bg-blue-100 text-blue-800 border-blue-200",
      resolved: "bg-green-100 text-green-800 border-green-200",
      dismissed: "bg-gray-100 text-gray-800 border-gray-200",
    };

    return (
      <Badge
        variant={variants[status] || "default"}
        className={`rounded-sm ${colors[status] || ""}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getTypeBadge = (type: string) => {
    return (
      <Badge
        variant={type === "mistake" ? "destructive" : "default"}
        className={`rounded-sm ${
          type === "mistake"
            ? "bg-red-100 text-red-800 border-red-200"
            : "bg-[#e27447] text-white border-[#e27447]"
        }`}
      >
        {type === "mistake" ? (
          <>
            <AlertCircle className="w-3 h-3 mr-1" />
            Mistake
          </>
        ) : (
          <>
            <Flag className="w-3 h-3 mr-1" />
            Suggestion
          </>
        )}
      </Badge>
    );
  };

  const filteredFeedback = feedback.filter((item) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        item.message.toLowerCase().includes(query) ||
        item.lesson_slug.toLowerCase().includes(query) ||
        item.course_slug.toLowerCase().includes(query) ||
        item.profiles?.full_name?.toLowerCase().includes(query) ||
        item.profiles?.email?.toLowerCase().includes(query)
      );
    }
    return true;
  });

  if (loading && feedback.length === 0) {
    return (
      <AdminOnly>
        <div className="min-h-screen bg-background">
          <div className="container mx-auto px-4 py-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded-sm w-1/3 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded-sm w-1/2 mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-24 bg-gray-200 rounded-sm"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </AdminOnly>
    );
  }

  return (
    <AdminOnly>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumbs */}
          <div className="mb-6">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Admin", href: "/admin/site-administration" },
                { label: "Lesson Feedback", isActive: true },
              ]}
            />
          </div>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Lesson Feedback
                </h1>
                <p className="text-muted-foreground mt-2">
                  Review and manage feedback from students and users
                </p>
              </div>
              <Badge variant="secondary" className="text-sm">
                Admin Dashboard
              </Badge>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <Card className="rounded-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Feedback
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total}</div>
              </CardContent>
            </Card>
            <Card className="rounded-sm border-yellow-200 bg-yellow-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-yellow-800">
                  Pending
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-800">
                  {stats.pending}
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-sm border-blue-200 bg-blue-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-blue-800">
                  Reviewed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-800">
                  {stats.reviewed}
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-sm border-red-200 bg-red-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-red-800">
                  Mistakes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-800">
                  {stats.mistakes}
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-sm border-[#e27447] bg-[#feefea]">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-[#e27447]">
                  Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#e27447]">
                  {stats.suggestions}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="mb-6 rounded-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="search">Search</Label>
                  <div className="relative mt-2">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Search feedback..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 rounded-sm"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger id="status" className="mt-2 rounded-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="reviewed">Reviewed</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="dismissed">Dismissed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger id="type" className="mt-2 rounded-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="mistake">Mistakes</SelectItem>
                      <SelectItem value="suggestion">Suggestions</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="course">Course Slug</Label>
                  <Input
                    id="course"
                    placeholder="Filter by course..."
                    value={filterCourse}
                    onChange={(e) => setFilterCourse(e.target.value)}
                    className="mt-2 rounded-sm"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feedback List */}
          <div className="space-y-4">
            {filteredFeedback.length === 0 ? (
              <Card className="rounded-sm">
                <CardContent className="py-12 text-center">
                  <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    No feedback found matching your filters.
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredFeedback.map((item) => (
                <Card key={item.id} className="rounded-sm">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getTypeBadge(item.feedback_type)}
                          {getStatusBadge(item.status)}
                        </div>
                        <CardTitle className="text-lg">
                          {item.profiles?.full_name || "Anonymous User"}
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {item.profiles?.email || "No email"}
                          {" • "}
                          <Link
                            href={`/courses/${item.course_slug}/lesson/${item.lesson_slug}`}
                            className="text-[#e27447] hover:underline inline-flex items-center gap-1"
                            target="_blank"
                          >
                            {item.course_slug} / {item.lesson_slug}
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                        </CardDescription>
                      </div>
                      <div className="text-right text-sm text-muted-foreground">
                        {new Date(item.created_at).toLocaleDateString()}
                        <br />
                        {new Date(item.created_at).toLocaleTimeString()}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4 whitespace-pre-wrap">
                      {item.message}
                    </p>

                    {item.image_url && (
                      <div className="mb-4">
                        <a
                          href={item.image_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-[#e27447] hover:underline"
                        >
                          <ImageIcon className="w-4 h-4" />
                          View attached image
                        </a>
                      </div>
                    )}

                    {item.admin_notes && (
                      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-sm">
                        <p className="text-xs font-semibold text-blue-800 mb-1">
                          Admin Notes:
                        </p>
                        <p className="text-sm text-blue-900 whitespace-pre-wrap">
                          {item.admin_notes}
                        </p>
                      </div>
                    )}

                    <div className="mt-4 flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenModal(item)}
                        className="rounded-sm"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Review
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-center gap-2">
              <Button
                variant="outline"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="rounded-sm"
              >
                Previous
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {page} of {totalPages}
              </span>
              <Button
                variant="outline"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="rounded-sm"
              >
                Next
              </Button>
            </div>
          )}

          {/* Review Modal */}
          <Dialog open={showModal} onOpenChange={setShowModal}>
            <DialogContent className="rounded-sm max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {selectedFeedback?.feedback_type === "mistake" ? (
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  ) : (
                    <Flag className="w-5 h-5 text-[#e27447]" />
                  )}
                  Review Feedback
                </DialogTitle>
                <DialogDescription>
                  {selectedFeedback?.profiles?.full_name || "Anonymous User"} •{" "}
                  {selectedFeedback &&
                    new Date(selectedFeedback.created_at).toLocaleString()}
                </DialogDescription>
              </DialogHeader>

              {selectedFeedback && (
                <div className="space-y-4">
                  <div>
                    <Label>Feedback Type</Label>
                    <div className="mt-1">
                      {getTypeBadge(selectedFeedback.feedback_type)}
                    </div>
                  </div>

                  <div>
                    <Label>Lesson</Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      <Link
                        href={`/courses/${selectedFeedback.course_slug}/lesson/${selectedFeedback.lesson_slug}`}
                        className="text-[#e27447] hover:underline inline-flex items-center gap-1"
                        target="_blank"
                      >
                        {selectedFeedback.course_slug} /{" "}
                        {selectedFeedback.lesson_slug}
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </p>
                  </div>

                  <div>
                    <Label>Message</Label>
                    <div className="mt-1 p-3 bg-gray-50 rounded-sm border">
                      <p className="text-sm whitespace-pre-wrap">
                        {selectedFeedback.message}
                      </p>
                    </div>
                  </div>

                  {selectedFeedback.image_url && (
                    <div>
                      <Label>Attached Image</Label>
                      <div className="mt-1">
                        <a
                          href={selectedFeedback.image_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
                          <Image
                            src={selectedFeedback.image_url}
                            alt="Feedback attachment"
                            width={500}
                            height={400}
                            className="max-w-full h-auto rounded-sm border"
                          />
                        </a>
                      </div>
                    </div>
                  )}

                  <div>
                    <Label htmlFor="status-select">Status</Label>
                    <Select
                      value={updateStatus}
                      onValueChange={setUpdateStatus}
                    >
                      <SelectTrigger
                        id="status-select"
                        className="mt-1 rounded-sm"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="reviewed">Reviewed</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                        <SelectItem value="dismissed">Dismissed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="admin-notes">Admin Notes</Label>
                    <Textarea
                      id="admin-notes"
                      value={adminNotes}
                      onChange={(e) => setAdminNotes(e.target.value)}
                      placeholder="Add your notes or response here..."
                      className="mt-1 rounded-sm min-h-[120px]"
                      rows={5}
                    />
                  </div>
                </div>
              )}

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setShowModal(false)}
                  className="rounded-sm"
                  disabled={updating}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleUpdateFeedback}
                  disabled={updating}
                  className="bg-[#e27447] hover:bg-[#e27447]/90 rounded-sm"
                >
                  {updating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Update Feedback
                    </>
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </AdminOnly>
  );
}
