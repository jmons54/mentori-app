import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../roles/role.enum';
import { UserEntity } from '../entities/user.entity';

export class UserDto {
  @ApiProperty({
    description: 'Identifiant unique de l’utilisateur',
    example: 1,
  })
  userId: number;

  @ApiProperty({
    description: 'Prénom',
    example: 'John',
  })
  firstName: string;

  @ApiProperty({
    description: 'Nom de famille',
    example: 'Doe',
  })
  lastName: string;

  @ApiProperty({
    description: 'Adresse email',
    example: 'john.doe@example.com',
    required: false,
  })
  email?: string;

  @ApiProperty({
    description: 'Téléphone',
    example: '+33612345678',
    required: false,
  })
  phone?: string;

  @ApiProperty({
    description: 'Ville',
    example: 'Paris',
    required: false,
  })
  city?: string;

  @ApiProperty({
    description: 'Profession',
    example: 'Coach sportif',
    required: false,
  })
  profession?: string;

  @ApiProperty({
    description: 'Date de naissance',
    example: '1990-01-01',
    required: false,
  })
  birthdate?: Date;

  @ApiProperty({
    description: 'Photo de profil (URL)',
    example: 'https://example.com/photo.jpg',
    required: false,
  })
  photo?: string;

  @ApiProperty({
    description: 'L’utilisateur est-il actif ?',
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    description: 'Rôles attribués',
    isArray: true,
    enum: Role,
    example: [Role.User],
  })
  roles: Role[];

  static fromEntity(user: UserEntity): UserDto {
    const dto = new UserDto();
    dto.userId = user.id;
    dto.firstName = user.firstName;
    dto.lastName = user.lastName;
    dto.email = user.email;
    dto.phone = user.phone;
    dto.city = user.city;
    dto.profession = user.profession;
    dto.photo = user.photo;
    dto.isActive = user.isActive;
    dto.roles = user.roles;
    return dto;
  }

  static fromEntities(users: UserEntity[]): UserDto[] {
    return users.map(UserDto.fromEntity);
  }
}
