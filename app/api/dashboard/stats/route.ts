import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

// GET /api/dashboard/stats - Get user's dashboard statistics
export async function GET(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { message: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Get all activities
    const activities = await prisma.userActivity.findMany({
      where: { userId: currentUser.userId },
      orderBy: { completedAt: 'desc' },
    });

    // Calculate total activities and minutes
    const totalActivities = activities.length;
    const totalMinutes = activities.reduce((sum, activity) => sum + (activity.duration || 0), 0);

    // Calculate current streak
    let currentStreak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < activities.length; i++) {
      const activityDate = new Date(activities[i].completedAt);
      activityDate.setHours(0, 0, 0, 0);

      const daysDiff = Math.floor((today.getTime() - activityDate.getTime()) / (1000 * 60 * 60 * 24));

      if (daysDiff === currentStreak) {
        currentStreak++;
      } else {
        break;
      }
    }

    // Calculate activities by type
    const workoutCount = activities.filter(a => a.activityType === 'workout').length;
    const stretchingCount = activities.filter(a => a.activityType === 'stretching').length;
    const meditationCount = activities.filter(a => a.activityType === 'meditation').length;

    // Get recent activities (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentActivities = activities.filter(
      a => new Date(a.completedAt) >= sevenDaysAgo
    );

    return NextResponse.json({
      totalActivities,
      totalMinutes,
      currentStreak,
      workoutCount,
      stretchingCount,
      meditationCount,
      recentActivitiesCount: recentActivities.length,
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json(
      { message: 'Failed to fetch dashboard stats' },
      { status: 500 }
    );
  }
}
