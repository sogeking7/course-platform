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
import { Section } from '@prisma/client';
import { SectionService } from './section.service';
import { SectionCreateDto, SectionUpdateDto } from './dto/section.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Section')
@Controller('section')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Find a section by ID' })
  @ApiResponse({ status: 200, type: Promise<Section | null> })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiParam({ name: 'id', description: 'ID of the section' })
  @Get(':id')
  async findOneById(@Param('id') id: number): Promise<Section | null> {
    try {
      return await this.sectionService.findOneById(id);
    } catch (error) {
      throw new HttpException(
        `Error finding section: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new section' })
  @ApiResponse({
    status: 201,
    type: Promise<Section>,
    description: 'The created section',
  })
  @Post()
  async create(@Body() data: SectionCreateDto): Promise<Section> {
    return await this.sectionService.create(data);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a section' })
  @ApiResponse({
    status: 200,
    type: Promise<Section>,
    description: 'The updated section',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiParam({ name: 'id', description: 'ID of the section' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() data: SectionUpdateDto,
  ): Promise<Section> {
    return await this.sectionService.update(id, data);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a section' })
  @ApiResponse({
    status: 200,
    type: Promise<Section>,
    description: 'The deleted section',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiParam({ name: 'id', description: 'ID of the section' })
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<Section> {
    return await this.sectionService.remove({ id });
  }
}
