import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { VendorStateEnum } from 'src/users/enum/vendor-state.enum';
import { NotificationTargetEnum } from '../enums/notification-target.enum';
import { UserCreatedEvent } from '../events/user-created.event';
import { VendorStatusUpdatedEvent } from '../events/user-status-updated.event';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class UserListener {
    constructor(private notificationService: NotificationService) {
    }

    @OnEvent('user.created', { async: true })
    handleUserCreatedEvent(event: UserCreatedEvent) {
        // handle and process "ProductCreatedEvent" event
        if (event.target == NotificationTargetEnum.USER)
            for (const userId of event.userIds)
                this.notificationService.createUserNotification({
                    title: 'Welcome to m3iklia',
                    content: `Your account successfully created`,
                    arTitle: `مرحبا بكم في سوق المعقلية`,
                    arContent: `تم إنشاء حسابك بنجاح`,
                    user: event.user,
                    type: event.type,
                }, userId)
        if (event.target == NotificationTargetEnum.ADMIN)
            this.notificationService.createAdminNotification({
                title: 'New user registered',
                content: `New user needs verification`,
                arTitle: `تم تسجيل مستخدم جديد`,
                arContent: `مستخدم جديد يحتاج التحقق`,
                user: event.user,
                type: event.type,
            })
    }

    @OnEvent('vendor.status.updated', { async: true })
    handleUserStatusUpdatedEvent(event: VendorStatusUpdatedEvent) {
        // handle and process "ProductCreatedEvent" event
        console.log(event)
        if (event.target == NotificationTargetEnum.USER)
            for (const userId of event.userIds) {
                if (event.status == VendorStateEnum.VERIFIED)
                    this.notificationService.createUserNotification({
                        title: 'Account status updated',
                        content: `Your account is verified`,
                        arTitle: `تم تحديث حالة الحساب`,
                        arContent: `تم التحقق من حسابك`,
                        user: event.user,
                        type: event.type,
                    }, userId)
                if (event.status == VendorStateEnum.SUSPENDED)
                    this.notificationService.createUserNotification({
                        title: 'Account status updated',
                        content: `Your account is suspended`,
                        arTitle: `تم تحديث حالة الحساب`,
                        arContent: `تم تعليق حسابك`,
                        user: event.user,
                        type: event.type,
                    }, userId)
                if (event.status == VendorStateEnum.DISABLED)
                    this.notificationService.createUserNotification({
                        title: 'Account status updated',
                        content: `Your account is disabled`,
                        arTitle: `تم تحديث حالة الحساب`,
                        arContent: `تم تعطيل حسابك`,
                        user: event.user,
                        type: event.type,
                    }, userId)
                if (event.status == VendorStateEnum.UNVERIFIED)
                    this.notificationService.createUserNotification({
                        title: 'Account status updated',
                        content: `Your account is unverified`,
                        arTitle: `تم تحديث حالة الحساب`,
                        arContent: `حسابك قيد التحقق`,
                        user: event.user,
                        type: event.type,
                    }, userId)
            }

        if (event.target == NotificationTargetEnum.ADMIN)
            this.notificationService.createAdminNotification({
                title: 'New user registered',
                content: `New user needs verification`,
                arTitle: `تم تسجيل مستخدم جديد`,
                arContent: `مستخدم جديد يحتاج التحقق`,
                user: event.user,
                type: event.type,
            })
    }
}