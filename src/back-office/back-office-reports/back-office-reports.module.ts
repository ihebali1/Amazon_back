import { Module } from '@nestjs/common';
import { ReportModule } from 'src/report/report.module';
import { SharedModule } from 'src/shared/shared.module';
import { BackOfficeReportController } from './back-office-reports.controller';

@Module({
  imports: [ReportModule, SharedModule],
  controllers: [BackOfficeReportController],
})
export class BackOfficeReportsModule {}
