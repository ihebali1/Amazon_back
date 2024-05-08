import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { NotificationTargetEnum } from '../enums/notification-target.enum';
import { OrderStatusUpdatedEvent } from '../events/order-status-updated.event';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class OrderStatusUpdatedListener {
    constructor(private notificationService: NotificationService) {
    }

    @OnEvent('order.status.updated', { async: true })
    handleOrderStatusUpdatedEvent(event: OrderStatusUpdatedEvent) {
        // handle and process "OrderStatusUpdatedEvent" event
        if (event.target == NotificationTargetEnum.ADMIN)
            this.notificationService.createAdminNotification({
                arTitle: 'تم تحديث حالة الطلب',
                arContent: `تم تغيير حالة الطلب ${event.order} إلى ${event.status}`,
                title: 'Order status updated',
                content: `order ${event.order} status has changed to ${event.status}`,
                order: event.order,
                type: event.type,
            })
        if (event.target == NotificationTargetEnum.USER)
            for (const userId of event.userIds)
                this.notificationService.createUserNotification({
                    arTitle: 'تم تحديث حالة الطلب',
                    arContent: `تم تغيير حالة الطلب ${event.order} إلى ${event.status}`,
                    title: 'Order status updated',
                    content: `order ${event.order} status has changed to ${event.status}`,
                    order: event.order,
                    type: event.type,
                }, userId)
    }
}