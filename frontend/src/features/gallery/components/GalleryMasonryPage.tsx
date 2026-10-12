import Image from 'next/image';
import PageBanner from '@/shared/components/common/PageBanner';
import { galleryPhotos } from '@/features/gallery/data';

export default function GalleryMasonryPage() {
  return (
    <>
      <PageBanner
        title="Photo Gallery"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Gallery', href: '/gallery' },
          { label: 'Masonry' },
        ]}
        backgroundImage="/images/nehemiah/gallery-children-dance.jpg"
      />

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="columns-2 gap-4 [column-fill:_balance] md:columns-3 lg:columns-4">
            {galleryPhotos.map((photo) => (
              <div key={photo.src} className="mb-4 break-inside-avoid">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={1200}
                  height={800}
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                  className="w-full rounded-lg transition-transform duration-300 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
