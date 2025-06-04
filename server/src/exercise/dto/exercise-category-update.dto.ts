import { PartialType } from '@nestjs/swagger';
import { ExerciseCategoryCreateDto } from './exercise-category-create.dto';

export class ExerciseCategoryUpdateDto extends PartialType(
  ExerciseCategoryCreateDto
) {}
