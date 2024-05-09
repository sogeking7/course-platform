import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Prisma, Video } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VideoService {
  constructor(private readonly prisma: PrismaService) {}

  async findOneById(id: number): Promise<Video | null> {
    try {
      return await this.prisma.video.findUnique({
        where: { id },
      });
    } catch (error) {
      throw new HttpException(
        `Error finding Video: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(data: Prisma.VideoCreateInput): Promise<Video> {
    return await this.prisma.video.create({
      data,
    });
  }

  async update(params: {
    where: Prisma.VideoWhereUniqueInput;
    data: Prisma.VideoUpdateInput;
  }): Promise<Video> {
    const { where, data } = params;
    return await this.prisma.video.update({
      data,
      where,
    });
  }

  async remove(where: Prisma.VideoWhereUniqueInput): Promise<Video> {
    return await this.prisma.video.delete({
      where,
    });
  }
}
