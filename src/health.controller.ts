import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HealthCheck, HealthCheckService, HealthCheckResult, HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus';
import { PrismaHealthIndicator } from './prisma-health.indicator';

@ApiTags('health')
@Controller('health')
export class HealthController extends HealthIndicator {
  private readonly startTime = Date.now();

  constructor(
    private health: HealthCheckService,
    private prismaHealthIndicator: PrismaHealthIndicator,
  ) {
    super();
  }

  @Get()
  @HealthCheck()
  @ApiOperation({ 
    summary: 'Health check endpoint',
    description: 'Returns the health status of the application including database connectivity and uptime'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Application is healthy',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'ok' },
        info: {
          type: 'object',
          properties: {
            database: {
              type: 'object',
              properties: {
                status: { type: 'string', example: 'up' },
                message: { type: 'string', example: 'Database connection is healthy' },
                timestamp: { type: 'string', example: '2024-01-20T10:30:00.000Z' }
              }
            },
            uptime: {
              type: 'object',
              properties: {
                status: { type: 'string', example: 'up' },
                uptime: { type: 'string', example: '0d 0h 5m 30s' },
                uptimeMs: { type: 'number', example: 330000 },
                startTime: { type: 'string', example: '2024-01-20T10:24:30.000Z' }
              }
            }
          }
        },
        error: { type: 'object' },
        details: { type: 'object' }
      }
    }
  })
  @ApiResponse({ 
    status: 503, 
    description: 'Application is unhealthy' 
  })
  check(): Promise<HealthCheckResult> {
    return this.health.check([
      () => this.prismaHealthIndicator.isHealthy('database'),
      () => this.getUptimeHealth(),
    ]);
  }

  private getUptimeHealth(): HealthIndicatorResult {
    const uptime = Date.now() - this.startTime;
    const uptimeSeconds = Math.floor(uptime / 1000);
    const uptimeMinutes = Math.floor(uptimeSeconds / 60);
    const uptimeHours = Math.floor(uptimeMinutes / 60);
    const uptimeDays = Math.floor(uptimeHours / 24);

    const uptimeString = `${uptimeDays}d ${uptimeHours % 24}h ${uptimeMinutes % 60}m ${uptimeSeconds % 60}s`;

    return this.getStatus('uptime', true, {
      uptime: uptimeString,
      uptimeMs: uptime,
      startTime: new Date(this.startTime).toISOString(),
    });
  }
} 