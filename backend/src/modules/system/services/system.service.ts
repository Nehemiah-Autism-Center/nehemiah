import { Inject, Injectable } from '@nestjs/common';
import {
  DATABASE_HEALTH_REPOSITORY,
  IDatabaseHealthRepository,
} from '../interfaces/database-health-repository.interface';

const DATABASE_PROBE_TIMEOUT_MS = 2_000;

export type DependencyStatus = 'connected' | 'unavailable';

export interface LivenessReport {
  status: 'ok';
  timestamp: string;
}

export interface ReadinessReport {
  status: 'ok' | 'unavailable';
  checks: { postgresql: DependencyStatus };
  timestamp: string;
}

@Injectable()
export class SystemService {
  constructor(
    @Inject(DATABASE_HEALTH_REPOSITORY) private readonly database: IDatabaseHealthRepository,
  ) {}

  liveness(): LivenessReport {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }

  async readiness(): Promise<ReadinessReport> {
    const postgresql = await this.probeDatabase();
    return {
      status: postgresql === 'connected' ? 'ok' : 'unavailable',
      checks: { postgresql },
      timestamp: new Date().toISOString(),
    };
  }

  private async probeDatabase(): Promise<DependencyStatus> {
    let timeout: NodeJS.Timeout | undefined;
    const timedOut = new Promise<false>((resolve) => {
      timeout = setTimeout(() => resolve(false), DATABASE_PROBE_TIMEOUT_MS);
    });

    try {
      const answered = await Promise.race([this.database.ping().then(() => true), timedOut]);
      return answered ? 'connected' : 'unavailable';
    } catch {
      return 'unavailable';
    } finally {
      clearTimeout(timeout);
    }
  }
}
