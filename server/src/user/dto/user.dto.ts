import { ApiProperty } from '@nestjs/swagger';

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
}
