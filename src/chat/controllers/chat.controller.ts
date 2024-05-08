import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/shared/decorators/user.decorator';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { Users } from 'src/users/entities/users.entity';
import { CreateChatDto } from '../dto/create-chat.dto';
import { FindChatMessagesDto } from '../dto/find-chat-messages.dto';
import { ChatService } from '../services/chat.service';
@ApiTags('Chat')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  // create message
  @Post()
  create(@CurrentUser() user: Users, @Body() createChatDto: CreateChatDto) {
    return this.chatService.create(user.id, createChatDto);
  }
  //get  vendor contacts
  @Get()
  getVendorContacts(@CurrentUser() user: Users) {
    return this.chatService.getVendorContacts(user.id);
  }

  @Get('customer')
  getCustomerContacts(@CurrentUser() user: Users) {
    return this.chatService.getCustomerContacts(user.id);
  }

  //get vendor chat messages
  @Get('vendor')
  getVendorChatMessages(
    @CurrentUser() user: Users,
    @Query() findChatMessages: FindChatMessagesDto,
  ) {
    return this.chatService.getVendorChatMessages(
      user.id,
      findChatMessages.userId,
    );
  }
}
