import PageBanner from '@/shared/components/common/PageBanner';
import { VolunteerForm } from './VolunteerForm';
import { Heart, Users, Shield, Clock } from 'lucide-react';

const highlights = [
  {
    icon: Heart,
    title: 'Make a Real Difference',
    description:
      'Directly support children with autism and the families who care for them — your time creates lasting impact.',
  },
  {
    icon: Users,
    title: 'Join a Dedicated Team',
    description:
      'Work alongside our therapists, educators, and staff who share a passion for inclusion and compassionate care.',
  },
  {
    icon: Shield,
    title: 'Safe & Structured Environment',
    description:
      'All volunteers receive an orientation and are supported throughout their service by our experienced team.',
  },
  {
    icon: Clock,
    title: 'Flexible Commitment',
    description:
      'Choose your available days and hours. We work with your schedule to find a meaningful role for you.',
  },
];

export function VolunteerPage() {
  return (
    <>
      {/* Page Banner */}
      <PageBanner
        title="Volunteer With Us"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Volunteer' },
        ]}
      />

      {/* Why Volunteer Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Get Involved
            </span>
            <hr className="mx-auto my-3 h-0.5 w-12 border-0 bg-primary" />
            <h1 className="font-serif text-3xl font-medium text-heading sm:text-4xl">
              Become a <span className="text-primary">Volunteer</span>
            </h1>
            <p className="mt-4 leading-relaxed text-foreground">
              At Nehemiah Autism Center, our volunteers are the heart of what
              we do. Whether you are a student, a professional, or simply
              someone who cares — your time, skills, and compassion can
              transform a child&apos;s world.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="mb-4 flex size-11 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="size-5 text-primary" />
                </div>
                <h3 className="mb-2 font-serif font-semibold text-heading">
                  {title}
                </h3>
                <p className="text-sm leading-relaxed text-foreground">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="bg-secondary-bg py-16">
        <div className="mx-auto max-w-4xl px-4">
          <div className="mb-10 text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Apply Now
            </span>
            <hr className="mx-auto my-3 h-0.5 w-12 border-0 bg-primary" />
            <h2 className="font-serif text-2xl font-medium text-heading sm:text-3xl">
              Volunteer <span className="text-primary">Application</span>
            </h2>
            <p className="mt-3 text-sm text-foreground">
              Fields marked with <span className="text-red-500">*</span> are
              required.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-10">
            <VolunteerForm />
          </div>
        </div>
      </section>
    </>
  );
}
