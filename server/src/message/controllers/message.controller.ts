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
import { MessageEntity } from '../entities/message.entity';

@ApiTags('messages')
@Controller('messages')
@UseGuards(JwtAuthGuard)
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @ApiOperation({ operationId: 'sendMessage', summary: 'Envoyer un message' })
  @ApiResponse({ status: 200, type: MessageEntity })
  @Post()
  sendMessage(
    @Request() { user }: { user: UserEntity },
    @Body() dto: CreateMessageDto
  ) {
    return this.messageService.send(user.id, dto);
  }

  @ApiOperation({
    operationId: 'getConversation',
    summary: 'Récupérer la conversation avec un utilisateur',
  })
  @ApiResponse({ status: 200, type: [MessageEntity] })
  @Get('conversation/:userId')
  getConversation(
    @Request() { user }: { user: UserEntity },
    @Param('userId') userId: string
  ) {
    return this.messageService.findConversation(user.id, parseInt(userId));
  }

  @ApiOperation({
    operationId: 'getInbox',
    summary: 'Récupérer la boîte de réception de l’utilisateur',
  })
  @ApiResponse({ status: 200, type: [MessageEntity] })
  @Get('inbox')
  getInbox(@Request() { user }: { user: UserEntity }) {
    return this.messageService.findInbox(user.id);
  }
}
