import { NotificationTargetEnum } from "../enums/notification-target.enum";
import { NotificationTypeEnum } from "../enums/notification-type.enum";

export class UserCreatedEvent {
    user: string;
    userIds?: string[];
    type: NotificationTypeEnum.USER;
    target: NotificationTargetEnum;
}
