"use client"

import Image from 'next/image';
import Link from 'next/link';
import { Play } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogTrigger,
  DialogTitle,
  DialogHeader,
  DialogDescription,
} from '@/shared/components/ui/dialog';

interface CTASectionProps {
  title: string;
  buttonLabel: string;
  buttonHref: string;
  backgroundImage?: string;
  videoUrl?: string; // Optional YouTube/Vimeo URL
}

export default function CTASection({
  title,
  buttonLabel,
  buttonHref,
  backgroundImage,
  videoUrl,
}: CTASectionProps) {
  // Helper to get embed URL from YouTube/Vimeo watch URL
  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    
    // YouTube
    const ytMatch = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
    
    // Vimeo
    const vimeoMatch = url.match(/(?:https?:\/\/)?(?:www\.)?vimeo\.com\/(\d+)/);
    if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    
    return url; // Return as is if already embed or not matched
  };

  const embedUrl = videoUrl ? getEmbedUrl(videoUrl) : null;

  return (
    <section className="relative bg-primary py-20 text-center text-white">
      {backgroundImage && (
        <>
          <Image
            src={backgroundImage}
            alt="Call to action background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </>
      )}
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        {embedUrl ? (
          <Dialog>
            <DialogTrigger asChild>
              <button 
                type="button"
                className="mx-auto mb-6 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full border-2 border-white transition-all hover:scale-110 hover:bg-white/10"
                aria-label="Play video"
              >
                <Play className="h-6 w-6 text-white" />
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl border-none bg-transparent p-0 shadow-none sm:rounded-none">
              <DialogHeader className="sr-only">
                <DialogTitle>{title} Video</DialogTitle>
                <DialogDescription>Watch the video for {title}</DialogDescription>
              </DialogHeader>
              <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
                <iframe
                  src={`${embedUrl}?autoplay=1`}
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </DialogContent>
          </Dialog>
        ) : (
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border-2 border-white">
            <Play className="h-6 w-6 text-white" />
          </div>
        )}
        
        <h2 className="mb-8 font-serif text-3xl font-bold md:text-4xl">{title}</h2>
        <Link
          href={buttonHref}
          className="inline-block rounded bg-white px-8 py-3 text-sm font-semibold uppercase text-primary transition hover:bg-gray-100"
        >
          {buttonLabel}
        </Link>
      </div>
    </section>
  );
}
