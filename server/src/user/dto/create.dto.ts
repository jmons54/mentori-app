import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsStrongPassword,
  MinLength,
} from 'class-validator';
import { Role } from '../roles/role.enum';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @MinLength(3)
  name: string;

  @IsOptional()
  @IsPhoneNumber()
  phone: string;

  @IsEnum(Role)
  role: Role;

  @IsStrongPassword()
  password: string;
}
