import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { NotificationTargetEnum } from '../enums/notification-target.enum';
import { PayoutCreatedEvent } from '../events/payout-created.event';
import { PayoutStatusUpdatedEvent } from '../events/payout-status-updated.event';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class PayoutListener {
    constructor(private notificationService: NotificationService) {
    }

    @OnEvent('payout.created', { async: true })
    handlePayoutCreatedEvent(event: PayoutCreatedEvent) {
        // handle and process "PayoutCreatedEvent" event
        if (event.target == NotificationTargetEnum.ADMIN)
            this.notificationService.createAdminNotification({
                title: 'New payout demand',
                content: `New payout demand needs verification`,
                arTitle: 'طلب دفع جديد',
                arContent: `طلب دفع جديد يحتاج التحقق `,
                payout: event.payout,
                type: event.type,
            })
    }

    @OnEvent('payout.status.updated', { async: true })
    handlePayoutStatusUpdatedEvent(event: PayoutStatusUpdatedEvent) {
        // handle and process "PayoutStatusUpdatedEvent" event
        if (event.target == NotificationTargetEnum.USER)
            for (const userId of event.userIds)
                this.notificationService.createUserNotification({
                    title: 'Payout demand status updated',
                    content: 'Your payout demand status is updated',
                    arTitle: 'تم تحديث حالة طلب الدفع',
                    arContent: `تم تحديث حالة طلب العائد الخاص بك`,
                    order: event.payout,
                    type: event.type,
                }, userId)
    }
}