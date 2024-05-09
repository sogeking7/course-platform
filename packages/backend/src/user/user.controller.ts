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
import { User } from '@prisma/client';
import { UserService } from './user.service';
import { UserCreateDto } from './dto/user.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Find a user by ID' })
  @ApiResponse({ status: 200, type: Promise<User | null> })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiParam({ name: 'id', description: 'ID of the user' })
  @Get(':id')
  async findOneById(@Param('id') id: string): Promise<User | null> {
    try {
      const userId = parseInt(id, 10);
      return await this.userService.findOneById(userId);
    } catch (error) {
      throw new HttpException(
        `Error finding user: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

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
    @Param('id') id: string,
    @Body() data: UserCreateDto,
  ): Promise<User> {
    return await this.userService.update({
      where: { id: Number(id) },
      data,
    });
  }

  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({
    status: 200,
    type: Promise<User>,
    description: 'The deleted user',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiParam({ name: 'id', description: 'ID of the user' })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<User> {
    return await this.userService.remove({ id: Number(id) });
  }
}
