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
import { Exam } from '@prisma/client';
import { ExamService } from './exam.service';
import { ExamCreateDto, ExamUpdateDto } from './dto/exam.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Exam')
@Controller('exam')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Find a exam by ID' })
  @ApiResponse({ status: 200, type: Promise<Exam | null> })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiParam({ name: 'id', description: 'ID of the exam' })
  @Get(':id')
  async findOneById(@Param('id') id: string): Promise<Exam | null> {
    try {
      const examId = parseInt(id, 10);
      return await this.examService.findOneById(examId);
    } catch (error) {
      throw new HttpException(
        `Error finding exam: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new exam' })
  @ApiResponse({
    status: 201,
    type: Promise<Exam>,
    description: 'The created exam',
  })
  @Post()
  async create(@Body() data: ExamCreateDto): Promise<Exam> {
    return await this.examService.create(data);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a exam' })
  @ApiResponse({
    status: 200,
    type: Promise<Exam>,
    description: 'The updated exam',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiParam({ name: 'id', description: 'ID of the exam' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() data: ExamUpdateDto,
  ): Promise<Exam> {
    return await this.examService.update(id, data);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a exam' })
  @ApiResponse({
    status: 200,
    type: Promise<Exam>,
    description: 'The deleted exam',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiParam({ name: 'id', description: 'ID of the exam' })
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<Exam> {
    return await this.examService.remove({ id: Number(id) });
  }
}
