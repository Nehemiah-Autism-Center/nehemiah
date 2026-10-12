import { render, screen, within } from '@testing-library/react';
import { CharityFooter } from '@/shared/components/layout/CharityFooter';

// The text links listed under a footer heading (Connect also renders social icons after them).
function linksIn(groupHeading: string): Array<[string, string | null]> {
  const list = screen.getByRole('heading', { name: groupHeading }).nextElementSibling;
  if (!(list instanceof HTMLElement)) throw new Error(`No link list under "${groupHeading}"`);
  return within(list)
    .getAllByRole('link')
    .map((link) => [link.textContent ?? '', link.getAttribute('href')]);
}

describe('CharityFooter', () => {
  it('shows the three link groups from the content document', () => {
    render(<CharityFooter />);

    expect(linksIn('Support')).toEqual([
      ['Volunteer', '/volunteer'],
      ['Donate', '/donate'],
      ['FAQ', '/faq'],
      ['Events', '/events'],
    ]);
    expect(linksIn('Discover')).toEqual([
      ['About Us', '/about'],
      ['Our Services', '/services'],
      ['Gallery', '/gallery'],
      ['Blog', '/blog'],
    ]);
    expect(linksIn('Connect')).toEqual([
      ['Contact Us', '/contact'],
      ['Visit the Center', '/contact#visit'],
    ]);
  });

  it('links the real email, both phone numbers and all six social profiles', () => {
    render(<CharityFooter />);

    expect(screen.getByRole('link', { name: 'nehemiah.center@yahoo.com' })).toHaveAttribute(
      'href',
      'mailto:nehemiah.center@yahoo.com',
    );
    expect(screen.getByRole('link', { name: '+251 93 001 2652' })).toHaveAttribute(
      'href',
      'tel:+251930012652',
    );
    expect(screen.getByRole('link', { name: '+251 97 905 0917' })).toHaveAttribute(
      'href',
      'tel:+251979050917',
    );
    for (const network of ['Instagram', 'Facebook', 'TikTok', 'YouTube', 'LinkedIn', 'X']) {
      expect(
        screen.getByRole('link', { name: `Nehemiah Autism Center on ${network}` }),
      ).toHaveAttribute('href', expect.stringMatching(/^https:\/\//));
    }
  });
});
