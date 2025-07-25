"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthController = void 0;
const common_1 = require("@nestjs/common");
const terminus_1 = require("@nestjs/terminus");
const swagger_1 = require("@nestjs/swagger");
const prisma_health_indicator_1 = require("./prisma-health.indicator");
let HealthController = class HealthController extends terminus_1.HealthIndicator {
    health;
    prismaHealthIndicator;
    startTime = Date.now();
    constructor(health, prismaHealthIndicator) {
        super();
        this.health = health;
        this.prismaHealthIndicator = prismaHealthIndicator;
    }
    check() {
        return this.health.check([
            () => this.prismaHealthIndicator.isHealthy('database'),
            () => this.getUptimeHealth(),
        ]);
    }
    getUptimeHealth() {
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
};
exports.HealthController = HealthController;
__decorate([
    (0, common_1.Get)(),
    (0, terminus_1.HealthCheck)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Health check endpoint',
        description: 'Returns the health status of the application including database connectivity and uptime',
    }),
    (0, swagger_1.ApiResponse)({
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
                                message: {
                                    type: 'string',
                                    example: 'Database connection is healthy',
                                },
                                timestamp: {
                                    type: 'string',
                                    example: '2024-01-20T10:30:00.000Z',
                                },
                            },
                        },
                        uptime: {
                            type: 'object',
                            properties: {
                                status: { type: 'string', example: 'up' },
                                uptime: { type: 'string', example: '0d 0h 5m 30s' },
                                uptimeMs: { type: 'number', example: 330000 },
                                startTime: {
                                    type: 'string',
                                    example: '2024-01-20T10:24:30.000Z',
                                },
                            },
                        },
                    },
                },
                error: { type: 'object' },
                details: { type: 'object' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 503,
        description: 'Application is unhealthy',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "check", null);
exports.HealthController = HealthController = __decorate([
    (0, swagger_1.ApiTags)('health'),
    (0, common_1.Controller)('health'),
    __metadata("design:paramtypes", [terminus_1.HealthCheckService,
        prisma_health_indicator_1.PrismaHealthIndicator])
], HealthController);
//# sourceMappingURL=health.controller.js.map