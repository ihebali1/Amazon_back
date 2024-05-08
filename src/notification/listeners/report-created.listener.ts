import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { NotificationTargetEnum } from '../enums/notification-target.enum';
import { ReportCreatedEvent } from '../events/report-created.event';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class ReportCreatedListener {
    constructor(private notificationService: NotificationService) {
    }

    @OnEvent('report.created', { async: true })
    handleReportCreatedEvent(event: ReportCreatedEvent) {

        console.log({
            title: 'New complaint',
            content: `New complaint add`,
            arTitle: 'شكوى جديدة',
            arContent: `تمت إضافة شكوى جديدة`,
            report: event.report,
            type: event.type,
        })

        // handle and process "ReportCreatedEvent" event
        if (event.target == NotificationTargetEnum.USER)
            for (const userId of event.userIds)
                this.notificationService.createUserNotification({
                    title: 'New complaint',
                    content: `New complaint add`,
                    arTitle: 'شكوى جديدة',
                    arContent: `تمت إضافة شكوى جديدة`,
                    report: event.report,
                    type: event.type,
                }, userId)
        if (event.target == NotificationTargetEnum.ADMIN)
            this.notificationService.createAdminNotification({
                title: 'New complaint',
                content: `New complaint add`,
                arTitle: 'شكوى جديدة',
                arContent: `تمت إضافة شكوى جديدة`,
                report: event.report,
                type: event.type,
            })
    }
}