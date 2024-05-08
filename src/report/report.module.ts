import { Module } from '@nestjs/common';
import { ReportService } from './services/report.service';
import { ReportOrderController } from './controllers/report-order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report, ReportOrder } from './entities/report.entity';
import { ReportOrderRepository } from './repositories/report-order.repository';
import { ReportRepository } from './repositories/report.repository';
import { MessageRepository } from './repositories/message.repository';
import { Message } from './entities/message.entity';
import { OrderRepository } from 'src/order-product/repositories/order.repository';
import { Order } from 'src/order-product/entities/order.entity';
import { IncomeRepository } from 'src/income/repositories/income.repository';
import { Income } from 'src/income/entities/income.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Report,
      ReportRepository,
      Order,
      OrderRepository,
      ReportOrderRepository,
      ReportOrder,
      MessageRepository,
      Message,
      IncomeRepository,
      Income,
    ]),
  ],
  controllers: [ReportOrderController],
  providers: [ReportService],
  exports: [ReportService],
})
export class ReportModule {}
