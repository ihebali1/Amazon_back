import { EntityRepository, Repository } from 'typeorm';
import { PayoutNotification } from '../entities/notification.entity';

@EntityRepository(PayoutNotification)
export class PayoutNotificationRepository extends Repository<PayoutNotification> {}
