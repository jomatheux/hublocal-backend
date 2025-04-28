import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLocationDto, UpdateLocationDto } from './dto/location.dto';

@Injectable()
export class LocationsService {
  constructor(private prisma: PrismaService) { }

  async create(companyId: string, data: CreateLocationDto) {
    const company = await this.prisma.company.findUnique({ where: { id: companyId } });
    if (!company) {
      throw new NotFoundException('Empresa não encontrada');
    }

    const location = await this.prisma.location.create({
      data: {
        ...data,
        companyId,
      },
    });

    return { location, message: 'Local cadastrado com sucesso' };
  }

  async findAll(companyId: string) {
    const locations = await this.prisma.location.findMany({
      where: { companyId },
    });
    return locations;
  }

  async findOne(companyId: string, id: string) {
    const location = await this.prisma.location.findUnique({
      where: { id },
    });

    if (!location || location.companyId !== companyId) {
      throw new NotFoundException('Local não encontrado');
    }

    return location;
  }

  async update(companyId: string, id: string, data: UpdateLocationDto) {
    const location = await this.findOne(companyId, id);

    const updatedLocation = await this.prisma.location.update({
      where: { id: location.id },
      data,
    });

    return { location: updatedLocation, message: 'Local atualizado com sucesso' };
  }

  async delete(companyId: string, id: string) {
    const location = await this.findOne(companyId, id);

    const deletedLocation = await this.prisma.location.delete({ where: { id: location.id } });

    return { location: deletedLocation, message: 'Local excluido com sucesso' };
  }
}