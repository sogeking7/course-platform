import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Prisma, Lecture } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { LectureCreateDto } from './dto/lecture.dto';

@Injectable()
export class LectureService {
  constructor(private readonly prisma: PrismaService) {}

  async findOneById(id: number): Promise<Lecture | null> {
    try {
      return await this.prisma.lecture.findUnique({
        where: { id },
        include: {
          exam: true,
          section: {
            include: {
              course: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });
    } catch (error) {
      throw new HttpException(
        `Error finding lecture: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(data: LectureCreateDto): Promise<Lecture> {
    return await this.prisma.lecture.create({
      data: {
        name: data.name,
        content: data.content,
        videoUrl: data.videoUrl,
        section: {
          connect: {
            id: data.sectionId,
          },
        },
        ...(data.examId && {
          exam: {
            connect: {
              id: data.examId,
            },
          },
        }),
      },
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
