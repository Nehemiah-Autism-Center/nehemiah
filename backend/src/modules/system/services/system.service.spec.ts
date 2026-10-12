import { IDatabaseHealthRepository } from '../interfaces/database-health-repository.interface';
import { SystemService } from './system.service';

function serviceWith(ping: () => Promise<void>): SystemService {
  const repository: IDatabaseHealthRepository = { ping };
  return new SystemService(repository);
}

describe('SystemService', () => {
  afterEach(() => jest.useRealTimers());

  it('reports the process as alive without touching the database', () => {
    const ping = jest.fn(() => Promise.resolve());

    expect(serviceWith(ping).liveness()).toMatchObject({ status: 'ok' });
    expect(ping).not.toHaveBeenCalled();
  });

  it('reports ready when PostgreSQL answers', async () => {
    await expect(serviceWith(() => Promise.resolve()).readiness()).resolves.toMatchObject({
      status: 'ok',
      checks: { postgresql: 'connected' },
    });
  });

  it('reports unavailable when the PostgreSQL probe fails', async () => {
    const failing = () => Promise.reject(new Error('connect ECONNREFUSED'));

    await expect(serviceWith(failing).readiness()).resolves.toMatchObject({
      status: 'unavailable',
      checks: { postgresql: 'unavailable' },
    });
  });

  it('reports unavailable when the PostgreSQL probe does not answer within two seconds', async () => {
    jest.useFakeTimers();
    const readiness = serviceWith(() => new Promise<void>(() => undefined)).readiness();

    await jest.advanceTimersByTimeAsync(2_000);

    await expect(readiness).resolves.toMatchObject({
      status: 'unavailable',
      checks: { postgresql: 'unavailable' },
    });
  });
});
