import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GoogleAuthDto {
  @ApiProperty({
    description: 'Google ID token for authentication',
    example: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjI3NjQzMGVkYmJkY2NkNzNiNDYyMD',
  })
  @IsNotEmpty()
  @IsString()
  idToken: string;
}
