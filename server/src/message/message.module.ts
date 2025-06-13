import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from './entities/message.entity';
import { UserModule } from '../user/user.module';
import { MessageService } from './services/message.service';
import { MessageController } from './controllers/message.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity]), UserModule],
  providers: [MessageService],
  controllers: [MessageController],
})
export class MessageModule {}
