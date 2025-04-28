import { Controller, Get, Post, Put, Delete, Body, Param, Req, UseGuards } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto, UpdateCompanyDto } from './dto/company.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('companies')
@UseGuards(JwtAuthGuard)
export class CompaniesController {
  constructor(private companiesService: CompaniesService) {}

  @Post()
  async create(@Req() req, @Body() data: CreateCompanyDto) {
    const userId = req.user.userId;
    return this.companiesService.create(userId, data);
  }

  @Get()
  async findAll(@Req() req) {
    const userId = req.user.userId;
    return this.companiesService.findAll(userId);
  }

  @Get(':id')
  async findOne(@Req() req, @Param('id') id: string) {
    const userId = req.user.userId;
    return this.companiesService.findOne(userId, id);
  }

  @Put(':id')
  async update(@Req() req, @Param('id') id: string, @Body() data: UpdateCompanyDto) {
    const userId = req.user.userId;
    return this.companiesService.update(userId, id, data);
  }

  @Delete(':id')
  async delete(@Req() req, @Param('id') id: string) {
    const userId = req.user.userId;
    return this.companiesService.delete(userId, id);
  }
}
