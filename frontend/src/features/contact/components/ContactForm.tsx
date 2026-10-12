'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/shared/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';
import { SITE_CONFIG } from '@/shared/lib/constants';
import { useSubmitContact } from '@/features/contact/api/use-submit-contact';
import { contactSchema, type ContactFormData } from '@/features/contact/schemas/contact.schema';

const EMPTY_FORM: ContactFormData = { name: '', email: '', subject: '', message: '' };

export function ContactForm() {
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: EMPTY_FORM,
  });
  const submission = useSubmitContact();

  const onSubmit = (values: ContactFormData) => {
    // Clear the form only once the API has accepted the message; on failure the input is kept.
    submission.mutate(values, { onSuccess: () => form.reset(EMPTY_FORM) });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" autoComplete="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input placeholder="Enter subject (optional)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea placeholder="Write your message..." rows={6} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {submission.isSuccess && (
          <p role="status" className="rounded-md bg-green-50 p-4 text-sm text-green-800">
            Thank you, your message has been sent. We will get back to you soon.
          </p>
        )}
        {submission.isError && (
          <p role="alert" className="bg-destructive/10 text-destructive rounded-md p-4 text-sm">
            We could not send your message. Please try again in a moment, or email us at{' '}
            <a href={`mailto:${SITE_CONFIG.email}`} className="underline">
              {SITE_CONFIG.email}
            </a>
            .
          </p>
        )}

        <Button
          type="submit"
          size="lg"
          disabled={submission.isPending}
          className="hover:bg-primary-hover w-full rounded px-8 py-3 font-semibold text-white uppercase sm:w-auto"
        >
          {submission.isPending ? 'Sending…' : 'Send Message'}
        </Button>
      </form>
    </Form>
  );
}
