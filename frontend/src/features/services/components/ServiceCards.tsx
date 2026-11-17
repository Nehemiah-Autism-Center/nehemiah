import { Brain, MessageCircle, Utensils, type LucideIcon } from 'lucide-react';
import type { Locale } from '@/shared/i18n/config';
import { LocalizedText } from '@/shared/i18n/LocalizedText';
import { SERVICES, type ServiceId } from '@/shared/content/services';

const ICONS: Record<ServiceId, LucideIcon> = {
  aba: Brain,
  speech: MessageCircle,
  food: Utensils,
};

/** The three principal therapies. Reads from the single SERVICES list so every page agrees. */
export function ServiceCards({
  locale,
  headingLevel = 'h3',
}: {
  locale: Locale;
  headingLevel?: 'h2' | 'h3';
}) {
  return (
    <ul className="grid gap-8 md:grid-cols-3">
      {SERVICES.map((service) => {
        const Icon = ICONS[service.id];
        return (
          <li key={service.id} className="flex">
            <article
              data-service={service.id}
              className="border-t-primary flex w-full min-w-0 flex-col rounded-[5px] border border-t-4 bg-white p-8 text-center shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="bg-primary text-primary-foreground mx-auto mb-5 flex size-16 items-center justify-center rounded-full">
                <Icon aria-hidden="true" className="size-8" />
              </div>
              <LocalizedText
                as={headingLevel}
                value={service.name}
                locale={locale}
                className="text-heading font-serif text-[22px] leading-tight font-semibold md:flex md:min-h-[3.25rem] md:items-center md:justify-center"
              />
              <LocalizedText
                as="p"
                value={service.description}
                locale={locale}
                className="mt-4 text-base"
              />
            </article>
          </li>
        );
      })}
    </ul>
  );
}
