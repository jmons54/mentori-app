import {
  ArrayNotEmpty,
  IsArray,
  IsIn,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { exerciseConstants } from '../exercise.constants';
import { ExerciseLanguageType } from '../exercise.type';
import { ExerciseStepReqDto } from './exercise-step-req.dto';

export class ExerciseTranslationReqDto {
  @ApiProperty({
    description: 'Language of the exercise translation',
    example: 'en',
    enum: exerciseConstants.languages,
  })
  @IsString()
  @IsIn(exerciseConstants.languages)
  language: ExerciseLanguageType;

  @ApiProperty({
    description: 'Name of the exercise',
    example: 'Push-up',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'List of targeted muscles',
    example: ['Chest', 'Triceps'],
    required: false,
  })
  @IsArray()
  @IsString({ each: true })
  @ArrayNotEmpty()
  @IsOptional()
  targetedMuscles?: string[];

  @ApiProperty({
    description: 'List of equipment needed for the exercise',
    example: ['Dumbbells', 'Bench'],
    required: false,
  })
  @IsArray()
  @IsString({ each: true })
  @ArrayNotEmpty()
  @IsOptional()
  equipmentNeeded?: string[];

  @ApiProperty({
    description: 'Steps to perform the exercise',
    type: [ExerciseStepReqDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExerciseStepReqDto)
  @ArrayNotEmpty()
  steps: ExerciseStepReqDto[];

  @ApiProperty({
    description: 'Additional tips for performing the exercise',
    example: ['Keep your back straight', 'Breathe out when pushing up'],
    required: false,
  })
  @IsArray()
  @IsString({ each: true })
  @ArrayNotEmpty()
  @IsOptional()
  tips?: string[];

  @ApiProperty({
    description: 'URL to a video demonstrating the exercise',
    example: 'https://www.youtube.com/embed/mQM1h5AfqUE?si=xMVgOE6vJ0AmfEBp',
    required: false,
  })
  @IsString()
  @IsOptional()
  video?: string;
}
