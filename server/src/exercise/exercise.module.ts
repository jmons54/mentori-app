import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExerciseEntity } from './entities/exercise.entity';
import { ExerciseCategoryEntity } from './entities/exercise-category.entity';
import { ExerciseTranslationEntity } from './entities/exercise-translation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ExerciseEntity,
      ExerciseCategoryEntity,
      ExerciseTranslationEntity,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class ExerciseModule {}
