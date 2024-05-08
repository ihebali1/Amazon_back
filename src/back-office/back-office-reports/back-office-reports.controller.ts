import { Body, Controller, Get, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RequiredPermissions } from 'src/permission/decorators/required-premission.decorator';
import { Permissions } from 'src/permission/enums/permissions.enum';
import { CreateReportMessageDto } from 'src/report/dto/create-message.dto';
import { FindReportDto } from 'src/report/dto/find-report.dto';
import { UpdateReportStatusDto } from 'src/report/dto/update-report-status.dto';
import { ReportService } from 'src/report/services/report.service';
import { CurrentUser } from 'src/shared/decorators/user.decorator';
import { AdminGuard } from 'src/shared/guards/admin.guard';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { PermissionGuard } from 'src/shared/guards/permission.guard';
import { Admin } from 'src/users/entities/admin.entity';

@ApiTags('Back-Office-Reports')
@UseGuards(JwtAuthGuard, AdminGuard, PermissionGuard)
@ApiBearerAuth()
@Controller('back-office-reports')
export class BackOfficeReportController {
  constructor(private readonly reportService: ReportService) {}

  @RequiredPermissions(Permissions.MANAGE_REPORT)
  @Get()
  findAll(@Query() findReportsFilter: FindReportDto) {
    return this.reportService.findAll(findReportsFilter);
  }

  @RequiredPermissions(Permissions.MANAGE_REPORT)
  @Get('mine')
  findAdminInvestigatingReports(@CurrentUser() admin: Admin, @Query() findReportsFilter: FindReportDto) {
    return this.reportService.findAllByAdmin(admin.id, findReportsFilter);
  }

  @RequiredPermissions(Permissions.MANAGE_REPORT)
  @Get(':id/messages')
  findReportMessages(@Param('id') reportId: string) {
    return this.reportService.findReportMessages(reportId);
  }

  @RequiredPermissions(Permissions.MANAGE_REPORT)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reportService.findOne(id);
  }

  @RequiredPermissions(Permissions.MANAGE_REPORT)
  @Patch(':id/investigate')
  investigateRport(@Param('id') id: string, @CurrentUser() admin: Admin) {
    return this.reportService.investigateReport(id, admin.id);
  }

  @RequiredPermissions(Permissions.MANAGE_REPORT)
  @Patch(':id/message')
  addMessage(
    @CurrentUser() admin: Admin,
    @Param('id') reportId: string,
    @Body() createReprtMessageDto: CreateReportMessageDto,
  ) {
    return this.reportService.addAdminMessage(
      admin.id,
      reportId,
      createReprtMessageDto,
    );
  }

  @RequiredPermissions(Permissions.MANAGE_REPORT)
  @Patch(':id/update-status')
  updateOrderStatus(
    @CurrentUser() admin: Admin,
    @Param('id') reportId: string,
    incomeId: string,
    @Body() updateReportStatusDto: UpdateReportStatusDto,
  ) {
    return this.reportService.updateReportStatus(
      admin.id,
      reportId,
      incomeId,
      updateReportStatusDto.status,
    );
  }

}
