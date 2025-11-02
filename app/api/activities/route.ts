import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { createActivitySchema } from '@/lib/validations';
import { ZodError } from 'zod';

// GET /api/activities - Get user's activities
export async function GET(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { message: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');

    const activities = await prisma.userActivity.findMany({
      where: { userId: currentUser.userId },
      include: {
        workout: { select: { title: true, type: true, thumbnailUrl: true } },
        stretching: { select: { title: true, type: true, thumbnailUrl: true } },
        meditation: { select: { title: true, category: true, thumbnailUrl: true } },
      },
      orderBy: { completedAt: 'desc' },
      take: limit,
    });

    return NextResponse.json(activities);
  } catch (error) {
    console.error('Error fetching activities:', error);
    return NextResponse.json(
      { message: 'Failed to fetch activities' },
      { status: 500 }
    );
  }
}

// POST /api/activities - Log a new activity
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
    const validatedData = createActivitySchema.parse(body);

    const activity = await prisma.userActivity.create({
      data: {
        userId: currentUser.userId,
        ...validatedData,
      },
      include: {
        workout: true,
        stretching: true,
        meditation: true,
      },
    });

    return NextResponse.json(activity, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { message: 'Validation error', errors: error.errors },
        { status: 400 }
      );
    }

    console.error('Error creating activity:', error);
    return NextResponse.json(
      { message: 'Failed to create activity' },
      { status: 500 }
    );
  }
}
