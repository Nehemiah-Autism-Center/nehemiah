import Link from 'next/link';
import PageBanner from '@/shared/components/common/PageBanner';
import SectionHeading from '@/shared/components/common/SectionHeading';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/ui/accordion';
import { faqCategories, faqIntro } from '@/features/faq/data';

export default function FaqPage() {
  return (
    <>
      <PageBanner
        title="Frequently Asked Questions"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'FAQ' }]}
        backgroundImage="/images/nehemiah/visit-welcome.jpg"
      />

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4">
          <SectionHeading
            title="Common Questions"
            highlightedWord="Questions"
            subtitle={faqIntro}
          />

          <div className="space-y-10">
            {faqCategories.map((category) => (
              <div key={category.title}>
                <h2 className="text-heading mb-2 font-serif text-2xl font-medium">
                  {category.title}
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  {category.items.map((faq) => (
                    <AccordionItem key={faq.question} value={faq.question}>
                      <AccordionTrigger className="text-heading font-serif text-base font-semibold">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-foreground leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>

          <p className="text-foreground mt-12 text-center">
            Still have a question?{' '}
            <Link href="/contact" className="text-primary font-semibold hover:underline">
              Contact us
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
