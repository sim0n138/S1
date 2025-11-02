import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/stretching/[id] - Get a single stretching session
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const session = await prisma.stretchingSession.findUnique({
      where: { id },
    });

    if (!session) {
      return NextResponse.json(
        { message: 'Stretching session not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(session);
  } catch (error) {
    console.error('Error fetching stretching session:', error);
    return NextResponse.json(
      { message: 'Failed to fetch stretching session' },
      { status: 500 }
    );
  }
}
