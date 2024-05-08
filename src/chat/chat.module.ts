import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { ChatController } from './controllers/chat.controller';
import { FindChatMessagesDto } from './dto/find-chat-messages.dto';
import { Chat } from './entities/chat.entity';
import { ChatRepository } from './repositories/chat.repository';
import { ChatService } from './services/chat.service';

@Module({
  imports: [TypeOrmModule.forFeature([Chat, ChatRepository, UsersRepository])],
  controllers: [ChatController, ChatController],
  providers: [ChatService],
})
export class ChatModule {}
