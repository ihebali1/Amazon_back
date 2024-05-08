import { EntityRepository, Repository } from 'typeorm';
import { AdminNotification } from '../entities/admin-notification.entity';

@EntityRepository(AdminNotification)
export class AdminNotificationRepository extends Repository<AdminNotification> {}
