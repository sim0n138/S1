import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { updateWorkoutSchema } from '@/lib/validations';
import { ZodError } from 'zod';

// GET /api/workouts/[id] - Get a single workout
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const workout = await prisma.workout.findUnique({
      where: { id },
      include: {
        exercises: {
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!workout) {
      return NextResponse.json(
        { message: 'Workout not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(workout);
  } catch (error) {
    console.error('Error fetching workout:', error);
    return NextResponse.json(
      { message: 'Failed to fetch workout' },
      { status: 500 }
    );
  }
}

// PUT /api/workouts/[id] - Update a workout
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const validatedData = updateWorkoutSchema.parse(body);

    const workout = await prisma.workout.update({
      where: { id },
      data: validatedData,
      include: {
        exercises: true,
      },
    });

    return NextResponse.json(workout);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { message: 'Validation error', errors: error.errors },
        { status: 400 }
      );
    }

    console.error('Error updating workout:', error);
    return NextResponse.json(
      { message: 'Failed to update workout' },
      { status: 500 }
    );
  }
}

// DELETE /api/workouts/[id] - Delete a workout
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.workout.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: 'Workout deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting workout:', error);
    return NextResponse.json(
      { message: 'Failed to delete workout' },
      { status: 500 }
    );
  }
}
