import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseApiClient } from '@/lib/supabase/api-client';
import { createClient } from '@/lib/supabase/server';

/**
 * GET /api/gre/bookmarks
 * Fetch user's bookmarked questions
 */
export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      // Return empty array for unauthenticated users (bookmarks stored in localStorage)
      return NextResponse.json({ bookmarks: [] });
    }

    const apiClient = createSupabaseApiClient();
    const { data: bookmarks, error } = await apiClient
      .from('gre_user_bookmarks')
      .select('question_id')
      .eq('user_id', user.id);

    if (error) {
      console.error('Error fetching bookmarks:', error);
      return NextResponse.json(
        { error: 'Failed to fetch bookmarks' },
        { status: 500 }
      );
    }

    const questionIds = (bookmarks || []).map(b => b.question_id);
    return NextResponse.json({ bookmarks: questionIds });
  } catch (error) {
    console.error('Error in GET /api/gre/bookmarks:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/gre/bookmarks
 * Add or remove a bookmark
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      // For unauthenticated users, bookmarks are stored in localStorage only
      return NextResponse.json({ success: true, message: 'Bookmark saved locally' });
    }

    const body = await request.json();
    const { questionId, isBookmarked } = body;

    if (!questionId) {
      return NextResponse.json(
        { error: 'questionId is required' },
        { status: 400 }
      );
    }

    const apiClient = createSupabaseApiClient();

    if (isBookmarked) {
      // Add bookmark
      const { error } = await apiClient
        .from('gre_user_bookmarks')
        .upsert({
          user_id: user.id,
          question_id: questionId
        }, {
          onConflict: 'user_id,question_id'
        });

      if (error) {
        console.error('Error adding bookmark:', error);
        return NextResponse.json(
          { error: 'Failed to add bookmark' },
          { status: 500 }
        );
      }
    } else {
      // Remove bookmark
      const { error } = await apiClient
        .from('gre_user_bookmarks')
        .delete()
        .eq('user_id', user.id)
        .eq('question_id', questionId);

      if (error) {
        console.error('Error removing bookmark:', error);
        return NextResponse.json(
          { error: 'Failed to remove bookmark' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in POST /api/gre/bookmarks:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

