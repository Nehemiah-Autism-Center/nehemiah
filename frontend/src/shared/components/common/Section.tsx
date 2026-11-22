import { cn } from '@/shared/lib/utils';
import { Container } from './Container';

type Tone = 'default' | 'muted' | 'dark' | 'green';

const TONES: Record<Tone, string> = {
  default: 'bg-background',
  muted: 'bg-secondary-bg',
  dark: 'on-dark bg-charcoal-dark text-footer-text',
  green: 'bg-primary text-primary-foreground',
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

/** Content band. Vertical rhythm follows the template: 48px phones, 64px tablets, 80px desktop. */
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
      className={cn('scroll-mt-6 py-12 sm:py-16 md:py-20', TONES[tone], className)}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
