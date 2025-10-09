import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// GET /api/rbac/permissions - Get all permissions grouped by category
export async function GET() {
  try {
    // Use service role key to bypass RLS
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

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

    // Get permissions and categories separately, then group them
    const { data: permissions, error: permissionsError } = await supabase
      .from("permissions")
      .select("id, name, display_name, description, category")
      .eq("is_active", true)
      .order("display_name");

    if (permissionsError) {
      console.error("Error fetching permissions:", permissionsError);
      return NextResponse.json(
        { error: "Failed to fetch permissions" },
        { status: 500 }
      );
    }

    const { data: categories, error: categoriesError } = await supabase
      .from("permission_categories")
      .select("name, display_name, description, icon, display_order")
      .eq("is_active", true)
      .order("display_order");

    if (categoriesError) {
      console.error("Error fetching categories:", categoriesError);
      return NextResponse.json(
        { error: "Failed to fetch categories" },
        { status: 500 }
      );
    }

    // Group permissions by category
    const groupedPermissions = permissions.reduce(
      (
        acc: Record<
          string,
          {
            id: string;
            name: string;
            permissions: unknown[];
            icon: string;
            description: string;
            displayOrder: number;
            tasks: unknown[];
          }
        >,
        permission
      ) => {
        const categoryName = permission.category;
        const category = categories.find((cat) => cat.name === categoryName);

        if (!acc[categoryName]) {
          acc[categoryName] = {
            id: categoryName,
            name: category?.display_name || categoryName,
            permissions: [],
            icon: category?.icon || "📋",
            description: category?.description || `${categoryName} permissions`,
            displayOrder: category?.display_order || 999,
            tasks: [],
          };
        }
        acc[categoryName].tasks.push({
          id: permission.id,
          name: permission.name,
          displayName: permission.display_name,
          description: permission.description,
        });
        return acc;
      },
      {}
    );

    return NextResponse.json({
      permissions: Object.values(groupedPermissions).sort(
        (a: { displayOrder: number }, b: { displayOrder: number }) =>
          a.displayOrder - b.displayOrder
      ),
    });
  } catch (error) {
    console.error("Error in permissions API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
