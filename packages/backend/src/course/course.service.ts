import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Prisma, Course } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CourseCreateDto } from './dto/course.dto';

@Injectable()
export class CourseService {
  constructor(private readonly prisma: PrismaService) {}

  async findOneById(id: number): Promise<Course | null> {
    try {
      return await this.prisma.course.findUnique({
        where: { id },
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
      exam: {
        connect: {
          id: data.examId,
        },
      },
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
}
