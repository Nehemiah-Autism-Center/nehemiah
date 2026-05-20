'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  image?: string;
}

interface HistoryTimelineProps {
  events: TimelineEvent[];
}

function TimelineCard({
  event,
  index,
  isLast,
  onHeightReady
}: {
  event: TimelineEvent;
  index: number;
  isLast?: boolean;
  onHeightReady?: (h: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const isImageLeft = index % 2 !== 0;

  // Parallax Scroll Effect for the Image and Text
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['-90px', '90px']);

  useEffect(() => {
    if (isLast && ref.current) {
      // Measure the exact height of the last card to clip the background line perfectly
      const observer = new ResizeObserver((entries) => {
        if (entries[0]) {
          onHeightReady?.(entries[0].target.getBoundingClientRect().height);
        }
      });
      observer.observe(ref.current);
      return () => observer.disconnect();
    }
  }, [isLast, onHeightReady]);

  return (
    <div ref={ref} className="group relative pl-20 md:pl-24 mb-16 md:mb-24 last:mb-0">
      {/* Year Node on the line */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, type: 'spring', stiffness: 250, damping: 15 }}
        className="absolute left-6 md:left-8 top-10 z-20 -translate-x-1/2 -translate-y-1/2 rounded-full border-[5px] border-background bg-heading px-3 md:px-4 py-1.5 md:py-1.5 text-xs md:text-sm font-bold tracking-widest text-white shadow-sm transition-transform duration-500 group-hover:scale-110"
      >
        {event.year}
      </motion.div>

      {/* Content Container (Floating Layout) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
        className="relative"
      >
        {/* 2-Column Content Grid */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 h-full gap-8 md:gap-16 items-center">

          {/* Text Area */}
          <motion.div style={{ y: textY }} className={`relative flex flex-col justify-center py-4 ${isImageLeft ? 'md:order-2' : 'md:order-1'}`}>
            {/* Subtle Year Watermark behind text */}
            <div className="pointer-events-none absolute -left-4 md:-left-8 top-0 -z-10 select-none font-serif text-[80px] leading-none font-black text-heading/[0.03] lg:text-[120px]">
              {event.year}
            </div>

            <h3 className="relative z-10 mb-3 font-serif text-xl md:text-2xl font-semibold text-heading transition-colors duration-300">
              {event.title}
            </h3>
            <p className="relative z-10 leading-relaxed text-foreground text-sm md:text-base">
              {event.description}
            </p>
          </motion.div>

          {/* Image Space Area */}
          <div className={`relative aspect-video md:aspect-[4/3] w-full overflow-hidden rounded-2xl bg-heading/[0.02] shadow-md border border-heading/5 ${isImageLeft ? 'md:order-1' : 'md:order-2'}`}>
            {event.image ? (
              <motion.div style={{ y: imageY }} className="absolute inset-0 top-[-15%] h-[130%] w-full">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
              </motion.div>
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-heading/20 transition-colors duration-500 group-hover:bg-heading/[0.04] group-hover:text-heading/30">
                <svg className="size-8 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="font-serif text-sm font-semibold tracking-[0.2em] uppercase">Image</span>
              </div>
            )}
          </div>

        </div>
      </motion.div>
    </div>
  );
}

export default function HistoryTimeline({ events }: HistoryTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 70%', 'end 70%'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const [lastCardHeight, setLastCardHeight] = useState(0);

  return (
    <div ref={containerRef} className="relative mt-6 w-full">
      {/* Line wrapper: exactly spans from the center of the first badge to the center of the last badge */}
      <div
        className="absolute left-6 md:left-8 w-[2px] -translate-x-1/2 z-0"
        style={{ top: '40px', bottom: `calc(${lastCardHeight}px - 40px)` }}
      >
        <div className="w-full h-full bg-heading/10" />
        <motion.div
          style={{ height: lineHeight }}
          className="absolute top-0 left-0 w-full bg-heading origin-top"
        />
      </div>

      {/* Timeline events */}
      <div className="relative flex flex-col z-10">
        {events.map((event, index) => (
          <TimelineCard
            key={event.year}
            event={event}
            index={index}
            isLast={index === events.length - 1}
            onHeightReady={setLastCardHeight}
          />
        ))}
      </div>
    </div>
  );
}
