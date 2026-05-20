import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageBanner from '@/shared/components/common/PageBanner';
import SuccessStorySingle from '@/features/success-stories/components/SuccessStorySingle';
import SuccessStorySidebar from '@/features/success-stories/components/SuccessStorySidebar';
import { successStories } from '@/features/success-stories/data';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return successStories.map((story) => ({
    slug: story.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = successStories.find((s) => s.slug === slug);

  if (!story) {
    return { title: 'Story Not Found - Nehemiah' };
  }

  return {
    title: `${story.title} - Nehemiah`,
    description: story.excerpt,
  };
}

export default async function SuccessStoryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const story = successStories.find((s) => s.slug === slug);

  if (!story) {
    notFound();
  }

  return (
    <>
      <PageBanner
        title={story.title}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Success Stories', href: '/success-stories' },
          { label: story.title },
        ]}
        backgroundImage={story.images[0]}
      />
      <section className="bg-secondary-bg py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <SuccessStorySingle story={story} />
            </div>
            <div className="lg:col-span-4">
              <SuccessStorySidebar />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
