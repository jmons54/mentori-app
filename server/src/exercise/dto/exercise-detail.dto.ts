import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { ExerciseTranslationDto } from './exercise-translation.dto';
import { ExerciseDto } from './exercise.dto';
import { ExerciseCategoryDto } from './exercise-category.dto';

@Exclude()
export class ExerciseDetailDto extends ExerciseDto {
  @ApiProperty({
    description: 'Array of exercise translations',
    type: [ExerciseTranslationDto],
  })
  @Expose()
  @Type(() => ExerciseTranslationDto)
  translations: ExerciseTranslationDto[];

  @ApiProperty({
    description: 'Thumbnail image URL',
  })
  @Expose()
  thumbnail: string;

  @ApiProperty({
    description: 'Main image URL',
  })
  @Expose()
  image: string;

  @ApiProperty({
    description: 'Category of the exercise',
    type: ExerciseCategoryDto,
  })
  @Expose()
  @Type(() => ExerciseCategoryDto)
  category: ExerciseCategoryDto;
}
