import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { ReportStatusEnum } from '../enums/report-status.enum';

export class FindReportDto {
  @ApiProperty()
  @IsEnum(ReportStatusEnum)
  @IsOptional()
  status: ReportStatusEnum;
}
