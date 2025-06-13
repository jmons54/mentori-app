import { IsString, IsInt } from 'class-validator';

export class CreateMessageDto {
  @IsInt()
  recipientId: number;

  @IsString()
  content: string;
}
