import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from '../dto/create-notification.dto';
import { ChatNotification, IncomeNotification, OrderNotification, PayoutNotification, ProductNotification, ReportNotification, ReviewNotification, UsersNotification } from '../entities/notification.entity';
import { NotificationTargetEnum } from '../enums/notification-target.enum';
import { NotificationTypeEnum } from '../enums/notification-type.enum';
import { AdminNotificationRepository } from '../repositories/admin-notification.repository';
import { ChatNotificationRepository } from '../repositories/chat-notification.repository';
import { IncomeNotificationRepository } from '../repositories/income-notification.repository';
import { OrderNotificationRepository } from '../repositories/order-notification.repository';
import { PayoutNotificationRepository } from '../repositories/payout-notification.repository';
import { ProductNotificationRepository } from '../repositories/product-notification.repository';
import { ReportNotificationRepository } from '../repositories/report-notification.repository';
import { ReviewNotificationepository } from '../repositories/review-notification.repository';
import { UserNotificationRepository } from '../repositories/user-notification.repository';
import { UsersNotificationRepository } from '../repositories/users-notification.repository';

@Injectable()
export class NotificationService {
  constructor(private userNotificationRepository: UserNotificationRepository,
    private adminNotificationRepository: AdminNotificationRepository,
    private orderNotificationRepository: OrderNotificationRepository,
    private productNotificationRepository: ProductNotificationRepository,
    private reportNotificationRepository: ReportNotificationRepository,
    private usersNotificationRepository: UsersNotificationRepository,
    private payoutNotificationRepository: PayoutNotificationRepository,
    private chatNotificationRepository: ChatNotificationRepository,
    private incomeNotificationRepository: IncomeNotificationRepository,
    private reviewNotificationRepository: ReviewNotificationepository,
  ) { }
  async createUserNotification(createNotificationDto: CreateNotificationDto, userId: string) {
    switch (createNotificationDto.type) {
      case NotificationTypeEnum.ORDER:
        const orderNotification = new OrderNotification();
        orderNotification.title = createNotificationDto.title;
        orderNotification.content = createNotificationDto.content;
        orderNotification.arTitle = createNotificationDto.arTitle;
        orderNotification.arContent = createNotificationDto.arContent;
        orderNotification.order = createNotificationDto.order;
        const createdOrderNotification = await this.orderNotificationRepository.save(orderNotification);
        return this.userNotificationRepository.save({
          notification: createdOrderNotification,
          user: userId,
        })

      case NotificationTypeEnum.CHAT:
        const chatNotification = new ChatNotification();
        chatNotification.title = createNotificationDto.title;
        chatNotification.content = createNotificationDto.content;
        chatNotification.arTitle = createNotificationDto.arTitle;
        chatNotification.arContent = createNotificationDto.arContent;
        chatNotification.chat = createNotificationDto.chat;
        const createdChatNotification = await this.chatNotificationRepository.save(chatNotification);
        return this.userNotificationRepository.save({
          notification: createdChatNotification,
          user: userId,
        })

      case NotificationTypeEnum.INCOME:
        const incomeNotification = new IncomeNotification();
        incomeNotification.title = createNotificationDto.title;
        incomeNotification.content = createNotificationDto.content;
        incomeNotification.arTitle = createNotificationDto.arTitle;
        incomeNotification.arContent = createNotificationDto.arContent;
        incomeNotification.income = createNotificationDto.income;
        const createdIncomeNotification = await this.incomeNotificationRepository.save(incomeNotification);
        return this.userNotificationRepository.save({
          notification: createdIncomeNotification,
          user: userId,
        })

      case NotificationTypeEnum.PAYOUT:
        const payoutNotification = new PayoutNotification();
        payoutNotification.title = createNotificationDto.title;
        payoutNotification.content = createNotificationDto.content;
        payoutNotification.arTitle = createNotificationDto.arTitle;
        payoutNotification.arContent = createNotificationDto.arContent;
        payoutNotification.payout = createNotificationDto.payout;
        const createdPayoutNotification = await this.payoutNotificationRepository.save(payoutNotification);
        return this.userNotificationRepository.save({
          notification: createdPayoutNotification,
          user: userId,
        })

      case NotificationTypeEnum.USER:
        const userNotification = new UsersNotification();
        userNotification.title = createNotificationDto.title;
        userNotification.content = createNotificationDto.content;
        userNotification.arTitle = createNotificationDto.arTitle;
        userNotification.arContent = createNotificationDto.arContent;
        userNotification.user = createNotificationDto.user;
        const createdUserNotification = await this.usersNotificationRepository.save(userNotification);
        return this.userNotificationRepository.save({
          notification: createdUserNotification,
          user: userId,
        })
      case NotificationTypeEnum.PRODUCT:
        const productNotification = new ProductNotification();
        productNotification.title = createNotificationDto.title;
        productNotification.content = createNotificationDto.content;
        productNotification.arTitle = createNotificationDto.arTitle;
        productNotification.arContent = createNotificationDto.arContent;
        productNotification.product = createNotificationDto.product;
        const createdProductNotification = await this.productNotificationRepository.save(productNotification);
        return this.userNotificationRepository.save({
          notification: createdProductNotification,
          user: userId,
        })
      case NotificationTypeEnum.REPORT:
        const reportNotification = new ReportNotification();
        reportNotification.title = createNotificationDto.title;
        reportNotification.content = createNotificationDto.content;
        reportNotification.arTitle = createNotificationDto.arTitle;
        reportNotification.arContent = createNotificationDto.arContent;
        reportNotification.report = createNotificationDto.report;
        const createdReportNotification = await this.reportNotificationRepository.save(reportNotification);
        return this.userNotificationRepository.save({
          notification: createdReportNotification,
          user: userId,
        })
      case NotificationTypeEnum.REVIEW:
        const reviewNotification = new ReviewNotification();
        reviewNotification.title = createNotificationDto.title;
        reviewNotification.content = createNotificationDto.content;
        reviewNotification.arTitle = createNotificationDto.arTitle;
        reviewNotification.arContent = createNotificationDto.arContent;
        reviewNotification.productReview = createNotificationDto.review;
        const createdReviewNotification = await this.reviewNotificationRepository.save(reviewNotification);
        return this.userNotificationRepository.save({
          notification: createdReviewNotification,
          user: userId,
        })

      default:
        break;
    }
  }

  async createAdminNotification(createNotificationDto: CreateNotificationDto) {
    switch (createNotificationDto.type) {
      case NotificationTypeEnum.ORDER:
        const orderNotification = new OrderNotification();
        orderNotification.title = createNotificationDto.title;
        orderNotification.content = createNotificationDto.content;
        orderNotification.arTitle = createNotificationDto.arTitle;
        orderNotification.arContent = createNotificationDto.arContent;
        orderNotification.order = createNotificationDto.order;
        const createdOrderNotification = await this.orderNotificationRepository.save(orderNotification);
        return this.adminNotificationRepository.save({
          notification: createdOrderNotification,
        })
      case NotificationTypeEnum.USER:
        const userNotification = new UsersNotification();
        userNotification.title = createNotificationDto.title;
        userNotification.content = createNotificationDto.content;
        userNotification.arTitle = createNotificationDto.arTitle;
        userNotification.arContent = createNotificationDto.arContent;
        userNotification.user = createNotificationDto.user;
        const createdUserNotification = await this.usersNotificationRepository.save(userNotification);
        return this.adminNotificationRepository.save({
          notification: createdUserNotification,
        })
      case NotificationTypeEnum.PRODUCT:
        const productNotification = new ProductNotification();
        productNotification.title = createNotificationDto.title;
        productNotification.content = createNotificationDto.content;
        productNotification.arTitle = createNotificationDto.arTitle;
        productNotification.arContent = createNotificationDto.arContent;
        productNotification.product = createNotificationDto.product;
        const createdProductNotification = await this.productNotificationRepository.save(productNotification);
        return this.adminNotificationRepository.save({
          notification: createdProductNotification,
        })
      case NotificationTypeEnum.REPORT:
        const reportNotification = new ReportNotification();
        reportNotification.title = createNotificationDto.title;
        reportNotification.content = createNotificationDto.content;
        reportNotification.arTitle = createNotificationDto.arTitle;
        reportNotification.arContent = createNotificationDto.arContent;
        reportNotification.report = createNotificationDto.report;
        const createdReportNotification = await this.reportNotificationRepository.save(reportNotification);
        return this.adminNotificationRepository.save({
          notification: createdReportNotification,
        })
      case NotificationTypeEnum.PAYOUT:
        const payoutNotification = new PayoutNotification();
        payoutNotification.title = createNotificationDto.title;
        payoutNotification.content = createNotificationDto.content;
        payoutNotification.arTitle = createNotificationDto.arTitle;
        payoutNotification.arContent = createNotificationDto.arContent;
        payoutNotification.payout = createNotificationDto.payout;
        const createdPayoutNotification = await this.payoutNotificationRepository.save(payoutNotification);
        return this.adminNotificationRepository.save({
          notification: createdPayoutNotification,
        })
      case NotificationTypeEnum.REVIEW:
        const reviewNotification = new ReviewNotification();
        reviewNotification.title = createNotificationDto.title;
        reviewNotification.content = createNotificationDto.content;
        reviewNotification.arTitle = createNotificationDto.arTitle;
        reviewNotification.arContent = createNotificationDto.arContent;
        reviewNotification.productReview = createNotificationDto.review;
        const createdReviewNotification = await this.reviewNotificationRepository.save(reviewNotification);
        return this.adminNotificationRepository.save({
          notification: createdReviewNotification,
        })
      default:
        break;
    }
  }

  findAdminNotifications(adminId: string, limit: number) {
    return this.adminNotificationRepository.find({
      relations: ['notification',
        'notification.product',
        'notification.order',
        'notification.productReview',
        'notification.report',
        'notification.income',
        'notification.payout',
        'notification.user',
        'notification.chat',
        'notification.chat.userSend',
        'notification.chat.userReceiver',],
      take: limit,
      order: {
        createdAt: 'DESC'
      }
    })
  }

  findUserNotifications(userId: string, limit: number) {
    return this.userNotificationRepository.find({
      relations: ['notification',
        'notification.product',
        'notification.order',
        'notification.productReview',
        'notification.report',
        'notification.income',
        'notification.payout',
        'notification.user',
        'notification.chat',
        'notification.chat.userSend',
        'notification.chat.userReceiver',],
      take: limit,
      where: {
        user: userId
      },
      order: {
        createdAt: 'DESC'
      }
    })
  }

  async updateIsSeen(id: string, target: NotificationTargetEnum) {

    if (target == NotificationTargetEnum.ADMIN) {
      const adminNotification = await this.adminNotificationRepository.findOne({
        where: { id: id }
      });
      if (adminNotification) {
        adminNotification.isSeen = !adminNotification.isSeen;
        return this.adminNotificationRepository.update(adminNotification.id, adminNotification)
      }
    }

    if (target == NotificationTargetEnum.USER) {
      const userNotification = await this.userNotificationRepository.findOne({
        where: { id: id },
      });
      if (userNotification) {
        userNotification.isSeen = !userNotification.isSeen;
        return this.userNotificationRepository.update(userNotification.id, userNotification)
      }
    }

  }
}
