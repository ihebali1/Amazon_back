import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { NotificationTargetEnum } from "../enums/notification-target.enum";
import { NotificationTypeEnum } from "../enums/notification-type.enum";

export class CreateNotificationDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    arTitle: string;

    @IsNotEmpty()
    @IsString()
    content: string;

    @IsNotEmpty()
    @IsString()
    arContent: string;

    @IsOptional()
    @IsUUID()
    @IsString()
    order?: string;

    @IsOptional()
    @IsUUID()
    @IsString()
    income?: string;

    @IsOptional()
    @IsUUID()
    @IsString()
    payout?: string;

    @IsOptional()
    @IsUUID()
    @IsString()
    chat?: string;


    @IsOptional()
    @IsUUID()
    @IsString()
    user?: string;

    @IsOptional()
    @IsUUID()
    @IsString()
    product?: string;

    @IsOptional()
    @IsUUID()
    @IsString()
    review?: string;

    @IsOptional()
    @IsUUID()
    @IsString()
    report?: string;

    @IsNotEmpty()
    @IsEnum(NotificationTypeEnum)
    type: NotificationTypeEnum;
}
