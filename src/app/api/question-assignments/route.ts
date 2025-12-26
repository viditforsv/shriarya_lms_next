import { NextRequest, NextResponse } from "next/server";
import { createSupabaseApiClient } from "@/lib/supabase/api-client";

// GET /api/question-assignments - Get assignments for a user or question
export async function GET(request: NextRequest) {
  try {
    const supabase = createSupabaseApiClient();

    const { searchParams } = new URL(request.url);
    const assignedTo = searchParams.get("assigned_to");
    const questionId = searchParams.get("question_id");
    const status = searchParams.get("status");
    const assignmentType = searchParams.get("assignment_type");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    // Handle "me" parameter - get current user's ID
    let userId = assignedTo;
    if (assignedTo === "me") {
      // Get current user from Authorization header
      const authHeader = request.headers.get("authorization");
      if (authHeader) {
        const token = authHeader.replace("Bearer ", "");
        const {
          data: { user },
        } = await supabase.auth.getUser(token);
        if (user) {
          userId = user.id;
        }
      }
    }

    let query = supabase
      .from("question_assignments")
      .select("*", { count: "exact" });

    // Apply filters
    if (userId) {
      query = query.eq("assigned_to", userId);
    }
    if (questionId) {
      query = query.eq("question_id", questionId);
    }
    if (status) {
      query = query.eq("status", status);
    }
    if (assignmentType) {
      query = query.eq("assignment_type", assignmentType);
    }

    // Apply pagination
    const offset = (page - 1) * limit;
    query = query.range(offset, offset + limit - 1);

    const { data: assignments, error, count } = await query;

    if (error) {
      console.error("Error fetching assignments:", error);
      return NextResponse.json(
        { error: "Failed to fetch assignments" },
        { status: 500 }
      );
    }

    // Enrich assignments with related data
    const enrichedAssignments = await Promise.all(
      (assignments || []).map(async (assignment) => {
        // Get question details
        const { data: question } = await supabase
          .from("question_bank")
          .select("id, question_text, difficulty, subject, topic, grade, board")
          .eq("id", assignment.question_id)
          .single();

        // Get assigned to user details
        const { data: assignedToProfile } = await supabase
          .from("profiles")
          .select("id, full_name, email, role")
          .eq("id", assignment.assigned_to)
          .single();

        // Get assigned by user details
        const { data: assignedByProfile } = await supabase
          .from("profiles")
          .select("id, full_name, email, role")
          .eq("id", assignment.assigned_by)
          .single();

        return {
          ...assignment,
          question_bank: question,
          assigned_to_profile: assignedToProfile,
          assigned_by_profile: assignedByProfile,
        };
      })
    );

    return NextResponse.json({
      assignments: enrichedAssignments,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    });
  } catch (error) {
    console.error("Error in GET /api/question-assignments:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/question-assignments - Create a new assignment
export async function POST(request: NextRequest) {
  try {
    const supabase = createSupabaseApiClient();

    const body = await request.json();
    const {
      question_id,
      assigned_to,
      assignment_type = "edit",
      priority = "medium",
      due_date,
      notes,
    } = body;

    // Validate required fields
    if (!question_id || !assigned_to) {
      return NextResponse.json(
        { error: "question_id and assigned_to are required" },
        { status: 400 }
      );
    }

    // Check if assignment already exists
    const { data: existingAssignment } = await supabase
      .from("question_assignments")
      .select("id")
      .eq("question_id", question_id)
      .eq("assigned_to", assigned_to)
      .eq("assignment_type", assignment_type)
      .single();

    if (existingAssignment) {
      return NextResponse.json(
        { error: "Assignment already exists for this user and question" },
        { status: 409 }
      );
    }

    // Create the assignment
    const { data: assignment, error } = await supabase
      .from("question_assignments")
      .insert({
        question_id,
        assigned_to,
        assigned_by: assigned_to, // For now, self-assigned. In real app, get from auth
        assignment_type,
        priority,
        due_date,
        notes,
        status: "assigned",
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating assignment:", error);
      return NextResponse.json(
        { error: "Failed to create assignment" },
        { status: 500 }
      );
    }

    return NextResponse.json(assignment, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/question-assignments:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT /api/question-assignments - Update assignment status
export async function PUT(request: NextRequest) {
  try {
    const supabase = createSupabaseApiClient();

    const body = await request.json();
    const { id, status, notes } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: "id and status are required" },
        { status: 400 }
      );
    }

    const updateData: { status: string; notes?: string } = { status };
    if (notes) {
      updateData.notes = notes;
    }

    const { data: assignment, error } = await supabase
      .from("question_assignments")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating assignment:", error);
      return NextResponse.json(
        { error: "Failed to update assignment" },
        { status: 500 }
      );
    }

    return NextResponse.json(assignment);
  } catch (error) {
    console.error("Error in PUT /api/question-assignments:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/question-assignments - Delete an assignment
export async function DELETE(request: NextRequest) {
  try {
    const supabase = createSupabaseApiClient();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    const { error } = await supabase
      .from("question_assignments")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting assignment:", error);
      return NextResponse.json(
        { error: "Failed to delete assignment" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in DELETE /api/question-assignments:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
