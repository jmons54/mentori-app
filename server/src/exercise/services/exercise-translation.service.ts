import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { ExerciseTranslationEntity } from '../entities/exercise-translation.entity';
import { ExerciseAssistantContentType } from '../exercise.type';

@Injectable()
export class ExerciseTranslationService {
  constructor(
    @InjectRepository(ExerciseTranslationEntity)
    private exerciseTranslationRepository: Repository<ExerciseTranslationEntity>
  ) {}

  createFromAssistant(
    language: ExerciseTranslationEntity['language'],
    data: ExerciseAssistantContentType
  ) {
    return this.create({
      language,
      name: data.exercise,
      targetedMuscles: data.targetedMuscles,
      equipmentNeeded: data.equipmentNeeded,
      steps: data.steps,
      tips: data.tips,
    });
  }

  create(entityLike: DeepPartial<ExerciseTranslationEntity>) {
    return this.exerciseTranslationRepository.create(entityLike);
  }

  async save(exerciseTranslation: ExerciseTranslationEntity): Promise<void> {
    await this.exerciseTranslationRepository.save(exerciseTranslation);
  }
}
