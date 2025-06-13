import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageEntity } from '../entities/message.entity';
import { UserService } from '../../user/services/user.service';
import { CreateMessageDto } from '../dto/createMessage.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    readonly messageRepo: Repository<MessageEntity>,
    readonly userService: UserService
  ) {}

  async send(senderId: number, dto: CreateMessageDto) {
    const sender = await this.userService.findById(senderId);
    const recipient = await this.userService.findById(dto.recipientId);

    const message = this.messageRepo.create({
      sender,
      recipient,
      content: dto.content,
    });

    return this.messageRepo.save(message);
  }

  async findConversation(userId: number, otherId: number) {
    return this.messageRepo.find({
      where: [
        { sender: { id: userId }, recipient: { id: otherId } },
        { sender: { id: otherId }, recipient: { id: userId } },
      ],
      order: { createdAt: 'ASC' },
    });
  }

  async findInbox(userId: number) {
    return this.messageRepo.find({
      where: { recipient: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }
}
