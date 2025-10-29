// Common types across the application

export type FitnessLevel = 'beginner' | 'intermediate' | 'advanced';

export type WorkoutType = 'strength' | 'cardio' | 'hiit' | 'functional';

export type StretchingType = 'morning' | 'evening' | 'yoga' | 'post_workout';

export type MeditationCategory = 'beginner' | 'breathing' | 'sleep' | 'stress_relief';

export type ActivityType = 'workout' | 'stretching' | 'meditation';

export type UserGoal = 'weight_loss' | 'muscle_gain' | 'flexibility' | 'stress_relief';

export interface ActivityStats {
  totalActivities: number;
  totalMinutes: number;
  totalCalories: number;
  currentStreak: number;
  longestStreak: number;
}

export interface WeeklySchedule {
  monday?: ActivityType[];
  tuesday?: ActivityType[];
  wednesday?: ActivityType[];
  thursday?: ActivityType[];
  friday?: ActivityType[];
  saturday?: ActivityType[];
  sunday?: ActivityType[];
}
