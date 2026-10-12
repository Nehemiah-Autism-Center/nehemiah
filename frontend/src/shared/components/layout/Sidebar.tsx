import Link from 'next/link';

const links = [{ href: '/dashboard', label: 'Dashboard' }];

export function Sidebar() {
  return (
    <aside className="bg-card flex w-full flex-col border-b px-4 py-6 md:w-64 md:border-r md:border-b-0">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="hover:bg-accent rounded px-3 py-2 text-sm"
        >
          {link.label}
        </Link>
      ))}
    </aside>
  );
}
