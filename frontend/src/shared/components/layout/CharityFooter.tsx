import Link from 'next/link';
import { ChevronRight, Clock, Mail, MapPinned, Phone } from 'lucide-react';
import SocialLinks from '@/shared/components/common/SocialLinks';
import { FOOTER_LINK_GROUPS, SITE_CONFIG } from '@/shared/lib/constants';

export function CharityFooter() {
  return (
    <footer>
      <div className="bg-footer-bg">
        <div className="mx-auto max-w-7xl px-4 py-16">
          {/* Row 1: About + link groups */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="mb-4 font-serif text-lg text-white">{SITE_CONFIG.name}</h3>
              <p className="text-footer-text text-sm leading-relaxed">{SITE_CONFIG.footerAbout}</p>
            </div>

            {FOOTER_LINK_GROUPS.map((group) => (
              <div key={group.title}>
                <h3 className="mb-4 font-serif text-lg text-white">{group.title}</h3>
                <ul className="space-y-1">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-footer-text hover:text-primary flex items-center gap-2 py-1 text-sm transition"
                      >
                        <ChevronRight className="size-3" aria-hidden="true" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                {group.title === 'Connect' && (
                  <SocialLinks className="mt-4" linkClassName="text-footer-text" />
                )}
              </div>
            ))}
          </div>

          {/* Row 2: Contact details */}
          <div className="mt-12 grid grid-cols-1 gap-6 border-t border-white/10 pt-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-start gap-3">
              <MapPinned className="text-primary mt-0.5 size-5 shrink-0" aria-hidden="true" />
              <p className="text-footer-text text-sm">{SITE_CONFIG.address}</p>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="text-primary mt-0.5 size-5 shrink-0" aria-hidden="true" />
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="text-footer-text hover:text-primary text-sm break-all transition"
              >
                {SITE_CONFIG.email}
              </a>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="text-primary mt-0.5 size-5 shrink-0" aria-hidden="true" />
              <div className="text-footer-text flex flex-col text-sm">
                {SITE_CONFIG.phones.map((phone) => (
                  <a
                    key={phone.tel}
                    href={`tel:${phone.tel}`}
                    className="hover:text-primary transition"
                  >
                    {phone.display}
                  </a>
                ))}
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="text-primary mt-0.5 size-5 shrink-0" aria-hidden="true" />
              <div className="text-footer-text text-sm">
                {SITE_CONFIG.hours.map((slot) => (
                  <p key={slot.days}>
                    {slot.days}: {slot.time}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-footer-bg border-t border-white/10 py-6">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <p className="text-footer-text text-sm">
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
