import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ReportService } from '../services/report.service';
import { CreateReportDto } from '../dto/create-report-order.dto';
import { CurrentUser } from 'src/shared/decorators/user.decorator';
import { Users } from 'src/users/entities/users.entity';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { CreateReportMessageDto } from '../dto/create-message.dto';
import { Order } from 'src/order-product/entities/order.entity';

@ApiTags('Report order')
@UseGuards(JwtAuthGuard)
@Controller('report-orders')
export class ReportOrderController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  create(@CurrentUser() user: Users, @Body() createReportDto: CreateReportDto) {
    return this.reportService.create(
      user.id,
      createReportDto.order,
      createReportDto,
    );
  }

  @Patch(':id/message')
  addMessage(
    @CurrentUser() user: Users,
    @Param('id') reportId: string,
    @Body() createReprtMessageDto: CreateReportMessageDto,
  ) {
    return this.reportService.addMessage(
      user.id,
      reportId,
      createReprtMessageDto,
    );
  }

  @Get(':id/messages')
  findReportMessages(@Param('id') reportId: string) {
    return this.reportService.findReportMessages(reportId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reportService.findOne(id);
  }
}
