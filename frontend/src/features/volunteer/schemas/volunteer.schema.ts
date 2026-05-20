import { z } from 'zod';

export const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
] as const;

export const volunteerSchema = z.object({
  // Personal Info
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  gender: z.enum(['Male', 'Female', 'Prefer not to say'], { message: 'Please select a gender' }),
  age: z
    .string()
    .min(1, 'Age is required')
    .refine((val) => {
      const n = Number(val);
      return !isNaN(n) && n >= 16 && n <= 80;
    }, 'Age must be between 16 and 80'),
  address: z.string().min(3, 'Address is required'),
  phone: z.string().min(9, 'Phone number must be at least 9 digits').max(15, 'Phone number too long'),

  // Education & Employment
  educationBackground: z.string().min(2, 'Please describe your education background'),
  occupationStatus: z.enum(['Student', 'Employed', 'Self-employed', 'Other'], {
    message: 'Please select your occupation status',
  }),
  institutionName: z.string().optional(),

  // Volunteering Details
  reasonForVolunteering: z.string().min(20, 'Please provide at least 20 characters explaining your motivation'),
  volunteeringFromDate: z.string().min(1, 'Start date is required'),
  volunteeringToDate: z.string().min(1, 'End date is required'),
  volunteeringDays: z
    .array(z.enum(DAYS_OF_WEEK))
    .min(1, 'Please select at least one day'),
  volunteeringTimeFrom: z.string().min(1, 'Start time is required'),
  volunteeringTimeTo: z.string().min(1, 'End time is required'),

  // Agreement
  agreementAccepted: z.boolean().refine((val) => val === true, {
    message: 'You must accept the volunteer agreement to proceed',
  }),
});

export type VolunteerFormData = z.infer<typeof volunteerSchema>;
