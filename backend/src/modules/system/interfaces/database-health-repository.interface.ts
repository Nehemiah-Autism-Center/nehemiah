export const DATABASE_HEALTH_REPOSITORY = 'DATABASE_HEALTH_REPOSITORY';

export interface IDatabaseHealthRepository {
  /** Resolves when PostgreSQL answers a trivial query; rejects otherwise. */
  ping(): Promise<void>;
}
