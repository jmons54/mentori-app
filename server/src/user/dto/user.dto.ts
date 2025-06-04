import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../roles/role.enum';
import { UserEntity } from '../entities/user.entity';

export class UserDto {
  @ApiProperty({
    description: 'Unique identifier of the user',
    example: 1,
  })
  userId: number;

  @ApiProperty({
    description: 'Name of the user',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'List of roles assigned to the user',
    isArray: true,
    enum: Role,
    example: [Role.User, Role.Admin],
  })
  roles: Role[];

  static fromEntity(user: UserEntity) {
    const dto = new UserDto();
    dto.userId = user.id;
    dto.name = user.name;
    dto.roles = user.roles;
    return dto;
  }

  static fromEntities(users: UserEntity[]) {
    return users.map((user) => UserDto.fromEntity(user));
  }
}
