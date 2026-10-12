import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FastifyRequest } from 'fastify';
import { createHash, timingSafeEqual } from 'node:crypto';

@Injectable()
export class InternalApiKeyGuard implements CanActivate {
  constructor(private readonly config: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const suppliedKey = request.headers['x-internal-api-key'];
    const expectedKey = this.config.getOrThrow<string>('app.internalApiKey');

    if (typeof suppliedKey !== 'string' || !this.keysMatch(suppliedKey, expectedKey)) {
      throw new UnauthorizedException('Invalid internal API key');
    }

    return true;
  }

  private keysMatch(supplied: string, expected: string): boolean {
    // Hash both sides to a fixed width first: timingSafeEqual throws on unequal lengths, and a
    // length check that short-circuits beforehand would leak the key length through timing.
    return timingSafeEqual(this.digest(supplied), this.digest(expected));
  }

  private digest(value: string): Buffer {
    return createHash('sha256').update(value).digest();
  }
}
