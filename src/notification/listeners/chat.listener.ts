import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { NotificationTargetEnum } from '../enums/notification-target.enum';
import { NewMessageEvent } from '../events/new-message.event';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class ChatListener {
    constructor(private notificationService: NotificationService) {
    }

    @OnEvent('message.new', { async: true })
    handleNewMessageEvent(event: NewMessageEvent) {
        // handle and process "NewMessageEvent" event
        if (event.target == NotificationTargetEnum.USER)
                this.notificationService.createUserNotification({
                    title: 'New message',
                    content: `New message from ${event.senderName}`,
                    arTitle: 'رسالة جديدة',
                    arContent: `رسالة جديدة من ${event.senderName}`,
                    chat: event.chat,
                    type: event.type,
                }, event.receiver)
    }
}