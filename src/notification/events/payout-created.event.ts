import { NotificationTargetEnum } from "../enums/notification-target.enum";
import { NotificationTypeEnum } from "../enums/notification-type.enum";

export class PayoutCreatedEvent {
    payout: string;
    userIds?: string[];
    type: NotificationTypeEnum;
    target: NotificationTargetEnum;
}