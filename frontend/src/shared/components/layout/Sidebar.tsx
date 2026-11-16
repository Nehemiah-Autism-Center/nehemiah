import Link from 'next/link';

const links = [{ href: '/dashboard', label: 'Dashboard' }];

export function Sidebar() {
  return (
    <aside className="bg-card flex w-64 flex-col border-r px-4 py-6">
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
