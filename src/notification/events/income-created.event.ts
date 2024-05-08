import { NotificationTargetEnum } from "../enums/notification-target.enum";
import { NotificationTypeEnum } from "../enums/notification-type.enum";

export class IncomeCreatedEvent {
    income: string;
    incomeAmount: number;
    userIds?: string[];
    type: NotificationTypeEnum;
    target: NotificationTargetEnum;
}