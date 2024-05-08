import { ProductStatusEnum } from "src/products/enums/product-status.enum";
import { ProductCreatedEvent } from "./product-created.event";

export class ProductStatusUpdatedEvent extends ProductCreatedEvent {
    status: ProductStatusEnum;
}