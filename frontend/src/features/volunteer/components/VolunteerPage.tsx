import PageBanner from '@/shared/components/common/PageBanner';
import SectionHeading from '@/shared/components/common/SectionHeading';
import AnimateOnScroll from '@/shared/components/common/AnimateOnScroll';
import CTASection from '@/shared/components/common/CTASection';
import { volunteerIntro, volunteerRoles } from '@/features/volunteer/data';

export default function VolunteerPage() {
  return (
    <>
      <PageBanner
        title="Volunteer With Us"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Volunteer' }]}
        backgroundImage="/images/nehemiah/volunteers-banner.jpg"
      />

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-3xl">
            <SectionHeading title="Why Volunteer" highlightedWord="Volunteer" />
            <p className="text-foreground text-center leading-relaxed md:text-lg">
              {volunteerIntro}
            </p>
          </div>

          <h2 className="text-heading mt-16 mb-8 text-center font-serif text-2xl font-medium md:text-3xl">
            Ways You Can Help
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {volunteerRoles.map(({ title, description, icon: Icon }) => (
              <AnimateOnScroll key={title} animation="fadeUp">
                <article className="h-full rounded-lg border bg-white p-6 shadow-sm md:p-8">
                  <Icon className="text-primary mb-4 size-8" aria-hidden="true" />
                  <h3 className="text-heading font-serif text-lg font-semibold">{title}</h3>
                  <p className="text-foreground mt-2 text-sm leading-relaxed">{description}</p>
                </article>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to Volunteer?"
        description="Tell us how you would like to help, and our team will get in touch with you."
        buttonLabel="Contact Us"
        buttonHref="/contact"
      />
    </>
  );
}
