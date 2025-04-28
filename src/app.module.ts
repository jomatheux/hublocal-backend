import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { CompaniesModule } from './companies/companies.module';
import { LocationsModule } from './locations/locations.module';

@Module({
  imports: [AuthModule, CompaniesModule, LocationsModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }