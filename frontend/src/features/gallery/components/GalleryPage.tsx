import PageBanner from '@/shared/components/common/PageBanner';
import SectionHeading from '@/shared/components/common/SectionHeading';
import GalleryGrid from '@/shared/components/common/GalleryGrid';
import { galleryCategories, galleryPhotos } from '@/features/gallery/data';

export default function GalleryPage() {
  return (
    <>
      <PageBanner
        title="Photo Gallery"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Gallery' }]}
        backgroundImage="/images/nehemiah/gallery-children-dance.jpg"
      />

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            title="Moments From Our Community"
            highlightedWord="Community"
            subtitle="Children, families, volunteers and friends at our Autism Awareness Day."
          />
          <GalleryGrid photos={galleryPhotos} />
        </div>
      </section>

      <section className="bg-secondary-bg py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading title="What We Capture" highlightedWord="Capture" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galleryCategories.map((category) => (
              <article key={category.title} className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="text-heading font-serif text-lg font-semibold">{category.title}</h3>
                <p className="text-foreground mt-2 text-sm leading-relaxed">
                  {category.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
