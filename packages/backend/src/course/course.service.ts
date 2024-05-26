import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Prisma, Course, CourseEnrollment } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CourseCreateDto, CourseInviteDto } from './dto/course.dto';

@Injectable()
export class CourseService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<any[]> {
    return await this.prisma.course.findMany({
      // include: {
      // }
    });
  }

  async findOneById(id: number): Promise<Course | null> {
    try {
      return await this.prisma.course.findUnique({
        where: { id },
        include: {
          users: {
            select: {
              user: true,
            },
          },
        },
      });
    } catch (error) {
      throw new HttpException(
        `Error finding course: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(data: CourseCreateDto): Promise<Course> {
    const courseData: Prisma.CourseCreateInput = {
      name: data.name,
      description: data.description,
      profilePictureLink: data.profilePictureLink,
      // Why we should connect to exam while creating course? :0, we can add it later!
      // exam: {
      //   connect: {
      //     id: data.examId,
      //   },
      // },
    };

    return await this.prisma.course.create({
      data: courseData,
    });
  }

  async update(params: {
    where: Prisma.CourseWhereUniqueInput;
    data: Prisma.CourseUpdateInput;
  }): Promise<Course> {
    const { where, data } = params;
    return await this.prisma.course.update({
      data,
      where,
    });
  }

  async remove(where: Prisma.CourseWhereUniqueInput): Promise<Course> {
    return await this.prisma.course.delete({
      where,
    });
  }

  async inviteUserToCourse(data: CourseInviteDto): Promise<CourseEnrollment> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: data.email },
      });

      if (!user) {
        throw new HttpException('Почта табылмады', HttpStatus.BAD_REQUEST);
      }

      const existingEnrollment = await this.prisma.courseEnrollment.findUnique({
        where: {
          userId_courseId: {
            userId: user.id,
            courseId: data.courseId,
          },
        },
      });

      if (existingEnrollment) {
        throw new HttpException(
          'Пайдаланушы бұл курсқа әлдеқашан тіркелген',
          HttpStatus.BAD_REQUEST,
        );
      }

      // Create the enrollment if it doesn't exist
      return await this.prisma.courseEnrollment.create({
        data: {
          userId: user.id,
          courseId: data.courseId,
        },
      });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
