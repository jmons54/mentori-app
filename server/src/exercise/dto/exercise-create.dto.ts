import {
  ArrayNotEmpty,
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  Validate,
  ValidateNested,
} from 'class-validator';
import { ExerciseTranslationReqDto } from './exercise-translation-req.dto';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ExerciseCategoryExistValidator } from '../validators/exercise-category.validator';

export class ExerciseCreateDto {
  @ApiProperty({
    description: 'Type of the exercise',
    example: 'cardio',
  })
  @IsString()
  type: string;

  @ApiProperty({
    description: 'Difficulty level of the exercise',
    example: 'intermediate',
  })
  @IsString()
  difficulty: string;

  @ApiProperty({
    description: 'Thumbnail image URL for the exercise',
    example: 'https://example.com/thumbnail.jpg',
    required: false,
  })
  @IsString()
  @IsOptional()
  thumbnail?: string;

  @ApiProperty({
    description: 'Main image URL for the exercise',
    example: 'https://example.com/image.jpg',
    required: false,
  })
  @IsString()
  @IsOptional()
  image?: string;

  @ApiProperty({
    description: 'Category ID for the exercise',
    example: 1,
  })
  @IsNumber()
  @Validate(ExerciseCategoryExistValidator, {
    message: 'Category not found',
  })
  categoryId: number;

  @ApiProperty({
    description: 'List of translations for the exercise',
    type: [ExerciseTranslationReqDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExerciseTranslationReqDto)
  @ArrayNotEmpty()
  translations: ExerciseTranslationReqDto[];
}
