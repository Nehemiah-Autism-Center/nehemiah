import Image from 'next/image';
import Link from 'next/link';
import HeroSlider from '@/shared/components/common/HeroSlider';
import SectionHeading from '@/shared/components/common/SectionHeading';
import EventCard from '@/shared/components/common/EventCard';
import CounterSection from '@/shared/components/common/CounterSection';
import TestimonialCarousel from '@/shared/components/common/TestimonialCarousel';
import CTASection from '@/shared/components/common/CTASection';
import GalleryGrid from '@/shared/components/common/GalleryGrid';
import LocationSection from '@/shared/components/common/LocationSection';
import AnimateOnScroll from '@/shared/components/common/AnimateOnScroll';
import BlogCard from '@/features/blog/components/BlogCard';
import { blogPosts } from '@/features/blog/data';
import { events, eventsHeading, eventsSubtitle } from '@/features/events/data';
import { galleryPhotos } from '@/features/gallery';
import { ServiceCards } from '@/features/services';
import { servicesHeading } from '@/features/services/data';
import { impactStats } from '@/features/about/data';
import { getInvolved, introParagraph, slides, testimonials } from '@/features/home/data';
import { SUPPORT_CTA } from '@/shared/lib/constants';

const linkButton =
  'inline-block rounded px-6 py-2.5 text-xs font-semibold text-white uppercase transition';

export default function HomePage() {
  return (
    <>
      <HeroSlider slides={slides} />

      {/* Introduction */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <AnimateOnScroll animation="fadeLeft">
              <div>
                <SectionHeading
                  title="About Nehemiah Autism Center"
                  highlightedWord="Nehemiah"
                  align="left"
                />
                <p className="text-foreground leading-relaxed">{introParagraph}</p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link href="/about" className={`bg-text-dark hover:bg-black ${linkButton}`}>
                    Learn More
                  </Link>
                  <Link
                    href="/about#impact"
                    className={`bg-primary hover:bg-primary-hover ${linkButton}`}
                  >
                    Our Impact
                  </Link>
                </div>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fadeRight">
              <Image
                src="/images/nehemiah/about-intro.jpg"
                alt="A volunteer playing a stacking-cups game with a child on the lawn at the center"
                width={1200}
                height={800}
                className="w-full rounded-lg shadow-lg"
              />
            </AnimateOnScroll>
          </div>

          {/* Ways to get involved */}
          <div className="mt-12 grid grid-cols-1 gap-0 md:grid-cols-3">
            {getInvolved.map(({ title, description, href, icon: Icon }, index) => {
              const highlighted = index === 1;
              return (
                <Link
                  key={title}
                  href={href}
                  className={
                    highlighted
                      ? 'bg-primary flex gap-4 p-8 text-white transition hover:opacity-95'
                      : 'flex gap-4 border bg-white p-8 transition hover:bg-gray-50'
                  }
                >
                  <Icon
                    className={
                      highlighted ? 'size-10 shrink-0 text-white' : 'text-primary size-10 shrink-0'
                    }
                    aria-hidden="true"
                  />
                  <div>
                    <h3
                      className={
                        highlighted
                          ? 'font-serif font-semibold text-white'
                          : 'text-heading font-serif font-semibold'
                      }
                    >
                      {title}
                    </h3>
                    <p
                      className={
                        highlighted ? 'mt-2 text-sm text-white/85' : 'text-foreground mt-2 text-sm'
                      }
                    >
                      {description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-secondary-bg py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading title={servicesHeading} highlightedWord="Services" />
          <ServiceCards />
          <div className="mt-10 text-center">
            <Link
              href="/services"
              className="text-primary hover:text-primary-dark font-semibold transition"
            >
              What We Do &raquo;
            </Link>
          </div>
        </div>
      </section>

      {/* Impact */}
      <CounterSection items={impactStats} />

      {/* Upcoming events */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading title={eventsHeading} highlightedWord="Next" subtitle={eventsSubtitle} />
          <div className="flex flex-wrap justify-center gap-8">
            {events.map((event) => (
              <AnimateOnScroll
                key={event.slug}
                animation="fadeUp"
                className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.34rem)]"
              >
                <EventCard {...event} />
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <TestimonialCarousel
        title="What People Say"
        highlightedWord="Say"
        subtitle="Volunteers and parents share what Nehemiah Autism Center means to them."
        testimonials={testimonials}
      />

      {/* Latest news */}
      <section className="bg-secondary-bg py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            title="Latest News"
            highlightedWord="News"
            subtitle="Stories and celebrations from our children, families and community."
          />
          <div className="flex flex-wrap justify-center gap-8">
            {blogPosts.slice(0, 3).map((post) => (
              <AnimateOnScroll
                key={post.slug}
                animation="fadeUp"
                className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.34rem)]"
              >
                <BlogCard {...post} />
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery preview */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            title="Photo Gallery"
            highlightedWord="Gallery"
            subtitle="Moments from our Autism Awareness Day with children, families and volunteers."
          />
          <GalleryGrid photos={galleryPhotos.slice(0, 8)} />
          <div className="mt-10 text-center">
            <Link
              href="/gallery"
              className="text-primary hover:text-primary-dark font-semibold transition"
            >
              View the Gallery &raquo;
            </Link>
          </div>
        </div>
      </section>

      <div className="bg-secondary-bg">
        <LocationSection />
      </div>

      <CTASection {...SUPPORT_CTA} />
    </>
  );
}
