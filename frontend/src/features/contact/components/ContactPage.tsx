import PageBanner from '@/shared/components/common/PageBanner';
import LocationSection from '@/shared/components/common/LocationSection';
import { ContactForm } from '@/features/contact/components/ContactForm';
import { contactInfo } from '@/features/contact/data';

export default function ContactPage() {
  return (
    <>
      <PageBanner
        title="Contact Us"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Contact Us' }]}
        backgroundImage="/images/nehemiah/visit-welcome.jpg"
      />

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="text-heading mb-6 font-serif text-3xl font-medium">Get In Touch</h2>
              <ContactForm />
            </div>

            <div className="lg:col-span-1">
              <div className="space-y-6">
                {contactInfo.map((info) => (
                  <div
                    key={info.title}
                    className="flex gap-4 rounded-lg border bg-white p-6 shadow-sm"
                  >
                    <div className="bg-primary/10 text-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
                      {info.icon}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-heading font-serif font-semibold">{info.title}</h3>
                      {info.lines.map((line) =>
                        line.href ? (
                          <a
                            key={line.text}
                            href={line.href}
                            className="text-foreground hover:text-primary mt-1 block text-sm break-words transition"
                          >
                            {line.text}
                          </a>
                        ) : (
                          <p key={line.text} className="text-foreground mt-1 text-sm">
                            {line.text}
                          </p>
                        ),
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-secondary-bg">
        <LocationSection />
      </div>
    </>
  );
}
