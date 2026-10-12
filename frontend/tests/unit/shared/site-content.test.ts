import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { NAV_ITEMS, SITE_CONFIG } from '@/shared/lib/constants';

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) return sourceFiles(path);
    return /\.(ts|tsx)$/.test(entry) ? [path] : [];
  });
}

describe('site content', () => {
  it('follows the menu order from the content document', () => {
    expect(NAV_ITEMS.map((item) => [item.label, item.href])).toEqual([
      ['Home', '/'],
      ['About Us', '/about'],
      ['Our Services', '/services'],
      ['Events', '/events'],
      ['Blog', '/blog'],
      ['Contact', '/contact'],
    ]);
  });

  it('publishes the center’s real contact details', () => {
    expect(SITE_CONFIG.email).toBe('nehemiah.center@yahoo.com');
    expect(SITE_CONFIG.phones.map((phone) => phone.tel)).toEqual([
      '+251930012652',
      '+251979050917',
    ]);
    expect(SITE_CONFIG.address).toBe('Kera, Alemazeye Meda, Addis Ababa, Ethiopia');
  });

  it('carries no leftover placeholder content from the HTML template', () => {
    const placeholders = [
      'Sylhet',
      'Bangladesh',
      '+880',
      'UTC+06',
      '501(c)(3)',
      'support@nehemiah.org',
      'Brandon Munson',
      'Generosity Club',
      'Nehemiah Foundation',
      'African Hungry',
      'orphan',
    ];
    const offenders = sourceFiles(join(process.cwd(), 'src')).flatMap((file) => {
      const text = readFileSync(file, 'utf8');
      return placeholders
        .filter((placeholder) => text.toLowerCase().includes(placeholder.toLowerCase()))
        .map((placeholder) => `${file}: ${placeholder}`);
    });

    expect(offenders).toEqual([]);
  });
});
