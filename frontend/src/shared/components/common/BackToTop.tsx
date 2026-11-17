'use client';

import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';
import { useLocale } from '@/shared/i18n/LocaleProvider';
import { t } from '@/shared/i18n/ui';

/** Appears after the visitor has scrolled well down the page; jumps back without animation if they prefer reduced motion. */
export default function BackToTop() {
  const locale = useLocale();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  const scrollToTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={t('common.backToTop', locale)}
      className="bg-primary hover:bg-primary-hover fixed right-4 bottom-4 z-40 flex size-12 items-center justify-center rounded-full text-white shadow-lg transition-colors sm:right-6 sm:bottom-6"
    >
      <ChevronUp aria-hidden="true" className="size-6" />
    </button>
  );
}
