import { Module } from '@nestjs/common';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { JwtService } from '@nestjs/jwt';
@Module({
  controllers: [CompaniesController],
  providers: [CompaniesService, JwtService],
})
export class CompaniesModule {}
