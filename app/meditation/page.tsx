'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';
import { Badge } from '@/components/ui/Badge';
import { formatDuration } from '@/lib/utils';

interface Meditation {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: number;
  thumbnailUrl?: string;
  ambientSound?: string;
}

export default function MeditationPage() {
  const [meditations, setMeditations] = useState<Meditation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/meditation')
      .then(r => r.json())
      .then(data => setMeditations(data))
      .catch(error => console.error('Error loading meditations:', error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Медитация
          </h1>

          {loading ? (
            <div className="flex justify-center py-12">
              <Spinner size="lg" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {meditations.map((meditation) => (
                <Card key={meditation.id} hover className="cursor-pointer">
                  {meditation.thumbnailUrl && (
                    <img
                      src={meditation.thumbnailUrl}
                      alt={meditation.title}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {meditation.title}
                    </h3>
                    <Badge>{meditation.category}</Badge>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {meditation.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>⏱️ {formatDuration(meditation.duration)}</span>
                    {meditation.ambientSound && meditation.ambientSound !== 'none' && (
                      <span>🎵 {meditation.ambientSound}</span>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
