/** Body accepted by POST /public/contact (backend CreateContactSubmissionDto). */
export interface ContactSubmissionRequest {
  name: string;
  email: string;
  subject?: string;
  message: string;
}
