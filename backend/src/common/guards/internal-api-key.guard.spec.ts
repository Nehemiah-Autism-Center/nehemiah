import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExecutionContext } from '@nestjs/common';
import * as crypto from 'node:crypto';
import { InternalApiKeyGuard } from './internal-api-key.guard';

describe('InternalApiKeyGuard', () => {
  const expectedKey = 'internal-job-key-with-at-least-32-characters';
  const config = {
    getOrThrow: jest.fn().mockReturnValue(expectedKey),
  } as unknown as ConfigService;
  const guard = new InternalApiKeyGuard(config);

  function context(key?: string): ExecutionContext {
    return {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: key ? { 'x-internal-api-key': key } : {},
        }),
      }),
    } as ExecutionContext;
  }

  it('accepts the configured internal API key', () => {
    expect(guard.canActivate(context(expectedKey))).toBe(true);
  });

  it.each([undefined, 'wrong-key'])('rejects a missing or invalid key', (key) => {
    expect(() => guard.canActivate(context(key))).toThrow(UnauthorizedException);
  });

  it('rejects a key that shares the expected prefix but differs in length', () => {
    expect(() => guard.canActivate(context(`${expectedKey}-extra`))).toThrow(
      UnauthorizedException,
    );
  });

  it('runs the constant-time comparison even when the key length is wrong', () => {
    const compare = jest.spyOn(crypto, 'timingSafeEqual');

    expect(() => guard.canActivate(context('short'))).toThrow(UnauthorizedException);

    // A length check that short-circuits first would let response timing reveal the key length.
    expect(compare).toHaveBeenCalledTimes(1);
    const [supplied, expected] = compare.mock.calls[0] as [Buffer, Buffer];
    expect(supplied.length).toBe(expected.length);
  });
});
