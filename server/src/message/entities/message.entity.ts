import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';

@Entity('messages')
export class MessageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => UserEntity, { eager: true })
  sender: UserEntity;

  @ManyToOne(() => UserEntity, { eager: true })
  recipient: UserEntity;

  @Column({ name: 'deleted_by_sender', default: false })
  deletedBySender: boolean;

  @Column({ name: 'deleted_by_recipient', default: false })
  deletedByRecipient: boolean;
}
