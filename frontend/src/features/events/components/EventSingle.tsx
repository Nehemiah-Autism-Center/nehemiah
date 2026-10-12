import Image from 'next/image';
import { Calendar, Clock, MapPin, User } from 'lucide-react';
import type { Event } from '@/features/events/types';

interface EventSingleProps {
  event: Event;
}

export default function EventSingle({ event }: EventSingleProps) {
  return (
    <article className="space-y-8">
      {/* Featured Image */}
      <div className="relative aspect-video overflow-hidden rounded-lg">
        <Image src={event.image} alt={event.title} fill className="object-cover" />
      </div>

      {/* Event Details */}
      <div className="grid grid-cols-2 gap-4 rounded-lg bg-white p-6 shadow-sm md:grid-cols-4">
        <div className="flex items-center gap-2">
          <Calendar className="text-primary h-5 w-5" />
          <div>
            <p className="text-foreground text-xs">Date</p>
            <p className="text-heading text-sm font-semibold">{event.date}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="text-primary h-5 w-5" />
          <div>
            <p className="text-foreground text-xs">Time</p>
            <p className="text-heading text-sm font-semibold">{event.time}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="text-primary h-5 w-5" />
          <div>
            <p className="text-foreground text-xs">Location</p>
            <p className="text-heading text-sm font-semibold">{event.location}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <User className="text-primary h-5 w-5" />
          <div>
            <p className="text-foreground text-xs">Organizer</p>
            <p className="text-heading text-sm font-semibold">{event.organizer}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {event.content.split('\n\n').map((paragraph, index) => (
          <p key={index} className="text-foreground leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  );
}
