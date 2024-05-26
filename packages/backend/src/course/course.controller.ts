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
import { Course } from '@prisma/client';
import { CourseService } from './course.service';
import { CourseCreateDto, CourseInviteDto } from './dto/course.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';

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
  @ApiOperation({ summary: 'Find a course by ID' })
  @ApiResponse({ status: 200, type: Promise<Course | null> })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiParam({ name: 'id', description: 'ID of the course' })
  @Get(':id')
  async findOneById(@Param('id') id: string): Promise<Course | null> {
    try {
      const courseId = parseInt(id, 10);
      return await this.courseService.findOneById(courseId);
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
    @Param('id') id: string,
    @Body() data: CourseCreateDto,
  ): Promise<Course> {
    return await this.courseService.update({
      where: { id: Number(id) },
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
  async remove(@Param('id') id: string): Promise<Course> {
    return await this.courseService.remove({ id: Number(id) });
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
}
