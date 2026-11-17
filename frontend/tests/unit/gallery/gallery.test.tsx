import { fireEvent, screen, waitFor, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { renderIn } from '../helpers';

vi.mock('next/navigation', () => ({
  usePathname: () => '/en/gallery',
  useSearchParams: () => new URLSearchParams(),
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), prefetch: vi.fn() }),
}));

import { GalleryBrowser } from '@/features/gallery/components/GalleryBrowser';
import { GALLERY_CATEGORIES, GALLERY_PHOTOS } from '@/features/gallery/data';

const photoButtons = () => screen.getAllByRole('button', { name: /^Open photo larger:/ });

describe('GalleryBrowser', () => {
  it('offers all 13 categories plus "All photos", with a photo count for each', () => {
    renderIn('en', <GalleryBrowser />);
    const select = screen.getByRole('combobox', { name: 'Show photos from' }) as HTMLSelectElement;
    expect([...select.options].map((o) => o.textContent)).toEqual([
      `All photos (${GALLERY_PHOTOS.length})`,
      ...GALLERY_CATEGORIES.map(
        (c) =>
          `${c.title.en} (${GALLERY_PHOTOS.filter((p) => p.categories.includes(c.id)).length})`,
      ),
    ]);
    expect(select.options).toHaveLength(14);
  });

  it('shows every photo as a keyboard-focusable button that describes the picture', () => {
    renderIn('en', <GalleryBrowser />);
    expect(photoButtons()).toHaveLength(GALLERY_PHOTOS.length);
    expect(photoButtons()[0]).toHaveAccessibleName(/Open photo larger: .{10,}/);
  });

  it('filters to the photos that visibly belong to a category', () => {
    renderIn('en', <GalleryBrowser />);
    fireEvent.change(screen.getByRole('combobox', { name: 'Show photos from' }), {
      target: { value: 'certificate-recognition' },
    });
    expect(photoButtons()).toHaveLength(2);
    expect(
      screen.getByText(
        /Celebrating and recognizing individuals whose dedication, service, and contributions/,
      ),
    ).toBeInTheDocument();
  });

  it('says so when a category has no photographs instead of showing unrelated pictures', () => {
    renderIn('en', <GalleryBrowser />);
    fireEvent.change(screen.getByRole('combobox', { name: 'Show photos from' }), {
      target: { value: 'free-medical-examinations' },
    });
    expect(screen.queryAllByRole('button', { name: /^Open photo larger:/ })).toHaveLength(0);
    expect(screen.getByRole('status')).toHaveTextContent(
      'Photos for this category will be added soon.',
    );
  });

  it('opens a labelled lightbox, moves between photos with the arrow keys, and closes with Escape', async () => {
    renderIn('en', <GalleryBrowser />);
    const opener = photoButtons()[0];
    opener.focus();
    fireEvent.click(opener);

    const dialog = await screen.findByRole('dialog');
    expect(within(dialog).getByRole('img')).toHaveAccessibleName(/.{10,}/);
    expect(dialog).toHaveAccessibleDescription(`1 / ${GALLERY_PHOTOS.length}`);

    fireEvent.keyDown(dialog, { key: 'ArrowRight' });
    expect(dialog).toHaveAccessibleDescription(`2 / ${GALLERY_PHOTOS.length}`);
    fireEvent.keyDown(dialog, { key: 'ArrowLeft' });
    fireEvent.keyDown(dialog, { key: 'ArrowLeft' });
    expect(dialog).toHaveAccessibleDescription(
      `${GALLERY_PHOTOS.length} / ${GALLERY_PHOTOS.length}`,
    );

    fireEvent.keyDown(dialog, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    // focus goes back to the photo that opened the lightbox (WCAG 2.4.3)
    await waitFor(() => expect(opener).toHaveFocus());
  });

  it('has named previous, next and close controls', async () => {
    renderIn('en', <GalleryBrowser />);
    fireEvent.click(photoButtons()[0]);
    const dialog = await screen.findByRole('dialog');
    for (const name of ['Previous photo', 'Next photo', 'Close']) {
      expect(within(dialog).getByRole('button', { name })).toBeInTheDocument();
    }
  });

  it('labels the controls in Amharic and shows English category text tagged lang="en"', () => {
    renderIn('am', <GalleryBrowser />);
    const select = screen.getByRole('combobox', { name: 'ፎቶዎችን አሳይ' }) as HTMLSelectElement;
    expect(select.options[0].textContent).toBe(`ሁሉም ፎቶዎች (${GALLERY_PHOTOS.length})`);
    // category names have no approved Amharic yet -> English, tagged as such
    expect(select.options[1]).toHaveAttribute('lang', 'en');
    expect(select.options[0]).not.toHaveAttribute('lang');
  });
});
