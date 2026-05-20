import { cn } from '@/shared/utils/cn';

export default function Card({ className, children }) {
  return (
    <div className={cn('rounded-2xl border border-card-border bg-card-bg shadow-sm', className)}>
      {children}
    </div>
  );
}
