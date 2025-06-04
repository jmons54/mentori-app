import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Roles } from '../../user/roles/roles.decorator';
import { Role } from '../../user/roles/role.enum';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../user/roles/role.guard';
import { ExerciseDetailDto } from '../../exercise/dto/exercise-detail.dto';
import { plainToInstance } from 'class-transformer';
import { ExerciseCategoryService } from '../../exercise/services/exercise-category.service';
import { ExerciseCategoryCreateDto } from '../../exercise/dto/exercise-category-create.dto';
import { ExerciseCategoryDto } from '../../exercise/dto/exercise-category.dto';
import { ExerciseCategoryUpdateDto } from '../../exercise/dto/exercise-category-update.dto';
import { AwsS3Service } from '../../aws/aws-s3.service';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('adminExerciseCategory')
@ApiBearerAuth('Jwt')
@Controller('admin/exercise/category')
@Roles(Role.Admin)
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminExerciseCategoryController {
  constructor(
    private readonly exerciseCategoryService: ExerciseCategoryService,
    private readonly s3Service: AwsS3Service
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiCreatedResponse({
    type: ExerciseDetailDto,
  })
  @ApiBody({
    type: ExerciseCategoryCreateDto,
  })
  @ApiOperation({
    operationId: 'create',
  })
  async create(
    @Body() body: ExerciseCategoryCreateDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    const category = await this.exerciseCategoryService.save(
      this.exerciseCategoryService.create({
        name: body.name,
      })
    );

    const { Location } = await this.s3Service.upload(
      file.buffer,
      `categories/${category.id}.png`
    );
    category.image = Location;

    await this.exerciseCategoryService.save(category);

    return plainToInstance(ExerciseCategoryDto, category);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  @ApiBody({
    type: ExerciseCategoryUpdateDto,
  })
  @ApiOperation({
    operationId: 'update',
  })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 200,
    description: 'Exercise category updated successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  async update(
    @Param('id') id: number,
    @Body() body: ExerciseCategoryUpdateDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    const { Location } = await this.s3Service.upload(
      file.buffer,
      `categories/${id}.png`
    );
    await this.exerciseCategoryService.update(id, {
      name: body.name,
      image: Location,
    });
  }

  @Delete(':id')
  @ApiOperation({
    operationId: 'active',
  })
  @ApiResponse({
    status: 204,
    description: 'The category has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Category not found.' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'The ID of the category to delete',
    required: true,
    example: 1,
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        active: {
          type: 'boolean',
        },
      },
    },
  })
  async active(@Param('id') id: number, @Body('active') active = false) {
    try {
      await this.exerciseCategoryService.active(id, active);
    } catch (error) {
      throw new HttpException('Exercise not found', HttpStatus.NOT_FOUND);
    }
  }
}
