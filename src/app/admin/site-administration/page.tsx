"use client";

import { useAuth } from "@/contexts/AuthContext";
import { AdminOnly } from "@/app/components-demo/ui/form-components/RoleGuard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components-demo/ui/ui-components/card";
import { Button } from "@/app/components-demo/ui/ui-components/button";
import { Badge } from "@/app/components-demo/ui/ui-components/badge";
import { Breadcrumb } from "@/app/components-demo/ui/breadcrumb";
import {
  Users,
  BookOpen,
  Shield,
  FileText,
  Layout,
  Palette,
  Plus,
  BarChart3,
  UserCheck,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SiteAdministrationPage() {
  const { profile } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeCourses: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/admin/stats");
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const adminSections = [
    {
      title: "Dashboard & Analytics",
      icon: BarChart3,
      color: "bg-orange-50 border-orange-200",
      iconColor: "text-orange-600",
      items: [
        {
          name: "Admin Dashboard",
          href: "/admin",
          icon: BarChart3,
          description: "Overview of platform analytics and metrics",
        },
        {
          name: "Student Progress Dashboard",
          href: "/admin/student-progress",
          icon: Users,
          description: "Monitor student performance and tag mastery",
        },
      ],
    },
    {
      title: "Users & Access",
      icon: Users,
      color: "bg-blue-50 border-blue-200",
      iconColor: "text-blue-600",
      items: [
        {
          name: "Role Assignment Matrix",
          href: "/admin/role-assignment-matrix",
          icon: Shield,
          description: "Configure user roles and permissions",
        },
        {
          name: "Enrollment Management",
          href: "/admin/user-enrollments",
          icon: Users,
          description: "Manage student enrollments",
        },
        {
          name: "Student-Teacher Assignment",
          href: "/admin/student-teacher-assignment",
          icon: UserCheck,
          description:
            "Assign teachers to students for personalized instruction",
        },
        {
          name: "Teacher Management",
          href: "/admin/teacher-management",
          icon: UserCheck,
          description: "Promote users to teacher role for grading",
        },
      ],
    },
    {
      title: "Course Management",
      icon: BookOpen,
      color: "bg-green-50 border-green-200",
      iconColor: "text-green-600",
      items: [
        {
          name: "Course Creator",
          href: "/admin/course-creator",
          icon: Plus,
          description: "Create and manage courses",
        },
        {
          name: "Course Templates",
          href: "/admin/course-templates",
          icon: FileText,
          description: "Course design templates",
        },
        {
          name: "Lesson Mapper",
          href: "/admin/lesson-mapper",
          icon: Layout,
          description: "Map and organize course lessons",
        },
        {
          name: "Lesson Content Editor",
          href: "/admin/lesson-editor",
          icon: FileText,
          description: "Edit lesson concepts and formulas",
        },
      ],
    },
    {
      title: "Content Management",
      icon: FileText,
      color: "bg-purple-50 border-purple-200",
      iconColor: "text-purple-600",
      items: [
        {
          name: "Question Bank",
          href: "/question-bank",
          icon: FileText,
          description: "Manage question bank and questions",
        },
        {
          name: "Question Assignments",
          href: "/admin/question-assignments",
          icon: Shield,
          description: "Assign questions to content managers",
        },
        {
          name: "Question Types",
          href: "/admin/question-types",
          icon: FileText,
          description: "Manage question types and categories",
        },
      ],
    },
    {
      title: "Development & Testing",
      icon: Palette,
      color: "bg-orange-50 border-orange-200",
      iconColor: "text-orange-600",
      items: [
        {
          name: "Component Library",
          href: "/components-demo",
          icon: Palette,
          description: "UI component showcase",
        },
        {
          name: "Math Renderer Training",
          href: "/math-test",
          icon: FileText,
          description: "Test and train math content rendering",
        },
      ],
    },
  ];

  return (
    <AdminOnly>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumbs */}
          <div className="mb-6">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Site Administration", isActive: true },
              ]}
            />
          </div>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Site Administration
                </h1>
                <p className="text-muted-foreground mt-2">
                  Welcome back, {profile?.full_name || "Administrator"}. Manage
                  your platform settings and configurations.
                </p>
              </div>
              <Badge variant="secondary" className="text-sm">
                Admin Access
              </Badge>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Users className="w-8 h-8 text-orange-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Total Users</p>
                    <p className="text-2xl font-bold">
                      {loading ? "..." : stats.totalUsers.toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <BookOpen className="w-8 h-8 text-orange-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Active Courses
                    </p>
                    <p className="text-2xl font-bold">
                      {loading ? "..." : stats.activeCourses.toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Administration Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {adminSections.map((section) => (
              <Card key={section.title} className={`${section.color} border-2`}>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <section.icon className={`w-6 h-6 ${section.iconColor}`} />
                    <CardTitle className="text-xl">{section.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {section.items.map((item) => (
                      <Link key={item.name} href={item.href}>
                        <Button
                          variant="outline"
                          className="w-full justify-start h-auto p-3 hover:bg-white/50"
                        >
                          <div className="flex items-center space-x-3 w-full">
                            <item.icon className="w-5 h-5 text-muted-foreground" />
                            <div className="text-left">
                              <div className="font-medium">{item.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {item.description}
                              </div>
                            </div>
                          </div>
                        </Button>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AdminOnly>
  );
}
