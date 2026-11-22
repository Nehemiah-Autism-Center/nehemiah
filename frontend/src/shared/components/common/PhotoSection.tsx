import type { ReactNode } from 'react';
import Image from 'next/image';
import type { MediaAsset } from '@/shared/content/media';
import { cn } from '@/shared/lib/utils';
import { Container } from './Container';

interface PhotoSectionProps {
  id?: string;
  /** id of the heading inside the section; gives the region an accessible name. */
  labelledBy?: string;
  /** Decorative backdrop (alt=""); the 75% black overlay keeps light text above 4.5:1 on any photo. */
  image: MediaAsset;
  className?: string;
  children: ReactNode;
}

/**
 * Dark photographic content band (statistics, closing call to action). The charcoal fallback
 * colour keeps the text readable whether or not the photograph loads.
 */
export function PhotoSection({ id, labelledBy, image, className, children }: PhotoSectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        'on-dark bg-charcoal-dark text-footer-text relative isolate scroll-mt-6 overflow-hidden py-16 md:py-24',
        className,
      )}
    >
      <Image src={image.src} alt="" fill sizes="100vw" className="-z-20 object-cover" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/75" />
      <Container>{children}</Container>
    </section>
  );
}
