import { afterEach, describe, expect, it, vi } from 'vitest';
import { loc, locProvisional, resolve, text } from '@/shared/i18n/localized';
import { t, tr, ui } from '@/shared/i18n/ui';

describe('resolve', () => {
  it('returns English for the English locale without marking a fallback', () => {
    expect(resolve(loc('Hello', 'ሰላም'), 'en')).toEqual({
      value: 'Hello',
      lang: 'en',
      isFallback: false,
    });
  });

  it('returns approved Amharic for the Amharic locale', () => {
    expect(resolve(loc('Hello', 'ሰላም'), 'am')).toEqual({
      value: 'ሰላም',
      lang: 'am',
      isFallback: false,
    });
  });

  it('falls back to English, and says so, when no Amharic exists', () => {
    expect(resolve(loc('Hello'), 'am')).toEqual({ value: 'Hello', lang: 'en', isFallback: true });
  });

  it('uses provisional Amharic by default', () => {
    const field = locProvisional('Home', 'መነሻ');
    expect(resolve(field, 'am')).toEqual({ value: 'መነሻ', lang: 'am', isFallback: false });
    expect(field.amProvisional).toBe(true);
  });

  it('shows English instead of provisional Amharic when it is switched off', async () => {
    vi.resetModules();
    vi.stubEnv('NEXT_PUBLIC_HIDE_PROVISIONAL_AMHARIC', 'true');
    const fresh = await import('@/shared/i18n/localized');
    const provisional = fresh.resolve(fresh.locProvisional('Home', 'መነሻ'), 'am');
    expect(provisional).toEqual({ value: 'Home', lang: 'en', isFallback: true });
    // approved Amharic is unaffected
    expect(fresh.resolve(fresh.loc('Learn More', 'ተጨማሪ ይወቁ'), 'am').value).toBe('ተጨማሪ ይወቁ');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });
});

describe('text', () => {
  it('returns a plain string for attributes', () => {
    expect(text(loc('Close', 'ዝጋ'), 'am')).toBe('ዝጋ');
    expect(text(loc('Close'), 'am')).toBe('Close');
  });
});

describe('interface dictionary', () => {
  it('has an English value for every key', () => {
    for (const [key, value] of Object.entries(ui)) {
      expect(value.en, key).toBeTruthy();
    }
  });

  it('flags every proposed (non-document) Amharic label as provisional', () => {
    for (const [key, value] of Object.entries(ui)) {
      const field = value as { am?: string; amProvisional?: boolean };
      if (field.am !== undefined) {
        // Only the document's own button labels and "About Us" are unflagged.
        const approved = [
          'nav.about',
          'cta.support',
          'cta.learnMore',
          'cta.whatWeDo',
          'cta.ourImpact',
          'cta.volunteerWithUs',
          'cta.partnerWithUs',
          'cta.supportMission',
        ];
        expect(Boolean(field.amProvisional), key).toBe(!approved.includes(key));
      }
    }
  });

  it('uses the six approved main-button labels verbatim', () => {
    expect(t('cta.support', 'am')).toBe('ነህምያን ይደግፉ');
    expect(t('cta.learnMore', 'am')).toBe('ተጨማሪ ይወቁ');
    expect(t('cta.whatWeDo', 'am')).toBe('የምንሰራው ምንድን ነው?');
    expect(t('cta.ourImpact', 'am')).toBe('ያስመዘገብነው ውጤት');
    expect(t('cta.volunteerWithUs', 'am')).toBe('ከእኛ ጋር በበጎ ፈቃድ ይሳተፉ');
    expect(t('cta.partnerWithUs', 'am')).toBe('ከእኛ ጋር አጋር ይሁኑ');
  });

  it('tags fallbacks so callers can set lang="en"', () => {
    expect(tr('nav.home', 'en').isFallback).toBe(false);
    expect(tr('nav.home', 'am').isFallback).toBe(false);
  });
});
