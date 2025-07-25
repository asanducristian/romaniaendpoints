"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const terminus_1 = require("@nestjs/terminus");
const throttler_1 = require("@nestjs/throttler");
const core_1 = require("@nestjs/core");
const app_controller_1 = require("./app.controller");
const prisma_service_1 = require("./shared/prisma.service");
const health_controller_1 = require("./features/health/health.controller");
const prisma_health_indicator_1 = require("./features/health/prisma-health.indicator");
const county_controller_1 = require("./features/counties/county.controller");
const county_service_1 = require("./features/counties/county.service");
const locality_controller_1 = require("./features/localities/locality.controller");
const locality_service_1 = require("./features/localities/locality.service");
const postal_code_controller_1 = require("./features/postal-codes/postal-code.controller");
const postal_code_service_1 = require("./features/postal-codes/postal-code.service");
const company_controller_1 = require("./features/companies/company.controller");
const company_service_1 = require("./features/companies/company.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            terminus_1.TerminusModule,
            throttler_1.ThrottlerModule.forRoot([
                {
                    name: 'short',
                    ttl: 1000,
                    limit: 1,
                },
            ]),
        ],
        controllers: [
            app_controller_1.AppController,
            health_controller_1.HealthController,
            county_controller_1.CountyController,
            locality_controller_1.LocalityController,
            postal_code_controller_1.PostalCodeController,
            company_controller_1.CompanyController,
        ],
        providers: [
            prisma_service_1.PrismaService,
            prisma_health_indicator_1.PrismaHealthIndicator,
            county_service_1.CountyService,
            locality_service_1.LocalityService,
            postal_code_service_1.PostalCodeService,
            company_service_1.CompanyService,
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
        ],
        exports: [prisma_service_1.PrismaService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map