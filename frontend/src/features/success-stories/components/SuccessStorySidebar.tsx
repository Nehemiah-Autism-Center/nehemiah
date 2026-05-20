import Image from 'next/image';
import Link from 'next/link';
import { User } from 'lucide-react';
import { successStories } from '@/features/success-stories/data';

export default function SuccessStorySidebar() {
  return (
    <aside className="space-y-8">
      {/* Featured Stories */}
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h4 className="mb-4 font-serif text-lg font-semibold text-heading">Featured Stories</h4>
        <div className="space-y-4">
          {successStories.slice(0, 3).map((story) => (
            <Link
              key={story.slug}
              href={`/success-stories/${story.slug}`}
              className="flex items-center gap-3 group"
            >
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded">
                <Image src={story.images[0]} alt={story.title} fill className="object-cover" />
              </div>
              <div>
                <h5 className="text-sm font-semibold text-heading transition group-hover:text-primary line-clamp-2">
                  {story.title}
                </h5>
                <p className="flex items-center gap-1 text-xs text-foreground mt-1">
                  <User size={10} />
                  Success Story
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
