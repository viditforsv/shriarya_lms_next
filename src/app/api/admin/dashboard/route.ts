import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();

    // Check if user is authenticated and is admin
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user profile to check role
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profileError || !profile || profile.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Fetch basic stats
    const { count: totalUsers } = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true });

    const { count: activeCourses } = await supabase
      .from("courses")
      .select("*", { count: "exact", head: true })
      .eq("status", "published");

    const { count: totalEnrollments } = await supabase
      .from("enrollments")
      .select("*", { count: "exact", head: true });

    // Fetch monthly revenue (from payments table if it exists)
    const { data: payments } = await supabase
      .from("payments")
      .select("amount, created_at")
      .gte(
        "created_at",
        new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          1
        ).toISOString()
      )
      .eq("status", "completed");

    const monthlyRevenue =
      payments?.reduce((sum, payment) => sum + (payment.amount || 0), 0) || 0;

    // Generate sample data for charts (in a real app, you'd query actual data)
    const userGrowth = [
      { month: "Jan", users: 45, enrollments: 32 },
      { month: "Feb", users: 52, enrollments: 38 },
      { month: "Mar", users: 48, enrollments: 42 },
      { month: "Apr", users: 61, enrollments: 55 },
      { month: "May", users: 55, enrollments: 48 },
      { month: "Jun", users: 67, enrollments: 62 },
    ];

    const coursePerformance = [
      { course: "IBDP Math", enrollments: 156, completionRate: 78 },
      { course: "CBSE Physics", enrollments: 142, completionRate: 82 },
      { course: "ICSE Chemistry", enrollments: 128, completionRate: 75 },
      { course: "IGCSE Biology", enrollments: 134, completionRate: 80 },
      { course: "Advanced Math", enrollments: 98, completionRate: 85 },
    ];

    const userActivity = [
      { day: "Mon", activeUsers: 45, sessions: 67 },
      { day: "Tue", activeUsers: 52, sessions: 78 },
      { day: "Wed", activeUsers: 48, sessions: 72 },
      { day: "Thu", activeUsers: 61, sessions: 89 },
      { day: "Fri", activeUsers: 55, sessions: 82 },
      { day: "Sat", activeUsers: 38, sessions: 56 },
      { day: "Sun", activeUsers: 42, sessions: 63 },
    ];

    const revenueData = [
      { month: "Jan", revenue: 45000, payments: 23 },
      { month: "Feb", revenue: 52000, payments: 28 },
      { month: "Mar", revenue: 48000, payments: 25 },
      { month: "Apr", revenue: 61000, payments: 32 },
      { month: "May", revenue: 55000, payments: 29 },
      { month: "Jun", revenue: 67000, payments: 35 },
    ];

    return NextResponse.json({
      totalUsers: totalUsers || 0,
      activeCourses: activeCourses || 0,
      totalEnrollments: totalEnrollments || 0,
      monthlyRevenue,
      userGrowth,
      coursePerformance,
      userActivity,
      revenueData,
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}
