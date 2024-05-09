import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Image } from '@prisma/client';
import { ImageService } from './image.service';
import { ImageCreateDto } from './dto/image.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Image')
@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @ApiOperation({ summary: 'Find a image by ID' })
  @ApiResponse({ status: 200, type: Promise<Image | null> })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiParam({ name: 'id', description: 'ID of the image' })
  @Get(':id')
  async findOneById(@Param('id') id: string): Promise<Image | null> {
    try {
      const imageId = parseInt(id, 10);
      return await this.imageService.findOneById(imageId);
    } catch (error) {
      throw new HttpException(
        `Error finding image: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiOperation({ summary: 'Create a new image' })
  @ApiResponse({
    status: 201,
    type: Promise<Image>,
    description: 'The created image',
  })
  @Post()
  async create(@Body() data: ImageCreateDto): Promise<Image> {
    return await this.imageService.create(data);
  }

  @ApiOperation({ summary: 'Update a image' })
  @ApiResponse({
    status: 200,
    type: Promise<Image>,
    description: 'The updated image',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiParam({ name: 'id', description: 'ID of the image' })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: ImageCreateDto,
  ): Promise<Image> {
    return await this.imageService.update({
      where: { id: Number(id) },
      data,
    });
  }

  @ApiOperation({ summary: 'Delete a image' })
  @ApiResponse({
    status: 200,
    type: Promise<Image>,
    description: 'The deleted image',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiParam({ name: 'id', description: 'ID of the image' })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Image> {
    return await this.imageService.remove({ id: Number(id) });
  }
}
