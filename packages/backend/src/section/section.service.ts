import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Prisma, Section } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { SectionCreateDto, SectionUpdateDto } from './dto/section.dto';

@Injectable()
export class SectionService {
  constructor(private readonly prisma: PrismaService) {}

  async findOneById(
    userId: number,
    sectionId: number,
  ): Promise<Section | null> {
    try {
      const sections = await this.prisma.section.findMany({
        where: {
          OR: [
            { id: sectionId },
            {
              courseId: (
                await this.prisma.section.findUnique({
                  where: { id: sectionId },
                })
              ).courseId,
              id: { lt: sectionId },
            },
          ],
        },
        orderBy: { id: 'desc' },
        take: 2,
      });

      const currentSection = sections.find(
        (section) => section.id === sectionId,
      );
      const previousSection = sections.find(
        (section) => section.id !== sectionId,
      );

      if (!currentSection) {
        throw new HttpException(
          `Section with id ${sectionId} not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      if (!previousSection) {
        return currentSection;
      }

      const averageScore = await this.calculateAverageExamScore(
        userId,
        previousSection.id,
      );
      return averageScore !== null && averageScore >= 70
        ? currentSection
        : null;
    } catch (error) {
      throw new HttpException(
        `Error finding section: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(userId: number, courseId: number): Promise<any[]> {
    const sections = await this.prisma.section.findMany({
      where: { courseId },
      orderBy: { id: 'asc' },
    });

    const previousSectionAverages =
      await this.calculateAllPreviousSectionAverages(userId, courseId);

    // Calculate lock status for each section
    const sectionsWithLockStatus = sections.map((section) => {
      const previousSectionAverage = previousSectionAverages[section.id];
      const isLocked =
        previousSectionAverage === undefined || previousSectionAverage < 70;

      return { ...section, isLocked };
    });

    return sectionsWithLockStatus;
  }

  private async calculateAverageExamScore(
    userId: number,
    sectionId: number,
  ): Promise<number | null> {
    const lecturesWithExams = await this.prisma.lecture.findMany({
      where: {
        sectionId: sectionId,
        exam: {
          isNot: null,
        },
      },
      include: {
        exam: true,
      },
    });

    if (lecturesWithExams.length === 0) {
      return null;
    }

    const examIds = lecturesWithExams
      .map((lecture) => lecture.exam?.id)
      .filter(Boolean);

    const examAttempts = await this.prisma.examAttempt.findMany({
      where: {
        userId: userId,
        examId: {
          in: examIds as number[],
        },
      },
    });

    if (examAttempts.length === 0) {
      return null;
    }

    const totalScore = examAttempts.reduce(
      (sum, attempt) => sum + attempt.examResult,
      0,
    );
    const averageScore = totalScore / examAttempts.length;

    return averageScore;
  }

  private async calculateAllPreviousSectionAverages(
    userId: number,
    courseId: number,
  ): Promise<Record<number, number>> {
    const sections = await this.prisma.section.findMany({
      where: { courseId },
      orderBy: { id: 'asc' },
    });

    const previousSectionScores: Record<number, number> = {};

    await Promise.all(
      sections.map(async (section) => {
        const averageScore = await this.calculateAverageExamScore(
          userId,
          section.id,
        );
        previousSectionScores[section.id] = averageScore;
      }),
    );

    return previousSectionScores;
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
