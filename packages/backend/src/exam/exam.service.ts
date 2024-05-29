import { Injectable, HttpException, HttpStatus, BadRequestException, NotFoundException } from '@nestjs/common';
import { Prisma, Exam } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ExamCreateDto, ExamUpdateDto, QuestionCreateDto } from './dto/exam.dto';

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

  async create(data: ExamCreateDto): Promise<Exam> {
    return await this.prisma.exam.create({
      data: {
        name: data.name,
        description: data.description,
        questions: data.questions,
        ...(data.lectureId && {
          lecture: {
            connect: {
              id: data.lectureId,
            },
          },
        }),
      }
    });
  }

  async update(id: number, data: ExamUpdateDto): Promise<Exam> {
    const conflictingExam = await this.prisma.exam.findUnique({
      where: { lectureId: data.lectureId },
    });

    if (conflictingExam && conflictingExam.id !== id) {
      throw new BadRequestException('Another exam with the provided lecture ID already exists.');
    }
    
    return await this.prisma.exam.update({
      where: {id},
      data: {
        name: data.name,
        description: data.description,
        questions: data.questions,
        ...(data.lectureId && {
          lecture: {
            connect: {
              id: data.lectureId,
            },
          },
        }),
      }, 
    });
  }

  async remove(where: Prisma.ExamWhereUniqueInput): Promise<Exam> {
    return await this.prisma.exam.delete({
      where,
    });
  }

  async getAllQuestions(id: number): Promise<any[]> {
    const questions = (
      await this.prisma.exam.findUnique({
        where: { id },
      })
    ).questions;

    return JSON.parse(questions);
  }

  async addQuestion(id: number, data: QuestionCreateDto): Promise<Exam> {
    const questions = await this.getAllQuestions(id);

    questions.push({
      id: (questions.length + 1).toString(),
      ...data,
    });

    return await this.prisma.exam.update({
      where: { id },
      data: {
        questions: JSON.stringify(questions),
      },
    });
  }

  async updateQuestion(id: number, questionId: number, data: Partial<QuestionCreateDto>): Promise<Exam> {
    const questions = await this.getAllQuestions(id);
    const questionIndex = questions.findIndex(q => q.id === questionId);
    if (questionIndex === -1) {
      throw new NotFoundException(`Question with ID ${questionId} not found`);
    }

    const updatedQuestion = {
      ...questions[questionIndex],
      ...data,
    };
    questions[questionIndex] = updatedQuestion;

    return await this.prisma.exam.update({
      where: { id },
      data: {
        questions: JSON.stringify(questions),
      },
    });
  }

  async deleteQuestion(id: number, questionId: number): Promise<Exam> {
    const questions = await this.getAllQuestions(id);
    const questionIndex = questions.findIndex(q => q.id === questionId);
    if (questionIndex === -1) {
      throw new NotFoundException(`Question with ID ${questionId} not found`);
    }

    questions.splice(questionIndex, 1);

    return await this.prisma.exam.update({
      where: { id },
      data: {
        questions: JSON.stringify(questions),
      },
    });
  }
}
