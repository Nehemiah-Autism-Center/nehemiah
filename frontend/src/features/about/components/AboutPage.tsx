import Image from 'next/image';
import { Target } from 'lucide-react';
import PageBanner from '@/shared/components/common/PageBanner';
import SectionHeading from '@/shared/components/common/SectionHeading';
import AnimateOnScroll from '@/shared/components/common/AnimateOnScroll';
import CounterSection from '@/shared/components/common/CounterSection';
import CTASection from '@/shared/components/common/CTASection';
import { ServiceCards } from '@/features/services';
import { aboutIntro, aboutServicesSummary, impactStats, mission } from '@/features/about/data';
import { SUPPORT_CTA } from '@/shared/lib/constants';

export default function AboutPage() {
  return (
    <>
      <PageBanner
        title="About Us"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About Us' }]}
        backgroundImage="/images/nehemiah/volunteers-banner.jpg"
      />

      {/* Introduction */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <AnimateOnScroll animation="fadeLeft">
              <div>
                <SectionHeading title="Who We Are" highlightedWord="We" align="left" />
                <div className="text-foreground space-y-4 leading-relaxed">
                  {aboutIntro.map((paragraph) => (
                    <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                  ))}
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
        </div>
      </section>

      {/* Mission */}
      <section className="bg-secondary-bg py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4">
          <SectionHeading title="Our Mission" highlightedWord="Mission" />
          <ul className="space-y-4">
            {mission.map((statement) => (
              <li key={statement.slice(0, 32)} className="flex gap-4 rounded-lg bg-white p-6">
                <Target className="text-primary size-6 shrink-0" aria-hidden="true" />
                <p className="text-foreground leading-relaxed">{statement}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Services overview */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading title="What We Do" highlightedWord="Do" subtitle={aboutServicesSummary} />
          <ServiceCards />
        </div>
      </section>

      {/* Impact: target of the "Our Impact" buttons */}
      <section id="impact" className="scroll-mt-24">
        <CounterSection
          items={impactStats}
          backgroundImage="/images/nehemiah/hero-awareness-day.jpg"
        />
      </section>

      <CTASection {...SUPPORT_CTA} />
    </>
  );
}
