import type { Locale } from '@/shared/i18n/config';
import { LocalizedText } from '@/shared/i18n/LocalizedText';
import { ui } from '@/shared/i18n/ui';
import { PAGE_BANNERS } from '@/shared/content/media';
import { PageBanner } from '@/shared/components/common/PageBanner';
import { Section } from '@/shared/components/common/Section';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/ui/accordion';
import { FAQ_CATEGORIES, FAQ_INTRO } from '@/features/faq/data';

/**
 * Questions are grouped by category and use the Radix accordion, which provides the full
 * keyboard pattern (Tab to a question, Enter/Space to open, Arrow keys/Home/End between questions)
 * and correct aria-expanded / aria-controls wiring.
 */
export function FaqPage({ locale }: { locale: Locale }) {
  return (
    <>
      <PageBanner
        locale={locale}
        title={ui['nav.faq']}
        trail={[{ label: ui['nav.faq'] }]}
        image={PAGE_BANNERS.faq}
      />

      <Section labelledBy="faq-intro">
        <div className="mx-auto max-w-3xl">
          <LocalizedText
            as="p"
            id="faq-intro"
            value={FAQ_INTRO}
            locale={locale}
            className="mb-10 text-lg"
          />

          <div className="space-y-12">
            {FAQ_CATEGORIES.map((category) => {
              const headingId = `faq-${category.id}`;
              return (
                <section key={category.id} aria-labelledby={headingId}>
                  <LocalizedText
                    as="h2"
                    id={headingId}
                    value={category.title}
                    locale={locale}
                    className="text-heading font-serif text-2xl"
                  />
                  <div aria-hidden="true" className="bg-primary mt-3 mb-5 h-[3px] w-10" />
                  <Accordion
                    type="single"
                    collapsible
                    className="border-t-primary rounded-[5px] border border-t-[3px] bg-white px-5 shadow-sm"
                  >
                    {category.items.map((item) => (
                      <AccordionItem key={item.id} value={item.id}>
                        <AccordionTrigger className="text-heading data-[state=open]:text-green-ink [&>svg]:text-green-display min-h-12 text-lg font-semibold">
                          <LocalizedText value={item.question} locale={locale} />
                        </AccordionTrigger>
                        <AccordionContent className="text-base">
                          <LocalizedText as="p" value={item.answer} locale={locale} />
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </section>
              );
            })}
          </div>
        </div>
      </Section>
    </>
  );
}
