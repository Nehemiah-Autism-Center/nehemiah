import { Module } from '@nestjs/common';
import { SystemController } from './controllers/system.controller';
import { DATABASE_HEALTH_REPOSITORY } from './interfaces/database-health-repository.interface';
import { DatabaseHealthRepository } from './repositories/database-health.repository';
import { SystemService } from './services/system.service';

@Module({
  controllers: [SystemController],
  providers: [
    SystemService,
    { provide: DATABASE_HEALTH_REPOSITORY, useClass: DatabaseHealthRepository },
  ],
})
export class SystemModule {}
