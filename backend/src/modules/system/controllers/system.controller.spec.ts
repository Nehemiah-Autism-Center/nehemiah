import { FastifyReply } from 'fastify';
import { ReadinessReport, SystemService } from '../services/system.service';
import { SystemController } from './system.controller';

function controllerReporting(report: ReadinessReport): SystemController {
  const service = { readiness: () => Promise.resolve(report) } as unknown as SystemService;
  return new SystemController(service);
}

describe('SystemController', () => {
  it('answers 503 when PostgreSQL is unavailable so orchestrators stop routing traffic', async () => {
    const status = jest.fn();
    const report: ReadinessReport = {
      status: 'unavailable',
      checks: { postgresql: 'unavailable' },
      timestamp: new Date().toISOString(),
    };

    await controllerReporting(report).readiness({ status } as unknown as FastifyReply);

    expect(status).toHaveBeenCalledWith(503);
  });

  it('leaves the default 200 status when PostgreSQL is connected', async () => {
    const status = jest.fn();
    const report: ReadinessReport = {
      status: 'ok',
      checks: { postgresql: 'connected' },
      timestamp: new Date().toISOString(),
    };

    await controllerReporting(report).readiness({ status } as unknown as FastifyReply);

    expect(status).not.toHaveBeenCalled();
  });
});
