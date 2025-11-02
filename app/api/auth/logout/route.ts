import { NextRequest, NextResponse } from 'next/server';
import { clearAuthCookies } from '@/lib/auth';

// POST /api/auth/logout - Logout user
export async function POST(request: NextRequest) {
  try {
    // Clear auth cookies
    await clearAuthCookies();

    return NextResponse.json({
      message: 'Logout successful',
    });
  } catch (error) {
    console.error('Error logging out:', error);
    return NextResponse.json(
      { message: 'Failed to logout' },
      { status: 500 }
    );
  }
}
