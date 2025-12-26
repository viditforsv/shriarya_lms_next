"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/design-system/components/ui/button";
import {
  Card,
  CardContent,
} from "@/design-system/components/ui/card";
import { Breadcrumb } from "@/design-system/components/breadcrumb";
import { Badge } from "@/design-system/components/ui/badge";
import { Input } from "@/design-system/components/ui/input";
import { Users, Search, UserCheck, UserX, GraduationCap } from "lucide-react";

interface User {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  role: string;
  created_at: string;
}

export default function TeacherManagementPage() {
  const { user: currentUser, profile, updateUserRole } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState<
    "all" | "student" | "teacher" | "admin" | "content_manager"
  >("all");

  const filterUsers = useCallback(() => {
    let filtered = users;

    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (user) =>
          user.email?.toLowerCase().includes(searchLower) ||
          user.first_name?.toLowerCase().includes(searchLower) ||
          user.last_name?.toLowerCase().includes(searchLower)
      );
    }

    // Filter by role
    if (filterRole !== "all") {
      filtered = filtered.filter((user) => user.role === filterRole);
    }

    setFilteredUsers(filtered);
  }, [users, searchTerm, filterRole]);

  useEffect(() => {
    if (currentUser && profile?.role === "admin") {
      loadUsers();
    }
  }, [currentUser, profile]);

  useEffect(() => {
    filterUsers();
  }, [filterUsers]);

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const supabase = createClient();
      const { data: usersData, error: usersError } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (usersError) throw usersError;
      setUsers(usersData || []);
    } catch (err) {
      console.error("Error loading users:", err);
      setError(err instanceof Error ? err.message : "Failed to load users");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleTeacherRole = async (
    userId: string,
    currentRole: string
  ) => {
    const newRole = currentRole === "teacher" ? "student" : "teacher";

    try {
      const success = await updateUserRole(userId, newRole as "student" | "teacher");
      if (success) {
        setSuccess(
          `User ${
            newRole === "teacher" ? "promoted to" : "removed from"
          } teacher role successfully!`
        );
        loadUsers(); // Refresh
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError("Failed to update user role");
      }
    } catch (err) {
      console.error("Error updating role:", err);
      setError(err instanceof Error ? err.message : "Failed to update role");
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return (
          <Badge className="bg-red-100 text-red-700 border-red-200 rounded-sm">
            Admin
          </Badge>
        );
      case "teacher":
        return (
          <Badge className="bg-blue-100 text-blue-700 border-blue-200 rounded-sm">
            Teacher
          </Badge>
        );
      case "content_manager":
        return (
          <Badge className="bg-purple-100 text-purple-700 border-purple-200 rounded-sm">
            Content Manager
          </Badge>
        );
      default:
        return (
          <Badge
            variant="secondary"
            className="rounded-sm bg-slate-100 text-slate-700 border-slate-200"
          >
            Student
          </Badge>
        );
    }
  };

  if (!currentUser || profile?.role !== "admin") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Access Denied
          </h1>
          <p className="text-muted-foreground">
            You need admin privileges to access this page.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e27447] mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading users...</p>
        </div>
      </div>
    );
  }

  // Dynamically calculate stats for all roles
  const roleCounts = users.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const stats = {
    total: users.length,
    ...roleCounts,
  };

  // Define role metadata for display
  const roleMetadata: Record<
    string,
    { label: string; icon: typeof Users; color: string; iconColor: string }
  > = {
    student: {
      label: "Students",
      icon: GraduationCap,
      color: "text-slate-600",
      iconColor: "text-slate-500",
    },
    teacher: {
      label: "Teachers",
      icon: UserCheck,
      color: "text-blue-700",
      iconColor: "text-blue-600",
    },
    admin: {
      label: "Admins",
      icon: UserX,
      color: "text-red-700",
      iconColor: "text-red-600",
    },
    content_manager: {
      label: "Content Managers",
      icon: Users,
      color: "text-purple-700",
      iconColor: "text-purple-600",
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Admin", href: "/admin/site-administration" },
              { label: "Teacher Management", isActive: true },
            ]}
          />
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1e293b] mb-2">
            Teacher Management
          </h1>
          <p className="text-muted-foreground">
            Promote users to teacher role to enable grading functionality
          </p>
        </div>

        {/* Stats Cards */}
        <div
          className={`grid grid-cols-1 md:grid-cols-${Math.min(
            Object.keys(roleCounts).length + 1,
            4
          )} gap-4 mb-6`}
        >
          {/* Total Users Card */}
          <Card className="rounded-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Total Users
                  </p>
                  <p className="text-2xl font-bold text-[#1e293b]">
                    {stats.total}
                  </p>
                </div>
                <Users className="w-8 h-8 text-[#e27447]" />
              </div>
            </CardContent>
          </Card>

          {/* Dynamic Role Cards */}
          {Object.entries(roleCounts).map(([role, count]) => {
            const meta = roleMetadata[role] || {
              label: role.charAt(0).toUpperCase() + role.slice(1) + "s",
              icon: Users,
              color: "text-gray-600",
              iconColor: "text-gray-600",
            };
            const IconComponent = meta.icon;

            return (
              <Card key={role} className="rounded-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {meta.label}
                      </p>
                      <p className={`text-2xl font-bold ${meta.color}`}>
                        {count}
                      </p>
                    </div>
                    <IconComponent className={`w-8 h-8 ${meta.iconColor}`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-sm text-red-800">
            <strong>Error:</strong> {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-sm text-green-800">
            {success}
          </div>
        )}

        {/* Filters */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rounded-sm"
            />
          </div>
          <select
            value={filterRole}
            onChange={(e) =>
              setFilterRole(
                e.target.value as
                  | "all"
                  | "student"
                  | "teacher"
                  | "admin"
                  | "content_manager"
              )
            }
            className="px-4 py-2 border rounded-sm rounded-sm"
          >
            <option value="all">All Roles</option>
            <option value="student">Students</option>
            <option value="teacher">Teachers</option>
            <option value="content_manager">Content Managers</option>
            <option value="admin">Admins</option>
          </select>
        </div>

        {/* Users Table */}
        {filteredUsers.length === 0 ? (
          <Card className="p-12 text-center rounded-sm">
            <div className="max-w-md mx-auto">
              <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No users found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          </Card>
        ) : (
          <Card className="rounded-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      User
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      Role
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      Created
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b last:border-0 hover:bg-muted/30 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium text-sm">
                            {user.first_name || "N/A"} {user.last_name || ""}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-muted-foreground">
                          {user.email}
                        </span>
                      </td>
                      <td className="px-4 py-3">{getRoleBadge(user.role)}</td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-muted-foreground">
                          {new Date(user.created_at).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        {user.role !== "admin" &&
                          user.id !== currentUser?.id && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleToggleTeacherRole(user.id, user.role)
                              }
                              className={`rounded-sm ${
                                user.role === "teacher"
                                  ? "bg-red-50 hover:bg-red-100 text-red-700 border-red-200 hover:border-red-300"
                                  : "bg-orange-50 hover:bg-orange-100 text-orange-700 border-orange-200 hover:border-orange-300"
                              }`}
                            >
                              {user.role === "teacher" ? (
                                <>
                                  <UserX className="w-4 h-4 mr-2" />
                                  Remove Teacher
                                </>
                              ) : (
                                <>
                                  <UserCheck className="w-4 h-4 mr-2" />
                                  Make Teacher
                                </>
                              )}
                            </Button>
                          )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
