import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../user/entities/user.entity';

export class AuthorDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty({ required: false })
  photo?: string;

  static fromEntity(user: UserEntity): AuthorDto {
    const dto = new AuthorDto();
    dto.id = user.id;
    dto.name = user.firstName + ' ' + user.lastName;
    dto.photo = user.photo;
    return dto;
  }
}
