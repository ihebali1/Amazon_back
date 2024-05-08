import { NotificationTargetEnum } from "../enums/notification-target.enum";
import { NotificationTypeEnum } from "../enums/notification-type.enum";

export class ProductCreatedEvent {
    product: string;
    userIds?: string[];
    type: NotificationTypeEnum;
    target: NotificationTargetEnum;
}