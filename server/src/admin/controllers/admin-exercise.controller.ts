import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ExerciseAssistantService } from '../../exercise/services/exercise-assistant.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ExerciseService } from '../../exercise/services/exercise.service';
import { ExerciseCreateDto } from '../../exercise/dto/exercise-create.dto';
import { Roles } from '../../user/roles/roles.decorator';
import { Role } from '../../user/roles/role.enum';
import { RolesGuard } from '../../user/roles/role.guard';
import { plainToInstance } from 'class-transformer';
import { ExerciseTranslateAssistantService } from '../../exercise/services/exercise-translate-assistant.service';
import { ExerciseTranslationReqDto } from '../../exercise/dto/exercise-translation-req.dto';
import { ExerciseUpdateDto } from '../../exercise/dto/exercise-update.dto';
import { DeepPartial } from 'typeorm';
import { ExerciseEntity } from '../../exercise/entities/exercise.entity';
import { ExerciseDetailDto } from '../../exercise/dto/exercise-detail.dto';
import { ExerciseGenerateDto } from '../../exercise/dto/exercise-generate.dto';
import { ExerciseTranslationService } from '../../exercise/services/exercise-translation.service';
import { AwsS3Service } from '../../aws/aws-s3.service';

@ApiTags('adminExercise')
@ApiBearerAuth('Jwt')
@Controller('admin/exercise')
@Roles(Role.Admin)
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminExerciseController {
  constructor(
    private readonly exerciseService: ExerciseService,
    private readonly exerciseTranslationService: ExerciseTranslationService,
    private readonly exerciseAssistantService: ExerciseAssistantService,
    private readonly exerciseTranslateAssistantService: ExerciseTranslateAssistantService,
    private readonly s3Service: AwsS3Service
  ) {}

  @ApiCreatedResponse({
    type: ExerciseDetailDto,
  })
  @ApiBody({
    type: ExerciseCreateDto,
  })
  @ApiOperation({
    operationId: 'create',
  })
  @Post()
  async create(@Body() body: ExerciseCreateDto) {
    const exercise = this.exerciseService.create({
      type: body.type,
      difficulty: body.difficulty,
      thumbnail: body.thumbnail,
      image: body.image,
      category: {
        id: body.categoryId,
      },
      translations: body.translations,
    });
    const exerciseEntity = await this.exerciseService.save(exercise);
    return plainToInstance(ExerciseDetailDto, exerciseEntity);
  }

  @ApiResponse({
    status: 200,
  })
  @ApiBody({
    type: ExerciseUpdateDto,
  })
  @ApiOperation({
    operationId: 'update',
  })
  @Put(':id')
  async update(@Param('id') id: number, @Body() body: ExerciseUpdateDto) {
    const data: DeepPartial<ExerciseEntity> = body;
    if (body.categoryId) {
      data.category = {
        id: body.categoryId,
      };
      delete body.categoryId;
    }
    await this.exerciseService.update(id, data);
  }

  @ApiResponse({
    status: 200,
    type: ExerciseTranslationReqDto,
  })
  @ApiBody({
    type: ExerciseTranslationReqDto,
  })
  @ApiOperation({
    operationId: 'translate',
  })
  @Post('translate')
  @HttpCode(200)
  async translate(@Body() body: ExerciseTranslationReqDto) {
    try {
      return await this.exerciseTranslateAssistantService.generate(
        JSON.stringify(body)
      );
    } catch (e) {
      throw new HttpException(e.message(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiCreatedResponse({
    type: ExerciseDetailDto,
  })
  @ApiOperation({
    operationId: 'generate',
  })
  @ApiBody({
    type: ExerciseGenerateDto,
  })
  @Post('generate')
  @HttpCode(200)
  async generate(
    @Body()
    {
      prompt,
      type,
      difficulty,
      thumbnail,
      image,
      categoryId,
    }: ExerciseGenerateDto
  ) {
    try {
      const data = await this.exerciseAssistantService.generate(prompt);
      const exercise = this.exerciseService.create({
        type,
        difficulty,
        thumbnail,
        image,
        translations: [
          this.exerciseTranslationService.createFromAssistant('en', data.en),
          this.exerciseTranslationService.createFromAssistant('fr', data.fr),
        ],
        category: {
          id: categoryId,
        },
      });
      return await this.exerciseService.save(exercise);
    } catch (e) {
      throw new HttpException(e.message(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  @ApiOperation({
    operationId: 'active',
  })
  @ApiResponse({
    status: 204,
    description: 'The exercise has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Exercise not found.' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'The ID of the exercise to delete',
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
      await this.exerciseService.active(id, active);
    } catch (error) {
      throw new HttpException('Exercise not found', HttpStatus.NOT_FOUND);
    }
  }
}
