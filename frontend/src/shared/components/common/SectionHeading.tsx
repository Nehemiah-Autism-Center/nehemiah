import { createElement } from 'react';
import type { Locale } from '@/shared/i18n/config';
import { resolve, type Localized } from '@/shared/i18n/localized';
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
  /** Show the last word in green, as in the template ("Services We Provide"). Default true. */
  highlight?: boolean;
  className?: string;
}

/**
 * Traditional serif section heading: the last word is highlighted in green and a short green
 * divider sits underneath. The highlight is purely visual (the heading stays one text run for
 * assistive technology) and works for Amharic too, because it splits on the last space.
 */
export function SectionHeading({
  locale,
  title,
  subtitle,
  eyebrow,
  id,
  as = 'h2',
  align = 'left',
  tone = 'default',
  highlight = true,
  className,
}: SectionHeadingProps) {
  const onDark = tone === 'onDark';
  const resolved = resolve(title, locale);
  const words = resolved.value.trim().split(/\s+/);
  const last = highlight && words.length > 1 ? words.pop() : undefined;

  return (
    <div className={cn('mb-10 max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && (
        <LocalizedText
          as="p"
          value={eyebrow}
          locale={locale}
          className={cn(
            'mb-2 text-sm font-semibold tracking-wider uppercase',
            onDark ? 'text-primary' : 'text-green-ink',
          )}
        />
      )}
      {createElement(
        as,
        {
          id,
          lang: resolved.isFallback ? resolved.lang : undefined,
          className: cn(
            'font-serif text-[28px] leading-tight font-semibold sm:text-4xl md:text-[42px]',
            onDark ? 'text-white' : 'text-heading',
          ),
        },
        last === undefined ? resolved.value : `${words.join(' ')} `,
        last !== undefined && (
          <span className={onDark ? 'text-primary' : 'text-green-display'}>{last}</span>
        ),
      )}
      <div
        aria-hidden="true"
        className={cn('bg-primary mt-4 h-[3px] w-14', align === 'center' && 'mx-auto')}
      />
      {subtitle && (
        <LocalizedText
          as="p"
          value={subtitle}
          locale={locale}
          className={cn('mt-5 text-lg', onDark ? 'text-footer-text' : 'text-foreground')}
        />
      )}
    </div>
  );
}
