import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { HistoryEntity } from './history.entity';

export abstract class BaseEntity extends HistoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'varchar', length: 300, nullable: true })
  internalComment: string | null;
}
