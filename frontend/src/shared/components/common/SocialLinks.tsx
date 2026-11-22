import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import type { Locale } from '@/shared/i18n/config';
import { t } from '@/shared/i18n/ui';
import { SOCIAL_LINKS, type SocialKey } from '@/shared/content/organization';
import { cn } from '@/shared/lib/utils';

const ICON_CLASS = 'size-5';

export function SocialIcon({ name, className }: { name: SocialKey; className?: string }) {
  const cls = cn(ICON_CLASS, className);
  switch (name) {
    case 'facebook':
      return <Facebook aria-hidden="true" className={cls} />;
    case 'instagram':
      return <Instagram aria-hidden="true" className={cls} />;
    case 'linkedin':
      return <Linkedin aria-hidden="true" className={cls} />;
    case 'youtube':
      return <Youtube aria-hidden="true" className={cls} />;
    case 'tiktok':
      return (
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={cls}
        >
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.17 8.17 0 004.78 1.52V6.82a4.85 4.85 0 01-1.01-.13z" />
        </svg>
      );
    case 'x':
      return (
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={cls}
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.732-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
  }
}

type Tone = 'square' | 'onDark' | 'onLight';

interface SocialLinksProps {
  locale: Locale;
  /**
   * square  - the template's small white squares on the charcoal utility bar
   * onDark  - outlined squares with green icons (footer, mobile menu)
   * onLight - outlined squares on white (contact page)
   */
  tone?: Tone;
  className?: string;
}

const LINK: Record<Tone, string> = {
  square: 'size-7 bg-white text-charcoal hover:bg-primary hover:text-primary-foreground',
  onDark:
    'size-11 border border-white/25 text-primary lg:size-10 hover:border-primary hover:bg-primary hover:text-primary-foreground',
  onLight:
    'size-11 border border-border bg-white text-green-ink hover:border-primary hover:bg-primary hover:text-primary-foreground',
};

/** The organisation's six official profiles. Every link opens in a new tab and says so. */
export function SocialLinks({ locale, tone = 'onDark', className }: SocialLinksProps) {
  const suffix = t('common.opensInNewTab', locale);
  return (
    <ul
      className={cn(
        'flex flex-wrap items-center',
        tone === 'square' ? 'gap-1.5' : 'gap-2',
        className,
      )}
    >
      {SOCIAL_LINKS.map((link) => (
        <li key={link.key}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${link.label} ${suffix}`}
            className={cn(
              'flex items-center justify-center rounded-[2px] transition-colors',
              LINK[tone],
            )}
          >
            <SocialIcon name={link.key} className={tone === 'square' ? 'size-3.5' : 'size-5'} />
          </a>
        </li>
      ))}
    </ul>
  );
}
