import { Module } from '@nestjs/common';
import { NotificationService } from './services/notification.service';
import { NotificationController } from './controllers/notification.controller';
import { OrderCreatedListener } from './listeners/order-created.listener';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserNotificationRepository } from './repositories/user-notification.repository';
import { AdminNotificationRepository } from './repositories/admin-notification.repository';
import { OrderNotificationRepository } from './repositories/order-notification.repository';
import { ProductNotificationRepository } from './repositories/product-notification.repository';
import { ReviewNotificationepository } from './repositories/review-notification.repository';
import { ReportNotificationRepository } from './repositories/report-notification.repository';
import { OrderStatusUpdatedListener } from './listeners/order-status-updated.listener';
import { ProductCreatedListener } from './listeners/product-created.listener';
import { ReportCreatedListener } from './listeners/report-created.listener';
import { ReportUpdatedStatusListener } from './listeners/report-status-updated.listener';
import { ProductStatusUpdatedListener } from './listeners/product-status-updated.listener';
import { UserListener } from './listeners/user.listener';
import { UsersNotificationRepository } from './repositories/users-notification.repository';
import { PayoutListener } from './listeners/payout.listener';
import { PayoutNotificationRepository } from './repositories/payout-notification.repository';
import { ChatNotificationRepository } from './repositories/chat-notification.repository';
import { ChatListener } from './listeners/chat.listener';
import { IncomeNotificationRepository } from './repositories/income-notification.repository';
import { IncomeListener } from './listeners/income.listener';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserNotificationRepository,
      AdminNotificationRepository,
      OrderNotificationRepository,
      ProductNotificationRepository,
      ReviewNotificationepository,
      ReportNotificationRepository,
      UsersNotificationRepository,
      PayoutNotificationRepository,
      ChatNotificationRepository,
      IncomeNotificationRepository,
    ]),
  ],
  controllers: [NotificationController],
  providers: [
    NotificationService,
    OrderCreatedListener,
    OrderStatusUpdatedListener,
    ProductCreatedListener,
    ProductStatusUpdatedListener,
    ReportCreatedListener,
    ReportUpdatedStatusListener,
    UserListener,
    PayoutListener,
    ChatListener,
    IncomeListener,
  ]
})
export class NotificationModule { }
