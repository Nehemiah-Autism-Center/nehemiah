'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail } from 'lucide-react';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';
import { Label } from '@/shared/components/ui/label';
import { useLocale } from '@/shared/i18n/LocaleProvider';
import { LocalizedText, UiText } from '@/shared/i18n/LocalizedText';
import { t, type UiKey } from '@/shared/i18n/ui';
import { ORGANIZATION } from '@/shared/content/organization';
import { CONTACT_COPY } from '@/features/contact/data';
import { contactSchema, type ContactFormData } from '@/features/contact/schemas/contact.schema';
import { MAX_MAILTO_LENGTH, buildMailtoUrl } from '@/features/contact/utils/mailto';

type Status = 'idle' | 'prepared' | 'too-long';

const FIELD = 'h-11 md:text-base';

/**
 * Contact form. There is no backend endpoint, so on submit it validates, then opens the
 * visitor's own email app with the message prepared — and says so. It never claims a message
 * was sent, and nothing is submitted to or stored by this website.
 */
export function ContactForm({ defaultSubject = '' }: { defaultSubject?: string }) {
  const locale = useLocale();
  const [status, setStatus] = useState<Status>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', subject: defaultSubject, message: '' },
  });

  const onSubmit = (data: ContactFormData) => {
    const url = buildMailtoUrl(ORGANIZATION.email, data);
    if (url.length > MAX_MAILTO_LENGTH) {
      setStatus('too-long');
      return;
    }
    setStatus('prepared');
    window.location.assign(url);
  };

  const fields: {
    name: keyof ContactFormData;
    label: UiKey;
    type?: string;
    autoComplete?: string;
  }[] = [
    { name: 'name', label: 'form.name', autoComplete: 'name' },
    { name: 'email', label: 'form.email', type: 'email', autoComplete: 'email' },
    { name: 'subject', label: 'form.subject' },
  ];

  const errorText = (message?: string) =>
    message ? (
      <p
        role="alert"
        // Validation messages are English only; tag them so screen readers pronounce them correctly.
        lang={locale === 'en' ? undefined : 'en'}
        className="text-destructive mt-1 text-sm font-semibold"
      >
        {message}
      </p>
    ) : null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <LocalizedText
        as="p"
        value={CONTACT_COPY.honestyNote}
        locale={locale}
        className="bg-secondary-bg rounded-md p-4 text-base"
      />

      {fields.map(({ name, label, type, autoComplete }) => (
        <div key={name}>
          <Label
            htmlFor={`contact-${name}`}
            className="text-heading mb-1.5 text-base font-semibold"
          >
            <UiText k={label} locale={locale} />
          </Label>
          <Input
            id={`contact-${name}`}
            type={type ?? 'text'}
            autoComplete={autoComplete}
            aria-invalid={errors[name] ? true : undefined}
            aria-describedby={errors[name] ? `contact-${name}-error` : undefined}
            className={FIELD}
            {...register(name)}
          />
          <div id={`contact-${name}-error`}>{errorText(errors[name]?.message)}</div>
        </div>
      ))}

      <div>
        <Label htmlFor="contact-message" className="text-heading mb-1.5 text-base font-semibold">
          <UiText k="form.message" locale={locale} />
        </Label>
        <Textarea
          id="contact-message"
          rows={6}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          className="min-h-36 md:text-base"
          {...register('message')}
        />
        <div id="contact-message-error">{errorText(errors.message?.message)}</div>
      </div>

      <button
        type="submit"
        className="bg-primary text-primary-foreground hover:bg-primary-hover inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-6 py-2.5 text-base font-semibold transition-colors"
      >
        <Mail aria-hidden="true" className="size-5" />
        <span>{t('form.send', locale)}</span>
      </button>

      <div role="status" aria-live="polite">
        {status === 'prepared' && (
          <LocalizedText
            as="p"
            value={CONTACT_COPY.preparedStatus}
            locale={locale}
            className="border-primary/40 bg-primary/5 text-heading rounded-md border p-4 text-base"
          />
        )}
        {status === 'too-long' && (
          <LocalizedText
            as="p"
            value={CONTACT_COPY.tooLong}
            locale={locale}
            className="border-destructive/40 bg-destructive/5 text-heading rounded-md border p-4 text-base"
          />
        )}
      </div>
    </form>
  );
}
