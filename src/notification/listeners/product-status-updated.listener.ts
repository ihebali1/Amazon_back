import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { NotificationTargetEnum } from '../enums/notification-target.enum';
import { ProductStatusUpdatedEvent } from '../events/product-status-updated.event';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class ProductStatusUpdatedListener {
    constructor(private notificationService: NotificationService) {
    }

    @OnEvent('product.status.updated', { async: true })
    handleProductStatusUpdatedEvent(event: ProductStatusUpdatedEvent) {
        // handle and process "ProductStatusUpdatedEvent" event
        if (event.target == NotificationTargetEnum.USER)
            for (const userId of event.userIds)
                this.notificationService.createUserNotification({
                    title: 'Product status updated',
                    content: `Product ${event.product} status updated`,
                    arTitle: 'تم تحديث حالة المنتج',
                    arContent: `تم تحديث حالة المنتج ${event.product}`,
                    product: event.product,
                    type: event.type,
                },
                    userId)

        if (event.target == NotificationTargetEnum.ADMIN)
            this.notificationService.createAdminNotification({
                title: 'Product status updated',
                content: `Product ${event.product} status updated`,
                arTitle: 'تم تحديث حالة المنتج',
                arContent: `تم تحديث حالة المنتج ${event.product}`,
                product: event.product,
                type: event.type,
            })
    }
}