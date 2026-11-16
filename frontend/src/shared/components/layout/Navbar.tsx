import Link from 'next/link';

export function Navbar() {
  return (
    <nav className="bg-card border-b px-6 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          Nehemiah
        </Link>
        <div className="flex gap-4">
          <Link href="/login" className="hover:text-primary text-sm">
            Sign In
          </Link>
          <Link href="/register" className="hover:text-primary text-sm">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}
