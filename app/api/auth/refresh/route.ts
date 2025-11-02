import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { verifyRefreshToken, generateAccessToken, generateRefreshToken, setAuthCookies } from '@/lib/auth';

// POST /api/auth/refresh - Refresh access token
export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { message: 'No refresh token provided' },
        { status: 401 }
      );
    }

    // Verify refresh token
    const payload = verifyRefreshToken(refreshToken);

    if (!payload) {
      return NextResponse.json(
        { message: 'Invalid or expired refresh token' },
        { status: 401 }
      );
    }

    // Verify user still exists
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    // Generate new tokens
    const newAccessToken = generateAccessToken({
      userId: user.id,
      email: user.email,
    });

    const newRefreshToken = generateRefreshToken({
      userId: user.id,
      email: user.email,
    });

    // Set new cookies
    await setAuthCookies(newAccessToken, newRefreshToken);

    return NextResponse.json({
      message: 'Token refreshed successfully',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error('Error refreshing token:', error);
    return NextResponse.json(
      { message: 'Failed to refresh token' },
      { status: 500 }
    );
  }
}
