import { Column, Entity } from 'typeorm';
import { Role } from '../roles/role.enum';
import { BaseEntity } from '../../entities/base.entity';

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  profession?: string;

  @Column({ nullable: true })
  city?: string;

  @Column({ type: 'date', nullable: true })
  birthdate?: Date;

  @Column({ unique: true, nullable: true })
  email?: string;

  @Column({ unique: true, nullable: true })
  phone?: string;

  @Column({ nullable: true })
  password?: string;

  @Column({ nullable: true })
  photo?: string;

  @Column({ unique: true, nullable: true })
  googleId?: string;

  @Column('varchar', { array: true })
  roles: Role[] = [Role.User];

  @Column({ default: true })
  isActive: boolean;
}
