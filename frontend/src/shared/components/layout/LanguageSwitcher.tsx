'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LOCALES, LOCALE_HTML_LANG, LOCALE_NATIVE_NAMES } from '@/shared/i18n/config';
import { rememberLocale } from '@/shared/i18n/cookie';
import { useLocale } from '@/shared/i18n/LocaleProvider';
import { switchLocalePath } from '@/shared/i18n/routing';
import { t } from '@/shared/i18n/ui';
import { cn } from '@/shared/lib/utils';

/**
 * Language choice as real links to the same page in the other language: works with the
 * keyboard, touch and screen readers, needs no JavaScript to navigate, and each language is
 * named in its own language (and tagged with it) so visitors can find theirs.
 *
 * tone="dark" sits on the charcoal utility bar or footer (active language = green tab);
 * tone="light" sits on white surfaces (active language = charcoal tab).
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
                // No background prefetch of the other language, and an explicit click records the choice.
                prefetch={false}
                onClick={() => rememberLocale(target)}
                lang={LOCALE_HTML_LANG[target]}
                hrefLang={LOCALE_HTML_LANG[target]}
                aria-current={active ? 'true' : undefined}
                className={cn(
                  'inline-flex min-h-11 min-w-11 items-center justify-center rounded-[3px] px-3 text-sm transition-colors',
                  // The dense desktop utility bar is 40px tall; phones keep the full 44px target.
                  tone === 'dark' && 'md:min-h-10',
                  tone === 'dark'
                    ? active
                      ? 'bg-primary text-primary-foreground font-semibold'
                      : 'hover:text-primary text-white'
                    : active
                      ? 'bg-charcoal font-semibold text-white'
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
