import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronRight,
  Facebook,
  Twitter,
  Linkedin,
  MapPinned,
  Mail,
  Phone,
  Share2,
} from 'lucide-react';
import { SITE_CONFIG } from '@/shared/lib/constants';

export function CharityFooter() {
  return (
    <footer>
      {/* Footer Widget Area */}
      <div className="bg-footer-bg relative">
        {/* Background Image */}
        <Image
          src="/images/footer_bg.jpg"
          alt=""
          fill
          className="object-cover opacity-10"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl px-4 py-16">
          {/* Row 1: Link Columns */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Organization */}
            <div>
              <h3 className="mb-4 font-serif text-lg text-white">Organization</h3>
              <ul className="space-y-1">
                {SITE_CONFIG.footerLinks.organization.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-footer-text hover:text-primary flex items-center gap-2 py-1 text-sm transition"
                    >
                      <ChevronRight className="size-3" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="mb-4 font-serif text-lg text-white">Support</h3>
              <ul className="space-y-1">
                {SITE_CONFIG.footerLinks.support.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-footer-text hover:text-primary flex items-center gap-2 py-1 text-sm transition"
                    >
                      <ChevronRight className="size-3" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Discover */}
            <div>
              <h3 className="mb-4 font-serif text-lg text-white">Discover</h3>
              <ul className="space-y-1">
                {SITE_CONFIG.footerLinks.discover.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-footer-text hover:text-primary flex items-center gap-2 py-1 text-sm transition"
                    >
                      <ChevronRight className="size-3" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* About */}
            <div>
              <h3 className="mb-4 font-serif text-lg text-white">About</h3>
              <p className="text-footer-text text-sm leading-relaxed">{SITE_CONFIG.footerAbout}</p>
            </div>
          </div>

          {/* Row 2: Contact Info */}
          <div className="mt-12 grid grid-cols-1 gap-6 border-t border-white/10 pt-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Address */}
            <div className="flex items-start gap-3">
              <MapPinned className="text-primary mt-0.5 size-5 shrink-0" />
              <p className="text-footer-text text-sm">{SITE_CONFIG.address}</p>
            </div>

            {/* Email */}
            <div className="flex items-start gap-3">
              <Mail className="text-primary mt-0.5 size-5 shrink-0" />
              <div className="text-footer-text text-sm">
                <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-primary transition">
                  {SITE_CONFIG.email}
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-3">
              <Phone className="text-primary mt-0.5 size-5 shrink-0" />
              <div className="text-footer-text text-sm">
                <a href={`tel:${SITE_CONFIG.phone}`} className="hover:text-primary transition">
                  {SITE_CONFIG.phone}
                </a>
              </div>
            </div>

            {/* Social */}
            <div className="flex items-start gap-3">
              <Share2 className="text-primary mt-0.5 size-5 shrink-0" />
              <div>
                <p className="text-footer-text mb-2 text-sm">Spread The Words</p>
                <div className="flex items-center gap-3">
                  <a
                    href={SITE_CONFIG.social.facebook}
                    aria-label="Facebook"
                    className="text-footer-text hover:text-primary transition"
                  >
                    <Facebook className="size-4" />
                  </a>
                  <a
                    href={SITE_CONFIG.social.twitter}
                    aria-label="Twitter"
                    className="text-footer-text hover:text-primary transition"
                  >
                    <Twitter className="size-4" />
                  </a>
                  <a
                    href={SITE_CONFIG.social.linkedin}
                    aria-label="LinkedIn"
                    className="text-footer-text hover:text-primary transition"
                  >
                    <Linkedin className="size-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-footer-bg border-t border-white/10 py-6">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <p className="text-footer-text text-sm">
            Copyright &copy; 2024, All Right Reserved - Nehemiah
          </p>
        </div>
      </div>
    </footer>
  );
}
