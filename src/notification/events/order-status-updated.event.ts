import { OrderStatusEnum } from "src/order-product/enums/order-staus.enum";
import { NotificationTypeEnum } from "../enums/notification-type.enum";
import { OrderCreatedEvent } from "./order-created.event";

export class OrderStatusUpdatedEvent extends OrderCreatedEvent {
    status: OrderStatusEnum;
}