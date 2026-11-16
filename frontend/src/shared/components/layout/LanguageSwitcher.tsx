'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LOCALES, LOCALE_HTML_LANG, LOCALE_NATIVE_NAMES } from '@/shared/i18n/config';
import { useLocale } from '@/shared/i18n/LocaleProvider';
import { switchLocalePath } from '@/shared/i18n/routing';
import { t } from '@/shared/i18n/ui';
import { cn } from '@/shared/lib/utils';

/**
 * Language choice as real links to the same page in the other language: works with the
 * keyboard, touch and screen readers, needs no JavaScript to navigate, and each language is
 * named in its own language (and tagged with it) so visitors can find theirs.
 */
export function LanguageSwitcher({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <nav aria-label={t('common.language', locale)}>
      <ul className="flex items-center gap-1">
        {LOCALES.map((target) => {
          const active = target === locale;
          return (
            <li key={target}>
              <Link
                href={switchLocalePath(pathname, target)}
                lang={LOCALE_HTML_LANG[target]}
                hrefLang={LOCALE_HTML_LANG[target]}
                aria-current={active ? 'true' : undefined}
                className={cn(
                  'inline-flex min-h-11 min-w-11 items-center justify-center rounded-md px-3 text-sm transition-colors',
                  tone === 'dark'
                    ? active
                      ? 'text-text-dark bg-white font-semibold'
                      : 'text-white hover:bg-white/15'
                    : active
                      ? 'bg-primary font-semibold text-white'
                      : 'text-text-dark hover:bg-secondary-bg',
                )}
              >
                {LOCALE_NATIVE_NAMES[target]}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
