import { Inject, Injectable } from '@nestjs/common';
import { sql } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DRIZZLE } from '../../../database/drizzle.module';
import * as schema from '../../../database/schema';
import { IDatabaseHealthRepository } from '../interfaces/database-health-repository.interface';

@Injectable()
export class DatabaseHealthRepository implements IDatabaseHealthRepository {
  constructor(@Inject(DRIZZLE) private readonly db: NodePgDatabase<typeof schema>) {}

  async ping(): Promise<void> {
    await this.db.execute(sql`select 1`);
  }
}
