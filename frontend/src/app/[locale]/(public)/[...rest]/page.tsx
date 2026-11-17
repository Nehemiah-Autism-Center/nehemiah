import { notFound } from 'next/navigation';

// Any unknown URL under /en or /am ends up here so the localized 404 (with header and footer)
// is shown instead of Next's default page.
export default function UnknownRoute() {
  notFound();
}
