import { EntityRepository, Repository } from 'typeorm';
import { IncomeNotification } from '../entities/notification.entity';

@EntityRepository(IncomeNotification)
export class IncomeNotificationRepository extends Repository<IncomeNotification> {}
