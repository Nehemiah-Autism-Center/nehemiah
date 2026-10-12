import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/shared/lib/api-client';
import type { ContactFormData } from '@/features/contact/schemas/contact.schema';
import type { ContactSubmissionRequest } from '@/features/contact/types/contact.types';

function toRequest({ subject, ...rest }: ContactFormData): ContactSubmissionRequest {
  return subject ? { ...rest, subject } : rest;
}

async function submitContactMessage(data: ContactFormData): Promise<void> {
  await apiClient.post('/public/contact', toRequest(data));
}

export function useSubmitContact() {
  return useMutation({ mutationFn: submitContactMessage });
}
