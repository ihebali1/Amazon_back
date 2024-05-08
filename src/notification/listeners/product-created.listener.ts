import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { NotificationTargetEnum } from '../enums/notification-target.enum';
import { ProductCreatedEvent } from '../events/product-created.event';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class ProductCreatedListener {
    constructor(private notificationService: NotificationService) {
    }

    @OnEvent('product.created', { async: true })
    handleProductCreatedEvent(event: ProductCreatedEvent) {
        // handle and process "ProductCreatedEvent" event
        if (event.target == NotificationTargetEnum.USER)
            for (const userId of event.userIds)
            this.notificationService.createUserNotification({
                title: 'Product added successfully',
                content: `Product ${event.product} added successfully`,
                arTitle: 'تمت إضافة المنتج بنجاح',
                arContent: `تمت إضافة المنتج ${event.product} بنجاح`,
                product: event.product,
                type: event.type,
            }, userId)
            
        if (event.target == NotificationTargetEnum.ADMIN)
            this.notificationService.createAdminNotification({
                title: 'New product needs verification',
                content: `Product ${event.product} needs verification`,
                arTitle: 'منتج جديد يحتاج التحقق',
                arContent: `المنتج ${event.product} يحتاج إلى التحقق`,
                product: event.product,
                type: event.type,
            })
    }
}