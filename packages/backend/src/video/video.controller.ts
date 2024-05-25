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
import { Video } from '@prisma/client';
import { VideoService } from './video.service';
import { VideoCreateDto } from './dto/video.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Video')
@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Find a video by ID' })
  @ApiResponse({ status: 200, type: Promise<Video | null> })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiParam({ name: 'id', description: 'ID of the video' })
  @Get(':id')
  async findOneById(@Param('id') id: string): Promise<Video | null> {
    try {
      const VideoId = parseInt(id, 10);
      return await this.videoService.findOneById(VideoId);
    } catch (error) {
      throw new HttpException(
        `Error finding video: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new video' })
  @ApiResponse({
    status: 201,
    type: Promise<Video>,
    description: 'The created video',
  })
  @Post()
  async create(@Body() data: VideoCreateDto): Promise<Video> {
    return await this.videoService.create(data);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a video' })
  @ApiResponse({
    status: 200,
    type: Promise<Video>,
    description: 'The updated video',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiParam({ name: 'id', description: 'ID of the video' })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: VideoCreateDto,
  ): Promise<Video> {
    return await this.videoService.update({
      where: { id: Number(id) },
      data,
    });
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a video' })
  @ApiResponse({
    status: 200,
    type: Promise<Video>,
    description: 'The deleted video',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiParam({ name: 'id', description: 'ID of the video' })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Video> {
    return await this.videoService.remove({ id: Number(id) });
  }
}
