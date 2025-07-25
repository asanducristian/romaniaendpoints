import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { PrismaService } from './shared/prisma.service';
import { HealthController } from './features/health/health.controller';
import { PrismaHealthIndicator } from './features/health/prisma-health.indicator';
import { CountyController } from './features/counties/county.controller';
import { CountyService } from './features/counties/county.service';
import { LocalityController } from './features/localities/locality.controller';
import { LocalityService } from './features/localities/locality.service';
import { PostalCodeController } from './features/postal-codes/postal-code.controller';
import { PostalCodeService } from './features/postal-codes/postal-code.service';
import { CompanyController } from './features/companies/company.controller';
import { CompanyService } from './features/companies/company.service';

@Module({
  imports: [
    TerminusModule,
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000, // 1 seconds
        limit: 1, // 1 request per 1 seconds
      },
    ]),
  ],
  controllers: [
    AppController,
    HealthController,
    CountyController,
    LocalityController,
    PostalCodeController,
    CompanyController,
  ],
  providers: [
    PrismaService,
    PrismaHealthIndicator,
    CountyService,
    LocalityService,
    PostalCodeService,
    CompanyService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  exports: [PrismaService],
})
export class AppModule {}
