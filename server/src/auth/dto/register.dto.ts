import {
  IsEmail,
  IsPhoneNumber,
  IsStrongPassword,
  MinLength,
  Validate,
  ValidateIf,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserAlreadyExistValidator } from '../validators/user.validator';

export class RegisterDto {
  @ApiProperty({
    description: 'The name of the user',
    minLength: 3,
    example: 'John Doe',
  })
  @MinLength(3)
  name: string;

  @ApiPropertyOptional({
    description: 'The email of the user, required if phone is not provided',
    example: 'user@example.com',
  })
  @ValidateIf((o) => !o.phone)
  @IsEmail()
  @Validate(UserAlreadyExistValidator, {
    message: 'Email already exists',
  })
  public email?: string;

  @ApiPropertyOptional({
    description:
      'The phone number of the user, required if email is not provided',
    example: '+1234567890',
  })
  @ValidateIf((o) => !o.email)
  @IsPhoneNumber()
  @Validate(UserAlreadyExistValidator, {
    message: 'Phone number already exists',
  })
  public phone?: string;

  @ApiProperty({
    description: 'The password of the user, must be strong',
    example: 'Str0ngP@ssword!',
  })
  @IsStrongPassword()
  public password: string;
}
