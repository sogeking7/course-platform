import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Prisma, Course, CourseEnrollment } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CourseCreateDto, CourseInviteDto } from './dto/course.dto';
import { unlink } from 'fs/promises';
import { join } from 'path';
import * as dotenv from 'dotenv';

@Injectable()
export class CourseService {
  constructor(private readonly prisma: PrismaService) {
    dotenv.config();
  }

  async getAll(): Promise<any[]> {
    return await this.prisma.course.findMany({
      // include: {
      // }
    });
  }

  async getCoursesByUserId(userId: number): Promise<Course[]> {
    return await this.prisma.course.findMany({
      where: {
        users: {
          some: {
            userId: userId,
          },
        },
      },
      include: {
        users: true,
        sections: {
          include: {
            lectures: true,
          },
        },
      },
    });
  }

  async findOneById(id: number): Promise<Course | null> {
    try {
      // Fetch the course with sections and their lectures
      const course = await this.prisma.course.findUnique({
        where: { id },
        include: {
          users: {
            select: {
              user: true,
            },
          },
          sections: {
            include: {
              lectures: {
                select: {
                  id: true, // include other fields as necessary
                  name: true,
                  content: true,
                  videoUrl: true,
                  exam: {
                    select: {
                      id: true, // only include the examId
                    },
                  },
                },
              },
            },
          },
        },
      });

      // If the course is not found, return null
      if (!course) {
        return null;
      }

      // Sort the sections by id
      course.sections.sort((a, b) => a.id - b.id);

      // Sort the lectures within each section by id
      course.sections.forEach((section) => {
        section.lectures.sort((a, b) => a.id - b.id);
      });

      return course;
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
      content: data.content,
      profilePictureLink: data.profilePictureLink,
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

  async uploadPhoto(id: number, files: any) {
    const profilePictureLink = `${process.env.HOST_URL}${files[0].path.slice(7)}`;
    return await this.prisma.course.update({
      where: { id },
      data: {
        profilePictureLink,
      },
    });
  }

  async deletePhoto(id: number) {
    const course = await this.prisma.course.findUnique({
      where: { id },
    });
    const parts = course.profilePictureLink.split('/');
    const filename = parts[parts.length - 1];
    const filePath = join(process.cwd(), 'public/media/course', filename);
    await unlink(filePath);
    return await this.prisma.course.update({
      where: { id },
      data: {
        profilePictureLink: null,
      },
    });
  }
}
