import { IsEnum, IsNotEmpty } from 'class-validator';
import { NotificationTargetEnum } from '../enums/notification-target.enum';

export class UpdateNotificationDto {
    @IsNotEmpty()
    @IsEnum(NotificationTargetEnum)
    target: NotificationTargetEnum;
}
