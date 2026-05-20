'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Phone,
  MapPin,
  Clock,
  Facebook,
  Linkedin,
  ChevronRight,
  ChevronDown,
  Menu,
  Globe,
} from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { NAV_ITEMS, SITE_CONFIG, type NavItem } from '@/shared/lib/constants';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/shared/components/ui/sheet';

export function CharityHeader() {
  const [isSticky, setIsSticky] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [lang, setLang] = useState<'en' | 'am'>('en');

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Force default to English and prevent sticky translations across reloads
    document.cookie = 'googtrans=/en/en; path=/; domain=' + window.location.hostname;
    document.cookie = 'googtrans=/en/en; path=/;';

    // Initialize Google Translate
    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);

      ; (window as any).googleTranslateElementInit = () => {
        new (window as any).google.translate.TranslateElement(
          { pageLanguage: 'en', includedLanguages: 'en,am', autoDisplay: false },
          'google_translate_element'
        );
      };
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeLanguage = useCallback((langCode: 'en' | 'am') => {
    setLang(langCode);
    const selectField = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
    if (selectField) {
      selectField.value = langCode;
      selectField.dispatchEvent(new Event('change'));
    }
  }, []);

  const toggleExpanded = useCallback((label: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(label)) {
        next.delete(label);
      } else {
        next.add(label);
      }
      return next;
    });
  }, []);

  return (
    <header className="w-full" style={{ overflowX: 'clip' }}>
      <div id="google_translate_element"></div>
      {/* Tier 1: Top Bar */}
      <div className="hidden w-full bg-topbar-bg text-white md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
          <div className="flex items-center gap-3">
            {/* Facebook */}
            <a
              href={SITE_CONFIG.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="transition hover:text-primary"
            >
              <Facebook className="size-4" />
            </a>
            {/* Instagram */}
            <a
              href={SITE_CONFIG.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="transition hover:text-primary"
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
              className="transition hover:text-primary"
            >
              <Linkedin className="size-4" />
            </a>
            {/* X (Twitter) */}
            <a
              href={SITE_CONFIG.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className="transition hover:text-primary"
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
              className="transition hover:text-primary"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.17 8.17 0 004.78 1.52V6.82a4.85 4.85 0 01-1.01-.13z" />
              </svg>
            </a>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <a href="#" className="transition hover:text-primary">
              Email
            </a>
            <span className="text-white/40">|</span>
            <a href="#" className="transition hover:text-primary">
              Community
            </a>
            <span className="text-white/40">|</span>
            <a href="#" className="transition hover:text-primary">
              Support
            </a>
          </div>
        </div>
      </div>

      {/* Tier 2: Header Info */}
      <div className="hidden w-full border-b bg-white py-4 lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="Nehemiah"
              width={70}
              height={70}
              className="object-contain"
              priority
            />
          </Link>
          <div className="hidden items-center gap-8 md:flex">
            <InfoBox
              icon={<Phone className="size-5" />}
              heading="Get In Touch"
              content={SITE_CONFIG.email}
            />
            <InfoBox
              icon={<MapPin className="size-5" />}
              heading="Office Address"
              content={SITE_CONFIG.address}
            />
            <InfoBox
              icon={<Clock className="size-5" />}
              heading="Opening Hour"
              content={SITE_CONFIG.hours}
            />
          </div>
        </div>
      </div>

      {/* Tier 3: Navigation Bar */}
      <nav
        className={cn(
          'w-full border-b bg-white transition-shadow duration-300',
          isSticky && 'fixed top-0 right-0 left-0 z-50 shadow-md',
        )}
      >
        <div className="mx-auto w-full max-w-7xl flex items-center justify-between px-4">
          {/* Desktop Nav */}
          <ul className="hidden items-center lg:flex">
            {NAV_ITEMS.map((item) => (
              <DesktopNavItem key={item.label} item={item} />
            ))}
          </ul>

          <div className="hidden items-center gap-6 lg:flex flex-shrink-0">
            <div className="group relative">
              <button
                className="flex items-center gap-1.5 text-sm font-semibold uppercase text-text-dark transition hover:text-primary"
                aria-label="Select language"
              >
                <Globe className="size-5" />
              </button>
              <ul
                className="invisible absolute right-0 top-full z-50 mt-2 min-w-[140px] rounded-md bg-white py-2 opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100"
              >
                <li>
                  <button
                    onClick={() => changeLanguage('am')}
                    className="flex w-full items-center gap-3 px-4 py-2 text-sm font-medium text-foreground transition hover:bg-gray-50 hover:text-primary"
                  >
                    <span className="text-lg">🇪🇹</span> AMHARIC
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => changeLanguage('en')}
                    className="flex w-full items-center gap-3 px-4 py-2 text-sm font-medium text-foreground transition hover:bg-gray-50 hover:text-primary"
                  >
                    <span className="text-lg">🇺🇸</span> ENGLISH
                  </button>
                </li>
              </ul>
            </div>
            <Link
              href="/donate"
              className={cn(
                'rounded bg-primary-hover px-6 py-2 text-sm font-semibold uppercase',
                'text-white transition hover:bg-primary-dark',
              )}
            >
              Donate Now
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className="flex flex-1 items-center justify-between py-3 lg:hidden">
            <Link href="/">
              <Image src="/images/logo.png" alt="Nehemiah" width={40} height={40} className="object-contain" />
            </Link>
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button aria-label="Open menu" className="p-2">
                  <Menu className="size-6 text-text-dark" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85vw] max-w-xs overflow-y-auto p-0">
                <SheetHeader className="px-4 pt-4 pb-2 border-b">
                  <SheetTitle className="text-left">Menu</SheetTitle>
                </SheetHeader>
                <div className="px-4 pb-6">
                  <ul className="space-y-1">
                    {NAV_ITEMS.map((item) => (
                      <MobileNavItem
                        key={item.label}
                        item={item}
                        expandedItems={expandedItems}
                        toggleExpanded={toggleExpanded}
                        onNavigate={() => setMobileOpen(false)}
                      />
                    ))}
                  </ul>
                  <div className="mt-4 border-t border-gray-100 pt-4">
                    <p className="mb-2 px-2 text-sm font-semibold text-text-dark uppercase">Select Language</p>
                    <button
                      onClick={() => { changeLanguage('am'); setMobileOpen(false); }}
                      className="flex w-full items-center gap-3 rounded px-4 py-2 text-left text-sm font-medium text-text-dark transition hover:bg-gray-50"
                    >
                      <span className="text-lg">🇪🇹</span> AMHARIC
                    </button>
                    <button
                      onClick={() => { changeLanguage('en'); setMobileOpen(false); }}
                      className="flex w-full items-center gap-3 rounded px-4 py-2 text-left text-sm font-medium text-text-dark transition hover:bg-gray-50"
                    >
                      <span className="text-lg">🇺🇸</span> ENGLISH
                    </button>
                  </div>
                  <Link
                    href="/donate"
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'mt-2 block rounded bg-primary-hover px-6 py-2 text-center text-sm',
                      'font-semibold uppercase text-white transition hover:bg-primary-dark',
                    )}
                  >
                    Donate Now
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* Spacer when sticky to prevent content jump */}
      {isSticky && <div className="h-[57px] lg:h-[57px]" />}
    </header>
  );
}

function InfoBox({
  icon,
  heading,
  content,
}: {
  icon: React.ReactNode;
  heading: string;
  content: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={cn(
          'flex h-12 w-12 items-center justify-center rounded-full',
          'border-2 border-primary text-primary',
        )}
      >
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-heading">{heading}</p>
        <p className="text-sm text-foreground">{content}</p>
      </div>
    </div>
  );
}

function DesktopNavItem({ item }: { item: NavItem }) {
  const hasChildren = item.children && item.children.length > 0;

  if (!hasChildren) {
    return (
      <li>
        <Link
          href={item.href ?? '#'}
          className={cn(
            'flex items-center px-3 py-4 text-sm font-semibold uppercase',
            'tracking-wide text-text-dark transition hover:text-primary',
          )}
        >
          {item.label}
        </Link>
      </li>
    );
  }

  return (
    <li className="group relative">
      <Link
        href={item.href ?? '#'}
        className={cn(
          'flex items-center gap-1 px-3 py-4 text-sm font-semibold uppercase',
          'tracking-wide text-text-dark transition hover:text-primary',
        )}
      >
        {item.label}
        <ChevronDown className="size-3" />
      </Link>
      <ul
        className={cn(
          'invisible absolute top-full left-0 z-50 min-w-[200px] rounded-md',
          'bg-white py-2 opacity-0 shadow-lg transition-all duration-200',
          'group-hover:visible group-hover:opacity-100',
        )}
      >
        {item.children!.map((child) => (
          <DesktopDropdownItem key={child.label} item={child} />
        ))}
      </ul>
    </li>
  );
}

function DesktopDropdownItem({ item }: { item: NavItem }) {
  const hasChildren = item.children && item.children.length > 0;

  if (!hasChildren) {
    return (
      <li>
        <Link
          href={item.href ?? '#'}
          className={cn(
            'block px-4 py-2 text-sm text-foreground transition',
            'hover:bg-gray-50 hover:text-primary',
          )}
        >
          {item.label}
        </Link>
      </li>
    );
  }

  return (
    <li className="group/nested relative">
      <span
        className={cn(
          'flex cursor-default items-center justify-between px-4 py-2 text-sm',
          'text-foreground transition hover:bg-gray-50 hover:text-primary',
        )}
      >
        {item.label}
        <ChevronRight className="size-3" />
      </span>
      <ul
        className={cn(
          'invisible absolute top-0 left-full z-50 min-w-[200px] rounded-md',
          'bg-white py-2 opacity-0 shadow-lg transition-all duration-200',
          'group-hover/nested:visible group-hover/nested:opacity-100',
        )}
      >
        {item.children!.map((child) => (
          <DesktopDropdownItem key={child.label} item={child} />
        ))}
      </ul>
    </li>
  );
}

function MobileNavItem({
  item,
  expandedItems,
  toggleExpanded,
  onNavigate,
  depth = 0,
}: {
  item: NavItem;
  expandedItems: Set<string>;
  toggleExpanded: (label: string) => void;
  onNavigate: () => void;
  depth?: number;
}) {
  const hasChildren = item.children && item.children.length > 0;
  const isExpanded = expandedItems.has(item.label);

  if (!hasChildren) {
    return (
      <li>
        <Link
          href={item.href ?? '#'}
          onClick={onNavigate}
          className={cn(
            'block py-2 text-sm text-text-dark transition hover:text-primary',
            depth > 0 && 'pl-4',
          )}
        >
          {item.label}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <button
        onClick={() => toggleExpanded(item.label)}
        className={cn(
          'flex w-full items-center justify-between py-2 text-sm',
          'font-semibold text-text-dark transition hover:text-primary',
          depth > 0 && 'pl-4',
        )}
      >
        {item.label}
        <ChevronDown
          className={cn('size-4 transition-transform duration-200', isExpanded && 'rotate-180')}
        />
      </button>
      {isExpanded && (
        <ul className="ml-2 border-l border-gray-200 pl-2">
          {item.children!.map((child) => (
            <MobileNavItem
              key={child.label}
              item={child}
              expandedItems={expandedItems}
              toggleExpanded={toggleExpanded}
              onNavigate={onNavigate}
              depth={depth + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
