import { Clock, ExternalLink, MapPin, Phone } from 'lucide-react';
import SectionHeading from '@/shared/components/common/SectionHeading';
import { SITE_CONFIG } from '@/shared/lib/constants';

export default function LocationSection() {
  return (
    <section id="visit" className="scroll-mt-24 py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-12">
          <div className="lg:col-span-2">
            <SectionHeading
              title="Visit Nehemiah Autism Center"
              highlightedWord="Nehemiah"
              align="left"
            />
            <p className="text-foreground leading-relaxed">
              Nehemiah Autism Center is located in Kera, Alemazeye Meda, Addis Ababa, Ethiopia.
              Visit us to learn more about our services, meet our team, and discover how we support
              autistic children and their families.
            </p>

            <ul className="text-foreground mt-6 space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="text-primary size-5 shrink-0" aria-hidden="true" />
                {SITE_CONFIG.address}
              </li>
              <li className="flex gap-3">
                <Clock className="text-primary size-5 shrink-0" aria-hidden="true" />
                <span>
                  {SITE_CONFIG.hours.map((slot) => (
                    <span key={slot.days} className="block">
                      {slot.days}: {slot.time}
                    </span>
                  ))}
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="text-primary size-5 shrink-0" aria-hidden="true" />
                <span>
                  {SITE_CONFIG.phones.map((phone) => (
                    <a
                      key={phone.tel}
                      href={`tel:${phone.tel}`}
                      className="hover:text-primary block transition"
                    >
                      {phone.display}
                    </a>
                  ))}
                </span>
              </li>
            </ul>

            <a
              href={SITE_CONFIG.map.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-dark mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase transition"
            >
              Open in Google Maps
              <ExternalLink className="size-4" aria-hidden="true" />
            </a>
          </div>

          <div className="aspect-[4/3] overflow-hidden rounded-lg border shadow-sm lg:col-span-3 lg:aspect-auto lg:min-h-[400px]">
            <iframe
              src={SITE_CONFIG.map.embed}
              title="Map showing Nehemiah Autism Center in Kera, Addis Ababa"
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
