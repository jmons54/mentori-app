import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { ExerciseTranslationEntity } from '../entities/exercise-translation.entity';
import { ExerciseStepType } from '../exercise.type';

@Exclude()
export class ExerciseTranslationDto {
  @ApiProperty({
    type: 'string',
  })
  @Expose()
  language: ExerciseTranslationEntity['language'];

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty({
    description: 'Details about the exercise content',
    type: 'object',
    properties: {
      exercise: { type: 'string', description: 'Name of the exercise' },
      targetedMuscles: {
        type: 'array',
        items: { type: 'string' },
        description: 'List of targeted muscles',
      },
      equipmentNeeded: {
        type: 'array',
        items: { type: 'string' },
        description: 'List of equipment needed',
      },
      steps: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            step: { type: 'number', description: 'Step number' },
            description: {
              type: 'string',
              description: 'Description of the step',
            },
          },
        },
        description: 'List of steps to perform the exercise',
      },
      tips: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            tip: { type: 'string', description: 'A tip for the exercise' },
          },
        },
        description: 'List of tips for the exercise',
      },
    },
  })
  @Expose()
  content: string;

  @ApiPropertyOptional()
  @Expose()
  targetedMuscles?: string[];

  @ApiPropertyOptional()
  @Expose()
  equipmentNeeded?: string[];

  @ApiProperty({
    description: 'Details about exercise steps',
    type: 'array',
    properties: {
      items: {
        type: 'object',
        properties: {
          step: { type: 'number', description: 'Step number' },
          description: {
            type: 'string',
            description: 'Description of the step',
          },
        },
      },
    },
  })
  @Expose()
  steps: ExerciseStepType[];

  @ApiPropertyOptional()
  @Expose()
  tips?: string[];

  @ApiProperty()
  @Expose()
  video: string;
}
