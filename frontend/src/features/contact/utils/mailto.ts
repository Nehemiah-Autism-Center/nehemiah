import type { ContactFormData } from '@/features/contact/schemas/contact.schema';

/** Some mail clients silently truncate very long mailto: links. */
export const MAX_MAILTO_LENGTH = 1800;

/** Body of the prepared email: the message, then who it is from. */
export function composeBody({
  name,
  email,
  message,
}: Pick<ContactFormData, 'name' | 'email' | 'message'>): string {
  return `${message}\n\n—\n${name}\n${email}`;
}

/**
 * Builds a `mailto:` link. Spaces are encoded as %20 (never "+"), which mail clients require.
 * This is the contact form's interim delivery method: no backend endpoint exists yet, so the
 * visitor's own email app sends the message and the website never handles it.
 */
export function buildMailtoUrl(to: string, data: ContactFormData): string {
  const subject = encodeURIComponent(data.subject);
  const body = encodeURIComponent(composeBody(data));
  return `mailto:${to}?subject=${subject}&body=${body}`;
}
