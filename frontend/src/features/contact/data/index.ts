import { loc } from '@/shared/i18n/localized';

/**
 * "Location block" copy, verbatim from "website content.docx" (Homepage).
 * The Amharic text spells the area "አለማየሁ ሜዳ" (Alemayehu Meda) while the address elsewhere in the
 * document says "አልማዝዬ ሜዳ" (Almazeye Meda); both are kept as supplied and logged for the
 * organisation to settle (NAC-CONTENT-APPROVAL-REGISTER.md, AM-05).
 */
export const LOCATION = {
  heading: loc('Visit Nehemiah Autism Center', 'ነህምያ ኦቲዝም ማዕከልን ይጎብኙ'),
  body: loc(
    'Nehemiah Autism Center is located in Kera, Alemazeye Meda, Addis Ababa, Ethiopia. Visit us to learn more about our services, meet our team, and discover how we support autistic children and their families.',
    'ነህምያ ኦቲዝም ማዕከል በአዲስ አበባ፣ ቄራ፣ አለማየሁ ሜዳ ይገኛል። ወደ ማዕከላችን በመምጣት ስለምንሰጣቸው አገልግሎቶች የበለጠ ለማወቅ፣ ከቡድናችን ጋር ለመተዋወቅ እና ኦቲዝም ያላቸውን ልጆችና ቤተሰቦቻቸውን እንዴት እንደምንደግፍ ለማወቅ ይጎብኙን።',
  ),
} as const;

/**
 * Contact form copy. English only: the document supplies no Amharic for it, so Amharic pages
 * show these sentences in English tagged lang="en" (labels use the shared interface dictionary).
 */
export const CONTACT_COPY = {
  intro: loc('Write to us, call the Center, or visit during opening hours.'),
  formHeading: loc('Send us a message'),
  honestyNote: loc(
    'This form opens your own email app with the message ready to send. Nothing is sent from this website, and nothing is stored here.',
  ),
  preparedStatus: loc(
    'Your email app should now be open with your message ready. It has not been sent yet — please press Send in your email app. If nothing opened, email us directly at the address on this page.',
  ),
  tooLong: loc(
    'Your message is long and may be cut off by some email apps. Please shorten it or email us directly.',
  ),
  validation: {
    name: loc('Please enter your name (at least 2 characters).'),
    email: loc('Please enter a valid email address.'),
    subject: loc('Please enter a subject (at least 3 characters).'),
    message: loc('Please write a message (at least 10 characters).'),
  },
  socialHeading: loc('Follow us'),
} as const;
