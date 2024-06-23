import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Prisma, Exam, ExamAttempt } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import {
  ExamCheckDto,
  ExamCreateDto,
  ExamUpdateDto,
  InviteUsersDto,
  QuestionCreateDto,
  QuestionUpdateDto,
} from './dto/exam.dto';

@Injectable()
export class ExamService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllExams(): Promise<Exam[]> {
    try {
      return await this.prisma.exam.findMany({
        where: {
          lectureId: null,
        },
      });
    } catch (error) {
      throw new HttpException(
        `Error finding exam: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOneById(id: number): Promise<Exam | null> {
    try {
      return await this.prisma.exam.findUnique({
        where: { id },
        include: {
          examAttempt: true,
          invitedExam: {
            include: {
              user: true,
            },
          },
        },
      });
    } catch (error) {
      throw new HttpException(
        `Error finding exam: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async isLectureExists(lectureId?: number) {
    const lecture = await this.prisma.lecture.findUnique({
      where: { id: lectureId },
    });
    if (lectureId && !lecture) {
      throw new HttpException(
        `Lecture with id ${lectureId} does not exist`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async create(data: ExamCreateDto): Promise<Exam> {
    if (data.lectureId) this.isLectureExists(data.lectureId);

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
      },
    });
  }

  async update(id: number, data: ExamUpdateDto): Promise<Exam> {
    if (data.lectureId) this.isLectureExists();

    const conflictingExam = await this.prisma.exam.findUnique({
      where: { lectureId: data.lectureId },
    });

    if (conflictingExam && conflictingExam.id !== id) {
      throw new HttpException(
        'Another exam with the provided lecture ID already exists.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.prisma.exam.update({
      where: { id },
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

  async updateQuestion(
    examId: number,
    questionId: number,
    data: QuestionUpdateDto,
  ): Promise<Exam> {
    const questions = await this.getAllQuestions(examId);
    const questionIndex = questions.findIndex(
      (q) => q.id === questionId.toString(),
    );
    if (questionIndex === -1) {
      throw new HttpException(
        `Question with ID ${questionId} not found`,
        HttpStatus.NOT_FOUND,
      );
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
      throw new HttpException(
        `Exam should have at least 1 question`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const questionIndex = questions.findIndex(
      (q) => q.id === questionId.toString(),
    );
    if (questionIndex === -1) {
      throw new HttpException(
        `Question with ID ${questionId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    questions.splice(questionIndex, 1);

    return await this.prisma.exam.update({
      where: { id: examId },
      data: {
        questions: JSON.stringify(questions),
      },
    });
  }

  async checkAnswers(
    userId: number,
    examId: number,
    data: ExamCheckDto,
  ): Promise<{
    totalPoints: number;
    results: { questionId: number; points: number }[];
  }> {
    const questions = await this.getAllQuestions(examId);
    let totalPoints = 0;
    const results = [];

    // Check if the user has already attempted this exam
    const existingAttempt = await this.prisma.examAttempt.findUnique({
      where: { userId_examId_unique: { userId, examId } },
    });

    if (existingAttempt) {
      throw new HttpException(
        `You have already attempted this exam`,
        HttpStatus.BAD_REQUEST,
      );
    }

    for (let i = 0; i < data.answers.length; ++i) {
      const answer = data.answers[i];
      const question = questions.find(
        (q) => q.id === answer.questionId.toString(),
      );
      if (!question) {
        throw new HttpException(
          `Question with ID ${answer.questionId} not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      const points = this.calculatePoints(question, answer.givenAnswers);
      totalPoints += points;
      results.push({ questionId: answer.questionId, points });
    }

    // Create the exam attempt
    await this.prisma.examAttempt.create({
      data: { examId, userId, examResult: totalPoints },
    });

    return { totalPoints, results };
  }

  private calculatePoints(question: any, givenAnswers: number[]): number {
    if (question.isMultipleChoice) {
      return this.calculatePointsMultipleChoice(question, givenAnswers);
    }

    return this.calculatePointsSingleChoice(question, givenAnswers);
  }

  private calculatePointsMultipleChoice(
    question: any,
    givenAnswers: number[],
  ): number {
    const correctAnswers = new Set(question.correctAnswer);
    let points = 0;

    givenAnswers.forEach((answer) => {
      if (correctAnswers.has(answer)) {
        points += question.points / correctAnswers.size;
      }
    });

    return points;
  }

  private calculatePointsSingleChoice(
    question: any,
    givenAnswers: number[],
  ): number {
    if (givenAnswers.length !== 1 || question.correctAnswer.length !== 1) {
      return 0;
    }

    return givenAnswers[0] === question.correctAnswer[0] ? question.points : 0;
  }

  async getResultByUserIdExamId(
    userId: number,
    examId: number,
  ): Promise<number | null> {
    const result = await this.prisma.examAttempt.findUnique({
      where: { userId_examId_unique: { userId, examId } },
    });
    if (result?.examResult !== null && result?.examResult !== undefined) {
      return result.examResult;
    }
    return null;
  }

  async getAllResultsByExamId(
    examId: number,
  ): Promise<
    { firstName: string; lastName: string; email: string; examResult: number }[]
  > {
    const examAttempts = await this.prisma.examAttempt.findMany({
      where: { examId },
      include: {
        user: true,
      },
    });

    return examAttempts.map(({ user, examResult }) => ({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      examResult,
    }));
  }

  async resetResult(examId: number, email: string): Promise<ExamAttempt> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new HttpException(
        `User with email ${email} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    const userId = user.id;

    return await this.prisma.examAttempt.delete({
      where: { userId_examId_unique: { userId, examId } },
    });
  }

  async inviteUsers(
    examId: number,
    data: InviteUsersDto,
  ): Promise<{ message: string }> {
    const exam = await this.prisma.exam.findUnique({ where: { id: examId } });
    if (!exam) {
      throw new HttpException(
        `Exam with id ${examId} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }

    const emails = data.emails.map((userEmail) => userEmail.email);

    const users = await this.prisma.user.findMany({
      where: {
        email: {
          in: emails,
        },
      },
      select: {
        id: true,
        email: true,
      },
    });

    const userMap = new Map(users.map((user) => [user.email, user.id]));

    await this.prisma.$transaction(async (tx) => {
      for (const email of emails) {
        const userId = userMap.get(email);
        if (userId === undefined) {
          throw new HttpException(
            `User with email ${email} does not exist`,
            HttpStatus.NOT_FOUND,
          );
        }

        const existingInvite = await tx.invitedExam.findFirst({
          where: { examId, userId },
        });
        if (!existingInvite) {
          await tx.invitedExam.create({ data: { examId, userId } });
        }
      }
    });

    return { message: `${users.length} users invited to exam ${examId}` };
  }

  async getInvitedExams(userId: number): Promise<Exam[]> {
    return await this.prisma.exam.findMany({
      where: {
        invitedExam: {
          some: {
            userId,
          },
        },
      },
    });
  }

  async getInvitedUsers(id: number): Promise<{ user: any }[]> {
    try {
      const exam = await this.prisma.exam.findUnique({
        where: { id },
      });

      if (!exam) {
        throw new HttpException(
          `Exam with ID ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      return await this.prisma.invitedExam.findMany({
        where: { examId: id },
        select: { user: true },
      });
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw error;
      } else {
        throw new HttpException(
          `Error fetching invited users for exam ${id}`,
          error,
        );
      }
    }
  }

  async deleteUsers(
    examId: number,
    data: InviteUsersDto,
  ): Promise<{ message: string }> {
    const exam = await this.prisma.exam.findUnique({ where: { id: examId } });
    if (!exam) {
      throw new HttpException(
        `Exam with id ${examId} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }

    const emails = data.emails.map((userEmail) => userEmail.email);

    const users = await this.prisma.user.findMany({
      where: {
        email: {
          in: emails,
        },
      },
      select: {
        id: true,
        email: true,
      },
    });

    const userMap = new Map(users.map((user) => [user.email, user.id]));

    await this.prisma.$transaction(async (tx) => {
      for (const email of emails) {
        const userId = userMap.get(email);
        if (userId === undefined) {
          throw new HttpException(
            `User with email ${email} does not exist`,
            HttpStatus.NOT_FOUND,
          );
        }

        const existingInvite = await tx.invitedExam.findFirst({
          where: { examId, userId },
        });
        if (existingInvite) {
          await tx.invitedExam.delete({
            where: {
              id: existingInvite.id,
            },
          });
        }
      }
    });

    return { message: `${users.length} users removed from exam ${examId}` };
  }
}
