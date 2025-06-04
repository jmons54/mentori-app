import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {}

  findOneByIdentifier(identifier: string) {
    return this.userRepository.findOneBy([
      { email: identifier },
      { phone: identifier },
    ]);
  }

  findOneByGoogleId(googleId: string) {
    return this.userRepository.findOneBy({
      googleId,
    });
  }

  createAndSave(data: DeepPartial<UserEntity>) {
    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }

  save(user: UserEntity) {
    return this.userRepository.save(user);
  }
}
