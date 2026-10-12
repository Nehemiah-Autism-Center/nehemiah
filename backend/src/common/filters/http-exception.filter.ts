import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { safeRequestPath } from '../logging/safe-request-path';

interface ValidationErrorResponse {
  message?: string | string[];
  error?: string;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const reply = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();
    const statusCode =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const response =
      exception instanceof HttpException ? exception.getResponse() : 'Internal server error';
    const details =
      typeof response === 'object' && response !== null
        ? (response as ValidationErrorResponse)
        : undefined;
    const message =
      details?.message ?? (typeof response === 'string' ? response : 'Request failed');
    // Error bodies are captured by proxies and client error trackers, so they get the same
    // redaction as logs: no query string, no emails or newsletter tokens.
    const path = safeRequestPath(request);

    if (statusCode >= HttpStatus.INTERNAL_SERVER_ERROR) {
      const stack = exception instanceof Error ? exception.stack : String(exception);
      this.logger.error(`${request.method} ${path} failed with ${statusCode}`, stack);
    }

    reply.status(statusCode).send({
      success: false,
      statusCode,
      message,
      error: details?.error,
      path,
      timestamp: new Date().toISOString(),
    });
  }
}
