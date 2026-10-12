import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

const DANGEROUS_HTML = /<\s*script\b|on[a-z]+\s*=|javascript\s*:/i;
const CONTROL_CHARACTERS = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/;
const FORBIDDEN_KEYS = new Set(['__proto__', 'prototype', 'constructor']);
/**
 * Fields whose values may be rendered as HTML: blog and CMS page bodies (`content`) and CMS page
 * metadata. Executable markup is rejected anywhere inside them as defence in depth; the renderer
 * must still sanitize. Every other string is plain text, which React escapes when it renders, so
 * it is deliberately not screened: the pattern would reject ordinary text such as "online=false".
 */
const RICH_CONTENT_KEYS = new Set(['content', 'metadata']);

@Injectable()
export class RequestSanitizationPipe implements PipeTransform {
  transform(value: unknown): unknown {
    this.inspect(value, false);
    return value;
  }

  private inspect(value: unknown, insideRichContent: boolean): void {
    if (typeof value === 'string') {
      if (CONTROL_CHARACTERS.test(value)) {
        throw new BadRequestException('Request contains unsupported control characters');
      }
      if (insideRichContent && DANGEROUS_HTML.test(value)) {
        throw new BadRequestException('Request contains unsafe executable content');
      }
      return;
    }
    if (Array.isArray(value)) {
      value.forEach((entry) => this.inspect(entry, insideRichContent));
      return;
    }
    if (!value || typeof value !== 'object') return;
    for (const [childKey, childValue] of Object.entries(value)) {
      if (FORBIDDEN_KEYS.has(childKey)) {
        throw new BadRequestException('Request contains a forbidden object key');
      }
      this.inspect(childValue, insideRichContent || RICH_CONTENT_KEYS.has(childKey));
    }
  }
}
