import { EntityRepository, Repository } from 'typeorm';
import { ReportNotification } from '../entities/notification.entity';

@EntityRepository(ReportNotification)
export class ReportNotificationRepository extends Repository<ReportNotification> {}
