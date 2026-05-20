import PageBanner from '@/shared/components/common/PageBanner';
import { ContactForm } from '@/features/contact/components/ContactForm';
import { contactInfo } from '@/features/contact/data';

export default function ContactPage() {
  return (
    <>
      <PageBanner
        title="Contact Us"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Contact Us' }]}
      />

      <section className="pt-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="mb-6 font-serif text-3xl font-medium text-heading">Get In Touch</h2>
              <ContactForm />
            </div>

            <div className="lg:col-span-1">
              <div className="space-y-6">
                {contactInfo.map((info) => (
                  <div
                    key={info.title}
                    className="flex gap-4 rounded-lg border bg-white p-6 shadow-sm"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="font-serif font-semibold text-heading">{info.title}</h3>
                      <p className="mt-1 text-sm text-foreground">{info.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 w-full mx-auto h-[450px] rounded-lg overflow-hidden shadow-lg border border-gray-200">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.5!2d38.74303275938243!3d8.980465798528387!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b8444e6192915%3A0x8fe79cdb01ddd566!2sNehemiah%20Autism%20Center!5e0!3m2!1sen!2set!4v1775026060632!5m2!1sen!2set"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Nehemiah Autism Center Location"
          />
        </div>

      </section>
    </>
  );
}
