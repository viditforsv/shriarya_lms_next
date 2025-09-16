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
import {
  Users,
  BookOpen,
  BarChart3,
  Settings,
  Shield,
  FileText,
  Layout,
  Palette,
  Database,
  Mail,
  Lock,
  Zap,
  HelpCircle,
  Download,
  Plus,
} from "lucide-react";
import Link from "next/link";

export default function SiteAdministrationPage() {
  const { profile } = useAuth();

  const adminSections = [
    {
      title: "Users & Access",
      icon: Users,
      color: "bg-blue-50 border-blue-200",
      iconColor: "text-blue-600",
      items: [
        {
          name: "User Management",
          href: "/admin/users",
          icon: Users,
          description: "Manage students and administrators",
        },
        {
          name: "Role Assignment Matrix",
          href: "/admin/role-assignment-matrix",
          icon: Shield,
          description: "Configure user roles and permissions",
        },
        {
          name: "Authentication",
          href: "/admin/auth",
          icon: Lock,
          description: "Manage login methods and security",
        },
        {
          name: "User Import/Export",
          href: "/admin/users/import",
          icon: Download,
          description: "Bulk user operations",
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
          name: "Course Management",
          href: "/dashboard/courses/manage",
          icon: BookOpen,
          description: "Create and manage courses",
        },
        {
          name: "Course Templates",
          href: "/templates/course-templates",
          icon: FileText,
          description: "Course design templates",
        },
        {
          name: "Enrollment Management",
          href: "/admin/enrollments",
          icon: Users,
          description: "Manage student enrollments",
        },
        {
          name: "Course Categories",
          href: "/admin/categories",
          icon: Layout,
          description: "Organize course structure",
        },
      ],
    },
    {
      title: "Analytics & Reports",
      icon: BarChart3,
      color: "bg-purple-50 border-purple-200",
      iconColor: "text-purple-600",
      items: [
        {
          name: "Analytics Dashboard",
          href: "/admin/analytics",
          icon: BarChart3,
          description: "Platform performance metrics",
        },
        {
          name: "User Reports",
          href: "/admin/reports/users",
          icon: Users,
          description: "Student and admin activity reports",
        },
        {
          name: "Course Reports",
          href: "/admin/reports/courses",
          icon: BookOpen,
          description: "Course performance analytics",
        },
        {
          name: "Revenue Analytics",
          href: "/admin/reports/revenue",
          icon: BarChart3,
          description: "Financial performance tracking",
        },
      ],
    },
    {
      title: "Templates & Design",
      icon: Palette,
      color: "bg-orange-50 border-orange-200",
      iconColor: "text-orange-600",
      items: [
        {
          name: "Page Templates",
          href: "/templates/page-templates",
          icon: Layout,
          description: "Landing page and UI templates",
        },
        {
          name: "Dashboard Templates",
          href: "/templates/dashboard-templates",
          icon: BarChart3,
          description: "Admin and user dashboard designs",
        },
        {
          name: "Course Templates",
          href: "/templates/course-templates",
          icon: BookOpen,
          description: "Course structure templates",
        },
        {
          name: "Component Library",
          href: "/components-demo",
          icon: Palette,
          description: "UI component showcase",
        },
      ],
    },
    {
      title: "System Settings",
      icon: Settings,
      color: "bg-gray-50 border-gray-200",
      iconColor: "text-gray-600",
      items: [
        {
          name: "General Settings",
          href: "/admin/settings/general",
          icon: Settings,
          description: "Platform configuration",
        },
        {
          name: "Email Settings",
          href: "/admin/settings/email",
          icon: Mail,
          description: "Email notifications and templates",
        },
        {
          name: "Security Settings",
          href: "/admin/settings/security",
          icon: Shield,
          description: "Security and privacy settings",
        },
        {
          name: "Backup & Restore",
          href: "/admin/settings/backup",
          icon: Database,
          description: "Data backup and recovery",
        },
      ],
    },
    {
      title: "Support & Maintenance",
      icon: HelpCircle,
      color: "bg-red-50 border-red-200",
      iconColor: "text-red-600",
      items: [
        {
          name: "Helpdesk",
          href: "/helpdesk",
          icon: HelpCircle,
          description: "Support ticket management",
        },
        {
          name: "System Health",
          href: "/admin/health",
          icon: Zap,
          description: "Platform health monitoring",
        },
        {
          name: "Logs & Debugging",
          href: "/admin/logs",
          icon: FileText,
          description: "System logs and debugging",
        },
        {
          name: "Maintenance Mode",
          href: "/admin/maintenance",
          icon: Settings,
          description: "Platform maintenance controls",
        },
      ],
    },
  ];

  return (
    <AdminOnly>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Users className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Total Users</p>
                    <p className="text-2xl font-bold">1,247</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <BookOpen className="w-8 h-8 text-green-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Active Courses
                    </p>
                    <p className="text-2xl font-bold">89</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <BarChart3 className="w-8 h-8 text-purple-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Revenue</p>
                    <p className="text-2xl font-bold">$45.2K</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Zap className="w-8 h-8 text-orange-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      System Health
                    </p>
                    <p className="text-2xl font-bold text-green-600">98%</p>
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

          {/* Quick Actions */}
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Frequently used administrative tasks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New User
                  </Button>
                  <Button variant="outline" size="sm">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Create Course
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export Data
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4 mr-2" />
                    System Settings
                  </Button>
                  <Button variant="outline" size="sm">
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Support Tickets
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminOnly>
  );
}
