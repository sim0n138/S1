import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createMeditationSchema } from '@/lib/validations';
import { ZodError } from 'zod';

// GET /api/meditation - Get all meditations
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    const where: any = {};
    if (category) where.category = category;

    const meditations = await prisma.meditation.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(meditations);
  } catch (error) {
    console.error('Error fetching meditations:', error);
    return NextResponse.json(
      { message: 'Failed to fetch meditations' },
      { status: 500 }
    );
  }
}

// POST /api/meditation - Create a new meditation
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = createMeditationSchema.parse(body);

    const meditation = await prisma.meditation.create({
      data: validatedData,
    });

    return NextResponse.json(meditation, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { message: 'Validation error', errors: error.errors },
        { status: 400 }
      );
    }

    console.error('Error creating meditation:', error);
    return NextResponse.json(
      { message: 'Failed to create meditation' },
      { status: 500 }
    );
  }
}
