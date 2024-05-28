import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { unlink } from 'fs/promises';
import { join } from 'path';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<User[]> {
    return await this.prisma.user.findMany({
      // select: {
      //   firstName: true,
      //   lastName: true,
      //   email: true,
      //   role: true,
      // },
    });
  }

  async findOneById(id: number): Promise<User | null> {
    try {
      return await this.prisma.user.findUnique({
        where: { id },
      });
    } catch (error) {
      throw new HttpException(
        `Error finding user: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return await this.prisma.user.create({
      data,
    });
  }

  async update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return await this.prisma.user.update({
      data,
      where,
    });
  }

  async remove(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return await this.prisma.user.delete({
      where,
    });
  }

  async uploadPhoto(id: number, files: any) {
    const profilePictureLink = `${process.env.HOST_URL}${files[0].path.slice(7)}`;
    return await this.prisma.user.update({
      where: { id },
      data: {
        profilePictureLink,
      },
    });
  }

  async deletePhoto(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    const parts = user.profilePictureLink.split('/');
    const filename = parts[parts.length - 1];
    const filePath = join(process.cwd(), 'public/media/user', filename);
    await unlink(filePath);
    return await this.prisma.course.update({
      where: { id },
      data: {
        profilePictureLink: null,
      },
    });
  }
}
