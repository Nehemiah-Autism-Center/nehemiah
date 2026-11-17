'use client';

import { useState, type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Clock, Mail, MapPin, Menu, Phone } from 'lucide-react';
import { useLocale } from '@/shared/i18n/LocaleProvider';
import { localizePath, ROUTES, stripLocale } from '@/shared/i18n/routing';
import { text } from '@/shared/i18n/localized';
import { LocalizedText, UiText } from '@/shared/i18n/LocalizedText';
import { t, type UiKey } from '@/shared/i18n/ui';
import { ORGANIZATION } from '@/shared/content/organization';
import { MEDIA } from '@/shared/content/media';
import { PRIMARY_NAV, isCurrentPage } from '@/shared/content/navigation';
import { cn } from '@/shared/lib/utils';
import { Container } from '@/shared/components/common/Container';
import { ButtonLink } from '@/shared/components/common/ButtonLink';
import {
  AddressText,
  EmailLink,
  HoursList,
  PhoneLinks,
} from '@/shared/components/common/ContactDetails';
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

/** Level-1 utility links (desktop bar). Support is the green button, so FAQ takes its place here. */
const UTILITY_LINKS: readonly { href: string; label: UiKey }[] = [
  { href: ROUTES.contact, label: 'nav.contact' },
  { href: ROUTES.faq, label: 'nav.faq' },
];

const UTILITY_LINK =
  'inline-flex h-10 items-center px-3 text-xs font-semibold tracking-wider text-white uppercase transition-colors hover:text-primary';

/** One of the three information blocks in the white row: green icon, small caps label, value. */
function InfoBlock({
  icon,
  label,
  children,
}: {
  icon: ReactNode;
  label: UiKey;
  children: ReactNode;
}) {
  const locale = useLocale();
  return (
    <div className="border-border flex items-start gap-3 border-l pl-4 first:border-l-0 first:pl-0">
      <span className="text-green-display mt-0.5 shrink-0">{icon}</span>
      <div className="min-w-0 text-[13px] leading-snug">
        <UiText
          as="p"
          k={label}
          locale={locale}
          className="text-heading mb-1 text-xs font-bold tracking-wider uppercase"
        />
        {children}
      </div>
    </div>
  );
}

export function SiteHeader() {
  const locale = useLocale();
  const pathname = usePathname();
  const { path } = stripLocale(pathname);
  const [menuOpen, setMenuOpen] = useState(false);
  const homeHref = localizePath(ROUTES.home, locale);
  const firstPhone = ORGANIZATION.phones[0];

  return (
    <header>
      {/* Level 1 — charcoal utility bar. Desktop: social squares left, utility links right.
          Phones: tap-to-call left, language right. */}
      <div className="on-dark bg-topbar-bg text-white">
        <Container className="flex h-11 items-center justify-between gap-4 md:h-10">
          <div className="hidden items-center md:flex">
            <SocialLinks locale={locale} tone="square" />
          </div>
          <a
            href={`tel:${firstPhone.tel}`}
            className="hover:text-primary inline-flex h-11 items-center gap-2 text-sm whitespace-nowrap md:hidden"
          >
            <Phone aria-hidden="true" className="text-primary size-4 shrink-0" />
            {firstPhone.display}
          </a>

          <div className="flex items-center">
            <ul className="hidden items-center md:flex">
              <li>
                <a href={`mailto:${ORGANIZATION.email}`} className={UTILITY_LINK}>
                  <UiText k="contact.email" locale={locale} />
                </a>
              </li>
              {UTILITY_LINKS.map((link) => (
                <li key={link.href} className="border-l border-white/20">
                  <Link href={localizePath(link.href, locale)} className={UTILITY_LINK}>
                    <UiText k={link.label} locale={locale} />
                  </Link>
                </li>
              ))}
            </ul>
            <span aria-hidden="true" className="mx-2 hidden h-4 w-px bg-white/20 md:block" />
            <LanguageSwitcher tone="dark" />
          </div>
        </Container>
      </div>

      {/* Level 2 — white row: logo and name left, three information blocks right (desktop). */}
      <div className="border-b bg-white">
        <Container className="flex items-center justify-between gap-6 py-3 lg:py-5">
          <Link href={homeHref} className="flex min-w-0 items-center gap-3">
            <Image
              src={MEDIA.logo.src}
              alt=""
              width={72}
              height={72}
              priority
              className="size-14 shrink-0 object-contain sm:size-16 lg:size-[72px]"
            />
            <LocalizedText
              as="span"
              value={ORGANIZATION.name}
              locale={locale}
              className="text-heading font-serif text-lg leading-tight font-semibold sm:text-xl lg:max-w-[11rem]"
            />
          </Link>

          <div className="hidden min-w-0 items-start gap-4 lg:flex">
            <InfoBlock icon={<Mail aria-hidden="true" className="size-7" />} label="nav.contact">
              <EmailLink size="compact" className="text-foreground" />
              <PhoneLinks
                size="compact"
                className="flex flex-wrap gap-x-3"
                itemClassName="text-foreground"
              />
            </InfoBlock>
            <InfoBlock
              icon={<MapPin aria-hidden="true" className="size-7" />}
              label="contact.address"
            >
              <AddressText locale={locale} className="block max-w-[10rem]" />
            </InfoBlock>
            <div className="hidden xl:block">
              <InfoBlock
                icon={<Clock aria-hidden="true" className="size-7" />}
                label="contact.hours"
              >
                <HoursList
                  locale={locale}
                  className="space-y-0.5 [&>div]:flex-nowrap [&>div]:whitespace-nowrap"
                />
              </InfoBlock>
            </div>
          </div>
        </Container>
      </div>

      {/* Level 3 — charcoal navigation bar: uppercase links, full-height green active tab,
          green call to action. Below lg the links collapse into the menu button. */}
      <div className="on-dark bg-nav-bg text-white">
        <Container className="flex min-h-12 items-center justify-between gap-3 lg:h-[60px]">
          <nav
            aria-label={t('common.mainNavigation', locale)}
            className="hidden self-stretch lg:block"
          >
            <ul className="flex h-full items-stretch">
              {PRIMARY_NAV.map((item) => {
                const current = isCurrentPage(item.href, path);
                return (
                  <li key={item.label} className="flex">
                    <Link
                      href={localizePath(item.href, locale)}
                      aria-current={current ? 'page' : undefined}
                      className={cn(
                        'flex items-center px-5 text-sm font-semibold tracking-wider uppercase transition-colors',
                        current
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:text-primary text-white',
                      )}
                    >
                      <UiText k={item.label} locale={locale} />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label={t('common.openMenu', locale)}
                className="hover:text-primary inline-flex min-h-11 items-center gap-2 text-sm font-semibold tracking-wider uppercase lg:hidden"
              >
                <Menu aria-hidden="true" className="size-6" />
                <UiText k="common.menu" locale={locale} />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="on-dark bg-charcoal-dark w-[88vw] max-w-sm overflow-y-auto border-white/10 p-0 text-white"
            >
              <SheetHeader className="border-b border-white/10 px-5 py-4">
                <SheetTitle className="text-left font-serif text-lg text-white">
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
                        <li key={item.label} className="border-b border-white/10">
                          <Link
                            href={localizePath(item.href, locale)}
                            onClick={() => setMenuOpen(false)}
                            aria-current={current ? 'page' : undefined}
                            className={cn(
                              'flex min-h-12 items-center text-base font-semibold tracking-wider uppercase',
                              current ? 'text-primary' : 'text-white',
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
                    <Phone aria-hidden="true" className="text-primary mt-3 size-5 shrink-0" />
                    <PhoneLinks className="space-y-0" />
                  </div>
                </div>
                <SocialLinks locale={locale} tone="onDark" className="mt-4" />
              </div>
            </SheetContent>
          </Sheet>

          <ButtonLink
            href={ROUTES.donate}
            locale={locale}
            className="hidden px-5 min-[420px]:inline-flex"
          >
            <UiText k="cta.support" locale={locale} />
          </ButtonLink>
        </Container>
      </div>
    </header>
  );
}
