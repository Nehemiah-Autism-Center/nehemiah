'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Dialog as DialogPrimitive } from 'radix-ui';
import { useLocale } from '@/shared/i18n/LocaleProvider';
import { resolve, text } from '@/shared/i18n/localized';
import { LocalizedText } from '@/shared/i18n/LocalizedText';
import { cn } from '@/shared/lib/utils';
import {
  GALLERY_CATEGORIES,
  GALLERY_COPY,
  GALLERY_PHOTOS,
  type GalleryCategoryId,
} from '@/features/gallery/data';

type Filter = 'all' | GalleryCategoryId;

function countFor(filter: Filter): number {
  return filter === 'all'
    ? GALLERY_PHOTOS.length
    : GALLERY_PHOTOS.filter((p) => p.categories.includes(filter)).length;
}

const ICON_BUTTON =
  'inline-flex size-12 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/30';

/**
 * Category filter (13 categories) and photo grid with a keyboard-accessible lightbox.
 * Categories with no photographs say so instead of showing unrelated pictures.
 */
export function GalleryBrowser() {
  const locale = useLocale();
  const [filter, setFilter] = useState<Filter>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const photos =
    filter === 'all' ? GALLERY_PHOTOS : GALLERY_PHOTOS.filter((p) => p.categories.includes(filter));
  const activeCategory = GALLERY_CATEGORIES.find((c) => c.id === filter);
  const current = openIndex !== null ? photos[openIndex] : undefined;

  const choose = (next: Filter) => {
    setFilter(next);
    setOpenIndex(null);
  };
  const step = (delta: number) =>
    setOpenIndex((i) => (i === null ? i : (i + delta + photos.length) % photos.length));

  const allLabel = resolve(GALLERY_COPY.all, locale);

  return (
    <div>
      {/* Phones: a native select is the most usable control for 14 options */}
      <div className="md:hidden">
        <label
          htmlFor="gallery-filter"
          className="text-heading mb-1.5 block text-base font-semibold"
        >
          <LocalizedText value={GALLERY_COPY.filterLabel} locale={locale} />
        </label>
        <select
          id="gallery-filter"
          value={filter}
          onChange={(e) => choose(e.target.value as Filter)}
          className="border-input text-heading h-12 w-full rounded-md border bg-white px-3 text-base"
        >
          <option value="all" lang={allLabel.isFallback ? 'en' : undefined}>
            {allLabel.value} ({countFor('all')})
          </option>
          {GALLERY_CATEGORIES.map((category) => {
            const title = resolve(category.title, locale);
            return (
              <option
                key={category.id}
                value={category.id}
                lang={title.isFallback ? 'en' : undefined}
              >
                {title.value} ({countFor(category.id)})
              </option>
            );
          })}
        </select>
      </div>

      {/* Tablet and up: chips */}
      <div
        role="group"
        aria-label={text(GALLERY_COPY.filterLabel, locale)}
        className="hidden md:block"
      >
        <ul className="flex flex-wrap gap-2">
          {(['all', ...GALLERY_CATEGORIES.map((c) => c.id)] as Filter[]).map((id) => {
            const category = GALLERY_CATEGORIES.find((c) => c.id === id);
            const active = filter === id;
            return (
              <li key={id}>
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => choose(id)}
                  className={cn(
                    'inline-flex min-h-11 items-center gap-2 rounded-full border px-4 py-1.5 text-base transition-colors',
                    active
                      ? 'border-primary bg-primary font-semibold text-white'
                      : 'border-input text-heading hover:border-primary hover:text-primary bg-white',
                  )}
                >
                  <LocalizedText
                    value={category ? category.title : GALLERY_COPY.all}
                    locale={locale}
                  />
                  <span aria-hidden="true" className="text-sm opacity-80">
                    {countFor(id)}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {activeCategory && (
        <LocalizedText
          as="p"
          value={activeCategory.description}
          locale={locale}
          className="border-secondary mt-6 max-w-3xl border-l-4 pl-4 text-lg"
        />
      )}

      <div role="status" className="mt-6">
        {photos.length === 0 && (
          <LocalizedText
            as="p"
            value={GALLERY_COPY.empty}
            locale={locale}
            className="border-input rounded-xl border border-dashed bg-white p-8 text-center text-lg"
          />
        )}
      </div>

      {photos.length > 0 && (
        <ul className="mt-2 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {photos.map((photo, index) => (
            <li key={photo.id}>
              <button
                type="button"
                onClick={() => setOpenIndex(index)}
                aria-label={`${text(GALLERY_COPY.openPhoto, locale)}: ${text(photo.alt, locale)}`}
                className="group bg-secondary-bg relative block aspect-[4/3] w-full overflow-hidden rounded-xl"
              >
                <Image
                  src={photo.src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </button>
            </li>
          ))}
        </ul>
      )}

      <DialogPrimitive.Root
        open={current !== undefined}
        onOpenChange={(open) => !open && setOpenIndex(null)}
      >
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/90" />
          <DialogPrimitive.Content
            className="on-dark fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 p-3 outline-none sm:p-6"
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight') step(1);
              if (e.key === 'ArrowLeft') step(-1);
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setOpenIndex(null);
            }}
          >
            {current && (
              <>
                <DialogPrimitive.Title className="sr-only">
                  {text(current.alt, locale)}
                </DialogPrimitive.Title>
                <DialogPrimitive.Description className="sr-only">
                  {(openIndex ?? 0) + 1} / {photos.length}
                </DialogPrimitive.Description>

                <DialogPrimitive.Close
                  aria-label={text(GALLERY_COPY.close, locale)}
                  className={cn(ICON_BUTTON, 'absolute top-3 right-3 sm:top-6 sm:right-6')}
                >
                  <X aria-hidden="true" className="size-6" />
                </DialogPrimitive.Close>

                <div className="relative h-[68vh] w-full max-w-5xl">
                  <Image
                    src={current.src}
                    alt={text(current.alt, locale)}
                    fill
                    sizes="100vw"
                    className="object-contain"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label={text(GALLERY_COPY.previous, locale)}
                    className={ICON_BUTTON}
                  >
                    <ChevronLeft aria-hidden="true" className="size-6" />
                  </button>
                  <p aria-hidden="true" className="min-w-16 text-center text-base text-white">
                    {(openIndex ?? 0) + 1} / {photos.length}
                  </p>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label={text(GALLERY_COPY.next, locale)}
                    className={ICON_BUTTON}
                  >
                    <ChevronRight aria-hidden="true" className="size-6" />
                  </button>
                </div>
              </>
            )}
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </div>
  );
}
