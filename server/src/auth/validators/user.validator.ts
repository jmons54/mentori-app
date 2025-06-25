import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/services/user.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class UserAlreadyExistValidator implements ValidatorConstraintInterface {
  constructor(private readonly userService: UserService) {}

  async validate(email: string) {
    if (email) {
      const user = await this.userService.findOneByEmail(email);
      return !user;
    }
    return true;
  }
}
