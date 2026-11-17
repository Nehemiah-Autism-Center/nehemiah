import Image from 'next/image';
import { Plus } from 'lucide-react';
import type { Locale } from '@/shared/i18n/config';
import { text } from '@/shared/i18n/localized';
import { LocalizedText, UiText } from '@/shared/i18n/LocalizedText';
import { ROUTES } from '@/shared/i18n/routing';
import { ui } from '@/shared/i18n/ui';
import { ORGANIZATION } from '@/shared/content/organization';
import { MEDIA, PAGE_BANNERS } from '@/shared/content/media';
import { Section } from '@/shared/components/common/Section';
import { PhotoSection } from '@/shared/components/common/PhotoSection';
import { SectionHeading } from '@/shared/components/common/SectionHeading';
import { ButtonLink, LocalizedLink } from '@/shared/components/common/ButtonLink';
import { cn } from '@/shared/lib/utils';
import { ServiceCards } from '@/features/services/components/ServiceCards';
import { SERVICES_HEADING } from '@/features/services/data';
import { EventCard } from '@/features/events/components/EventCard';
import { EVENTS, UPCOMING_EVENTS_HEADING, UPCOMING_EVENTS_INTRO } from '@/features/events/data';
import { TestimonialsSection } from '@/features/testimonials/components/TestimonialsSection';
import { BlogCard } from '@/features/blog/components/BlogCard';
import { BLOG_POSTS } from '@/features/blog/data';
import { GALLERY_PHOTOS, GALLERY_PREVIEW_IDS, GALLERY_COPY } from '@/features/gallery/data';
import { LocationSection } from '@/features/contact/components/LocationSection';
import { HeroSection } from './HeroSection';
import { FeatureStrip } from './FeatureStrip';
import { ImpactStats } from './ImpactStats';
import { ClosingCtaSection } from './ClosingCtaSection';
import { HERO, HOME_COPY } from '@/features/home/data';

/** A lone card spans the container (photo beside text); several share a grid. */
const cardList = (count: number) => cn('grid gap-8', count > 1 && 'md:grid-cols-2 lg:grid-cols-3');

export function HomePage({ locale }: { locale: Locale }) {
  const previewPhotos = GALLERY_PREVIEW_IDS.map((id) =>
    GALLERY_PHOTOS.find((p) => p.id === id),
  ).filter((p): p is (typeof GALLERY_PHOTOS)[number] => Boolean(p));

  return (
    <>
      <HeroSection locale={locale} />
      <FeatureStrip locale={locale} />

      {/* Introduction. The hero's heading continues here, so no approved word is lost:
          "Welcome to Nehemiah Autism Center — where autistic children are empowered ..." */}
      <Section labelledBy="intro-heading">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="min-w-0">
            <SectionHeading
              locale={locale}
              id="intro-heading"
              title={ORGANIZATION.name}
              className="mb-6"
            />
            <LocalizedText
              as="p"
              value={HERO.continuation}
              locale={locale}
              className="text-heading text-xl leading-relaxed first-letter:uppercase"
            />
            <LocalizedText as="p" value={HERO.intro} locale={locale} className="mt-5 max-w-prose" />
            <LocalizedText
              as="p"
              value={ORGANIZATION.description}
              locale={locale}
              className="mt-5 max-w-prose"
            />
            <LocalizedText
              as="p"
              value={ORGANIZATION.tagline}
              locale={locale}
              className="border-primary text-heading mt-6 border-l-4 pl-4 font-serif text-xl font-semibold"
            />
            <ButtonLink href={ROUTES.about} locale={locale} variant="secondary" className="mt-8">
              <UiText k="cta.learnMore" locale={locale} />
            </ButtonLink>
          </div>
          <div className="relative min-w-0">
            <div
              aria-hidden="true"
              className="bg-primary absolute -right-3 -bottom-3 hidden size-full sm:block"
            />
            <div className="relative aspect-[4/3] overflow-hidden lg:aspect-[4/5]">
              <Image
                src={MEDIA.aboutSide.src}
                alt={text(MEDIA.aboutSide.alt, locale)}
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Services overview */}
      <Section id="services" labelledBy="services-heading" tone="muted">
        <SectionHeading
          locale={locale}
          id="services-heading"
          title={SERVICES_HEADING}
          align="center"
          className="mx-auto"
        />
        <ServiceCards locale={locale} />
        <div className="mt-10 text-center">
          <ButtonLink href={ROUTES.services} locale={locale} variant="secondary">
            <UiText k="cta.whatWeDo" locale={locale} />
          </ButtonLink>
        </div>
      </Section>

      {/* Impact: dark photographic band with the three approved figures */}
      <PhotoSection id="impact" labelledBy="impact-heading" image={PAGE_BANNERS.impact}>
        <SectionHeading
          locale={locale}
          id="impact-heading"
          title={ui['cta.ourImpact']}
          tone="onDark"
          align="center"
          className="mx-auto"
        />
        <ImpactStats locale={locale} />
        <div className="mt-10 text-center">
          <ButtonLink href={ROUTES.about} locale={locale}>
            <LocalizedText value={HOME_COPY.aboutLink} locale={locale} />
          </ButtonLink>
        </div>
      </PhotoSection>

      {/* Upcoming events */}
      <Section id="events" labelledBy="events-heading">
        <SectionHeading
          locale={locale}
          id="events-heading"
          title={UPCOMING_EVENTS_HEADING}
          subtitle={UPCOMING_EVENTS_INTRO}
          align="center"
          className="mx-auto"
        />
        <ul className={cardList(EVENTS.length)}>
          {EVENTS.map((event) => (
            <li key={event.slug}>
              <EventCard event={event} locale={locale} horizontal={EVENTS.length === 1} />
            </li>
          ))}
        </ul>
        <div className="mt-10 text-center">
          <ButtonLink href={ROUTES.events} locale={locale} variant="secondary">
            <LocalizedText value={HOME_COPY.viewAllEvents} locale={locale} />
          </ButtonLink>
        </div>
      </Section>

      <TestimonialsSection locale={locale} />

      {/* Blog preview */}
      <Section id="blog" labelledBy="blog-heading">
        <SectionHeading
          locale={locale}
          id="blog-heading"
          title={ui['nav.blog']}
          align="center"
          className="mx-auto"
        />
        <ul className={cardList(BLOG_POSTS.length)}>
          {BLOG_POSTS.map((post) => (
            <li key={post.slug}>
              <BlogCard post={post} locale={locale} horizontal={BLOG_POSTS.length === 1} />
            </li>
          ))}
        </ul>
        <div className="mt-10 text-center">
          <ButtonLink href={ROUTES.blog} locale={locale} variant="secondary">
            <LocalizedText value={HOME_COPY.viewAllPosts} locale={locale} />
          </ButtonLink>
        </div>
      </Section>

      {/* Gallery preview: rectangular grid; the full gallery has the filter and lightbox */}
      <Section id="gallery" labelledBy="gallery-heading" tone="muted">
        <SectionHeading
          locale={locale}
          id="gallery-heading"
          title={ui['nav.gallery']}
          align="center"
          className="mx-auto"
        />
        <ul className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3">
          {previewPhotos.map((photo) => (
            <li key={photo.id}>
              <LocalizedLink
                href={ROUTES.gallery}
                locale={locale}
                className="group relative block aspect-[4/3] overflow-hidden"
              >
                <Image
                  src={photo.src}
                  alt={text(photo.alt, locale)}
                  fill
                  sizes="(min-width: 768px) 33vw, 50vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span
                  aria-hidden="true"
                  className="bg-primary/85 text-primary-foreground absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
                >
                  <Plus className="size-10" />
                </span>
              </LocalizedLink>
            </li>
          ))}
        </ul>
        <div className="mt-10 text-center">
          <ButtonLink href={ROUTES.gallery} locale={locale} variant="secondary">
            <LocalizedText value={GALLERY_COPY.viewGallery} locale={locale} />
          </ButtonLink>
        </div>
      </Section>

      {/* Location */}
      <LocationSection locale={locale} id="visit" />

      <ClosingCtaSection locale={locale} />
    </>
  );
}
