// import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronRight,
  Facebook,
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
      <div className="relative bg-footer-bg ">
        {/* Background Image
        <Image
          src="/images/footer_bg.jpg"
          alt=""
          fill
          className="object-cover opacity-10"
          aria-hidden="true"
        /> */}

        <div className="relative mx-auto max-w-7xl px-4 py-10 md:py-16">
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
                      className="flex items-center gap-2 py-1 text-sm text-footer-text transition hover:text-primary"
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
                      className="flex items-center gap-2 py-1 text-sm text-footer-text transition hover:text-primary"
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
                      className="flex items-center gap-2 py-1 text-sm text-footer-text transition hover:text-primary"
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
              <p className="text-sm leading-relaxed text-footer-text">{SITE_CONFIG.footerAbout}</p>
            </div>
          </div>

          {/* Row 2: Contact Info */}
          <div
            className="mt-10 grid grid-cols-1 gap-6 border-t border-white/10 pt-8 sm:grid-cols-2 lg:grid-cols-4 md:mt-12"
          >
            {/* Address */}
            <div className="flex items-start gap-3">
              <MapPinned className="mt-0.5 size-5 shrink-0 text-primary" />
              <p className="text-sm text-footer-text break-words min-w-0">{SITE_CONFIG.address}</p>
            </div>

            {/* Email */}
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 size-5 shrink-0 text-primary" />
              <div className="text-sm text-footer-text min-w-0">
                <a href={`mailto:${SITE_CONFIG.email}`} className="transition hover:text-primary break-all">
                  {SITE_CONFIG.email}
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 size-5 shrink-0 text-primary" />
              <div className="text-sm text-footer-text">
                <a href={`tel:${SITE_CONFIG.phone}`} className="transition hover:text-primary">
                  {SITE_CONFIG.phone}
                </a>
              </div>
            </div>

            {/* Social */}
            <div className="flex items-start gap-3">
              <Share2 className="mt-0.5 size-5 shrink-0 text-primary" />
              <div>
                <p className="mb-2 text-sm text-footer-text">Follow Us</p>
                <div className="flex items-center gap-3">
                  {/* Facebook */}
                  <a
                    href={SITE_CONFIG.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="text-footer-text transition hover:text-primary"
                  >
                    <Facebook className="size-4" />
                  </a>
                  {/* Instagram */}
                  <a
                    href={SITE_CONFIG.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="text-footer-text transition hover:text-primary"
                  >
                    <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </a>
                  {/* LinkedIn */}
                  <a
                    href={SITE_CONFIG.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="text-footer-text transition hover:text-primary"
                  >
                    <Linkedin className="size-4" />
                  </a>
                  {/* X (Twitter) */}
                  <a
                    href={SITE_CONFIG.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X (Twitter)"
                    className="text-footer-text transition hover:text-primary"
                  >
                    <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.732-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  {/* TikTok */}
                  <a
                    href={SITE_CONFIG.social.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok"
                    className="text-footer-text transition hover:text-primary"
                  >
                    <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.17 8.17 0 004.78 1.52V6.82a4.85 4.85 0 01-1.01-.13z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-white/10 bg-footer-bg py-6">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <p className="text-sm text-footer-text">
            Copyright &copy; 2024, All Right Reserved - {SITE_CONFIG.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
