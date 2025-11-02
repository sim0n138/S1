import { z } from 'zod';

// User validations
export const createUserSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().optional(),
});

export const updateUserSchema = z.object({
  email: z.string().email('Invalid email address').optional(),
  name: z.string().optional(),
  password: z.string().min(8, 'Password must be at least 8 characters').optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

// UserProfile validations
export const createUserProfileSchema = z.object({
  height: z.number().positive().optional(),
  weight: z.number().positive().optional(),
  dateOfBirth: z.string().datetime().optional(),
  gender: z.string().optional(),
  fitnessLevel: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
  goals: z.array(z.enum(['weight_loss', 'muscle_gain', 'flexibility', 'stress_relief'])).optional(),
});

// Workout validations
export const createWorkoutSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  type: z.enum(['strength', 'cardio', 'hiit', 'functional']),
  duration: z.number().positive('Duration must be positive'),
  level: z.enum(['beginner', 'intermediate', 'advanced']),
  caloriesBurn: z.number().positive().optional(),
  equipment: z.array(z.string()).optional(),
  videoUrl: z.string().url().optional(),
  thumbnailUrl: z.string().url().optional(),
});

export const updateWorkoutSchema = createWorkoutSchema.partial();

// Exercise validations
export const createExerciseSchema = z.object({
  workoutId: z.string(),
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  sets: z.number().positive().optional(),
  reps: z.number().positive().optional(),
  duration: z.number().positive().optional(),
  restTime: z.number().positive().optional(),
  order: z.number().int().nonnegative(),
  videoUrl: z.string().url().optional(),
});

// Stretching validations
export const createStretchingSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  type: z.enum(['morning', 'evening', 'yoga', 'post_workout']),
  duration: z.number().positive('Duration must be positive'),
  level: z.enum(['beginner', 'intermediate', 'advanced']),
  videoUrl: z.string().url().optional(),
  thumbnailUrl: z.string().url().optional(),
  poses: z.any().optional(), // JSON
});

export const updateStretchingSchema = createStretchingSchema.partial();

// Meditation validations
export const createMeditationSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  category: z.enum(['beginner', 'breathing', 'sleep', 'stress_relief']),
  duration: z.number().positive('Duration must be positive'),
  audioUrl: z.string().url().optional(),
  thumbnailUrl: z.string().url().optional(),
  ambientSound: z.enum(['rain', 'ocean', 'forest', 'none']).optional(),
});

export const updateMeditationSchema = createMeditationSchema.partial();

// UserActivity validations
export const createActivitySchema = z.object({
  activityType: z.enum(['workout', 'stretching', 'meditation']),
  workoutId: z.string().optional(),
  stretchingId: z.string().optional(),
  meditationId: z.string().optional(),
  duration: z.number().positive().optional(),
  notes: z.string().optional(),
});

// UserProgress validations
export const createProgressSchema = z.object({
  weight: z.number().positive().optional(),
  measurements: z.any().optional(), // JSON
  photos: z.array(z.string().url()).optional(),
  notes: z.string().optional(),
  date: z.string().datetime().optional(),
});
