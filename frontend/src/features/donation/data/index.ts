import { loc } from '@/shared/i18n/localized';

/**
 * "Donations message" from the document. There is no payment integration, so this page makes no
 * promise of one: it says online donations are not available yet and points to real alternatives.
 * English only — the document supplies no Amharic for it.
 */
export const DONATION_MESSAGE = {
  heading: loc('Online donations are coming soon'),
  body: loc(
    'While online donations are coming soon, support us by volunteering, attending events, or contacting our Center today.',
  ),
} as const;
