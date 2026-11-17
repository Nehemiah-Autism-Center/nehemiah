import { Quote } from 'lucide-react';
import type { Locale } from '@/shared/i18n/config';
import { LocalizedText } from '@/shared/i18n/LocalizedText';
import { Section } from '@/shared/components/common/Section';
import { SectionHeading } from '@/shared/components/common/SectionHeading';
import { TESTIMONIALS_HEADING, getVisibleTestimonials } from '@/features/testimonials/data';

/**
 * Six testimonials in an accessible, static grid (no carousel, nothing moves on its own).
 * Renders nothing when every item is withheld, so a release without approved testimonials
 * needs no code change: build with NEXT_PUBLIC_HIDE_PENDING_TESTIMONIALS=true.
 */
export function TestimonialsSection({ locale }: { locale: Locale }) {
  const items = getVisibleTestimonials();
  if (items.length === 0) return null;

  return (
    <Section id="testimonials" labelledBy="testimonials-heading" tone="muted">
      <SectionHeading
        locale={locale}
        id="testimonials-heading"
        title={TESTIMONIALS_HEADING}
        align="center"
        className="mx-auto"
      />
      <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li key={item.id} className="flex">
            <figure
              data-testimonial={item.id}
              className="flex w-full min-w-0 flex-col rounded-[5px] border bg-white p-8 shadow-sm"
            >
              <span className="bg-primary text-primary-foreground mb-5 flex size-12 items-center justify-center">
                <Quote aria-hidden="true" className="size-6" />
              </span>
              <blockquote className="flex-1">
                <LocalizedText
                  as="p"
                  value={item.quote}
                  locale={locale}
                  className="text-text-dark text-lg italic"
                />
              </blockquote>
              <figcaption className="text-green-ink mt-6 border-t pt-4 font-semibold">
                <span aria-hidden="true">— </span>
                <LocalizedText value={item.attribution} locale={locale} />
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  );
}
