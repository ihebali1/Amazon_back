import { Chat } from "src/chat/entities/chat.entity";
import { Income } from "src/income/entities/income.entity";
import { Order } from "src/order-product/entities/order.entity";
import { Payout } from "src/payout/entities/payout.entity";
import { Product } from "src/products/entities/product.entity";
import { ReportOrder } from "src/report/entities/report.entity";
import { ProductReview } from "src/reviews/entities/product-review.entity";
import { Users } from "src/users/entities/users.entity";
import {
    ChildEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    TableInheritance,
    UpdateDateColumn
} from "typeorm";
import { NotificationTypeEnum } from "../enums/notification-type.enum";
import { AdminNotification } from "./admin-notification.entity";
import { UserNotification } from "./user-notification.entity";

@TableInheritance({ column: { type: 'nvarchar', name: 'kind' } })
@Entity()
export class Notification {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    arTitle: string;

    @Column()
    content: string;

    @Column()
    arContent: string;

    @OneToMany(() => UserNotification, (userNotification) => userNotification.notification)
    userNotifications: UserNotification[];

    @OneToMany(() => AdminNotification, (adminNotification) => adminNotification.notification)
    adminNotifications: AdminNotification[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

@ChildEntity('ORDER-NOTIFICATION')
export class OrderNotification extends Notification {
    @ManyToOne(() => Order, (order) => order.notifications)
    order: Order | string;

    @Column({
        type: 'enum',
        enum: NotificationTypeEnum,
        default: NotificationTypeEnum.ORDER,
    })
    type: NotificationTypeEnum = NotificationTypeEnum.ORDER;
}

@ChildEntity('PRODUCT-NOTIFICATION')
export class ProductNotification extends Notification {
    @ManyToOne(() => Product, (product) => product.notifications)
    product: Product | string;

    @Column({
        type: 'enum',
        enum: NotificationTypeEnum,
        default: NotificationTypeEnum.PRODUCT,
    })
    type: NotificationTypeEnum = NotificationTypeEnum.PRODUCT;
}

@ChildEntity('REPORT-NOTIFICATION')
export class ReportNotification extends Notification {
    @ManyToOne(() => ReportOrder, (report) => report.notifications)
    report: ReportOrder | string;

    @Column({
        type: 'enum',
        enum: NotificationTypeEnum,
        default: NotificationTypeEnum.REPORT,
    })
    type: NotificationTypeEnum = NotificationTypeEnum.REPORT;
}

@ChildEntity('REVIEW-NOTIFICATION')
export class ReviewNotification extends Notification {
    @ManyToOne(() => ProductReview, (productReview) => productReview.notifications)
    productReview: ProductReview | string;

    @Column({
        type: 'enum',
        enum: NotificationTypeEnum,
        default: NotificationTypeEnum.REVIEW,
    })
    type: NotificationTypeEnum = NotificationTypeEnum.REVIEW;
}

@ChildEntity('USER-NOTIFICATION')
export class UsersNotification extends Notification {
    @ManyToOne(() => Users, (user) => user.notifications)
    user: Users | string;

    @Column({
        type: 'enum',
        enum: NotificationTypeEnum,
        default: NotificationTypeEnum.USER,
    })
    type: NotificationTypeEnum = NotificationTypeEnum.USER;
}

@ChildEntity('PAYOUT-NOTIFICATION')
export class PayoutNotification extends Notification {
    @ManyToOne(() => Payout, (payout) => payout.notifications)
    payout: Payout | string;

    @Column({
        type: 'enum',
        enum: NotificationTypeEnum,
        default: NotificationTypeEnum.PAYOUT,
    })
    type: NotificationTypeEnum = NotificationTypeEnum.PAYOUT;
}

@ChildEntity('CHAT-NOTIFICATION')
export class ChatNotification extends Notification {
    @ManyToOne(() => Chat, (chat) => chat.notifications)
    chat: Chat | string;

    @Column({
        type: 'enum',
        enum: NotificationTypeEnum,
        default: NotificationTypeEnum.CHAT,
    })
    type: NotificationTypeEnum = NotificationTypeEnum.CHAT;
}

@ChildEntity('INCOME-NOTIFICATION')
export class IncomeNotification extends Notification {
    @ManyToOne(() => Income, (income) => income.notifications)
    income: Income | string;

    @Column({
        type: 'enum',
        enum: NotificationTypeEnum,
        default: NotificationTypeEnum.INCOME,
    })
    type: NotificationTypeEnum = NotificationTypeEnum.INCOME;
}