import { Module } from '@nestjs/common';
import { AdminExerciseController } from './controllers/admin-exercise.controller';
import { ExerciseAssistantService } from '../exercise/services/exercise-assistant.service';
import { ExerciseService } from '../exercise/services/exercise.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExerciseEntity } from '../exercise/entities/exercise.entity';
import { ExerciseTranslateAssistantService } from '../exercise/services/exercise-translate-assistant.service';
import { ExerciseTranslationService } from '../exercise/services/exercise-translation.service';
import { ExerciseTranslationEntity } from '../exercise/entities/exercise-translation.entity';
import { AdminExerciseCategoryController } from './controllers/admin-exercise-category.controller';
import { ExerciseCategoryEntity } from '../exercise/entities/exercise-category.entity';
import { ExerciseCategoryService } from '../exercise/services/exercise-category.service';
import { AwsS3Service } from '../aws/aws-s3.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ExerciseEntity,
      ExerciseTranslationEntity,
      ExerciseCategoryEntity,
    ]),
  ],
  controllers: [AdminExerciseController, AdminExerciseCategoryController],
  providers: [
    ExerciseService,
    ExerciseTranslationService,
    ExerciseAssistantService,
    ExerciseTranslateAssistantService,
    ExerciseCategoryService,
    AwsS3Service,
  ],
})
export class AdminModule {}
