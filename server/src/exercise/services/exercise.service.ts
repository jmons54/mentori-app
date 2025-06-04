import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, In, Repository } from 'typeorm';
import { paginate, PaginateQuery } from 'nestjs-paginate';
import { exercisePagination } from './exercise.pagination';
import { ExerciseEntity } from '../entities/exercise.entity';
import { ExerciseTranslationEntity } from '../entities/exercise-translation.entity';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectRepository(ExerciseEntity)
    private exerciseRepository: Repository<ExerciseEntity>
  ) {}

  async findAll(query: PaginateQuery) {
    const queryBuilder = this.exerciseRepository
      .createQueryBuilder('exercise')
      .andWhere('exercise.isActive = :active', {
        active: query.filter?.active !== 'off',
      });
    if (query.filter?.name) {
      queryBuilder
        .leftJoin('exercise.translations', 'translations')
        .andWhere('translations.name LIKE :name', {
          name: `%${query.filter.name}%`,
        });
    }

    const result = await paginate(query, queryBuilder, exercisePagination);
    const ids = result.data.map((v) => v.id);
    const exercises = await this.exerciseRepository.find({
      select: ['translations'],
      where: {
        id: In(ids),
      },
      relations: ['translations'],
    });
    for (const value of result.data) {
      const exercise = exercises.find((e) => e.id === value.id);
      value.translations = exercise.translations.map((t) => ({
        language: t.language,
        name: t.name,
      })) as ExerciseTranslationEntity[];
    }
    return result;
  }

  findOne(id: number): Promise<ExerciseEntity | null> {
    return this.exerciseRepository.findOne({
      where: { id },
      relations: ['category', 'translations'],
    });
  }

  create(entityLike: DeepPartial<ExerciseEntity>) {
    return this.exerciseRepository.create(entityLike);
  }

  async update(id: number, entityLike: DeepPartial<ExerciseEntity>) {
    const exercise = await this.findOne(id);

    if (entityLike.translations) {
      for (const likeTranslation of entityLike.translations) {
        const translation = exercise.translations.find(
          (e) => e.language === likeTranslation.language
        );
        if (translation) {
          const index = exercise.translations.findIndex(
            (e) => e.language === likeTranslation.language
          );
          exercise.translations[index] = {
            ...translation,
            ...(likeTranslation as ExerciseTranslationEntity),
          };
        } else {
          exercise.translations.push(
            likeTranslation as ExerciseTranslationEntity
          );
        }
      }
      delete entityLike.translations;
    }

    return this.exerciseRepository.save({
      ...exercise,
      ...entityLike,
    });
  }

  async save(exercise: ExerciseEntity) {
    return await this.exerciseRepository.save(exercise);
  }

  async active(id: number, isActive: boolean): Promise<void> {
    await this.exerciseRepository.update(id, {
      isActive,
    });
  }
}
