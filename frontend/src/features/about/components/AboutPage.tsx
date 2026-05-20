import PageBanner from '@/shared/components/common/PageBanner';
import SectionHeading from '@/shared/components/common/SectionHeading';
import AnimateOnScroll from '@/shared/components/common/AnimateOnScroll';
import HistoryTimeline from '@/shared/components/common/HistoryTimeline';
import CTASection from '@/shared/components/common/CTASection';
import SponsorLogos from '@/shared/components/common/SponsorLogos';
import TeamCard from '@/features/team/components/TeamCard';
import { teamMembers } from '@/features/team/data';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/ui/accordion';
import { sponsorLogos, faqs, timelineEvents } from '@/features/about/data';

export default function AboutPage() {
  return (
    <>
      {/* 1. Page Banner */}
      <PageBanner
        title="About Us"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About Us' }]}
      />

      {/* 2. History Timeline — 15 Years of Nehemiah */}
      <section className="py-20 overflow-hidden">
        <div className="mx-auto max-w-5xl px-4">
          <AnimateOnScroll animation="fadeUp">
            <SectionHeading
              title="15 Years of"
              highlightedWord="Impact"
              subtitle="From a small group of passionate advocates to a nationally recognized organization — explore the milestones that shaped Nehemiah's journey."
              align="center"
            />
          </AnimateOnScroll>
        </div>

        <div className="mx-auto mt-12 w-full max-w-5xl px-4 md:px-8">
          <HistoryTimeline events={timelineEvents} />
        </div>
      </section>

      {/* 3. Team Section */}
      <section className="bg-secondary-bg py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            title="Our"
            highlightedWord="Volunteers"
            subtitle="Meet the dedicated individuals who donate their time and skills to make our mission possible."
            align="center"
          />
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {teamMembers.map((member) => (
              <AnimateOnScroll key={member.slug} animation="fadeUp">
                <TeamCard {...member} />
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CTA Section */}
      <CTASection
        title="Join with us to create an inclusive Ethiopia for children with Autism"
        buttonLabel="Join With Us"
        buttonHref="/contact"
      />

      {/* 5. FAQ Section */}
      <section id="faq" className="py-20">
        <div className="mx-auto max-w-4xl px-4">
          <SectionHeading title="Frequently Asked" highlightedWord="Questions" align="center" />

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="font-serif text-base font-semibold text-heading">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="leading-relaxed text-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* 6. Sponsor Logos */}
      <SponsorLogos logos={sponsorLogos} />
    </>
  );
}
