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
import { User } from '@prisma/client';
import { UserService } from './user.service';
import { UserCreateDto } from './dto/user.dto';
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

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    type: Promise<User[]>,
    description: 'The all users',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Get()
  async getAll(): Promise<User[]> {
    return await this.userService.getAll();
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Find a user by ID' })
  @ApiResponse({ status: 200, type: Promise<User | null> })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiParam({ name: 'id', description: 'ID of the user' })
  @Get(':id')
  async findOneById(@Param('id') id: number): Promise<User | null> {
    try {
      return await this.userService.findOneById(id);
    } catch (error) {
      throw new HttpException(
        `Error finding user: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    type: Promise<User>,
    description: 'The created user',
  })
  @Post()
  async create(@Body() data: UserCreateDto): Promise<User> {
    return await this.userService.create(data);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({
    status: 200,
    type: Promise<User>,
    description: 'The updated user',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiParam({ name: 'id', description: 'ID of the user' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() data: UserCreateDto,
  ): Promise<User> {
    return await this.userService.update({
      where: { id },
      data,
    });
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({
    status: 200,
    type: Promise<User>,
    description: 'The deleted user',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiParam({ name: 'id', description: 'ID of the user' })
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<User> {
    return await this.userService.remove({ id });
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Upload User Photo' })
  @ApiResponse({ status: 201, description: 'User photo uploaded' })
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
  @UseInterceptors(fileIntercepting('public/media/user'))
  async uploadPhoto(
    @Param('id', new ParseIntPipe()) id: number,
    @UploadedFiles() files: any,
  ) {
    if (files) {
      return this.userService.uploadPhoto(id, files);
    } else {
      throw new NotFoundException('File Not Found');
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete User Photo' })
  @ApiResponse({ status: 200, description: 'User photo deleted' })
  @ApiParam({ name: 'id', description: 'ID of the user' })
  @Delete(':id/delete-photo')
  async deletePhoto(@Param('id', new ParseIntPipe()) id: number) {
    return this.userService.deletePhoto(id);
  }
}
