import { NotificationTargetEnum } from "../enums/notification-target.enum";
import { NotificationTypeEnum } from "../enums/notification-type.enum";

export class ProductReviewCreatedEvent {
    review: string;
    userIds?: string[];
    type: NotificationTypeEnum.REVIEW;
    target: NotificationTargetEnum;
}