import { z } from 'zod';

// Limits mirror the backend CreateContactSubmissionDto so the API never rejects what passes here.
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be at most 100 characters'),
  email: z
    .email('Please enter a valid email address')
    .max(255, 'Email must be at most 255 characters'),
  subject: z.string().trim().max(200, 'Subject must be at most 200 characters'),
  message: z
    .string()
    .trim()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message must be at most 5000 characters'),
});

export type ContactFormData = z.infer<typeof contactSchema>;
