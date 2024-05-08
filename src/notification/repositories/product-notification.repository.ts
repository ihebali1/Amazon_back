import { EntityRepository, Repository } from 'typeorm';
import { ProductNotification } from '../entities/notification.entity';

@EntityRepository(ProductNotification)
export class ProductNotificationRepository extends Repository<ProductNotification> {}
