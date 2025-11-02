import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white dark:bg-gray-800 rounded-lg shadow-md p-6',
        hover && 'transition-transform duration-200 hover:scale-[1.02] cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  );
}
