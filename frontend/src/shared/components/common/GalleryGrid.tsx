import Image from 'next/image';

interface GalleryGridProps {
  photos: { src: string; alt: string }[];
}

export default function GalleryGrid({ photos }: GalleryGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
      {photos.map((photo) => (
        <div key={photo.src} className="relative aspect-square overflow-hidden rounded-lg">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      ))}
    </div>
  );
}
