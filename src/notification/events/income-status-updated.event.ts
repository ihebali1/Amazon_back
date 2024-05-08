import { IncomeStatusEnum } from "src/income/enums/income-status.enum";
import { IncomeCreatedEvent } from "./income-created.event";

export class IncomeStatusUpdatedEvent extends IncomeCreatedEvent {
    status: IncomeStatusEnum;
}