import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Prisma, Section } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { SectionCreateDto, SectionUpdateDto } from './dto/section.dto';

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

  async create(data: SectionCreateDto): Promise<Section> {
    return await this.prisma.section.create({
      data: {
        name: data.name,
        course: {
          connect: { id: data.courseId },
        },
      },
    });
  }

  async update(id: number, data: SectionUpdateDto): Promise<Section> {
    return await this.prisma.section.update({
      where: { id: Number(id) },
      data: {
        name: data.name,
        course: data.courseId ? { connect: { id: data.courseId } } : undefined,
      },
    });
  }

  async remove(where: Prisma.SectionWhereUniqueInput): Promise<Section> {
    return await this.prisma.section.delete({
      where,
    });
  }
}
