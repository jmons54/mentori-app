import { Module } from '@nestjs/common';
import { ExerciseModule } from './exercise.module';
import { ExerciseService } from './services/exercise.service';
import { ExerciseController } from './controllers/exercise.controller';
import { ExerciseCategoryController } from './controllers/exercise-category.controller';
import { ExerciseCategoryService } from './services/exercise-category.service';
import { ExerciseTranslationService } from './services/exercise-translation.service';
import { ExerciseCategoryExistValidator } from './validators/exercise-category.validator';

@Module({
  imports: [ExerciseModule],
  providers: [
    ExerciseService,
    ExerciseCategoryService,
    ExerciseTranslationService,
    ExerciseCategoryExistValidator,
  ],
  controllers: [ExerciseController, ExerciseCategoryController],
})
export class ExerciseHttpModule {}
