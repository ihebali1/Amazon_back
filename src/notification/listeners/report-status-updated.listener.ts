import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { NotificationTargetEnum } from '../enums/notification-target.enum';
import { ReportStatusUpdatedEvent } from '../events/report-status-updated.event';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class ReportUpdatedStatusListener {
    constructor(private notificationService: NotificationService) {
    }

    @OnEvent('report.status.updated', { async: true })
    handleReportCreatedEvent(event: ReportStatusUpdatedEvent) {
        // handle and process "ReportCreatedEvent" event
        if (event.target == NotificationTargetEnum.USER)
            for (const userId of event.userIds)
                this.notificationService.createUserNotification({
                    title: 'Complaint status updated',
                    content: `Complaint ${event.report} status updated`,
                    arTitle: 'تم تحديث حالة الشكوى',
                    arContent: `تم تحديث حالة الشكوى ${event.report}`,
                    report: event.report,
                    type: event.type,
                }, userId)
        if (event.target == NotificationTargetEnum.ADMIN)
            this.notificationService.createAdminNotification({
                title: 'Complaint status updated',
                content: `Complaint ${event.report} status updated`,
                arTitle: 'تم تحديث حالة الشكوى',
                arContent: `تم تحديث حالة الشكوى ${event.report}`,
                report: event.report,
                type: event.type,
            })
    }
}