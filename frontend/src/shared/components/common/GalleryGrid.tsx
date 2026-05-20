'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/shared/lib/utils';

const categories = ['all', 'education', 'health', 'community', 'events'] as const;

const galleryItems = [
  { src: '/images/gallery_1.jpg', alt: ' ', category: 'events' },
  { src: '/images/gallery_23.jpg', alt: ' ', category: 'events' },
  { src: '/images/gallery_2.jpg', alt: ' ', category: 'events' },
  { src: '/images/gallery_3.jpg', alt: ' ', category: 'events' },
  { src: '/images/gallery_4.jpg', alt: ' ', category: 'events' },
  { src: '/images/gallery_5.jpg', alt: ' ', category: 'events' },
  { src: '/images/gallery_6.jpg', alt: ' ', category: 'events' },
  { src: '/images/gallery_7.jpg', alt: ' ', category: 'events' },

  { src: '/images/gallery_8.jpg', alt: ' ', category: 'events' },
  { src: '/images/gallery_9.jpg', alt: ' ', category: 'education' },
  { src: '/images/gallery_10.jpg', alt: ' ', category: 'education' },
  { src: '/images/gallery_11.jpg', alt: ' ', category: 'education' },
  { src: '/images/gallery_12.jpg', alt: ' ', category: 'health' },

  { src: '/images/gallery_14.jpg', alt: ' ', category: 'events' },
  { src: '/images/gallery_15.jpg', alt: ' ', category: 'events' },
  { src: '/images/gallery_16.jpg', alt: ' ', category: 'events' },
  { src: '/images/gallery_17.jpg', alt: ' ', category: 'events' },
  { src: '/images/gallery_18.jpg', alt: ' ', category: 'events' },
  { src: '/images/gallery_19.jpg', alt: ' ', category: 'events' },
  { src: '/images/gallery_20.jpg', alt: ' ', category: 'events' },
  { src: '/images/gallery_21.jpg', alt: ' ', category: 'events' },
  { src: '/images/gallery_22.jpg', alt: ' ', category: 'events' },







];

export default function GalleryGrid() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filteredItems =
    activeFilter === 'all'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = useCallback(() => {
    setSelectedIndex(null);
    document.body.style.overflow = '';
  }, []);

  const showNext = useCallback(
    (e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      setSelectedIndex((prev) => (prev === null ? null : (prev + 1) % filteredItems.length));
    },
    [filteredItems.length],
  );

  const showPrev = useCallback(
    (e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      setSelectedIndex((prev) =>
        prev === null ? null : (prev - 1 + filteredItems.length) % filteredItems.length,
      );
    },
    [filteredItems.length],
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, closeLightbox, showNext, showPrev]);

  // Thumbnail scrolling logic to ensure active thumbnail is visible
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (selectedIndex !== null && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const activeThumb = container.children[selectedIndex] as HTMLElement;
      if (activeThumb) {
        const scrollLeft =
          activeThumb.offsetLeft - container.clientWidth / 2 + activeThumb.clientWidth / 2;
        container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }
  }, [selectedIndex]);

  // Parallax setup for gallery grid
  const gridRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ['start end', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);

  return (
    <div>
      {/* Filter Buttons */}
      <div className="mb-12 flex flex-wrap justify-center gap-2 md:gap-4">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => {
              setActiveFilter(category);
              setSelectedIndex(null);
            }}
            className={cn(
              'relative rounded-full px-6 py-2.5 text-sm font-semibold capitalize tracking-wider transition-colors',
              activeFilter === category
                ? 'text-white'
                : 'text-text-medium hover:text-primary',
            )}
          >
            {activeFilter === category && (
              <motion.div
                layoutId="activeFilter"
                className="absolute inset-0 z-[-1] rounded-full bg-primary shadow-lg shadow-primary/30"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{category === 'all' ? 'All Photos' : category}</span>
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <motion.div ref={gridRef} layout className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-6 auto-rows-[250px]">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, index) => {
            const isLarge = index % 8 === 0 || index % 8 === 5;
            const isTall = index % 8 === 2 || index % 8 === 7;

            return (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                key={item.src}
                className={cn(
                  'group relative cursor-pointer overflow-hidden rounded-xl bg-gray-100 shadow-sm transition-shadow hover:shadow-xl',
                  isLarge ? 'sm:col-span-2 sm:row-span-2' : isTall ? 'sm:row-span-2' : 'col-span-1 row-span-1'
                )}
                onClick={() => openLightbox(index)}
              >
                <motion.div style={{ y: imageY }} className="absolute inset-0 top-[-15%] h-[130%] w-full">
                  <Image src={item.src} alt={item.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                </motion.div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Text Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-6 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="mb-1 text-xs font-bold uppercase tracking-widest text-primary-light">{item.category}</p>
                  <h3 className="font-serif text-lg font-medium text-white">{item.alt}</h3>
                </div>

                {/* Zoom Icon */}
                <div className="absolute right-4 top-4 rounded-full bg-white/20 p-2 text-white opacity-0 backdrop-blur-md transition-all duration-300 -translate-y-2 group-hover:translate-y-0 group-hover:opacity-100">
                  <ZoomIn className="size-5" />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/20 backdrop-blur-md"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute right-4 top-4 z-[110] rounded-full bg-black/40 p-2 text-white transition-colors hover:bg-black/60 md:right-8 md:top-8"
            >
              <X className="size-6" />
            </button>

            {/* Prev Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              onClick={(e) => showPrev(e)}
              className="absolute left-4 top-1/2 z-[110] -translate-y-1/2 rounded-full bg-black/40 p-2 text-white transition-colors hover:bg-black/60 md:left-8 md:p-3"
            >
              <ChevronLeft className="size-6 md:size-8" />
            </motion.button>

            {/* Main Image Container */}
            <div className="relative flex flex-1 w-full max-w-6xl items-center justify-center p-4">
              <motion.div
                key={selectedIndex}
                initial={{ scale: 0.75, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // Super smooth and slow custom ease-out
                className="relative h-full w-full max-h-[75vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={filteredItems[selectedIndex].src}
                  alt={filteredItems[selectedIndex].alt}
                  fill
                  className="object-contain"
                />
              </motion.div>
            </div>

            {/* Next Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              onClick={(e) => showNext(e)}
              className="absolute right-4 top-1/2 z-[110] -translate-y-1/2 rounded-full bg-black/40 p-2 text-white transition-colors hover:bg-black/60 md:right-8 md:p-3"
            >
              <ChevronRight className="size-6 md:size-8" />
            </motion.button>

            {/* Thumbnail Bottom Reel */}
            <div
              className="w-full bg-black/40 p-4"
              onClick={(e) => e.stopPropagation()} // Prevent closing lightbox when clicking thumbnails area
            >
              <div
                ref={scrollContainerRef}
                className="no-scrollbar flex overflow-x-auto scroll-smooth gap-2 px-2 pb-2 md:justify-center"
              >
                {filteredItems.map((item, index) => (
                  <button
                    key={item.src}
                    onClick={() => setSelectedIndex(index)}
                    className={cn(
                      'relative h-12 w-16 shrink-0 overflow-hidden rounded transition-all md:h-16 md:w-24',
                      index === selectedIndex
                        ? 'ring-2 ring-white ring-offset-2 ring-offset-transparent'
                        : 'opacity-50 hover:opacity-100',
                    )}
                  >
                    <Image src={item.src} alt={item.alt} fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
