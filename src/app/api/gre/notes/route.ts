import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseApiClient } from '@/lib/supabase/api-client';
import { createClient } from '@/lib/supabase/server';

/**
 * GET /api/gre/notes
 * Fetch user's notes for questions
 */
export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      // Return empty object for unauthenticated users (notes stored in localStorage)
      return NextResponse.json({ notes: {} });
    }

    const apiClient = createSupabaseApiClient();
    const { data: notes, error } = await apiClient
      .from('gre_user_notes')
      .select('question_id, note_text')
      .eq('user_id', user.id);

    if (error) {
      console.error('Error fetching notes:', error);
      return NextResponse.json(
        { error: 'Failed to fetch notes' },
        { status: 500 }
      );
    }

    const notesMap: Record<string, string> = {};
    (notes || []).forEach(note => {
      notesMap[note.question_id] = note.note_text;
    });

    return NextResponse.json({ notes: notesMap });
  } catch (error) {
    console.error('Error in GET /api/gre/notes:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/gre/notes
 * Save or update a note
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      // For unauthenticated users, notes are stored in localStorage only
      return NextResponse.json({ success: true, message: 'Note saved locally' });
    }

    const body = await request.json();
    const { questionId, noteText } = body;

    if (!questionId) {
      return NextResponse.json(
        { error: 'questionId is required' },
        { status: 400 }
      );
    }

    const apiClient = createSupabaseApiClient();

    if (noteText && noteText.trim()) {
      // Save or update note
      const { error } = await apiClient
        .from('gre_user_notes')
        .upsert({
          user_id: user.id,
          question_id: questionId,
          note_text: noteText.trim()
        }, {
          onConflict: 'user_id,question_id'
        });

      if (error) {
        console.error('Error saving note:', error);
        return NextResponse.json(
          { error: 'Failed to save note' },
          { status: 500 }
        );
      }
    } else {
      // Delete note if empty
      const { error } = await apiClient
        .from('gre_user_notes')
        .delete()
        .eq('user_id', user.id)
        .eq('question_id', questionId);

      if (error) {
        console.error('Error deleting note:', error);
        return NextResponse.json(
          { error: 'Failed to delete note' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in POST /api/gre/notes:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

