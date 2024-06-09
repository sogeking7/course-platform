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
  UseGuards,
  Req,
} from '@nestjs/common';
import { Exam, ExamAttempt } from '@prisma/client';
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
import { Request } from 'express';
import { JwtUtils } from '../auth/jwt.utils';
import { RolesGuard } from '../auth/role/roles.guard';
import { Roles } from '../auth/role/roles.decorator';

@ApiTags('Exam')
@Controller('exam')
export class ExamController {
  constructor(
    private readonly examService: ExamService,
    private readonly jwtUtils: JwtUtils,
  ) {}

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'USER')
  @ApiOperation({ summary: 'Find a exam by ID' })
  @ApiResponse({ status: 200, type: Promise<Exam | null> })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiParam({ name: 'id', description: 'ID of the exam' })
  @Get(':id')
  async findOneById(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<Exam | null> {
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
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
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
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
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
    @Param('id', new ParseIntPipe()) id: number,
    @Body() data: ExamUpdateDto,
  ): Promise<Exam> {
    return await this.examService.update(id, data);
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
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
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'USER')
  @ApiOperation({ summary: 'Get all questions for a specific exam' })
  @ApiResponse({ status: 200, description: 'Questions retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Exam not found' })
  @ApiParam({ name: 'examId', required: true, description: 'ID of the exam' })
  @Get(':examId/questions')
  async getAllQuestions(
    @Param('examId', new ParseIntPipe()) examId: number,
  ): Promise<any[]> {
    return this.examService.getAllQuestions(examId);
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Add a question to a specific exam' })
  @ApiResponse({ status: 201, description: 'Question added successfully' })
  @ApiResponse({ status: 404, description: 'Exam not found' })
  @ApiParam({ name: 'examId', required: true, description: 'ID of the exam' })
  @Post(':examId/questions')
  async addQuestion(
    @Param('examId', new ParseIntPipe()) examId: number,
    @Body() data: QuestionCreateDto,
  ): Promise<Exam> {
    return this.examService.addQuestion(examId, data);
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
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
    @Body() data: QuestionUpdateDto,
  ): Promise<Exam> {
    return this.examService.updateQuestion(examId, questionId, data);
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
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
  async deleteQuestion(
    @Param('examId', new ParseIntPipe()) examId: number,
    @Param('questionId', new ParseIntPipe()) questionId: number,
  ): Promise<Exam> {
    return this.examService.deleteQuestion(examId, questionId);
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'USER')
  @ApiOperation({ summary: 'Check answers for a specific exam' })
  @ApiResponse({ status: 200, description: 'Answers checked successfully' })
  @ApiResponse({ status: 404, description: 'Exam or Question not found' })
  @ApiParam({ name: 'examId', required: true, description: 'ID of the exam' })
  @Post(':examId/check-answers')
  async checkAnswers(
    @Param('examId', new ParseIntPipe()) examId: number,
    @Body() data: ExamCheckDto,
    @Req() request: Request,
  ): Promise<{
    totalPoints: number;
    results: { questionId: number; points: number }[];
  }> {
    const token = request.headers.authorization.replace('Bearer ', '');
    const payload = this.jwtUtils.parseJwtToken(token);
    const userId = payload.id;
    return this.examService.checkAnswers(userId, examId, data);
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'USER')
  @ApiOperation({ summary: 'Get results for a specific exam and user' })
  @ApiResponse({ status: 200, description: 'Result got successfully' })
  @ApiResponse({ status: 404, description: 'Attempt not found' })
  @ApiParam({ name: 'examId', required: true, description: 'ID of the exam' })
  @Post(':examId/get-result-by-userId')
  async getResultByUserIdExamId(
    @Param('examId', new ParseIntPipe()) examId: number,
    @Req() request: Request,
  ): Promise<number> {
    const token = request.headers.authorization.replace('Bearer ', '');
    const payload = this.jwtUtils.parseJwtToken(token);
    const userId = payload.id;

    try {
      const examResult = await this.examService.getResultByUserIdExamId(
        userId,
        examId,
      );
      if (!examResult) {
        throw new HttpException('Attempt not found', HttpStatus.NOT_FOUND);
      }
      return examResult;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(
          'Error getting exam result',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Get all results for a specific exam' })
  @ApiResponse({ status: 200, description: 'Result got successfully' })
  @ApiResponse({ status: 404, description: 'Attempt not found' })
  @ApiParam({ name: 'examId', required: true, description: 'ID of the exam' })
  @Post(':examId/get-result')
  async getAllResultsByExamId(
    @Param('examId', new ParseIntPipe()) examId: number,
  ): Promise<
    { firstName: string; lastName: string; email: string; examResult: number }[]
  > {
    try {
      const results = await this.examService.getAllResultsByExamId(examId);
      if (results.length === 0) {
        throw new HttpException(
          'No results found for the given exam',
          HttpStatus.NOT_FOUND,
        );
      }
      return results;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(
          'Error getting exam results',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Reset result of user (by email) specific exam' })
  @ApiResponse({ status: 200, description: 'Deleted successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiParam({ name: 'examId', required: true, description: 'ID of the exam' })
  @Post(':examId/reset-result/:userEmail')
  async resetResult(
    @Param('examId', new ParseIntPipe()) examId: number,
    @Param('userEmail') userEmail: string,
  ): Promise<ExamAttempt> {
    return await this.examService.resetResult(examId, userEmail);
  }
}
