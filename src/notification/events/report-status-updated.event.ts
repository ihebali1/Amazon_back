import { ReportStatusEnum } from "src/report/enums/report-status.enum";
import { ReportCreatedEvent } from "./report-created.event";

export class ReportStatusUpdatedEvent extends ReportCreatedEvent {
    status: ReportStatusEnum;
}