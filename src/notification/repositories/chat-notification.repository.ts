import { EntityRepository, Repository } from 'typeorm';
import { ChatNotification } from '../entities/notification.entity';

@EntityRepository(ChatNotification)
export class ChatNotificationRepository extends Repository<ChatNotification> {}
