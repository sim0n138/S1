import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { createProgressSchema } from '@/lib/validations';
import { ZodError } from 'zod';

// GET /api/progress - Get user's progress entries
export async function GET(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { message: 'Not authenticated' },
        { status: 401 }
      );
    }

    const progress = await prisma.userProgress.findMany({
      where: { userId: currentUser.userId },
      orderBy: { date: 'desc' },
    });

    return NextResponse.json(progress);
  } catch (error) {
    console.error('Error fetching progress:', error);
    return NextResponse.json(
      { message: 'Failed to fetch progress' },
      { status: 500 }
    );
  }
}

// POST /api/progress - Add a new progress entry
export async function POST(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { message: 'Not authenticated' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validatedData = createProgressSchema.parse(body);

    const progress = await prisma.userProgress.create({
      data: {
        userId: currentUser.userId,
        ...validatedData,
      },
    });

    return NextResponse.json(progress, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { message: 'Validation error', errors: error.errors },
        { status: 400 }
      );
    }

    console.error('Error creating progress:', error);
    return NextResponse.json(
      { message: 'Failed to create progress' },
      { status: 500 }
    );
  }
}
