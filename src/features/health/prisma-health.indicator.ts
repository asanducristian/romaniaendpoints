import { Injectable } from '@nestjs/common';
import {
  HealthIndicator,
  HealthIndicatorResult,
  HealthCheckError,
} from '@nestjs/terminus';
import { PrismaService } from '../../shared/prisma.service';

@Injectable()
export class PrismaHealthIndicator extends HealthIndicator {
  constructor(private readonly prismaService: PrismaService) {
    super();
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    try {
      // Try to execute a simple query to check if the database is accessible
      await this.prismaService.$queryRaw`SELECT 1`;

      return this.getStatus(key, true, {
        status: 'up',
        message: 'Database connection is healthy',
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      const result = this.getStatus(key, false, {
        status: 'down',
        message: 'Database connection failed',
        error: error.message,
        timestamp: new Date().toISOString(),
      });

      throw new HealthCheckError('Database check failed', result);
    }
  }
}
