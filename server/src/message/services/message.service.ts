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
      order: { updatedAt: 'DESC' },
    });
  }

  async findConversations(userId: number): Promise<MessageEntity[]> {
    const messages = await this.messageRepo
      .createQueryBuilder('message')
      .leftJoinAndSelect('message.sender', 'sender')
      .leftJoinAndSelect('message.recipient', 'recipient')
      .where(
        '(sender.id = :userId AND deleted_by_sender = false) OR (recipient.id = :userId AND deleted_by_recipient = false)',
        { userId }
      )
      .orderBy('message.updatedAt', 'DESC')
      .getMany();

    const seen = new Set<number>();
    const conversations: MessageEntity[] = [];

    for (const msg of messages) {
      const otherId =
        msg.sender.id === userId ? msg.recipient.id : msg.sender.id;
      if (!seen.has(otherId)) {
        seen.add(otherId);
        conversations.push(msg);
      }
    }

    return conversations;
  }
}
