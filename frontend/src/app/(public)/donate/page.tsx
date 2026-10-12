import type { Metadata } from 'next';
import PageBanner from '@/shared/components/common/PageBanner';
import { DonationForm } from '@/features/donation';
import { SUPPORT_CTA } from '@/shared/lib/constants';

export const metadata: Metadata = {
  title: 'Donate',
  description: SUPPORT_CTA.description,
};

export default function DonatePage() {
  return (
    <>
      <PageBanner
        title="Support Nehemiah"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Donate' }]}
        backgroundImage="/images/nehemiah/hero-children-activities.jpg"
      />

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4">
          <div className="mb-10 text-center">
            <h2 className="text-heading font-serif text-3xl font-medium">{SUPPORT_CTA.title}</h2>
            <p className="text-foreground mt-4">{SUPPORT_CTA.description}</p>
          </div>
          <DonationForm />
        </div>
      </section>
    </>
  );
}
