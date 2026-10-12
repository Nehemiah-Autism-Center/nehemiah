import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { configureApp } from './app.setup';
import { RequestSanitizationPipe } from './common/pipes/request-sanitization.pipe';

type OriginCallback = (error: Error | null, allow?: boolean) => void;
type OriginCheck = (origin: string | undefined, callback: OriginCallback) => void;

function configureFakeApp() {
  const settings: Record<string, unknown> = {
    'app.httpSuccessLogSampleRate': 1,
    'app.httpSlowRequestMs': 750,
    'app.corsOrigins': ['https://nehemiah.example'],
  };
  const app = {
    get: () => ({ getOrThrow: (key: string) => settings[key] }) as unknown as ConfigService,
    setGlobalPrefix: jest.fn(),
    useGlobalFilters: jest.fn(),
    useGlobalInterceptors: jest.fn(),
    useGlobalPipes: jest.fn(),
    enableCors: jest.fn(),
  };

  configureApp(app as unknown as INestApplication);
  return app;
}

function corsDecision(origin: string | undefined): boolean | undefined {
  const app = configureFakeApp();
  const check = app.enableCors.mock.calls[0][0].origin as OriginCheck;
  let allowed: boolean | undefined;
  check(origin, (_error, allow) => {
    allowed = allow;
  });
  return allowed;
}

describe('configureApp', () => {
  it('runs request sanitization before validation so forbidden keys are rejected before whitelisting strips them', () => {
    const pipes = configureFakeApp().useGlobalPipes.mock.calls[0];

    expect(pipes[0]).toBeInstanceOf(RequestSanitizationPipe);
    expect(pipes[1]).toBeInstanceOf(ValidationPipe);
  });

  it('allows the configured frontend origin', () => {
    expect(corsDecision('https://nehemiah.example')).toBe(true);
  });

  it('refuses any other browser origin', () => {
    expect(corsDecision('https://attacker.example')).toBe(false);
  });

  it('allows same-origin and server-to-server requests that send no Origin header', () => {
    expect(corsDecision(undefined)).toBe(true);
  });
});
