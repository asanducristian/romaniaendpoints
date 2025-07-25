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
exports.PrismaHealthIndicator = void 0;
const common_1 = require("@nestjs/common");
const terminus_1 = require("@nestjs/terminus");
const prisma_service_1 = require("../../shared/prisma.service");
let PrismaHealthIndicator = class PrismaHealthIndicator extends terminus_1.HealthIndicator {
    prismaService;
    constructor(prismaService) {
        super();
        this.prismaService = prismaService;
    }
    async isHealthy(key) {
        try {
            await this.prismaService.$queryRaw `SELECT 1`;
            return this.getStatus(key, true, {
                status: 'up',
                message: 'Database connection is healthy',
                timestamp: new Date().toISOString(),
            });
        }
        catch (error) {
            const result = this.getStatus(key, false, {
                status: 'down',
                message: 'Database connection failed',
                error: error.message,
                timestamp: new Date().toISOString(),
            });
            throw new terminus_1.HealthCheckError('Database check failed', result);
        }
    }
};
exports.PrismaHealthIndicator = PrismaHealthIndicator;
exports.PrismaHealthIndicator = PrismaHealthIndicator = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaHealthIndicator);
//# sourceMappingURL=prisma-health.indicator.js.map