import { PartialType } from '@nestjs/swagger';
import { CreateReportDto } from './create-report-order.dto';

export class UpdateReportDto extends PartialType(CreateReportDto) {}
