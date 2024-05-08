import { EntityRepository, Repository } from 'typeorm';
import { Chat } from '../entities/chat.entity';

@EntityRepository(Chat)
export class ChatRepository extends Repository<Chat> {
  async findVendorContacts(vendorId: string) {
    return this.createQueryBuilder('chat')
      .leftJoinAndSelect('chat.userSend', 'userSend')
      .leftJoin('chat.userReceiver', 'userReceiver')
      .where('chat.userReceiver.id = :vendorId', { vendorId: vendorId })
      .orderBy('chat.createdAt', 'DESC')
      .getMany();
  }

  async findCustomerContacts(customerId: string) {
    return this.createQueryBuilder('chat')
      .leftJoinAndSelect('chat.userReceiver', 'userSend')
      .leftJoin('chat.userSend', 'userReceiver')
      .where('chat.userSend.id = :customerId', { customerId: customerId })
      .orderBy('chat.createdAt', 'DESC')
      .getMany();
  }

  async findChatMessages(userId: string, customerId: string) {
    return this.createQueryBuilder('chat')
      .leftJoinAndSelect('chat.userSend', 'userSend')
      .leftJoinAndSelect('chat.userReceiver', 'userReceiver')
      .where('chat.userSend = :userId AND chat.userReceiver = :customerId', {
        userId: userId,
        customerId: customerId,
      })
      .orWhere('chat.userReceiver = :userId AND chat.userSend = :customerId', {
        userId: userId,
        customerId: customerId,
      })
      .orderBy('chat.createdAt', 'ASC')
      .getMany();
  }
}
