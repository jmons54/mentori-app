import { Column, Entity } from 'typeorm';
import { Role } from '../roles/role.enum';
import { BaseEntity } from '../../entities/base.entity';

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true, nullable: true })
  googleId: string;

  @Column({ unique: true, nullable: true })
  email?: string;

  @Column({ unique: true, nullable: true })
  phone?: string;

  @Column({ nullable: true })
  password?: string;

  @Column({ nullable: true })
  photo?: string;

  @Column('varchar', { array: true })
  roles: Role[] = [Role.User];
}
