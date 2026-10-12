'use client';

import { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeading from '@/shared/components/common/SectionHeading';

interface Testimonial {
  text: string;
  name: string;
  role?: string;
}

interface TestimonialCarouselProps {
  title?: string;
  highlightedWord?: string;
  subtitle?: string;
  testimonials: Testimonial[];
}

export default function TestimonialCarousel({
  title,
  highlightedWord,
  subtitle,
  testimonials,
}: TestimonialCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        {title && (
          <SectionHeading title={title} highlightedWord={highlightedWord} subtitle={subtitle} />
        )}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="min-w-0 flex-[0_0_100%] px-4 md:flex-[0_0_50%]">
                  <figure className="h-full rounded-lg border bg-white p-8 shadow-sm">
                    <span className="text-primary/20 font-serif text-6xl leading-none">
                      &ldquo;
                    </span>
                    <p className="text-foreground text-sm leading-relaxed italic">
                      {testimonial.text}
                    </p>
                    <div className="bg-primary my-4 h-0.5 w-12" />
                    <p className="text-heading font-serif font-semibold">{testimonial.name}</p>
                    {testimonial.role && (
                      <p className="text-foreground text-sm">{testimonial.role}</p>
                    )}
                  </figure>
                </div>
              ))}
            </div>
          </div>
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={scrollPrev}
            className="absolute top-1/2 -left-4 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md transition hover:bg-gray-50"
          >
            <ChevronLeft className="text-heading h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={scrollNext}
            className="absolute top-1/2 -right-4 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md transition hover:bg-gray-50"
          >
            <ChevronRight className="text-heading h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
