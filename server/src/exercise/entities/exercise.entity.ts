import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ExerciseCategoryEntity } from './exercise-category.entity';
import { ExerciseTranslationEntity } from './exercise-translation.entity';
import { BaseEntity } from '../../entities/base.entity';

@Entity('exercise')
export class ExerciseEntity extends BaseEntity {
  @Column({ nullable: true })
  type?: string;

  @Column({ nullable: true })
  difficulty?: string;

  @Column({ nullable: true })
  thumbnail?: string;

  @Column({ nullable: true })
  image?: string;

  @ManyToOne(() => ExerciseCategoryEntity)
  category: ExerciseCategoryEntity;

  @OneToMany(
    () => ExerciseTranslationEntity,
    (translation) => translation.exercise,
    { cascade: true }
  )
  translations: ExerciseTranslationEntity[];
}
