import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createWorkoutSchema } from '@/lib/validations';
import { ZodError } from 'zod';

// GET /api/workouts - Get all workouts with filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const type = searchParams.get('type');
    const level = searchParams.get('level');
    const search = searchParams.get('search');

    const where: any = {};

    if (type) where.type = type;
    if (level) where.level = level;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const workouts = await prisma.workout.findMany({
      where,
      include: {
        exercises: {
          orderBy: { order: 'asc' },
        },
        _count: {
          select: { exercises: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(workouts);
  } catch (error) {
    console.error('Error fetching workouts:', error);
    return NextResponse.json(
      { message: 'Failed to fetch workouts' },
      { status: 500 }
    );
  }
}

// POST /api/workouts - Create a new workout
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validatedData = createWorkoutSchema.parse(body);

    const workout = await prisma.workout.create({
      data: validatedData,
      include: {
        exercises: true,
      },
    });

    return NextResponse.json(workout, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { message: 'Validation error', errors: error.errors },
        { status: 400 }
      );
    }

    console.error('Error creating workout:', error);
    return NextResponse.json(
      { message: 'Failed to create workout' },
      { status: 500 }
    );
  }
}
