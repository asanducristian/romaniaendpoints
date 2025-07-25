import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { PrismaService } from './prisma.service';
import { HealthController } from './health.controller';
import { PrismaHealthIndicator } from './prisma-health.indicator';
import { CountyController } from './county.controller';
import { CountyService } from './county.service';
import { LocalityController } from './locality.controller';
import { LocalityService } from './locality.service';
import { PostalCodeController } from './postal-code.controller';
import { PostalCodeService } from './postal-code.service';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';

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
