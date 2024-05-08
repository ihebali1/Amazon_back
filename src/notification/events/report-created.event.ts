import { NotificationTargetEnum } from "../enums/notification-target.enum";
import { NotificationTypeEnum } from "../enums/notification-type.enum";

export class ReportCreatedEvent {
    report: string;
    userIds?: string[];
    type: NotificationTypeEnum.REPORT;
    target: NotificationTargetEnum;
}