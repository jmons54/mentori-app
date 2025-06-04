import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class HistoryEntity {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
