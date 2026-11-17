import Image from 'next/image';
import type { Locale } from '@/shared/i18n/config';
import { text } from '@/shared/i18n/localized';
import { LocalizedText, UiText } from '@/shared/i18n/LocalizedText';
import { ROUTES } from '@/shared/i18n/routing';
import { MEDIA } from '@/shared/content/media';
import { Container } from '@/shared/components/common/Container';
import { ButtonLink } from '@/shared/components/common/ButtonLink';
import { HERO } from '@/features/home/data';

/**
 * Hero: the approved heading in two sizes, then the invitation with one primary action
 * ("Support Nehemiah") and one secondary ("Learn More"), then the descriptive paragraph. Words unchanged.
 * It is a single static composition — no slider, no auto-play — so nothing moves unexpectedly.
 */
export function HeroSection({ locale }: { locale: Locale }) {
  return (
    <section
      aria-labelledby="hero-heading"
      className="from-primary/10 via-background to-background bg-gradient-to-b py-10 md:py-12 lg:py-14"
    >
      <Container className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <div className="min-w-0">
          <LocalizedText
            as="h1"
            id="hero-heading"
            value={HERO.headline}
            locale={locale}
            className="text-heading font-serif text-3xl leading-tight font-bold sm:text-5xl"
          />
          <LocalizedText
            as="p"
            value={HERO.continuation}
            locale={locale}
            className="text-heading/85 mt-3 text-base leading-snug first-letter:uppercase sm:text-lg md:text-xl"
          />
          {/* The invitation sits directly with its buttons so the primary action stays near the top;
              the longer descriptive paragraph follows. Order only — no words are changed. */}
          <LocalizedText
            as="p"
            value={HERO.invitation}
            locale={locale}
            className="text-heading mt-4 max-w-prose text-base font-semibold"
          />
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href={ROUTES.donate} locale={locale} className="sm:min-w-52">
              <UiText k="cta.support" locale={locale} />
            </ButtonLink>
            <ButtonLink
              href={ROUTES.about}
              locale={locale}
              variant="secondary"
              className="sm:min-w-52"
            >
              <UiText k="cta.learnMore" locale={locale} />
            </ButtonLink>
          </div>
          <LocalizedText
            as="p"
            value={HERO.intro}
            locale={locale}
            className="mt-6 max-w-prose text-base"
          />
        </div>

        <div className="relative min-w-0 pb-10 sm:pb-14">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
            <Image
              src={MEDIA.heroPrimary.src}
              alt={text(MEDIA.heroPrimary.alt, locale)}
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="border-background absolute -bottom-0 -left-0 w-1/2 overflow-hidden rounded-2xl border-4 shadow-lg sm:left-6">
            <div className="relative aspect-[3/2]">
              <Image
                src={MEDIA.heroSecondary.src}
                alt={text(MEDIA.heroSecondary.alt, locale)}
                fill
                sizes="(min-width: 1024px) 22vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
