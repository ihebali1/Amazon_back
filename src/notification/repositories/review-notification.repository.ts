import { EntityRepository, Repository } from 'typeorm';
import { ReviewNotification } from '../entities/notification.entity';

@EntityRepository(ReviewNotification)
export class ReviewNotificationepository extends Repository<ReviewNotification> {}
