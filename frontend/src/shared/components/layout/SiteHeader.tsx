'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mail, Menu, Phone } from 'lucide-react';
import { useLocale } from '@/shared/i18n/LocaleProvider';
import { localizePath, ROUTES, stripLocale } from '@/shared/i18n/routing';
import { text } from '@/shared/i18n/localized';
import { LocalizedText, UiText } from '@/shared/i18n/LocalizedText';
import { t } from '@/shared/i18n/ui';
import { ORGANIZATION } from '@/shared/content/organization';
import { MEDIA } from '@/shared/content/media';
import { PRIMARY_NAV, isCurrentPage } from '@/shared/content/navigation';
import { cn } from '@/shared/lib/utils';
import { Container } from '@/shared/components/common/Container';
import { ButtonLink } from '@/shared/components/common/ButtonLink';
import { EmailLink, PhoneLinks } from '@/shared/components/common/ContactDetails';
import { SocialLinks } from '@/shared/components/common/SocialLinks';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/components/ui/sheet';
import { LanguageSwitcher } from './LanguageSwitcher';

export function SiteHeader() {
  const locale = useLocale();
  const pathname = usePathname();
  const { path } = stripLocale(pathname);
  const [menuOpen, setMenuOpen] = useState(false);
  const homeHref = localizePath(ROUTES.home, locale);

  return (
    <header>
      {/* Utility bar: contact, social profiles and language (tablet and up) */}
      <div className="on-dark bg-topbar-bg hidden text-white md:block">
        <Container className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 flex-wrap items-center gap-x-5 text-sm">
            <span className="inline-flex min-h-11 items-center gap-2">
              <Mail aria-hidden="true" className="text-footer-accent size-4 shrink-0" />
              <EmailLink />
            </span>
            <span className="inline-flex min-h-11 items-center gap-2">
              <Phone aria-hidden="true" className="text-footer-accent size-4 shrink-0" />
              <PhoneLinks className="flex items-center gap-4" />
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <SocialLinks locale={locale} tone="onDark" />
            <span aria-hidden="true" className="mx-2 h-6 w-px bg-white/30" />
            <LanguageSwitcher tone="dark" />
          </div>
        </Container>
      </div>

      {/* Main bar: brand, primary navigation, call to action */}
      <div className="border-b bg-white">
        <Container className="flex items-center justify-between gap-3 py-2">
          <Link href={homeHref} className="flex min-w-0 shrink-0 items-center gap-3">
            <Image
              src={MEDIA.logo.src}
              alt=""
              width={56}
              height={56}
              priority
              className="size-11 shrink-0 object-contain sm:size-14"
            />
            <LocalizedText
              as="span"
              value={ORGANIZATION.name}
              locale={locale}
              className="text-heading sr-only font-serif text-xl leading-tight font-semibold xl:not-sr-only"
            />
          </Link>

          <nav aria-label={t('common.mainNavigation', locale)} className="hidden lg:block">
            <ul className="flex items-center">
              {PRIMARY_NAV.map((item) => {
                const current = isCurrentPage(item.href, path);
                return (
                  <li key={item.label}>
                    <Link
                      href={localizePath(item.href, locale)}
                      aria-current={current ? 'page' : undefined}
                      className={cn(
                        'flex min-h-11 items-center border-b-2 px-3 text-base font-semibold transition-colors',
                        current
                          ? 'border-primary text-primary'
                          : 'text-text-dark hover:text-primary border-transparent',
                      )}
                    >
                      <UiText k={item.label} locale={locale} />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ButtonLink href={ROUTES.donate} locale={locale} className="hidden lg:inline-flex">
              <UiText k="cta.support" locale={locale} />
            </ButtonLink>

            {/* Phones: the language choice stays one tap away without opening the menu */}
            <div className="md:hidden">
              <LanguageSwitcher />
            </div>

            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  aria-label={t('common.openMenu', locale)}
                  className="text-text-dark hover:bg-secondary-bg inline-flex size-11 items-center justify-center rounded-md lg:hidden"
                >
                  <Menu aria-hidden="true" className="size-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[88vw] max-w-sm overflow-y-auto p-0">
                <SheetHeader className="border-b px-5 py-4">
                  <SheetTitle className="text-heading text-left font-serif text-lg">
                    <UiText k="common.menu" locale={locale} />
                  </SheetTitle>
                  <SheetDescription className="sr-only">
                    {text(ORGANIZATION.name, locale)}
                  </SheetDescription>
                </SheetHeader>
                <div className="px-5 pb-8">
                  <nav aria-label={t('common.mainNavigation', locale)}>
                    <ul>
                      {PRIMARY_NAV.map((item) => {
                        const current = isCurrentPage(item.href, path);
                        return (
                          <li key={item.label} className="border-border border-b">
                            <Link
                              href={localizePath(item.href, locale)}
                              onClick={() => setMenuOpen(false)}
                              aria-current={current ? 'page' : undefined}
                              className={cn(
                                'flex min-h-12 items-center text-lg font-semibold',
                                current ? 'text-primary' : 'text-text-dark',
                              )}
                            >
                              <UiText k={item.label} locale={locale} />
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </nav>

                  <ButtonLink
                    href={ROUTES.donate}
                    locale={locale}
                    onClick={() => setMenuOpen(false)}
                    className="mt-6 w-full"
                  >
                    <UiText k="cta.support" locale={locale} />
                  </ButtonLink>

                  <div className="mt-8 space-y-3 text-base">
                    <p className="flex items-center gap-3">
                      <Mail aria-hidden="true" className="text-primary size-5 shrink-0" />
                      <EmailLink />
                    </p>
                    <div className="flex items-start gap-3">
                      <Phone aria-hidden="true" className="text-primary mt-1 size-5 shrink-0" />
                      <PhoneLinks className="space-y-1" />
                    </div>
                  </div>
                  <SocialLinks locale={locale} tone="onLight" className="mt-4 -ml-3" />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </Container>
      </div>
    </header>
  );
}
