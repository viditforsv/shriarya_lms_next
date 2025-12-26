import { NextRequest, NextResponse } from "next/server";
import { createSupabaseApiClient } from "@/lib/supabase/api-client";

// GET /api/rbac/role-permissions - Get role-permission assignments (simplified)
export async function GET() {
  try {
    // Use service role key to bypass RLS
    const supabase = createSupabaseApiClient();

    // Get roles with their permissions from JSONB field
    const { data: roles, error: rolesError } = await supabase
      .from("roles")
      .select("id, name, display_name, permissions");

    if (rolesError) {
      console.error("Error fetching roles:", rolesError);
      return NextResponse.json(
        { error: "Failed to fetch roles" },
        { status: 500 }
      );
    }

    // Get all permissions
    const { data: permissions, error: permissionsError } = await supabase
      .from("permissions")
      .select("id, name, display_name, category");

    if (permissionsError) {
      console.error("Error fetching permissions:", permissionsError);
      return NextResponse.json(
        { error: "Failed to fetch permissions" },
        { status: 500 }
      );
    }

    // Transform data into a matrix format
    const matrix: { [permissionId: string]: { [roleId: string]: boolean } } =
      {};

    permissions.forEach((permission) => {
      matrix[permission.id] = {};
      roles.forEach((role) => {
        const rolePermissions = role.permissions || [];
        matrix[permission.id][role.id] = rolePermissions.includes(
          permission.name
        );
      });
    });

    return NextResponse.json({ matrix });
  } catch (error) {
    console.error("Error in role-permissions API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/rbac/role-permissions - Update role-permission assignments (simplified)
export async function POST(request: NextRequest) {
  try {
    // Use service role key to bypass RLS
    const supabase = createSupabaseApiClient();
    const { roleId, permissionId, granted } = await request.json();

    // Get current role data
    const { data: role, error: roleError } = await supabase
      .from("roles")
      .select("id, name, permissions")
      .eq("id", roleId)
      .single();

    if (roleError) {
      console.error("Error fetching role:", roleError);
      return NextResponse.json(
        { error: "Failed to fetch role" },
        { status: 500 }
      );
    }

    // Get permission name
    const { data: permission, error: permissionError } = await supabase
      .from("permissions")
      .select("name")
      .eq("id", permissionId)
      .single();

    if (permissionError) {
      console.error("Error fetching permission:", permissionError);
      return NextResponse.json(
        { error: "Failed to fetch permission" },
        { status: 500 }
      );
    }

    // Update permissions array
    const currentPermissions = role.permissions || [];
    let newPermissions;

    if (granted) {
      // Add permission if not already present
      if (!currentPermissions.includes(permission.name)) {
        newPermissions = [...currentPermissions, permission.name];
      } else {
        newPermissions = currentPermissions; // No change needed
      }
    } else {
      // Remove permission
      newPermissions = currentPermissions.filter(
        (p: string) => p !== permission.name
      );
    }

    // Update role with new permissions
    const { error: updateError } = await supabase
      .from("roles")
      .update({ permissions: newPermissions })
      .eq("id", roleId);

    if (updateError) {
      console.error("Error updating role permissions:", updateError);
      return NextResponse.json(
        { error: "Failed to update role permissions" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in role-permissions update API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
