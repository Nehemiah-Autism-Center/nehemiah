'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLocale } from '@/shared/i18n/LocaleProvider';
import { text } from '@/shared/i18n/localized';
import { ui, type UiKey } from '@/shared/i18n/ui';
import { ContactForm } from './ContactForm';

/**
 * /contact?topic=<key> pre-fills the subject with the matching approved button label, so
 * "Volunteer With Us" and "Partner With Us" lead somewhere that works today.
 */
const TOPIC_SUBJECT_KEYS: Record<string, UiKey> = {
  volunteer: 'cta.volunteerWithUs',
  partnership: 'cta.partnerWithUs',
};

function TopicAwareForm() {
  const locale = useLocale();
  const topic = useSearchParams().get('topic');
  const subjectKey = topic ? TOPIC_SUBJECT_KEYS[topic] : undefined;
  const defaultSubject = subjectKey ? text(ui[subjectKey], locale) : '';
  // `key` remounts the form if the topic changes so the new default is applied.
  return <ContactForm key={defaultSubject} defaultSubject={defaultSubject} />;
}

export function ContactFormWithTopic() {
  return (
    // useSearchParams needs a Suspense boundary in statically rendered pages.
    <Suspense fallback={<ContactForm />}>
      <TopicAwareForm />
    </Suspense>
  );
}
