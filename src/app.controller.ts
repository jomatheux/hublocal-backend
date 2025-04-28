import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly prisma: PrismaService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test-db')
  async testDatabaseConnection() {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return { message: 'Database connection successful' };
    } catch (error) {
      return { message: 'Database connection failed', error: error.message };
    }
  }
}
