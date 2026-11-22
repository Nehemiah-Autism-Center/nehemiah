import { ArrowRight, HandHeart, Handshake, Heart, type LucideIcon } from 'lucide-react';
import type { Locale } from '@/shared/i18n/config';
import { UiText } from '@/shared/i18n/LocalizedText';
import { ROUTES } from '@/shared/i18n/routing';
import type { UiKey } from '@/shared/i18n/ui';
import { Container } from '@/shared/components/common/Container';
import { LocalizedLink } from '@/shared/components/common/ButtonLink';
import { cn } from '@/shared/lib/utils';

interface Feature {
  id: string;
  title: UiKey;
  href: string;
  Icon: LucideIcon;
}

/**
 * The three ways to get involved, using the approved button labels and pages that already exist.
 * No new copy: each card is a title and a "Learn More" cue. The centre card is green, as in the
 * template. On large screens the strip overlaps the bottom edge of the hero.
 */
const FEATURES: readonly Feature[] = [
  { id: 'volunteer', title: 'cta.volunteerWithUs', href: ROUTES.volunteer, Icon: HandHeart },
  { id: 'support', title: 'cta.supportMission', href: ROUTES.donate, Icon: Heart },
  {
    id: 'partner',
    title: 'cta.partnerWithUs',
    // No partnership page content was supplied: this opens the contact form with the subject filled in.
    href: `${ROUTES.contact}?topic=partnership`,
    Icon: Handshake,
  },
];

export function FeatureStrip({ locale }: { locale: Locale }) {
  return (
    <div className="relative z-10 bg-white lg:-mt-16 lg:bg-transparent">
      <Container className="py-8 lg:py-0">
        <ul className="grid gap-4 md:grid-cols-3 md:gap-0">
          {FEATURES.map(({ id, title, href, Icon }, index) => {
            const centre = index === 1;
            return (
              <li key={id} className="flex">
                <LocalizedLink
                  href={href}
                  locale={locale}
                  className={cn(
                    'group flex w-full min-w-0 flex-col items-center px-6 py-8 text-center transition-colors md:py-10 md:shadow-[0_8px_24px_rgba(0,0,0,0.12)]',
                    centre
                      ? 'bg-primary text-primary-foreground hover:bg-primary-hover'
                      : 'text-heading hover:bg-secondary-bg border bg-white md:border-0',
                  )}
                >
                  <span
                    className={cn(
                      'mb-4 flex size-16 items-center justify-center rounded-full border-2',
                      centre
                        ? 'border-primary-foreground/70 text-primary-foreground'
                        : 'border-primary text-green-display',
                    )}
                  >
                    <Icon aria-hidden="true" className="size-8" />
                  </span>
                  <UiText
                    as="span"
                    k={title}
                    locale={locale}
                    className="font-serif text-xl leading-tight font-semibold"
                  />
                  <span
                    className={cn(
                      'mt-3 inline-flex items-center gap-2 text-sm font-semibold tracking-wider uppercase',
                      centre ? 'text-primary-foreground' : 'text-green-ink',
                    )}
                  >
                    <UiText k="cta.learnMore" locale={locale} />
                    <ArrowRight
                      aria-hidden="true"
                      className="size-4 transition-transform group-hover:translate-x-1 rtl:rotate-180"
                    />
                  </span>
                </LocalizedLink>
              </li>
            );
          })}
        </ul>
      </Container>
    </div>
  );
}
