import Image from 'next/image';
import Link from 'next/link';
import { Calendar } from 'lucide-react';
import { events } from '@/features/events/data';

const categories = [
  { name: 'Fundraising', count: 4 },
  { name: 'Community', count: 3 },
  { name: 'Education', count: 5 },
  { name: 'Health', count: 2 },
];

export default function EventSidebar() {
  return (
    <aside className="space-y-8">
      {/* Upcoming Events */}
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h4 className="text-heading mb-4 font-serif text-lg font-semibold">Upcoming Events</h4>
        <div className="space-y-4">
          {events.slice(0, 3).map((event) => (
            <Link
              key={event.slug}
              href={`/events/${event.slug}`}
              className="group flex items-center gap-3"
            >
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded">
                <Image src={event.image} alt={event.title} fill className="object-cover" />
              </div>
              <div>
                <h5 className="text-heading group-hover:text-primary text-sm font-semibold transition">
                  {event.title}
                </h5>
                <p className="text-foreground flex items-center gap-1 text-xs">
                  <Calendar size={10} />
                  {event.date}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h4 className="text-heading mb-4 font-serif text-lg font-semibold">Categories</h4>
        <ul className="space-y-3">
          {categories.map((category) => (
            <li key={category.name}>
              <Link
                href={`/events?category=${category.name.toLowerCase()}`}
                className="text-foreground hover:text-primary flex items-center justify-between text-sm transition"
              >
                <span>{category.name}</span>
                <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-semibold">
                  {category.count}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
