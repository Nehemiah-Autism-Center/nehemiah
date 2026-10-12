import type { Metadata } from 'next';
import PageBanner from '@/shared/components/common/PageBanner';
import BlogList from '@/features/blog/components/BlogList';
import BlogSidebar from '@/features/blog/components/BlogSidebar';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'News and stories from Nehemiah Autism Center.',
};

export default function BlogPage() {
  return (
    <>
      <PageBanner
        title="Our Blog"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Blog' }]}
        backgroundImage="/images/nehemiah/blog-celebration.jpg"
      />
      <section className="bg-secondary-bg py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <BlogList />
            </div>
            <div className="lg:col-span-4">
              <BlogSidebar />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
