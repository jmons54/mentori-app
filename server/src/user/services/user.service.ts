import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    readonly userRepository: Repository<UserEntity>
  ) {}

  async findById(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findOneByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  createAndSave(data: DeepPartial<UserEntity>) {
    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }

  save(user: UserEntity) {
    return this.userRepository.save(user);
  }

  async update(id: number, data: DeepPartial<UserEntity>) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const updated = this.userRepository.merge(user, data);
    return this.userRepository.save(updated);
  }

  async active(id: number, active: boolean) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.isActive = active;
    return this.userRepository.save(user);
  }

  findAll(): Promise<UserEntity[]> {
    return this.userRepository.find({
      order: {
        createdAt: 'ASC',
      },
      where: {
        isActive: true,
      },
    });
  }
}
