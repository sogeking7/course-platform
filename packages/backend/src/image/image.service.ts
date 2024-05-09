import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Prisma, Image } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ImageService {
  constructor(private readonly prisma: PrismaService) {}

  async findOneById(id: number): Promise<Image | null> {
    try {
      return await this.prisma.image.findUnique({
        where: { id },
      });
    } catch (error) {
      throw new HttpException(
        `Error finding image: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(data: Prisma.ImageCreateInput): Promise<Image> {
    return await this.prisma.image.create({
      data,
    });
  }

  async update(params: {
    where: Prisma.ImageWhereUniqueInput;
    data: Prisma.ImageUpdateInput;
  }): Promise<Image> {
    const { where, data } = params;
    return await this.prisma.image.update({
      data,
      where,
    });
  }

  async remove(where: Prisma.ImageWhereUniqueInput): Promise<Image> {
    return await this.prisma.image.delete({
      where,
    });
  }
}
