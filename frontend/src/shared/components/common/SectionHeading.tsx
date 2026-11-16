import type { Locale } from '@/shared/i18n/config';
import type { Localized } from '@/shared/i18n/localized';
import { LocalizedText } from '@/shared/i18n/LocalizedText';
import { cn } from '@/shared/lib/utils';

interface SectionHeadingProps {
  locale: Locale;
  title: Localized<string>;
  subtitle?: Localized<string>;
  eyebrow?: Localized<string>;
  /** Set when a parent <section> references this heading via aria-labelledby. */
  id?: string;
  as?: 'h2' | 'h3';
  align?: 'center' | 'left';
  tone?: 'default' | 'onDark';
  className?: string;
}

export function SectionHeading({
  locale,
  title,
  subtitle,
  eyebrow,
  id,
  as = 'h2',
  align = 'left',
  tone = 'default',
  className,
}: SectionHeadingProps) {
  const onDark = tone === 'onDark';
  return (
    <div className={cn('mb-10 max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && (
        <LocalizedText
          as="p"
          value={eyebrow}
          locale={locale}
          className={cn(
            'mb-2 text-sm font-semibold tracking-wider uppercase',
            onDark ? 'text-footer-accent' : 'text-primary',
          )}
        />
      )}
      <LocalizedText
        as={as}
        id={id}
        value={title}
        locale={locale}
        className={cn(
          'font-serif text-3xl leading-tight md:text-4xl',
          onDark ? 'text-white' : 'text-heading',
        )}
      />
      <div
        aria-hidden="true"
        className={cn(
          'mt-4 h-1 w-12 rounded-full',
          onDark ? 'bg-footer-accent' : 'bg-secondary',
          align === 'center' && 'mx-auto',
        )}
      />
      {subtitle && (
        <LocalizedText
          as="p"
          value={subtitle}
          locale={locale}
          className={cn('mt-4 text-lg', onDark ? 'text-white/90' : 'text-foreground')}
        />
      )}
    </div>
  );
}
