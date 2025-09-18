import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// GET /api/rbac/permissions - Get all permissions grouped by category
export async function GET() {
  try {
    const supabase = await createClient();

    // First check if the tables exist
    const { error: tableError } = await supabase
      .from("permissions")
      .select("id")
      .limit(1);

    if (tableError) {
      console.error("Table access error:", tableError);
      return NextResponse.json(
        {
          error: "RBAC access blocked by RLS policies",
          message: "Please fix the RLS circular dependency issue",
          details: tableError.message,
          instructions: [
            "1. Fix RLS circular dependency in Supabase dashboard",
            "2. Add sample data if needed through Supabase dashboard",
            "3. Migrate existing users through Supabase dashboard",
          ],
        },
        { status: 500 }
      );
    }

    const { data: permissions, error } = await supabase
      .from("permissions")
      .select(
        `
        id,
        name,
        display_name,
        description,
        category,
        permission_categories!inner(
          name,
          display_name,
          description,
          icon,
          display_order
        )
      `
      )
      .eq("is_active", true)
      .order("permission_categories(display_order)")
      .order("display_name");

    if (error) {
      console.error("Error fetching permissions:", error);
      return NextResponse.json(
        { error: "Failed to fetch permissions" },
        { status: 500 }
      );
    }

    // Group permissions by category
    const groupedPermissions = permissions.reduce((acc: Record<string, any>, permission) => {
      const category = permission.permission_categories[0]; // Get first category
      if (!acc[category.name]) {
        acc[category.name] = {
          id: category.name,
          name: category.display_name,
          icon: category.icon,
          description: category.description,
          displayOrder: category.display_order,
          tasks: [],
        };
      }
      acc[category.name].tasks.push({
        id: permission.id,
        name: permission.name,
        displayName: permission.display_name,
        description: permission.description,
      });
      return acc;
    }, {});

    return NextResponse.json({
      permissions: Object.values(groupedPermissions),
    });
  } catch (error) {
    console.error("Error in permissions API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
