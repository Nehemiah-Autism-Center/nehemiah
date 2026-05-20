import PageBanner from '@/shared/components/common/PageBanner';
import SuccessStoriesList from '@/features/success-stories/components/SuccessStoriesList';
import SuccessStorySidebar from '@/features/success-stories/components/SuccessStorySidebar';

export default function SuccessStoriesPage() {
  return (
    <>
      <PageBanner
        title="Success Stories"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Success Stories' },
        ]}
        backgroundImage="/images/event_2.jpg"
      />
      <section className="bg-secondary-bg py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <SuccessStoriesList />
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
