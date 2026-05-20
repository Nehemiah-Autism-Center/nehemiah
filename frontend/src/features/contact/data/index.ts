import { Phone, MapPin, Clock } from 'lucide-react';
import { createElement } from 'react';
import { SITE_CONFIG } from '@/shared/lib/constants';

export const contactInfo = [
  {
    icon: createElement(Phone, { className: 'size-6' }),
    title: 'Phone Number',
    text: SITE_CONFIG.phone,
  },
  {
    icon: createElement(MapPin, { className: 'size-6' }),
    title: 'Office Address',
    text: SITE_CONFIG.address,
  },
  {
    icon: createElement(Clock, { className: 'size-6' }),
    title: 'Working Hours',
    text: `Mon - Fri: ${SITE_CONFIG.hours}`,
  },
];
