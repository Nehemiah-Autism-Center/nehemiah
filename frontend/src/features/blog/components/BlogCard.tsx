import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User } from 'lucide-react';

interface BlogCardProps {
  image: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  slug: string;
}

export default function BlogCard({ image, title, excerpt, date, author, slug }: BlogCardProps) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-sm transition hover:shadow-md">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      <div className="p-6">
        <div className="text-foreground mb-3 flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {date}
          </span>
          <span className="flex items-center gap-1">
            <User size={12} />
            {author}
          </span>
        </div>
        <h5 className="text-heading hover:text-primary font-serif text-lg font-semibold transition">
          <Link href={`/blog/${slug}`}>{title}</Link>
        </h5>
        <p className="text-foreground mt-2 line-clamp-2 text-sm">{excerpt}</p>
        <Link
          href={`/blog/${slug}`}
          className="text-primary hover:text-primary-dark mt-4 inline-block text-sm font-semibold transition"
        >
          Read More &raquo;
        </Link>
      </div>
    </div>
  );
}
