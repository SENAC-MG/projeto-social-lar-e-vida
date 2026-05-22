import { X } from 'lucide-react';
import { cn } from '@/shared/utils/cn';

export default function Modal({ open = true, onClose, title, children, className }) {
  if (!open) return null;

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4'
      onClick={(event) => event.target === event.currentTarget && onClose?.()}
      role='presentation'
    >
      <div
        className={cn(
          'w-full max-w-4xl overflow-hidden rounded-2xl border border-card-border bg-card shadow-2xl',
          className,
        )}
      >
        <div className='bg-[#F7F9FC] dark:bg-[#081120] flex items-center justify-between border-b border-card-border px-6 py-4'>
          <h2 className='text-lg text-[#0F766E] font-bold'>{title}</h2>
          <button
            type='button'
            onClick={onClose}
            className='cursor-pointer rounded-md p-1 text-foreground/60 transition-colors hover:bg-foreground/10 hover:text-foreground'
            aria-label='Fechar modal'
          >
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
