import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'Access token for authentication',
    example: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjI3NjQzMGVkYmJkY2NkNzNiNDYyMD',
  })
  accessToken: string;
}
