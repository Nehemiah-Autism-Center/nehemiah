import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/shared/components/ui/badge';
import { blogPosts } from '@/features/blog/data';

// Derived from the posts themselves so the counts can never drift from the content.
const categories = Object.entries(
  blogPosts.reduce<Record<string, number>>((counts, post) => {
    counts[post.category] = (counts[post.category] ?? 0) + 1;
    return counts;
  }, {}),
);
const tags = [...new Set(blogPosts.flatMap((post) => post.tags))];

export default function BlogSidebar() {
  return (
    <aside className="space-y-8">
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h2 className="text-heading mb-4 font-serif text-lg font-semibold">Recent Posts</h2>
        <div className="space-y-4">
          {blogPosts.slice(0, 3).map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex items-center gap-3"
            >
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded">
                <Image src={post.image} alt="" fill className="object-cover" />
              </div>
              <div>
                <h3 className="text-heading group-hover:text-primary text-sm font-semibold transition">
                  {post.title}
                </h3>
                <p className="text-foreground text-xs">{post.date}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h2 className="text-heading mb-4 font-serif text-lg font-semibold">Categories</h2>
        <ul className="space-y-3">
          {categories.map(([name, count]) => (
            <li key={name} className="text-foreground flex items-center justify-between text-sm">
              <span>{name}</span>
              <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-semibold">{count}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h2 className="text-heading mb-4 font-serif text-lg font-semibold">Tags</h2>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </aside>
  );
}
