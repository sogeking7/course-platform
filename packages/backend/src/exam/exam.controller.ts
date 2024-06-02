import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Patch,
  Delete,
  HttpException,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { Exam } from '@prisma/client';
import { ExamService } from './exam.service';
import {
  ExamCheckDto,
  ExamCreateDto,
  ExamUpdateDto,
  QuestionCreateDto,
  QuestionUpdateDto,
} from './dto/exam.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';

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
  async findOneById(@Param('id') id: number): Promise<Exam | null> {
    try {
      return await this.examService.findOneById(id);
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
  async remove(@Param('id', new ParseIntPipe()) id: number): Promise<Exam> {
    return await this.examService.remove({ id });
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all questions for a specific exam' })
  @ApiResponse({ status: 200, description: 'Questions retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Exam not found' })
  @ApiParam({ name: 'examId', required: true, description: 'ID of the exam' })
  @Get(':examId/questions')
  async getAllQuestions(@Param('examId', new ParseIntPipe()) examId: number): Promise<any[]> {
    return this.examService.getAllQuestions(examId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add a question to a specific exam' })
  @ApiResponse({ status: 201, description: 'Question added successfully' })
  @ApiResponse({ status: 404, description: 'Exam not found' })
  @ApiParam({ name: 'examId', required: true, description: 'ID of the exam' })
  @Post(':examId/questions')
  async addQuestion(@Param('examId', new ParseIntPipe()) examId: number, @Body() data: QuestionCreateDto): Promise<Exam> {
    return this.examService.addQuestion(examId, data);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a question in a specific exam' })
  @ApiResponse({ status: 200, description: 'Question updated successfully' })
  @ApiResponse({ status: 404, description: 'Question or Exam not found' })
  @ApiParam({ name: 'examId', required: true, description: 'ID of the exam' })
  @ApiParam({
    name: 'questionId',
    required: true,
    description: 'ID of the question',
  })
  @Patch(':examId/questions/:questionId')
  async updateQuestion(
    @Param('examId', new ParseIntPipe()) examId: number,
    @Param('questionId', new ParseIntPipe()) questionId: number,
    @Body() data: QuestionUpdateDto
  ): Promise<Exam> {
    return this.examService.updateQuestion(examId, questionId, data);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a question from a specific exam' })
  @ApiResponse({ status: 200, description: 'Question deleted successfully' })
  @ApiResponse({
    status: 400,
    description: 'Exam should have at least 1 question',
  })
  @ApiResponse({ status: 404, description: 'Question or Exam not found' })
  @ApiParam({ name: 'examId', required: true, description: 'ID of the exam' })
  @ApiParam({
    name: 'questionId',
    required: true,
    description: 'ID of the question',
  })
  @Delete(':examId/questions/:questionId')
  async deleteQuestion(@Param('examId', new ParseIntPipe()) examId: number, @Param('questionId', new ParseIntPipe()) questionId: number): Promise<Exam> {
    return this.examService.deleteQuestion(examId, questionId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Check answers for a specific exam' })
  @ApiResponse({ status: 200, description: 'Answers checked successfully' })
  @ApiResponse({ status: 404, description: 'Exam or Question not found' })
  @ApiParam({ name: 'examId', required: true, description: 'ID of the exam' })
  @Post(':examId/check-answers')
  async checkAnswers(
    @Param('examId', new ParseIntPipe()) examId: number,
    @Body() data: ExamCheckDto
  ): Promise<{ totalPoints: number; results: { questionId: number; points: number }[] }> {
    return this.examService.checkAnswers(examId, data);
  }
}
