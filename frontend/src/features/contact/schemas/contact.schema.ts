import { z } from 'zod';
import { CONTACT_COPY } from '@/features/contact/data';

// Validation messages are English only (no approved Amharic yet); the form tags them lang="en".
export const contactSchema = z.object({
  name: z.string().trim().min(2, CONTACT_COPY.validation.name.en),
  email: z.string().trim().email(CONTACT_COPY.validation.email.en),
  subject: z.string().trim().min(3, CONTACT_COPY.validation.subject.en),
  message: z.string().trim().min(10, CONTACT_COPY.validation.message.en),
});

export type ContactFormData = z.infer<typeof contactSchema>;
