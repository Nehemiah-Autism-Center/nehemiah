import Image from 'next/image';
import Link from 'next/link';
import { Calendar } from 'lucide-react';

interface EventCardProps {
  image: string;
  title: string;
  description: string;
  date: string;
  slug: string;
}

export default function EventCard({ image, title, description, date, slug }: EventCardProps) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image src={image} alt={title} fill className="object-cover" />
        <div className="bg-primary absolute bottom-0 left-0 flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white">
          <Calendar size={14} />
          {date}
        </div>
      </div>
      <div className="p-6">
        <h5 className="text-heading hover:text-primary font-serif text-lg font-semibold transition">
          <Link href={`/events/${slug}`}>{title}</Link>
        </h5>
        <p className="text-foreground mt-2 line-clamp-3 text-sm">{description}</p>
        <Link
          href={`/events/${slug}`}
          className="text-primary hover:text-primary-dark mt-4 inline-block text-sm font-semibold uppercase transition"
        >
          Read More &raquo;
        </Link>
      </div>
    </div>
  );
}
