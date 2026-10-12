import type { Metadata } from 'next';
import { GalleryPage } from '@/features/gallery';

export const metadata: Metadata = {
  title: 'Gallery',
};

export default function Page() {
  return <GalleryPage />;
}
