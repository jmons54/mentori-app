import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { ExerciseCategoryEntity } from '../entities/exercise-category.entity';

@Injectable()
export class ExerciseCategoryService {
  constructor(
    @InjectRepository(ExerciseCategoryEntity)
    private exerciseCategoryRepository: Repository<ExerciseCategoryEntity>
  ) {}

  findAll(isActive?: boolean): Promise<ExerciseCategoryEntity[]> {
    return this.exerciseCategoryRepository.findBy({
      isActive,
    });
  }

  findOne(id: number): Promise<ExerciseCategoryEntity | null> {
    return this.exerciseCategoryRepository.findOneBy({
      id,
    });
  }

  findOneByName(name: string): Promise<ExerciseCategoryEntity | null> {
    return this.exerciseCategoryRepository.findOneBy({
      name,
    });
  }

  create(entityLike: DeepPartial<ExerciseCategoryEntity>) {
    return this.exerciseCategoryRepository.create(entityLike);
  }

  async save(entity: ExerciseCategoryEntity) {
    return await this.exerciseCategoryRepository.save(entity);
  }

  async update(id: number, entityLike: DeepPartial<ExerciseCategoryEntity>) {
    await this.exerciseCategoryRepository.update(id, entityLike);
  }

  async active(id: number, active: boolean): Promise<void> {
    await this.exerciseCategoryRepository.update(id, {
      isActive: active,
    });
  }
}
