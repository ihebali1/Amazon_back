import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { NotificationTargetEnum } from 'src/notification/enums/notification-target.enum';
import { NotificationTypeEnum } from 'src/notification/enums/notification-type.enum';
import { NewMessageEvent } from 'src/notification/events/new-message.event';
import { Users } from 'src/users/entities/users.entity';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { CreateChatDto } from '../dto/create-chat.dto';
import { Chat } from '../entities/chat.entity';
import { ChatRepository } from '../repositories/chat.repository';

@Injectable()
export class ChatService {
  constructor(
    private chatRepository: ChatRepository,
    private userRepository: UsersRepository,
    private eventEmitter: EventEmitter2,
  ) { }

  async create(userId: string, createChatDto: CreateChatDto) {
    const chat = new Chat();
    chat.content = createChatDto.content;
    const fetchedReceiver = await this.userRepository.findOne(
      createChatDto.receiverId,
    );
    const fetchedSender = await this.userRepository.findOne(userId);
    chat.userSend = fetchedSender;
    chat.userReceiver = fetchedReceiver;
    if (createChatDto.image) chat.image = createChatDto.image;
    if (createChatDto.video) chat.video = createChatDto.video;
    const createdChat = await this.chatRepository.save(chat);

    if (createdChat) this.eventEmitter.emit('message.new', {
      chat: createdChat.id,
      type: NotificationTypeEnum.CHAT,
      target: NotificationTargetEnum.USER,
      receiver: fetchedReceiver.id,
      senderName: `${fetchedSender.firstName} ${fetchedSender.lastName}`,
    } as NewMessageEvent);
  }



  async getVendorContacts(userId: string) {
    const chatList = await this.chatRepository.findVendorContacts(userId);
    const filteredList: Chat[] = [];
    for (const chatListItem of chatList) {
      let exist = false;
      for (const filteredItem of filteredList) {
        if (
          (filteredItem.userSend as Users).id ==
          (chatListItem.userSend as Users).id
        )
          exist = true;
      }
      if (exist == false) filteredList.push(chatListItem);
    }
    return filteredList;
  }

  async getCustomerContacts(userId: string) {
    const chatList = await this.chatRepository.findCustomerContacts(userId);
    const filteredList: Chat[] = [];
    for (const chatListItem of chatList) {
      let exist = false;
      for (const filteredItem of filteredList) {
        if (
          (filteredItem.userReceiver as Users).id ==
          (chatListItem.userReceiver as Users).id
        )
          exist = true;
      }
      if (exist == false) filteredList.push(chatListItem);
    }
    return filteredList;
  }

  async getVendorChatMessages(userId: string, customerId: string) {
    return this.chatRepository.findChatMessages(userId, customerId);
  }
}
