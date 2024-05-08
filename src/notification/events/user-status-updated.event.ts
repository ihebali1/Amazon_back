import { VendorStateEnum } from "src/users/enum/vendor-state.enum";
import { UserCreatedEvent } from "./user-created.event";

export class VendorStatusUpdatedEvent extends UserCreatedEvent {
    status: VendorStateEnum;
}
