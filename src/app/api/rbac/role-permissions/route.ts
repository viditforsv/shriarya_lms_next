import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// GET /api/rbac/role-permissions - Get role-permission assignments
export async function GET() {
  try {
    const supabase = await createClient();

    const { data: rolePermissions, error } = await supabase.from(
      "role_permissions"
    ).select(`
        role_id,
        permission_id,
        roles!inner(id, name, display_name),
        permissions!inner(id, name, display_name, category)
      `);

    if (error) {
      console.error("Error fetching role permissions:", error);
      return NextResponse.json(
        { error: "Failed to fetch role permissions" },
        { status: 500 }
      );
    }

    // Transform data into a matrix format
    const matrix: { [permissionId: string]: { [roleId: string]: boolean } } =
      {};

    rolePermissions.forEach((rp) => {
      const permissionId = rp.permission_id;
      const roleId = rp.role_id;

      if (!matrix[permissionId]) {
        matrix[permissionId] = {};
      }
      matrix[permissionId][roleId] = true;
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

// POST /api/rbac/role-permissions - Update role-permission assignments
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { roleId, permissionId, granted } = await request.json();

    if (granted) {
      // Grant permission
      const { error } = await supabase.from("role_permissions").upsert({
        role_id: roleId,
        permission_id: permissionId,
        granted_at: new Date().toISOString(),
      });

      if (error) {
        console.error("Error granting permission:", error);
        return NextResponse.json(
          { error: "Failed to grant permission" },
          { status: 500 }
        );
      }
    } else {
      // Revoke permission
      const { error } = await supabase
        .from("role_permissions")
        .delete()
        .eq("role_id", roleId)
        .eq("permission_id", permissionId);

      if (error) {
        console.error("Error revoking permission:", error);
        return NextResponse.json(
          { error: "Failed to revoke permission" },
          { status: 500 }
        );
      }
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
