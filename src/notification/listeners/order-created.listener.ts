import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { NotificationTargetEnum } from '../enums/notification-target.enum';
import { OrderCreatedEvent } from '../events/order-created.event';
import { OrderStatusUpdatedEvent } from '../events/order-status-updated.event';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class OrderCreatedListener {
    constructor(private notificationService: NotificationService) {
    }

    @OnEvent('order.created', { async: true })
    handleOrderCreatedEvent(event: OrderCreatedEvent) {
        // handle and process "OrderCreatedEvent" event
        if (event.target == NotificationTargetEnum.ADMIN)
            this.notificationService.createAdminNotification({
                title: 'Order paid successfully',
                content: `order ${event.order} paid successfully`,
                arTitle: 'تم دفع الطلب بنجاح',
                arContent: `طلب ${event.order} مدفوع بنجاح`,
                order: event.order,
                type: event.type,
            })
        if (event.target == NotificationTargetEnum.USER)
            for (const userId of event.userIds)
                this.notificationService.createUserNotification({
                    title: 'Order paid successfully',
                    content: `order ${event.order} paid successfully`,
                    arTitle: 'تم دفع الطلب بنجاح',
                    arContent: `طلب ${event.order} مدفوع بنجاح`,
                    order: event.order,
                    type: event.type,
                }, userId)
    }
}