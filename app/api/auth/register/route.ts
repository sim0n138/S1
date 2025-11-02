import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createUserSchema } from '@/lib/validations';
import { hashPassword, generateAccessToken, generateRefreshToken, setAuthCookies } from '@/lib/auth';
import { ZodError } from 'zod';

// POST /api/auth/register - Register a new user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validatedData = createUserSchema.parse(body);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const passwordHash = await hashPassword(validatedData.password);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        passwordHash,
        name: validatedData.name,
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });

    // Generate tokens
    const accessToken = generateAccessToken({
      userId: user.id,
      email: user.email,
    });

    const refreshToken = generateRefreshToken({
      userId: user.id,
      email: user.email,
    });

    // Set cookies
    await setAuthCookies(accessToken, refreshToken);

    return NextResponse.json(
      {
        message: 'User registered successfully',
        user,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { message: 'Validation error', errors: error.errors },
        { status: 400 }
      );
    }

    console.error('Error registering user:', error);
    return NextResponse.json(
      { message: 'Failed to register user' },
      { status: 500 }
    );
  }
}
