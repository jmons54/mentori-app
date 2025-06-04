import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../entities/base.entity';

@Entity('exercise_category')
export class ExerciseCategoryEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  image: string;
}
