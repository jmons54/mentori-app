// src/message/dto/message.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { MessageEntity } from '../entities/message.entity';
import { UserDto } from '../../user/dto/user.dto';

export class MessageDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ type: () => UserDto })
  sender: UserDto;

  @ApiProperty({ type: () => UserDto })
  recipient: UserDto;

  @ApiProperty({ example: 'Bonjour, comment allez-vous ?' })
  content: string;

  @ApiProperty({ example: '2024-06-12T10:15:00.000Z' })
  createdAt: Date;

  static fromEntity(message: MessageEntity): MessageDto {
    const dto = new MessageDto();
    dto.id = message.id;
    dto.sender = UserDto.fromEntity(message.sender);
    dto.recipient = UserDto.fromEntity(message.recipient);
    dto.content = message.content;
    dto.createdAt = message.createdAt;
    return dto;
  }

  static fromEntities(messages: MessageEntity[]): MessageDto[] {
    return messages.map(MessageDto.fromEntity);
  }
}
