import { cn } from '@/shared/lib/utils';
import { Container } from './Container';

type Tone = 'default' | 'muted' | 'brand' | 'dark';

const TONES: Record<Tone, string> = {
  default: 'bg-background',
  muted: 'bg-secondary-bg',
  brand: 'bg-primary text-white on-dark',
  dark: 'bg-footer-bg text-footer-text on-dark',
};

interface SectionProps {
  id?: string;
  /** id of the heading inside the section; gives the region an accessible name. */
  labelledBy?: string;
  tone?: Tone;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
}

export function Section({
  id,
  labelledBy,
  tone = 'default',
  className,
  containerClassName,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn('scroll-mt-6 py-14 md:py-20', TONES[tone], className)}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
