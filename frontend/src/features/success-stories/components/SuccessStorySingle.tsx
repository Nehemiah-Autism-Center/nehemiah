import Image from 'next/image';
import { User } from 'lucide-react';

interface SuccessStorySingleProps {
  story: {
    title: string;
    content: string;
    images: string[];
  };
}

export default function SuccessStorySingle({ story }: SuccessStorySingleProps) {
  return (
    <article className="space-y-8">
      {/* Featured Image */}
      <div className="relative aspect-video overflow-hidden rounded-lg">
        <Image src={story.images[0]} alt={story.title} fill className="object-cover" />
      </div>

      {/* Story Details Bar (Mimicking Event Details) */}
      <div className="grid grid-cols-1 gap-4 rounded-lg bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
          <div>
            <p className="text-xs text-foreground">Category</p>
            <p className="text-sm font-semibold text-heading">Success Story</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {story.content.split('\n\n').map((paragraph, index) => (
          <p key={index} className="text-foreground leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Additional Images Grid (Since the user requested 3 images per story) */}
      <div className="grid grid-cols-2 gap-4 mt-8">
        <div className="relative aspect-video overflow-hidden rounded-lg">
          <Image src={story.images[1]} alt={`${story.title} 2`} fill className="object-cover" />
        </div>
        <div className="relative aspect-video overflow-hidden rounded-lg">
          <Image src={story.images[2]} alt={`${story.title} 3`} fill className="object-cover" />
        </div>
      </div>
    </article>
  );
}
