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

  @Column({ unique: true, nullable: false })
  email?: string;

  @Column({ nullable: false })
  phone?: string;

  @Column({ nullable: false })
  password?: string;

  @Column({ nullable: true })
  photo?: string;

  @Column('varchar', { array: true })
  roles: Role[] = [Role.User];

  @Column({ default: true })
  isActive: boolean;
}
