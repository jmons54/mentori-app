import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { MessageService } from '../services/message.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateMessageDto } from '../dto/createMessage.dto';
import { UserEntity } from '../../user/entities/user.entity';
import { MessageDto } from '../dto/message.dto';

@ApiTags('messages')
@Controller('messages')
@UseGuards(JwtAuthGuard)
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @ApiResponse({ status: 200, type: MessageDto })
  @ApiOperation({
    operationId: 'sendMessage',
  })
  @Post()
  async sendMessage(
    @Request() { user }: { user: UserEntity },
    @Body() dto: CreateMessageDto
  ): Promise<MessageDto> {
    const message = await this.messageService.send(user.id, dto);
    return MessageDto.fromEntity(message);
  }

  @ApiResponse({ status: 200, type: [MessageDto] })
  @ApiOperation({
    operationId: 'getConversation',
  })
  @Get('conversation/:userId')
  async getConversation(
    @Request() { user }: { user: UserEntity },
    @Param('userId') userId: string
  ): Promise<MessageDto[]> {
    const messages = await this.messageService.findConversation(
      user.id,
      parseInt(userId)
    );
    return MessageDto.fromEntities(messages);
  }

  @ApiResponse({ status: 200, type: [MessageDto] })
  @ApiOperation({
    operationId: 'inbox',
  })
  @Get('inbox')
  async getInbox(
    @Request() { user }: { user: UserEntity }
  ): Promise<MessageDto[]> {
    const messages = await this.messageService.findInbox(user.id);
    return MessageDto.fromEntities(messages);
  }

  @ApiResponse({ status: 200, type: [MessageDto] })
  @ApiOperation({
    operationId: 'getConversations',
    summary: 'Liste des conversations actives par utilisateur',
  })
  @Get('conversations')
  async getConversations(
    @Request() { user }: { user: UserEntity }
  ): Promise<MessageDto[]> {
    const messages = await this.messageService.findConversations(user.id);
    return MessageDto.fromEntities(messages);
  }
}
