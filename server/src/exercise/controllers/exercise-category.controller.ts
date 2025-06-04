import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiProperty,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { ExerciseCategoryService } from '../services/exercise-category.service';
import { ExerciseCategoryDto } from '../dto/exercise-category.dto';

class ExerciseCategoryCreateDto {
  @ApiProperty({
    description: 'Name of the exercise category to create',
    example: 'endurance',
  })
  name: string;
}

@ApiTags('exerciseCategory')
@Controller('exercise-category')
export class ExerciseCategoryController {
  constructor(
    private readonly exerciseCategoryService: ExerciseCategoryService
  ) {}

  @ApiResponse({
    status: 200,
    type: [ExerciseCategoryDto],
  })
  @ApiOperation({
    operationId: 'findAll',
  })
  @ApiQuery({
    name: 'active',
    type: Boolean,
    required: false,
  })
  @Get()
  async findAll(@Query('active') active = true) {
    const categories = await this.exerciseCategoryService.findAll(active);
    return plainToInstance(ExerciseCategoryDto, categories);
  }

  @ApiResponse({
    status: 200,
    type: ExerciseCategoryDto,
  })
  @ApiOperation({
    operationId: 'findOne',
  })
  @ApiParam({
    name: 'id',
    type: Number,
  })
  @Get(':id')
  async findOne(@Param('id') id: number) {
    const category = await this.exerciseCategoryService.findOne(id);
    return plainToInstance(ExerciseCategoryDto, category);
  }

  @ApiBody({ type: ExerciseCategoryCreateDto })
  @ApiResponse({
    status: 200,
    description: 'The exercise category has been successfully created.',
    type: ExerciseCategoryDto,
  })
  @Post('create')
  async create(@Body() body: ExerciseCategoryCreateDto) {
    const category = await this.exerciseCategoryService.create(body);
    return plainToInstance(ExerciseCategoryDto, category);
  }
}
