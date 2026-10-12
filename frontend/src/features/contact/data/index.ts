import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { createElement } from 'react';
import { SITE_CONFIG } from '@/shared/lib/constants';
import type { ContactInfoItem } from '@/features/contact/types';

export const contactInfo: ContactInfoItem[] = [
  {
    icon: createElement(Phone, { className: 'size-6' }),
    title: 'Phone',
    lines: SITE_CONFIG.phones.map((phone) => ({
      text: phone.display,
      href: `tel:${phone.tel}`,
    })),
  },
  {
    icon: createElement(Mail, { className: 'size-6' }),
    title: 'Email',
    lines: [{ text: SITE_CONFIG.email, href: `mailto:${SITE_CONFIG.email}` }],
  },
  {
    icon: createElement(MapPin, { className: 'size-6' }),
    title: 'Address',
    lines: [{ text: SITE_CONFIG.address, href: '#visit' }],
  },
  {
    icon: createElement(Clock, { className: 'size-6' }),
    title: 'Opening Hours',
    lines: SITE_CONFIG.hours.map((slot) => ({ text: `${slot.days}: ${slot.time}` })),
  },
];
