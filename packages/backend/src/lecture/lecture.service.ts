import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Prisma, Lecture } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LectureService {
  constructor(private readonly prisma: PrismaService) {}

  async findOneById(id: number): Promise<Lecture | null> {
    try {
      return await this.prisma.lecture.findUnique({
        where: { id },
      });
    } catch (error) {
      throw new HttpException(
        `Error finding lecture: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(data: Prisma.LectureCreateInput): Promise<Lecture> {
    return await this.prisma.lecture.create({
      data,
    });
  }

  async update(params: {
    where: Prisma.LectureWhereUniqueInput;
    data: Prisma.LectureUpdateInput;
  }): Promise<Lecture> {
    const { where, data } = params;
    return await this.prisma.lecture.update({
      data,
      where,
    });
  }

  async remove(where: Prisma.LectureWhereUniqueInput): Promise<Lecture> {
    return await this.prisma.lecture.delete({
      where,
    });
  }
}
