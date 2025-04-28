import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCompanyDto, UpdateCompanyDto } from './dto/company.dto';

@Injectable()
export class CompaniesService {
  constructor(private prisma: PrismaService) { }

  async create(userId: string, data: CreateCompanyDto) {
    const company = await this.prisma.company.create({
      data: {
        ...data,
        userId,
      },
    });
    return { company, message: 'Empresa cadastrada com sucesso' };
  }

  async findAll(userId: string) {
    const companies = await this.prisma.company.findMany({
      where: { userId },
      include: {
        locations: true,
      }
    });

    return companies;
  }

  async findOne(userId: string, id: string) {
    const company = await this.prisma.company.findUnique({
      where: { id },
      include: {
        locations: true,
      }
    });

    if (!company || company.userId !== userId) {
      throw new NotFoundException('Empresa não encontrada');
    }

    return company;
  }

  async update(userId: string, id: string, data: UpdateCompanyDto) {
    const company = await this.findOne(userId, id);

    const updatedCompany = await this.prisma.company.update({
      where: { id: company.id },
      data,
    });

    return { company: updatedCompany, message: 'Empresa atualizada com sucesso' };
  }

  async delete(userId: string, id: string) {
    const company = await this.findOne(userId, id);

    const deletedCompany = await this.prisma.company.delete({ where: { id: company.id } });

    return { company: deletedCompany, message: 'Empresa excluida com sucesso' };
  }
}