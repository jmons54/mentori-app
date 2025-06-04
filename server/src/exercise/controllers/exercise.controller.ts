import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import 'multer';

import {
  ApiOkPaginatedResponse,
  ApiPaginationQuery,
  Paginate,
  PaginateQuery,
} from 'nestjs-paginate';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { plainToInstance } from 'class-transformer';
import { ExerciseService } from '../services/exercise.service';
import { ExerciseDto } from '../dto/exercise.dto';
import { exercisePagination } from '../services/exercise.pagination';
import { ExerciseDetailDto } from '../dto/exercise-detail.dto';

@ApiTags('exercise')
@Controller('exercise')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Get()
  @ApiOperation({
    operationId: 'findAll',
  })
  @ApiOkPaginatedResponse(ExerciseDto, exercisePagination)
  @ApiPaginationQuery({
    ...exercisePagination,
    filterableColumns: {
      ...exercisePagination.filterableColumns,
      name: true,
      active: true,
    },
  })
  async findAll(@Paginate() query: PaginateQuery) {
    return this.exerciseService.findAll(query);
  }

  @Get('/:id')
  @ApiResponse({
    status: 200,
    type: ExerciseDetailDto,
  })
  @ApiOperation({
    operationId: 'findOne',
  })
  async findOne(@Param('id') id: number) {
    const exercise = await this.exerciseService.findOne(id);
    if (!exercise) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return plainToInstance(ExerciseDetailDto, exercise);
  }

  @Post('image')
  @ApiOperation({
    operationId: 'uploadPhoto',
  })
  @UseInterceptors(FileInterceptor('image'))
  uploadPhoto(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
}
