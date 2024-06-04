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
import { Lecture } from '@prisma/client';
import { LectureService } from './lecture.service';
import { LectureCreateDto, LectureUpdateDto } from './dto/lecture.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Lecture')
@Controller('lecture')
export class LectureController {
  constructor(private readonly lectureService: LectureService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Find a lecture by ID' })
  @ApiResponse({ status: 200, type: Promise<Lecture | null> })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiParam({ name: 'id', description: 'ID of the lecture' })
  @Get(':id')
  async findOneById(@Param('id') id: number): Promise<Lecture | null> {
    try {
      return await this.lectureService.findOneById(id);
    } catch (error) {
      throw new HttpException(
        `Error finding lecture: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new lecture' })
  @ApiResponse({
    status: 201,
    type: Promise<Lecture>,
    description: 'The created lecture',
  })
  @Post()
  async create(@Body() data: LectureCreateDto): Promise<Lecture> {
    return await this.lectureService.create(data);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a lecture' })
  @ApiResponse({
    status: 200,
    type: Promise<Lecture>,
    description: 'The updated lecture',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiParam({ name: 'id', description: 'ID of the lecture' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() data: LectureUpdateDto,
  ): Promise<Lecture> {
    return await this.lectureService.update(id, data);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a lecture' })
  @ApiResponse({
    status: 200,
    type: Promise<Lecture>,
    description: 'The deleted lecture',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiParam({ name: 'id', description: 'ID of the lecture' })
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<Lecture> {
    return await this.lectureService.remove({ id });
  }
}
