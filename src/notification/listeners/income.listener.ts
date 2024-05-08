import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { IncomeStatusEnum } from 'src/income/enums/income-status.enum';
import { NotificationTargetEnum } from '../enums/notification-target.enum';
import { IncomeStatusUpdatedEvent } from '../events/income-status-updated.event';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class IncomeListener {
    constructor(private notificationService: NotificationService) {
    }

    @OnEvent('income.status.updated', { async: true })
    handleIncomeCreatedEvent(event: IncomeStatusUpdatedEvent) {
        // handle and process "NewMessageEvent" event
        if (event.target == NotificationTargetEnum.USER) {
            for (const userId of event.userIds) {
                if (event.status == IncomeStatusEnum.CONFIRMED)
                    this.notificationService.createUserNotification({
                        title: 'Income confirmed',
                        content: `An income of ${event.incomeAmount} TNDhas been confirmed`,
                        arTitle: 'تم تأكيد مدخول',
                        arContent: `تم تأكيد مدخول بقيمة ${event.incomeAmount} دينار`,
                        income: event.income,
                        type: event.type,
                    }, userId)

                if (event.status == IncomeStatusEnum.REFUNDED)
                    this.notificationService.createUserNotification({
                        title: 'Income refunded',
                        content: `An income of ${event.incomeAmount} TNDhas been refunded`,
                        arTitle: 'تم رفض مدخول',
                        arContent: `تم رفض مدخول بقيمة ${event.incomeAmount} دينار`,
                        income: event.income,
                        type: event.type,
                    }, userId)
            }

        }

    }
}