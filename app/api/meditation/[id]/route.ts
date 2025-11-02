import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/meditation/[id] - Get a single meditation
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const meditation = await prisma.meditation.findUnique({
      where: { id },
    });

    if (!meditation) {
      return NextResponse.json(
        { message: 'Meditation not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(meditation);
  } catch (error) {
    console.error('Error fetching meditation:', error);
    return NextResponse.json(
      { message: 'Failed to fetch meditation' },
      { status: 500 }
    );
  }
}
