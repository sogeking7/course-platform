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
  UploadedFiles,
  ParseIntPipe,
  UseInterceptors,
  NotFoundException,
} from '@nestjs/common';
import { Course } from '@prisma/client';
import { CourseService } from './course.service';
import { CourseCreateDto, CourseInviteDto } from './dto/course.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { fileIntercepting } from 'utils';

@ApiTags('Course')
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all courses' })
  @ApiResponse({
    status: 200,
    type: Promise<Course[]>,
    description: 'The all courses',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Get()
  async getAll(): Promise<Course[]> {
    return await this.courseService.getAll();
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all courses by user id' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({
    status: 200,
    type: Promise<Course[]>,
    description: 'The all courses of user',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Get('/user/:id')
  async getUserCourses(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<Course[]> {
    return await this.courseService.getCoursesByUserId(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Find a course by ID' })
  @ApiResponse({ status: 200, type: Promise<Course | null> })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiParam({ name: 'id', description: 'ID of the course' })
  @Get(':id')
  async findOneById(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<Course | null> {
    try {
      return await this.courseService.findOneById(id);
    } catch (error) {
      throw new HttpException(
        `Error finding course: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new course' })
  @ApiResponse({
    status: 201,
    type: Promise<Course>,
    description: 'The created course',
  })
  @Post()
  async create(@Body() data: CourseCreateDto): Promise<Course> {
    return await this.courseService.create(data);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a course' })
  @ApiResponse({
    status: 200,
    type: Promise<Course>,
    description: 'The updated course',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiParam({ name: 'id', description: 'ID of the course' })
  @Put(':id')
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() data: CourseCreateDto,
  ): Promise<Course> {
    return await this.courseService.update({
      where: { id },
      data,
    });
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a course' })
  @ApiResponse({
    status: 200,
    type: Promise<Course>,
    description: 'The deleted course',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiParam({ name: 'id', description: 'ID of the course' })
  @Delete(':id')
  async remove(@Param('id', new ParseIntPipe()) id: number): Promise<Course> {
    return await this.courseService.remove({ id });
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Invite a user to a course' })
  @ApiResponse({ status: 201, description: 'User invited to course' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Post('invite')
  async inviteUserToCourse(@Body() data: CourseInviteDto): Promise<void> {
    try {
      await this.courseService.inviteUserToCourse(data);
    } catch (error) {
      throw new HttpException(
        `${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Upload Course Photo' })
  @ApiResponse({ status: 201, description: 'Course photo uploaded' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post(':id/upload-photo')
  @UseInterceptors(fileIntercepting('public/media/course'))
  async uploadPhoto(
    @Param('id', new ParseIntPipe()) id: number,
    @UploadedFiles() files: any,
  ) {
    if (files) {
      return this.courseService.uploadPhoto(id, files);
    } else {
      throw new NotFoundException('File Not Found');
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete Course Photo' })
  @ApiResponse({ status: 200, description: 'Course photo deleted' })
  @ApiParam({ name: 'id', description: 'ID of the course' })
  @Delete(':id/delete-photo')
  async deletePhoto(@Param('id', new ParseIntPipe()) id: number) {
    return this.courseService.deletePhoto(id);
  }
}
