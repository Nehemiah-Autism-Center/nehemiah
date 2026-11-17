import type { Locale } from '@/shared/i18n/config';
import { LocalizedText } from '@/shared/i18n/LocalizedText';
import { cn } from '@/shared/lib/utils';
import { IMPACT_STATS } from '@/features/home/data';

/** Figures are static numbers: no count-up animation. */
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
            'flex min-w-0 flex-col-reverse gap-1 rounded-xl p-6 text-center',
            // A white overlay would lighten the teal band and push white text below 4.5:1.
            tone === 'onDark' ? 'bg-primary-dark/55' : 'border bg-white shadow-sm',
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
              'font-serif text-5xl leading-none font-bold',
              tone === 'onDark' ? 'text-white' : 'text-primary',
            )}
          >
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
