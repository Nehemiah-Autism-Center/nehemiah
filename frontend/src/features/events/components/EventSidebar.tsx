import Image from 'next/image';
import Link from 'next/link';
import { Calendar } from 'lucide-react';
import { events } from '@/features/events/data';

export default function EventSidebar() {
  return (
    <aside className="space-y-8">
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h2 className="text-heading mb-4 font-serif text-lg font-semibold">Upcoming Events</h2>
        <div className="space-y-4">
          {events.slice(0, 3).map((event) => (
            <Link
              key={event.slug}
              href={`/events/${event.slug}`}
              className="group flex items-center gap-3"
            >
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded">
                <Image src={event.image} alt="" fill className="object-cover" />
              </div>
              <div>
                <h3 className="text-heading group-hover:text-primary text-sm font-semibold transition">
                  {event.title}
                </h3>
                <p className="text-foreground flex items-center gap-1 text-xs">
                  <Calendar size={10} aria-hidden="true" />
                  {event.date}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-primary rounded-lg p-6 text-white shadow-sm">
        <h2 className="mb-2 font-serif text-lg font-semibold text-white">
          Want to help at our events?
        </h2>
        <p className="text-sm text-white/90">
          Volunteers support our awareness campaigns, fundraising activities and community events.
        </p>
        <Link
          href="/volunteer"
          className="text-primary mt-4 inline-block rounded bg-white px-5 py-2 text-xs font-semibold uppercase transition hover:bg-gray-100"
        >
          Volunteer With Us
        </Link>
      </div>
    </aside>
  );
}
