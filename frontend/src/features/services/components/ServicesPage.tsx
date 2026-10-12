import Image from 'next/image';
import PageBanner from '@/shared/components/common/PageBanner';
import SectionHeading from '@/shared/components/common/SectionHeading';
import CTASection from '@/shared/components/common/CTASection';
import ServiceCards from '@/features/services/components/ServiceCards';
import { servicesHeading, servicesIntro } from '@/features/services/data';
import { SUPPORT_CTA } from '@/shared/lib/constants';

export default function ServicesPage() {
  return (
    <>
      <PageBanner
        title="Our Services"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Our Services' }]}
        backgroundImage="/images/nehemiah/services.jpg"
      />

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-12 grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <SectionHeading title={servicesHeading} highlightedWord="Services" align="left" />
              <p className="text-foreground leading-relaxed">{servicesIntro}</p>
            </div>
            <Image
              src="/images/nehemiah/services.jpg"
              alt="Children working on puzzles at an activity table"
              width={1200}
              height={800}
              className="w-full rounded-lg shadow-lg"
            />
          </div>
          <ServiceCards />
        </div>
      </section>

      <CTASection {...SUPPORT_CTA} />
    </>
  );
}
