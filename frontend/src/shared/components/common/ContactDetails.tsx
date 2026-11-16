import type { Locale } from '@/shared/i18n/config';
import { LocalizedText } from '@/shared/i18n/LocalizedText';
import { ORGANIZATION } from '@/shared/content/organization';
import { cn } from '@/shared/lib/utils';

// min-h-11 (44px): tap-to-call and email links must be comfortable touch targets, not 20px text lines.
const LINK =
  'inline-flex min-h-11 items-center underline-offset-4 hover:underline [overflow-wrap:anywhere]';

export function EmailLink({ className }: { className?: string }) {
  return (
    <a href={`mailto:${ORGANIZATION.email}`} className={cn(LINK, className)}>
      {ORGANIZATION.email}
    </a>
  );
}

/** Every public phone number as a tap-to-call link. */
export function PhoneLinks({
  className,
  itemClassName,
}: {
  className?: string;
  itemClassName?: string;
}) {
  return (
    <ul className={className}>
      {ORGANIZATION.phones.map((phone) => (
        <li key={phone.tel} className={itemClassName}>
          <a href={`tel:${phone.tel}`} className={cn(LINK, 'whitespace-nowrap')}>
            {phone.display}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function AddressText({ locale, className }: { locale: Locale; className?: string }) {
  return (
    <LocalizedText as="span" value={ORGANIZATION.address} locale={locale} className={className} />
  );
}

/** Opening hours as a definition list: days -> time. */
export function HoursList({ locale, className }: { locale: Locale; className?: string }) {
  return (
    <dl className={cn('space-y-1', className)}>
      {ORGANIZATION.hours.map((row) => (
        <div key={row.days.en} className="flex flex-wrap gap-x-2">
          <LocalizedText as="dt" value={row.days} locale={locale} className="font-semibold" />
          <LocalizedText as="dd" value={row.time} locale={locale} />
        </div>
      ))}
    </dl>
  );
}
