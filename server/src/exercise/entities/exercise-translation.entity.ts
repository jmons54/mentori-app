import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../entities/base.entity';
import { ExerciseStepType } from '../exercise.type';
import { ExerciseEntity } from './exercise.entity';

@Entity('exercise_translation')
export class ExerciseTranslationEntity extends BaseEntity {
  @Column()
  language: 'en' | 'fr';

  @Column()
  name: string;

  @Column({ type: 'varchar', array: true, nullable: true })
  targetedMuscles?: string[];

  @Column({ type: 'varchar', array: true, nullable: true })
  equipmentNeeded?: string[];

  @Column({ type: 'json' })
  steps: ExerciseStepType[];

  @Column({ type: 'varchar', array: true, nullable: true })
  tips?: string[];

  @Column({ nullable: true })
  video?: string;

  @ManyToOne(() => ExerciseEntity, (exercise) => exercise.translations, {
    onDelete: 'CASCADE',
  })
  exercise: ExerciseEntity;
}
