import { ConfigService } from '@nestjs/config';
import { IncomingMessage, ServerResponse } from 'node:http';
import { SecurityHeadersMiddleware } from './security-headers.middleware';

function run(
  environment: string,
  request: { url?: string; headers?: Record<string, string | string[]> },
): Record<string, string> {
  const headers: Record<string, string> = {};
  const response = {
    setHeader: (name: string, value: string) => {
      headers[name] = value;
    },
  } as unknown as ServerResponse;
  const config = { get: () => environment } as unknown as ConfigService;
  const next = jest.fn();

  new SecurityHeadersMiddleware(config).use(
    { url: '/api/v1/system/health', headers: {}, ...request } as unknown as IncomingMessage,
    response,
    next,
  );

  expect(next).toHaveBeenCalledTimes(1);
  return headers;
}

describe('SecurityHeadersMiddleware', () => {
  it('sets the hardened header set on API responses', () => {
    const headers = run('development', {});

    expect(headers).toMatchObject({
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'Referrer-Policy': 'no-referrer',
      'Cross-Origin-Resource-Policy': 'same-site',
      'Cache-Control': 'no-store',
    });
    expect(headers['Content-Security-Policy']).toContain("default-src 'none'");
  });

  it('relaxes the CSP only for the Swagger UI so its assets can load', () => {
    const headers = run('development', { url: '/api/v1/docs/index.html' });

    expect(headers['Content-Security-Policy']).toContain("script-src 'self' 'unsafe-inline'");
    expect(headers['Content-Security-Policy']).toContain("frame-ancestors 'none'");
  });

  it('sends HSTS only in production', () => {
    expect(run('development', {})['Strict-Transport-Security']).toBeUndefined();
    expect(run('production', {})['Strict-Transport-Security']).toBe(
      'max-age=31536000; includeSubDomains',
    );
  });

  it('propagates a well-formed caller request id', () => {
    const headers = run('development', { headers: { 'x-request-id': 'trace-1234abcd' } });

    expect(headers['X-Request-Id']).toBe('trace-1234abcd');
  });

  it('replaces a malformed request id instead of echoing it into logs and responses', () => {
    const headers = run('development', { headers: { 'x-request-id': 'bad id\r\nX-Injected: 1' } });

    expect(headers['X-Request-Id']).not.toContain('bad id');
    expect(headers['X-Request-Id']).toMatch(/^[0-9a-f-]{36}$/);
  });
});
