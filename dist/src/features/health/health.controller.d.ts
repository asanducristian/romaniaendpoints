import { HealthCheckService, HealthIndicator, HealthCheckResult } from '@nestjs/terminus';
import { PrismaHealthIndicator } from './prisma-health.indicator';
export declare class HealthController extends HealthIndicator {
    private health;
    private prismaHealthIndicator;
    private readonly startTime;
    constructor(health: HealthCheckService, prismaHealthIndicator: PrismaHealthIndicator);
    check(): Promise<HealthCheckResult>;
    private getUptimeHealth;
}
