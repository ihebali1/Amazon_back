import { NotificationTargetEnum } from "../enums/notification-target.enum";
import { NotificationTypeEnum } from "../enums/notification-type.enum";

export class NewMessageEvent {
    chat: string;
    senderName: string;
    receiver: string;
    type: NotificationTypeEnum;
    target: NotificationTargetEnum;
}