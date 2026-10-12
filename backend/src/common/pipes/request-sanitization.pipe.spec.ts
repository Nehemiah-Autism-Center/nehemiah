import { BadRequestException } from '@nestjs/common';
import { RequestSanitizationPipe } from './request-sanitization.pipe';

describe('RequestSanitizationPipe', () => {
  const pipe = new RequestSanitizationPipe();

  it('rejects executable CMS content', () => {
    expect(() => pipe.transform({ content: '<script>alert(1)</script>' })).toThrow(
      BadRequestException,
    );
    expect(() => pipe.transform({ content: '<img src=x onerror=alert(1)>' })).toThrow(
      BadRequestException,
    );
  });

  it('rejects executable markup nested anywhere inside CMS metadata', () => {
    expect(() =>
      pipe.transform({ metadata: { hero: { body: '<script>alert(1)</script>' } } }),
    ).toThrow(BadRequestException);
    expect(() => pipe.transform({ metadata: { links: ['javascript:alert(1)'] } })).toThrow(
      BadRequestException,
    );
  });

  it('leaves plain-text fields to be escaped at render time', () => {
    // Would match the executable-markup pattern, but a contact message is never rendered as HTML.
    const contact = { message: 'The form said online=false when I tried to register my son.' };

    expect(pipe.transform(contact)).toEqual(contact);
  });

  it('rejects control characters while preserving ordinary Unicode text', () => {
    expect(() => pipe.transform({ title: 'Unsafe\u0000title' })).toThrow(BadRequestException);
    expect(pipe.transform({ title: 'የኦቲዝም ግንዛቤ' })).toEqual({ title: 'የኦቲዝም ግንዛቤ' });
  });
});
