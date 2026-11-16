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
    <ul className="grid gap-6 md:grid-cols-3">
      {SERVICES.map((service) => {
        const Icon = ICONS[service.id];
        return (
          <li key={service.id} className="flex">
            <article
              data-service={service.id}
              className="flex w-full min-w-0 flex-col rounded-xl border bg-white p-6 shadow-sm"
            >
              <div className="bg-primary/10 text-primary mb-4 flex size-14 items-center justify-center rounded-full">
                <Icon aria-hidden="true" className="size-7" />
              </div>
              <LocalizedText
                as={headingLevel}
                value={service.name}
                locale={locale}
                className="text-heading font-serif text-xl font-semibold"
              />
              <LocalizedText
                as="p"
                value={service.description}
                locale={locale}
                className="mt-3 text-base"
              />
            </article>
          </li>
        );
      })}
    </ul>
  );
}
