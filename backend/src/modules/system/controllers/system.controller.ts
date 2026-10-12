import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FastifyReply } from 'fastify';
import { LivenessReport, ReadinessReport, SystemService } from '../services/system.service';

@ApiTags('System')
@Controller('system')
export class SystemController {
  constructor(private readonly systemService: SystemService) {}

  @Get('health/live')
  @ApiOperation({ summary: 'Check whether the API process is alive' })
  @ApiResponse({ status: 200, description: 'The API process is accepting requests' })
  liveness(): LivenessReport {
    return this.systemService.liveness();
  }

  @Get(['health', 'health/ready'])
  @ApiOperation({ summary: 'Check whether the API can reach PostgreSQL' })
  @ApiResponse({ status: 200, description: 'PostgreSQL is reachable' })
  @ApiResponse({ status: 503, description: 'PostgreSQL is unavailable' })
  async readiness(@Res({ passthrough: true }) reply: FastifyReply): Promise<ReadinessReport> {
    const report = await this.systemService.readiness();
    if (report.status === 'unavailable') reply.status(HttpStatus.SERVICE_UNAVAILABLE);
    return report;
  }
}
