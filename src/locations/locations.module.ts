import { Module } from '@nestjs/common';
import { LocationsController } from './locations.controller';
import { LocationsService } from './locations.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [LocationsController],
  providers: [LocationsService, JwtService],
})
export class LocationsModule {}
