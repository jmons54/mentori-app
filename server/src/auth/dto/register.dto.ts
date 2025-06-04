import {
  IsEmail,
  IsPhoneNumber,
  IsStrongPassword,
  IsOptional,
  IsDateString,
  MinLength,
  Validate,
  ValidateIf,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserAlreadyExistValidator } from '../validators/user.validator';

export class RegisterDto {
  @ApiProperty({
    description: 'Prénom de l’utilisateur',
    example: 'John',
    minLength: 2,
  })
  @MinLength(2)
  firstName: string;

  @ApiProperty({
    description: 'Nom de l’utilisateur',
    example: 'Doe',
    minLength: 2,
  })
  @MinLength(2)
  lastName: string;

  @ApiPropertyOptional({
    description: 'Date de naissance au format ISO',
    example: '1990-05-10',
  })
  @IsOptional()
  @IsDateString()
  birthdate?: string;

  @ApiPropertyOptional({
    description: 'Email (requis si téléphone absent)',
    example: 'user@example.com',
  })
  @ValidateIf((o) => !o.phone)
  @IsEmail()
  @Validate(UserAlreadyExistValidator, {
    message: 'Email already exists',
  })
  email?: string;

  @ApiPropertyOptional({
    description: 'Numéro de téléphone (requis si email absent)',
    example: '+33612345678',
  })
  @ValidateIf((o) => !o.email)
  @IsPhoneNumber()
  @Validate(UserAlreadyExistValidator, {
    message: 'Phone number already exists',
  })
  phone?: string;

  @ApiPropertyOptional({
    description: 'Ville de résidence',
    example: 'Paris',
  })
  @IsOptional()
  city?: string;

  @ApiPropertyOptional({
    description: 'Profession',
    example: 'Coach sportif',
  })
  @IsOptional()
  profession?: string;

  @ApiProperty({
    description: 'Mot de passe sécurisé',
    example: 'Str0ngP@ssword!',
  })
  @IsStrongPassword()
  password: string;
}
