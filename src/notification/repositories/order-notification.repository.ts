import { EntityRepository, Repository } from 'typeorm';
import { OrderNotification } from '../entities/notification.entity';

@EntityRepository(OrderNotification)
export class OrderNotificationRepository extends Repository<OrderNotification> {}
