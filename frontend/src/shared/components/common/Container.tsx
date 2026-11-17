import { cn } from '@/shared/lib/utils';

/** Page-width wrapper: the template's 1140px container with 16px gutters on phones. */
export function Container({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('mx-auto w-full max-w-[1140px] px-4 sm:px-6', className)} {...props} />;
}
