import Image from 'next/image';
import type { Locale } from '@/shared/i18n/config';
import { text } from '@/shared/i18n/localized';
import { LocalizedText, UiText } from '@/shared/i18n/LocalizedText';
import { ROUTES } from '@/shared/i18n/routing';
import { ui } from '@/shared/i18n/ui';
import { ORGANIZATION } from '@/shared/content/organization';
import { MEDIA } from '@/shared/content/media';
import { Section } from '@/shared/components/common/Section';
import { SectionHeading } from '@/shared/components/common/SectionHeading';
import { ButtonLink, LocalizedLink } from '@/shared/components/common/ButtonLink';
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
import { ImpactStats } from './ImpactStats';
import { ClosingCtaSection } from './ClosingCtaSection';
import { HOME_COPY } from '@/features/home/data';

export function HomePage({ locale }: { locale: Locale }) {
  const previewPhotos = GALLERY_PREVIEW_IDS.map((id) =>
    GALLERY_PHOTOS.find((p) => p.id === id),
  ).filter((p): p is (typeof GALLERY_PHOTOS)[number] => Boolean(p));

  return (
    <>
      <HeroSection locale={locale} />

      {/* Organization introduction */}
      <Section labelledBy="intro-heading" tone="muted">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="min-w-0">
            <SectionHeading
              locale={locale}
              id="intro-heading"
              title={ORGANIZATION.name}
              className="mb-6"
            />
            <LocalizedText
              as="p"
              value={ORGANIZATION.description}
              locale={locale}
              className="max-w-prose text-lg"
            />
            <LocalizedText
              as="p"
              value={ORGANIZATION.tagline}
              locale={locale}
              className="border-secondary text-heading mt-6 border-l-4 pl-4 font-serif text-xl font-semibold"
            />
            <ButtonLink href={ROUTES.about} locale={locale} variant="secondary" className="mt-8">
              <UiText k="cta.learnMore" locale={locale} />
            </ButtonLink>
          </div>
          <div className="relative aspect-[3/2] overflow-hidden rounded-2xl shadow-lg">
            <Image
              src={MEDIA.aboutSide.src}
              alt={text(MEDIA.aboutSide.alt, locale)}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </Section>

      {/* Services overview */}
      <Section id="services" labelledBy="services-heading">
        <SectionHeading
          locale={locale}
          id="services-heading"
          title={SERVICES_HEADING}
          align="center"
          className="mx-auto"
        />
        <ServiceCards locale={locale} />
        <div className="mt-8 text-center">
          <ButtonLink href={ROUTES.services} locale={locale} variant="secondary">
            <UiText k="cta.whatWeDo" locale={locale} />
          </ButtonLink>
        </div>
      </Section>

      {/* Impact */}
      <Section id="impact" labelledBy="impact-heading" tone="brand">
        <SectionHeading
          locale={locale}
          id="impact-heading"
          title={ui['cta.ourImpact']}
          tone="onDark"
          align="center"
          className="mx-auto"
        />
        <ImpactStats locale={locale} />
        <div className="mt-8 text-center">
          <ButtonLink href={ROUTES.about} locale={locale} variant="light">
            <LocalizedText value={HOME_COPY.aboutLink} locale={locale} />
          </ButtonLink>
        </div>
      </Section>

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
        <ul className="mx-auto grid max-w-3xl gap-6">
          {EVENTS.map((event) => (
            <li key={event.slug}>
              <EventCard event={event} locale={locale} />
            </li>
          ))}
        </ul>
        <div className="mt-8 text-center">
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
        <ul className="mx-auto grid max-w-3xl gap-6">
          {BLOG_POSTS.map((post) => (
            <li key={post.slug}>
              <BlogCard post={post} locale={locale} />
            </li>
          ))}
        </ul>
        <div className="mt-8 text-center">
          <ButtonLink href={ROUTES.blog} locale={locale} variant="secondary">
            <LocalizedText value={HOME_COPY.viewAllPosts} locale={locale} />
          </ButtonLink>
        </div>
      </Section>

      {/* Gallery preview */}
      <Section id="gallery" labelledBy="gallery-heading" tone="muted">
        <SectionHeading
          locale={locale}
          id="gallery-heading"
          title={ui['nav.gallery']}
          align="center"
          className="mx-auto"
        />
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
          {previewPhotos.map((photo) => (
            <li key={photo.id}>
              <LocalizedLink
                href={ROUTES.gallery}
                locale={locale}
                className="group relative block aspect-[4/3] overflow-hidden rounded-xl"
              >
                <Image
                  src={photo.src}
                  alt={text(photo.alt, locale)}
                  fill
                  sizes="(min-width: 768px) 33vw, 50vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </LocalizedLink>
            </li>
          ))}
        </ul>
        <div className="mt-8 text-center">
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
