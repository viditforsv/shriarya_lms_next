import { NextResponse } from 'next/server';
import { mockGRETest } from '@/lib/mock-gre-data';

/**
 * GET /api/gre
 * Returns GRE test data for study and test modes
 */
export async function GET() {
  try {
    return NextResponse.json({
      test: mockGRETest,
      success: true,
    });
  } catch (error) {
    console.error('Error in GET /api/gre:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GRE test data' },
      { status: 500 }
    );
  }
}

