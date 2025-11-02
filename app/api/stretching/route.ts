import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createStretchingSchema } from '@/lib/validations';
import { ZodError } from 'zod';

// GET /api/stretching - Get all stretching sessions
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const type = searchParams.get('type');
    const level = searchParams.get('level');

    const where: any = {};
    if (type) where.type = type;
    if (level) where.level = level;

    const sessions = await prisma.stretchingSession.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(sessions);
  } catch (error) {
    console.error('Error fetching stretching sessions:', error);
    return NextResponse.json(
      { message: 'Failed to fetch stretching sessions' },
      { status: 500 }
    );
  }
}

// POST /api/stretching - Create a new stretching session
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = createStretchingSchema.parse(body);

    const session = await prisma.stretchingSession.create({
      data: validatedData,
    });

    return NextResponse.json(session, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { message: 'Validation error', errors: error.errors },
        { status: 400 }
      );
    }

    console.error('Error creating stretching session:', error);
    return NextResponse.json(
      { message: 'Failed to create stretching session' },
      { status: 500 }
    );
  }
}
