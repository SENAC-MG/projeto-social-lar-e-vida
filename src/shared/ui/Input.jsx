import { cn } from '@/shared/utils/cn';

export function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        'w-full rounded-lg border border-card-border bg-card-bg px-4 py-2.5 text-sm text-foreground outline-none placeholder:text-foreground/40 focus:border-primary/60 focus:ring-1 focus:ring-primary/40',
        className,
      )}
      {...props}
    />
  );
}

export function InputField({
  label,
  required = false,
  id,
  className,
  inputClassName,
  ...props
}) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <label htmlFor={id} className='text-sm font-medium text-foreground/70'>
          {label}
          {required && <span className='ml-1 text-primary'>*</span>}
        </label>
      )}
      <Input id={id} required={required} className={inputClassName} {...props} />
    </div>
  );
}
