import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { ReportFinalDecisonStatusEnum } from '../enums/report-final-decision-status.enum';

export class UpdateReportStatusDto {
  @ApiProperty({ required: true })
  @IsEnum(ReportFinalDecisonStatusEnum)
  @IsNotEmpty()
  status: ReportFinalDecisonStatusEnum;
}
