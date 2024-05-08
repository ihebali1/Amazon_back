import { PayoutStatusEnum } from "src/payout/enums/payout-status.enum";
import { PayoutCreatedEvent } from "./payout-created.event";

export class PayoutStatusUpdatedEvent extends PayoutCreatedEvent {
    status: PayoutStatusEnum;
}