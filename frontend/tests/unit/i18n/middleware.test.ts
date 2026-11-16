// @vitest-environment node
import { NextRequest } from 'next/server';
import { describe, expect, it } from 'vitest';
import { middleware } from '@/middleware';

const BASE = 'http://localhost:3001';

function request(path: string, init: { cookie?: string; headers?: Record<string, string> } = {}) {
  const headers = new Headers(init.headers);
  if (init.cookie) headers.set('cookie', `NEXT_LOCALE=${init.cookie}`);
  return new NextRequest(`${BASE}${path}`, { headers });
}

const setCookie = (res: Response) => res.headers.get('set-cookie');

describe('middleware: redirects', () => {
  it('sends an unprefixed request to English by default', () => {
    const res = middleware(request('/about'));
    expect(res.status).toBe(307);
    expect(res.headers.get('location')).toBe(`${BASE}/en/about`);
  });

  it("sends an unprefixed request to the visitor's remembered language", () => {
    const res = middleware(request('/', { cookie: 'am' }));
    expect(res.headers.get('location')).toBe(`${BASE}/am`);
  });

  it('leaves the scaffold pages alone', () => {
    const res = middleware(request('/login'));
    expect(res.headers.get('location')).toBeNull();
    expect(setCookie(res)).toBeNull();
  });
});

describe('middleware: remembering the language', () => {
  it('remembers the language of a real page request (typed or shared link)', () => {
    const cookie = setCookie(middleware(request('/am/about')));
    expect(cookie).toContain('NEXT_LOCALE=am');
    expect(cookie).toMatch(/Max-Age=31536000/i);
    expect(cookie).toMatch(/SameSite=lax/i);
  });

  it('does not rewrite a cookie that is already correct', () => {
    expect(setCookie(middleware(request('/am/about', { cookie: 'am' })))).toBeNull();
  });

  it('IGNORES router prefetches: viewing a link to the other language must not switch the language', () => {
    // Regression: the page's own "English" switcher link was prefetched, which flipped an
    // Amharic visitor's saved language back to English while they were reading.
    const prefetch = request('/en', {
      cookie: 'am',
      headers: { rsc: '1', 'next-router-prefetch': '1' },
    });
    expect(setCookie(middleware(prefetch))).toBeNull();
  });

  it('ignores client-side navigations too (the switcher records its own click)', () => {
    expect(
      setCookie(middleware(request('/en/about', { cookie: 'am', headers: { rsc: '1' } }))),
    ).toBeNull();
  });
});
