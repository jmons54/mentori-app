import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { ExerciseCategoryService } from '../services/exercise-category.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class ExerciseCategoryExistValidator
  implements ValidatorConstraintInterface
{
  constructor(private readonly exerciseCategory: ExerciseCategoryService) {}

  async validate(id: number) {
    if (id) {
      return !!(await this.exerciseCategory.findOne(id));
    }
    return true;
  }
}
