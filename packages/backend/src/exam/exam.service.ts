import { Injectable, HttpException, HttpStatus, BadRequestException, NotFoundException } from '@nestjs/common';
import { Prisma, Exam } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ExamCheckDto, ExamCreateDto, ExamUpdateDto, QuestionCreateDto, QuestionUpdateDto } from './dto/exam.dto';

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

  async getAllQuestions(examId: number): Promise<any[]> {
    const questions = (
      await this.prisma.exam.findUnique({
        where: { id: examId },
      })
    ).questions;

    return JSON.parse(questions);
  }

  async addQuestion(examId: number, data: QuestionCreateDto): Promise<Exam> {
    const questions = await this.getAllQuestions(examId);

    questions.push({
      id: (questions.length + 1).toString(),
      ...data,
    });

    return await this.prisma.exam.update({
      where: { id: examId },
      data: {
        questions: JSON.stringify(questions),
      },
    });
  }

  async updateQuestion(examId: number, questionId: number, data: QuestionUpdateDto): Promise<Exam> {
    const questions = await this.getAllQuestions(examId);
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
      where: { id: examId },
      data: {
        questions: JSON.stringify(questions),
      },
    });
  }

  async deleteQuestion(examId: number, questionId: number): Promise<Exam> {
    const questions = await this.getAllQuestions(examId);

    if (questions.length === 1) {
      throw new BadRequestException(`Exam should have at least 1 question`);
    }

    const questionIndex = questions.findIndex(q => q.id === questionId);
    if (questionIndex === -1) {
      throw new NotFoundException(`Question with ID ${questionId} not found`);
    }

    questions.splice(questionIndex, 1);

    return await this.prisma.exam.update({
      where: { id: examId },
      data: {
        questions: JSON.stringify(questions),
      },
    });
  }

  async checkAnswers(examId: number, data: ExamCheckDto): Promise<{ totalPoints: number; results: { questionId: number; points: number }[] }> {
    const questions = await this.getAllQuestions(examId);
    let totalPoints = 0;
    const results = [];

    for (let i = 0; i < data.answers.length; ++i) {
      const answer = data.answers[i];
      const question = questions.find(q => q.id === answer.questionId.toString());
      if (!question) {
        throw new NotFoundException(`Question with ID ${answer.questionId} not found`);
      }

      const points = this.calculatePoints(question, answer.givenAnswers);
      totalPoints += points;
      results.push({ questionId: answer.questionId, points });
    }

    return { totalPoints, results };
  }

  private calculatePoints(question: any, givenAnswers: number[]): number {
    if (question.isMultipleChoice) {
      return this.calculatePointsMultipleChoice(question, givenAnswers);
    } else {
      return this.calculatePointsSingleChoice(question, givenAnswers);
    }
  }

  private calculatePointsMultipleChoice(question: any, givenAnswers: number[]): number {
    const correctAnswers = new Set(question.correctAnswer);
    let points = 0;

    givenAnswers.forEach(answer => {
      if (correctAnswers.has(answer)) {
        points += question.points / correctAnswers.size;
      }
    });

    return points;
  }

  private calculatePointsSingleChoice(question: any, givenAnswers: number[]): number {
    if (givenAnswers.length !== 1 || question.correctAnswer.length !== 1) {
      return 0;
    }

    return givenAnswers[0] === question.correctAnswer[0] ? question.points : 0;
  }
}
