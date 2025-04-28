import { Controller, Get, Post, Put, Delete, Body, Param, Req, UseGuards } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { CreateLocationDto, UpdateLocationDto } from './dto/location.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('companies/:companyId/locations')
@UseGuards(JwtAuthGuard)
export class LocationsController {
  constructor(private locationsService: LocationsService) {}

  @Post()
  async create(@Param('companyId') companyId: string, @Body() data: CreateLocationDto) {
    return this.locationsService.create(companyId, data);
  }

  @Get()
  async findAll(@Param('companyId') companyId: string) {
    return this.locationsService.findAll(companyId);
  }

  @Get(':id')
  async findOne(@Param('companyId') companyId: string, @Param('id') id: string) {
    return this.locationsService.findOne(companyId, id);
  }

  @Put(':id')
  async update(
    @Param('companyId') companyId: string,
    @Param('id') id: string,
    @Body() data: UpdateLocationDto,
  ) {
    return this.locationsService.update(companyId, id, data);
  }

  @Delete(':id')
  async delete(@Param('companyId') companyId: string, @Param('id') id: string) {
    return this.locationsService.delete(companyId, id);
  }
}