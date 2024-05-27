import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Prisma, Section } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SectionService {
  constructor(private readonly prisma: PrismaService) {}

  async findOneById(id: number): Promise<Section | null> {
    try {
      return await this.prisma.section.findUnique({
        where: { id },
      });
    } catch (error) {
      throw new HttpException(
        `Error finding section: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(data: Prisma.SectionCreateInput): Promise<Section> {
    return await this.prisma.section.create({
      data,
    });
  }

  async update(params: {
    where: Prisma.SectionWhereUniqueInput;
    data: Prisma.SectionUpdateInput;
  }): Promise<Section> {
    const { where, data } = params;
    return await this.prisma.section.update({
      data,
      where,
    });
  }

  async remove(where: Prisma.SectionWhereUniqueInput): Promise<Section> {
    return await this.prisma.section.delete({
      where,
    });
  }
}
