import type { Locale } from './config';
import { loc, locProvisional, resolve, type Localized, type Resolved } from './localized';

/**
 * Interface text shared across the site (navigation, buttons, footer, form labels).
 *
 * Amharic provenance:
 *  - `loc(en, am)`            -> taken verbatim from "website content.docx" (approved).
 *  - `locProvisional(en, am)` -> short interface label proposed by the development team,
 *                                pending native-speaker review (see NAC-LOCALIZATION-REPORT.md).
 *  - `loc(en)`                -> no approved Amharic yet; English is shown, tagged lang="en".
 */
export const ui = {
  // Primary navigation / footer links
  'nav.home': locProvisional('Home', 'መነሻ'),
  'nav.about': loc('About Us', 'ስለ እኛ'),
  'nav.services': locProvisional('Our Services', 'አገልግሎቶቻችን'),
  'nav.events': locProvisional('Events', 'ዝግጅቶች'),
  'nav.blog': locProvisional('Blog', 'ብሎግ'),
  'nav.contact': locProvisional('Contact', 'ያግኙን'),
  'nav.gallery': locProvisional('Gallery', 'ጋለሪ'),
  'nav.volunteer': locProvisional('Volunteer', 'በጎ ፈቃደኛ'),
  'nav.donate': locProvisional('Donate', 'ልገሳ'),
  'nav.faq': locProvisional('FAQ', 'ተደጋጋሚ ጥያቄዎች'),

  // Calls to action approved in the content document
  'cta.support': loc('Support Nehemiah', 'ነህምያን ይደግፉ'),
  'cta.learnMore': loc('Learn More', 'ተጨማሪ ይወቁ'),
  'cta.whatWeDo': loc('What We Do', 'የምንሰራው ምንድን ነው?'),
  'cta.ourImpact': loc('Our Impact', 'ያስመዘገብነው ውጤት'),
  'cta.volunteerWithUs': loc('Volunteer With Us', 'ከእኛ ጋር በበጎ ፈቃድ ይሳተፉ'),
  'cta.partnerWithUs': loc('Partner With Us', 'ከእኛ ጋር አጋር ይሁኑ'),
  'cta.supportMission': loc('Support Our Mission', 'ተልዕኳችንን ይደግፉ'),

  // Footer
  'footer.support': locProvisional('Support', 'ድጋፍ'),
  'footer.discover': locProvisional('Discover', 'ይወቁ'),
  'footer.connect': locProvisional('Connect', 'ተገናኙ'),
  'footer.contactUs': locProvisional('Contact Us', 'ያግኙን'),
  'footer.visit': locProvisional('Visit the Center', 'ማዕከሉን ይጎብኙ'),
  'footer.social': locProvisional('Social Media', 'ማህበራዊ ሚዲያ'),
  'footer.navLabel': locProvisional('Footer navigation', 'የግርጌ ምናሌ'),

  // Common interface text
  'common.skipToContent': locProvisional('Skip to main content', 'ወደ ዋናው ይዘት ዝለል'),
  'common.menu': locProvisional('Menu', 'ምናሌ'),
  'common.openMenu': locProvisional('Open menu', 'ምናሌ ክፈት'),
  'common.closeMenu': locProvisional('Close menu', 'ምናሌ ዝጋ'),
  'common.mainNavigation': locProvisional('Main navigation', 'ዋና ምናሌ'),
  'common.language': locProvisional('Language', 'ቋንቋ'),
  'common.breadcrumb': locProvisional('Breadcrumb', 'የገጽ መንገድ'),
  'common.readMore': locProvisional('Read more', 'ተጨማሪ ያንብቡ'),
  'common.backToTop': locProvisional('Back to top', 'ወደ ላይ ተመለስ'),
  'common.followUs': locProvisional('Follow us', 'ይከተሉን'),
  'common.openInMaps': locProvisional('Open in Google Maps', 'በጉግል ካርታ ክፈት'),
  'common.opensInNewTab': locProvisional('(opens in a new tab)', '(በአዲስ ትር ይከፈታል)'),
  'common.contactDetails': locProvisional('Contact details', 'የመገናኛ መረጃ'),

  // Contact details labels
  'contact.email': locProvisional('Email', 'ኢሜይል'),
  'contact.phone': locProvisional('Phone', 'ስልክ'),
  'contact.address': locProvisional('Address', 'አድራሻ'),
  'contact.hours': locProvisional('Opening hours', 'የሥራ ሰዓት'),

  // Contact form labels
  'form.name': locProvisional('Your name', 'ስምዎ'),
  'form.email': locProvisional('Email address', 'ኢሜይል አድራሻ'),
  'form.subject': locProvisional('Subject', 'ርዕስ'),
  'form.message': locProvisional('Message', 'መልዕክት'),
  'form.send': locProvisional('Write my email', 'ኢሜይሌን አዘጋጅ'),

  // Not found
  'notFound.title': locProvisional('Page not found', 'ገጹ አልተገኘም'),
  'notFound.back': locProvisional('Back to home', 'ወደ መነሻ ተመለስ'),
} satisfies Record<string, Localized>;

export type UiKey = keyof typeof ui;

export function tr(key: UiKey, locale: Locale): Resolved<string> {
  return resolve(ui[key], locale);
}

/** Plain string, for attributes and non-JSX use. */
export function t(key: UiKey, locale: Locale): string {
  return tr(key, locale).value;
}
