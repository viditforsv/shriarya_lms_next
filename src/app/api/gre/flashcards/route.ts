import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseApiClient } from '@/lib/supabase/api-client';
import { createClient } from '@/lib/supabase/server';
import { FlashcardData } from '@/stores/useTestStore';

/**
 * GET /api/gre/flashcards
 * Fetch user's flashcard progress
 */
export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      // Return empty object for unauthenticated users (progress stored in localStorage)
      return NextResponse.json({ flashcards: {} });
    }

    const apiClient = createSupabaseApiClient();
    const { data: flashcards, error } = await apiClient
      .from('gre_user_flashcards')
      .select('question_id, mastery_level, last_reviewed, next_review, review_count')
      .eq('user_id', user.id);

    if (error) {
      console.error('Error fetching flashcards:', error);
      return NextResponse.json(
        { error: 'Failed to fetch flashcard progress' },
        { status: 500 }
      );
    }

    const flashcardsMap: Record<string, FlashcardData> = {};
    (flashcards || []).forEach(flashcard => {
      flashcardsMap[flashcard.question_id] = {
        masteryLevel: flashcard.mastery_level,
        lastReviewed: new Date(flashcard.last_reviewed).getTime(),
        nextReview: new Date(flashcard.next_review).getTime(),
        reviewCount: flashcard.review_count
      };
    });

    return NextResponse.json({ flashcards: flashcardsMap });
  } catch (error) {
    console.error('Error in GET /api/gre/flashcards:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/gre/flashcards
 * Update flashcard progress
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      // For unauthenticated users, progress is stored in localStorage only
      return NextResponse.json({ success: true, message: 'Progress saved locally' });
    }

    const body = await request.json();
    const { questionId, flashcardData } = body;

    if (!questionId || !flashcardData) {
      return NextResponse.json(
        { error: 'questionId and flashcardData are required' },
        { status: 400 }
      );
    }

    const apiClient = createSupabaseApiClient();

    const { error } = await apiClient
      .from('gre_user_flashcards')
      .upsert({
        user_id: user.id,
        question_id: questionId,
        mastery_level: flashcardData.masteryLevel,
        last_reviewed: new Date(flashcardData.lastReviewed).toISOString(),
        next_review: new Date(flashcardData.nextReview).toISOString(),
        review_count: flashcardData.reviewCount
      }, {
        onConflict: 'user_id,question_id'
      });

    if (error) {
      console.error('Error updating flashcard:', error);
      return NextResponse.json(
        { error: 'Failed to update flashcard progress' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in POST /api/gre/flashcards:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

