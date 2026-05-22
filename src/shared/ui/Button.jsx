import { cn } from '@/shared/utils/cn';

const variants = {
  primary: 'bg-primary text-white hover:bg-primary-hover shadow-lg',
  secondary: 'bg-card-bg border border-card-border text-foreground hover:bg-foreground/5',
  ghost: 'text-foreground/70 hover:text-foreground hover:bg-foreground/10',
  danger: 'bg-red-600 text-white hover:bg-red-700',
};

export default function Button({
  as: Component = 'button',
  type = 'button',
  variant = 'primary',
  className,
  children,
  ...props
}) {
  return (
    <Component
      type={Component === 'button' ? type : undefined}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99]',
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
