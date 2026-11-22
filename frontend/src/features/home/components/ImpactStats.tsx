import type { Locale } from '@/shared/i18n/config';
import { LocalizedText } from '@/shared/i18n/LocalizedText';
import { cn } from '@/shared/lib/utils';
import { IMPACT_STATS } from '@/features/home/data';

/**
 * The three approved figures as static cards: bright green with near-black text on the dark
 * band (7.1:1), white cards on light pages. No count-up animation and no invented fourth figure.
 */
export function ImpactStats({
  locale,
  tone = 'onDark',
}: {
  locale: Locale;
  tone?: 'onDark' | 'onLight';
}) {
  return (
    <dl className="grid gap-6 sm:grid-cols-3">
      {IMPACT_STATS.map((stat) => (
        <div
          key={stat.id}
          className={cn(
            'flex min-w-0 flex-col-reverse gap-2 rounded-[5px] p-8 text-center',
            tone === 'onDark'
              ? 'bg-primary text-primary-foreground'
              : 'text-text-dark border bg-white shadow-sm',
          )}
        >
          <LocalizedText
            as="dt"
            value={stat.label}
            locale={locale}
            className="text-base font-semibold"
          />
          <dd
            className={cn(
              'font-serif text-5xl leading-none font-bold md:text-6xl',
              tone === 'onDark' ? 'text-primary-foreground' : 'text-green-display',
            )}
          >
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
