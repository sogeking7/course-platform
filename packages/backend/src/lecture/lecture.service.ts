import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Prisma, Lecture } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { LectureCreateDto, LectureUpdateDto } from './dto/lecture.dto';

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

  private async isSectionExists(sectionId: number) {
    const section = await this.prisma.section.findUnique({
      where: { id: sectionId },
    });
    if (sectionId && !section) {
      throw new HttpException(
        `Section with id ${sectionId} does not exist`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async isExamExists(examId: number) {
    const exam = await this.prisma.exam.findUnique({
      where: { id: examId },
    });
    if (examId && !exam) {
      throw new HttpException(
        `Exam with id ${examId} does not exist`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async create(data: LectureCreateDto): Promise<Lecture> {
    this.isSectionExists(data.sectionId);
    this.isExamExists(data.examId);

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

  async update(id: number, data: LectureUpdateDto): Promise<Lecture> {
    this.isSectionExists(data.sectionId);
    this.isExamExists(data.examId);

    return await this.prisma.lecture.update({
      where: { id },
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

  async remove(where: Prisma.LectureWhereUniqueInput): Promise<Lecture> {
    return await this.prisma.lecture.delete({
      where,
    });
  }
}
