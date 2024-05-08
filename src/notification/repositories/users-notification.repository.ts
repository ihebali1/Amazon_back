import { EntityRepository, Repository } from 'typeorm';
import { UsersNotification } from '../entities/notification.entity';

@EntityRepository(UsersNotification)
export class UsersNotificationRepository extends Repository<UsersNotification> {}
