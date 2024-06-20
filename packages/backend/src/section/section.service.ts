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
      include: {
        lectures: {
          include: {
            exam: {
              select: {
                id: true,
              },
            },
          },
        },
      },
      orderBy: { id: 'asc' },
    });

    const previousSectionAverages =
      await this.calculateAllPreviousSectionAverages(userId, courseId);
    console.log('previousSectionAverages: ', previousSectionAverages);
    // Calculate lock status for each section
    const sectionsWithLockStatus = sections.map((section, id) => {
      const previousSectionAverage = previousSectionAverages[section.id];
      let isLocked = !previousSectionAverage || previousSectionAverage < 70;
      if (!id) {
        isLocked = false;
      }
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

    console.log(
      'lecturesWithExams' + ' sectionId: ' + sectionId,
      lecturesWithExams,
    );

    if (lecturesWithExams.length === 0) {
      return 100;
    }

    const examIds = lecturesWithExams
      .map((lecture) => lecture.exam?.id)
      .filter(Boolean);

    const examPoints = lecturesWithExams.reduce((sumi, lecture) => {
      const questions = JSON.parse(lecture.exam.questions);
      const points = questions.reduce(
        (sumj, question) => sumj + question.points,
        0,
      );
      return sumi + points;
    }, 0);

    console.log('examIds' + ' sectionId: ', examIds);

    const examAttempts = await this.prisma.examAttempt.findMany({
      where: {
        userId: userId,
        examId: {
          in: examIds as number[],
        },
      },
    });

    if (examAttempts.length === 0) {
      return 0;
    }

    const totalScore = examAttempts.reduce(
      (sum, attempt) => sum + attempt.examResult,
      0,
    );
    const averageScore = totalScore;

    console.log('totalScore', totalScore);
    console.log('examPoints', examPoints);
    console.log('length', examAttempts.length);

    return (averageScore * 100) / examPoints;
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
