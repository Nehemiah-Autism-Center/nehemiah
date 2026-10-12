import Image from 'next/image';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { Input } from '@/shared/components/ui/input';
import { Badge } from '@/shared/components/ui/badge';
import { blogPosts } from '@/features/blog/data';

const categories = [
  { name: 'Donations', count: 4 },
  { name: 'Volunteering', count: 6 },
  { name: 'Education', count: 5 },
  { name: 'Health', count: 3 },
  { name: 'Community', count: 7 },
];

const tags = [
  'donations',
  'volunteering',
  'education',
  'health',
  'community',
  'clean water',
  'sustainability',
  'empowerment',
  'scholarships',
  'impact',
];

export default function BlogSidebar() {
  return (
    <aside className="space-y-8">
      {/* Search */}
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h4 className="text-heading mb-4 font-serif text-lg font-semibold">Search</h4>
        <div className="relative">
          <Input type="text" placeholder="Search posts..." className="pr-10" />
          <Search className="text-foreground absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2" />
        </div>
      </div>

      {/* Categories */}
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h4 className="text-heading mb-4 font-serif text-lg font-semibold">Categories</h4>
        <ul className="space-y-3">
          {categories.map((category) => (
            <li key={category.name}>
              <Link
                href={`/blog?category=${category.name.toLowerCase()}`}
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

      {/* Recent Posts */}
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h4 className="text-heading mb-4 font-serif text-lg font-semibold">Recent Posts</h4>
        <div className="space-y-4">
          {blogPosts.slice(0, 3).map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex items-center gap-3"
            >
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded">
                <Image src={post.image} alt={post.title} fill className="object-cover" />
              </div>
              <div>
                <h5 className="text-heading group-hover:text-primary text-sm font-semibold transition">
                  {post.title}
                </h5>
                <p className="text-foreground text-xs">{post.date}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Tags Cloud */}
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h4 className="text-heading mb-4 font-serif text-lg font-semibold">Tags</h4>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link key={tag} href={`/blog?tag=${tag}`}>
              <Badge
                variant="secondary"
                className="hover:bg-primary cursor-pointer transition hover:text-white"
              >
                {tag}
              </Badge>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
