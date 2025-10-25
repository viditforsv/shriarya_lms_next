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
  TrendingUp,
  DollarSign,
  Clock,
  Award,
  BarChart3,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

interface DashboardStats {
  totalUsers: number;
  activeCourses: number;
  totalEnrollments: number;
  monthlyRevenue: number;
  userGrowth: Array<{
    month: string;
    users: number;
    enrollments: number;
  }>;
  coursePerformance: Array<{
    course: string;
    enrollments: number;
    completionRate: number;
  }>;
  userActivity: Array<{
    day: string;
    activeUsers: number;
    sessions: number;
  }>;
  revenueData: Array<{
    month: string;
    revenue: number;
    payments: number;
  }>;
}

const COLORS = ["#e27447", "#f97316", "#fb923c", "#fdba74", "#fed7aa"];

export default function AdminDashboard() {
  const { profile } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    activeCourses: 0,
    totalEnrollments: 0,
    monthlyRevenue: 0,
    userGrowth: [],
    coursePerformance: [],
    userActivity: [],
    revenueData: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch("/api/admin/dashboard");
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const quickActions = [
    {
      title: "Course Management",
      description: "Create and manage courses",
      href: "/admin/course-creator",
      icon: BookOpen,
      color: "bg-green-50 border-green-200",
      iconColor: "text-green-600",
    },
    {
      title: "Student Progress",
      description: "Monitor student performance",
      href: "/admin/student-progress",
      icon: TrendingUp,
      color: "bg-blue-50 border-blue-200",
      iconColor: "text-blue-600",
    },
    {
      title: "User Management",
      description: "Manage users and roles",
      href: "/admin/role-assignment-matrix",
      icon: Users,
      color: "bg-purple-50 border-purple-200",
      iconColor: "text-purple-600",
    },
    {
      title: "Site Administration",
      description: "Platform settings",
      href: "/admin/site-administration",
      icon: Activity,
      color: "bg-orange-50 border-orange-200",
      iconColor: "text-orange-600",
    },
  ];

  if (loading) {
    return (
      <AdminOnly>
        <div className="min-h-screen bg-background">
          <div className="container mx-auto px-4 py-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded-sm w-1/3 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded-sm w-1/2 mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[...Array(4)].map((_, i) => (
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
                { label: "Dashboard", isActive: true },
              ]}
            />
          </div>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Admin Dashboard
                </h1>
                <p className="text-muted-foreground mt-2">
                  Welcome back, {profile?.full_name || "Administrator"}. Here's
                  your platform overview.
                </p>
              </div>
              <Badge variant="secondary" className="text-sm">
                Admin Access
              </Badge>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Users</p>
                    <p className="text-2xl font-bold">
                      {stats.totalUsers.toLocaleString()}
                    </p>
                    <div className="flex items-center mt-1">
                      <ArrowUpRight className="w-3 h-3 text-green-600" />
                      <span className="text-xs text-green-600 ml-1">+12%</span>
                    </div>
                  </div>
                  <Users className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Active Courses
                    </p>
                    <p className="text-2xl font-bold">
                      {stats.activeCourses.toLocaleString()}
                    </p>
                    <div className="flex items-center mt-1">
                      <ArrowUpRight className="w-3 h-3 text-green-600" />
                      <span className="text-xs text-green-600 ml-1">+8%</span>
                    </div>
                  </div>
                  <BookOpen className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Enrollments</p>
                    <p className="text-2xl font-bold">
                      {stats.totalEnrollments.toLocaleString()}
                    </p>
                    <div className="flex items-center mt-1">
                      <ArrowUpRight className="w-3 h-3 text-green-600" />
                      <span className="text-xs text-green-600 ml-1">+15%</span>
                    </div>
                  </div>
                  <Award className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Monthly Revenue
                    </p>
                    <p className="text-2xl font-bold">
                      ₹{stats.monthlyRevenue.toLocaleString()}
                    </p>
                    <div className="flex items-center mt-1">
                      <ArrowUpRight className="w-3 h-3 text-green-600" />
                      <span className="text-xs text-green-600 ml-1">+22%</span>
                    </div>
                  </div>
                  <DollarSign className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* User Growth Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  User Growth
                </CardTitle>
                <CardDescription>
                  Monthly user registrations and enrollments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={stats.userGrowth}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="users"
                      stackId="1"
                      stroke="#e27447"
                      fill="#e27447"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="enrollments"
                      stackId="1"
                      stroke="#f97316"
                      fill="#f97316"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Course Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Course Performance
                </CardTitle>
                <CardDescription>
                  Top courses by enrollments and completion rates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={stats.coursePerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="course" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="enrollments" fill="#e27447" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Additional Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* User Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  User Activity
                </CardTitle>
                <CardDescription>
                  Daily active users and sessions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={stats.userActivity}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="activeUsers"
                      stroke="#e27447"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="sessions"
                      stroke="#f97316"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Revenue Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Revenue Trends
                </CardTitle>
                <CardDescription>
                  Monthly revenue and payment trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={stats.revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`₹${value}`, "Revenue"]} />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#e27447"
                      fill="#e27447"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action) => (
                <Link key={action.title} href={action.href}>
                  <Card
                    className={`${action.color} border-2 hover:shadow-md transition-shadow cursor-pointer`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <action.icon
                          className={`w-6 h-6 ${action.iconColor}`}
                        />
                        <div>
                          <h3 className="font-semibold">{action.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {action.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminOnly>
  );
}
