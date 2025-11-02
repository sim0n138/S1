import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create workouts
  const workouts = [
    {
      title: 'Утренняя кардио-разминка',
      description: 'Энергичная утренняя тренировка для пробуждения и заряда энергией на весь день',
      type: 'cardio',
      duration: 20,
      level: 'beginner',
      caloriesBurn: 150,
      equipment: [],
      videoUrl: 'https://www.youtube.com/watch?v=ml6cT4AZdqI',
      thumbnailUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400',
    },
    {
      title: 'HIIT для начинающих',
      description: 'Высокоинтенсивная интервальная тренировка, идеально подходит для сжигания жира',
      type: 'hiit',
      duration: 15,
      level: 'beginner',
      caloriesBurn: 180,
      equipment: [],
      videoUrl: 'https://www.youtube.com/watch?v=LFcXrUaKcUc',
      thumbnailUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400',
    },
    {
      title: 'Силовая тренировка верха тела',
      description: 'Развитие мышц рук, плеч и спины с использованием гантелей',
      type: 'strength',
      duration: 30,
      level: 'intermediate',
      caloriesBurn: 200,
      equipment: ['dumbbells'],
      videoUrl: 'https://www.youtube.com/watch?v=IODxDxX7oi4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400',
    },
    {
      title: 'Функциональный тренинг',
      description: 'Комплексная тренировка для развития силы, координации и выносливости',
      type: 'functional',
      duration: 25,
      level: 'intermediate',
      caloriesBurn: 220,
      equipment: ['resistance_bands'],
      videoUrl: 'https://www.youtube.com/watch?v=2pLT-olgUJs',
      thumbnailUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400',
    },
    {
      title: 'Интенсивное кардио',
      description: 'Продвинутая кардио-тренировка для максимального сжигания калорий',
      type: 'cardio',
      duration: 30,
      level: 'advanced',
      caloriesBurn: 350,
      equipment: [],
      videoUrl: 'https://www.youtube.com/watch?v=ysHtJHVc0Rk',
      thumbnailUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400',
    },
    {
      title: 'Полная силовая тренировка',
      description: 'Интенсивная тренировка всего тела для опытных спортсменов',
      type: 'strength',
      duration: 45,
      level: 'advanced',
      caloriesBurn: 400,
      equipment: ['dumbbells', 'barbell'],
      videoUrl: 'https://www.youtube.com/watch?v=rMQJbFa8yNQ',
      thumbnailUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400',
    },
    {
      title: 'Табата HIIT',
      description: 'Короткие интенсивные интервалы для максимального эффекта',
      type: 'hiit',
      duration: 20,
      level: 'intermediate',
      caloriesBurn: 240,
      equipment: [],
      videoUrl: 'https://www.youtube.com/watch?v=xLhoNdz6rwI',
      thumbnailUrl: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?w=400',
    },
    {
      title: 'Тренировка ног и ягодиц',
      description: 'Целевая тренировка для нижней части тела',
      type: 'strength',
      duration: 35,
      level: 'intermediate',
      caloriesBurn: 280,
      equipment: ['dumbbells'],
      videoUrl: 'https://www.youtube.com/watch?v=2xdl18yhtVs',
      thumbnailUrl: 'https://images.unsplash.com/photo-1550345332-09e3ac987658?w=400',
    },
    {
      title: 'Кроссфит для продвинутых',
      description: 'Комплексная высокоинтенсивная тренировка',
      type: 'functional',
      duration: 40,
      level: 'advanced',
      caloriesBurn: 450,
      equipment: ['dumbbells', 'kettlebell', 'box'],
      videoUrl: 'https://www.youtube.com/watch?v=YVL8dJMqgX4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=400',
    },
    {
      title: 'Быстрая вечерняя тренировка',
      description: 'Короткая но эффективная тренировка перед сном',
      type: 'cardio',
      duration: 15,
      level: 'beginner',
      caloriesBurn: 100,
      equipment: [],
      videoUrl: 'https://www.youtube.com/watch?v=gC_L9qAHVJ8',
      thumbnailUrl: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400',
    },
  ];

  for (const workout of workouts) {
    await prisma.workout.create({ data: workout });
  }

  console.log('✅ Created 10 workouts');

  // Create stretching sessions
  const stretchingSessions = [
    {
      title: 'Утренняя растяжка',
      description: 'Мягкая растяжка для пробуждения тела',
      type: 'morning',
      duration: 10,
      level: 'beginner',
      videoUrl: 'https://www.youtube.com/watch?v=g_tea8ZNk5A',
      thumbnailUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400',
    },
    {
      title: 'Йога для начинающих',
      description: 'Базовые асаны йоги для гибкости и расслабления',
      type: 'yoga',
      duration: 20,
      level: 'beginner',
      videoUrl: 'https://www.youtube.com/watch?v=v7AYKMP6rOE',
      thumbnailUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400',
    },
    {
      title: 'Вечерняя релаксация',
      description: 'Успокаивающая растяжка перед сном',
      type: 'evening',
      duration: 15,
      level: 'beginner',
      videoUrl: 'https://www.youtube.com/watch?v=BiWDsfZ3zbo',
      thumbnailUrl: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=400',
    },
    {
      title: 'Растяжка после тренировки',
      description: 'Восстановительная растяжка для мышц',
      type: 'post_workout',
      duration: 10,
      level: 'intermediate',
      videoUrl: 'https://www.youtube.com/watch?v=qULTwquOuT4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1603988363607-e1e4a66962c6?w=400',
    },
    {
      title: 'Силовая йога',
      description: 'Динамичная йога для силы и гибкости',
      type: 'yoga',
      duration: 30,
      level: 'advanced',
      videoUrl: 'https://www.youtube.com/watch?v=LqXZ628YNj4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=400',
    },
  ];

  for (const session of stretchingSessions) {
    await prisma.stretchingSession.create({ data: session });
  }

  console.log('✅ Created 5 stretching sessions');

  // Create meditations
  const meditations = [
    {
      title: 'Введение в медитацию',
      description: 'Простая медитация для начинающих',
      category: 'beginner',
      duration: 10,
      audioUrl: 'https://www.youtube.com/watch?v=z6X5oEIg6Ak',
      thumbnailUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400',
      ambientSound: 'none',
    },
    {
      title: 'Дыхательная практика',
      description: 'Медитация на осознанное дыхание',
      category: 'breathing',
      duration: 5,
      audioUrl: 'https://www.youtube.com/watch?v=U9Q2xplcCOE',
      thumbnailUrl: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=400',
      ambientSound: 'ocean',
    },
    {
      title: 'Медитация перед сном',
      description: 'Расслабляющая медитация для глубокого сна',
      category: 'sleep',
      duration: 15,
      audioUrl: 'https://www.youtube.com/watch?v=WfB1FairOjQ',
      thumbnailUrl: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=400',
      ambientSound: 'rain',
    },
    {
      title: 'Снятие стресса',
      description: 'Медитация для расслабления и снятия напряжения',
      category: 'stress_relief',
      duration: 10,
      audioUrl: 'https://www.youtube.com/watch?v=O-6f5wQXSu8',
      thumbnailUrl: 'https://images.unsplash.com/photo-1528319725582-ddc096101511?w=400',
      ambientSound: 'forest',
    },
    {
      title: 'Глубокая релаксация',
      description: 'Продолжительная медитация для полного расслабления',
      category: 'stress_relief',
      duration: 20,
      audioUrl: 'https://www.youtube.com/watch?v=aEqlQvczMJQ',
      thumbnailUrl: 'https://images.unsplash.com/photo-1447452001602-7090c7ab2db3?w=400',
      ambientSound: 'ocean',
    },
  ];

  for (const meditation of meditations) {
    await prisma.meditation.create({ data: meditation });
  }

  console.log('✅ Created 5 meditations');

  console.log('🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
