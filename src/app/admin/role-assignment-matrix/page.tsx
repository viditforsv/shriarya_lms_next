"use client";

import React, { useState, useEffect } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/design-system/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/design-system/components/table";
import { Button } from "@/design-system/components/ui/button";
import { Badge } from "@/design-system/components/ui/badge";
import { Breadcrumb } from "@/design-system/components/breadcrumb";
import {
  ChevronDown,
  ChevronRight,
  Loader2,
  Shield,
  Users,
  Settings,
  CheckCircle2,
  XCircle,
  BarChart3,
  BookOpen,
  FileText,
  HelpCircle,
  UserCheck,
  GraduationCap,
  MessageSquare,
  Cog,
  DollarSign,
  LifeBuoy,
} from "lucide-react";

// Type definitions for API data
interface Permission {
  id: string;
  name: string;
  displayName: string;
  description: string;
}

interface PermissionCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  displayOrder: number;
  tasks: Permission[];
}

interface Role {
  id: string;
  name: string;
  display_name: string;
  description: string;
  is_system_role: boolean;
}

interface AssignmentMatrix {
  [permissionId: string]: {
    [roleId: string]: boolean;
  };
}

// Function to get appropriate icon for category
const getCategoryIcon = (categoryName: string) => {
  const iconMap: { [key: string]: React.ReactNode } = {
    "course-management": <BookOpen className="w-6 h-6 text-[#1e293b]" />,
    "content-management": <FileText className="w-6 h-6 text-[#1e293b]" />,
    "question-bank": <HelpCircle className="w-6 h-6 text-[#1e293b]" />,
    "user-management": <UserCheck className="w-6 h-6 text-[#1e293b]" />,
    "enrollment-access": <GraduationCap className="w-6 h-6 text-[#1e293b]" />,
    "analytics-reporting": <BarChart3 className="w-6 h-6 text-[#1e293b]" />,
    communication: <MessageSquare className="w-6 h-6 text-[#1e293b]" />,
    "system-administration": <Cog className="w-6 h-6 text-[#1e293b]" />,
    "financial-management": <DollarSign className="w-6 h-6 text-[#1e293b]" />,
    "support-help": <LifeBuoy className="w-6 h-6 text-[#1e293b]" />,
  };

  return (
    iconMap[categoryName] || <Settings className="w-6 h-6 text-[#1e293b]" />
  );
};

export default function RoleAssignmentMatrixPage() {
  // State for data
  const [permissionCategories, setPermissionCategories] = useState<
    PermissionCategory[]
  >([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [assignments, setAssignments] = useState<AssignmentMatrix>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for collapsible categories
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(["course-management", "content-management", "question-bank"])
  );

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch permissions, roles, and assignments in parallel
      const [permissionsResponse, rolesResponse, assignmentsResponse] =
        await Promise.all([
          fetch("/api/rbac/permissions"),
          fetch("/api/rbac/roles"),
          fetch("/api/rbac/role-permissions"),
        ]);

      if (
        !permissionsResponse.ok ||
        !rolesResponse.ok ||
        !assignmentsResponse.ok
      ) {
        throw new Error("Failed to fetch data");
      }

      const [permissionsData, rolesData, assignmentsData] = await Promise.all([
        permissionsResponse.json(),
        rolesResponse.json(),
        assignmentsResponse.json(),
      ]);

      setPermissionCategories(permissionsData.permissions);
      setRoles(rolesData.roles);
      setAssignments(assignmentsData.matrix || {});
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load role assignment data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Toggle category expansion
  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  // Expand all categories
  const expandAll = () => {
    setExpandedCategories(new Set(permissionCategories.map((cat) => cat.id)));
  };

  // Collapse all categories
  const collapseAll = () => {
    setExpandedCategories(new Set());
  };

  // Toggle assignment for a specific permission and role
  const toggleAssignment = async (permissionId: string, roleId: string) => {
    const isCurrentlyAssigned = assignments[permissionId]?.[roleId] || false;

    try {
      const response = await fetch("/api/rbac/role-permissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roleId,
          permissionId,
          granted: !isCurrentlyAssigned,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update permission");
      }

      // Update local state
      setAssignments((prev) => ({
        ...prev,
        [permissionId]: {
          ...prev[permissionId],
          [roleId]: !isCurrentlyAssigned,
        },
      }));
    } catch (err) {
      console.error("Error updating permission:", err);
      setError("Failed to update permission. Please try again.");
    }
  };

  // Check if a permission is assigned to a role
  const isAssigned = (permissionId: string, roleId: string): boolean => {
    return assignments[permissionId]?.[roleId] || false;
  };

  // Calculate statistics
  const totalPermissions = permissionCategories.reduce(
    (sum, category) => sum + category.tasks.length,
    0
  );
  const totalRoles = roles.length;
  const totalCombinations = totalPermissions * totalRoles;

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-8 h-8 animate-spin text-[#e27447]" />
              <p className="text-muted-foreground">
                Loading role assignment matrix...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center max-w-2xl">
              <Card className="bg-red-50 border-red-200">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <XCircle className="w-6 h-6 text-red-600" />
                    <h3 className="text-lg font-semibold text-red-800">
                      Database Setup Required
                    </h3>
                  </div>
                  <p className="text-red-700 mb-4">{error}</p>
                  <div className="text-left bg-white rounded-sm p-4 border">
                    <h4 className="font-semibold text-[#1e293b] mb-2">
                      Setup Instructions:
                    </h4>
                    <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Fix RLS circular dependency in Supabase dashboard</li>
                      <li>
                        Add sample data if needed through Supabase dashboard
                      </li>
                      <li>Migrate existing users through Supabase dashboard</li>
                    </ol>
                  </div>
                </CardContent>
              </Card>
              <Button
                onClick={fetchData}
                className="mt-4 bg-[#e27447] hover:bg-[#e27447]/90"
              >
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumbs */}
        <div className="mb-8">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Admin", href: "/admin/site-administration" },
              { label: "Role Assignment Matrix", isActive: true },
            ]}
          />
        </div>

        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-[#1e293b]" />
            <h1 className="text-4xl font-bold text-[#1e293b] font-dm-sans">
              Role Assignment Matrix
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Manage permissions by assigning tasks to different roles. Click
            checkboxes to toggle assignments in real-time.
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-gradient-to-r from-[#feefea] to-[#fffefd] border-[#e27447]">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Settings className="w-12 h-12 text-[#1e293b]" />
                <div>
                  <div className="text-3xl font-bold text-[#1e293b]">
                    {totalPermissions}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total Permissions
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-[#feefea] to-[#fffefd] border-[#e27447]">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Users className="w-12 h-12 text-[#1e293b]" />
                <div>
                  <div className="text-3xl font-bold text-[#1e293b]">
                    {totalRoles}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total Roles
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-[#feefea] to-[#fffefd] border-[#e27447]">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <BarChart3 className="w-12 h-12 text-[#1e293b]" />
                <div>
                  <div className="text-3xl font-bold text-[#1e293b]">
                    {totalCombinations}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Permission Combinations
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Matrix Card */}
        <Card className="rounded-sm shadow-lg border-[#feefea]">
          <CardHeader className="bg-gradient-to-r from-[#feefea] to-[#fffefd] border-b border-[#e27447]">
            <CardTitle className="text-2xl font-bold text-[#1e293b] font-dm-sans">
              Comprehensive Permission Matrix
            </CardTitle>
            <CardDescription className="text-[#4a6f73] text-base">
              Configure which roles can perform specific tasks in the LMS
              system.
              <span className="font-medium text-[#e27447] ml-1">
                {totalPermissions} permissions × {totalRoles} roles ={" "}
                {totalCombinations} permission combinations
              </span>
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0">
            <div className="overflow-x-auto max-h-[70vh]">
              <Table>
                <TableHeader className="sticky top-0 bg-white z-10">
                  <TableRow className="bg-[#feefea]/30 hover:bg-primary/10/30">
                    <TableHead className="font-semibold text-[#1e293b] w-64 sticky left-0 bg-white border-r border-[#e27447]/20">
                      <div className="flex items-center justify-between">
                        <span className="font-dm-sans">Tasks</span>
                        <div className="flex gap-1">
                          <Button
                            onClick={expandAll}
                            size="sm"
                            variant="outline"
                            className="text-xs px-2 py-1 bg-[#e27447] text-white hover:bg-[#e27447]/90 border-[#e27447]"
                          >
                            Expand All
                          </Button>
                          <Button
                            onClick={collapseAll}
                            size="sm"
                            variant="outline"
                            className="text-xs px-2 py-1 border-foreground text-foreground hover:bg-foreground hover:text-white"
                          >
                            Collapse All
                          </Button>
                        </div>
                      </div>
                    </TableHead>
                    {roles.map((role) => (
                      <TableHead
                        key={role.id}
                        className="font-semibold text-[#1e293b] text-center min-w-32"
                      >
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-sm font-dm-sans">
                            {role.display_name}
                          </span>
                          <Badge
                            variant={
                              role.is_system_role ? "default" : "secondary"
                            }
                            className="text-xs"
                          >
                            {role.is_system_role ? "System" : "Custom"}
                          </Badge>
                        </div>
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {permissionCategories.flatMap((category) => {
                    const isExpanded = expandedCategories.has(category.id);

                    return [
                      // Category Header Row
                      <TableRow
                        key={`${category.id}-header`}
                        className="bg-[#feefea]/20 hover:bg-primary/10/30 border-b-2 border-[#e27447]/20"
                      >
                        <TableCell className="font-semibold text-[#1e293b] py-4 sticky left-0 bg-[#feefea]/20 border-r border-[#e27447]/20">
                          <button
                            onClick={() => toggleCategory(category.id)}
                            className="flex items-center gap-3 hover:text-[#e27447] transition-colors cursor-pointer w-full text-left bg-transparent border-none p-0"
                          >
                            {isExpanded ? (
                              <ChevronDown className="w-4 h-4" />
                            ) : (
                              <ChevronRight className="w-4 h-4" />
                            )}
                            {getCategoryIcon(category.id)}
                            <span className="font-dm-sans">
                              {category.name}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {category.tasks.length} permissions
                            </Badge>
                          </button>
                        </TableCell>
                        {roles.map((role) => {
                          const assignedCount = category.tasks.filter(
                            (permission) => isAssigned(permission.id, role.id)
                          ).length;
                          const totalCount = category.tasks.length;
                          const percentage =
                            totalCount > 0
                              ? (assignedCount / totalCount) * 100
                              : 0;

                          return (
                            <TableCell
                              key={role.id}
                              className="text-center py-4"
                            >
                              <div className="flex flex-col items-center gap-2">
                                <div className="flex items-center gap-2">
                                  {percentage === 100 ? (
                                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                                  ) : percentage > 0 ? (
                                    <div className="w-4 h-4 rounded-sm bg-[#e27447] flex items-center justify-center">
                                      <span className="text-xs text-white font-bold">
                                        {assignedCount}
                                      </span>
                                    </div>
                                  ) : (
                                    <XCircle className="w-4 h-4 text-gray-400" />
                                  )}
                                  <span className="text-sm font-medium text-[#1e293b]">
                                    {assignedCount}/{totalCount}
                                  </span>
                                </div>
                                <div className="w-16 h-2 bg-gray-200 rounded-sm overflow-hidden">
                                  <div
                                    className={`h-full transition-all duration-300 ${
                                      percentage === 100
                                        ? "bg-green-500"
                                        : percentage >= 50
                                        ? "bg-[#e27447]"
                                        : percentage > 0
                                        ? "bg-orange-400"
                                        : "bg-gray-300"
                                    }`}
                                    style={{ width: `${percentage}%` }}
                                  />
                                </div>
                              </div>
                            </TableCell>
                          );
                        })}
                      </TableRow>,
                      // Category Tasks
                      ...(isExpanded
                        ? category.tasks.map((permission) => {
                            return (
                              <TableRow
                                key={`${category.id}-${permission.id}`}
                                className="hover:bg-primary/10/10 transition-colors"
                              >
                                <TableCell className="font-medium text-[#1e293b] py-3 sticky left-0 bg-white border-r border-[#e27447]/20 pl-8">
                                  <span className="text-sm font-dm-sans">
                                    • {permission.displayName}
                                  </span>
                                </TableCell>
                                {roles.map((role) => (
                                  <TableCell
                                    key={role.id}
                                    className="text-center py-3"
                                  >
                                    <div className="flex justify-center">
                                      <input
                                        type="checkbox"
                                        checked={isAssigned(
                                          permission.id,
                                          role.id
                                        )}
                                        onChange={() =>
                                          toggleAssignment(
                                            permission.id,
                                            role.id
                                          )
                                        }
                                        className="w-4 h-4 text-[#e27447] bg-white border-[#e27447] rounded-sm focus:ring-[#e27447] focus:ring-2 hover:scale-110 transition-transform cursor-pointer"
                                      />
                                    </div>
                                  </TableCell>
                                ))}
                              </TableRow>
                            );
                          })
                        : []),
                    ];
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Category Summary */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-[#1e293b] mb-8 font-dm-sans text-center">
            Category Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {permissionCategories.map((category) => {
              const totalAssigned = roles.reduce((total, role) => {
                return (
                  total +
                  category.tasks.filter((permission) =>
                    isAssigned(permission.id, role.id)
                  ).length
                );
              }, 0);
              const maxPossible = category.tasks.length * roles.length;
              const percentage =
                maxPossible > 0 ? (totalAssigned / maxPossible) * 100 : 0;

              return (
                <Card
                  key={category.id}
                  className="rounded-sm border-[#feefea] hover:border-[#e27447] transition-colors"
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-medium flex items-center gap-3 font-dm-sans">
                      {getCategoryIcon(category.id)}
                      {category.name}
                    </CardTitle>
                    <CardDescription className="text-[#4a6f73]">
                      {totalAssigned} of {maxPossible} permissions assigned
                      <div className="w-full bg-gray-200 rounded-sm h-2 mt-2">
                        <div
                          className="bg-[#e27447] h-2 rounded-sm transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-[#4a6f73]">
                      <div className="flex justify-between">
                        <span>Permissions:</span>
                        <span className="font-medium text-[#1e293b]">
                          {category.tasks.length}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Roles:</span>
                        <span className="font-medium text-[#1e293b]">
                          {roles.length}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Assigned:</span>
                        <span className="font-medium text-[#e27447]">
                          {totalAssigned}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Role Summary */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-[#1e293b] mb-8 font-dm-sans text-center">
            Role Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {roles.map((role) => {
              const assignedPermissions = permissionCategories.flatMap(
                (category) =>
                  category.tasks.filter((permission) =>
                    isAssigned(permission.id, role.id)
                  )
              );

              return (
                <Card
                  key={role.id}
                  className="rounded-sm border-[#feefea] hover:border-[#e27447] transition-colors"
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-medium font-dm-sans">
                      {role.display_name}
                    </CardTitle>
                    <CardDescription className="text-[#4a6f73]">
                      {assignedPermissions.length} of {totalPermissions}{" "}
                      permissions assigned
                      <div className="w-full bg-gray-200 rounded-sm h-2 mt-2">
                        <div
                          className="bg-[#e27447] h-2 rounded-sm transition-all duration-300"
                          style={{
                            width: `${
                              (assignedPermissions.length / totalPermissions) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1 max-h-32 overflow-y-auto">
                      {assignedPermissions.length > 0 ? (
                        assignedPermissions.map((permission, index) => (
                          <div
                            key={index}
                            className="text-sm text-[#4a6f73] bg-green-50 px-2 py-1 rounded-sm"
                          >
                            ✓ {permission.displayName}
                          </div>
                        ))
                      ) : (
                        <div className="text-sm text-gray-400 italic">
                          No permissions assigned
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
