import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Prisma, Exam } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ExamService {
  constructor(private readonly prisma: PrismaService) {}

  async findOneById(id: number): Promise<Exam | null> {
    try {
      return await this.prisma.exam.findUnique({
        where: { id },
      });
    } catch (error) {
      throw new HttpException(
        `Error finding exam: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(data: Prisma.ExamCreateInput): Promise<Exam> {
    return await this.prisma.exam.create({
      data,
    });
  }

  async update(params: {
    where: Prisma.ExamWhereUniqueInput;
    data: Prisma.ExamUpdateInput;
  }): Promise<Exam> {
    const { where, data } = params;
    return await this.prisma.exam.update({
      data,
      where,
    });
  }

  async remove(where: Prisma.ExamWhereUniqueInput): Promise<Exam> {
    return await this.prisma.exam.delete({
      where,
    });
  }
}
